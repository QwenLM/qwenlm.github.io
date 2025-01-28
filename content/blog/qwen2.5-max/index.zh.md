---
title: "Qwen2.5-Max：探索大规模 MoE 模型的智能"
date: 2025-01-28T23:00:04+08:00
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


{{< figure src="https://qianwen-res.oss-cn-beijing.aliyuncs.com/Qwen2.5-max-banner.png" width="100%">}}

{{< button href="https://chat.qwenlm.ai" label="QWEN CHAT" external=true >}}
{{< button href="https://www.alibabacloud.com/help/en/model-studio/getting-started/first-api-call-to-qwen?spm=a2c63.p38356.help-menu-2400256.d_0_1_0.1f6574a72ddbKE" label="API" external=true >}}
{{< button href="https://huggingface.co/spaces/Qwen/Qwen2.5-Max-Demo" label="DEMO" external=true >}}
{{< button href="https://discord.gg/yPEP2vHTu4" label="DISCORD" external=true >}}


过去有一种观点认为，持续地增长数据规模和模型参数规模是一种通向 AGI 的可能的路径。然而，整个大模型社区对于训练超大规模的模型的经验都相对匮乏，不论是稠密模型还是 MoE 模型。近期，DeepSeek V3 的发布让大家了解到超大规模 MoE 模型的效果及实现方法，而同期，Qwen 也在研发超大规模的 MoE 模型 Qwen2.5-Max，使用超过 20 万亿 token 的预训练数据及精心设计的后训练方案进行训练。今天，我们很高兴能给大家分享 Qwen2.5-Max 目前所取得的成果。大家可以通过 [API](https://www.alibabacloud.com/help/en/model-studio/getting-started/first-api-call-to-qwen?spm=a2c63.p38356.help-menu-2400256.d_0_1_0.1f6574a72ddbKE  ) 的方式进行访问，也可以登录 [Qwen Chat](https://chat.qwenlm.ai) 进行体验！


## 性能



我们将 Qwen2.5-Max 与业界领先的模型（无论是闭源还是开源）在一系列广受关注的基准测试上进行了对比评估。这些基准测试包括测试大学水平知识的 MMLU-Pro、评估编程能力的 LiveCodeBench，全面评估综合能力的 LiveBench，以及近似人类偏好的 Arena-Hard。我们的评估结果涵盖了基座模型和指令模型的性能得分。

首先，我们直接对比了指令模型的性能表现。指令模型即我们平常使用的可以直接对话的模型。我们将 Qwen2.5-Max 与业界领先的模型（包括 DeepSeek V3、GPT-4o 和 Claude-3.5-Sonnet）的性能结果进行了对比。


{{< figure src="https://qianwen-res.oss-cn-beijing.aliyuncs.com/Qwen2.5-max-instruct.jpg" width="100%">}}


在 Arena-Hard、LiveBench、LiveCodeBench 和 GPQA-Diamond 等基准测试中，Qwen2.5-Max 的表现超越了 DeepSeek V3。同时在 MMLU-Pro 等其他评估中也展现出了极具竞争力的成绩。

在基座模型的对比中，由于无法访问 GPT-4o 和 Claude-3.5-Sonnet 等闭源模型的基座模型，我们将 Qwen2.5-Max 与目前领先的开源 MoE 模型 DeepSeek V3、最大的开源稠密模型 Llama-3.1-405B，以及同样位列开源稠密模型前列的 Qwen2.5-72B 进行了对比。对比结果如下图所示。

{{< figure src="https://qianwen-res.oss-cn-beijing.aliyuncs.com/Qwen2.5-Max.jpeg" width="100%">}}

我们的基座模型在大多数基准测试中都展现出了显著的优势。我们相信，随着后训练技术的不断进步，下一个版本的 Qwen2.5-Max 将会达到更高的水平。


## 使用 Qwen2.5-Max

现在您可以在 Qwen Chat 中使用 Qwen2.5-Max，直接与模型对话，或者使用 artifacts、搜索等功能。

<video width="100%" autoplay loop muted playsinline>
    <source src="https://qianwen-res.oss-cn-beijing.aliyuncs.com/qwen-max.mp4" type="video/mp4">
</video>

Qwen2.5-Max 的 API（模型名称为 `qwen-max-2025-01-25`）现已开放使用。您可以先[注册阿里云账号](https://account.alibabacloud.com/register/intl_register.htm)并开通阿里云大模型服务平台，然后在控制台创建 API 密钥。

由于 Qwen 的 API 与 OpenAI API 兼容，我们可以直接按照使用 OpenAI API 的常规方式进行调用。以下是使用 Python 调用 Qwen2.5-Max 的示例：

``` python
from openai import OpenAI
import os

client = OpenAI(
    api_key=os.getenv("API_KEY"),
    base_url="https://dashscope.aliyuncs.com/compatible-mode/v1",
)

completion = client.chat.completions.create(
    model="qwen-max-2025-01-25",
    messages=[
      {'role': 'system', 'content': 'You are a helpful assistant.'},
      {'role': 'user', 'content': 'Which number is larger, 9.11 or 9.8?'}
    ]
)

print(completion.choices[0].message)
```


## 未来展望

持续提升数据规模和模型参数规模能够有效提升模型的智能水平。接下来，我们将持续探索，除了在 pretraining 的 scaling 继续探索外，将大力投入强化学习的 scaling，希望能实现超越人类的智能，驱动 AI 探索未知之境。


# 引用

如果您觉得 Qwen2.5 对您有帮助，欢迎引用以下论文。

```
@article{qwen25,
  title={Qwen2.5 technical report},
  author={Qwen Team},
  journal={arXiv preprint arXiv:2412.15115},
  year={2024}
}
```