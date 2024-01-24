---
title: "OFASys: Enabling Multitask Learning with One Line of Code! "
date: 2022-12-28T18:01:21+08:00
# weight: 2
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
## Intro

Generalist Models are hot! We all see an opportunity towards a real generalist model by multimodal multitask learning. We previously release an opensourced unified multimodal pretrained model OFA for this goal. However, we actually met a lot of difficulties in our implementation. For example, it is hard to set up multiple tasks concerning multiple modalities, and it is hard to organize multitask learning, e.g., how to batchify your data and how to make your training stable. Therefore, we propose OFASys, an AI framework targeting multimodal multitask learning. In brief, it uses a simple interface called _Instruction_, which is a template for task-specific instruction and input information. Therefore, with 1 line of code for the Instruction, you can build a job of multimodal multitask learning with no worries about the complex processes, e.g., data preprocessing, model building, training, etc. OFASys helps you get rid of many details and gives a chance to focus on designing tasks and modalities.

{{< button href="https://arxiv.org/abs/2212.04408" label="Paper" external=true >}}
{{< button href="https://github.com/OFA-Sys/OFASys" label="GitHub" external=true >}}

{{< figure src="https://qianwen-res.oss-accelerate-overseas.aliyuncs.com/assets/blog/ofasys/demo.jpg#center" width="80%" >}}

## Background

Thanks to Transformer and pretraining, we have witnessed an unprecedented opportunity towards general-purpose AI! In the field of natural language, we now have more than GPT-3[^1], and we even have ChatGPT with extremely comprehensive capabilities in question answering, dialog, creative writing, etc. In the field of multimodal representation learning, we have seen unified models that try to unify tasks and modalities to build a more general AI system, including our proposed OFA[^2], GATO[^3], Unified-IO[^4], etc. However, the key difficulties lie in the implementation. What makes deep learning engineers struggled is how to implement and train such a generalist model with so many datasets concerning inputs of different modalities and tasks. Although we now have PyTorch and TensorFlow for deep learning, and many beautiful frameworks for building Transformer, e.g., Hugging Face Transformers, fairseq, etc., there is still no designated system that provides neat abstractions and tools for task-agnostic generalist model learning.

## User Interface

Before introducing the system design, we first move into the world of OFASys to see how we can build a multitask learning model with a single line of code. To be more specific, what you need to do is composing a proper _Instruction_. Here are several examples of _Instruction_ for different tasks:

{{< figure src="https://qianwen-res.oss-accelerate-overseas.aliyuncs.com/assets/blog/ofasys/caption_instruction.jpg#center" width="80%" >}}

The two sentences separated by “->” describe the task input and its desired output, respectively. In this case, “`<tt>`[IMAGE:img]`</tt>`” specifies that there is an image input bound to a data column named `<tt>`img`</tt>` in the dataset. The plain texts in the _Instruction_ indicate the task is about captioning an image. The output of the task is a text sequence, which is the `<tt>`cap`</tt>` column in the dataset.

Another example is for an NLI task:

{{< figure src="https://qianwen-res.oss-accelerate-overseas.aliyuncs.com/assets/blog/ofasys/mnli_instruction.jpg#center" width="80%" >}}

Similar to the previous one, we use a template and indicators for inputs to build an _Instruction_. Differently, there are two inputs for the encoder. Besides, as we find repeating the input in the decoder is helpful for the downstream performance, we use a signal `<tt>`no_loss`</tt>` to avoid loss computation. As the label set is closed for NLI, we use a signal `<tt>`closed_set`</tt>` for the indication.

To sum up, things can be much easier if you use OFASys. What you need might only be 1 line of code for the _Instruction_.

## System Design

A neat system design is what lies behind an easy-to-use interface. An overview is demonstrated below.

{{< figure src="https://qianwen-res.oss-accelerate-overseas.aliyuncs.com/assets/blog/ofasys/overview.jpg#center" width="80%" >}}

