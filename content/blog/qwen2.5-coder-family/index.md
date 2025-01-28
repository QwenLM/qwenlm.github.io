---
title: "Qwen2.5-Coder Series: Powerful, Diverse, Practical."
date: 2024-11-12T00:00:02+08:00
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
<!-- {{< figure src="https://qianwen-res.oss-cn-beijing.aliyuncs.com/Qwen2.5/Qwen2.5-Coder/coder-main.png#center" width="70%">}} -->
{{< figure src="https://qianwen-res.oss-cn-beijing.aliyuncs.com/Qwen2.5/Qwen2.5-Coder-Family/32b-top.jpg#center" width="100%">}}
{{< button href="https://github.com/QwenLM/Qwen2.5-Coder" label="GITHUB" external=true >}}
{{< button href="https://huggingface.co/collections/Qwen/qwen25-coder-66eaa22e6f99801bf65b0c2f" label="HUGGING FACE" external=true >}}
{{< button href="https://modelscope.cn/organization/qwen" label="MODELSCOPE" external=true >}}
{{< button href="https://www.kaggle.com/models/qwen-lm/qwen2.5-coder" label="KAGGLE" external=true >}}
{{< button href="https://huggingface.co/spaces/Qwen/Qwen2.5-Coder-demo" label="DEMO" external=true >}}
{{< button href="https://discord.gg/yPEP2vHTu4" label="DISCORD" external=true >}}



## Introduction

Today, we are excited to open source the "Powerful", "Diverse", and "Practical" Qwen2.5-Coder series, dedicated to continuously promoting the development of Open CodeLLMs.

* **Powerful**: Qwen2.5-Coder-32B-Instruct has become the current SOTA open-source code model, matching the coding capabilities of GPT-4o. While demonstrating strong and comprehensive coding abilities, it also possesses good general and mathematical skills;
* **Diverse**: Building on the previously open-sourced two sizes of 1.5B / 7B, this release brings four model sizes, including 0.5B / 3B / 14B / 32B. As of now, Qwen2.5-Coder has covered six mainstream model sizes to meet the needs of different developers;
* **Practical**: We explore the practicality of Qwen2.5-Coder in two scenarios, including code assistants and Artifacts, with some examples showcasing the potential applications of Qwen2.5-Coder in real-world scenarios;

## Powerful: Code capabilities reach SOTA for open-source models

{{< figure src="https://qianwen-res.oss-cn-beijing.aliyuncs.com/Qwen2.5/Qwen2.5-Coder-Family/32b-main.png#center" width="100%">}}


* **Code Generation**: Qwen2.5-Coder-32B-Instruct, as the flagship model of this open-source release, has achieved the best performance among open-source models on multiple popular code generation benchmarks (EvalPlus, LiveCodeBench, BigCodeBench), and has competitive performance with GPT-4o.

* **Code Repair**: Code repair is an important programming skill. Qwen2.5-Coder-32B-Instruct can help users fix errors in their code, making programming more efficient. Aider is a popular benchmark for code repair, and Qwen2.5-Coder-32B-Instruct scored 73.7, performing comparably to GPT-4o on Aider. 

* **Code Reasoning**: Code reasoning refers to the model's ability to learn the process of code execution and accurately predict the model's inputs and outputs. The recently released Qwen2.5-Coder-7B-Instruct has already shown impressive performance in code reasoning, and this 32B model takes it a step further.
{{< figure src="https://qianwen-res.oss-cn-beijing.aliyuncs.com/Qwen2.5/Qwen2.5-Coder-Family/32b-crux.png#center" width="80%">}}


* **Multiple Programming Languages**: An intelligent programming assistant should be familiar with all programming languages. Qwen2.5-Coder-32B-Instruct performs excellently across more than 40 programming languages, scoring 65.9 on McEval, with impressive performances in languages like Haskell and Racket, thanks to our unique data cleaning and balancing during the pre-training phase.       
{{< figure src="https://qianwen-res.oss-cn-beijing.aliyuncs.com/Qwen2.5/Qwen2.5-Coder-Family/32b-mceval.jpg#center" width="80%">}}

