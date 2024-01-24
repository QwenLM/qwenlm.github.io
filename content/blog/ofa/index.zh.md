---
title: "OFA：走向通用统一模型"
date: 2022-11-14T16:01:41+08:00
weight: 2
# aliases: ["/first"]
# tags: ["Research"]
# author: ["Junyang Lin", "Binyuan Hui"]
# comments: false
# description: "Desc Text."
# disable_share: false
# hide_meta: false
# hide_summary: false # to hide summary in list
# hide_footer: false
# math: false
# search_hidden: false # to hide from search page
show_reading_time: true
show_bread_crumbs: true
show_post_nav_links: false # the prev/next after the content
show_code_copy_buttons: true
show_word_count: true
# use_hugo_toc: true
# show_toc: true
# toc_open: true # default expand all
lang: zh-CN
# cover:
#     image: "ofa_banner.jpg"
#     # can also paste direct link from external site
#     # ex. https://i.ibb.co/K0HVPBd/paper-mod-profilemode.png
#     alt: "<alt text>"
#     caption: "<text>"
#     hidden: true
#     relative: true # To use relative path for cover image, used in hugo Page-bundles
# edit_post:
#     url: "https://github.com/<path_to_repo>/content"
#     text: "Suggest Changes" # edit text
#     append_file_path: true # to append file path to Edit link
---
{{< video src="https://qianwen-res.oss-accelerate-overseas.aliyuncs.com/assets/blog/ofa/demo.mp4" autoplay=true loop=true class="gallery" >}}

2022年可以说是属于通用模型的一年！随着多模态预训练的蓬勃发展，尤其是通用模型，我们看到实现一个具有处理多种模态的多种任务的能力的通用模型的机会。因此我们提出OFA[^1]，即One-For-All。它是一个统一的多模态预训练模型，以统一的模型架构和任务形式兼容多模态和单模态的理解与生成任务。我们使用多模态多任务的方式预训练OFA，使其成为一个接近全能的模型。我们将OFA的模型和代码全部开源到社区，希望能推动通用模型的发展。

{{< button href="https://arxiv.org/abs/2202.03052" label="论文" external=true >}}
{{< button href="https://github.com/OFA-Sys/OFA" label="GitHub" external=true >}}
{{< button href="https://www.modelscope.cn/models?name=ofa" label="ModelScope" external=true >}}
{{< button href="https://huggingface.co/spaces/OFA-Sys/OFA-Generic_Interface" label="体验" external=true >}}

## 背景

{{< figure src="https://qianwen-res.oss-accelerate-overseas.aliyuncs.com/assets/blog/ofa/uniter.jpg#center" width="80%" >}}

自BERT[^bert]成功迁移到多模态领域，多模态预训练蓬勃发展，代表性的工作包括UNITER[^2]、VilBERT[^3]等。这些工作将基于Transformer的BERT[^bert]结合到单流或双流的架构中，并将图像处理成物体特征接入Transformer中。而到了2021年，随着ViT[^5]的兴起，越来越多放弃物体特征的工作出现，不再依赖复杂的如Faster-RCNN[^6]的流程，比如最简单的使用patch映射ViLT[^7]、使用CLIP[^8]的CLIP-ViL[^9]，等等。而SimVLM[^10]作为这个领域一个代表工作，利用了T5/BART的特性将理解和生成任务兼容并实现多项最优表现。这些进展都奠定了通用统一模型的发展基础，2022年涌现了一批工作，包括我们的OFA、Unified-IO[^11]、Flamingo[^12]、BeiT-3[^13]等。

## 方法

OFA希望实现的是任务、模态和架构的统一。我们提出统一模型应当具备三大特性，即任务无关、模态无关和任务全面性。任务无关即统一模型应当能接受多种任务形式而无需针对性做模型结构和训练方法的改变，模态无关即不需针对模态做特定模型结构和训练方法修改，任务全面性即模型应当尽可能学习多的任务从而让自己能力更全面更能融会贯通迁移到没学习过的新任务上。因此我们提出了三大统一，即模态、架构和任务的统一。下面我们逐一解释。

