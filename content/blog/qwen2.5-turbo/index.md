---
title: "Extending the Context Length to 1M Tokens!"
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

{{< button href="https://help.aliyun.com/zh/model-studio/getting-started/first-api-call-to-qwen" label="API Documentation (Chinese)" external=true >}}
{{< button href="https://huggingface.co/spaces/Qwen/Qwen2.5-Turbo-1M-Demo" label="HuggingFace Demo" external=true >}}
{{< button href="https://www.modelscope.cn/studios/Qwen/Qwen2.5-Turbo-1M-Demo" label="ModelScope Demo" external=true >}}


# Introduction

After the release of Qwen2.5, we heard the community's demand for processing longer contexts. In recent months, we have made many optimizations for the model capabilities and inference performance of extremely long context. Today, we are proud to introduce the new Qwen2.5-Turbo version, which features:

1) **Longer Context Support**: We have extended the model's context length from 128k to **1M**, which is approximately **1 million English words or 1.5 million Chinese characters**, equivalent to 10 full-length novels, 150 hours of speech transcripts, or 30,000 lines of code. The model achieves **100%** accuracy in the 1M length Passkey Retrieval task and scores **93.1** on the long text evaluation benchmark RULER, surpassing GPT-4's 91.6 and GLM4-9B-1M's 89.9. Additionally, the model maintains very strong competitiveness in short sequence capabilities, on par with GPT-4o-mini.
2) **Faster Inference Speed**: Using sparse attention mechanisms, we successfully reduced the time to first token for processing a context of 1M tokens from 4.9 minutes to 68 seconds, **achieving a 4.3x speedup**.
3) **Lower Cost**: The price remains ¥0.3 / 1M tokens. At the same cost, Qwen2.5-Turbo can process **3.6 times the number of tokens** as GPT-4o-mini.

{{< figure src="https://qianwen-res.oss-cn-beijing.aliyuncs.com/Qwen2.5-Turbo/cover_en.png#center" width="100%" >}}

Now, you can use it through the API service of [Alibaba Cloud Model Studio \[Chinese\]](https://help.aliyun.com/zh/model-studio/getting-started/what-is-model-studio), or through [HuggingFace Demo](https://huggingface.co/spaces/Qwen/Qwen2.5-Turbo-1M-Demo) or [ModelScope Demo](https://www.modelscope.cn/studios/Qwen/Qwen2.5-Turbo-1M-Demo).

# Demo

We have prepared some demos to showcase the new uses that Qwen2.5-Turbo can bring, covering deep understanding of long novels, repository-level code assistant, and reading multiple papers.

{{< fullwidth class="example-container" >}}
{{< example data="cases/1_1_en.json" hide=false next=true >}}
<!-- {{< example data="cases/1_1_zh.json" hide=true next=true >}} -->
{{< example data="cases/1_2.json" hide=true next=true >}}
{{< example data="cases/1_3.json" hide=true next=true >}}
{{< /fullwidth >}}

# How to Use the API

The latest Qwen2.5-Turbo supporting 1M tokens is used in the same way as the standard Qwen API and is compatible with the OpenAI API. Below is a simple Python call example (Note: You need to set the environment variable `YOUR_API_KEY` to your API Key. For more details, please visit [Quick Start of Alibaba Cloud Model Studio \[Chinese\]](https://help.aliyun.com/zh/model-studio/getting-started/first-api-call-to-qwen)):

```python
import os

from openai import OpenAI

# Input a long text file
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

# Model Performance

In this section, we evaluate the performance of Qwen2.5-Turbo through various benchmark tests and improvements in inference speed.

## Passkey Retrieval

We first conducted experiments on the 1M-token Passkey Retrieval task. The results show that Qwen2.5-Turbo can perfectly capture all hidden numbers in the 1M tokens of irrelevant text, demonstrating the model's ability to capture detailed information in ultra-long contexts.

{{< figure src="https://qianwen-res.oss-cn-beijing.aliyuncs.com/Qwen2.5-Turbo/passkey_retrieval.png#center" width="100%" >}}

## More Complex Long Text Tasks

We select several datasets of long text understanding to test the model, including:

* [RULER](https://github.com/hsiehjackson/RULER): An extended benchmark based on Needle in a Haystack, tasks include finding multiple "needles" in irrelevant contexts, answering multiple questions, or finding the most or least frequent words in the context. The maximum context length is 128K. 
* [LV-Eval](https://github.com/infinigence/LVEval): A benchmark test requiring simultaneous understanding of numerous evidence fragments. We adjust the evaluation metrics in the original version of LV-Eval to avoid false negatives caused by overly strict matching rules. The maximum context length is 256K. 
* [LongbenchChat](https://github.com/THUDM/LongAlign): A dataset evaluating human preference alignment in the tasks of long context. The maximum context length is 100K.

{{< figure src="https://qianwen-res.oss-cn-beijing.aliyuncs.com/Qwen2.5-Turbo/long_result.png#center" width="100%" >}}

The results show that Qwen2.5-Turbo has advantages in various tasks of long context:

* In the RULER benchmark test, Qwen2.5-Turbo scores 93.1, surpassing GPT-4o-mini and even GPT-4, proving its excellent ability to handle long text tasks.
* In more tasks of long context understanding like LV-Eval and LongBench-Chat, Qwen2.5-Turbo surpasses GPT-4o-mini in most dimensions and can process tasks with a context of over 128K tokens.

## Short Text Tasks

In addition to performance improvements in tasks of long context, we are also concerned about the model's performance in tasks of short context. The existing context length extension methods often lead to significant performance degradation when processing short texts. Therefore, we have paid special attention to this issue when building Qwen2.5-Turbo, ensuring that the extension of context length almost does not affect the ability of short text understanding.

{{< figure src="https://qianwen-res.oss-cn-beijing.aliyuncs.com/Qwen2.5-Turbo/short_result.png#center" width="100%" >}}

Results on short text benchmarks show that Qwen2.5-Turbo significantly surpasses previous open-source models with a context length of 1M tokens in most tasks; compared to GPT-4o-mini and Qwen2.5-14B-Instruct models, Qwen2.5-Turbo achieves similar performance in short text tasks while supporting 8 times the context length.

## Inference Speed

We tested the TTFT (time to first token) for inputs of different lengths. On the sequences of 1M tokens, we used sparse attention to compress the computation of the attention by about 12.5 times, achieving a speedup of 3.2 to 4.3 times under different hardware configurations.

{{< figure src="https://qianwen-res.oss-cn-beijing.aliyuncs.com/Qwen2.5-Turbo/inference_speed.png#center" width="70%" >}}

# What's Next?

While we are pleased to finally extend the context of Qwen2.5-Turbo to 1M tokens, we also recognize that the current model does not always perform satisfactorily when solving long sequence tasks in real applications. There are many unresolved challenges, such as the model's performance being more unstable in long sequence tasks, and the cost of inference making it difficult to use larger models. However, we will actively explore further alignment of human preferences in long sequences, optimize inference efficiency to reduce computation time, and attempt to launch larger and stronger long-context models. We look forward to sharing new progress in developing long-context models with you soon, so stay tuned!
