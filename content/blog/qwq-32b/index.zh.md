---
title: "QwQ-32B: 领略强化学习之力"
date: 2025-03-06T00:00:04+08:00
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

{{< video src="https://qianwen-res.oss-accelerate-overseas.aliyuncs.com/QwQ.mp4" width="100%" alt="This is a demo created by QwQ-32B." autoplay=true loop=true controls=false muted=true playsinline=true >}}


{{< button href="https://chat.qwen.ai" label="QWEN CHAT" external=true >}}
{{< button href="https://huggingface.co/Qwen/QwQ-32B" label="Hugging Face" external=true >}}
{{< button href="https://modelscope.cn/models/Qwen/QwQ-32B" label="ModelScope" external=true >}}
{{< button href="https://huggingface.co/spaces/Qwen/QwQ-32B-Demo" label="DEMO" external=true >}}
{{< button href="https://discord.gg/yPEP2vHTu4" label="DISCORD" external=true >}}


大规模强化学习（RL）有潜力超越传统的预训练和后训练方法来提升模型性能。近期的研究表明，强化学习可以显著提高模型的推理能力。例如，DeepSeek R1 通过整合冷启动数据和多阶段训练，实现了最先进的性能，使其能够进行深度思考和复杂推理。这一次，我们探讨了大规模强化学习（RL）对大语言模型的智能的提升作用，同时很高兴推出我们最新的推理模型 QwQ-32B。这是一款拥有 320 亿参数的模型，其性能可与具备 6710 亿参数（其中 370 亿被激活）的 DeepSeek-R1 媲美。这一成果突显了将强化学习应用于经过大规模预训练的强大基础模型的有效性。此外，我们还在推理模型中集成了与 Agent 相关的能力，使其能够在使用工具的同时进行批判性思考，并根据环境反馈调整推理过程。我们希望我们的一点努力能够证明强大的基础模型叠加大规模强化学习也许是一条通往通用人工智能的可行之路。

QwQ-32B 已在 [Hugging Face](https://huggingface.co/Qwen/QwQ-32B) 和 [ModelScope](https://modelscope.cn/models/Qwen/QwQ-32B) 开源，采用了 Apache 2.0 开源协议。大家可通过 [Qwen Chat](https://chat.qwen.ai/?models=Qwen2.5-Plus) 直接进行体验！


## 模型效果

QwQ-32B 在一系列基准测试中进行了评估，测试了数学推理、编程能力和通用能力。以下结果展示了 QwQ-32B 与其他领先模型的性能对比，包括 DeepSeek-R1-Distilled-Qwen-32B、DeepSeek-R1-Distilled-Llama-70B、o1-mini 以及原始的 DeepSeek-R1。


{{< figure src="https://qianwen-res.oss-accelerate-overseas.aliyuncs.com/qwq-32b-final.jpg" width="100%">}}


## 强化学习

我们在冷启动的基础上开展了大规模强化学习。在初始阶段，我们特别针对数学和编程任务进行了 RL 训练。与依赖传统的奖励模型（reward model）不同，我们通过校验生成答案的正确性来为数学问题提供反馈，并通过代码执行服务器评估生成的代码是否成功通过测试用例来提供代码的反馈。随着训练轮次的推进，这两个领域中的性能均表现出持续的提升。在第一阶段的 RL 过后，我们增加了另一个针对通用能力的 RL。此阶段使用通用奖励模型和一些基于规则的验证器进行训练。我们发现，通过少量步骤的通用 RL，可以提升其他通用能力，同时在数学和编程任务上的性能没有显著下降。


## API

以下我们展示了一段简短的示例代码，说明如何通过 API 使用 QwQ-32B。

```python
from openai import OpenAI
import os

# Initialize OpenAI client
client = OpenAI(
    # If the environment variable is not configured, replace with your API Key: api_key="sk-xxx"
    # How to get an API Key：https://help.aliyun.com/zh/model-studio/developer-reference/get-api-key
    api_key=os.getenv("DASHSCOPE_API_KEY"),
    base_url="https://dashscope.aliyuncs.com/compatible-mode/v1"
)

reasoning_content = ""
content = ""

is_answering = False

completion = client.chat.completions.create(
    model="qwq-32b",
    messages=[
        {"role": "user", "content": "Which is larger, 9.9 or 9.11?"}
    ],
    stream=True,
    # Uncomment the following line to return token usage in the last chunk
    # stream_options={
    #     "include_usage": True
    # }
)

print("\n" + "=" * 20 + "reasoning content" + "=" * 20 + "\n")

for chunk in completion:
    # If chunk.choices is empty, print usage
    if not chunk.choices:
        print("\nUsage:")
        print(chunk.usage)
    else:
        delta = chunk.choices[0].delta
        # Print reasoning content
        if hasattr(delta, 'reasoning_content') and delta.reasoning_content is not None:
            print(delta.reasoning_content, end='', flush=True)
            reasoning_content += delta.reasoning_content
        else:
            if delta.content != "" and is_answering is False:
                print("\n" + "=" * 20 + "content" + "=" * 20 + "\n")
                is_answering = True
            # Print content
            print(delta.content, end='', flush=True)
            content += delta.content
```


## 未来工作

这是Qwen在大规模强化学习（RL）以增强推理能力方面的第一步。通过这一旅程，我们不仅见证了扩展RL的巨大潜力，还认识到预训练语言模型中尚未开发的可能性。在致力于开发下一代Qwen的过程中，我们相信将更强大的基础模型与依托规模化计算资源的RL相结合，将会使我们更接近实现人工通用智能（AGI）。此外，我们正在积极探索将智能体与RL集成，以实现长时推理，目标是通过推理时间扩展来释放更高的智能。
