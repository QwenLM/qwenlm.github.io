---
title: "Qwen2.5-Math: The world's leading open-sourced mathematical LLMs"
date: 2024-09-19T00:00:01+08:00
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



{{< figure src="http://qianwen-res.oss-cn-beijing.aliyuncs.com/Qwen2.5/2024-08-qwen2.5-math-72B.png#center" width="100%">}}

{{< button href="https://github.com/QwenLM/Qwen2-Math" label="GITHUB" external=true >}}
{{< button href="https://huggingface.co/Qwen" label="HUGGING FACE" external=true >}}
{{< button href="https://modelscope.cn/organization/qwen" label="MODELSCOPE" external=true >}}
{{< button href="https://discord.gg/yPEP2vHTu4" label="DISCORD" external=true >}}

> <div align="center">
> <b>
> 🚨 Qwen2.5-Math mainly supports solving English and Chinese math problems through CoT and TIR. We do not recommend using this series of models for other tasks.
> </b>
> </div>

# Introduction

A month ago, we released the first series of mathematical LLMs - [Qwen2-Math](https://qwenlm.github.io/blog/qwen2-math/) - of our Qwen family. Today, we have upgraded it and open-sourced **Qwen2.5-Math** series, including base models **Qwen2.5-Math-1.5B/7B/72B**, instruction-tuned models **Qwen2.5-Math-1.5B/7B/72B-Instruct**, and mathematical reward model **Qwen2.5-Math-RM-72B**. 
                                                                              
Unlike Qwen2-Math series which only supports using Chain-of-Thought (CoT) to solve English math problems, Qwen2.5-Math series is expanded to support using both CoT and Tool-integrated Reasoning (TIR) to solve math problems in both Chinese and English. The Qwen2.5-Math series models have achieved significant performance improvements compared to the Qwen2-Math series models on the Chinese and English mathematics benchmarks with CoT. 


{{< figure src="http://qianwen-res.oss-cn-beijing.aliyuncs.com/Qwen2.5/2024-08-qwen2.5-math-allsize.png#center" width="100%">}}
 
While CoT plays a vital role in enhancing the reasoning capabilities of LLMs, it faces challenges in achieving computational accuracy and handling complex mathematical or algorithmic reasoning tasks, such as finding the roots of a quadratic equation or computing the eigenvalues of a matrix. TIR can further improve the model's proficiency in precise computation, symbolic manipulation, and algorithmic manipulation. Qwen2.5-Math-1.5B/7B/72B-Instruct achieve 79.7, 85.3, and 87.8 respectively on the MATH benchmark using TIR. 
 

{{< figure src="http://qianwen-res.oss-cn-beijing.aliyuncs.com/Qwen2.5/qwen2.5-math-pipeline.jpeg#center" width="100%">}}


## Qwen2.5-Math: Base Models
The overall specialization pipelines of Qwen2-Math and Qwen2.5-Math are shown in the figure above. After training of Qwen2-Math base models, we further upgrade them to Qwen2.5-Math models through three primary avenues: 
 
1) Utilizing Qwen2-Math-72B-Instruct models to synthesize additional high-quality mathematical pre-training data. 

2) Aggregating more high-quality mathematical data, particularly in Chinese, from web sources, books, and codes across multiple recall cycles. 

3) Leveraging the Qwen2.5 series base model for parameter initialization, which shows more powerful language understanding, code generation, and text reasoning capabilities. 

Ultimately, we construct *Qwen Math Corpus v2* for Qwen2.5-Math-1.5B/7B/72B pre-training, maintaining a context length of 4K. Compared to *Qwen Math Corpus v1* used for Qwen2-Math training, the total token count of *Qwen Math Corpus v2* has increased from 700B to over 1T.

We evaluate our Qwen2.5-Math base models on three widely used English math benchmarks GSM8K, Math, and MMLU-STEM. In addition, we also evaluate three Chinese math benchmarks CMATH, GaoKao Math Cloze, and GaoKao Math QA. All evaluations are tested with few-shot chain-of-thought prompting. 