统一模态最大的难题是不同模态的离散化表示，不然我们就需要使用diffusion模型[^14]来解决问题。文本表示无需改动，主要的变化在于图像和物体框。得益于近年来vector quantization的快速发展[^15][^16]以及基于Transformer的文本生成图像模型[^17][^18]，图像可以用VQ token来进行表示。而针对物体框，则可以采用分桶的方式对连续的坐标值实现离散化。

{{< figure src="https://qianwen-res.oss-accelerate-overseas.aliyuncs.com/assets/blog/ofa/io.jpg#center" width="80%" >}}

模型架构上我们选择的是基于Transformer的编码-解码器。它已经在NLP领域取得巨大成功，如T5[^20]。而对于图像输入，我们使用ResNet的前3个stage。而对于Transformer，我们加入Normformer[^21]的方法提升模型训练稳定性和最终迁移效果。

{{< figure src="https://qianwen-res.oss-accelerate-overseas.aliyuncs.com/assets/blog/ofa/arc.jpg#center" width="80%" >}}

多任务学习是OFA的一大特点。我们使用了8个任务做预训练，其中包括5个图文任务、2个视觉任务和1个自然语言任务。图文任务包括视觉定位、定位物体描述、视觉问答、图文匹配和图像描述，视觉任务包括目标检测和图像还原，语言任务则是文本还原。为了让模型识别不同任务，我们为每个任务增加相应的文本提示，说明任务的内容。我们希望模型遇到新的提示能实现零样本学习。

{{< figure src="https://qianwen-res.oss-accelerate-overseas.aliyuncs.com/assets/blog/ofa/task.jpg#center" width="80%" >}}

我们使用了公开数据集进行预训练。我们希望研究人员能够利用我们的开源复现相应的结果。

我们一共开源了5个规模的模型，分别是OFA-Tiny (33M)，OFA-Medium (93M)，OFA-Base (180M)，OFA-Large(470M)和OFA-Huge (930M)。具体数据查看下表。

{{< figure src="https://qianwen-res.oss-accelerate-overseas.aliyuncs.com/assets/blog/ofa/variants.jpg#center" width="80%" >}}

## 实验

我们在多模态和单模态任务上都做了实验。在视觉-语言理解上，我们在视觉问答和视觉推理上做了实验。在VQA上，OFA的效果和800亿参数的Flamingo以及基于50亿图文数据训练的20亿参数的CoCa效果相当，并且在视觉推理上取得最优成绩。而在视觉-语言生成上，OFA在两个阶段的图像描述评测均取得最优效果。而在视觉定位任务上，base规模的模型就可以超出此前最好的模型，也反映了生成式的方法和多任务训练的有效性，并且随着规模的增加，模型效果也能实现稳定增长。

{{< figure src="https://qianwen-res.oss-accelerate-overseas.aliyuncs.com/assets/blog/ofa/vqa.jpg#center" width="60%" >}}

{{< figure src="https://qianwen-res.oss-accelerate-overseas.aliyuncs.com/assets/blog/ofa/caption.jpg#center" width="80%" >}}

{{< figure src="https://qianwen-res.oss-accelerate-overseas.aliyuncs.com/assets/blog/ofa/vg.jpg#center" width="80%" >}}

此外，我们还在文本图像生成任务上做了测试，因为预训练中我们设计了图像还原任务，模型应当具备一定的图像生成能力。可以看到OFA可以达到非常低的FID分数，并且在更大的数据上微调能明显提升它的生成效果。

{{< figure src="https://qianwen-res.oss-accelerate-overseas.aliyuncs.com/assets/blog/ofa/t2i.jpg#center" width="80%" >}}

{{< figure src="https://qianwen-res.oss-accelerate-overseas.aliyuncs.com/assets/blog/ofa/t2i_cases.jpg#center" width="80%" >}}

单模态方面，我们在GLUE上验证OFA的自然语言理解能力，Gigaword上验证自然语言生成能力，以及ImageNet上验证视觉理解能力。可以看到OFA在GLUE上可以取得匹敌RoBERTa和DeBERTa的效果，而此前的多模态模型距离最优的自然语言模型差距都很大。在摘要生成上，OFA也取得最优效果。而视觉分类上，OFA也能取得匹敌BeiT[^22]和MAE[^23]的效果。

