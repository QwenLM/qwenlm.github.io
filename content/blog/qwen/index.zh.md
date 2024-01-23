---
title: "Qwen介绍"
date: 2024-01-23T22:13:29+08:00
weight: 1
# aliases: ["/first"]
# tags: ["Research"]
# author: ["Junyang Lin", "Binyuan Hui"]
draft: false
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
#     image: "path"
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
四个月前，我们首次发布Qwen-7B大型语言模型（LLM），正式开启了我们的开源之旅。今天，我们介绍Qwen开源家族，更全面的展示我们的工作和目标。下面是开源项目和社区的重要链接。

{{< button href="https://arxiv.org/abs/2309.16609" label="PAPER" external=true >}}
{{< button href="https://github.com/QwenLM/Qwen" label="GITHUB" external=true >}}
{{< button href="https://huggingface.co/Qwen" label="HUGGING FACE" external=true >}}
{{< button href="https://modelscope.cn/organization/qwen" label="MODELSCOPE" external=true >}}
{{< button href="https://discord.gg/z3GAxXZ9C" label="DISCORD" external=true >}}

Additionally, we have WeChat groups for chatting and we invite you to join the groups through the provided link in our GitHub readme.

## 总览

整体上，Qwen不仅仅是一个语言模型，而是一个致力于实现通用人工智能（AGI）的项目，目前包含了大型语言模型（LLM）和大型多模态模型（LMM）。下图展示了Qwen的主要组成部分:

{{< figure src="family.png#center" width="80%">}}

在这里，“Qwen” 指的是基础语言模型，而 “Qwen-Chat” 则指的是通过后训练技术如SFT（有监督微调）和RLHF（强化学习人类反馈）训练的聊天模型。我们还有提供了专门针对特定领域和任务的模型，例如用于编程的 “Code-Qwen” 和用于数学的 “Math-Qwen”。大型语言模型（LLM）可以通过模态对齐扩展到多模态，因此我们有视觉-语言模型 “Qwen-VL” 以及音频-语言模型 “Qwen-Audio” 。值得注意的是，本篇博客仅介绍语言模型，至于多模态模型（LMM），例如Qwen-VL和Qwen-Audio，请参阅其各自的博客。

## 基础模型：对齐的良好起点

构建助手模型的一般流程包括预训练和后训练，后者主要由SFT（有监督微调）和RLHF（强化学习人类反馈）组成。至于预训练，与之前的大语言模型GPT-3、Llama类似，Qwen是一个基于Transformer的语言模型，通过预测下一个词的任务进行预训练。为了简化和稳定性，我们没有为语言模型引入更多的任务，而是专注于模型规模的扩展和数据的扩展。目前，我们已经开发了5种不同大小的模型，其中4种已开源，包括 1.8B、Qwen-7B、Qwen-14B和Qwen-72B。

| Model     | Release Date | Max Length | System Prompt Enhancement | # of Pretrained Tokens | Minimum GPU Memory Usage of Finetuning (Q-Lora) | Minimum GPU Usage of Generating 2048 Tokens (Int4) | Tool Usage |
| --------- | ------------ | ---------- | ------------------------- | ---------------------- | ----------------------------------------------- | -------------------------------------------------- | ---------- |
| Qwen-1.8B | 23.11.30     | 32K        | ✔                        | 2.2T                   | 5.8GB                                           | 2.9GB                                              | ✔         |
| Qwen-7B   | 23.08.03     | 32K        | ✘                        | 2.4T                   | 11.5GB                                          | 8.2GB                                              | ✔         |
| Qwen-14B  | 23.09.25     | 8K         | ✘                        | 3.0T                   | 18.7GB                                          | 13.0GB                                             | ✔         |
| Qwen-72B  | 23.11.30     | 32K        | ✔                        | 3.0T                   | 61.4GB                                          | 48.9GB                                             | ✔         |

模型经过2-3T tokens进行了充分的训练。由于预训练数据是多语言的，Qwen本质上是一个多语言模型，而不是单一语言或双语模型。由于我们预训练数据的限制，该模型在英语和中文方面具有很强的能力，同时也能处理其他语言，如西班牙语、法语和日语。为了扩展其多语种能力，我们采用了一种在编码不同语言信息方面具有高效率的分词器。与其他分词器相比，我们的分词器在一系列语言中展示了高压缩率。

{{< figure src="tokenizer.png#center" width="80%">}}

预训练的另一个重点是扩展上下文长度。我们直接应用了具有更长上下文长度和更大基数值的RoPE（旋转位置编码）的持续预训练。此外，我们发现这种方法在外推方面也是有效的。目前开源的 Qwen 模型大多支持32K词标记的上下文长度，并且通过L-Eval和“大海捞针”进行了评估，验证了其有效性。

| Model           | Input Length | Average | Coursera | GSM   | QuALITY | TOEFL | CodeU | SFcition |
| --------------- | ------------ | ------- | -------- | ----- | ------- | ----- | ----- | -------- |
| ChatGPT-3.5-16k | 16K          | 60.73   | 63.51    | 84.00 | 61.38   | 78.43 | 12.22 | 64.84    |
| Qwen-72B-Chat   | 32K          | 62.30   | 58.13    | 76.00 | 77.22   | 86.24 | 6.66  | 69.53    |

{{< figure src="haystack.png#center" width="80%" >}}

评估基准显示，我们最大的开源模型Qwen-72B以及最大的私有模型在性能上与Llama 2、GPT-3.5和GPT-4具有竞争力。

{{< figure src="result.png#center" width="80%">}}

请注意，这是对基础语言模型的评估。这仅表明我们有了一个良好的后续训练起点，为后续SFT（有监督微调）和RLHF（强化学习人类反馈）做好了准备。

## 对齐

我们将后训练涉及的两种技术（SFT,RLHF）统称为“对齐”。目前的共识是可以通过相对较少量的微调数据获得一个聊天模型。我们专注于提高SFT数据的多样性和复杂性（如instag和tulu 2），并通过人工检查和自动评估严格控制质量。 基于一个良好的SFT模型，我们可以进一步探索RLHF的效果。特别是基于PPO（近端策略优化）的方法，但训练RLHF是困难的。除了PPO训练的不稳定性之外，另一个关键是奖励模型的质量。因此，我们在构建可靠的奖励模型上进行了大量努力，通过在大规模偏好数据上进行奖励模型预训练，以及在精心标记的高质量偏好数据上进行微调。与SFT模型相比，我们发现经过RLHF的模型更具创造性，更好地遵循指令，因此其生成的回复更受人类评注者的青睐。

{{< figure src="rlhf.png#center"  width="80%" >}}

## 工具使用和 Agent

目前大型语言模型（LLMs）最令人惊叹的能力之一是工具使用和扮演Agent的能力。我们直接标记ReAct格式的数据，赋予模型生成思考和行动的能力，并基于之前的步骤和观察生成回复。此外，模型直接学习到了情境学习的能力，可以通过理解指令和示例来使用未见过的工具。 我们目前支持函数调用、代码解释器和huggingface代理，分别用于工具使用、数据分析以及使用AI模型生成不同的输出，比如图像生成。此外，基于我们的代理框架，我们进一步构建了一个名为AgentFabric的项目，类似GPTs，这允许您仅通过与我们的模型进行聊天式配置，就可以为自己构建一个专门的AI Agent。

## 总结

我们发布了Qwen系列，在这篇博客中，我们对Qwen语言模型进行了简单的介绍。目前，我们仍在遵循预训练、SFT和RLHF的方法，正在探索扩展模型和数据的新路径。希望我们的开源工作能够对研究和应用社区做出贡献。
