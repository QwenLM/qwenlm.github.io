---
title: "Qwen2.5-LLM: Extending the boundary of LLMs"
date: 2024-09-19T00:00:03+08:00
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
{{< button href="https://huggingface.co/spaces/Qwen/Qwen2.5-72B-Instruct" label="DEMO" external=true >}}
{{< button href="https://discord.gg/yPEP2vHTu4" label="DISCORD" external=true >}}

# Introduction

In this blog, we delve into the details of our latest Qwen2.5 series language models. We have developed a range of decoder-only dense models, with seven of them open-sourced, spanning from 0.5B to 72B parameters. Our research indicates a significant interest among users in models within the 10-30B range for production use, as well as 3B models for mobile applications. To meet these demands, we are open-sourcing Qwen2.5-3B, Qwen2.5-14B, and Qwen2.5-32B. Furthermore, we are excited to offer additional models, including Qwen2.5-Plus and Qwen2.5-Turbo, available through API services via [Alibaba Cloud Model Studio](https://help.aliyun.com/zh/model-studio/developer-reference/what-is-qwen-llm).

Compared with the Qwen2 series, the Qwen2.5 series has the following upgrades:

1) **Full-scale Open-source**: Considering that users have a strong interest in models in the 10-30B range for production and 3B models for mobile applications, Qwen2.5, in addition to continuing to open source the four models of 0.5/1.5/7/72B of the same size as Qwen2, also added two medium-sized cost-effective models of **Qwen2.5-14B** and **Qwen2.5-32B** and a mobile-side model called **Qwen2.5-3B**. 
All models are highly competitive compared to open-source models of the same level. For example, Qwen2.5-32B beats Qwen2-72B and Qwen2.5-14B outperforms Qwen2-57B-A14B in our comprehensive evaluations.

2) **Larger and Higher Quality Pre-training Dataset**: The size of the pre-training dataset is expanded from 7 trillion tokens to a maximum of **18 trillion** tokens. 

3) **Knowledge Enhancement**: Qwen2.5 has acquired significantly more knowledge. On MMLU benchmarks, Qwen2.5-7/72B are improved from 70.3 to **74.2** and 84.2 to **86.1** compared to Qwen2-7/72B. We observe that Qwen2.5 also has significant improvements on the GPQA/MMLU-Pro/MMLU-redux/ARC-c benchmarks.

4) **Coding Enhancement**: Thanks to the technical breakthrough of Qwen2.5-Coder, Qwen2.5 has greatly improved capabilities in coding. Qwen2.5-72B-Instruct achieves **55.5**, **75.1**, and **88.2** scores on LiveCodeBench (2305-2409), MultiPL-E and MBPP, respectively, outperforming Qwen2-72B-Instruct with 32.2, 69.2, and 80.2.

5) **Math Enhancement**: After integrating Qwen2-math's technology, the mathematical ability of Qwen2.5 has also been rapidly improved. On the MATH benchmark, the scores of Qwen2.5-7B/72B-Instruct have been increased from 52.9/69.0 of Qwen2-7B/72B-Instruct to **75.5/83.1**.

6) **Better Human Preference**: Qwen2.5 is capable of generating responses that align more closely with human preferences. Specifically, the Arena-Hard score for Qwen2.5-72B-Instruct has increased significantly from **48.1** to **81.2**, and the MT-Bench score has improved from **9.12** to **9.35**, compared to Qwen2-72B-Instruct.

7) **Other Core Capabilities Enhancement**: Qwen2.5 achieves significant improvements in **instruction following**, **generating long texts** (increased from 1k to over **8K tokens**), **understanding structured data** (e.g., tables), and **generating structured outputs**, especially JSON. Furthermore, Qwen2.5 models are generally more resilient to the diversity of **system prompts**, enhancing **role-play** implementation and **condition-setting** for chatbots.


# Model Card

Here is a model card detailing the key parameters of the Qwen2.5 LLM models. This release includes seven open-sourced models with sizes ranging from 0.5B to 72B. Most models support a context length of 128K (131,072) tokens and can generate up to 8K tokens, enabling the production of extensive text outputs. The majority of these models are licensed under Apache 2.0, while Qwen2.5-3B and Qwen2.5-72B are governed by the Qwen Research License and Qwen License, respectively.