另外，我们观察到OFA具备一定的新任务和新领域的迁移能力。如下图所示。

{{< figure src="https://qianwen-res.oss-accelerate-overseas.aliyuncs.com/assets/blog/ofa/unseen_task.jpg#center" width="80%" >}}

这个例子说明OFA对提示的理解和组合多项技能的能力。我们设计了一个基于定位的视觉问答的任务，相当于视觉问答和定位描述的组合。具体实现方式就是修改任务的提示。包含了问题和定位信息的提示引导模型做出了正确的回答。

{{< figure src="https://qianwen-res.oss-accelerate-overseas.aliyuncs.com/assets/blog/ofa/unseen_domain.jpg#center" width="80%" >}}

另外，OFA迁移到新领域的能力也比较不错。在动画领域数据的定位上，模型能实现较为精准的物体定位。这是因为模型学过这个任务而预训练又见过该领域数据。这也体现了模型的组合能力。

## 总结

这是我们通用统一模型研究工作的起点。我们认为这个方向很有前景，因为Transformer有着一统天下的趋势，同时它能很好地兼容多种模态和任务。我们相信，多模态领域很快也会迎来属于它的GPT-3[^24]！

[^1]: Wang, P., Yang, A., Men, R., Lin, J., Bai, S., Li, Z., Ma, J., Zhou, C., Zhou, J., & Yang, H. (2022).
       Unifying Architectures, Tasks, and Modalities Through a Simple Sequence-to-Sequence Learning Framework.
       International Conference on Machine Learning.
    
[^2]: Chen, Y., Li, L., Yu, L., Kholy, A.E., Ahmed, F., Gan, Z., Cheng, Y., & Liu, J. (2019).
       UNITER: UNiversal Image-TExt Representation Learning.
       European Conference on Computer Vision.
    
[^3]: Lu, J., Batra, D., Parikh, D., & Lee, S. (2019).
       ViLBERT: Pretraining Task-Agnostic Visiolinguistic Representations for Vision-and-Language Tasks.
       Neural Information Processing Systems.
    
[^bert]: Devlin, J., Chang, M., Lee, K., & Toutanova, K. (2019).
       BERT: Pre-training of Deep Bidirectional Transformers for Language Understanding.
       arXiv, abs/1810.04805.
    
[^5]: Dosovitskiy, A., Beyer, L., Kolesnikov, A., Weissenborn, D., Zhai, X., Unterthiner, T., Dehghani, M., Minderer, M., Heigold, G., Gelly, S., Uszkoreit, J., & Houlsby, N. (2020).
       An Image is Worth 16x16 Words: Transformers for Image Recognition at Scale.
       arXiv, abs/2010.11929.
    
[^6]: Ren, S., He, K., Girshick, R.B., & Sun, J. (2015).
       Faster R-CNN: Towards Real-Time Object Detection with Region Proposal Networks.
       IEEE Transactions on Pattern Analysis and Machine Intelligence, 39, 1137-1149.
    
[^7]: Kim, W., Son, B., & Kim, I. (2021).
       ViLT: Vision-and-Language Transformer Without Convolution or Region Supervision.
       International Conference on Machine Learning.
    
[^8]: Radford, A., Kim, J.W., Hallacy, C., Ramesh, A., Goh, G., Agarwal, S., Sastry, G., Askell, A., Mishkin, P., Clark, J., Krueger, G., & Sutskever, I. (2021).
       Learning Transferable Visual Models From Natural Language Supervision.
       International Conference on Machine Learning.
    
[^9]: Shen, S., Li, L.H., Tan, H., Bansal, M., Rohrbach, A., Chang, K., Yao, Z., & Keutzer, K. (2021).
       How Much Can CLIP Benefit Vision-and-Language Tasks?
       arXiv, abs/2107.06383.
    
[^10]: Wang, Z., Yu, J., Yu, A.W., Dai, Z., Tsvetkov, Y., & Cao, Y. (2021).
       SimVLM: Simple Visual Language Model Pretraining with Weak Supervision.
       arXiv, abs/2108.10904.
    
[^11]: Lu, J., Clark, C., Zellers, R., Mottaghi, R., & Kembhavi, A. (2022).
       Unified-IO: A Unified Model for Vision, Language, and Multi-Modal Tasks.
       arXiv, abs/2206.08916.
    
