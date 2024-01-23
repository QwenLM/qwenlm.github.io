---
title: "Chinese CLIP: Contrastive Vision-Language Pretraining in Chinese"
date: 2022-12-24T14:54:19+08:00
# weight: 1
# aliases: ["/first"]
tags: ["Research"]
# author: "Junyang Lin"
draft: false
hide_meta: false
comments: false
# description: "Desc Text. "
disable_hljs: false # to disable highlightjs
disable_share: false
hide_summary: false
search_hidden: false
show_reading_time: true
show_bread_crumbs: true
show_post_nav_links: false
show_word_count: true
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
---
CLIP[^1] is a phenomenal playmaker in vision and multimodal representation learning. It plays not only as a foundation model but also a bridge between vision and language. It has triggered a series of research in different fields, especially text-to-image generation. However, we find that there is a necessity for a language-specific CLIP for applications, especially cross-modal retrieval, and there is no opensourced Chinese CLIP with good performance. We therefore launched this project to promote the Chinese multimodal representation learning.

{{< button href="https://arxiv.org/abs/2211.01335" label="Paper" external=true >}}
{{< button href="https://github.com/OFA-Sys/Chinese-CLIP" label="GitHub" external=true >}}
{{< button href="https://www.modelscope.cn/models/damo/multi-modal_clip-vit-base-patch16_zh/summary" label="ModelScope" external=true >}}
{{< button href="https://huggingface.co/spaces/OFA-Sys/chinese-clip-zero-shot-image-classification" label="Demo" external=true >}}

## Background

In real-world vision-language applications, e.g., cross-modal retrieval, the language plays an important role. Suppose we directly use CLIP and translation for texts, the quality of translation will significantly impact the downstream performance. Furthermore, another significant issue is the domains of pretraining data. If we hope the model achieve good performance on the Chinese data, there is also a necessity for CLIP to adapt to the domain of images in the Chinese websites, which reflect cultural values, social landscape, etc.

Here is an example of the search with mCLIP[^2]. We find that it is really hard for the model to understand some concepts in Chinese, and it can only retrieve relevant items that belong to western culture.

{{< figure src="search.jpg" title="Example of the search with mCLIP." >}}

Also, we have conducted experiments on cross-modal retrieval with the original CLIP plus machine translation. The performance significantly degrades and falls far back behind our Chinese CLIP. This is also an evidence to support why we need a language-specific CLIP.

## Method

In general, we follow the setups of the original CLIP, and we propose a two-stage pretraining method that shows better performance than training from scratch. We believe this is a more cost-effective way to transfer CLIP to another language.

{{< figure src="chinese-clip-model-v3.jpg" title="Demonstration of the two-stage pretraining method." >}}

In the first stage, we initialize the two towers with pretrained models, which are the vision encoder of [CLIP](https://github.com/ymcui/Chinese-BERT-wwm), e.g., ViT-B, ResNet, etc., and Chinese RoBERTa [RoBERTA-wwm-Chinese](https://github.com/ymcui/Chinese-BERT-wwm). We freeze the image encoder and contrastively tune the language encoder that maps its representation to the output space of CLIP vision encoder. In the second stage, we unlock the vision encoder and contrastively tune the two towers so that the vision encoder can learn to model the distribution of the images of Chinese data.

To make this research reproducible, we mostly use the public datasets for pretraining, including the part marked with "zh" in LAION-5B[^3], Wukong dataset[^4], the translated data from Visual Genome and MSCOCO, etc. The total amount of the image-text pairs reaches 200 million.

We released 5 versions of Chinese CLIP, including ResNet-50, ViT-B/16, ViT-L/14, ViT-L/14
@336px, and ViT-H/14. The statistics are listed below.

{{< figure src="model_variants.jpg" title="Statistics of the model variants." >}}

## Experiments

The experiments are conducted on 3 cross-modal retrieval datasets, including the Chinese native dataset [MUGE](https://tianchi.aliyun.com/muge), and the English-native datasets (which means the images and texts are not from the Chinese websites) Flickr30K-CN and COCO-CN. On all datasets, Chinese CLIP performs the best, and its gap with the previous best models in MUGE is much larger than those in the other datasets. This demonstrates that our method is contributive to building a language specific CLIP model that can perform much better on native datasets.

{{< figure src="muge.jpg" title="Results on the MUGE dataset." >}}

{{< figure src="flickr.jpg" title="Results on the Flickr30K-CN dataset." >}}

{{< figure src="coco.jpg" title="Results on the COCO-CN dataset." >}}

We also try Chinese CLIP on zero-shot image classification, and we participate in the ELEVATER benchmark[^5] by translating all labels and prompts to Chinese manually. Results show that Chinese CLIP can also achieve a competitive performance in the English-native benchmark.

{{< figure src="elevater.jpg" title="Results on the ELEVATER benchmark." >}}

For the ablation, it can be found that in comparison with training from scratch, the two-stage pretraining method demonstrates much better performance, and the second-stage pretraining can further level up the model performance in cross-modal retrieval.

{{< figure src="ablation.jpg" title="Ablation studies." >}}

## Limitations and Future Work

Though the above contents show the effectiveness of Chinese CLIP, we still need to work on validating its role as a vision foundation model. Empirically, it should be a strong foundation model for tasks of Chinese-native data. Thus, in the next step, we will work on building a benchmark for Chinese multimodal representation learning and vision representation learning.

Feel free to visit our [GitHub repo](https://github.com/OFA-Sys/Chinese-CLIP) and use the codes and checkpoints. Hope they will be helpful for your research or applications!

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
