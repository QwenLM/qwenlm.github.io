---
title: "Qwen2.5-Coder: 码无止境，学无止境!"
date: 2024-09-19T00:00:02+08:00
weight: 1
# aliases: ["/first"]
# tags: ["Research"]
# draft: true
# comments: false
# description: "Desc Text."
# disable_share: false
# hide_meta: false
# hide_summary: false # to hide summary in list
# hide_footer: false
math: true
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
{{< figure src="https://qianwen-res.oss-cn-beijing.aliyuncs.com/Qwen2.5/Qwen2.5-Coder/coder-main.png#center" width="70%">}}

{{< button href="https://github.com/QwenLM/Qwen2.5-Coder" label="GITHUB" external=true >}}
{{< button href="https://huggingface.co/Qwen" label="HUGGING FACE" external=true >}}
{{< button href="https://modelscope.cn/organization/qwen" label="MODELSCOPE" external=true >}}
{{< button href="https://huggingface.co/spaces/Qwen/Qwen2.5-Coder-7B-Instruct" label="DEMO" external=true >}}
{{< button href="https://discord.gg/yPEP2vHTu4" label="DISCORD" external=true >}}

# 简介

四月初，我们发布了 CodeQwen1.5, 得到了社区广泛的关注与喜爱。自那以后，我们一直在继续努力提升代码模型。今天，我们很高兴地宣布新一代的开放代码模型 Qwen2.5-Coder 的发布。并正式将 CodeQwen 的命名改为 Qwen-Coder，我们认为 Coder 更加拟人、灵动，期待其可以在未来真正与人类结对编程。Qwen2.5-Coder 是我们 Qwen2.5 开源家族的一员，共包括三个尺寸的模型：1.5B、 7B 和 32B（在路上）。

本次更新的两大核心包括代码训练数据的进一步 scaling，以及探索在提升代码能力的同时保持数学和通用能力。

1. 码无止境：Qwen2.5-Coder 基于强大的 Qwen2.5 初始化，扩增了更大规模的代码训练数据持续训练，包括源代码、文本代码混合数据、合成数据等共计 5.5T tokens。使得 Qwen2.5-Coder 在代码生成、代码推理、代码修复等任务上都有了显著提升。
2. 学无止境：我们希望 Qwen2.5-Coder 在提升代码能力的同时，也能保持在数学、通用能力等方面的优势。因此，我们在 Qwen2.5-Coder 中加入了更多的数学、通用能力数据，为未来的真实应用提供更为全面的基座。

# Qwen2.5-Coder: Base Models

Qwen2.5-Coder 最多 **128K** tokens 上下文，支持 92 种编程语言，并在多个代码相关的评估任务中都取得了显著的提升，包括代码生成、多编程语言代码生成、代码补全、代码修复等。值得注意的是，本次开源的 7B 版本 Qwen2.5-Coder，甚至打败了更大尺寸的 DeepSeek-Coder-V2-Lite 和 Codestral-20B，成为当前最强大的基础代码模型之一。除了代码任务外，Qwen2.5-Coder 也具备极具竞争力的数学能力。面向通用任务，我们评估了 MMLU 和 ARC，结果表明 Qwen2.5-Coder 很好的保持了 Qwen2.5 的通用能力。

{{< figure src="https://qianwen-res.oss-cn-beijing.aliyuncs.com/Qwen2.5/Qwen2.5-Coder/qwen2.5-coder-base.jpg#center" width="100%">}}

# Qwen2.5-Coder-Instruct: Instruction-Tuned Models

我们在 Qwen2.5-Coder 的基础上，通过指令微调，得到了 Qwen2.5-Coder-Instruct。Qwen2.5-Coder-Instruct 除了进一步提升了多个任务上的性能外，还在更多的评估中体现出了卓越的泛化性。

{{< figure src="https://qianwen-res.oss-cn-beijing.aliyuncs.com/Qwen2.5/Qwen2.5-Coder/qwen2.5-coder-instruct.jpg#center" width="100%">}}