|  Models  | Params | Non-Emb Params | Layers | Heads (KV) | Tie Embedding | Context Length | Generation Length | License |
| :--------| :--------: | :--------: | :------: | :------------: | :-------: | :------------: | :-------: | :-------: |
| Qwen2.5-0.5B |  0.49B |  0.36B | 24 | 14 / 2 | Yes |  32K | 8K | Apache 2.0 |
| Qwen2.5-1.5B | 1.54B |  1.31B | 28 | 12 / 2 | Yes |  32K | 8K | Apache 2.0 |
| Qwen2.5-3B  |  3.09B |  2.77B | 36 | 16 / 2 | Yes |  32K | 8K | Qwen Research |
| Qwen2.5-7B | 7.61B |  6.53B | 28 | 28 / 4 | No |  128K | 8K | Apache 2.0 |
| Qwen2.5-14B | 14.7B |  13.1B | 48 | 40 / 8 | No |  128K  | 8K | Apache 2.0 |
| Qwen2.5-32B  |  32.5B |  31.0B | 64 | 40 / 8 | No |  128K | 8K | Apache 2.0 |
| Qwen2.5-72B  | 72.7B |  70.0B | 80 | 64 / 8 | No |  128K | 8K | Qwen |


# Performance

This section presents the performance metrics for both base language models and instruction-tuned models across various benchmark evaluations, encompassing a diverse array of domains and tasks.

## Qwen2.5 Base Language Model Evaluation

The evaluation of base models primarily emphasizes their performance in natural language understanding, general question answering, coding, mathematics, scientific knowledge, reasoning, and multilingual capabilities.

The evaluation datasets include:

**General Tasks**: MMLU (5-shot), MMLU-Pro (5-shot), MMLU-redux (5-shot), BBH (3-shot), ARC-C (25-shot), TruthfulQA (0-shot), Winogrande (5-shot), HellaSwag (10-shot)

**Math & Science Tasks**: GPQA (5-shot), Theorem QA (5-shot), GSM8K (4-shot), MATH (4-shot)

