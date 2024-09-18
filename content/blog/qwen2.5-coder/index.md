---
title: "Qwen2.5-Coder: Code More, Learn More!"
date: 2024-09-18T00:00:02+08:00
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

{{< figure src="https://qianwen-res.oss-cn-beijing.aliyuncs.com/Qwen2.5/Qwen2.5-Coder/coder-main.png#center" width="70%">}}

{{< button href="https://github.com/QwenLM/Qwen2.5-Coder" label="GITHUB" external=true >}}
{{< button href="https://huggingface.co/Qwen" label="HUGGING FACE" external=true >}}
{{< button href="https://modelscope.cn/organization/qwen" label="MODELSCOPE" external=true >}}
{{< button href="https://huggingface.co/spaces/Qwen/Qwen2.5-Coder-7B-Instruct" label="DEMO" external=true >}}
{{< button href="https://discord.gg/yPEP2vHTu4" label="DISCORD" external=true >}}

# Introduction

In early April, we introduced CodeQwen1.5, which garnered significant attention from the community. Since then, we have been working to enhance the coding model. Today, we are excited to announce the release of the next generation of open-source coding models, **Qwen2.5-Coder**, and officially rename CodeQwen to Qwen-Coder. We think "Coder" is more human-like and agile, reflecting our vision of it becoming a true coding partner in the future. Qwen2.5-Coder is part of the Qwen2.5 series, available in three model sizes: 1.5B, 7B, and a 32B version (coming soon).

This update focuses on two main improvements: scaling up the code training data and enhancing coding capabilities while maintaining strong performance in other core areas like math and general tasks.

💻 Code More: Qwen2.5-Coder builds on the strong Qwen2.5 and continues training on a larger scale of code data, including source code, text-code grounding data, and synthetic data, totaling 5.5 trillion tokens. This leads to significant improvements in code-related tasks.

📚 Learn More: While enhancing coding abilities, we aimed to retain strengths in math and general capabilities from base model. Therefore, Qwen2.5-Coder incorporates additional data on mathematics and general abilities, providing a comprehensive foundation for real-world applications like Code Agent.

# Qwen2.5-Coder: Base Models

Qwen2.5-Coder supports up to 128K tokens of context, covers 92 programming languages, and has achieved remarkable improvements across various code-related evaluation tasks, including code generation, multi-programming code generation, code completion, and code repair. Notably, the open-source 7B version of Qwen2.5-Coder has even outperformed larger models like DeepSeek-Coder-V2-Lite and Codestral, making it one of the most powerful base code models available. Beyond code tasks, Qwen2.5-Coder also demonstrates competitive math capabilities in evaluations such as GSM8K and Math. For general tasks, evaluations on MMLU and ARC show that Qwen2.5-Coder has retained the general ability performance of Qwen2.5.

{{< figure src="https://qianwen-res.oss-cn-beijing.aliyuncs.com/Qwen2.5/Qwen2.5-Coder/qwen2.5-coder-base.jpg#center" width="100%">}}

# Qwen2.5-Coder-Instruct: Instruction-Tuned Models

Building on Qwen2.5-Coder, we fine-tuned it with instruction data, creating Qwen2.5-Coder-Instruct. This instruction-tuned model not only further improves task performance but also demonstrates exceptional generalization across various benchmarks.

{{< figure src="https://qianwen-res.oss-cn-beijing.aliyuncs.com/Qwen2.5/Qwen2.5-Coder/qwen2.5-coder-instruct.jpg#center" width="100%">}}

Qwen2.5-Coder-Instruct excels in several key areas:

1. **Outstanding Multi-programming Expert**: We expanded the multi-language evaluations using McEval, covering more than 40 programming languages. The results show that Qwen2.5-Coder-Instruct performs remarkably well across many languages, including niche ones.

{{< figure src="https://qianwen-res.oss-cn-beijing.aliyuncs.com/Qwen2.5/Qwen2.5-Coder/mveval.jpg#center" width="70%">}}

2. **Code Reasoning**: We believe code reasoning is closely tied to general reasoning skills. We used CRUXEval as a benchmark, and the results show Qwen2.5-Coder-Instruct excels in code reasoning tasks. Interestingly, as code reasoning improves, the model's ability to follow complex instructions also gets better, encouraging us to further explore how code can enhance general skills.

{{< figure src="https://qianwen-res.oss-cn-beijing.aliyuncs.com/Qwen2.5/Qwen2.5-Coder/crux.jpg#center" width="70%">}}

3. **Math Reasoning**: Math and code are often discussed together: math is the foundation of code, and code is a key tool for math. Qwen2.5-Coder-Instruct shines in both code and math tasks, proven to be a "science student".
  
| **Model**                       | **Math**  | **GSM8K** | **GaoKao2023en** | **OlympiadBench** | **CollegeMath** | **AIME24** |
| ------------------------------- | --------- | --------- | ---------------- | ----------------- | --------------- | ---------- |
| DeepSeek-Coder-V2-Lite-Instruct | 61        | **87.6**  | 56.1             | 26.4              | 39.8            | 6.7        |
| Qwen2.5-Coder-7B-Instruct-v2    | **66.8**  | 86.7      | **60.5**         | **29.8**          | **43.5**        | **10**     |

4. **Basic capabilities**: We also assessed the general capabilities, and the results indicate that Qwen2.5-Coder-Instruct maintains the advantages of Qwen2.5 in terms of general abilities.

| **Model**                       | **AMC23** | **MMLU**  | **MMLU-Pro**     | **IFEval**        | **CEval**       | **GPQA**   |
| ------------------------------- | --------- | --------- | ---------------- | ----------------- | --------------- | ---------- |
| DeepSeek-Coder-V2-Lite-Instruct | 40.4      | 42.5      | 60.6             | 38.6              | 60.1            | 27.6       |
| Qwen2.5-Coder-7B-Instruct    | **42.5**  | **45.6**  | **68.7**         | **58.6**          | **61.4**        | **35.6**   |


# License

Qwen2.5-Coder is released under the Apache 2.0 license. We hope this increased openness will accelerate its application in code intelligence.

# What's Next for Qwen2.5-Coder?

We are preparing the 32B version of Qwen2.5-Coder, aiming to challenge proprietary models. Stay tuned—it's coming soon! Additionally, we're exploring powerful code-centric reasoning models to push the boundaries of code intelligence.

# Citation

```
@article{qwen2,
  title={Qwen2 Technical Report},
  year={2024}
}
```