[^12]: Alayrac, J., Donahue, J., Luc, P., Miech, A., Barr, I., Hasson, Y., Lenc, K., Mensch, A., Millican, K., Reynolds, M., Ring, R., Rutherford, E., Cabi, S., Han, T., Gong, Z., Samangooei, S., Monteiro, M., Menick, J., Borgeaud, S., Brock, A., Nematzadeh, A., Sharifzadeh, S., Binkowski, M., Barreira, R., Vinyals, O., Zisserman, A., & Simonyan, K. (2022).
       Flamingo: a Visual Language Model for Few-Shot Learning.
       arXiv, abs/2204.14198.
    
[^13]: Wang, W., Bao, H., Dong, L., Bjorck, J., Peng, Z., Liu, Q., Aggarwal, K., Mohammed, O., Singhal, S., Som, S., & Wei, F. (2022).
       Image as a Foreign Language: BEiT Pretraining for All Vision and Vision-Language Tasks.
       arXiv, abs/2208.10442.
    
[^14]: Ho, J., Jain, A., & Abbeel, P. (2020).
       Denoising Diffusion Probabilistic Models.
       arXiv, abs/2006.11239.
    
[^15]: Razavi, A., Oord, A.V., & Vinyals, O. (2019).
       Generating Diverse High-Fidelity Images with VQ-VAE-2.
       arXiv, abs/1906.00446.
    
[^16]: Esser, P., Rombach, R., & Ommer, B. (2020).
       Taming Transformers for High-Resolution Image Synthesis.
       2021 IEEE/CVF Conference on Computer Vision and Pattern Recognition (CVPR), 12868-12878.
    
[^17]: Ramesh, A., Pavlov, M., Goh, G., Gray, S., Voss, C., Radford, A., Chen, M., & Sutskever, I. (2021).
       Zero-Shot Text-to-Image Generation.
       arXiv, abs/2102.12092.
    
[^18]: Ding, M., Yang, Z., Hong, W., Zheng, W., Zhou, C., Yin, D., Lin, J., Zou, X., Shao, Z., Yang, H., & Tang, J. (2021).
       CogView: Mastering Text-to-Image Generation via Transformers.
       Neural Information Processing Systems.
    
[^19]: Chen, T., Saxena, S., Li, L., Fleet, D.J., & Hinton, G.R. (2021).
       Pix2seq: A Language Modeling Framework for Object Detection.
       arXiv, abs/2109.10852.
    
[^20]: Raffel, C., Shazeer, N.M., Roberts, A., Lee, K., Narang, S., Matena, M., Zhou, Y., Li, W., & Liu, P.J. (2019).
       Exploring the Limits of Transfer Learning with a Unified Text-to-Text Transformer.
       arXiv, abs/1910.10683.
    
[^21]: Shleifer, S., Weston, J., & Ott, M. (2021).
       NormFormer: Improved Transformer Pretraining with Extra Normalization.
       arXiv, abs/2110.09456.
    
[^22]: Bao, H., Dong, L., & Wei, F. (2021).
       BEiT: BERT Pre-Training of Image Transformers.
       arXiv, abs/2106.08254.
    
[^23]: He, K., Chen, X., Xie, S., Li, Y., Doll'ar, P., & Girshick, R.B. (2021).
       Masked Autoencoders Are Scalable Vision Learners.
       2022 IEEE/CVF Conference on Computer Vision and Pattern Recognition (CVPR), 15979-15988.
    
[^24]: Brown, T.B., Mann, B., Ryder, N., Subbiah, M., Kaplan, J., Dhariwal, P., Neelakantan, A., Shyam, P., Sastry, G., Askell, A., Agarwal, S., Herbert-Voss, A., Krueger, G., Henighan, T.J., Child, R., Ramesh, A., Ziegler, D.M., Wu, J., Winter, C., Hesse, C., Chen, M., Sigler, E., Litwin, M., Gray, S., Chess, B., Clark, J., Berner, C., McCandlish, S., Radford, A., Sutskever, I., & Amodei, D. (2020).
       Language Models are Few-Shot Learners.
       arXiv, abs/2005.14165.
