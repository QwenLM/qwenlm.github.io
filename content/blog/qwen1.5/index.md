---
title: "Introducing Qwen1.5"
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
{{< button href="https://discord.gg/yPEP2vHTu4" label="DISCORD" external=true >}}

# Introduction

In recent months, our focus has been on developing a "good" model while optimizing the developer experience. As we progress towards **Qwen1.5**, the next iteration in our Qwen series, this update arrives just before the Chinese New Year.

{{< figure src="https://qianwen-res.oss-accelerate-overseas.aliyuncs.com/assets/blog/qwen1.5/intro.jpg#center" width="80%">}}

With Qwen1.5, we are open-sourcing base and chat models across six sizes: 0.5B, 1.8B, 4B, 7B, 14B, and 72B. In line with tradition, we're also providing quantized models, including Int4 and Int8 GPTQ models, as well as AWQ and GGUF quantized models. To enhance the developer experience, we've merged Qwen1.5's code into Hugging Face transformers, making it accessible with `transformers>=4.37.0` without needing `trust_remote_code`.

We've collaborated with frameworks like [vLLM](https://vllm.readthedocs.io/), [SGLang](https://github.com/sgl-project/sglang) for deployment, [AutoAWQ](https://github.com/casper-hansen/AutoAWQ), [AutoGPTQ](https://github.com/AutoGPTQ/AutoGPTQ) for quantization, [Axolotl](https://github.com/OpenAccess-AI-Collective/axolotl), [LLaMA-Factory](https://github.com/hiyouga/LLaMA-Factory) for finetuning, and [llama.cpp](https://github.com/ggerganov/llama.cpp) for local LLM inference, all of which now support Qwen1.5. The Qwen1.5 series is available on platforms such as [Ollama](https://ollama.ai/) and [LMStudio](https://lmstudio.ai/). Additionally, API services are offered not only on DashScope but also on [together.ai](https://together.ai/), with global accessibility. Visit [here](https://api.together.ai/) to get started, and we recommend trying out [Qwen1.5-72B-chat](https://api.together.xyz/playground/chat/Qwen/Qwen1.5-72B-Chat).

{{< figure src="https://qianwen-res.oss-accelerate-overseas.aliyuncs.com/assets/blog/qwen1.5/com.jpg#center" width="100%">}}

This release brings substantial improvements to the alignment of chat models with human preferences and enhanced multilingual capabilities. All models now uniformly support a context length of up to 32768 tokens. There have also been minor improvements in the quality of base language models that may benefit your finetuning endeavors. This step represents a small stride toward our objective of creating a truly "good" model.

# Performance

To provide a better understanding of the performance of Qwen1.5, we have conducted a comprehensive evaluation of both base and chat models on different capabilities, including basic capabilities such as language understanding, coding, reasoning, multilingual capabilities, human preference, agent, retrieval-augmented generation (RAG), etc.

## Basic Capabilities

To assess the basic capabilities of language models, we have conducted evaluations on traditional benchmarks, including MMLU (5-shot), C-Eval, Humaneval, GS8K, BBH, etc.

| Model        | MMLU | C-Eval | GSM8K | MATH | HumanEval | MBPP | BBH | CMMLU |
| :----------- | :--: | :----: | :---: | :--: | :-------: | :--: | :--: | :---: |
| GPT-4        | 86.4 |  69.9  | 92.0 | 45.8 |   67.0   | 61.8 | 86.7 | 71.0 |
| Llama2-7B    | 46.8 |  32.5  | 16.7 | 3.3 |   12.8   | 20.8 | 38.2 | 31.8 |
| Llama2-13B   | 55.0 |  41.4  | 29.6 | 5.0 |   18.9   | 30.3 | 45.6 | 38.4 |
| Llama2-34B   | 62.6 |   -   | 42.2 | 6.2 |   22.6   | 33.0 | 44.1 |   -   |
| Llama2-70B   | 69.8 |  50.1  | 54.4 | 10.6 |   23.7   | 37.7 | 58.4 | 53.6 |
| Mistral-7B   | 64.1 |  47.4  | 47.5 | 11.3 |   27.4   | 38.6 | 56.7 | 44.7 |
| Mixtral-8x7B | 70.6 |   -   | 74.4 | 28.4 |   40.2   | 60.7 |  -  |   -   |
| Qwen1.5-7B   | 61.0 |  74.1  | 62.5 | 20.3 |   36.0   | 37.4 | 40.2 | 73.1 |
| Qwen1.5-14B  | 67.6 |  78.7  | 70.1 | 29.2 |   37.8   | 44.0 | 53.7 | 77.6 |
| Qwen1.5-72B  | 77.5 |  84.1  | 79.5 | 34.1 |   41.5   | 53.4 | 65.5 | 83.5 |

