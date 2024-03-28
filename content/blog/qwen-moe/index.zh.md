---
title: "Qwen1.5-MoE: 1/3的激活参数量达到7B模型的性能"
date: 2024-02-28T11:31:44+08:00
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
{{< button href="https://github.com/QwenLM/Qwen1.5" label="GITHUB" external=true >}}
{{< button href="https://huggingface.co/Qwen" label="HUGGING FACE" external=true >}}
{{< button href="https://modelscope.cn/organization/qwen" label="MODELSCOPE" external=true >}}
{{< button href="https://huggingface.co/spaces/Qwen/Qwen1.5MoE-A2.7B-Chat" label="DEMO" external=true >}}
{{< button href="https://discord.gg/yPEP2vHTu4" label="DISCORD" external=true >}}

# 介绍

今天，我们推出Qwen系列的首个MoE模型，Qwen1.5-MoE-A2.7B。它仅拥有27亿个激活参数，但其性能却能与当前最先进的70亿参数模型，如Mistral 7B和Qwen1.5-7B相媲美。相较于包含65亿个Non-Embedding参数的Qwen1.5-7B，Qwen1.5-MoE-A2.7B只有20亿个Non-Embedding参数，约为原模型大小的三分之一。此外，相比Qwen1.5-7B，Qwen1.5-MoE-A2.7B的训练成本降低了75%，推理速度则提升了1.74倍。

# 模型结构

我们在Qwen1.5-MoE模型中采用了特别设计的MoE架构。通常情况下，如Mixtral等方法所示，每个transformer block中的MoE层会配备8个expert，并采用top-2门控策略进行routing。这种配置还存在很大的优化空间。我们对这一架构进行了多项改进：

* Finegrained experts
* 初始化
* 新的routing机制
<br><br>

DeepSeek-MoE和DBRX已经证明了finegrained experts的有效性。从FFN层过渡到MoE层时，我们一般只是简单地复制多次FFN来实现多个expert。而finegrained experts的目标是在不增加参数数量的前提下生成更多expert。为了实现这一点，我们将单个FFN分割成几个部分，每个部分作为一个独立的expert。我们设计了具有总共64个expert的的MoE，对比其他配置，我们认为这个实现能达到效果和效率的最优。

模型初始化阶段至关重要。初步实验表明，从零开始训练MoE模型可能效率低下，且难以提升至预期的最优性能水平。因此，我们首先利用已有的Qwen-1.8B，将其改造为Qwen1.5-MoE-A2.7B。此外，在初始化阶段引入随机性可以显著加快收敛速度，并在整个预训练过程中带来更好的整体性能表现。

目前，一个明显的趋势是在MoE中实现共享expert与routing expert。从更宏观的角度看，这是一种广义的routing方法，因为在没有共享expert的情况下，实际上就退化为传统的MoE路由设置。对于Qwen1.5-MoE-A2.7B模型，我们在其中整合了4个总是被激活的共享expert和每次只激活其中4个的60个routing expert。这种方式非常灵活，同时在我们实验中效率最佳。

# 性能
为了全面评估和展示Qwen1.5-MoE-A2.7B的能力和优势，我们对base模型和chat模型进行了评估。对于base模型，我们在MMLU、GSM8K和HumanEval评估了其语言理解、数学和代码能力。此外，为了评估其多语言能力，我们按照Qwen1.5的评测方法在数学、理解、考试和翻译等多个领域的多语言基准测试中进行了测试，并在"Multilingual"列中给出了综合得分。对于chat模型，我们没有使用传统的基准测试，而是使用MT-Bench进行了测试。

在这个比较分析中，我们将Qwen1.5-MoE-A2.7B与最好的7B模型，比如Mistral-7B（base模型为v0.1，chat模型为v0.2）、Gemma-7B以及Qwen1.5-7B进行了对比。此外，我们还将其与具有相似参数数量的MoE模型DeepSeekMoE 16B进行了比较。结果如下表所示：

| Model        		| MMLU | GSM8K | HumanEval | Multilingual | MT-Bench  |
| :---------------- | :--: | :---: | :-------: | :--:         | :--: |
| Mistral-7B   		| 64.1 | 47.5  |   27.4    | 40.0         | 7.60 |
| Gemma-7B   		| 64.6 | 50.9  |    32.3   | -         | - |
| Qwen1.5-7B   		| 61.0 | 62.5  |   36.0    | 45.2         | 7.60 |
| DeepSeekMoE 16B   | 45.0 | 18.8  |   26.8    | -            | 6.93  |
| Qwen1.5-MoE-A2.7B | 62.5 | 61.5  |   34.2    | 40.8         | 7.17  |

Qwen1.5-MoE-A2.7B在与最佳的7B模型相比取得了非常接近的性能。然而，我们发现在chat模型方面仍有改进的空间。我们将继续研究如何更加有效地微调MoE模型。


# 训练成本与推理效率
MoE模型的训练成本与dense模型存在显著差异。尽管MoE模型通常拥有更多的参数，但由于其稀疏性，训练开销可以显著降低。我们先对比各个模型的三个关键参数，分别是总参数数量、激活参数数量和Non-embedding参数：

