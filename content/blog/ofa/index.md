---
title: "OFA: Towards Building a One-For-All Model"
date: 2022-11-14T16:01:41+08:00
weight: 2
# aliases: ["/first"]
tags: ["Research"]
author: "Junyang Lin"
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

{{< video src="demo.mp4" autoplay=true loop=true title="OFA conducts multimodal tasks in a unified way." class="gallery" >}}

2022 is a year of generalist models! With the bloom of multimodal pretraining, especially the unified model, we have witnessed the opportunity to building a generalist model that is capable of processing tasks of different modalities or multi-modalities! Thus, we propose OFA[^1], namely One-For-All, a unified multimodal pretrained model that unifies understanding and generation tasks concerning modalities into a single framework, and we pretrain OFA with the instruction-based multitask-pretraining that endows it with multiple capabilities. We opensourced both the pretrained and finetuned models to the community, hoping this pioneer work can help accelerate the development of generalist models. 


{{< button href="https://arxiv.org/abs/2202.03052" label="Paper" external=true >}}
{{< button href="https://github.com/OFA-Sys/OFA" label="Github" external=true >}}
{{< button href="https://www.modelscope.cn/models?name=ofa" label="ModelScope" external=true >}}
{{< button href="https://huggingface.co/spaces/OFA-Sys/OFA-Generic_Interface" label="Demo" external=true >}}


## Background

{{< figure src="uniter.jpg" title="Transfer BERT to multimodal representation learning." >}}

Multimodal pretraining has been developing rapidly ever since the transfer of BERT[^bert] to cross-modal representation learning. Representative studies include UNITER[^2], VilBERT[^3], etc. These studies directly incorporate the Transformer-based BERT[^bert] to a single-stream or dual stream framework for multimodal pretraining, and transform the image to a sequence of object features to be concatenated with the word embeddings as the input of Transformer. Later in 2021, with the rise of Vision Transformer[^5], there came methods that got rid of object-level features, which depend on complex preprocessing pipelines, say Faster-RCNN[^6]: For example, the simplest ViLT[^7] based on patch projection, the CLIP-based[^8] CLIP-ViL[^9], etc. One milestone after should be the proposal of SimVLM[^10], which leverages the T5/BART method for multimodal pretraining and achieves new SoTA in many tasks. These progress should be regarded as the foundation of unified multimodal pretrained models in 2022, including OFA of ours, Unified-IO[^11], Flamingo[^12], BeiT-3[^13], etc. 


## Method
What OFA wants to achieve is the unification of tasks, modalities, and architecture. We suppose there are three features for a unified model, i.e., task agnostic, modality agnostic, and task comprehensiveness. To further explain them, "task agnostic" indicates that the unified model should be able to accept tasks without modifying its own architecture and training methods, "modality agnostic" indicates that a unified model should accept inputs of different modalities without knowing what they are and designing complex preprocessing, and "task comprehensiveness" indicates that the unified model should learn as many tasks as possible so that it can transfer to unseen tasks with the composition of existing capabilities. Thus, we propose 3 types of unification for OFA, namely the unification of modalities, architecture, and tasks. Let's figure them out one by one. 

For the unification of modalities, one key issue is the tokenization of inputs of different modalities, or to say, the discretization. Otherwise, there should be other solutions like diffusion models[^14] for the generation. There is no need to change the tokenization for texts, but the images and bounding boxes need to be discretized. Owing to the success of vector quantization[^15] [^16] and text-to-image generation with Transformer[^17] [^18], images can be represented with VQ tokens. Inspired by pix2seq[^19], bounding boxes can also be discretized with bins. 

{{< figure src="io.jpg" title="Tokenization of inputs of different modalities in OFA." >}}


We choose the universal Transformer encoder-decoder architecture, due to its successful usages in NLP unified models like T5[^20]. Note that for the input of images to the Transformer, we use the first three blocks of ResNet. For the Transformer architecture, we modify the design by incorporating Normformer[^21] for the training stability and transfer performance. 

{{< figure src="arc.jpg" title="Model structure of OFA." >}}

