---
title: "将上下文长度扩展至百万 Tokens ！"
date: 2024-11-15T00:00:03+08:00
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


{{< button href="https://help.aliyun.com/zh/model-studio/getting-started/first-api-call-to-qwen" label="API文档" external=true >}}
{{< button href="https://huggingface.co/spaces/Qwen/Qwen2.5-Turbo-1M-Demo" label="HuggingFace Demo" external=true >}}
{{< button href="https://www.modelscope.cn/studios/Qwen/Qwen2.5-Turbo-1M-Demo" label="ModelScope Demo" external=true >}}

# 简介

在 Qwen2.5 发布之后，我们听到社区对处理更长序列的需求。在这段时间，我们针对长序列处理能力以及长序列下的推理效率进行了很多优化。今天，我们隆重推出新的 Qwen2.5-Turbo 版本，其特点在于：

1) **更长的上下文支持**: 我们首次将模型的上下文长度从 128k 扩展到 **1M**，该长度约为 **100 万个英文单词或 150 万个汉字**，相当于 10 本长篇小说，150 小时的演讲稿，3 万行代码。该模型能在 1M 长度的大海捞针 (Passkey Retrieval) 任务中实现 **100%** 的准确率，在长文本评测集 RULER 上获得 **93.1** 分，超越 GPT-4 的 91.6 分，GLM4-9B-1M 的 89.9 分。此外，在短序列能力上，该模型仍然保持了非常强的竞争力，与 GPT-4o-mini 持平。
2) **更快的推理速度**: 利用稀疏注意力机制，我们成功将处理 1M tokens 上下文时的首字返回时间从 4.9 分钟降低到68秒，**实现 4.3 倍加速比**。
3) **更低的价格**：价格仍为 0.3元 / 1M tokens。在相同成本下，Qwen2.5-Turbo 相比 GPT-4o-mini 能够处理 **3.6 倍的 Token**。

{{< figure src="https://qianwen-res.oss-cn-beijing.aliyuncs.com/Qwen2.5-Turbo/cover_cn.png#center" width="100%" >}}