At every model size, Qwen1.5 demonstrates strong performance across the diverse evaluation benchmarks. In particular, Qwen1.5-72B outperforms Llama2-70B across all benchmarks, showcasing its exceptional capabilities in language understanding, reasoning, and math.

In light of the recent surge in interest for small language models, we have compared Qwen1.5 with sizes smaller than 7 billion parameters, against the most outstanding small-scale models within the community. The results are shown below:

| Model              | Non-Emb Params | MMLU | C-Eval | GSM8K | MATH | HumanEval | MBPP | BBH | CMMLU |
| :----------------- | :------------: | :--: | :----: | :---: | :--: | :-------: | :--: | :--: | :---: |
| Tinyllama-1.1B     |      1.1B      | 24.3 |  25.0  |  2.3  | 0.7 |    6.7    | 19.9 | 28.8 | 24.0 |
| Gemini-Nano-3B     |       -       |  -  |   -   | 22.8 |  -  |     -     | 27.2 | 42.4 |   -   |
| StableLM-Zephyr-3B |      2.7B      | 45.9 |  30.3  | 52.5 | 12.5 |   35.4   | 31.9 | 37.7 | 30.9 |
| Phi-2              |      2.5B      | 52.7 |  23.4  | 57.2 | 3.5 |   47.6   | 55.0 | 43.4 | 24.2 |
| MiniCPM-2B         |      2.4B      | 53.5 |  51.1  | 53.8 | 10.2 |   50.0   | 47.3 | 36.9 | 51.1 |
| Qwen1.5-0.5B       |      0.3B      | 39.2 |  50.5  | 22.0 | 3.1 |   12.2   | 6.8 | 18.3 | 46.6 |
| Qwen1.5-1.8B       |      1.2B      | 46.8 |  59.7  | 38.4 | 10.1 |   20.1   | 18.0 | 24.2 | 57.8 |
| Qwen1.5-4B         |      3.1B      | 56.1 |  67.6  | 57.0 | 10.0 |   25.6   | 29.2 | 32.5 | 66.7 |

We can confidently assert that Qwen1.5 base models under 7 billion parameters are highly competitive with the leading small-scale models in the community. In the future, we will continue to improve the quality of small models and exploring methods for effectively transferring the advanced capabilities inherent in larger models into the smaller ones.

## Aligning with Human Preference

Alignment aims to enhance instruction-following capabilities of LLMs and help provide responses that are closely aligned with human preferences. Recognizing the significance of integrating human preferences into the learning process, we effectively employed techniques such as Direct Policy Optimization (DPO) and Proximal Policy Optimization (PPO) in aligning the latest Qwen series.

However, assessing the quality of such chat models poses a significant challenge.
Admittedly, while comprehensive human evaluation is the optimal approach, it faces significant challenges pertaining to scalability and reproducibility.
Therefore, we initially evaluate our models on two widely-used benchmarks, utilizing advanced LLMs as judges: MT-Bench and Alpaca-Eval. The results are presented below:

{{< figure src="https://qianwen-res.oss-accelerate-overseas.aliyuncs.com/assets/blog/qwen1.5/sft.jpg#center" width="80%">}}

We notice there are non-negligible variance in the scores on MT-Bench. So we have three runs with different seeds in our results and we report the average score with standard deviation.

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

Despite still significantly trailing behind GPT-4-Turbo, the largest open-source Qwen1.5 model, Qwen1.5-72B-Chat, exhibits superior performance, surpassing Claude-2.1, GPT-3.5-Turbo-0613, Mixtral-8x7b-instruct, and TULU 2 DPO 70B, being on par with Mistral Medium, on both MT-Bench and Alpaca-Eval v2.

Furthermore, although the scoring of LLM Judges may seemingly correlate with the lengths of responses, our observations indicate that our models do not generate lengthy responses to manipulate the bias of LLM judges. The average length of Qwen1.5-Chat on AlpacaEval 2.0 is only 1618, which aligns with the length of GPT-4 and is shorter than that of GPT-4-Turbo. Additionally, our experiments with our web service and app also reveal that users prefer the majority of responses from the new chat models.

