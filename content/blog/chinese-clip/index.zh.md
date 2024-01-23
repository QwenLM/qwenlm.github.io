---
title: "Chinese CLIP: 中文图文对比学习预训练"
date: 2022-12-24T14:54:19+08:00
# weight: 1
# aliases: ["/first"]
tags: ["Research"]
# author: "Junyang Lin"
draft: false
hide_meta: false
comments: false
# description: "Desc Text. "
disable_share: false
hide_summary: false
search_hidden: false
show_reading_time: false
show_bread_crumbs: true
show_post_nav_links: false
show_word_count: false
use_hugo_toc: true
show_toc: true
toc_open: true
# use_hugo_toc: true
# show_toc: true
# toc_open: true # default expand all
# cover:
#     image: "cnclip_banner.jpg"
#     # can also paste direct link from external site
#     # ex. https://i.ibb.co/K0HVPBd/paper-mod-profilemode.png
#     alt: "<alt text>"
#     caption: "<text>"
#     relative: true # To use relative path for cover image, used in hugo Page-bundles
#     responsive_images: true
#     hidden: false
# header:
#   background: "" # background css value
#   background_image: ""
#   gradient: false
#   blur: false
lang: zh-CNs
---
CLIP[^1]是多模态表示学习领域一个现象级的模型。它不仅扮演基础模型，并且建立了视觉和语言的桥梁。它还推动了很多其他领域技术的发展，尤其是文本生成图像。然而，我们还需要特定语言的CLIP，尤其在现实应用中，比如跨模态检索。在此之前还没有效果较好的开源中文CLIP。因此我们希望通过这个项目推动中文多模态的发展。

{{< button href="https://arxiv.org/abs/2211.01335" label="论文" external=true >}}
{{< button href="https://github.com/OFA-Sys/Chinese-CLIP" label="Github" external=true >}}
{{< button href="https://www.modelscope.cn/models/damo/multi-modal_clip-vit-base-patch16_zh/summary" label="ModelScope" external=true >}}
{{< button href="https://huggingface.co/spaces/OFA-Sys/chinese-clip-zero-shot-image-classification" label="体验" external=true >}}

## 背景

在诸如跨模态检索的图文应用中，语言往往扮演重要的角色。假设直接使用CLIP和翻译文本，翻译质量将严重影响下游任务表现。此外，预训练数据的分布也同样重要。我们希望能够有一个模型较好地建模中文世界的数据，那么CLIP的图像学习同样需要适应到中文世界图像的领域中，这些图像在很多维度都有自己的特色，比如它所蕴含的文化价值、展现的社会风貌等。

下面是一个多语言CLIP[^2]检索的例子。不难看出，模型难以理解一些中文概念，甚至只能召回一些西方文化类似的概念的图片。

{{< figure src="search.jpg" title="mCLIP中文搜索示例" >}}

并且，我们还做了相关实验，对比原始CLIP配合翻译文本和中文CLIP在跨模态检索任务上的表现。原始CLIP的效果远低于中文CLIP，这也一定程度反映语言特定的CLIP模型的必要性。

## 方法

我们尽可能采用和原始CLIP一致的设定，不去增加模块或者设计复杂化的训练方法。而为了更加高效的训练，包括训练效率和最终迁移效果的提升，我们没有选择从头开始预训练，而是提出一个两阶段预训练的方法。

{{< figure src="chinese-clip-model-v3.jpg" title="两阶段预训练方法示意图" >}}

在第一阶段中，我们将CLIP的双塔用已有的预训练模型进行初始化，分别是CLIP的视觉侧（如ViT-B、ResNet等）以及中文RoBERTa RoBERTA-wwm-Chinese。我们冻结图像塔，通过对比学习让文本塔的输出表示和图像塔的一致。在第二阶段中，我们解冻图像塔，进行对比学习继续训练，从而图像塔也能学习建模中文领域的图像数据分布。

在可复现性方面，我们尽可能采用公开数据集，其中包括LAION-5B[^3]的中文部分、悟空数据集[^4]、来自VG和MSCOCO等的翻译数据。总数据量大约2亿。