Additionally, the multi-language code repair capabilities of Qwen2.5-Coder-32B-Instruct remain impressive, aiding users in understanding and modifying programming languages they are familiar with, significantly reducing the learning cost of unfamiliar languages. Similar to McEval, MdEval is a multi-language code repair benchmark, where Qwen2.5-Coder-32B-Instruct scored 75.2, ranking first among all open-source models.
{{< figure src="https://qianwen-res.oss-cn-beijing.aliyuncs.com/Qwen2.5/Qwen2.5-Coder-Family/32b-mdeval.jpg#center" width="80%">}}


* **Human Preference Alignment**: To evaluate the alignment performance of Qwen2.5-Coder-32B-Instruct with human preferences, we constructed an internal annotated code preference evaluation benchmark called Code Arena (similar to Arena Hard). We used GPT-4o as the evaluation model for preference alignment, employing an 'A vs. B win' evaluation method, which measures the percentage of instances in the test set where model A's score exceeds model B's. The results below demonstrate the advantages of Qwen2.5-Coder-32B-Instruct in preference alignment.

{{< figure src="https://qianwen-res.oss-cn-beijing.aliyuncs.com/Qwen2.5/Qwen2.5-Coder-Family/32b-arena.jpg#center" width="80%">}}


## Diverse: Rich Model Sizes

This time, Qwen2.5-Coder has open-sourced a rich variety of model sizes, including 0.5B/1.5B/3B/7B/14B/32B, which not only meets the needs of developers in different resource scenarios but also provides a good experimental platform for the research community. The following table provides detailed model information:

|  Models  | Params | Non-Emb Params | Layers | Heads (KV) | Tie Embedding | Context Length | License |
| :--------| :--------: | :--------: | :------: | :------------: | :-------: | :------------: | :-------: |
| Qwen2.5-Coder-0.5B |  0.49B |  0.36B | 24 | 14 / 2 | Yes |  32K | Apache 2.0 |
| Qwen2.5-Coder-1.5B | 1.54B |  1.31B | 28 | 12 / 2 | Yes |  32K | Apache 2.0 |
| Qwen2.5-Coder-3B  |  3.09B |  2.77B | 36 | 16 / 2 | Yes |  32K | Qwen Research |
| Qwen2.5-Coder-7B | 7.61B |  6.53B | 28 | 28 / 4 | No |  128K | Apache 2.0 |
| Qwen2.5-Coder-14B | 14.7B |  13.1B | 48 | 40 / 8 | No |  128K  | Apache 2.0 |
| Qwen2.5-Coder-32B  |  32.5B |  31.0B | 64 | 40 / 8 | No |  128K | Apache 2.0 |

We have always believed in the philosophy of Scaling Law. We evaluated the performance of different sizes of Qwen2.5-Coder across all datasets to verify the effectiveness of Scaling in Code LLMs. For each size, we open-sourced both Base and Instruct models, where the Instruct model serves as an official aligned model that can chat directly, and the Base model serves as a foundation for developers to fine-tune their own models.

Here are the performances of the Base models of different sizes:
{{< figure src="https://qianwen-res.oss-cn-beijing.aliyuncs.com/Qwen2.5/Qwen2.5-Coder-Family/qwen2.5-coder-family-base.png#center" width="100%">}}

Here are the performances of the Instruct models of different sizes:
{{< figure src="https://qianwen-res.oss-cn-beijing.aliyuncs.com/Qwen2.5/Qwen2.5-Coder-Family/qwen2.5-coder-family-instruct.png#center" width="100%">}}

We present a comparison of different sizes of Qwen2.5-Coder with other open-source models on core datasets.
* For the Base model, we chose MBPP-3shot as the evaluation metric. Our extensive experiments show that MBPP-3shot is more suitable for evaluating base models and correlates well with the actual performance of the models.
* For the Instruct model, we selected the latest 4 months of LiveCodeBench (2024.07 - 2024.11) questions as the evaluation, which are the latest published questions that could not have leaked into the training set, reflecting the model's OOD capabilities.