**Coding Tasks**: HumanEval (0-shot), HumanEval+ (0-shot), MBPP (0-shot), MBPP+ (0-shot), MultiPL-E (0-shot) (Python, C++, JAVA, PHP, TypeScript, C#, Bash, JavaScript)
  
**Multilingual Tasks**: Multi-Exam (M3Exam 5-shot, IndoMMLU 3-shot, ruMMLU 5-shot, mMMLU 5-shot), Multi-Understanding (BELEBELE 5-shot, XCOPA 5-shot, XWinograd 5-shot, XStoryCloze 0-shot, PAWS-X 5-shot), Multi-Mathematics (MGSM 8-shot), Multi-Translation (Flores-101 5-shot)

### Qwen2.5-72B Performance

|  Datasets  |  Llama-3-70B   |  Mixtral-8x22B  |   Llama-3-405B  | Qwen2-72B |  **Qwen2.5-72B** |
| :--------| :------------: | :------------: | :------------: |:---------:|:------------: |
| ***General Tasks***  |   |   |    |     	     |		|  
|MMLU | 79.5 | 77.8 | 85.2 |   84.2    | **86.1** | 
|MMLU-Pro | 52.8 | 51.6 | **61.6** |   55.7    | 58.1 | 
|MMLU-redux |75.0 | 72.9 | - |   80.5    | **83.9** |
|BBH |81.0 | 78.9 | 85.9 |   82.4    | **86.3** | 
|ARC-C  |68.8 | 70.7 | - |   68.9    | **72.4** |
|TruthfulQA  |45.6 | 51.0 | - |   54.8    | **60.4** |
|WindoGrande  |85.3 | 85.0 | **86.7** |   85.1    | 83.9 |
|HellaSwag   |88.0 | **88.7** | - |   87.3    | 87.6 |
|  ***Mathematics & Science Tasks*** |   |   |    |     	     | |
|GPQA |36.3|34.3|-|   37.4    |**45.9**|
|Theoremqa  |32.3|35.9|-| **42.8**  |42.4|
|MATH  | 42.5  | 41.7  | 53.8  |   50.9    | **62.1**  |
|MMLU-stem  | 73.7  | 71.7  | -     |   79.6    | **82.7**  |
|GSM8K | 77.6  | 83.7  | 89.0  |   89.0    | **91.5**  |
|   ***Coding Tasks***  |   |   |    |     	     |	    |
| HumanEval  | 48.2  | 46.3  | **61.0** |   64.6    | 59.1  | 
| HumanEval+ | 42.1  | 40.2  | -    | **56.1**  | 51.2  | 
| MBPP       | 70.4  | 71.7  | 73.0 |   76.9    | **84.7**  |
| MBPP+      | 58.4  | 58.1  | -    |   63.9    | **69.2**  | 
| MultiPL-E  | 46.3  | 46.7  | -    |   59.6    | **60.5**  | 
|   ***Multilingual Tasks***  |   |   |    |     	     |	    |	 
| Multi-Exam           | 70.0  | 63.5  | - |   76.6    | **78.7**  | 
| Multi-Understanding | 79.9  | 77.7  | -  |   80.7    | **89.6**  | 
| Multi-Mathematics    | 67.1  | 62.9  |  - |   76.0    | **76.7**  |
| Multi-Translation    | 38.0  | 23.3  |  - |   37.8    | **39.0**  | 

The Qwen2.5-72B base model significantly outperforms its peers in the same category across a wide range of tasks. It achieves results comparable to Llama-3-405B while utilizing only one-fifth of the parameters. Furthermore, when compared to its predecessor, Qwen2-72B, the Qwen2.5-72B shows marked improvements in nearly all benchmark evaluations, particularly excelling in general tasks, mathematics, and coding challenges.

### Qwen2.5-14B/32B Performance

|  Datasets  |  Qwen1.5-32B  | Gemma2-27B  | Yi-1.5-34B  | Qwen2-57B-A14B  | **Qwen2.5-14B**  | **Qwen2.5-32B** |
| :--------| :------------: | :------------: | :------------: | :------------: |:------------: |:------------: |
| ***General Tasks***  |   |   |    |     |     |   |
| MMLU       | 74.3  | 75.2  | 77.2  | 76.5  | 79.7 | **83.3** |
| MMLU-pro   | 44.1  | 49.1  | 48.3  | 43.0  | 51.2 | **55.1** |
| MMLU-redux | 69.0  | -     | 74.1  | 72.4  | 76.6 | **82.0** |
| BBH        | 66.8  | 74.9  | 76.4  | 67.0  | 78.2 |**84.5** |
| ARC-C      | 63.6  | **71.4**  | 65.6  | 64.1  |  67.3 | 70.4 |
| Truthfulqa | 57.4  | 40.1  | 53.9  | 57.7  | **58.4** | 57.8 |
| Winogrande | 81.5  | 59.7  | **84.9**  | 79.5  | - | 82.0 |
| Hellaswag  | 85.0  | **86.4**  | 85.9  | 85.2  | - | 85.2 |
|  ***Mathematics & Science Tasks*** |   |   |    |     |     |   |
| GPQA      | 30.8  | 34.9  | 37.4  | 34.3  | 32.8  | **48.0** |
| Theoremqa | 28.8  | 35.8  | 40.0  | 33.5  | 43.0  | **44.1** |
| MATH      | 36.1  | 42.7  | 41.7  | 43.0  | 55.6  | **57.7** |
| MMLU-stem | 66.5  | 71.0  | 72.6  | 69.8  | 76.4  | **80.9** |
| GSM8K     | 78.5  | 81.1  | 81.7  | 80.7  | 90.2  | **92.9** |
|   ***Coding Tasks***  |    |   |    |     |     |   |
| HumanEval  | 43.3  | 54.9  | 46.3  | 53.0  | 56.7  | **58.5** |
| HumanEval+ | 40.2  | 46.3  | 40.2  | 46.3  | 51.2  | **52.4** |
| MBPP       | 64.2  | 75.7  | 65.5  | 71.9  | 76.7  | **84.5** |
| MBPP+      | 53.9  | 60.2  | 55.4  | 57.4  | 63.2  | **67.2** |
| MultiPL-E  | 38.5  | 48.0  | 39.5  | 49.8  | 53.5  |**59.4** |
|   ***Multilingual Tasks*** |   |   |    |     |     |  |
| Multi-Exam           | 61.6  | 65.8  | 58.3  | 65.5  | 70.6 | **75.4** |
| Multi-Understanding | 76.5  | 82.2  | 73.9  | 77.0  | 85.9  |**88.4** |
| Multi-Mathematics    | 56.1  | 61.6  | 49.3  | 62.3  | 68.5  | **73.7** |
| Multi-Translation    | 33.5  | 38.7  | 30.0  | 34.5  | 36.2  |**37.3** |

The Qwen2.5-14B model demonstrates a solid performance across various tasks, particularly excelling in general tasks like MMLU and BBH, where it achieves scores of 79.7 and 78.2, outcompeting competitors of larger sizes. Meanwhile, Qwen2.5-32B, in particular, showcases exceptional capabilities, often surpassing larger models of similar model sizes. Notably, it outperforms its predecessor Qwen1.5-32B significantly, especially in challenging areas such as mathematics and coding, with notable scores of 57.7 in MATH and 84.5 in MBPP. 

<!-- ### Qwen2.5-14B performance

|  Datasets  | Qwen2.5-7B  | Qwen1.5-14B  |   Qwen1.5-32B  |  **Qwen2.5-14B**  |
| :--------| :------------: | :------------: | :------------: | :------------: |
| ***General Tasks***  |   |   |    |  |
| MMLU       | 74.2 | 67.8 | 74.3 | **79.7** |
| MMLU-pro   | 45.0 | 37.2 | 44.1 | **51.2** |
| MMLU-redux | 71.1 | 65.4 | 69.0 | **76.6** |
| BBH        | 70.4 | 53.7 | 66.8 | **78.2** |
| ARC-C      | 63.7 | 56.3 | 63.6 | **67.3** |
| Trurhfulqa | 56.4 | 52.1 | 57.4 | **58.4** |
|  ***Mathematics & Scinece Tasks*** |   |   |    | |
| GPQA      | **36.4**  | 29.3  | 30.8 | 32.8  |
| Theoremqa | 36.0  | 23.3  | 28.8 | **43.0**  |
| MATH      | 49.8  | 44.3  | 36.1 | **55.6**  |
| MMLU-stem | 72.3  | 59.6  | 66.5 | **76.4**  |
| GSM8K     | 85.4  | 73.8  | 78.5 | **90.2**  |
|   ***Coding Tasks***  |   |   |    |  |
| HumanEval  | **57.9**  | 42.1  | 43.3 | 56.7  |
| HumanEval+ | 50.6  | 37.2  | 40.2 | **51.2**  |
| MBPP       | 74.9  | 58.1  | 64.2 | **76.7**  |
| MBPP+      | 62.9  | 47.9  | 53.9 | **63.2**  |
| MultiPL-E  | 50.3  | 35.4  | 38.5 | **53.5**  |
|   ***Multilingual Tasks*** |   |   |    |  |
| Multi-Exam           | 59.4  | 55.7  |61.6  | **70.6**  |
| Multi-Understanding | 79.3  | 73.8  | 76.5  | **85.9**  |
| Multi-Mathematics    | 57.8  | 49.9  |56.1  | **68.5**  |
| Multi-Translation    | 32.4  | 32.4  | 33.5 | **36.2**  | -->



### Qwen2.5-7B Performance

|  Datasets  | Mistral-7B  | Llama3-8B  | Gemma2-9B  | Qwen2-7B   | **Qwen2.5-7B** |
| :--------| :------------: | :------------: | :------------: | :------------: | :------------: |
|#Non-emb Params | 7.0B | 7.0B |  8.2B   | 6.5B| 6.5B|
| ***General Tasks***  |   |   |    |     |  |
| MMLU       | 64.2  | 66.6  | 71.3  | 70.3  | **74.2** |
| MMLU-pro   | 30.9  | 35.4  | 44.7  | 40.1  | **45.0** |
| MMLU-redux | 58.1  | 61.6  | 67.9  | 68.1  | **71.1** |
| BBH        | 56.1  | 57.7  | 68.2  | 62.3  | **70.4** |
| ARC-C      | 60.0  | 59.3  | **68.2**  | 60.6  | 63.7 |
| Trurhfulqa | 42.2  | 44.0  | 45.3  | 54.2  | **56.4** |
| Winogrande | 78.4  | 77.4  | **79.5**  | 77.0  | 75.9 |
| Hellaswag  | **83.3**  | 82.1  | 81.9  | 80.7  | 80.2 |
|  ***Mathematics & Science Tasks*** |   |   |    |     |  |
| GPQA      | 24.7  | 25.8  | 32.8  | 30.8  | **36.4** |
| Theoremqa | 19.2  | 22.1  | 28.9  | 29.6  | **36.0** |
| MATH      | 10.2  | 20.5  | 37.7  | 43.5  | **49.8** |
| MMLU-stem | 50.1  | 55.3  | 65.1  | 64.2  | **72.3** |
| GSM8K     | 36.2  | 55.3  | 70.7  | 80.2  | **85.4** |
|   ***Coding Tasks***  |   |   |    |     |    |
| HumanEval  | 29.3  | 33.5  | 37.8  | 51.2  | **57.9** |
| HumanEval+ | 24.4  | 29.3  | 30.5  | 43.3  | **50.6** |
| MBPP       | 51.1  | 53.9  | 62.2  | 64.2  | **74.9** |
| MBPP+      | 40.9  | 44.4  | 50.6  | 51.9  | **62.9** |
| MultiPL-E  | 29.4  | 22.6  | 34.9  | 41.0  | **50.3** |
|   ***Multilingual Tasks*** |   |   |    |     |  |
| Multi-Exam           | 47.1  | 52.3  | **61.2**  | 59.2  | 59.4 |
| Multi-Understanding | 63.3  | 68.6  | 78.3  | 72.0  | **79.3** |
| Multi-Mathematics    | 26.3  | 36.3  | 53.0  | 57.5  | **57.8** |
| Multi-Translation    | 23.3  | 31.9  | **36.5**  | 31.5  | 32.4 |

The Qwen2.5-7B model surpasses its predecessors and counterparts in numerous benchmarks, despite having fewer non-embedding parameters. It demonstrates significant improvements across various tasks, achieving 74.2 on general benchmarks like MMLU, 49.8 on math challenges such as MATH, and 57.9 on coding tasks like HumanEval.

### Qwen2.5-0.5B/1.5B/3B Performance

|  Datasets  | Qwen2-0.5B  | **Qwen2.5-0.5B** | Qwen2-1.5B  | **Qwen2.5-1.5B**  | Gemma2-2.6B  | **Qwen2.5-3B** |
| :--------| :------------: | :------------: | :------------: | :------------: | :------------: | :------------: |
| ***General Tasks***  |   |   |    |     |  | |
| MMLU       | 44.3  | 47.5  | 55.9  | 60.9  | 52.2  | **65.6** |
| MMLU-pro   | 14.7  | 15.7  | 21.6  | 28.5  | 23.0  | **34.6** |
| MMLU-redux | 40.7  | 45.1  | 51.8  | 58.5  | 50.9  | **63.7** |
| BBH        | 18.2  | 20.3  | 36.5  | 45.1  | 41.9  | **56.3** |
| ARC-C      | 31.0  | 35.6  | 43.7  | 54.7  | 55.7  | **56.5** |
| Trurhfulqa | 39.7  | 40.2  | 45.9  | 46.6  | 36.2  | **48.9** |
| Winogrande | 56.9  | 56.3  | 65.0  | 65.0  | **71.5**  | 71.1 |
| Hellaswag  | 49.1  | 52.1  | 67.0  | 67.9  | 74.6  | **74.6** |
|  ***Mathematics & Science Tasks*** |   |   |    |     |  | |
| GPQA      | 29.8  | 24.8  | 20.7  | 24.2  | 25.3  | **26.3** |
| Theoremqa | 9.6   | 16.0  | 14.8  | 22.1  | 15.9  | **27.4** |
| MATH      | 11.2  | 19.5  | 21.6  | 35.0  | 18.3  | **42.6** |
| MMLU-stem | 27.5  | 39.8  | 42.7  | 54.8  | 45.8  | **62.5** |
| GSM8K     | 36.4  | 41.6  | 46.9  | 68.5  | 30.3  | **79.1** |
|   ***Coding Tasks***  |   |   |    |     |    |  |
| HumanEval  | 22.6  | 30.5  | 34.8  | 37.2  | 19.5  | **42.1** |
| HumanEval+ | 18.9  | 26.8  | 29.9  | 32.9  | 15.9  | **36.0** |
| MBPP       | 33.1  | 39.3  | 46.9  | **60.2**  | 42.1  | 57.1 |
| MBPP+      | 27.6  | 33.8  | 37.6  | **49.6**  | 33.6  | 49.4 |
| MultiPL-E  | 16.3  | 18.9  | 27.9  | 33.1  | 17.6  | **41.2** |
|   ***Multilingual Tasks*** |   |   |    |     |  | |
| Multi-Exam           | 29.4  | 30.8  | 43.1  | 47.9  | 38.1  | **54.6** |
| Multi-Understanding | 40.4  | 41.0 | 50.7  |  65.1  | 46.8  | **76.6** |
| Multi-Mathematics    | 7.8   | 13.5   | 21.3  | 37.5  | 18.2  | **48.9** |
| Multi-Translation    | 14.1  | 15.3   | 23.8  |  25.0  | 26.9  | **29.3** |

For edge-side models, Qwen2.5-0.5B, 1.5B, and 3B continue to maintain strong performance across nearly all benchmarks. Notably, the Qwen2.5-0.5B model outperforms the Gemma2-2.6B on various math and coding tasks.

## Instruction-tuned Model Evaluation

The evaluation of instruction-tuned models mainly focuses on the model performance of natural language understanding, general question answering, reasoning, coding, mathematics, instruction following, human alignment, etc.

The datasets for evaluation include:

**General Tasks**: MMLU-Pro, MMLU-redux

**Math & Science Tasks**: GPQA, GSM8K, MATH

**Coding Tasks**: HumanEval, MBPP, MultiPL-E, LiveCodeBench 2305-2409, LiveBench 0831

**Instruction & Alignment Tasks**: IFeval strict-prompt, Arena-Hard, AlignBench v1.1, MTbench

### Qwen2.5-72B-Instruct Performance

| Datasets | Mistral-Large2 Instruct | Llama-3.1-70B-Instruct | Llama-3.1-405B-Instruct | Qwen2-72B-Instruct | **Qwen2.5-72B-Instruct** |
| --- | --- | --- | --- | --- | --- |
| MMLU-Pro | 69.4 | 66.4 | **73.3** | 64.4 | 71.1 |
| MMLU-redux | 83.0 | 83.0 | 86.2 | 81.6 | **86.8** |
| GPQA | **52.0** | 46.7 | 51.1 | 42.4 | 49.0 |
| MATH | 69.9 | 68.0 | 73.8 | 69.0 | **83.1** |
| GSM8K | 92.7 | 95.1 | **96.8** | 93.2 | 95.8 |
| HumanEval | **92.1** | 80.5 | 89.0 | 86.0 | 86.6 |
| MBPP | 80.0 | 84.2 | 84.5 | 80.2 | **88.2** |
| MultiPL-E | **76.9** | 68.2 | 73.5 | 69.2 | 75.1 |
| LiveCodeBench 2305-2409 | 42.2 | 32.1 | 41.6 | 32.2 | **55.5** |
| LiveBench 0831 | 48.5 | 46.6 | **53.2** | 41.5 | 52.3 |
| IFeval strict-prompt | 64.1 | 83.6 | **86.0** | 77.6 | 84.1 |
| Arena-Hard | 73.1 | 55.7 | 69.3 | 48.1 | **81.2** |
| AlignBench v1.1 | 7.69 | 5.94 | 5.95 | 8.15 | **8.16** |
| MTbench | 8.61 | 8.79 | 9.08 | 9.12 | **9.35** |

The Qwen2.5-72B-Instruct model delivers exceptional performance, even surpassing the larger Llama-3.1-405B in several critical tasks. Qwen2.5-72B-Instruct excels in mathematics (MATH: 83.1), coding (LiveCodeBench: 55.5), and chatting (Arena-Hard: 81.2). Compared to its base model Qwen2.5-72B and its predecessor Qwen2-72B-Instruct, the Qwen2.5-72B-Instruct showcases comprehensive improvements across all tasks.

### Qwen2.5-Turbo & Qwen2.5-14B-Instruct & Qwen2.5-32B-Instruct Performance

| Datasets | Qwen2-57B-A14B-Instruct | Gemma2-27B-IT | GPT4o-mini | **Qwen2.5-Turbo** | **Qwen2.5-14B-Instruct** | **Qwen2.5-32B-Instruct** |
| --- | --- | --- | --- | --- | --- | --- |
| MMLU-Pro | 52.8 | 55.5 | 63.1 | 64.8 | 63.7 | **69.0** |
| MMLU-redux | 72.6 | 75.7 | 81.5 | 80.4 | 80.0 | **83.9** |
| GPQA | 34.3 | 38.4 | 40.2 | 44.4 | 45.5 | **49.5** |
| MATH | 49.1 | 54.4 | 70.2 | 81.0 | 80.0 | **83.1** |
| GSM8K | 85.3 | 90.4 | 93.2 | 93.6 | 94.8 | **95.9** |
| HumanEval | 79.9 | 78.7 | **88.4** | 86.6 | 83.5 | **88.4** |
| MBPP | 70.9 | 81.0 | **85.7** | 80.2 | 82.0 | 84.0 |
| MultiPL-E | 66.4 | 67.4 | 75.0 | 73.0 | 72.8 | **75.4** |
| LiveCodeBench 2305-2409 | 22.5 | - | 40.7 | 43.1 | 42.6 | **51.2** |
| LiveBench 0831 | 31.1 | 39.6 | 43.3 | 41.6 | 44.4 | **50.7** |
| IFeval strict-prompt | 59.9 | 77.1 | 80.4 | 74.9 | **81.0** | 79.5 |
| Arena-Hard | 17.8 | 57.5 | **74.9** | 68.4 | 68.3 | 74.5 |
| AlignBench v1.1 | 7.02 | 7.22 | 7.81 | **7.99** | 7.94 | 7.93 |
| MTbench | 8.55 | 9.10 | - | 8.86 | 8.88 | **9.20** |

The Qwen2.5-32B-Instruct model demonstrates superior performance across most tasks when compared to other models of similar size. In comparison to GPT-4o-mini, our open-source model, Qwen2.5-14B-Instruct, along with our API model, Qwen2.5-Turbo, also deliver competitive results across all benchmarks.


### Qwen2.5-7B-Instruct Performance

| Datasets | Gemma2-9b-IT | Llama3.1-8B-Instruct | Qwen2-7B-Instruct | **Qwen2.5-7B-Instruct** |
| --- | --- | --- | --- | --- |
| MMLU-Pro | 52.1 | 48.3 | 44.1 | **56.3** |
| MMLU-redux | 72.8 | 67.2 | 67.3 | **75.4** |
| GPQA | 32.8 | 32.8 | 34.3 | **36.4** |
| MATH | 44.3 | 51.9 | 52.9 | **75.5** |
| GSM8K | 76.7 | 84.5 | 85.7 | **91.6** |
| HumanEval | 68.9 | 72.6 | 79.9 | **84.8** |
| MBPP | 74.9 | 69.6 | 67.2 | **79.2** |
| MultiPL-E | 53.4 | 50.7 | 59.1 | **70.4** |
| LiveCodeBench 2305-2409 | 18.9 | 8.3 | 23.9 | **28.7** |
| LiveBench 0831 | 30.6 | 26.7 | 29.2 | **35.9** |
| IFeval strict-prompt | 70.1 | **75.9** | 54.7 | 71.2 |
| Arena-Hard | 41.6 | 27.8 | 25.0 | **52.0** |
| AlignBench v1.1 | 7.05 | 4.75 | 7.13 | **7.33** |
| MTbench | 8.49 | 8.23 | 8.26 | **8.75** |

The Qwen2.5-7B-Instruct model significantly outperforms its competitors, Gemma2-9b-IT and Llama3.1-8B-Instruct, across all tasks except IFeval. Notably, Qwen2.5-7B-Instruct demonstrates clear advantages in mathematics (MATH: 75.5) and coding (HumanEval: 84.8).


### Qwen2.5-3B-Instruct Performance

| Datasets | Gemma2-2B-IT | Phi3.5-mini-Instruct | MiniCPM3-4B | **Qwen2.5-3B-Instruct** |
| --- |-------------| --- | --- | --- |
| Non-Emb Params | 2.0B        | 3.6B | 4.0B | 2.8B |
| MMLU-Pro | 26.7        | **47.5** | 43.0 | 43.7 |
| MMLU-redux | 51.9        | **67.7** | 59.9 | 64.4 |
| GPQA | 29.3        | 27.2 | **31.3** | 30.3 |
| MATH | 26.6        | 48.5 | 46.6 | **65.9** |
| GSM8K | 63.2        | 86.2 | 81.1 | **86.7** |
| HumanEval | 68.9        | 72.6 | **74.4** | **74.4** |
| MBPP | **74.9**    | 63.2 | 72.5 | 72.7 |
| MultiPL-E | 30.5        | 47.2 | 49.1 | **60.2** |
| LiveCodeBench 2305-2409 | 5.8         | 15.8 | **23.8** | 19.9 |
| LiveBench 0831 | 20.1        | 27.4 | **27.6** | 26.8 |
| IFeval strict-prompt | 51.0        | 52.1 | **68.4** | 58.2 |

As for the edge-side instruction model, the Qwen2.5-3B-Instruct model has fewer parameters than both the Phi3.5-mini-Instruct and MiniCPM3-4B models. Despite this, it outperforms them in mathematics and coding tasks while delivering competitive results in language understanding.

### Qwen2.5-0.5B/1.5B-Instruct Performance

| Datasets | Qwen2-0.5B-Instruct | **Qwen2.5-0.5B-Instruct** | Qwen2-1.5B-Instruct | **Qwen2.5-1.5B-Instruct** |
| --- | --- | --- |--------------------|--------------------------|
| MMLU-Pro | 14.4 | **15.0** | 22.9               | **32.4**                 |
| MMLU-redux | 12.9 | **24.1** | 41.2               | **50.7**                 |
| GPQA | 23.7 | **29.8** | 21.2               | **29.8**                 |
| MATH | 13.9 | **34.4** | 25.3               | **55.2**                 |
| GSM8K | 40.1 | **49.6** | 61.6               | **73.2**                 |
| HumanEval | 31.1 | **35.4** | 42.1               | **61.6**                 |
| MBPP | 39.7 | **49.6** | 44.2               | **63.2**                 |
| MultiPL-E | 20.8 | **28.5** | 38.5               | **50.4**                 |
| LiveCodeBench 2305-2409 | 1.6 | **5.1** | 4.5                | **14.8**                 |
| LiveBench 0831 | 7.4 | **12.6** | 12.4               | **18.8**                 |
| IFeval strict-prompt | 14.6 | **27.9** | 29.0               | **42.5**                 |

Qwen2.5-1.5B-Instruct and Qwen2.5-0.5B-Instruct have seen large performance improvements over their previous versions, making them well-suited for edge-side applications in highly resource-constrained environments.

### Performances on Multilingualism

To evaluate the multilingual performance of instruction-tuned models, we collect and extend benchmarks as follows:
- **IFEval (multilingual)**: We translate the examples from IFEval (English version) to construct multilingual IFEval examples after removing examples with language-specific contents (e.g., "start with letter A"). We collect 100 examples for each language among Arabic (ar), Spanish (es), French (fr), Indonesian (in), Japanese (ja), Korean (ko), Portuguese (pt), and Vietnamese (vi) languages. All examples are checked and post-edited (if neccessary) by paid volunteers.
- **Knowledge**: We use 5 MMLU-like benchmarks (multi-choice) to testify the knowledge utilization ability of Qwen2.5 series models on multilingualism, including AMMLU (Arabic), JMMLU (Japanese), KMMLU (Korean), IndoMMLU (Indonesian), and TurkishMMLU (Turkish). Also, we present the performances on translated MMLU (i.e., okapi_MMLU, from English to multiple languages).
- **MGSM8K (extended)**: Aside from the examples in the original MGSM8K benchmark, we extend the language support with Arabic (ar), Korean (ko), Portuguese (pt), and Vietnamese (vi). We translate 250 examples (same as the other languages engaged in MGSM8K) into those 4 languages. All examples are also checked and post-edited (if necessary) by paid volunteers.
- **Cultural Nuances**: We also use BLEnD, a benchmark aiming at testifying cultural nuances of LLMs, to testify LLMs from the Qwen2.5 series.

| Datasets | Qwen2-72B-Instruct | Llama3.1-70B-Instruct | Qwen2.5-32B-Instruct | Mistral-Large-Instruct-2407 (123B) | GPT4o-mini | Qwen2.5-72B-Instruct |
| :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| ***Instruction Following*** |    |    |    |    |    |    |
| IFEval (multilingual) | 79.69 | 80.47 | 82.68 | 82.69 | 85.03 | **86.98** |
| ***Knowledge*** |    |    |    |    |    |    |
| AMMLU (Arabic) | 68.85 | 70.08 | 70.44 | 69.24 | 69.73 | **72.44** |
| JMMLU (Japanese) | 77.37 | 73.89 | 76.55 | 75.77 | 73.74 | **80.56** |
| KMMLU (Korean) | 57.04 | 53.23 | 60.75 | 56.42 | 56.77 | **61.96** |
| IndoMMLU (Indonesian) | 66.31 | 67.50 | 66.42 | 63.21 | 67.75 | **69.25** |
| TurkishMMLU (Turkish) | 69.22 | 66.89 | 72.41 | 64.78 | 71.19 | **76.12** |
| okapi MMLU (translated) | 77.84 | 76.49 | 77.16 | 78.37 | 73.44 | **79.97** |
| ***Math Reasoning*** |    |    |    |    |    |    |
| MGSM8K (extended) | 82.72 | 73.31 | 87.15 | **89.01** | 87.36 | 88.16 |
| ***Cultural Nuances*** |    |    |    |    |    |    |
| BLEnD | 25.90 | 30.49 | 27.88 | 33.47 | **35.91** | 32.48 |



| Datasets | Qwen2-7B-Instruct | Llama3.1-8B-Instruct | Qwen2.5-7B-Instruct | Gemma-2-9B-Instruct | Mistral-Nemo-Instruct-2407 (12B) | Qwen2.5-14B-Instruct |
| :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| ***Instruction Following*** |    |    |    |    |    |    |
| IFEval (multilingual) | 51.43 | 60.68 | 74.87 | **77.47** | 64.59 | 77.08 |
| ***Knowledge*** |    |    |    |    |    |    |
| AMMLU (Arabic) | 54.87 | 54.28 | 59.78 | 60.26 | 53.92 | **66.81** |
| JMMLU (Japanese) | 57.71 | 53.26 | 61.88 | 64.59 | 55.17 | **72.78** |
| KMMLU (Korean) | 43.96 | 42.28 | 46.59 | 46.24 | 42.22 | **59.71** |
| IndoMMLU (Indonesian) | 54.05 | 53.92 | 56.42 | 61.73 | 50.76 | **65.09** |
| TurkishMMLU (Turkish) | 49.27 | 45.61 | 54.28 | 55.44 | 34.44 | **66.85** |
| okapi MMLU (translated) | 60.47 | 55.18 | 66.98 | 46.72 | 59.65 | **72.12** |
| ***Math Reasoning*** |    |    |    |    |    |    |
| MGSM8K (extended) | 56.13 | 66.05 | 66.11 | 78.37 | 54.75 | **82.27** |
| ***Cultural Nuances*** |    |    |    |    |    |    |
| BLEnD | 22.49 | 19.47 | 23.66 | **28.31** | 26.61 | 26.99 |


# Demo Cases

Here we provide several cases to demonstrate the new or enhanced capabilities of Qwen2.5, including generating JSON output, generating long texts, and understanding structured data.

{{< fullwidth class="example-container" >}}
{{< example data="cases/1_1.json" hide=false next=true >}}
{{< example data="cases/1_2.json" hide=true next=true >}}
{{< example data="cases/1_3.json" hide=true next=true >}}
{{< /fullwidth >}}
