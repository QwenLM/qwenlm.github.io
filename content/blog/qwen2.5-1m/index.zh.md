---
title: "Qwen2.5-1M: 支持100万Token上下文的开源Qwen模型"
date: 2025-01-27T00:00:03+08:00
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

# 简介

两个月前，我们升级了 [Qwen2.5-Turbo](../qwen2.5-turbo)，使其支持最多一百万个Tokens的上下文长度。今天，我们正式推出开源的 Qwen2.5-1M 模型及其对应的推理框架支持。以下是本次发布的亮点：

1) **开源模型：** 我们发布了两个新的开源模型，分别是 **Qwen2.5-7B-Instruct-1M** 和 **Qwen2.5-14B-Instruct-1M**，这是我们首次将开源 Qwen 模型的上下文扩展到 1M 长度。

2) **推理框架：** 为了帮助开发者更高效地部署 Qwen2.5-1M 系列模型，我们完全开源了基于 [vLLM](https://github.com/vllm-project/vllm) 的推理框架，并集成了稀疏注意力方法。该框架在处理 1M 长度输入时的速度能够提升 **3倍到7倍**。

3) **[技术报告](https://qianwen-res.oss-cn-beijing.aliyuncs.com/Qwen2.5-1M/Qwen2_5_1M_Technical_Report.pdf)：** 我们还分享了 Qwen2.5-1M 系列背后的技术细节，包括训练和推理框架的设计思路以及消融实验的结果。

现在，你可以访问我们在 [Huggingface](https://huggingface.co/spaces/Qwen/Qwen2.5-1M-Demo) 和 [Modelscope](https://www.modelscope.cn/studios/Qwen/Qwen2.5-1M-Demo) 上的在线演示来体验 Qwen2.5-1M 模型。

另外，我们最近也推出了 **[Qwen Chat](https://chat.qwenlm.ai/)** ，一个基于 Qwen 系列的 AI 助手。你可以与他对话、编程、生成图像与视频，使用搜索以及调用工具等功能。你也可以在 Qwen Chat 中与使用上下文长度同样为 1M 的 Qwen2.5-Turbo 模型进行长序列处理。

# 模型性能

首先，让我们来看看 Qwen2.5-1M 系列模型在长上下文任务和短文本任务中的性能表现。

## 长上下文任务

在上下文长度为100万 Tokens 的大海捞针（Passkey Retrieval）任务中，Qwen2.5-1M 系列模型能够准确地从 1M 长度的文档中检索出隐藏信息，其中仅有7B模型出现了少量错误。

{{< figure src="https://qianwen-res.oss-cn-beijing.aliyuncs.com/Qwen2.5-1M/passkey_retrieval.png#center" width="100%" >}}

对于更复杂的长上下文理解任务，我们选择了[RULER](https://github.com/hsiehjackson/RULER)、[LV-Eval](https://github.com/infinigence/LVEval) 和 [LongbenchChat](https://github.com/THUDM/LongAlign)，这些测试集也在[此博客](../qwen2.5-turbo/#more-complex-long-text-tasks)中进行了介绍。

{{< figure src="https://qianwen-res.oss-cn-beijing.aliyuncs.com/Qwen2.5-1M/ruler.png#center" width="80%" >}}

{{< figure src="https://qianwen-res.oss-cn-beijing.aliyuncs.com/Qwen2.5-1M/lv-eval.png#center" width="80%" >}}

从这些结果中，我们可以得出以下几点关键结论：

1. **显著超越128K版本**：Qwen2.5-1M 系列模型在大多数长上下文任务中显著优于之前的128K版本，特别是在处理超过64K长度的任务时表现出色。
2. **性能优势明显**：Qwen2.5-14B-Instruct-1M 模型不仅击败了 Qwen2.5-Turbo，还在多个数据集上稳定超越 GPT-4o-mini，因此可以作为现有长上下文模型的优秀开源替代。


## 短序列任务

除了长序列任务的性能外，我们同样关注这些模型在短序列上的表现。我们在广泛使用的学术基准测试中比较了 Qwen2.5-1M 系列模型及之前的128K版本，并加入了 GPT-4o-mini 进行对比。

{{< figure src="https://qianwen-res.oss-cn-beijing.aliyuncs.com/Qwen2.5-1M/short_result.png#center" width="80%" >}}

我们可以发现：

- Qwen2.5-7B-Instruct-1M 和 Qwen2.5-14B-Instruct-1M 在短文本任务上的表现与其128K版本相当，确保了基本能力没有因为增加了长序列处理能力而受到影响。
  
- 与 GPT-4o-mini 相比，Qwen2.5-14B-Instruct-1M 和 Qwen2.5-Turbo 在短文本任务上实现了相近的性能，同时上下文长度是 GPT-4o-mini 的八倍。

# 关键技术

在这里，我们将简要介绍构建 Qwen2.5-1M 背后的关键技术。更多内容可参阅我们的[技术报告](https://qianwen-res.oss-cn-beijing.aliyuncs.com/Qwen2.5-1M/Qwen2_5_1M_Technical_Report.pdf)。

## 长上下文训练

{{< figure src="https://qianwen-res.oss-cn-beijing.aliyuncs.com/Qwen2.5-1M/training_stages.png#center" width="70%" >}}

长序列的训练需要大量的计算资源，因此我们采用了逐步扩展长度的方法，在多个阶段将 Qwen2.5-1M 的上下文长度从 4K 扩展到 256K：

* 我们从预训练的Qwen2.5的一个中间检查点开始，此时上下文长度为4K。
* **在预训练阶段**，我们逐步将上下文长度从 4K 增加到 256K，同时使用[Adjusted Base Frequency](https://arxiv.org/abs/2309.16039)的方案，将 RoPE 基础频率从 10,000 提高到 10,000,000。
* **在监督微调阶段**，我们分两个阶段进行以保持短序列上的性能：
  * **第一阶段：** 仅在短指令（最多 32K 长度）上进行微调，这里我们使用与 Qwen2.5 的 128K 版本相同的数据和步骤数，以获得类似的短任务性能。
  * **第二阶段：** 混合短指令（最多 32K）和长指令（最多 256K）进行训练，以实现在增强长任务的性能的同时，保持短任务上的准确率。
* **在强化学习阶段**，我们在短文本（最多 8K 长度）上训练模型。我们发现，即使在短文本上进行训练，也能很好地将人类偏好对齐性能泛化到长上下文任务中。

<p>

通过以上训练，我们最终获得了 256K 上下文长度的指令微调模型。

## 长度外推

在上述训练过程中，模型的上下文长度仅为 256K 个 Tokens。为了将其扩展到 1M ，我们采用了长度外推的技术。

当前，基于旋转位置编码的大型语言模型会在长上下文任务中产生性能下降，这主要是由于在计算注意力权重时，Query 和 Key 之间的相对位置距离过大，在训练过程中未曾见过。为了解决这一问题，我们引入了[**Dual Chunk Attention**](https://arxiv.org/abs/2402.17463) (DCA)，该方法通过将过大的相对位置，重新映射为较小的值，从而解决了这一难题。

{{< figure src="https://qianwen-res.oss-cn-beijing.aliyuncs.com/Qwen2.5-1M/dca.png#center" width="70%" >}}

我们对 Qwen2.5-1M 模型及之前 128K 的版本进行了评估，分别测试了使用和不使用长度外推方法的情况。

结果表明：即使是仅在 32K 长度上训练的 Qwen2.5-7B-Instruct，在处理 1M 上下文的 Passkey Retrieval 任务中也能达到近乎完美的准确率。这充分展示了 DCA 在无需额外训练的情况下，也可显著扩展支持的上下文长度的强大能力。

{{< figure src="https://qianwen-res.oss-cn-beijing.aliyuncs.com/Qwen2.5-1M/dca_ablation.png#center" width="40%" >}}

## 稀疏注意力机制

对于长上下文的语言模型，推理速度对用户体验至关重要。为了加速预填充阶段，我们引入了基于 [**MInference**](https://arxiv.org/abs/2407.02490) 的稀疏注意力优化。在此基础上，我们还提出了一系列改进：

* **分块预填充：** 如果直接使用模型处理长度100万的序列，其中 MLP 层的激活权重会产生巨大的显存开销。以Qwen2.5-7B 为例，这部分开销高达 71GB。通过将分块预填充（Chunked Prefill）与稀疏注意力适配，可以将输入序列以 32768 长度分块，逐块进行预填充，MLP 层激活权重的显存使用量可减少 96.7%，因而显著降低了设备的显存需求。

* **集成长度外推方案：** 我们在稀疏注意力机制中进一步集成了基于 DCA 的长度外推方案，这使我们的推理框架能够同时享受更高的推理效率和长序列任务的准确性。

* **稀疏性优化：** 原始的 MInference 方法需要进行离线搜索以确定每个注意力头的最佳稀疏化配置。由于全注意力权重对内存的要求太大，这种搜索通常在短序列上进行，不一定能在更长序列下起到很好的效果。我们提出了一种能够在100万长度的序列上优化稀疏化配置的方法，从而显著减少了稀疏注意力带来的精度损失。

* **其他优化：** 我们还引入了其他优化措施，如优化算子效率和动态分块流水线并行，以充分发挥整个框架的潜力。

<p>

通过这些改进，我们的推理框架在不同模型大小和 GPU 设备上，处理 1M 长度输入序列的预填充速度提升了 3.2 倍到 6.7 倍。

{{< figure src="https://qianwen-res.oss-cn-beijing.aliyuncs.com/Qwen2.5-1M/speed.png#center" width="85%" >}}

# 本地部署 Qwen2.5-1M 模型

接下来，我们将逐步介绍如何将 Qwen2.5-1M 模型部署到本地设备。

### 1. 系统准备

为了获得最佳性能，我们建议使用支持优化内核的 Ampere 或 Hopper 架构的 GPU。

请确保满足以下要求：

- **CUDA 版本**：12.1 或 12.3
- **Python 版本**：>=3.9 且 <=3.12

<p>

显存要求，对于处理 1M 长度的序列：

- **Qwen2.5-7B-Instruct-1M**：至少需要 120GB 显存（多 GPU 总和）。
- **Qwen2.5-14B-Instruct-1M**：至少需要 320GB 显存（多 GPU 总和）。

如果 GPU 显存不满足以上要求，你仍然可以使用 Qwen2.5-1M 进行较短任务的处理。

### 2. 安装依赖项

暂时，你需要从我们的自定义分支克隆 vLLM 仓库，并手动安装。我们正在努力将我们的分支提交到 vLLM 项目中。

```bash
git clone -b dev/dual-chunk-attn git@github.com:QwenLM/vllm.git
cd vllm
pip install -e . -v
```

### 3. 启动 OpenAI 兼容的 API 服务

使用以下命令启动服务，根据你的硬件配置进行设置：

```bash
vllm serve Qwen/Qwen2.5-7B-Instruct-1M \
  --tensor-parallel-size 4 \
  --max-model-len 1010000 \
  --enable-chunked-prefill --max-num-batched-tokens 131072 \
  --enforce-eager \
  --max-num-seqs 1

# --quantization fp8 # you can use fp8 quantization for model weights to reduce memory usage
```

<p>

**参数说明：**

- **`--tensor-parallel-size`**
  - 设置为您使用的 GPU 数量。7B 模型最多支持 4 个 GPU，14B 模型最多支持 8 个 GPU。
  
- **`--max-model-len`**
  - 定义最大输入序列长度。如果遇到内存不足问题，请减少此值。

- **`--max-num-batched-tokens`**
  - 设置 Chunked Prefill 的块大小。较小的值可以减少激活内存使用，但可能会减慢推理速度。
  - 推荐值为 131072，以获得最佳性能。

- **`--max-num-seqs`**
  - 限制并发处理的序列数量。

<p>

如果遇到问题，请参考 [Troubleshooting](https://huggingface.co/Qwen/Qwen2.5-7B-Instruct-1M#troubleshooting) 相关内容。


### 4. 与模型交互

你可以使用以下方法与部署的模型进行交互：

**选项 1. 使用 Curl**

```bash
curl http://localhost:8000/v1/chat/completions \
  -H "Content-Type: application/json" \
  -d '{
    "model": "Qwen/Qwen2.5-7B-Instruct-1M",
    "messages": [
      {"role": "user", "content": "告诉我一些关于大型语言模型的事情。"}
    ],
    "temperature": 0.7,
    "top_p": 0.8,
    "repetition_penalty": 1.05,
    "max_tokens": 512
  }'
```

**选项 2. 使用 Python**

```python
from openai import OpenAI

openai_api_key = "EMPTY"
openai_api_base = "http://localhost:8000/v1"

client = OpenAI(
    api_key=openai_api_key,
    base_url=openai_api_base,
)

prompt = (
    "There is an important info hidden inside a lot of irrelevant text. "
    "Find it and memorize it. I will quiz you about the important information there.\n\n"
    "The pass key is 28884. Remember it. 28884 is the pass key.\n"
    "The grass is green. The sky is blue. The sun is yellow. Here we go. There and back again. " * 800
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

**其他选项**

对于更高级的使用方式，可以探索如 [Qwen-Agent](https://github.com/QwenLM/Qwen-Agent/tree/main) 之类的框架。Qwen-Agent 使模型能够读取 PDF 文件或获得更多功能。

# 下一步

虽然 Qwen2.5-1M 系列为长序列处理任务带来了优秀的开源选择，我们也充分认识到长上下文模型仍有很大的提升空间。我们的目标是打造在长短任务中均能表现卓越的模型，确保它们在实际应用场景中真正发挥作用。为此，我们正深入研究更高效的训练方式、模型架构和推理方法，力求使这些模型即使在资源有限的环境中也能高效部署并且获得最佳的性能效果。
我们坚信，这些努力将为长上下文模型开启全新的可能性，大幅拓展其应用范围。我们将持续突破这一领域的边界，敬请期待！