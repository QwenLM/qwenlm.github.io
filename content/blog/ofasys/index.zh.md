---
title: "OFASys：一行代码带你搞定多任务学习！"
date: 2022-12-28T18:01:21+08:00
# weight: 1
# aliases: ["/first"]
# tags: ["Research"]
author: "Junyang Lin"
draft: false
hide_meta: false
comments: false
# description: "Desc Text. "
disable_hljs: false # to disable highlightjs
disable_share: true
hide_summary: false
search_hidden: false
show_reading_time: false
show_bread_crumbs: true
show_post_nav_links: false
show_word_count: false
use_hugo_toc: true
show_toc: false
toc_open: true
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

## 引言
通用模型非常火！我们现在跟随多模态多任务学习的发展似乎看到了实现一个真正的通用模型的机会。我们此前推出的OFA便是朝着这个目标迈向的重要一步。但是，我们在实际实现过程中遇到了非常多的困难。比如说，把多任务训练的模型搭建起来，组织多任务的训练比如给数据打batch和保证训练稳定等等，都非常困难。因此，我们推出一个AI系统OFASys，它主要解决多模态多任务学习的实现问题。简单来说，它主要通过一个叫做“_Instruction_”的接口来实现。_Instruction_ 即指定了任务描述和输入信息的模板。因此，用户只需要写一行代码构建好自己的 _Instruction_，就可以构建一个多模态多任务学习的任务。后续的复杂步骤用户无需关心，包括数据处理、模型构建和训练等。总而言之，OFASys帮你摆脱很多复杂的实现细节，让你专注于设计任务和模态组合等。

{{< button href="https://arxiv.org/abs/2212.04408" label="论文" external=true >}}
{{< button href="https://github.com/OFA-Sys/OFASys" label="GitHub" external=true >}}

{{< figure src="demo.jpg" title="OFASys任务示例" >}}


## 背景
Transformer和预训练技术的蓬勃发展让我们看到了实现通用AI的机会。在自然语言领域，我们见证了GPT-3[^1]以及不可思议的ChatGPT及其背后的GPT-3.5系列，它们都具备了极强的问答、对话、以及文字创作能力等。而在多模态领域，我们也看到通用统一模型的快速崛起，包括我们的OFA[^2]、GATO[^3]、Unified-IO[^4]等。实现这样的模型和系统是困难的，难点往往在于实现中。算法工程师最难受的事情往往是如何实现这样一个模型，并且成功把它训起来，接入不同类型的数据和任务并且对它们实现良好的管理。尽管我们针对深度学习有了PyTorch和TensorFlow这样的基建，以及很多诸如Hugging Face Transformers和fairseq这样的帮助实现Transformer的框架，但当前依然没有一个专门针对多模态多任务学习的提供良好抽象和相关工具的系统。


## 用户接口
介绍系统设计前，我们先看看如何在OFASys中使用1行代码实现一个多任务学习模型。具体而言，你需要写一个合适的 _Instruction_ 。下面是一些例子。

{{< figure src="caption_instruction.jpg" title="图像描述提示" >}}

以上例子中，两个句子用“->”分隔，表示输入和期望输出。“<tt>[IMAGE:img]</tt>”表示有一个图像输入和 数据集中的<tt>img</tt>字段关联。_Instruction_ 中的文本则表示这个任务是图像描述。任务输出是文本序列，即对应数据集中的<tt>cap</tt>字段.

另一个例子是自然语言推理的例子，我们以MNLI为例：

{{< figure src="mnli_instruction.jpg" title="自然语言推理提示" >}}

和上述例子类似，我们用模板和指示词来构建 _Instruction_ 。不同的是，输入侧包含2个输入。此外，由于我们发现在解码器重复输入有助于效果提升，我们在输出端用一个<tt>no_loss</tt>的信号表示不计算这段序列对应的损失函数。而由于标签是一个封闭集，我们用<tt>closed_set</tt>来表示。

简而言之，使用OFASys可以让一切变得简单。你也许只需要1行代码就可以解决问题！

## 系统实现
一个良好的系统实现是一个易用接口的基础。系统实现的整体架构如下所示。

{{< figure src="overview.jpg" title="系统设计总览" class="wide" >}}

OFASys通过解析 _Instruction_ 来将任务定义和任务数据传入任务计划中。每个计划有一个模型的层次结构，其中包括模态特定的前处理和后处理模块以及模态无关的计算引擎。通用模型在这里负责融合多模态输入以及获得输出。由于输入输出都是表示序列，因此通用模型是非常灵活的。通用模型的输出最终传入后处理模块得到最终输出。而诸如损失函数计算以及生成器等都有大量实现方式。

而在多任务学习场景中，有多个上述计划。OFASys共享大部分可训练的参数，这样通用模型能使用尽可能多的数据进行训练。任务调度器在这里负责安排任务优先级以及管理多任务优化，而逻辑调度器则负责安排到多台物理机上。

## 应用实例: OFA+
我们训练了一个基于OFA的通用模型OFA+，它首次实现同时处理文本、图像、语音、视频和动作多种模态。具体包括一个通用的OFA+ (Generalist)以及一个基于多模态MoE的升级版本OFA+ (Generalist MoE)。对比对象则为我们此前的OFA，它需要针对每个任务单独微调，我们称之为OFA+ (Specialist)。

{{< figure src="results.jpg" title="多模态及单模态实验结果" >}}


从上述结果可以看出，OFA+整体能保留接近95%的OFA+ (Specialist)在各个下游任务的效果，其中涵盖7种模态的23个任务。这也能看出来多任务学习不仅赋予模型实现多任务的基础能力，同时能让它在各项任务上都能达到顶级的表现。


## 总结
随着通用模型快速发展，特定系统和库的空缺成了一个棘手的问题。OFASys就是为了解决实现多模态多任务学习难的问题而生。我们希望它能推动多模态多任务学习的研究同时帮助实现更加通用的通用模型。


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