我们推出了5个规模的中文CLIP模型，其中包括ResNet-50、ViT-B/16、ViT-L/14、ViT-L/14@336px和ViT-H/14。具体数据详见下表。

{{< figure src="model_variants.jpg" title="不同规模的开源模型的具体数据" >}}

## 实验

我们做了3个跨模态检索的实验，其中包括中文原生的[MUGE](https://tianchi.aliyun.com/muge)和英文原生的Flickr30K-CN和COCO-CN。在所有数据集上，中文CLIP都取得了最好的效果，而尤其在MUGE上中文CLIP相比此前模型的优势最为巨大。这也反映中文CLIP在中文原生数据集上能够取得更好的表现。

{{< figure src="muge.jpg" title="MUGE图文检索实验结果" >}}

{{< figure src="flickr.jpg" title="Flickr30K-CN图文检索实验结果" >}}

{{< figure src="coco.jpg" title="COCO-CN图文检索实验结果" >}}

我们也尝试了中文CLIP的零样本分类能力，并在ELEVATER[^5]上做了测试，具体实现包括翻译标签和提示词。实验结果也反映中文CLIP在英文原生的基准上同样能取得有竞争力的表现。

{{< figure src="elevater.jpg" title="ELEVATER零样本图像分类实验结果" >}}

我们补充了实验说明两阶段训练方法的有效性。对比从头训练，不管是收敛效率还是最终迁移效果上，两阶段的方法都取得更好的效果，并且对比单纯的一阶段联合训练，第二阶段预训练的加入还能进一步提升效果。这也意味着当我们打造一个语言特定的中文CLIP其实不需要从头来，可以在已有模型的基础上站得更高。

{{< figure src="ablation.jpg" title="消融实验" >}}

## 局限性及未来工作

尽管上文介绍了中文CLIP的强大之处，但我们仍需要认识到当前中文CLIP还没有充分验证其作为视觉基础模型的作用。经验上，它应当在中文原生数据上表现更好。因此，在下一阶段的工作中，我们将研究构造一个针对中文多模态表示学习和视觉表示学习的基准。

欢迎大家访问我们的[GitHub存储库](https://github.com/OFA-Sys/Chinese-CLIP)和[ModelScope模型库](https://www.modelscope.cn/models/damo/multi-modal_clip-vit-base-patch16_zh/summary)，并使用我们的代码和模型。希望能够帮助到你们的研究和应用！

[^1]: Radford, A., Kim, J.W., Hallacy, C., Ramesh, A., Goh, G., Agarwal, S., Sastry, G., Askell, A., Mishkin, P., Clark, J., Krueger, G., & Sutskever, I. (2021).
       Learning Transferable Visual Models From Natural Language Supervision.
       International Conference on Machine Learning.
    
[^2]: Carlsson, F., Eisen, P., Rekathati, F., & Sahlgren, M. (2022).
       Cross-lingual and Multilingual CLIP.
       International Conference on Language Resources and Evaluation.
    
[^3]: Schuhmann, C., Beaumont, R., Vencu, R., Gordon, C., Wightman, R., Cherti, M., Coombes, T., Katta, A., Mullis, C., Wortsman, M., Schramowski, P., Kundurthy, S., Crowson, K., Schmidt, L., Kaczmarczyk, R., & Jitsev, J. (2022).
       LAION-5B: An open large-scale dataset for training next generation image-text models.
       arXiv, abs/2210.08402.
    
[^4]: Gu, J., Meng, X., Lu, G., Hou, L., Niu, M., Xu, H., Liang, X., Zhang, W., Jiang, X., & Xu, C. (2022).
       Wukong: 100 Million Large-scale Chinese Cross-modal Pre-training Dataset and A Foundation Framework.
       arXiv, abs/2202.06767.
    
[^5]: Li, C., Liu, H., Li, L., Zhang, P., Aneja, J., Yang, J., Jin, P., Lee, Y.J., Hu, H., Liu, Z., & Gao, J. (2022).
       ELEVATER: A Benchmark and Toolkit for Evaluating Language-Augmented Visual Models.
       arXiv, abs/2204.08790.