<!-- <iframe
	src="https://qwen-qwen1-5-72b-chat.hf.space"
	frameborder="0"
	width="850"
	height="1000"
></iframe> -->

## Multilingual Understanding of Base Models

We have carefully selected a diverse set of 12 languages from Europe, East Asia, and Southeast Asia to thoroughly evaluate the multilingual capabilities of our foundational model. In order to accomplish this, we have curated test sets from the community's open-source repositories, covering four distinct dimensions: Exams, Understanding, Translation, and Math. The table below provides detailed information about each test set, including evaluation settings, metrics, and the languages they encompass:

| Dataset           |   Category   | Method/Metric |                   Languages                   |
| :---------------- | :-----------: | :-----------: | :--------------------------------------------: |
| MMLU-multi        |     Exams     |  5-shot/Acc  |     ar, es, fr, pt, de, it, ru, ja, ko, id     |
| M3Exams           |     Exams     |  5-shot/Acc  |                 pt, it, vi, th                 |
| BELEBELE          | Understanding |  5-shot/Acc  | ar, es, fr, pt, de, it, ru, ja, ko, vi, th, id |
| XWinograd         | Understanding |  5-shot/Acc  |                 fr, pt, ru, ja                 |
| XCOPA             | Understanding |  5-shot/Acc  |                   vi, id, th                   |
| PAWS-X            | Understanding |  5-shot/Acc  |               es, fr, de, ja, ko               |
| XStoryCloze       | Understanding |  0-shot/Acc  |                 ar, es, ru, id                 |
| Flores(zh/en↔xx) |  Translation  |  5-shot/BLEU  | ar, es, fr, pt, de, it, ru, ja, ko, vi, th, id |
| MGSM              |     Math     |  8-shot/Acc  |             es, fr, ru, de, ja, th             |

The detailed results are demonstrated below:

| Models       | Exams | Understanding | Math | Translation |
| :----------- | :---: | :-----------: | :---: | :---------: |
| Llama2-7B    | 34.03 |     50.13     | 9.40 |    22.19    |
| Llama2-13B   | 39.55 |     57.26     | 16.80 |    25.89    |
| Llama2-70B   | 55.88 |     73.19     | 40.20 |    31.56    |
| Mistral-7B   | 47.12 |     63.30     | 26.33 |    23.33    |
| Mixtral-8x7B | 56.08 |     70.70     | 45.00 |    29.78    |
| Qwen1.5-0.5B | 26.98 |     44.08     | 3.13 |    9.17    |
| Qwen1.5-1.8B | 33.57 |     48.37     | 6.47 |    16.19    |
| Qwen1.5-4B   | 41.43 |     59.76     | 21.33 |    23.34    |
| Qwen1.5-7B   | 47.70 |     67.63     | 37.27 |    28.36    |
| Qwen1.5-14B  | 55.72 |     74.10     | 49.93 |    31.69    |
| Qwen1.5-72B  | 66.35 |     78.16     | 61.67 |    35.57    |

The base models of Qwen1.5 showcase impressive multilingual capabilities, as demonstrated by its performance across a diverse set of 12 languages. In evaluations covering various dimensions such as exams, understanding, translation, and math, Qwen1.5 consistently delivers strong results. From languages like Arabic, Spanish, and French to Japanese, Korean, and Thai, Qwen1.5 demonstrates its ability to comprehend and generate high-quality content across different linguistic contexts. To take a step further, we evaluate the multilingual capabilities of chat models in a number of languages by calculating the win-tie rate against GPT-4. Results are shown below:

{{< figure src="https://qianwen-res.oss-accelerate-overseas.aliyuncs.com/assets/blog/qwen1.5/lang.png#center" width="100%">}}

These results demonstrate the strong multilingual capabilities of Qwen1.5 chat models, which can serve downstream applications, such as translation, language understanding, and multilingual chat. Also, we believe that the improvements in multilingual capabilities can also level up the general capabilities.

## Support of Long Context

