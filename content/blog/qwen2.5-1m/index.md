---
title: "Qwen2.5-1M: Deploy Your Own Qwen with Context Length up to 1M Tokens"
date: 2025-01-23T00:00:03+08:00
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

{{< button href="https://qianwen-res.oss-cn-beijing.aliyuncs.com/Qwen2.5-1M/Qwen2_5_1M_Technical_Report.pdf" label="Tech Report" external=true >}}
{{< button href="https://huggingface.co/Qwen" label="HuggingFace" external=true >}}
{{< button href="https://modelscope.cn/organization/qwen" label="ModelScope" external=true >}}
{{< button href="https://chat.qwenlm.ai/" label="Qwen Chat" external=true >}}
{{< button href="https://huggingface.co/spaces/Qwen/Qwen2.5-1M-Demo" label="HuggingFace Demo" external=true >}}
{{< button href="https://www.modelscope.cn/studios/Qwen/Qwen2.5-1M-Demo" label="ModelScope Demo" external=true >}}
{{< button href="https://discord.gg/yPEP2vHTu4" label="DISCORD" external=true >}}

# Introduction

Two months after upgrading [Qwen2.5-Turbo](../qwen2.5-turbo) to support context length up to one million tokens, we are back with the open-source Qwen2.5-1M models and the corresponding inference framework support. Here's what you can expect from this release:

1) **Opensource Models:** We're releasing two new checkpoints, **Qwen2.5-7B-Instruct-1M** and **Qwen2.5-14B-Instruct-1M**, marking the first time we've upgraded our opensource Qwen models to handle 1M-token contexts.

2) **Inference Framework:** To help developers deploy the Qwen2.5-1M series models more efficiently, we've fully open-sourced our inference framework based on [vLLM](https://github.com/vllm-project/vllm). With integration with sparse attention methods, our framework can process 1M-token inputs **3x to 7x** faster.

