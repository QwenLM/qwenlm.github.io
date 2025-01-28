---
title: "QVQ: 更睿智地看世界"
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
{{< button href="https://huggingface.co/Qwen/QVQ-72B-Preview" label="DEMO" external=true >}}
{{< button href="https://discord.gg/yPEP2vHTu4" label="DISCORD" external=true >}}


在人类的思维中，语言和视觉紧密交织，塑造着我们感知和理解世界的方式。我们的推理能力深深植根于语言思维和视觉记忆之中。那么，当我们将这些能力赋予人工智能时，会发生什么呢？如今的大语言模型已经展现出卓越的推理能力，但我们不禁思考：它们能否通过掌握视觉理解的力量，攀登认知能力的新高峰？

设想一下，一个人工智能能够像物理学大师一样，面对复杂的物理问题，沉着冷静地通过逻辑推理找到解决方案。正是这样的愿景激发我们创造了 QVQ —— 一个基于 Qwen2-VL-72B 构建的开源多模态推理模型。QVQ 在人工智能的视觉理解和复杂问题解决能力方面实现了重大突破。在 MMMU 评测中，QVQ 取得了 70.3 的优异成绩，并且在各项数学相关基准测试中相比 Qwen2-VL-72B-Instruct 都有显著提升。通过细致的逐步推理，QVQ 在视觉推理任务中展现出增强的能力，尤其在需要复杂分析思维的领域表现出色。




# 局限性


**QVQ-72B-Preview** 是由 Qwen 团队开发的实验性研究模型，专注于增强视觉推理能力。尽管它的表现超出了预期，但仍有几个限制需要注意：

1. **语言混合与切换**：模型可能会意外地混合语言或在语言之间切换，从而影响响应的清晰度。
2. **递归推理**：模型可能会陷入循环逻辑模式，产生冗长的响应而无法得出结论。
3. **安全和伦理考虑**：模型需要增强安全措施，以确保可靠和安全的性能，用户在部署时应保持谨慎。
4. **性能和基准限制**：尽管模型在视觉推理方面有所改善，但它无法完全替代 Qwen2-VL-72B 的能力。此外，在多步骤视觉推理过程中，模型可能会逐渐失去对图像内容的关注，导致幻觉。


# 模型表现

我们在 4 个数据集上评估 QVQ-72B-Preview，包括：

* MMMU：一个大学级别的多学科多模态评测集，旨在考察模型视觉相关的综合理解和推理能力。
* MathVista：一个数学相关的视觉推理测试集，评估拼图测试图形的逻辑推理、函数图的代数推理和学术论文图形的科学推理等能力。
* MathVision：一个高质量多模态数学推理测试集，来自于真实的数学竞赛，相比于MathVista具有更多的问题多样性和学科广度。
* OlympiadBench：一个奥林匹克竞赛级别的双语多模态科学基准测试集，包含来自奥林匹克数学和物理竞赛的8,476个问题，包括中国高考。每个问题都附有专家级别的注释，详细说明了逐步推理的过程。

{{< figure src="https://qianwen-res.oss-cn-beijing.aliyuncs.com/QVQ/QVQ.jpg#center" width="100%">}}

QVQ-72B-Preview 在 MMMU 基准测试中取得了 70.3 的分数，显著超越了 Qwen2-VL-72B-Instruct。此外，在剩下的三个专注于数学和科学问题的基准测试中，该模型表现出色，有效缩小了与领先的最先进的 o1 模型之间的差距。


# 示例

以下，我们将展示几个示例，以说明该新模型在视觉推理任务中的应用。

{{< fullwidth class="example-container" >}}
{{< example data="cases/1_1.json" hide=false next=true >}}
{{< example data="cases/1_2.json" hide=true next=true >}}
{{< example data="cases/1_3.json" hide=true next=true >}}
{{< example data="cases/1_5.json" hide=true next=true >}}
{{< example data="cases/1_6.json" hide=true next=true >}}
{{< example data="cases/1_7.json" hide=true next=true >}}
{{< /fullwidth >}}



# 未来工作

随着我们朝着实现AGI的目标迈进，我们的愿景是开发一个**全能**和**智能**的模型。为了实现这一目标，我们正在增强我们的视觉语言基础模型，赋予其基于视觉信息的深度思考和推理的高级能力。在不久的将来，我们计划将更多的模态整合到一个统一的模型中，使其更加智能，能够应对复杂的挑战并参与科学探索。