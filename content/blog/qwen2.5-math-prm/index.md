---
title: "Towards Effective Process Supervision in Mathematical Reasoning"
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


# Introduction

In recent years, Large Language Models (LLMs) have made remarkable advances in mathematical reasoning, yet they can make mistakes, such as miscalculations or logical errors, leading to wrong conclusions. Moreover, even when achieving correct final answers, these powerful models can still regularly make up plausible reasoning steps, where the final answers build upon flawed calculations or derivations, which undermine the reliability and trustworthiness of LLMs' reasoning processes. Hence, automated identification of errors in the reasoning process becomes increasingly significant for their scalable oversight. 

Process Reward Models (PRMs) emerge as a promising approach for process supervision in mathematical reasoning of LLMs, which aim to identify and mitigate intermediate errors in the reasoning processes. In terms of evaluation, previous studies have predominantly relied on the response-level Best-of-N (BoN) evaluation, which selects the highest-scored response from $N$ candidates according to a PRM.

Today, we release a new state-of-the-art PRM that outperforms existing open-source alternatives for future research in building process supervision models. We also release the step-level benchmark ProcessBench for measuring the model ability to identify erroneous steps in mathematical reasoning.


# Open-Sourcing ProcessBench

ProcessBench aims to measure the model ability to identify erroneous steps in mathematical reasoning.
It consists of 3,400 test cases, primarily focused on competition- and Olympiad-level math problems. Each test case contains a step-by-step solution with error location annotated by human experts. 
Models are required to identify the earliest step that contains an error, or conclude that all steps are correct. 
ProcessBench can be used to evaluate two types of models: PRMs and critic models, where for the latter we prompt general language models to critique each solution step by step.


# Releasing Process Reward Models
We release two PRMs fine-tuned on Qwen2.5-Math-7B-Instruct and Qwen2.5-Math-72B-Instruct, namely Qwen2.5-Math-PRM-7B and Qwen2.5-Math-PRM-72B respectively. Our trained PRMs exhibit both impressive performance in the BoN evaluation and stronger error identification performance in ProcessBench.

## Best-of-N Evaluation
Following Qwen2.5-Math, we sampled eight responses (i.e., $N=8$) from Qwen2.5-Math-7B-Instruct across multiple mathematical benchmarks, including GSM8K, MATH, Minerva Math, GaoKao 2023 En, OlympiadBench, College Math, and MMLU STEM.
Each candidate response is scored using the product of all the individual scores of each step within the response.
We report the result of majority voting among eight samplings (maj@8) as the baseline, and pass@8 (i.e., the proportion of test samples where any of the eight samplings lead to the correct final answers) as the upper bound.

As shown in the following table, Qwen2.5-Math-PRM-7B demonstrates superior performance compared to other PRMs of equivalent model scale. Notably, it outperforms maj@8 across all 7 tasks, achieving an average improvement of 1.4\%.
Furthermore, Qwen2.5-Math-PRM-72B exhibits slightly better overall performance than Qwen2.5-Math-RM-72B, with particularly significant improvements observed in the Minerva Math and MMLU STEM tasks.


{{< figure src="http://qianwen-res.oss-accelerate-overseas.aliyuncs.com/Qwen2.5/Qwen2.5-Math-PRM/prm_bon.png#center" width="100%">}}


## ProcessBench
We also evaluate our PRMs on ProcessBench to measure the ability of identify erroneous steps. 
When compared with LLM-as-judge, Qwen2.5-Math-PRM-7B in smaller model size demonstrates superior performance over all open-source models. For proprietary language models, Qwen2.5-Math-PRM-7B outperforms GPT-4o-0806, while there remains a performance gap compared to o1-mini.
Furthermore, in comparison with existing PRMs, both Qwen2.5-Math-PRM-7B and Qwen2.5-Math-PRM-72B exhibit substantial advantages over their counterparts.
An interesting observation worth noting is that the Outcome Reward Model (ORM) Qwen2.5-Math-RM-72B exhibits considerable capability in identifying step errors, even surpassing some open-source PRMs, which validates its potential as a complementary reward beyond solely rule-based mechanism.

{{< figure src="http://qianwen-res.oss-accelerate-overseas.aliyuncs.com/Qwen2.5/Qwen2.5-Math-PRM/prm_processbench.png#center" width="100%">}}


# Conclusion
ProcessBench demonstrate the current challenges of existing PRMs and fills the gap in step-level evaluation of PRMs. 
Besides open-sourcing PRMs, we also identify critical limitations in current data construction approaches for PRMs and reveal the potential bias in using response-level BoN evaluation alone for PRMs through extensive empirical studies in our paper.
We hope that ProcessBench and the best practices in training our own PRMs can foster future research and development for reasoning process supervision. 
For more details, please check out our papers in the following!


# Citation

If you find our work helpful, feel free to give us a citation.

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