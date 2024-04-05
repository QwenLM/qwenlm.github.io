---
title: "Qwen1.5-32B: Fitting the Capstone of the Qwen1.5 Language Model Series"
date: 2024-04-02T13:33:00+08:00
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
{{< button href="https://github.com/QwenLM/Qwen1.5" label="GITHUB" external=true >}}
{{< button href="https://huggingface.co/Qwen" label="HUGGING FACE" external=true >}}
{{< button href="https://modelscope.cn/organization/qwen" label="MODELSCOPE" external=true >}}
{{< button href="https://huggingface.co/spaces/Qwen/Qwen1.5-72B-Chat" label="DEMO" external=true >}}
{{< button href="https://discord.gg/yPEP2vHTu4" label="DISCORD" external=true >}}

# Introduction

{{< figure src="https://qianwen-res.oss-accelerate-overseas.aliyuncs.com/assets/blog/qwen1.5-32b/32b.png#center" width="100%">}}

The open-source community has long sought a model that strikes an ideal balance between performance, efficiency, and memory footprint. Despite the emergence of cutting-edge models like Qwen1.5-72B and DBRX, the models have faced persistent challenges such as large memory consumption, slow inference speed, and substantial finetuning costs.

A growing consensus within the field now points to a model with approximately 30 billion parameters as the optimal "sweet spot" for achieving both strong performance and manageable resource requirements. In response to this trend, we are proud to unveil the latest additions to our Qwen1.5 language model series: Qwen1.5-32B and Qwen1.5-32B-Chat.

Over the past months, we have meticulously developed the Qwen1.5-32B base model, striving to match or even surpass the performance benchmarks set by state-of-the-art 30B models. Simultaneously, we have made advancements in our post-training techniques, particularly in RLHF, to elevate the conversational capabilities of Qwen1.5-32B-Chat.


# Model Quality

Qwen1.5-32B is a new member of the Qwen1.5 language model series, and besides model sizes, there is almost nothing different in model architecture except for the inclusion grouped query attention (GQA). Thus it has better potential of more efficient inference performance in model serving. 

Here we provide the performance comparison with the SOTA of around 30B parameters or larger model sizes, in terms of the base capability evaluation, chat evaluation, and multilingual evaluation. Below, we report the evaluation of capabilities of base language models:

| Model        | MMLU | C-Eval | GSM8K | MATH | HumanEval | MBPP | BBH | CMMLU |
| :----------- | :--: | :----: | :---: | :--: | :-------: | :--: | :--: | :---: |
| Llama2-34B   | 62.6 |   -    | 42.2 | 6.2 |   22.6   | 33.0 | 44.1 |   -   |
| Yi-34B       | 76.3 |  81.4  | 67.2 | 14.4 |   23.2   | 41.0 | 54.3 | 83.7|
| Mixtral-8x7B | 70.6 |   -    | 74.4 | 28.4 |   40.2   | 60.7 |  -  |   -   |
| Qwen1.5-72B  | 77.5 |  84.1  | 79.5 | 34.1 |   41.5   | 53.4 | 65.5 | 83.5 |
| Qwen1.5-32B  | 73.4 |  83.5  | 77.4 | 36.1 |   37.2   | 49.4 | 66.8 | 82.3 |

Our 32B model demonstrates competitive performance across a variety of tasks, including MMLU, GSM8K, HumanEval, and BBH. Compared with the 72B parameter model, Qwen1.5-32B exhibits a slight decrease in performance, yet it still outperforms other 30B models, such as Llama2-34B and Mixtral-8x7B, in most tasks.

In terms of the chat models, we follow the evaluation recipe of Qwen1.5 to test their performance on MT-Bench and Alpaca-Eval 2.0. The results are shown below:

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

Significantly, Qwen1.5-32B-Chat achieves a score of over 8 points, and the gap between Qwen1.5-32B-Chat and Qwen1.5-72B-Chat is relatively small. This result indicates that the 32B model is a viable alternative for users who require a more efficient and cost-effective solution for chat applications.

We also test the multilingual capabilities of Qwen1.5-32B on a diverse set of 12 languages, including Arabic, Spanish, French, Portuguese, German, Italian, Russian, Japanese, Korean, Vietnamese, Thai, and Indonesian, covering domains including exams, understanding, math, and translation. Results are shown below:

The detailed results are demonstrated below:

| Models       | Exams | Understanding | Math | Translation  | Average |
| :----------- | :---: | :-----------: | :---: | :---------: | :-----: |
| Mixtral-8x7B | 56.08 |     70.70     | 45.00 |    29.78    | 50.39   |
| Qwen1.5-72B  | 66.35 |     78.16     | 61.67 |    35.57    | 60.44   |
| Qwen1.5-32B  | 61.57 |     76.48     | 56.13 |    33.46    | 56.91   |

Similar to other Qwen1.5 models, the 32B one also has decent multiplingual capabilities and it is also slightly behind the 72B model. 

Finally we come to take a look at its performance in the long-context evaluation, Needle in a Haystack. We are happy to see that it is able to achieve a top-level performance in the context of 32K tokens.

{{< figure src="https://qianwen-res.oss-accelerate.aliyuncs.com/assets/blog/qwen1.5-32b/needle-qwen1.5-32b-chat.jpg#center" width="100%">}}


## Develop with Qwen1.5-32B

We advise you to read our blog for [Qwen1.5](https://qwenlm.github.io/blog/qwen1.5/) to figure out the usages with Transformers, vLLM, llama.cpp, Ollama, etc. 


## Conclusion

We release the medium-size model Qwen1.5-32B as well as its chat counterpart. The models require much less memory footprint and run significantly faster than the 72B model. We hope that this release can help our users to figure out a better solution for their downstream application to tackle the problems of weak capabilities of 14B models (especially in agent playing scenarios) and high inference costs of 72B models. 