| Model        		| #Parameters | #(Activated) Parameters | #(Activated) Non-embedding parameters |
| :---------------- | :--: | :----: | :---: | 
| Mistral-7B    	| 7.2  |  7.2   | 7.0   |
| Gemma-7B   		| 8.5  |  7.8   | 7.8   | 
| Qwen1.5-7B   		| 7.7  |  7.7   | 6.4   | 
| DeepSeekMoE 16B   | 16.4 |  2.8   | 2.4   |
| Qwen1.5-MoE-A2.7B | 14.3 |  2.7   | 2.0   |

不难看出，尽管我们的总参数量较大，但Non-embedding激活参数量远小于7B模型。在我们的实践中，我们观察到使用Qwen1.5-MoE-A2.7B相比于Qwen1.5-7B，训练成本显著降低了75%。另外，由于我们的初始化方法，我们不需要训练同样数量的token即可达到很好的模型效果，这也显著了降低了训练成本。

我们使用vLLM部署了Qwen1.5-7B和Qwen1.5-MoE-A2.7B模型，并使用单个NVIDIA A100-80G GPU进行性能测试。在实验设置中，输入token数设置为1000，输出token数设置为1000，我们通过吞吐量（每秒处理的请求数）和每秒token数（TPS）来衡量性能：

|Model   | Throughput    | TPS     |
|:------------|:--------------|---------|
|Qwen2-7B-Chat| 1.15 | 2298.89 |
|Qwen1.5-MoE-A2.7B-Chat| 2.01| 4010.27 |

Qwen1.5-MoE-A2.7B与Qwen1.5-7B相比，速度提高了约1.74倍。这种加速主要归因于MoE在前向过程中仅激活了其总参数的一小部分，从而降低了计算需求。此外，共享expert也提升了模型的推理效率。因此，尽管MoE模型增加了内存需求，但它们在吞吐性能和推理速度方面都表现出明显的优势。

# 使用Qwen1.5-MoE
由于Hugging Face最新版本尚未包含`qwen2_moe`（代码已合并，等待新版本发布），您需要从源代码安装transformers，而不是通过pip或conda进行安装：

```bash
git clone https://github.com/huggingface/transformers
cd transformers
pip install -e .
```

接下来的步骤就像使用Qwen1.5、Mistral、Llama等一样简单。我们演示了使用Qwen1.5-MoE-A2.7B-Chat的示例。如果要使用量化模型，只需将模型名称`Qwen1.5-MoE-A2.7B-Chat`替换为`Qwen1.5-MoE-A2.7B-Chat-GPTQ-Int4`（暂时不支持AWQ）。

```python
from transformers import AutoModelForCausalLM, AutoTokenizer

model = AutoModelForCausalLM.from_pretrained(
    "Qwen/Qwen1.5-MoE-A2.7B-Chat-GPTQ-Int4",
    device_map="auto"
)
tokenizer = AutoTokenizer.from_pretrained("Qwen/Qwen1.5-MoE-A2.7B-Chat")

prompt = "Give me a short introduction to large language model."
messages = [
    {"role": "system", "content": "You are a helpful assistant."},
    {"role": "user", "content": prompt}
]
text = tokenizer.apply_chat_template(
    messages,
    tokenize=False,
    add_generation_prompt=True
)
model_inputs = tokenizer([text], return_tensors="pt").to(model.device)

generated_ids = model.generate(
    model_inputs.input_ids,
    max_new_tokens=512
)
generated_ids = [
    output_ids[len(input_ids):] for input_ids, output_ids in zip(model_inputs.input_ids, generated_ids)
]

response = tokenizer.batch_decode(generated_ids, skip_special_tokens=True)[0]
```

要使用vLLM模型，请从源代码安装vLLM：

```bash
git clone https://github.com/vllm-project/vllm.git
cd vllm
git checkout add_qwen_moe
pip install -e .
```

下面这个示例说明如何使用vLLM构建一个与我们的模型兼容的OpenAI-API接口：

```shell
python -m vllm.entrypoints.openai.api_server --model Qwen/Qwen1.5-MoE-A2.7B-Chat
```

```shell
curl http://localhost:8000/v1/chat/completions \
    -H "Content-Type: application/json" \
    -d '{
    "model": "Qwen/Qwen1.5-MoE-A2.7B-Chat",
    "messages": [
    {"role": "system", "content": "You are a helpful assistant."},
    {"role": "user", "content": "Tell me something about large language models."}
    ]
    }'
```

我们还有很多生态支持工作有待完成，包括llama.cpp、MLX等。我们将继续更新对第三方框架的支持。


# 总结
我们非常高兴地介绍我们的首个MoE模型Qwen1.5-MoE-A2.7B，它对比当前最好的7B参数模型取得了相当的性能。此外，与传统的7B模型相比，MoE模型在训练成本和推理时间上都取得了显著的降低。我们将持续研究MoE相关技术，未来将推出更强大的MoE模型。