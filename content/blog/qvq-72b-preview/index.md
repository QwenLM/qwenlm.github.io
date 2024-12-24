---
title: "QVQ: To See the World with Wisdom"
date: 2024-12-25T00:00:03+08:00
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


{{< button href="https://github.com/QwenLM/Qwen2-VL" label="GITHUB" external=true >}}
{{< button href="https://huggingface.co/Qwen" label="HUGGING FACE" external=true >}}
{{< button href="https://modelscope.cn/organization/qwen" label="MODELSCOPE" external=true >}}
{{< button href="https://www.kaggle.com/models/qwen-lm/qvq-72b-preview" label="KAGGLE" external=true >}}
{{< button href="https://huggingface.co/spaces/Qwen/QVQ-72B-Preview" label="DEMO" external=true >}}
{{< button href="https://discord.gg/yPEP2vHTu4" label="DISCORD" external=true >}}


Language and vision intertwine in the human mind, shaping how we perceive and understand the world around us. Our ability to reason is deeply rooted in both linguistic thought and visual memory - but what happens when we extend these capabilities to AI? Today's large language models have demonstrated remarkable reasoning abilities, but we wondered: could they harness the power of visual understanding to reach new heights of cognitive capability?

Imagine an AI that can look at a complex physics problem, and methodically reason its way to a solution with the confidence of a master physicist. This vision inspired us to create QVQ - an open-weight model for multimodal reasoning, built upon Qwen2-VL-72B. QVQ represents a significant leap forward in AI's capacity for visual understanding and complex problem-solving. QVQ achieves a score of 70.3 on MMMU and shows substantial improvements across math-related benchmarks compared to Qwen2-VL-72B-Instruct. Through careful step-by-step reasoning, QVQ demonstrates enhanced capabilities in visual reasoning tasks, particularly excelling in domains that demand sophisticated analytical thinking. 




# Limitations


**QvQ-72B-Preview** is an experimental research model developed by the Qwen team, focusing on enhancing visual reasoning capabilities. While it has demonstrated performance that exceeds expectations, there are several limitations to be aware of:

1. **Language Mixing and Code-Switching**: The model may mix languages or switch between them unexpectedly, affecting response clarity.
2. **Recursive Reasoning**: The model may get stuck in circular logic patterns, producing verbose responses without reaching conclusions.
3. **Safety and Ethical Considerations**: The model requires enhanced safety measures to ensure reliable and secure performance, and users should be cautious when deploying it.
4. **Performance and Benchmark Limitations**: Although the model has shown improvements in visual reasoning, it cannot fully replace the capabilities of Qwen2-VL-72B-Instruct. Additionally, during multi-step visual reasoning, the model may gradually lose focus on the image content, leading to hallucinations.


# Performance

We evaluate QVQ-72B-Preview on 4 datasets, including:

* MMMU: A university-level multidisciplinary multimodal evaluation dataset designed to assess models' visual-related comprehensive understanding and reasoning capabilities.
* MathVista: A mathematics-focused visual reasoning test set that evaluates capabilities such as logical reasoning with puzzle test graphics, algebraic reasoning with function graphs, and scientific reasoning with academic paper figures.
* MathVision: A high-quality multimodal mathematical reasoning test set derived from real mathematics competitions, featuring greater problem diversity and subject breadth compared to MathVista.
* OlympiadBench: An Olympic competition-level bilingual multimodal science benchmark test set containing 8,476 problems from Olympic mathematics and physics competitions, including the Chinese college entrance examination. Each problem comes with expert-level annotations detailing the step-by-step reasoning process.

{{< figure src="https://qianwen-res.oss-cn-beijing.aliyuncs.com/QVQ/QVQ.jpg#center" width="100%">}}

In particular, QVQ-72B-Preview has achieved an impressive score of 70.3 on the MMMU benchmark, significantly outpacing its predecessor, Qwen2-VL-72B-Instruct. Furthermore, in the remaining three benchmarks focused on mathematics and science problems, the model demonstrates exceptional performance, effectively closing the gap with the leading state-of-the-art o1 model.


# Demo Cases

In the following section, we present several examples to illustrate the application of this new model in visual reasoning tasks.

{{< fullwidth class="example-container" >}}
{{< example data="cases/1_1.json" hide=false next=true >}}
{{< example data="cases/1_2.json" hide=true next=true >}}
{{< example data="cases/1_3.json" hide=true next=true >}}
{{< example data="cases/1_5.json" hide=true next=true >}}
{{< example data="cases/1_6.json" hide=true next=true >}}
{{< example data="cases/1_7.json" hide=true next=true >}}
{{< /fullwidth >}}



# Next Step

As we progress towards achieving AGI, our vision is to develop a **omni** and **smart** model. To realize this goal, we are enhancing our vision-language foundation model with advanced capabilities for deep thinking and reasoning based on visual information. In the near future, we plan to integrate additional modalities into a unified model, making it even more intelligent and capable of addressing complex challenges and engaging in scientific exploration.