OFASys accesses the task definition and task data through _Instruction_ by parsing _Instructions_ into task plans. In each plan, there is a model hierarchy, consisting of modality-specific preprocessors/postprocessors and adapters, as well as a modality-agnostic computation model. The universal model is namely a general module for fusing multimodal inputs and generating outputs. As the inputs and the outputs are consistently being representation sequences, the implementation of the universal model is highly versatile, regardless of the modality intricacies. The outputs of the universal model is finally postprocessed by the adapters and postprocessors, in order to generate content consistent with the input formats. Stage-wise components, including criteria and generators, provide support in training and inference, which have a variety of out-of-the-box implementations. In this way, different multi-modal data can go through the system with consistent inner interfaces to improve development efficiency.

In multitask learning, there are multiple such plans parsed from the _Instructions_. OFASys shares the trainable parameters of the adapters and the universal model by default, such that each parameter can be optimized on as many examples as possible. A task scheduler manages task precedence and joint optimization, and a logical scheduler arranges the workflow on multiple physical devices.

## Application Example: OFA+

To validate its effectiveness, we train a generalist model based on OFA, OFA+, which can handle text, image, speech, video and motion data all-in-one for the first time. Specifically, we have trained a OFA-based OFA+ (Generalist) and an improved version with modality-level MoE, OFA+ (Generalist MoE). For comparison, we use the original OFA (OFA+ (Specialist)) which is finetuned on each specific task.

{{< figure src="https://qianwen-res.oss-accelerate-overseas.aliyuncs.com/assets/blog/ofasys/results.jpg#center" width="80%" >}}

In general, OFA+ is able to preserve 95+% of the performance of the specialist model while scaling to 23 diverse tasks over 7 modalities. This shows that multitask learning not only endows the generalist model with multiple capabilities but also helps it achieve top-level performance on specific tasks.

## Conclusion

As generalist models attract increasing interests, the lack of designated system and library for multimodal multitask stands out as an obstacle in the path for rapid growth. OFASys is developed to match the need in multimodal multitask learning of extreme modality and task scaling. We hope OFASys would push forward the research in multimodal multitask learning and facilitate the construction of generalist models that are even more general.

[^1]: Brown, T.B., Mann, B., Ryder, N., Subbiah, M., Kaplan, J., Dhariwal, P., Neelakantan, A., Shyam, P., Sastry, G., Askell, A., Agarwal, S., Herbert-Voss, A., Krueger, G., Henighan, T.J., Child, R., Ramesh, A., Ziegler, D.M., Wu, J., Winter, C., Hesse, C., Chen, M., Sigler, E., Litwin, M., Gray, S., Chess, B., Clark, J., Berner, C., McCandlish, S., Radford, A., Sutskever, I., & Amodei, D. (2020).
       Language Models are Few-Shot Learners.
       arXiv, abs/2005.14165.
    
[^2]: Wang, P., Yang, A., Men, R., Lin, J., Bai, S., Li, Z., Ma, J., Zhou, C., Zhou, J., & Yang, H. (2022).
       Unifying Architectures, Tasks, and Modalities Through a Simple Sequence-to-Sequence Learning Framework.
       International Conference on Machine Learning.
    
[^3]: Reed, S., Zolna, K., Parisotto, E., Colmenarejo, S.G., Novikov, A., Barth-Maron, G., Gimenez, M., Sulsky, Y., Kay, J., Springenberg, J.T., Eccles, T., Bruce, J., Razavi, A., Edwards, A.D., Heess, N.M., Chen, Y., Hadsell, R., Vinyals, O., Bordbar, M., & Freitas, N.D. (2022).
       A Generalist Agent.
       arXiv, abs/2205.06175.
    
[^4]: Lu, J., Clark, C., Zellers, R., Mottaghi, R., & Kembhavi, A. (2022).
       Unified-IO: A Unified Model for Vision, Language, and Multi-Modal Tasks.
       arXiv, abs/2206.08916.
