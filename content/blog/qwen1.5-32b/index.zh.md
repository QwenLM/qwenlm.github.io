---
title: "Qwen1.5-32B：Qwen1.5语言模型系列的最后一块拼图"
date: 2024-04-02T13:33:00+08:00
weight: 1
# aliases: ["/first"]
# tags: ["Research"]
# draft: false
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

{{< button href="https://github.com/QwenLM/Qwen1.5" label="GITHUB" external=true >}}
{{< button href="https://huggingface.co/Qwen" label="HUGGING FACE" external=true >}}
{{< button href="https://modelscope.cn/organization/qwen" label="MODELSCOPE" external=true >}}
{{< button href="https://huggingface.co/spaces/Qwen/Qwen1.5-72B-Chat" label="DEMO" external=true >}}
{{< button href="https://github.com/QwenLM/Qwen/blob/main/assets/wechat.png" label="WeChat" external=true >}}


# 简介

{{< figure src="https://qianwen-res.oss-accelerate-overseas.aliyuncs.com/assets/blog/qwen1.5-32b/32b.png#center" width="100%">}}

开源社区长期以来一直在寻求一种能在性能、效率和内存占用之间达到理想平衡的模型。尽管出现了诸如Qwen1.5-72B和DBRX这样的SOTA模型，但这些模型持续面临诸如内存消耗巨大、推理速度缓慢以及显著的微调成本等问题。当前，参数量约30B的模型往往在这方面被看好，得到很多用户的青睐。顺应这一趋势，我们推出Qwen1.5语言模型系列的最新成员：Qwen1.5-32B和Qwen1.5-32B-Chat。

过去数月中，我们精心研发了Qwen1.5-32B基础模型，旨在对标甚至超越当前最先进的30B模型所设定的性能基准。同时，我们在对齐方面取得了进展，特别是在RLHF方面，以提升Qwen1.5-32B-Chat的对话能力。


# 模型效果

Qwen1.5-32B 是 Qwen1.5 语言模型系列的最新成员，除了模型大小外，其在模型架构上除了GQA几乎无其他差异。GQA能让该模型在模型服务时具有更高的推理效率潜力。

以下我们将对比展示其与参数量约为30B或更大的当前最优（SOTA）模型在基础能力评估、chat评估以及多语言评估方面的性能。以下是对于基础语言模型能力的评估结果：

| Model        | MMLU | C-Eval | GSM8K | MATH | HumanEval | MBPP | BBH | CMMLU |
| :----------- | :--: | :----: | :---: | :--: | :-------: | :--: | :--: | :---: |
| Llama2-34B   | 62.6 |   -    | 42.2 | 6.2 |   22.6   | 33.0 | 44.1 |   -   |
| Yi-34B       | 76.3 |  81.4  | 67.2 | 14.4 |   23.2   | 41.0 | 54.3 | 83.7|
| Mixtral-8x7B | 70.6 |   -    | 74.4 | 28.4 |   40.2   | 60.7 |  -  |   -   |
| Qwen1.5-72B  | 77.5 |  84.1  | 79.5 | 34.1 |   41.5   | 53.4 | 65.5 | 83.5 |
| Qwen1.5-32B  | 73.4 |  83.5  | 77.4 | 36.1 |   37.2   | 49.4 | 66.8 | 82.3 |

我们的32B模型在多种任务上展现出颇具竞争力的表现，涵盖MMLU、GSM8K、HumanEval以及BBH等。相较于72B参数模型，Qwen1.5-32B虽在性能上有轻微下降，但在多数任务中仍优于其他30B级别模型，如Llama2-34B和Mixtral-8x7B。

而在Chat模型的评估上，我们遵循Qwen1.5的评估方案，对它们在MT-Bench与Alpaca-Eval 2.0上的表现进行了测试。具体结果如下：

<table>
    <tr>
        <th rowspan="2" align="center">Models</th>
        <th colspan="1" align="center">MT-Bench</th>
        <th colspan="1" align="center">AlpacaEval 2.0</th>
    </tr>
    <tr>
        <th align="center">Avg. Score</th><th align="center">LC Win Rate</th>
    </tr>
    <tr>
        <td>Qwen1.5-72B-Chat</td>
        <td align="center">8.61</td>
        <td align="center">36.60</td>
    </tr>
    <tr>
        <td>Qwen1.5-32B-Chat</td>
        <td align="center">8.30</td>
        <td align="center">27.49</td>
    </tr>
</table>

值得注意的是，Qwen1.5-32B-Chat的得分超过8分，且Qwen1.5-32B-Chat与Qwen1.5-72B-Chat之间的差距相对较小。这一结果表明，对于需要更高效、更经济实惠的应用解决方案的用户而言，32B模型是一个可行的选择。

我们还对Qwen1.5-32B的多语言能力进行了测试，涵盖了包括阿拉伯语、西班牙语、法语、葡萄牙语、德语、意大利语、俄语、日语、韩语、越南语、泰语和印尼语在内的12种语言，涉及考试、理解、数学及翻译等多个领域。具体结果如下所示：

| Models       | Exams | Understanding | Math | Translation  | Average |
| :----------- | :---: | :-----------: | :---: | :---------: | :-----: |
| Mixtral-8x7B | 56.08 |     70.70     | 45.00 |    29.78    | 50.39   |
| Qwen1.5-72B  | 66.35 |     78.16     | 61.67 |    35.57    | 60.44   |
| Qwen1.5-32B  | 61.57 |     76.48     | 56.13 |    33.46    | 56.91   |

与其他Qwen1.5模型相似，32B版本同样具备出色的多语言能力，其表现略逊于72B模型。

最后，我们关注其在长文本评估任务“大海捞针”中的表现，令人欣喜的是，该模型能够在长达32K tokens的上下文中实现了优秀的表现。

{{< figure src="https://qianwen-res.oss-accelerate.aliyuncs.com/assets/blog/qwen1.5-32b/needle-qwen1.5-32b-chat.jpg#center" width="100%">}}


# 使用Qwen1.5-32B

我们建议您阅读Qwen1.5的[博客](https://qwenlm.github.io/blog/qwen1.5/)了解更多关于在transformers、llama.cpp、vLLM、Ollama等框架上使用的方法。



# 结语

我们发布了中等规模模型Qwen1.5-32B及其Chat模型。相较于72B模型，这些模型的内存占用大幅减少，运行速度显著提升。我们期望此次发布能帮助用户为其下游应用找到更优解决方案，以应对14B模型尤其在智能体场景下能力偏弱以及72B模型推理成本过高的问题。

# 引用

```
@misc{qwen1.5,
    title = {Introducing Qwen1.5},
    url = {https://qwenlm.github.io/blog/qwen1.5/},
    author = {Qwen Team},
    month = {February},
    year = {2024}
}
```