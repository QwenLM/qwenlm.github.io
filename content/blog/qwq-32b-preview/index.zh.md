---
title: "QwQ: 思忖未知之界"
date: 2024-11-28T00:00:03+08:00
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


{{< button href="https://github.com/QwenLM/Qwen2.5" label="GITHUB" external=true >}}
{{< button href="https://huggingface.co/Qwen" label="HUGGING FACE" external=true >}}
{{< button href="https://modelscope.cn/organization/qwen" label="MODELSCOPE" external=true >}}
{{< button href="https://huggingface.co/spaces/Qwen/QwQ-32B-preview" label="DEMO" external=true >}}
{{< button href="https://discord.gg/yPEP2vHTu4" label="DISCORD" external=true >}}

<i style="color: grey;">注意：QwQ 的发音为 /kwju:/ ，与单词 "quill" 的读音近似。</i>

思考、质疑、理解，是人类探索未知的永恒追求。在这条探索之路上，QwQ犹如一位怀抱无尽好奇的学徒，以思考和疑问照亮前路。QwQ体现了古老的哲学精神：它深知自己一无所知，而这种认知正是其好奇心的源泉。在探寻答案的过程中，它始终保持自省，以理性之光审视每一个假设，在不同的思维维度中穿行，追寻更深层的真理。

然而，正如所有智慧的追求者一样，QwQ也有其局限性。这个版本只是漫长旅程中的一个初步阶段——它仍在学习如何行走于理性之路。它的思绪偶尔飘散，答案或许未尽完善，智慧仍在积淀。但这就是学习的美妙之处：既有能力又保持谦逊，既有知识又永远充满疑问。我们邀请您与QwQ一同探索，接纳它的洞见与不完美，共同踏上这无尽的理解之旅。

# 模型局限性

QwQ-32B-Preview 是由 Qwen 团队开发的实验性研究模型，专注于增强 AI 推理能力。作为预览版本，它展现了令人期待的分析能力，同时也存在以下局限：

1. **语言切换问题**：模型可能在回答中混合使用不同语言，影响表达的连贯性。

2. **推理循环**：在处理复杂逻辑问题时，模型偶尔会陷入递归推理模式，在相似思路中循环。这种行为虽然反映了模型试图全面分析的努力，但可能导致冗长而不够聚焦的回答。

3. **安全性考虑**：尽管模型已具备基础安全管控，但仍需要进一步增强。它可能产生不恰当或存在偏见的回答，且与其他大型语言模型一样，可能受到对抗攻击的影响。我们强烈建议用户在生产环境中谨慎使用，并采取适当的安全防护措施。

4. **能力差异**：QwQ-32B-Preview 在数学和编程领域表现出色，但在其他领域仍有提升空间。模型性能会随任务的复杂度和专业程度而波动。我们正通过持续优化，努力提升模型的综合能力。



# 模型表现

通过深入的探索和无数的试验，我们发现了一个深刻的道理：当模型有足够的时间思考、质疑和反思时，它对数学和编程的理解就会深化。就像学生通过认真地检查自己的工作并从错误中学习变得更加聪明一样，我们的模型也通过耐心和深思熟虑的分析获得了更深入的见解。这种细致的反思和自我质疑的过程使得模型能够取得解决复杂问题的突破性进展。我们的探索之旅揭示了模型在数学和编程领域解决一些最具挑战性的问题的卓越能力，包括：


* GPQA：一个通过研究生级别问题评估高阶科学解题能力的评测集，旨在考察科学问题解决能力。
* AIME：涵盖算术、代数、计数、几何、数论、概率等中学数学主题的综合评测，测试数学问题解决能力。
* MATH-500：包含500个测试样本的MATH评测集，全面考察数学解题能力。
* LiveCodeBench：评估真实编程场景中代码生成和问题解决能力的高难度评测集。

{{< figure src="https://qianwen-res.oss-cn-beijing.aliyuncs.com/assets/blog/qwq-32b-preview/QwQ-32B-Preview_result.png#center" width="100%">}}

{{< figure src="https://qianwen-res.oss-cn-beijing.aliyuncs.com/assets/blog/qwq-32b-preview/QwQ-32B-Preview_acc_with_k.png#center" width="65%">}}


具体表现如下：

1. GPQA：65.2%，展示了研究生水平的科学推理能力；
2. AIME：50.0%，证明了强大的数学问题解决技能；
3. MATH-500：90.6%，体现了在各类数学主题上的全面理解；
4. LiveCodeBench：50.0%，验证了在实际编程场景中的出色表现。

这些成果充分体现了QwQ在分析和问题解决能力方面的显著进步，尤其是在需要深度推理的技术领域。

### 样例

下列样例展示了QwQ深度自省的能力——质疑自身假设、进行深思熟虑的自我对话，并仔细审视其推理过程的每一步。


{{< fullwidth class="example-container" >}}
{{< example data="cases/logic.zh.json" hide=false next=true >}}
{{< example data="cases/math.zh.json" hide=true next=true >}}
{{< /fullwidth >}}


# 探索之路的反思

大型语言模型的推理过程是一个复杂而多面的课题，我们的研究团队在多个领域进行了深入的探索。从 Process Reward Model 到 LLM Critique，从多步推理到强化学习，我们一步步地推进着对智能的理解。虽然我们尚未明确最终的目标，但每一步的努力都使我们更接近真理、更接近智能。我们坚信，通过不懈的努力和探索，奇迹终将发生。