The multitask learning is the key innovation of OFA. Specifically, we pretrain the model with 8 tasks, including 5 vision-language tasks, 2 vision tasks, and 1 language task. The vision-language tasks include visual grounding, grounded captioning, visual question answering, image-text matching, and image captioning. The vision tasks include detection and image infilling. The language task is text infilling. To help the model differentiate tasks, we insert an instruction, which is simply a piece of text describing the task. Thus, we expect the model to perform zero-shot generation based on a new instruction indicating an unseen task. 


{{< figure src="task.jpg" title="Task formulation in OFA." >}}

To make this research as reproducible as possible, our pretraining is dependent on public datasets. Therefore, we expect the researchers following this work can reproduce our results with our opensourced code. 

We have released OFA models of 5 sizes, including OFA-Tiny (33M), OFA-Medium (93M), OFA-Base (180M), OFA-Large(470M), OFA-Huge (930M). See the table below for more statistics. 

{{< figure src="variants.jpg" title="OFA model series." >}}

## Experiments
We have conducted experiments on multiple cross-modal tasks and unimodal tasks. On vision-language understanding, we test the models on VQA and SNLI-VE. We find that the huge-size model can achieve a comparable performance to the 80B-parameter model Flamingo and the 2B-parameter model CoCa pretrained on 5B image-text pairs. Furthermore, we achieve the best performance on visual entailment. For vision-language generation, we focus on the classical image captioning, and our OFA achieves the SoTA performance in both setups of cross-entropy optimization and CIDEr optimization. Also, we have transformed the task of visual grounding to a generation task, and we find that even the base-size OFA can outperform the previous SoTA, and the scaling of model size consistently brings performance improvements. This shows the significance of the unification of modalities and tasks. 

{{< figure src="vqa.jpg#center" width="500px" title="Results on VQA v2." >}}

{{< figure src="caption.jpg" title="Results on COCO Captioning." >}}

{{< figure src="vg.jpg" title="Results of visual grounding on RefCOCO." >}}


Additionally, we test OFA on text-to-image generation, as we believe that the image infilling task in pretraining endows it with the capability to generate image codes. We show that OFA can achieve a low FID score in the evaluation, and further finetuning on a larger dataset can significantly boost its performance. See cases below. 


{{< figure src="t2i.jpg" title="Results of text-to-image synthesis." >}}

{{< figure src="t2i_cases.jpg" title="More text-to-image synthesis cases." class="wide gallery" >}}

As to the unimodal tasks, we evaluate OFA on the GLUE benchmark for NLU, Gigaword summarization for NLG, and ImageNet classification for vision understanding. We show that OFA can be competitive with both RoBERTa and DeBERTa, and the previous multimodal pretrained model often falls far behind the SoTAs in NLU. Similarly, OFA can achieve good performance on NLG and outperform the previous best models. As to image classification, it can also achieve similar performance with the self-supervised vision models like BeiT[^22] and MAE[^23].

We observe that OFA based on multitask pretraining demonstrates potential in transferring to unseen tasks and unseen domains. We show them with two cases below. 

{{< figure src="unseen_task.jpg" title="Transfer to unseen tasks." >}}

The preceding case demonstrates the model's ability of compositional generalization by understanding the instruction and leveraging two learned capabilities to perform the new task. We set up a new task called _Grounded VQA_, which is a combination of VQA and grounded captioning. What we need to change is the instruction. The new task instruction with both question and region information directs the model to provide a correct answer. 


{{< figure src="unseen_domain.jpg" title="Transfer to unseen domains." class="wide gallery" >}}


Also, we find that OFA can transfer to unseen domains effectively. One example is the visual grounding on images of animation. OFA can perform well in this setup as it has been pretrained on some anime data and it has been pretrained on visual grounding on general-domain data. This again shows the compositional ability of the unified model. 

## Conclusion

This is the starting point of our research for the technically "One-For-All" model, or to say, the generalist model. We show that this research direction is promising as Transformer is a really powerful architecture and tasks and modalities can be unified to a single training framework. Like GPT-3[^24], we believe that there will soon be a powerful foundation model in multimodal representation learning. 



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


