---
title: "面向有效的数学推理过程监督"
date: 2025-01-14T00:00:03+08:00
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

{{< figure src="http://qianwen-res.oss-accelerate-overseas.aliyuncs.com/Qwen2.5/Qwen2.5-Math-PRM/Qwen2.5-Math-PRM.png#center" width="100%">}}

{{< button href="https://github.com/QwenLM/Qwen2-Math" label="GITHUB" external=true >}}
{{< button href="https://huggingface.co/collections/Qwen/qwen25-math-66eaa240a1b7d5ee65f1da3e" label="HUGGING FACE" external=true >}}
{{< button href="https://modelscope.cn/organization/qwen" label="MODELSCOPE" external=true >}}
{{< button href="https://discord.gg/yPEP2vHTu4" label="DISCORD" external=true >}}


# 引言

近年来，大型语言模型（LLMs）在数学推理方面取得了显著进展，但它们仍可能犯错误，如计算错误或逻辑错误，导致得出错误结论。
此外，即使最终答案正确，这些强大的模型也经常编造看似合理的推理步骤，其中最终答案基于有缺陷的计算或推导过程，这削弱了LLMs推理过程的可靠性和可信度。
因此，自动识别推理过程中的错误对于其可扩展监督变得越来越重要。

过程奖励模型（Process Reward Models, PRMs）作为数学推理过程监督中的一种有前途的方法出现，旨在识别和减轻推理过程中的中间错误。在评估方面，以往的研究主要依赖于响应级别的Best-of-N（BoN）评估，即根据PRM从N个候选答案中选择得分最高的响应。

今天，我们开源了最先进的PRMs，它优于现有的开源PRM。我们还发布了步骤级别的评估标准 ProcessBench，用于测量模型识别数学推理中错误步骤的能力。


# ProcessBench 开源

ProcessBench旨在衡量模型识别数学推理中错误步骤的能力。
它由3,400个测试案例组成，主要集中在竞赛和奥林匹克级别的数学问题上。每个测试案例包含一个逐步解决方案，并由人类专家标注错误位置。
模型需要识别出第一个错误的步骤，或者得出所有步骤都正确的结论。
ProcessBench可以用于评估两种类型的模型：PRMs和批评模型，后者通过提示通用语言模型来逐步检查回答中的步骤。

# Process Reward Model 开源
我们发布了两个PRMs，即Qwen2.5-Math-PRM-7B和Qwen2.5-Math-PRM-72B，它们分别在Qwen2.5-Math-7B-Instruct和Qwen2.5-Math-72B-Instruct上进行微调得来。
我们训练的PRMs在BoN评估中表现出色，在ProcessBench上的错误步骤识别能力也更强。


## Best-of-N 评测
按照Qwen2.5-Math的方法，我们从多个数学基准测试中用Qwen2.5-Math-7B-Instruct采样了八个回答（即N=8），包括GSM8K、MATH、Minerva Math、GaoKao 2023 En、OlympiadBench、College Math和MMLU STEM。
每个候选回答的得分是该回答中每个步骤的分数乘积。
我们将八次采样中的多数投票结果（maj@8）作为基线，将pass@8（即在八次采样中有任意一个采样得出正确最终答案的测试样本比例）作为上限。

如下表所示，Qwen2.5-Math-PRM-7B相比其他同等规模的PRMs表现出更优的性能。值得注意的是，它在所有7项任务中均优于maj@8，平均提高了1.4%。
此外，Qwen2.5-Math-PRM-72B的整体性能略优于Outcome Reward Model (ORM) Qwen2.5-Math-RM-72B，特别是在Minerva Math和MMLU STEM任务中表现显著。


{{< figure src="http://qianwen-res.oss-accelerate-overseas.aliyuncs.com/Qwen2.5/Qwen2.5-Math-PRM/prm_bon.png#center" width="100%">}}


## ProcessBench

我们还在ProcessBench上评估了我们的PRMs，以测量其识别错误步骤的能力。
与LLM-as-judge相比，Qwen2.5-Math-PRM-7B以较小规模在所有开源LLM中表现出色；对于闭源模型，Qwen2.5-Math-PRM-7B超越了GPT-4o-0806，但在性能上仍与o1-mini存在差距。
此外，与现有的PRMs相比，Qwen2.5-Math-PRM-7B和Qwen2.5-Math-PRM-72B都显示出显著的优势。
一个有趣的观察是，ORM Qwen2.5-Math-RM-72B在识别步骤错误方面也表现出不错的能力，甚至超过了某些开源PRMs。


{{< figure src="http://qianwen-res.oss-accelerate-overseas.aliyuncs.com/Qwen2.5/Qwen2.5-Math-PRM/prm_processbench.png#center" width="100%">}}



# 结论

ProcessBench展示了现有PRMs面临的挑战，并填补了PRMs步骤级别评估的空白。
除了开源PRMs以外，我们还在论文中通过广泛的实证研究识别了当前PRMs数据构建方法的局限性，并揭示了仅使用响应级别BoN评估PRMs的潜在偏差。
我们希望ProcessBench、我们开发PRM的最佳实践能够促进未来对推理过程监督的研究和开发。
更多细节请查看我们下面的论文。


# 引用

如果你觉得我们的工作有用，欢迎引用！

```
@article{processbench,
  title={{ProcessBench:} Identifying Process Errors in Mathematical Reasoning}, 
  author={
    Chujie Zheng and Zhenru Zhang and Beichen Zhang and Runji Lin and Keming Lu and
    Bowen Yu and Dayiheng Liu and Jingren Zhou and Junyang Lin
  },
  journal={arXiv preprint arXiv:2412.06559},
  year={2024}
}
@article{prmlessons,
  title={The Lessons of Developing Process Reward Models in Mathematical Reasoning}, 
  author={
    Zhenru Zhang and Chujie Zheng and Yangzhen Wu and Beichen Zhang and Runji Lin and Bowen Yu and Dayiheng Liu and Jingren Zhou and Junyang Lin
  },
  journal={arXiv preprint arXiv:2501.07301},
  year={2025}
}
```