---
title: "Qwen1.5 介绍"
date: 2024-02-04T13:33:00+08:00
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

最近几个月，我们专注探索如何构建一个真正「卓越」的模型，并在此过程中不断提升开发者的使用体验。农历新年到来之际，我们推出通义千问开源模型1.5版本: **Qwen1.5**。我们开源了包括0.5B、1.8B、4B、7B、14B和72B共计6个不同规模的Base和Chat模型，并同步放出了各尺寸模型对应的量化模型。

{{< figure src="https://qianwen-res.oss-accelerate-overseas.aliyuncs.com/assets/blog/qwen1.5/intro.jpg#center" width="80%">}}

此次更新中，我们不仅像之前一样提供Int4和Int8的GPTQ模型，还提供了AWQ以及GGUF量化模型。为了提升开发者体验，我们将Qwen1.5的代码正式合并到HuggingFace transformers代码库中，所以现在可以直接使用 `transformers>=4.37.0` 原生代码，而无需指定 `trust_remote_code` 选项即可进行开发。

我们已经与[vLLM](https://vllm.readthedocs.io/)、[SGLang](https://github.com/sgl-project/sglang)（用于部署）、[AutoAWQ](https://github.com/casper-hansen/AutoAWQ)、[AutoGPTQ](https://github.com/AutoGPTQ/AutoGPTQ)（用于量化）、[Axolotl](https://github.com/OpenAccess-AI-Collective/axolotl)、[LLaMA-Factory](https://github.com/hiyouga/LLaMA-Factory)（用于微调）以及[llama.cpp](https://github.com/ggerganov/llama.cpp)（用于本地 LLM 推理）等框架合作，所有这些框架现在都支持 Qwen1.5。Qwen1.5 系列可在 [Ollama](https://ollama.ai/) 和 [LMStudio](https://lmstudio.ai/) 等平台上使用。此外，API 服务不仅在 DashScope 上提供，还在 [together.ai](https://together.ai/) 上提供，全球都可访问。请访问[here](https://api.together.ai/)开始使用，我们建议您试用[Qwen1.5-72B-chat](https://api.together.xyz/playground/chat/Qwen/Qwen1.5-72B-Chat)。

{{< figure src="https://qianwen-res.oss-accelerate-overseas.aliyuncs.com/assets/blog/qwen1.5/com.jpg#center" width="100%">}}

相较于以往版本，本次更新我们着重提升Chat模型与人类偏好的对齐程度，并且显著增强了模型的多语言处理能力。在序列长度方面，所有规模模型均已实现 32768 个 tokens 的上下文长度范围支持。同时，预训练 Base 模型的质量也有关键优化，有望在微调过程中为您带来更佳体验。这次迭代是我们朝向「卓越」模型目标所迈进一个坚实的步伐。

# 模型效果

为了全面洞悉 Qwen1.5 的效果表现，我们对 Base 和 Chat 模型在一系列基础及扩展能力上进行了详尽评估，包括如语言理解、代码、推理等在内的基础能力，多语言能力，人类偏好对齐能力，智能体能力，检索增强生成能力（RAG）等。

## 基础能力

关于模型基础能力的评测，我们在 MMLU（5-shot）、C-Eval、Humaneval、GS8K、BBH 等基准数据集上对 Qwen1.5 进行了评估。


| Model             |   MMLU   |  C-Eval  |  GSM8K   |   MATH   | HumanEval |   MBPP   |   BBH    |  CMMLU   |
|:------------------|:--------:|:--------:|:--------:|:--------:|:---------:|:--------:|:--------:|:--------:|
| GPT-4             |   86.4   |   69.9   |   92.0   |  45.8    |   67.0    |   61.8   |   86.7   |   71.0   |
| Llama2-7B         |   46.8   |   32.5   |   16.7   |   3.3    |   12.8    |   20.8   |   38.2   |   31.8   |
| Llama2-13B        |   55.0   |   41.4   |   29.6   |   5.0    |   18.9    |   30.3   |   45.6   |   38.4   |
| Llama2-34B        |   62.6   |    -     |   42.2   |   6.2    |   22.6    |   33.0   |   44.1   |    -     |
| Llama2-70B        |   69.8   |   50.1   |   54.4   |  10.6    |   23.7    |   37.7   |   58.4   |   53.6   |
| Mistral-7B        |   64.1   |   47.4   |   47.5   |  11.3    |   27.4    |   38.6   |   56.7   |   44.7   |
| Mixtral-8x7B      |   70.6   |    -     |   74.4   |  28.4    |   40.2    |   60.7   |   -      |    -     |
| Qwen1.5-7B     |   61.0   |   74.1   |   62.5   |  20.3    |   36.0    |   37.4   |   40.2   |   73.1   |
| Qwen1.5-14B    |   67.6   |   78.7   |   70.1   |  29.2    |   37.8    |   44.0   |   53.7   |   77.6   |
| Qwen1.5-72B    |   77.5   |   84.1   |   79.5   |  34.1    |   41.5    |   53.4   |   65.5   |   83.5   |

在不同模型尺寸下，Qwen1.5 都在评估基准中表现出强劲的性能。特别是，Qwen1.5-72B 在所有基准测试中都远远超越了Llama2-70B，展示了其在语言理解、推理和数学方面的卓越能力。

最近小型模型的构建也成为了热点之一，我们将模型参数小于 70 亿的 Qwen1.5 模型与社区中最杰出的小型模型进行了比较。结果如下：

| Model                | Non-Emb Params | MMLU | C-Eval | GSM8K | MATH | HumanEval | MBPP | BBH | CMMLU |
|:---------------------|:--------------:|:----:|:------:|:-----:|:----:|:---------:|:----:|:---:|:-----:|
| Tinyllama-1.1B       |      1.1B      | 24.3 |  25.0  |   2.3 |  0.7 |     6.7   | 19.9 | 28.8|  24.0 |
| Gemini-Nano-3B       |       -        |  -   |   -    |  22.8 |   -  |      -    | 27.2 | 42.4|   -   |
| StableLM-Zephyr-3B   |      2.7B      | 45.9 |  30.3  |  52.5 | 12.5 |    35.4   | 31.9 | 37.7|  30.9 |
| Phi-2                |      2.5B      | 52.7 |  23.4  |  57.2 |  3.5 |    47.6   | 55.0 | 43.4|  24.2 |
| MiniCPM-2B           |      2.4B      | 53.5 |  51.1  |  53.8 | 10.2 |    50.0   | 47.3 | 36.9|  51.1 |
| Qwen1.5-0.5B      |      0.3B      | 39.2 |  50.5  |  22.0 |  3.1 |    12.2   |  6.8 | 18.3|  46.6 |
| Qwen1.5-1.8B      |      1.2B      | 46.8 |  59.7  |  38.4 | 10.1 |    20.1   | 18.0 | 24.2|  57.8 |
| Qwen1.5-4B        |      3.1B      | 56.1 |  67.6  |  57.0 | 10.0 |    25.6   | 29.2 | 32.5|  66.7 |

我们可以自信地说，参数规模低于 70 亿的 Qwen1.5 base 模型，与业界领先的小型模型相比具有很强的竞争力。未来，我们将继续提高小模型的整体效果，并探索如何将大模型的能力有效迁移到小模型之中。

## 人类偏好对齐

对齐的目的是增强语言的指令跟随能力，生成和人类偏好相近的回复。我们认识到将人类偏好融入学习过程的重要性，因此在对齐最新的 Qwen1.5 系列时有效地采用了直接策略优化（DPO）和近端策略优化（PPO）等技术。

但是，评估此类聊天模型的质量是一项重大挑战。虽然全面的人工评估是最佳方法，但它在可扩展性和可重复性方面面临着巨大挑战。因此我们借助更先进的大模型作为评委，在两个广泛使用的基准上对 Qwen1.5 进行了初步评估： MT-Bench 和 Alpaca-Eval。评估结果如下：

{{< figure src="https://qianwen-res.oss-accelerate-overseas.aliyuncs.com/assets/blog/qwen1.5/sft.jpg#center" width="80%">}}

我们在评测MT-Bench榜单时发现在这个榜单上模型分数有较大的方差，因此我们进行了三轮评测并汇报平均分数和标准差。

<table>
    <tr>
        <th rowspan="2" align="center">Models</th>
        <th colspan="1" align="center">MT-Bench</th>
        <th colspan="2" align="center">AlpacaEval 2.0</th>
    </tr>
    <tr>
        <th align="center">Avg. Score</th><th align="center">Win Rate</th><th align="center">Length</th>
    </tr>
    <tr>
        <td>Qwen1.5-72B-Chat</td>
        <td align="center">8.61<sub>0.04</sub> (8.67/8.61/8.56)</td>
        <td align="center">27.18<sub>1.30</sub></td>
        <td align="center">1600</td>
    </tr>
    <tr>
        <td>Qwen1.5-14B-Chat</td>
        <td align="center">7.91<sub>0.11</sub> (7.99/7.99/7.77)</td>
        <td align="center">19.7<sub>1.12</sub></td>
        <td align="center">1608</td>
    </tr>
    <tr>
        <td>Qwen1.5-7B-Chat</td>
        <td align="center">7.60<sub>0.05</sub> (7.58/7.55/7.66)</td>
        <td align="center">13.20<sub>1.43</sub> </td>
        <td align="center">1606</td>
    </tr>
</table>

尽管落后于 GPT-4-Turbo，但最大的 Qwen1.5 模型 Qwen1.5-72B-Chat 在 MT-Bench 和 Alpaca-Eval v2 上都表现出不俗的效果，超过了 Claude-2.1、GPT-3.5-Turbo-0613、Mixtral-8x7b-instruct 和 TULU 2 DPO 70B，与 Mistral Medium 不相上下。

此外，虽然大模型裁判的评分似乎与回答的长度有关，但我们的观察结果表明 Qwen1.5 并没有产生过长的回答来操纵大模型裁判的偏差。AlpacaEval 2.0 上 Qwen1.5-Chat 的平均长度仅为 1618，与 GPT-4 的长度一致，比 GPT-4-Turbo 短。从通义千问网页端和APP的反馈看，用户更加喜爱新版本模型的回复。

<!-- <iframe
	src="https://qwen-qwen1-5-72b-chat.hf.space"
	frameborder="0"
	width="850"
	height="1000"
></iframe> -->


## 多语言能力

我们挑选了来自欧洲、东亚和东南亚的12种不同语言，全面评估Base模型的多语言能力。从开源社区的公开数据集中，我们构建了如下表所示的评测集合，共涵盖四个不同的维度：考试、理解、翻译、数学。下表提供了每个测试集的详细信息，包括其评测配置、评价指标以及所涉及的具体语言种类。

| Dataset       | Category       | Method/Metric | Languages                            |
|:--------------|:--------------:|:-------------:|:------------------------------------:|
| MMLU-multi    |     Exams      |   5-shot/Acc  | ar, es, fr, pt, de, it, ru, ja, ko, id |
| M3Exams       |     Exams      |   5-shot/Acc  |       pt, it, vi, th                  |
| BELEBELE      | Understanding  |   5-shot/Acc  | ar, es, fr, pt, de, it, ru, ja, ko, vi, th, id |
| XWinograd     | Understanding  |   5-shot/Acc  |       fr, pt, ru, ja                  |
| XCOPA         | Understanding  |   5-shot/Acc  |           vi, id, th                  |
| PAWS-X        | Understanding  |   5-shot/Acc  |       es, fr, de, ja, ko              |
| XStoryCloze   | Understanding  |   0-shot/Acc  |           ar, es, ru, id              |
| Flores(zh/en↔xx) | Translation    |  5-shot/BLEU  | ar, es, fr, pt, de, it, ru, ja, ko, vi, th, id |
| MGSM          |     Math       |   8-shot/Acc  |       es, fr, ru, de, ja, th          |


详细的结果如下：

| Models            | Exams | Understanding |  Math  | Translation |
|:----------------- |:-----:|:-------------:|:------:|:-----------:|
| Llama2-7B         | 34.03 |     50.13     |  9.40  |    22.19    |
| Llama2-13B        | 39.55 |     57.26     | 16.80  |    25.89    |
| Llama2-70B        | 55.88 |     73.19     | 40.20  |    31.56    |
| Mistral-7B        | 47.12 |     63.30     | 26.33  |    23.33    |
| Mixtral-8x7B      | 56.08 |     70.70     | 45.00  |    29.78    |
| Qwen1.5-0.5B   | 26.98 |     44.08     |  3.13  |    9.17     |
| Qwen1.5-1.8B   | 33.57 |     48.37     |  6.47  |    16.19    |
| Qwen1.5-4B     | 41.43 |     59.76     | 21.33  |    23.34    |
| Qwen1.5-7B     | 47.70 |     67.63     | 37.27  |    28.36    |
| Qwen1.5-14B    | 55.72 |     74.10     | 49.93  |    31.69    |
| Qwen1.5-72B    | 66.35 |     78.16     | 61.67  |    35.57    |


上述结果表明，Qwen1.5 Base模型在12种不同语言的多语言能力方面表现出色，在考试、理解、翻译和数学等各个维度的评估中，均展现优异结果。不论阿拉伯语、西班牙语、法语、日语，还是韩语、泰语，Qwen1.5均展示了在不同语言环境中理解和生成高质量内容的能力。更进一步地，我们也评估了Chat模型的多语言能力，结果如下所示：


{{< figure src="https://qianwen-res.oss-accelerate-overseas.aliyuncs.com/assets/blog/qwen1.5/lang.png#center" width="100%">}}

上述结果展示了Qwen1.5 Chat模型强大的多语言能力，可用于翻译、语言理解和多语言聊天等下游应用。我们相信多语言能力的提升，对于其整体通用能力也具有正向的作用。

## 长序列

随着长序列理解的需求不断增加，我们这次推出的 Qwen1.5 模型全系列支持 32K tokens 的上下文。我们在[L-Eval 基准](https://github.com/OpenLMLab/LEval)上评估了 Qwen1.5 模型的性能，该基准衡量了模型根据长输入生成答案的能力。结果如下：

| Models                | Coursera |  GSM  | QuALITY | TOEFL | SFiction |  Avg.  |
|:---------------------|:-------:|:-----:|:-------:|:-----:|:-------:|:------:|
| GPT3.5-turbo-16k     |  63.51  | 84.00 |  61.38  | 78.43 |  64.84  | 70.43  |
| Claude1.3-100k       |  60.03  | 88.00 |  73.76  | 83.64 |  72.65  | 75.62  |
| GPT4-32k             |  75.58  | 96.00 |  82.17  | 84.38 |  74.99  | 82.62  |
| Qwen-72B-Chat        |  58.13  | 76.00 |  77.22  | 86.24 |  69.53  | 73.42  |
| Qwen1.5-0.5B-Chat |  30.81  |  6.00 |  34.16  | 40.52 |  49.22  | 32.14  |
| Qwen1.5-1.8B-Chat |  39.24  | 37.00 |  42.08  | 55.76 |  44.53  | 43.72  |
| Qwen1.5-4B-Chat   |  54.94  | 47.00 |  57.92  | 69.15 |  56.25  | 57.05  |
| Qwen1.5-7B-Chat   |  59.74  | 60.00 |  64.36  | 79.18 |  62.50  | 65.16  |
| Qwen1.5-14B-Chat  |  69.04  | 79.00 |  74.75  | 83.64 |  75.78  | 76.44  |
| Qwen1.5-72B-Chat  |  71.95  | 82.00 |  77.72  | 85.50 |  73.44  | 78.12  |

从结果来看，即使像 Qwen1.5-7B-Chat 这样的小规模模型，在上面大5个任务中的4个表现出与 GPT3.5-turbo-16k 类似的性能。而我们最好的模型 Qwen1.5-72B-Chat，仅略微落后于 GPT4-32k。尽管上述结果仅突显了我们在处理 32K tokens 长度时所展现的卓越性能，但这并不代表模型的最大支持长度仅限于 32K。您可以在 `config.json` 中，将 `max_position_embedding` 和 `sliding_window` 尝试修改为更大的值，观察模型在更长上下文理解场景下，是否可以达到您满意的效果。


## 链接外部系统

如今，通用语言模型的一大魅力在于其与外部系统对接的潜能。具体而言，RAG作为一种在社区中快速兴起并广受青睐的任务，有效应对了大语言模型面临的一些典型挑战，比如幻觉、无法获取实时更新或私有数据等问题。此外，语言模型在使用API和根据指令及示例编写代码方面，展现出强大的能力。这使得LLM能够作为代码解释器或AI智能体，发挥更广阔的价值。

我们首先对 Qwen1.5 系列 Chat 模型，在 RAG 任务上的端到端效果进行了评估。评测基于 [RGB](https://arxiv.org/abs/2309.01431) 测试集，是一个用于中英文 RAG 评估的集合：

<table>
    <tr>
        <th colspan="5" align="center">RGB English Benchmark for Retrieval-Augmented Generation</th>
    </tr>
    <tr>
        <th align="left">Models</th>
        <th align="center">Noise 0.8 (Acc.↑)</th>
        <th align="center">Rejection 1.0 (Acc.↑)</th>
        <th align="center">Integration 0.4 (Acc.↑)</th>
        <th align="center">Counterfactual (Acc.↑)</th>
    </tr>
    <tr>
        <td>GPT4-Turbo</td>
        <td align="center">85.67</td>
        <td align="center">47.33</td>
        <td align="center">60.00</td>
        <td align="center">90.00</td>
    </tr>
    <tr>
        <td>GPT3.5-Turbo</td>
        <td align="center">74.33</td>
        <td align="center">27.67</td>
        <td align="center">47.00</td>
        <td align="center">21.00</td>
    </tr>
    <tr>
        <td>Llama2-70B-Chat</td>
        <td align="center">82.00</td>
        <td align="center">31.00</td>
        <td align="center">56.00</td>
        <td align="center">15.00</td>
    </tr>
    <tr>
        <td>Mistral-7B-Instruct-v0.2</td>
        <td align="center">82.00</td>
        <td align="center">31.00</td>
        <td align="center">56.00</td>
        <td align="center">15.00</td>
    </tr>
    <tr>
        <td>Mixtral-8x7B-Instruct-v0.1</td>
        <td align="center">82.67</td>
        <td align="center">37.00</td>
        <td align="center">67.00</td>
        <td align="center">8.00</td>
    </tr>
    <tr>
        <td>Qwen1.5-7B-Chat</td>
        <td align="center">77.67</td>
        <td align="center">25.00</td>
        <td align="center">52.00</td>
        <td align="center">9.00 </td>
    </tr>
    <tr>
        <td>Qwen1.5-14B-Chat</td>
        <td align="center">80.67</td>
        <td align="center">24.00</td>
        <td align="center">60.00</td>
        <td align="center">8.00 </td>
    </tr>
    <tr>
        <td>Qwen1.5-72B-Chat</td>
        <td align="center">81.67</td>
        <td align="center">48.67</td>
        <td align="center">61.00</td>
        <td align="center">28.00</td>
    </tr>
    <tr>
        <th colspan="5" align="center">RGB Chinese Benchmark for Retrieval-Augmented Generation</th>
    </tr>
    <tr>
        <th align="center">Models</th>
        <th align="center">Noise 0.8 (Acc.↑)</th>
        <th align="center">Rejection 1.0 (Acc.↑)</th>
        <th align="center">Integration 0.4 (Acc.↑)</th>
        <th align="center">Counterfactual (Acc.↑)</th>
    </tr>
    <tr>
        <td>GPT4-Turbo</td>
        <td align="center">75.00</td>
        <td align="center">38.67</td>
        <td align="center">63.00</td>
        <td align="center">90.00</td>
    </tr>
    <tr>
        <td>GPT3.5-Turbo</td>
        <td align="center">69.00</td>
        <td align="center">13.00</td>
        <td align="center">55.00</td>
        <td align="center">25.00</td>
    </tr>
    <tr>
        <td>Llama2-70B-Chat</td>
        <td align="center">28.00</td>
        <td align="center">17.00</td>
        <td align="center">32.00</td>
        <td align="center">8.00 </td>
    </tr>
    <tr>
        <td>Mistral-7B-Instruct-v0.2</td>
        <td align="center">54.67</td>
        <td align="center">28.67</td>
        <td align="center">37.00</td>
        <td align="center">4.00 </td>
    </tr>
    <tr>
        <td>Mixtral-8x7B-Instruct-v0.1</td>
        <td align="center">27.33</td>
        <td align="center">4.00 </td>
        <td align="center">24.00</td>
        <td align="center">4.00 </td>
    </tr>
    <tr>
        <td>Qwen1.5-7B-Chat</td>
        <td align="center">71.00</td>
        <td align="center">10.33</td>
        <td align="center">54.00</td>
        <td align="center">20.00</td>
    </tr>
    <tr>
        <td>Qwen1.5-14B-Chat</td>
        <td align="center">75.00</td>
        <td align="center">16.67</td>
        <td align="center">55.00</td>
        <td align="center">22.00</td>
    </tr>
    <tr>
        <td>Qwen1.5-72B-Chat</td>
        <td align="center">76.00</td>
        <td align="center">51.00</td>
        <td align="center">66.00</td>
        <td align="center">44.00</td>
    </tr>
</table>

然后，我们在[T-Eval](https://open-compass.github.io/T-Eval/) 基准测试中评估了 Qwen1.5 作为通用代理运行的能力。所有 Qwen1.5 模型都没有经过专门针对该基准的优化：

<table>
    <tr>
        <th colspan="8" align="center">Agent Performance on T-Eval English</th>
    </tr>
    <tr>
        <th align="left">Models</th>
        <th align="center">Overall   </th>
        <th align="center">Instruct  </th>
        <th align="center">Plan      </th>
        <th align="center">Reason    </th>
        <th align="center">Retrieve  </th>
        <th align="center">Understand</th>
        <th align="center">Review    </th>
    </tr>
    <tr>
        <td>GPT4-Turbo</td>
        <td align="center">86.4</td>
        <td align="center">96.3</td>
        <td align="center">87.8</td>
        <td align="center">65.3</td>
        <td align="center">88.9</td>
        <td align="center">85.8</td>
        <td align="center">94.5</td>
    </tr>
    <tr>
        <td>Llama-2-70B-Chat</td>
        <td align="center">58.59</td>
        <td align="center">77.80</td>
        <td align="center">63.75</td>
        <td align="center">39.07</td>
        <td align="center">51.35</td>
        <td align="center">50.34</td>
        <td align="center">69.20</td>
    </tr>
    <tr>
        <td>Mistral-7B-Instruct-v0.2</td>
        <td align="center">46.68</td>
        <td align="center">63.57</td>
        <td align="center">60.88</td>
        <td align="center">32.59</td>
        <td align="center">17.58</td>
        <td align="center">38.08</td>
        <td align="center">67.35</td>
    </tr>
    <tr>
        <td>Mixtral-8x7B-Instruct-v0.1</td>
        <td align="center">62.15</td>
        <td align="center">42.39</td>
        <td align="center">46.48</td>
        <td align="center">60.35</td>
        <td align="center">76.69</td>
        <td align="center">73.70</td>
        <td align="center">73.31</td>
    </tr>
    <tr>
        <td>Qwen1.5-7B-Chat</td>
        <td align="center">59.67</td>
        <td align="center">71.12</td>
        <td align="center">62.95</td>
        <td align="center">37.60</td>
        <td align="center">61.17</td>
        <td align="center">53.75</td>
        <td align="center">71.46</td>
    </tr>
    <tr>
        <td>Qwen1.5-14B-Chat</td>
        <td align="center">71.77</td>
        <td align="center">86.16</td>
        <td align="center">73.09</td>
        <td align="center">49.51</td>
        <td align="center">72.07</td>
        <td align="center">66.03</td>
        <td align="center">83.78</td>
    </tr>
    <tr>
        <td>Qwen1.5-72B-Chat</td>
        <td align="center">76.69</td>
        <td align="center">80.96</td>
        <td align="center">83.12</td>
        <td align="center">56.89</td>
        <td align="center">80.17</td>
        <td align="center">76.68</td>
        <td align="center">82.34</td>
    </tr>
    <tr>
        <th colspan="8" align="center">Agent Performance on T-Eval Chinese</th>
    </tr>
    <tr>
        <th align="center">Models</th>
        <th align="center">Overall   </th>
        <th align="center">Instruct  </th>
        <th align="center">Plan      </th>
        <th align="center">Reason    </th>
        <th align="center">Retrieve  </th>
        <th align="center">Understand</th>
        <th align="center">Review    </th>
    </tr>
    <tr>
        <td>GPT4-Turbo</td>
        <td align="center">85.9</td>
        <td align="center">97.6</td>
        <td align="center">87.0</td>
        <td align="center">68.4</td>
        <td align="center">89.2</td>
        <td align="center">86.8</td>
        <td align="center">86.0</td>
    </tr>
    <tr>
        <td>Llama-2-70B-Chat</td>
        <td align="center">51.15</td>
        <td align="center">53.78</td>
        <td align="center">56.65</td>
        <td align="center">34.27</td>
        <td align="center">48.24</td>
        <td align="center">50.49</td>
        <td align="center">63.45</td>
    </tr>
    <tr>
        <td>Mistral-7B-Instruct-v0.2</td>
        <td align="center">46.26</td>
        <td align="center">49.64</td>
        <td align="center">61.82</td>
        <td align="center">36.17</td>
        <td align="center">20.26</td>
        <td align="center">47.25</td>
        <td align="center">62.42</td>
    </tr>
    <tr>
        <td>Mixtral-8x7B-Instruct-v0.1</td>
        <td align="center">62.77</td>
        <td align="center">26.38</td>
        <td align="center">60.79</td>
        <td align="center">62.02</td>
        <td align="center">76.60</td>
        <td align="center">77.74</td>
        <td align="center">73.10</td>
    </tr>
    <tr>
        <td>Qwen1.5-7B-Chat</td>
        <td align="center">53.15</td>
        <td align="center">60.56</td>
        <td align="center">62.31</td>
        <td align="center">42.07</td>
        <td align="center">55.28</td>
        <td align="center">55.76</td>
        <td align="center">42.92</td>
    </tr>
    <tr>
        <td>Qwen1.5-14B-Chat</td>
        <td align="center">64.85</td>
        <td align="center">84.25</td>
        <td align="center">64.77</td>
        <td align="center">54.68</td>
        <td align="center">72.35</td>
        <td align="center">68.88</td>
        <td align="center">44.15</td>
    </tr>
    <tr>
        <td>Qwen1.5-72B-Chat</td>
        <td align="center">72.88</td>
        <td align="center">97.50</td>
        <td align="center">80.83</td>
        <td align="center">58.11</td>
        <td align="center">76.14</td>
        <td align="center">71.94</td>
        <td align="center">52.77</td>
    </tr>
</table>

为了测试工具调用能力，我们遵循之前做法，使用我们自己开源的 [评估基准](https://github.com/QwenLM/Qwen/blob/main/eval/evaluate_plugin.py) ，测试模型正确选择、调用工具的能力，结果如下：

<table>
    <tr>
        <th colspan="4" align="center">Tool-Use Benchmark</th>
    </tr>
    <tr>
        <th align="left">Models</th><th align="center">Tool Selection (Acc.↑)</th><th align="center">Tool Input (Rouge-L↑)</th><th align="center">False Positive (Acc.↑)</th>
    </tr>
    <tr>
        <td>GPT-4</td>
        <td align="center">98.0</td>
        <td align="center">95.3</td>
        <td align="center">76.1</td>
    </tr>
    <tr>
        <td>GPT-3.5</td>
        <td align="center">74.5</td>
        <td align="center">80.7</td>
        <td align="center">19.4</td>
    </tr>
    <tr>
        <td>Llama-2-70B-Chat</td>
        <td align="center">88.54</td>
        <td align="center">70.36</td>
        <td align="center">0.37 </td>
    </tr>
    <tr>
        <td>Mistral-7B-Instruct-v0.2</td>
        <td align="center">94.79</td>
        <td align="center">82.81</td>
        <td align="center">6.34 </td>
    </tr>
    <tr>
        <td>Mixtral-8x7B-Instruct-v0.1</td>
        <td align="center">99.31</td>
        <td align="center">94.46</td>
        <td align="center">31.34</td>
    </tr>
    <tr>
        <td>Qwen1.5-7B-Chat</td>
        <td align="center">95.83</td>
        <td align="center">89.48</td>
        <td align="center">92.54</td>
    </tr>
    <tr>
        <td>Qwen1.5-14B-Chat</td>
        <td align="center">93.06</td>
        <td align="center">88.74</td>
        <td align="center">92.91</td>
    </tr>
    <tr>
        <td>Qwen1.5-72B-Chat</td>
        <td align="center">95.14</td>
        <td align="center">91.14</td>
        <td align="center">98.51</td>
    </tr>
</table>

最后，由于 Python 代码解释器已成为高级 LLM 越来越强大的工具，我们还在之前开源的 [评估基准](https://github.com/QwenLM/Qwen-Agent/tree/main/benchmark) 上评估了我们的模型利用这一工具的能力：

<table>
    <tr>
        <th colspan="5" align="left">Code Interpreter Benchmark</th>
    </tr>
    <tr>
        <th rowspan="2" align="center">Models</th>
        <th colspan="3" align="center">Accuracy of Code Execution Results (%)</th>
        <th colspan="1" align="center">Executable Rate of Code (%)</th>
    </tr>
    <tr>
        <th align="center">Math↑</th><th align="center">Visualization-Hard↑</th><th align="center">Visualization-Easy↑</th><th align="center">General↑</th>
    </tr>
    <tr>
        <td>GPT-4</td>
        <td align="center">82.8</td>
        <td align="center">66.7</td>
        <td align="center">60.8</td>
        <td align="center">82.8</td>
    </tr>
    <tr>
        <td>GPT-3.5</td>
        <td align="center">47.3</td>
        <td align="center">33.3</td>
        <td align="center">55.7</td>
        <td align="center">74.1</td>
    </tr>
    <tr>
        <td>Mistral-7B-Instruct-v0.2</td>
        <td align="center">25.5</td>
        <td align="center">19.1 </td>
        <td align="center">44.3 </td>
        <td align="center">62.1</td>
    </tr>
    <tr>
        <td>Mixtral-8x7B-Instruct-v0.1</td>
        <td align="center">47.8</td>
        <td align="center">33.3</td>
        <td align="center">54.4</td>
        <td align="center">60.3</td>
    </tr>
    <tr>
        <td>Qwen1.5-7B-Chat</td>
        <td align="center">54.0</td>
        <td align="center">35.7</td>
        <td align="center">36.7</td>
        <td align="center">65.5</td>
    </tr>
    <tr>
        <td>Qwen1.5-14B-Chat</td>
        <td align="center">62.1</td>
        <td align="center">46.4</td>
        <td align="center">48.1</td>
        <td align="center">70.6</td>
    </tr>
    <tr>
        <td>Qwen1.5-72B-Chat</td>
        <td align="center">73.1</td>
        <td align="center">52.3</td>
        <td align="center">50.6</td>
        <td align="center">87.9</td>
    </tr>
</table>

较大的 Qwen1.5-Chat 模型通常优于较小的模型，接近 GPT-4 的工具使用性能。不过，在数学解题和可视化等代码解释器任务中，即使是最大的 Qwen1.5-72B-Chat 模型，也会因编码能力而明显落后于 GPT-4。我们的目标是在未来的版本中，在预训练和对齐过程中提高所有 Qwen 模型的编码能力。

## 使用Qwen1.5开发
Qwen1.5 最大的不同之处，在于 Qwen1.5 与 HuggingFace transformers 代码库的集成。从 4.37.0 版本开始，您可以直接使用 transformers 库原生代码，而不加载任何自定义代码（指定trust_remote_code选项）来使用 Qwen1.5，像下面这样加载模型：
    
```python
from transformers import AutoModelForCausalLM
# This is what we previously used
model = AutoModelForCausalLM.from_pretrained("Qwen/Qwen-7B-Chat", device_map="auto", trust_remote_code=True)
# This is what you can use now
model = AutoModelForCausalLM.from_pretrained("Qwen/Qwen1.5-7B-Chat", device_map="auto")
```

与以前版本相比，使用 Qwen1.5-Chat 模型进行聊天的方式有所不同。您可以使用以下代码与 Qwen1.5 进行聊天：

```python
from transformers import AutoModelForCausalLM, AutoTokenizer
device = "cuda" # 加载模型的设备

model = AutoModelForCausalLM.from_pretrained(
    "Qwen/Qwen1.5-14B-Chat-AWQ",
    device_map="auto"
)
tokenizer = AutoTokenizer.from_pretrained("Qwen/Qwen1.5-14B-Chat-AWQ")

prompt = "给我介绍一下大型语言模型。"
messages = [
    {"role": "system", "content": "你是一个有用的助手。"},
    {"role": "user", "content": prompt}
]
text = tokenizer.apply_chat_template(
    messages,
    tokenize=False,
    add_generation_prompt=True
)
model_inputs = tokenizer([text], return_tensors="pt").to(device)

generated_ids = model.generate(
    model_inputs.input_ids,
    max_new_tokens=512
)
generated_ids = [
    output_ids[len(input_ids):] for input_ids, output_ids in zip(model_inputs.input_ids, generated_ids)
]

response = tokenizer.batch_decode(generated_ids, skip_special_tokens=True)[0]
```

对于Chat模型，我们不再使用额外的 `model.chat()` 方法，而是直接调用 `model.generate()`。具体来说，基于 `tokenizer_config.json` 中编写的聊天模板，您可使用`tokenizer.apply_chat_template()` 来拼接输入文本，继而分词并调用 `model.generate()` 执行生成。您可根据 eos_token 来控制何时终止生成。

我们还提供了AWQ和GPTQ量化模型（包括Int4和Int8模型）供您在低资源和部署场景中，使用Qwen1.5。由于Hugging Face transformers支持 [AWQ](https://github.com/casper-hansen/AutoAWQ) 和 [GPTQ](https://github.com/AutoGPTQ/AutoGPTQ)，您可以直接像上面所示的方式加载模型并调用，只需更换相应的模型名称即可。

此外，我们已将我们的代码集成到常用的推理框架中，以便您可以轻松部署模型。目前 `vLLM>=0.3.0` 和 `SGLang>=0.1.11` 已经正式支持 Qwen1.5。请查看他们的官方 github 仓库和文档，了解详细用法。以下示例展示如何使用vLLM，为模型构建一个与OpenAI-API兼容的接口：

```shell
python -m vllm.entrypoints.openai.api_server --model Qwen/Qwen1.5-7B-Chat
```

```shell
curl http://localhost:8000/v1/chat/completions \
    -H "Content-Type: application/json" \
    -d '{
    "model": "Qwen/Qwen1.5-7B-Chat",
    "messages": [
    {"role": "system", "content": "You are a helpful assistant."},
    {"role": "user", "content": "Tell me something about large language models."}
    ]
    }'
```

对于希望本地运行 LLM 的用户，llama.cpp 也提供了对 Qwen1.5 的支持，我们在 huggingface 模型中心官方提供了GGUF格式的量化模型。您可以使用以下代码在 llama.cpp 中运行 Qwen1.5：

```shell
./main -m qwen1.5-7b-chat-q2_k.gguf -n 512 --color -i -cml -f prompts/chat-with-qwen.txt
```

此外，您也可以将GGUF模型与Ollama一起使用。基于 [Ollama](https://ollama.ai/)的支持，现在可以直接使用一行命令：

```shell
ollama run qwen
```

或者您可以将 GGUF 模型与 [llamafile](https://github.com/Mozilla-Ocho/llamafile) 一起使用，以单个文件运行我们的模型。

为了在本地启动网页版 demo，我们建议您使用  [Text generation web UI](https://github.com/oobabooga/text-generation-webui)，非常易用。

对于希望训练自己定制模型的高级开发者，目前 Qwen1.5 已经实现了 Hugging Face trainer 和 Peft 支持。目前，社区中也提供了易用的监督式微调（SFT）和人类反馈对齐（PPO、DPO等）训练框架，其中 [LLaMA-Factory](https://github.com/hiyouga/LLaMA-Factory) 和 [Axolotl](https://github.com/OpenAccess-AI-Collective/axolotl) 已经支持了 Qwen1.5 的训练。我们建议您查看其官方 github 仓库和文档，了解更高级的用法。

如果您希望将Qwen1.5用于下游应用，如RAG、工具使用、智能体等，可以考虑如 [LlamaIndex](https://www.llamaindex.ai/)、[LangChain](https://www.langchain.com/)、[CrewAI](https://www.crewai.io/) 等社区常用框架，构建与OpenAI-API兼容的API或本地运行模型。

总之，我们始终将关注点放在优化您的开发体验上，不仅致力于为社区打造卓越的模型，还力求让一切操作更为简单易用。希望您在使用 Qwen1.5 的过程中能满意，也希望模型能在您的研究或应用项目中发挥作用。

## 小结

我们发布了 Qwen1.5 —— Qwen 系列的新一代版本。在这次发布中，我们开源了包括 0.5B、1.8B、4B、7B、14B 和 72B 在内的 6 种大小的 Base 和 Chat 模型，并且我们还提供了量化模型。我们已将 Qwen1.5 的代码合并到 Hugging Face transformers 中，您现在可以直接使用  `transformers>=4.37.0`  而无需指定  `trust_remote_code`。此外，我们支持了例如vLLM、SGLang、AutoGPTQ等框架支持Qwen1.5。从现在开始，我们的模型将会更加易用。我们相信这次发布虽然在模型质量上是一小步，但在开发者体验上却是一大步。欢迎加入我们的 [Discord](https://discord.gg/yPEP2vHTu4e) 或 [微信](https://github.com/QwenLM/Qwen/blob/main/assets/wechat.png) 分享您的体验、评论或任何您喜欢的内容，向我们提出宝贵的意见和建议！

## Authors
> Jinze Bai, Shuai Bai, Yunfei Chu, Zeyu Cui, Kai Dang, Xiaodong Deng, Yang Fan, Wenbin Ge, Fei Huang, Binyuan Hui,  Mei Li, Junyang Lin, Runji Lin, Dayiheng Liu, Tianyu Liu, Keming Lu, Jianxin Ma, Rui Men, Na Ni, Xingzhang Ren, Xuancheng Ren, Zhou San, Sinan Tan, Jianhong Tu, Peng Wang, Shijie Wang, Jin Xu, An Yang, Jian Yang, Kexin Yang, Shusheng Yang, Yang Yao, Bowen Yu, Jianwei Zhang, Yichang Zhang, Zhenru Zhang, Bo Zheng, Chang Zhou, Jingren Zhou, Xiaohuan Zhou, Tianhang Zhu