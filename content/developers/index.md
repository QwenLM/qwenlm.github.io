---
title: "Devalopers"
search_hidden: true
show_bread_crumbs: false
hide_meta: true
disable_share: true
header:
    background: "linear-gradient(-225deg, #7085B6 0%, #87A7D9 50%, #DEF3F8 100%);"
---

---
sidebar_position: 1
---

# Qwen LLM Intro

Welcome to the documentation for Qwen Large Language Models (LLMs). Dive into the capabilities and applications of our state-of-the-art language models.

## Qwen Overview

Explore Qwen's language models, including base models and chat models, by following the links in the table below.

|       | Qwen-Chat                                                             | Qwen-Chat (Int4)                                                                  | Qwen-Chat (Int8)                                                                | Qwen                                                                |
|-------|:----------------------------------------------------------------------:|:---------------------------------------------------------------------------------:|:-------------------------------------------------------------------------------:|:--------------------------------------------------------------------:|
| 1.8B  | [🤖](https://modelscope.cn/models/qwen/Qwen-1_8B-Chat/summary) [🤗](https://huggingface.co/Qwen/Qwen-1_8B-Chat) | [🤖](https://modelscope.cn/models/qwen/Qwen-1_8B-Chat-Int4/summary) [🤗](https://huggingface.co/Qwen/Qwen-1_8B-Chat-Int4) | [🤖](https://modelscope.cn/models/qwen/Qwen-1_8B-Chat-Int8/summary) [🤗](https://huggingface.co/Qwen/Qwen-1_8B-Chat-Int8) | [🤖](https://modelscope.cn/models/qwen/Qwen-1_8B/summary) [🤗](https://huggingface.co/Qwen/Qwen-1_8B) |
| 7B    | [🤖](https://modelscope.cn/models/qwen/Qwen-7B-Chat/summary) [🤗](https://huggingface.co/Qwen/Qwen-7B-Chat)   | [🤖](https://modelscope.cn/models/qwen/Qwen-7B-Chat-Int4/summary) [🤗](https://huggingface.co/Qwen/Qwen-7B-Chat-Int4)   | [🤖](https://modelscope.cn/models/qwen/Qwen-7B-Chat-Int8/summary) [🤗](https://huggingface.co/Qwen/Qwen-7B-Chat-Int8)   | [🤖](https://modelscope.cn/models/qwen/Qwen-7B/summary) [🤗](https://huggingface.co/Qwen/Qwen-7B)   |
| 14B   | [🤖](https://modelscope.cn/models/qwen/Qwen-14B-Chat/summary) [🤗](https://huggingface.co/Qwen/Qwen-14B-Chat) | [🤖](https://modelscope.cn/models/qwen/Qwen-14B-Chat-Int4/summary) [🤗](https://huggingface.co/Qwen/Qwen-14B-Chat-Int4) | [🤖](https://modelscope.cn/models/qwen/Qwen-14B-Chat-Int8/summary) [🤗](https://huggingface.co/Qwen/Qwen-14B-Chat-Int8) | [🤖](https://modelscope.cn/models/qwen/Qwen-14B/summary) [🤗](https://huggingface.co/Qwen/Qwen-14B) |
| 72B   | [🤖](https://modelscope.cn/models/qwen/Qwen-72B-Chat/summary) [🤗](https://huggingface.co/Qwen/Qwen-72B-Chat) | [🤖](https://modelscope.cn/models/qwen/Qwen-72B-Chat-Int4/summary) [🤗](https://huggingface.co/Qwen/Qwen-72B-Chat-Int4) | [🤖](https://modelscope.cn/models/qwen/Qwen-72B-Chat-Int8/summary) [🤗](https://huggingface.co/Qwen/Qwen-72B-Chat-Int8) | [🤖](https://modelscope.cn/models/qwen/Qwen-72B/summary) [🤗](https://huggingface.co/Qwen/Qwen-72B) |

The opensource versions of Qwen are now available, including the base language models (**Qwen-1.8B**, **Qwen-7B**, **Qwen-14B**, and **Qwen-72B**), as well as chat models (**Qwen-1.8B-Chat**, **Qwen-7B-Chat**, **Qwen-14B-Chat**, and **Qwen-72B-Chat**).

## Additional Resources

Discover more about Qwen:

- 🤗 [Hugging Face](https://huggingface.co/Qwen)
- 🤖 [ModelScope](https://modelscope.cn/organization/qwen)
- 📑 [Paper](https://arxiv.org/abs/2309.16609)
- 🖥️ [Demo](https://modelscope.cn/studios/qwen/Qwen-72B-Chat-Demo/summary)
- [WeChat (微信)](assets/wechat.png)
- [Discord](https://discord.gg/zmemtgyAxT)
- [API](https://dashscope.aliyun.com)

## Get Started

Follow these steps to get started with Qwen LLM:

- Quickstart with Qwen for simple inference.
- Details on quantization models, including GPTQ and KV cache quantization.
- Inference performance statistics, including speed and memory.
- Tutorials on finetuning with various methods like full-parameter tuning, LoRA, and Q-LoRA.
- Instructions on deploying vLLM and FastChat.
- Building web and CLI demos.
- Introduction to DashScope API service and instructions for setting up your model API in OpenAI style.
- Information on Qwen for tool use, agents, and code interpreters.
- Long-context understanding evaluation statistics.
<!-- - [FAQ](FAQ.md) for troubleshooting help. -->
- Contribution guidelines for those interested in helping improve Qwen.

## Stay Updated

Keep up with the latest news and updates:

- 2023.11.30 🔥 Release of **Qwen-72B** and **Qwen-72B-Chat**, now trained on 3T tokens and supporting 32k context length.
- 2023.10.17 Release of the Int8 quantized models **Qwen-7B-Chat-Int8** and **Qwen-14B-Chat-Int8**.
- 2023.9.25 🔥 Release of **Qwen-14B** and **Qwen-14B-Chat** with updated codes and checkpoints for **Qwen-7B** and **Qwen-7B-Chat**.

## Performance

Qwen models outperform similar-sized baseline models on benchmark datasets related to NLU, problem-solving, coding, and more. Check out our technical report for detailed experimental results and model performance insights.

## Requirements

To work with Qwen, ensure you meet these requirements:

- Python 3.8 or higher
- PyTorch 1.12 or higher (2.0+ recommended)
- Transformers 4.32 or higher
- CUDA 11.4 or higher (recommended for GPU users, flash-attention users, etc.)

## Quickstart

Here are simple examples to demonstrate the use of Qwen-Chat with ModelScope and Transformers.

For ModelScope:

```python
from modelscope import AutoModelForCausalLM, AutoTokenizer
from modelscope import GenerationConfig

tokenizer = AutoTokenizer.from_pretrained("qwen/Qwen-7B-Chat", trust_remote_code=True)
model = AutoModelForCausalLM.from_pretrained(
    "qwen/Qwen-7B-Chat",
    device_map="auto",
    trust_remote_code=True,
    fp16=True
).eval()

response, history = model.chat(tokenizer, "你好", history=None)
print(response)
```

For Transformers:

```python
from transformers import AutoModelForCausalLM, AutoTokenizer
from transformers.generation import GenerationConfig

tokenizer = AutoTokenizer.from_pretrained("Qwen/Qwen-7B-Chat", trust_remote_code=True)
model = AutoModelForCausalLM.from_pretrained(
    "Qwen/Qwen-7B-Chat",
    device_map="auto",
    trust_remote_code=True
).eval()

response, history = model.chat(tokenizer, "你好", history=None)
print(response)
```
To learn more about setting up a development environment, running models, deploying APIs, and more, follow the links in the sidebar.

Contact
If you have questions or feedback, join us on Discord or WeChat, or reach out via email at qianwen_opensource@alibabacloud.com.