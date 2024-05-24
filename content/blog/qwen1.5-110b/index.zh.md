---
title: "Qwen1.5-110B：Qwen1.5系列的首个千亿参数开源模型"
date: 2024-04-25T13:33:00+08:00
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
{{< button href="https://huggingface.co/spaces/Qwen/Qwen1.5-110B-Chat" label="DEMO" external=true >}}
{{< button href="https://discord.gg/yPEP2vHTu4" label="DISCORD" external=true >}}


# 简介

近期开源社区陆续出现了千亿参数规模以上的大模型，这些模型都在各项评测中取得杰出的成绩。今天，我们开源1100亿参数的Qwen1.5系列首个千亿参数模型Qwen1.5-110B，该模型在基础能力评估中与Meta-Llama3-70B相媲美，在Chat评估中表现出色，包括MT-Bench和AlpacaEval 2.0。

# 模型特性

Qwen1.5-110B与其他Qwen1.5模型相似，采用了相同的Transformer解码器架构。它包含了分组查询注意力（GQA），在模型推理时更加高效。该模型支持32K tokens的上下文长度，同时它仍然是多语言的，支持英、中、法、西、德、俄、日、韩、越、阿等多种语言。

# 模型效果

我们对基础语言模型进行了一系列评估，并与最近的SOTA语言模型Meta-Llama3-70B以及Mixtral-8x22B进行了比较。

|    | Qwen1.5-110B | Qwen1.5-72B | Llama-3-70B | Mixtral-8x22B  |
| :----------- | :--: | :--: | :----: | :---: |
| MMLU   | 80.4 |   77.5    | 79.5 | 77.8 |
| TheoremQA | 34.9 |  29.3  | 32.0 | 35.9 |
| GPQA | 35.9 |   36.3    | 36.4 | 34.3 |
| Hellaswag  | 87.5 |  86.0  | 88.0 |  88.7 | 
| BBH  | 74.8 |  65.5  | 76.6 | 69.2 |
| ARC-C  | 69.6 |  65.9  | 68.8 | 70.7 | 
| GSM8K  | 85.4 |  79.5  | 79.2 | 78.6 |
| MATH  | 49.6 |  34.1  | 41.0 | 41.7 |
| HumanEval  | 52.4 |  41.5  | 45.7 | 45.1 |
| MBPP  | 58.1 |  53.4  | 55.1 | 71.2 | 

上述结果显示，新的110B模型在基础能力方面至少与Llama-3-70B模型相媲美。在这个模型中，我们没有对预训练的方法进行大幅改变，因此我们认为与72B相比的性能提升主要来自于增加模型规模。

我们还在MT-Bench和AlpacaEval 2.0上进行了Chat评估，结果如下：    


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
        <td>Llama-3-70B-Instruct</td>
        <td align="center">8.85</td>
        <td align="center">34.40</td>
    </tr>
    <tr>
        <td>Qwen1.5-72B-Chat</td>
        <td align="center">8.61</td>
        <td align="center">36.60</td>
    </tr>
    <tr>
        <td>Qwen1.5-110B-Chat</td>
        <td align="center">8.88</td>
        <td align="center">43.90</td>
    </tr>
</table>

与之前发布的72B模型相比，在两个聊天模型的基准评估中，110B表现显著更好。评估结果的持续改善表明，即使在没有大幅改变后训练方法的情况下，更强大、更大规模的基础语言模型也可以带来更好的Chat模型。


# 使用Qwen1.5-110B

我们建议您阅读Qwen1.5的[博客](https://qwenlm.github.io/blog/qwen1.5/)了解更多关于在transformers、llama.cpp、vLLM、Ollama等框架上使用的方法。


# 结语

Qwen1.5-110B是Qwen1.5系列中规模最大的模型，也是该系列中首个拥有超过1000亿参数的模型。它在与最近发布的SOTA模型Llama-3-70B的性能上表现出色，并且明显优于72B模型。这告诉我们，在模型大小扩展方面仍有很大的提升空间。虽然Llama-3的发布表明预训练数据规模具有重要意义，但我们相信通过在未来的发布中同时扩展数据和模型大小，我们可以同时获得两者的优势。敬请期待Qwen2！

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