{{< figure src="http://qianwen-res.oss-cn-beijing.aliyuncs.com/Qwen2.5/qwen2.5-math-table.png#center" width="100%">}}

Compared to Qwen2-Math-1.5B/7B/72B, Qwen2.5-Math-1.5B/7B/72B have achieved significant improvements on all benchmarks. For example, Qwen2.5-Math-1.5B/7B/72B obtains 5.4, 5.0, 6.3 scores improvement on MATH, and 3.4, 12.2, 19.8 scores improvement on Gaokao Math QA.

## Qwen2.5-Math-Instruct: Instruction-Tuned Models

Similar to Qwen2-Math-Instruct, we train a math-specific reward model Qwen2.5-Math-RM-72B based on Qwen2.5-Math-72B. This RM is used for constructing the SFT data through Rejection Sampling and also in the reinforcement learning with Group Relative Policy Optimization (GRPO) after SFT.

In the development of Qwen2.5-Math-Instruct, an additional iteration is conducted using the Qwen2-Math-Instruct models and Qwen2.5-Math-RM-72B to polish the quality of responses further during Rejection Sampling.

Compared with the post-training of Qwen2-Math, we further introduced TIR data and SFT data in Chinese and English for Qwen2.5 post-training.

We evaluate Qwen2.5-Math-Instruct on mathematical benchmarks in both English and Chinese. In addition to the widely-used benchmarks, such as GSM8K and Math, we also involve more exams that are more challenging to fully inspect the capabilities of Qwen2.5-Math-Instruct, such as OlympiadBench, CollegeMath, GaoKao, AIME2024, and AMC2023. For Chinese mathematical benchmarks, we use CMATH, Gaokao (Chinese College Entrance Examination 2024), and CN Middle School 24 (China High School Entrance Examination 2024).

We report greedy, Maj@8 and RM@8 performance on all benchmarks in the zero-shot setting, except for the multi-choice benchmarks (including MMLU STEM and multiple-choice problems in GaoKao and CN Middle School 24) with a 5-shot setting.

The Qwen2.5-Math-72B-Instruct model outperforms the Qwen2-Math-72B-Instruct model by an average margin of 4.4 and 6.1 points in English and Chinese, respectively, establishing itself as the best open-source mathematical model currently available.

The flagship model, Qwen2.5-Math-72B-Instruct, significantly outperforms both open-source models and leading closed-source models (e.g., GPT-4o, Gemini Math-Specialized 1.5 Pro). Under the TIR setting of RM@8, a high score of 92.9 was achieved on MATH.

With the aid of synthesized pre-training and supervised fine-tuning data from the 72B model, Qwen2.5-Math-7B-Instruct surpasses Qwen2-Math-Instruct 72B in performance. Under CoT and TIR settings, it achieves MATH scores of 83.6 and 85.3, respectively. 

Even our smallest 1.5B model, achieves a MATH score of around 80 when utilizing the Python Interpreter, outperforming the majority of current models in this domain.

{{< figure src="http://qianwen-res.oss-cn-beijing.aliyuncs.com/Qwen2.5/math_instruct_en.jpg#center" width="120%">}}

{{< figure src="http://qianwen-res.oss-cn-beijing.aliyuncs.com/Qwen2.5/math_instruct_zh.jpg#center" width="90%">}}

In more complex mathematical competition evaluations such as AIME 2024 and AMC 2023, Qwen2.5-Math-Instruct also performs well across various settings, including Greedy, Maj@64, RM@64, and RM@256.

With the support of the Qwen2.5-Math-RM-72B, Qwen2.5-Math-1.5B-Instruct, using the RM@256 in CoT mode, successfully solves 29 out of 40 problems on AMC 2023.

Moreover, Qwen2.5-Math-72B-Instruct nearly achieves a perfect score in TIR mode, solving almost all the problems.