There is a positive correlation between model size and model performance, and Qwen2.5-Coder has achieved SOTA performance across all sizes, encouraging us to continue exploring larger sizes of Coder.

{{< figure src="https://qianwen-res.oss-cn-beijing.aliyuncs.com/Qwen2.5/Qwen2.5-Coder-Family/qwen2.5-coder-family-dual.jpg#center" width="100%">}}


## Practical: Encountering Cursor and Artifacts
A practical Coder has always been our vision, and for this reason, we explored the actual performance of Qwen2.5-Coder in code assistants and Artifacts scenarios.


### Qwen2.5-Coder 🤝 Cursor
Code assistants have become widely used, but most currently rely on closed-source models. We hope that the emergence of Qwen2.5-Coder can provide developers with a friendly and powerful option. Here is an example of Qwen2.5-Coder in the [Cursor](https://www.cursor.com/).


{{< fullwidth class="example-container" >}}
{{< example data="cases/c_1.json" hide=false next=false >}}
{{< /fullwidth >}}

Additionally, Qwen2.5-Coder-32B has demonstrated strong code completion capabilities on pre-trained models, achieving SOTA performance on a total of 5 benchmarks: Humaneval-Infilling, CrossCodeEval, CrossCodeLongEval, RepoEval, and SAFIM. To maintain a fair comparison, we controlled the maximum sequence length to 8k and used the Fill-in-the-Middle mode for testing. Among the four evaluation sets of CrossCodeEval, CrossCodeLongEval, RepoEval, and Humaneval-Infilling, we evaluated whether the generated content was exactly equal to the true labels (Exact Match). In SAFIM, we used the one-time execution success rate (Pass@1) for evaluation.

{{< figure src="https://qianwen-res.oss-cn-beijing.aliyuncs.com/Qwen2.5/Qwen2.5-Coder-Family/32b-fim.jpg#center" width="80%">}}

### Qwen2.5-Coder 🤝 Artifacts
Artifacts are an important application of code generation, helping users create visual works. We chose [Open WebUI](https://openwebui.com/) to explore the potential of Qwen2.5-Coder in the Artifacts scenario, and here are some specific examples.

{{< fullwidth class="example-container" >}}
{{< example data="cases/a_1.json" hide=false next=true >}}
{{< example data="cases/a_2.json" hide=true next=true >}}
{{< example data="cases/a_3.json" hide=true next=true >}}
{{< example data="cases/a_4.json" hide=true next=true >}}
{{< /fullwidth >}}

We will soon launch the code mode on the Tongyi official website [https://tongyi.aliyun.com](https://tongyi.aliyun.com), supporting one-click generation of websites, mini-games, and data charts, among other visual applications. We welcome everyone to experience it!

## Model License

Qwen2.5-Coder 0.5B / 1.5B / 7B / 14B / 32B are licensed under **Apache 2.0**, while 3B is under Qwen-Research license;

## What's Next for Qwen-Coder?

We believe that this release can truly help developers and explore more interesting application scenarios with the community. Additionally, we are delving into powerful reasoning models centered around code, and we believe we will meet everyone soon!

## Citation

```
@article{hui2024qwen2,
  title={Qwen2. 5-Coder Technical Report},
  author={Hui, Binyuan and Yang, Jian and Cui, Zeyu and Yang, Jiaxi and Liu, Dayiheng and Zhang, Lei and Liu, Tianyu and Zhang, Jiajun and Yu, Bowen and Dang, Kai and others},
  journal={arXiv preprint arXiv:2409.12186},
  year={2024}
}
@article{yang2024qwen2,
  title={Qwen2 technical report},
  author={Yang, An and Yang, Baosong and Hui, Binyuan and Zheng, Bo and Yu, Bowen and Zhou, Chang and Li, Chengpeng and Li, Chengyuan and Liu, Dayiheng and Huang, Fei and others},
  journal={arXiv preprint arXiv:2407.10671},
  year={2024}
}
```