3) **[Technical Report](https://qianwen-res.oss-cn-beijing.aliyuncs.com/Qwen2.5-1M/Qwen2_5_1M_Technical_Report.pdf):** We're also sharing the technical details behind the Qwen2.5-1M series, including design insights for training and inference frameworks, as well as ablation experiments.

You can experience Qwen2.5-1M models online by visiting our demo on [Huggingface](https://huggingface.co/spaces/Qwen/Qwen2.5-1M-Demo) and [Modelscope](https://www.modelscope.cn/studios/Qwen/Qwen2.5-1M-Demo).

Additionally, we recently introduced **[Qwen Chat](https://chat.qwenlm.ai/)**, an advanced AI assistant from the Qwen series. With Qwen Chat, you can engage in conversations, write code, perform searches, generate images and videos, and utilize various tools. Notably, Qwen Chat also features the Qwen2.5-Turbo model, which supports long-context processing with a context length of up to 1M tokens.

# Model Performance

Let's start by diving into the performance of the Qwen2.5-1M series models, covering both long-context and short text tasks.

## Long-Context Tasks

First off, we evaluate the Qwen2.5-1M models on the Passkey Retrieval task with a context length of 1 million tokens. The results show that these models can accurately retrieve hidden information from documents containing up to 1M tokens, with only minor errors observed in the 7B model.

{{< figure src="https://qianwen-res.oss-cn-beijing.aliyuncs.com/Qwen2.5-1M/passkey_retrieval.png#center" width="100%" >}}


For more complex long-context understanding tasks, we select [RULER](https://github.com/hsiehjackson/RULER), [LV-Eval](https://github.com/infinigence/LVEval), [LongbenchChat](https://github.com/THUDM/LongAlign) used in [this blog](../qwen2.5-turbo/#more-complex-long-text-tasks).

{{< figure src="https://qianwen-res.oss-cn-beijing.aliyuncs.com/Qwen2.5-1M/ruler.png#center" width="80%" >}}

{{< figure src="https://qianwen-res.oss-cn-beijing.aliyuncs.com/Qwen2.5-1M/lv-eval.png#center" width="80%" >}}

From these results, we can draw a few key conclusions:

* **Significantly Superior to the 128k Version:** The Qwen2.5-1M series models significantly outperform their 128K counterparts in most long-context tasks, especially for sequences exceeding 64K in length.
* **Notable Performance Advantage:** The Qwen2.5-14B-Instruct-1M model not only beats Qwen2.5-Turbo but also consistently outperforms GPT-4o-mini across multiple datasets, offering a robust open-source alternative for long-context tasks.

## Short-Context Tasks

Besides performance on long sequences, we’re equally interested in how these models handle short sequences. So, we compare the Qwen2.5-1M models and their 128K versions on widely used academic benchmarks, throwing in GPT-4o-mini for comparison.

{{< figure src="https://qianwen-res.oss-cn-beijing.aliyuncs.com/Qwen2.5-1M/short_result.png#center" width="80%" >}}

Here's what we find:

* Both Qwen2.5-7B-Instruct-1M and Qwen2.5-14B-Instruct-1M maintain performance on short text tasks that is similar to their 128K versions, ensuring the fundamental capabilities haven't been compromised by the addition of long-sequence processing abilities.
* Compared to GPT-4o-mini, both Qwen2.5-14B-Instruct-1M and Qwen2.5-Turbo achieve similar performance on short text tasks while supporting a context length that's eight times longer.

# Key Techniques

Here, we'll briefly introduce the key techniques behind building Qwen2.5-1M. For more details, please check out our [technical report](https://qianwen-res.oss-cn-beijing.aliyuncs.com/Qwen2.5-1M/Qwen2_5_1M_Technical_Report.pdf).

## Long-Context Training

{{< figure src="https://qianwen-res.oss-cn-beijing.aliyuncs.com/Qwen2.5-1M/training_stages.png#center" width="70%" >}}

Training with long sequences demands substantial computational resources, so we adopt a progressive approach to expand the context length for Qwen2.5-1M through multiple stages:

* We begin with an intermediate checkpoint of pre-trained Qwen2.5, which had a 4K token context length.
* **In Pretraining**, we gradually increase the context length from 4K to 256K tokens while using [Adjusted Base Frequency](https://arxiv.org/abs/2309.16039), raising the RoPE base from 10,000 to 10,000,000.
* **In Supervised Fine-tuning**, we split this into two stages to preserve performance on shorter sequences:
  * **Stage 1:** Fine-tuned only on short instructions (up to 32K tokens) using the same data and steps as the 128K versions of Qwen2.5.
  * **Stage 2:** Mixed short (up to 32K) and long (up to 256K) instructions to enhance long-context task performance while maintaining short-task quality.
* **In Reinforcement Learning**, we train models on short texts up to 8K tokens, which sufficiently improves alignment with human preferences and generalizes well to long-context tasks.

<p>

The final instruction-tuned models are capable of handling sequences up to 256K tokens.

## Length Extrapolation

During training, we develop an instruction-tuned model with a context length of 256K tokens. To extend this to 1M tokens, we employ length extrapolation techniques.

The degradation of LLMs based on RoPE in long-context tasks is mainly due to unseen, large relative positional distances between queries and keys in computing attention weight. We employ [**Dual Chunk Attention**](https://arxiv.org/abs/2402.17463) (DCA), which addresses this issue by remapping relative positions to smaller values, avoiding the large distances not seen during training.

{{< figure src="https://qianwen-res.oss-cn-beijing.aliyuncs.com/Qwen2.5-1M/dca.png#center" width="70%" >}}

We evaluat the Qwen2.5-1M models and their 128K counterparts with and without the length extrapolation method. We can find:

Even models trained on just 32K tokens, such as the Qwen2.5-7B-Instruct, achieve nearly perfect accuracy in passkey retrieval tasks with 1M-token contexts. This underscores the remarkable ability of DCA to extend supported context lengths, without any training required.

{{< figure src="https://qianwen-res.oss-cn-beijing.aliyuncs.com/Qwen2.5-1M/dca_ablation.png#center" width="40%" >}}


## Sparse Attention

For long-context language models, inference speed is crucial for user experience. We introduce a sparse attention mechanism based on [**MInference**](https://arxiv.org/abs/2407.02490) to accelerate the prefill phase. Furthermore, we propose several improvements:

* **Integrating with Chunked Prefill:** Directly processing sequences of 1M tokens results in substantial memory overhead to store the activations in MLP layers, consuming 71GB of VRAM in Qwen2.5-7B. By integrating with chunk prefill with a chunk length of 32,768 tokens, activation VRAM usage is reduced by 96.7%, leading to a significant decrease in memory consumption.

* **Integrating with Length Extrapolation:** We integrate DCA with MInference in long-context processing, thereby enhancing inference efficiency and achieving greater accuracy.

* **Sparsity Refinement on Long Sequences:** MInference requires an offline search to determine the optimal sparsification configuration for each attention head. Due to the computational demand of full attention weights, this search is typically conducted on short sequences, which may not generalize well to longer sequences. We developed a method to refine the sparsification configuration specifically for sequences up to 1M tokens, which significantly reduces the accuracy loss brought by sparse attention.

* **More Optimizations:** We introduce additional optimizations, such as enhanced kernel efficiency and dynamic chunked pipeline parallelism, to fully unlock the potential of the entire framework.

<p>

With these enhancements, our inference framework results in a 3.2x to 6.7x acceleration in the prefill speed across different model sizes and GPU devices for sequences of 1M token length.

{{< figure src="https://qianwen-res.oss-cn-beijing.aliyuncs.com/Qwen2.5-1M/speed.png#center" width="85%" >}}

# Deploy Qwen2.5-1M Models Locally

Here we provide step-by-step instructions for deploying the Qwen2.5-1M models on your local devices.

### 1. System Preparation

To achieve the best performance, we recommend using GPUs with Ampere or Hopper architecture, which support optimized kernels.

Ensure your system meets the following requirements:

- **CUDA Version**: 12.1 or 12.3
- **Python Version**: >=3.9 and <=3.12

<p>

VRAM Requirement for processing 1 million-token sequences:

- **Qwen2.5-7B-Instruct-1M**: At least 120GB VRAM (total across GPUs).
- **Qwen2.5-14B-Instruct-1M**: At least 320GB VRAM (total across GPUs).

<p>

If your GPUs do not have sufficient VRAM, you can still use Qwen2.5-1M models for shorter tasks.

### 2. Install Dependencies

For now, you need to clone the vLLM repository from our custom branch and install it manually. We are working on getting our branch merged into the main vLLM project.

```bash
git clone -b dev/dual-chunk-attn git@github.com:QwenLM/vllm.git
cd vllm
pip install -e . -v
```

### 3. Launch OpenAI-Compatible API Service

Use the following command to start the service, configuring it based on your hardware setup:

```bash
vllm serve Qwen/Qwen2.5-7B-Instruct-1M \
  --tensor-parallel-size 4 \
  --max-model-len 1010000 \
  --enable-chunked-prefill --max-num-batched-tokens 131072 \
  --enforce-eager \
  --max-num-seqs 1

# --quantization fp8 # Enabling FP8 quantization for model weights can reduce memory usage.
```

<p>

If you encounter any issues, please refer to the [Troubleshooting](https://huggingface.co/Qwen/Qwen2.5-7B-Instruct-1M#troubleshooting) section for more information.

**Parameter Explanations:**

- **`--tensor-parallel-size`**
  - Set to the number of GPUs you are using. Max 4 GPUs for the 7B model, and 8 GPUs for the 14B model.
  
- **`--max-model-len`**
  - Defines the maximum input sequence length. Reduce this value if you encounter Out of Memory issues.

- **`--max-num-batched-tokens`**
  - Sets the chunk size in Chunked Prefill. A smaller value reduces activation memory usage but may slow down inference. 
  - Recommend 131072 for optimal performance.

- **`--max-num-seqs`**
  - Limits concurrent sequences processed. 
<p>


### 4. Interact with the Model

You can interact with the deployed model using one of the following methods:

**Option 1. Using Curl**

```bash
curl http://localhost:8000/v1/chat/completions \
  -H "Content-Type: application/json" \
  -d '{
    "model": "Qwen/Qwen2.5-7B-Instruct-1M",
    "messages": [
      {"role": "user", "content": "Tell me something about large language models."}
    ],
    "temperature": 0.7,
    "top_p": 0.8,
    "repetition_penalty": 1.05,
    "max_tokens": 512
  }'
```

**Option 2. Using Python**

```python
from openai import OpenAI

openai_api_key = "EMPTY"
openai_api_base = "http://localhost:8000/v1"

client = OpenAI(
    api_key=openai_api_key,
    base_url=openai_api_base,
)

prompt = (
    "There is an important info hidden inside a lot of irrelevant text. " +
    "Find it and memorize it. I will quiz you about the important information there.\n\n" +
    "The pass key is 28884. Remember it. 28884 is the pass key.\n" +
    "The grass is green. The sky is blue. The sun is yellow. Here we go. There and back again. " * 800 +
    "\nWhat is the pass key?"
    # The prompt is approximately 20k tokens long. You can try longer prompts by increasing the multiplier.
)

chat_response = client.chat.completions.create(
    model="Qwen/Qwen2.5-7B-Instruct-1M",
    messages=[{"role": "user", "content": prompt}],
    temperature=0,
)
print("Chat response:", chat_response.choices[0].message.content)
```

<p>

**Other Options**

For more advanced use cases, consider exploring frameworks like [Qwen-Agent](https://github.com/QwenLM/Qwen-Agent/tree/main), which enable the model to read PDF files and perform other specialized tasks.

# What's Next?

We recognize that long-context models still have a lot of room for improvement. Our goal is to build models that excel in both short and long-context tasks, making sure they bring real value to practical, long-context scenarios. We're diving deep into more efficient training methods, model architectures, and inference methods to make them deployable effectively and perform exceptionally well even in environments with limited resources.
We're confident that all these efforts will open up a whole new world of possibilities for long-context models, expanding their use across a much broader range of applications. Stay tuned as we keep pushing the boundaries!