With the increasing demand for long-context understanding, we have expanded the capability of all models to support contexts up to 32K tokens. We have evaluated the performance of Qwen1.5 models on the [L-Eval benchmark](https://github.com/OpenLMLab/LEval), which measures the ability of models to generate responses based on long context. The results are shown below:

| Models            | Coursera |  GSM  | QuALITY | TOEFL | SFiction | Avg. |
| :---------------- | :------: | :---: | :-----: | :---: | :------: | :---: |
| GPT3.5-turbo-16k  |  63.51  | 84.00 |  61.38  | 78.43 |  64.84  | 70.43 |
| Claude1.3-100k    |  60.03  | 88.00 |  73.76  | 83.64 |  72.65  | 75.62 |
| GPT4-32k          |  75.58  | 96.00 |  82.17  | 84.38 |  74.99  | 82.62 |
| Qwen-72B-Chat     |  58.13  | 76.00 |  77.22  | 86.24 |  69.53  | 73.42 |
| Qwen1.5-0.5B-Chat |  30.81  | 6.00 |  34.16  | 40.52 |  49.22  | 32.14 |
| Qwen1.5-1.8B-Chat |  39.24  | 37.00 |  42.08  | 55.76 |  44.53  | 43.72 |
| Qwen1.5-4B-Chat   |  54.94  | 47.00 |  57.92  | 69.15 |  56.25  | 57.05 |
| Qwen1.5-7B-Chat   |  59.74  | 60.00 |  64.36  | 79.18 |  62.50  | 65.16 |
| Qwen1.5-14B-Chat  |  69.04  | 79.00 |  74.75  | 83.64 |  75.78  | 76.44 |
| Qwen1.5-72B-Chat  |  71.95  | 82.00 |  77.72  | 85.50 |  73.44  | 78.12 |

In terms of the performance, even a small model like Qwen1.5-7B-Chat demonstrates competitive performance against GPT-3.5 on 4 out of 5 tasks. Our best model, Qwen1.5-72B-Chat, significantly outperforms GPT3.5-turbo-16k and only slightly falls behind GPT4-32k. These results highlight our outstanding performance within 32K tokens, yet they do not imply that our models are limited to supporting only 32K tokens. You can modify `max_position_embedding` in `config.json` to a larger value to see if the model performance is still satisfactory for your tasks.

## Capabilities to Connect with External Systems

Large language models (LLMs) are popular in part due to their ability to integrate external knowledge and tools. Retrieval-Augmented Generation (RAG) has gained traction as it mitigates common LLM issues like hallucination, real-time data shortage, and private information handling. Additionally, strong LLMs typically excel at using APIs and tools via function calling, making them ideal for serving as AI agents.

We first assess the performance of Qwen1.5-Chat on [RGB](https://arxiv.org/abs/2309.01431), an RAG benchmark for which we have not performed any specific optimization:

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

We then assess Qwen's capacity to function as a general-purpose agent by testing it on the [T-Eval](https://open-compass.github.io/T-Eval/) benchmark. None of the Qwen models have undergone any optimization tailored specifically for this benchmark:

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

To test the capabilities of tool using, also known as function calling, we follow our previous practice and use our opensourced evaluation [benchmark](https://github.com/QwenLM/Qwen/blob/main/eval/evaluate_plugin.py) for assessing the models' ability to appropriately select and use tools:

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

Finally, since the Python code interpreter has emerged as an increasingly powerful tool for advanced LLMs, we also evaluate our models' capability in utilizing this tool on our previously open-sourced [benchmark](https://github.com/QwenLM/Qwen-Agent/tree/main/benchmark):

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

Larger Qwen1.5-Chat models generally outperform smaller ones, nearing GPT-4's tool-use performance. However, in code interpreter tasks like math problem-solving and visualization, even the largest Qwen1.5-72B-Chat model lags significantly behind GPT-4 due to coding capabilities. We aim in future versions to enhance the coding capabilities of all Qwen models during both pre-training and alignment.

## Develop with Qwen1.5

The biggest difference in Qwen1.5 is the integration of Qwen1.5 to Hugging Face transformers. Since 4.37.0, you can use Qwen1.5 without our custom code, which means that you can load the model like the following:

```python
from transformers import AutoModelForCausalLM
# This is what we previously used
model = AutoModelForCausalLM.from_pretrained("Qwen/Qwen-7B-Chat", device_map="auto", trust_remote_code=True)
# This is what you can use now
model = AutoModelForCausalLM.from_pretrained("Qwen/Qwen1.5-7B-Chat", device_map="auto")
```

The usage of Qwen1.5 for chat is different from the previous version. You can use the following code to chat with Qwen1.5:

```python
from transformers import AutoModelForCausalLM, AutoTokenizer
device = "cuda" # the device to load the model onto

model = AutoModelForCausalLM.from_pretrained(
    "Qwen/Qwen1.5-14B-Chat-AWQ",
    device_map="auto"
)
tokenizer = AutoTokenizer.from_pretrained("Qwen/Qwen1.5-14B-Chat-AWQ")

prompt = "Give me a short introduction to large language model."
messages = [
    {"role": "system", "content": "You are a helpful assistant."},
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

For chat models, we no longer use a specific `model.chat()` method, but instead we use `model.generate()` with the chat template written in `tokenizer_config.json` so that we can use `tokenizer.apply_chat_template()` to generate the input, and we use `eos_token` to control when to stop the generation.

We also provide AWQ models and GPTQ models (including Int4 and Int8 models) for you to use Qwen1.5 in low-resource or deployment scenarios. As Huggingface transformers supports [AWQ](https://github.com/casper-hansen/AutoAWQ) and [GPTQ](https://github.com/AutoGPTQ/AutoGPTQ), you can use them in the same way above only with the corresponding model names.

Furthermore, we have integrated our code to popular inference frameworks so that you can deploy your model easily. Now `vLLM>=0.3.0` and `SGLang>=0.1.11` officially support Qwen1.5. Check their official github repos and docs to learn about the detailed usage. Here we demonstrate an example to show how to use vLLM to build an OpenAI-API compatible interface for our model:

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

For users to run LLM locally, llama.cpp also provides support to Qwen1.5, and we officially provide quantized models in the GGUF format in our HF model hub. You can use the following code to run Qwen1.5 in llama.cpp:

```shell
./main -m qwen1.5-7b-chat-q2_k.gguf -n 512 --color -i -cml -f prompts/chat-with-qwen.txt
```

Besides, you can use the GGUF file with Ollama. Thanks to the support of [Ollama](https://ollama.ai/), you can now directly use one line of command:

```shell
ollama run qwen1.5
```

Or you can use the GGUF file to play with [llamafile](https://github.com/Mozilla-Ocho/llamafile) to run our models with a single file.

To make a web demo locally, we advise you to use [Text generation web UI](https://github.com/oobabooga/text-generation-webui) which is very easy to use.

For advanced developers that hope to train better or more suitable models for themselves, such as post-training, Qwen1.5 is supported by Hugging face `trainer` and Peft. Also, there are easy-to-use frameworks that support both supervised finetuning (SFT) and alignment (PPO, DPO, etc.). Now, both [LLaMA-Factory](https://github.com/hiyouga/LLaMA-Factory) and [Axolotl](https://github.com/OpenAccess-AI-Collective/axolotl) have supported the training of Qwen1.5. We advise you to turn to their official github repos and docs for more advanced usages.

If you would like to use Qwen1.5 for downstream applications, such as RAG, tool use, agent, you can now build OpenAI-API compatible API or run local models for famous frameworks, e.g., [LlamaIndex](https://www.llamaindex.ai/), [LangChain](https://www.langchain.com/), [CrewAI](https://www.crewai.io/).

Overall, as we care about your developing experience, we not only have tried our best to provide good models to the community but also have made efforts to make things easier for all of you. We hope that you can enjoy using Qwen1.5 and that it can help you with your tasks of either research or applications.

## Conclusion

We are excited to introduce Qwen1.5, the next version of our Qwen series. In this release, we have opensourced both base and chat models of 6 sizes, including 0.5B, 1.8B, 4B, 7B, 14B, and 72B, and we have also provided quantized models. We have merged our code of Qwen1.5 to Hugging face transformers, and you can directly use it with `transformers>=4.37.0` without `trust_remote_code`. Additionally, we have had frameworks, e.g., vLLM, SGLang, AutoGPTQ, etc., supported Qwen1.5. We believe from now on, using our models will be much easier. We believe that this release is though a small step towards model quality, but it is a big step towards developer experience. Hope you like it and enjoy using it. Join our [Discord](https://discord.gg/yPEP2vHTu4) or [WeChat](https://github.com/QwenLM/Qwen/blob/main/assets/wechat.png) to share your experience, comments, or whatever you like with us. We are looking forward to hearing from you.