现在，你可以通过[阿里云大模型服务平台](https://help.aliyun.com/zh/model-studio/developer-reference/what-is-qwen-llm)的 API 服务，或者通过 [HuggingFace Demo](https://huggingface.co/spaces/Qwen/Qwen2.5-Turbo-1M-Demo) 或者 [ModelScope Demo](https://www.modelscope.cn/studios/Qwen/Qwen2.5-Turbo-1M-Demo) 进行体验。

# 实例演示

我们准备了一些实例演示，来体现 Qwen2.5-Turbo 能带来的新用法，涵盖了长篇小说的深入理解，仓库级别代码助手，多篇论文阅读等能力。

{{< fullwidth class="example-container" >}}
{{< example data="cases/1_1_en.json" hide=false next=true >}}
{{< example data="cases/1_1_zh.json" hide=true next=true >}}
{{< example data="cases/1_2.json" hide=true next=true >}}
{{< example data="cases/1_3.json" hide=true next=true >}}
{{< /fullwidth >}}

# 如何使用 API

最新的支持 1M tokens 的 Qwen2.5-Turbo 的使用方法和 Qwen API 的标准用法一致，并且与 OpenAI API 兼容。下面是一个简单的 Python 调用示例 (注意：你需要将环境变量 `YOUR_API_KEY` 设置为您的 API Key，欲了解更多细节请访问[阿里云大模型服务快速入门](https://help.aliyun.com/zh/model-studio/getting-started/first-api-call-to-qwen))：

```python
import os

from openai import OpenAI

# 读取长文本文件
with open("example.txt", "r", encoding="utf-8") as f:
    text = f.read()
user_input = text + "\n\nSummarize the above text."

client = OpenAI(
    api_key=os.getenv("YOUR_API_KEY"),
    base_url="https://dashscope.aliyuncs.com/compatible-mode/v1",
)

completion = client.chat.completions.create(
    model="qwen-turbo-latest",
    messages=[
      {'role': 'system', 'content': 'You are a helpful assistant.'},
      {'role': 'user', 'content': user_input},
    ],
)

print(completion.choices[0].message)
```

# 模型表现

在这一部分，我们通过各类基准测试来评估 Qwen2.5-Turbo 的性能表现以及推理速度上的进步。

## 大海捞针

我们首先在 1M 大海捞针 (Passkey Retrieval) 任务上进行了实验。结果显示，Qwen2.5-Turbo 能在1M长度的无关文本中完美捕捉所有隐藏的数字，证明模型在超长上下文中捕捉细节信息的能力。

{{< figure src="https://qianwen-res.oss-cn-beijing.aliyuncs.com/Qwen2.5-Turbo/passkey_retrieval.png#center" width="100%" >}}

## 更复杂的长文本任务

我们选取了若干长文本任务数据集对模型进行了测试，包括：

* [RULER](https://github.com/hsiehjackson/RULER)：在大海捞针基础上的扩展基准，任务包括在无关上下文中查找多“针”或回答多个问题，或找到上下文中出现最多或最少的词。数据的上下文长度最长为 128K。
* [LV-Eval](https://github.com/infinigence/LVEval)：要求同时理解众多证据片段的基准测试。我们对 LV-Eval 原始版本中的评估指标进行了调整，避免因为过于严苛的匹配规则所导致的假阴性结果。数据的上下文长度最长为 256K。
* [LongbenchChat](https://github.com/THUDM/LongAlign)：一个评价长文本任务中人类偏好对齐的数据集。数据的上下文长度最长为 100K。

{{< figure src="https://qianwen-res.oss-cn-beijing.aliyuncs.com/Qwen2.5-Turbo/long_result.png#center" width="100%" >}}


从结果中可以看出，Qwen2.5-Turbo 在各类长文本任务中均有优势：

* 在 RULER 基准测试中，Qwen2.5-Turbo 取得了 93.1 分，不仅超越了 GPT-4o-mini，甚至超越了 GPT-4，证明了其处理长文本任务的卓越能力。
* 在 LV-Eval、LongBench-Chat 等更加接近真实情况的长文本任务中，Qwen2.5-Turbo 在多数维度超越了 GPT-4o-mini，并且能够进一步扩展到超过 128K tokens 的上下文的问题上。

## 短文本任务

除了长序列任务的性能提升外，我们也同样关心模型在短文本任务上的性能。现有的上下文长度扩展方案经常会导致模型在处理短文本时出现比较大的性能下降，因此我们在构建 Qwen2.5-Turbo 的过程中特别关注了该问题，保证了在扩展上下文长度的同时，几乎不会影响短文本任务的能力。

{{< figure src="https://qianwen-res.oss-cn-beijing.aliyuncs.com/Qwen2.5-Turbo/short_result.png#center" width="100%" >}}

在传统短文本基准上的结果显示，Qwen2.5-Turbo 在大部分任务上显著超越之前上下文长度为 1M tokens 的开源模型；和 GPT-4o-mini 以及 Qwen2.5-14B-Instruct 模型相比，Qwen2.5-Turbo 在短文本任务性能接近的同时，却能支持其 8 倍长度的上下文。

## 推理速度

我们对不同长度的输入在多种模型架构下的首包延时时间进行了测试。在 1M tokens 的序列上，我们利用稀疏注意力机制将注意力部分的计算量压缩了约 12.5 倍，在不同硬件配置下实现了 3.2 至 4.3 倍的加速比。

{{< figure src="https://qianwen-res.oss-cn-beijing.aliyuncs.com/Qwen2.5-Turbo/inference_speed.png#center" width="70%" >}}




# 下一步目标

虽然我们很高兴终于能够将 Qwen2.5-Turbo 的上下文扩展到 1M tokens，但我们也清楚地认识到，当前模型在解决实际长序列任务上并不总是令人满意。这里存在很多未解决的挑战，例如长序列任务中模型的表现更加不稳定，推理的成本使得使用更大规模的模型变得困难等。不过，我们将积极进一步探索长序列人类偏好对齐，优化推理效率以减少运算时间，尝试推出更大、更强的长序列模型。我们期望能够很快向大家分享在长序列模型上的新进展，敬请关注！