特别的，Qwen2.5-Coder-Instruct 在几个方面表现非常突出：

1. 卓越的多编程语言能力：为了更广泛的评估多编程语言能力，我们使用 McEval 在 Qwen2.5-Coder-Instruct 上进行了更多的测试，共设计 40 多种编程语言。结果表明 Qwen2.5-Coder-Instruct 在多种编程语言任务上表现非常出色，包括一些小众语言。

{{< figure src="https://qianwen-res.oss-cn-beijing.aliyuncs.com/Qwen2.5/Qwen2.5-Coder/mveval.jpg#center" width="70%">}}


2. 代码推理：我们认为代码推理能力和通用推理能力是密切相关的，我们选择 CRUXEval 作为评估基准，结果表明 Qwen2.5-Coder-Instruct 在代码推理任务上表现非常出色。更有趣的是，我们发现随着代码推理能力的提升，模型的复杂指令遵循也得到了增强，这鼓舞我们继续探索代码对于通用能力的增益。

{{< figure src="https://qianwen-res.oss-cn-beijing.aliyuncs.com/Qwen2.5/Qwen2.5-Coder/crux.jpg#center" width="70%">}}


3. 数学能力：数学和代码经常被一起讨论，数学是代码的基础学科，代码是数学的重要工具。我们发现 Qwen2.5-Coder-Instruct 在代码和数学任务上都表现出色，是一个名副其实的理科生。

| **Model**                       | **Math**  | **GSM8K** | **GaoKao2023en** | **OlympiadBench** | **CollegeMath** | **AIME24** |
| ------------------------------- | --------- | --------- | ---------------- | ----------------- | --------------- | ---------- |
| DeepSeek-Coder-V2-Lite-Instruct | 61        | **87.6**  | 56.1             | 26.4              | 39.8            | 6.7        |
| Qwen2.5-Coder-7B-Instruct    | **66.8**  | 86.7      | **60.5**         | **29.8**          | **43.5**        | **10**     |

4. 基础能力：我们还在通用能力上进行了评估，结果表明 Qwen2.5-Coder-Instruct 在通用能力上也保持了 Qwen2.5 的优势。
   
| **Model**                       | **AMC23** | **MMLU**  | **MMLU-Pro**     | **IFEval**        | **CEval**       | **GPQA**   |
| ------------------------------- | --------- | --------- | ---------------- | ----------------- | --------------- | ---------- |
| DeepSeek-Coder-V2-Lite-Instruct | 40.4      | 42.5      | 60.6             | 38.6              | 60.1            | 27.6       |
| Qwen2.5-Coder-7B-Instruct    | **42.5**  | **45.6**  | **68.7**         | **58.6**          | **61.4**        | **35.6**   |

# 模型许可

Qwen2.5-Coder 采用**Apache 2.0**的许可。我们希望本次开放程度的提升能够加速 Qwen2.5-Coder 在代码智能方面的应用。

# What's Next for Qwen2.5-Coder?

我们正在筹备 32B 版本的 Qwen2.5-Coder，期待可以直接向闭源模型发起挑战，很快就会和大家见面，敬请期待！
除此之外，我们还在积极探索以代码为中心的强大推理模型，探索代码智能的边界。

# Citation

```
@article{hui2024qwen2,
  title={Qwen2. 5-Coder Technical Report},
  author={Hui, Binyuan and Yang, Jian and Cui, Zeyu and Yang, Jiaxi and Liu, Dayiheng and Zhang, Lei and Liu, Tianyu and Zhang, Jiajun and Yu, Bowen and Dang, Kai and others},
  journal={arXiv preprint arXiv:2409.12186},
  year={2024}
}
@article{yang2024qwen2,
  title={Qwen2 technical report},
  author={Yang, An and Yang, Baosong and Hui, Binyuan and Zheng, Bo and Yu, Bowen and Zhou, Chang and Li, Chengpeng and Li, Chengyuan and Liu, Dayiheng and Huang, Fei and others},
  journal={arXiv preprint arXiv:2407.10671},
  year={2024}
}
```