On the extremely difficult AIME 2024 benchmark, Claude3 Opus, GPT-4 Turbo, and Gemini 1.5 Pro manage to solve only 1 or 2 questions out of 30.

In contrast, Qwen2.5-Math-72B-Instruct solves 9 problems in Greedy decoding CoT mode and 12 problems in TIR mode. With the help of the RM, Qwen2.5-Math-7B-Instruct could even solve up to 21 problems, further demonstrating the outstanding mathematical problem-solving ability of Qwen2.5-Math-Instruct.

{{< figure src="http://qianwen-res.oss-cn-beijing.aliyuncs.com/Qwen2.5/math_instruct_aime.jpg#center" width="80%">}}


## Decontamination

Decontamination is critical to ensuring unbiased model performance evaluation. 

Following prior work Qwen2, we exclude potentially contaminated training samples using 13-gram matching. To improve the accuracy of this matching process, we perform text normalization, removing irrelevant punctuation and symbols.

To further reduce false negatives, particularly for common mathematical expressions, we introduce an additional criterion: the ratio of the longest common subsequence must exceed $0.6$ for a sample to be considered contaminated. 

For pre-training data, we filter potentially contaminated samples against datasets such as GSM8K and MATH.
When dealing with post-training data, including SFT data, RM training data, and the RL query set, we exclude any potentially contaminated problems or solutions across all reported evaluation datasets. These evaluation datasets include GSM8K, MATH, Minerva Math, Gaokao 2023 En, Olympiad Bench, College Math, MMLU STEM, GaoKao, CMATH, CN Middle School 24, AIME 24, and AMC 23.
 
During the analysis of contaminated samples, we identify that some existing training datasets (e.g., the MATH training dataset) contain a significant proportion of problems that share highly similar concepts or structures with those found in test datasets. 
Although these variations are not exact duplicates, they could potentially compromise the integrity of our evaluation. 
Therefore, we continue to exclude such samples from the training corpora.

## Demo

We develop a demo that supports the TIR mode in [Qwen-Agent](https://github.com/QwenLM/Qwen-Agent), which allows running code locally to experience Tool-Integrated Reasoning capabilities of Qwen2.5-Math.
                                                                                            
{{< figure src="http://qianwen-res.oss-cn-beijing.aliyuncs.com/Qwen2.5/qwen2.5-math-example1.png#center" width="80%">}}
  
Furthermore, we provide a multi-modal mathematic demo in [Huggingface](https://huggingface.co/spaces/Qwen/Qwen2-Math-Demo) and [Modelscope](https://www.modelscope.cn/studios/qwen/Qwen-Math-demo). This WebUI is based on Qwen2-VL for OCR and Qwen2-Math for mathematical reasoning. You can input either images, texts, or sketches of mathematical and arithmetic problems.

                                                              
## Summary
We introduce Qwen2.5-Math, which features several key technical highlights: 
 
(1) Extensive using of synthesized mathematical data from Qwen2-Math during the pre-training phase.
  
(2) Iterative generation of fine-tuning data and reinforcement training guided by the reward model during the post-training phase.
 
(3) Supporting for bilingual (English and Chinese) queries, along with chain-of-thought and tool-integrated reasoning capabilities.

As a result, Qwen2.5-Math represents the most advanced open-source math model series to date.
The Qwen2.5-Math-1.5B-Instruct model already surpasses most previous 70B math models, while the Qwen2.5-Math-7B-Instruct matches the performance of Qwen2-Math-72B-Instruct. 
Our flagship model, Qwen2.5-Math-7B-Instruct, outperforms Qwen2-Math-72B-Instruct with an average score increase of 4.7 points across 7 tasks.

We hope that the advances we’ve made with specialized models like Qwen2.5-Math will continue to strengthen the overall capabilities of the Qwen model and bring us closer to achieving artificial general intelligence.
