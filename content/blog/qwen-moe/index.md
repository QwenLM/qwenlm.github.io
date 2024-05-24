---
title: "Qwen1.5-MoE: Matching 7B Model Performance with 1/3 Activated Parameters"
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

# Introduction

Since the surge in interest sparked by Mixtral, research on mixture-of-expert (MoE) models has gained significant momentum. Both researchers and practitioners are keenly interested in understanding how to effectively train such models and assessing their efficiency and effectiveness. Today, we introduce Qwen1.5-MoE-A2.7B, a small MoE model with only 2.7 billion activated parameters yet matching the performance of state-of-the-art 7B models like Mistral 7B and Qwen1.5-7B.

Compared to Qwen1.5-7B, which contains 6.5 billion non-embedding parameters, Qwen1.5-MoE-A2.7B contains only 2.0 billion non-embedding parameters, approximately one-third of Qwen1.5-7B's size. Notably, it achieves a 75% decrease in training expenses and accelerates inference speed by a factor of 1.74, offering substantial improvements in resource utilization without compromising performance.

{{< figure src="https://qianwen-res.oss-accelerate.aliyuncs.com/assets/blog/qwen1.5/qwen-moe.jpg#center" width="100%">}}

# Architecture
We build the Qwen1.5-MoE models with a specially designed MoE architecture. Typically, as seen in methods like Mixtral, MoE layers within each transformer block employ eight experts and utilize a top-2 gating strategy for routing purposes. This configuration, while straightforward and efficacious, presents ample scope for enhancement. Consequently, through an extensive series of experiments, we have introduced several modifications to this architecture:

* Finegrained experts
* Initialization, which we call it "upcycling"
* Routing mechanism, with shared and routing experts
<br><br>

Previous research projects such as DeepSeek-MoE and DBRX have demonstrated the effectiveness of using fine-grained experts. Conventionally, when transitioning from a standard FFN layer to a Mixture-of-Experts (MoE) layer, one merely replicates the FFN multiple times to create multiple experts. However, in the context of fine-grained experts, the goal is to generate a larger number of experts without increasing the parameter count. To accomplish this, we partition a single FFN into several segments, each serving as an individual expert. This is a more nuanced approach to constructing experts. We have identified an optimal configuration with a total of 64 experts, representing an 8-time increase compared to the conventional MoE setup of 8 experts.

The initialization stage of the model is critical. Our initial experiments suggest that training a MoE model from scratch may prove inefficient and challenging to elevate it to the anticipated peak performance. Instead, we start by repurposing our existing Qwen-1.8B, transforming it into Qwen1.5-MoE-A2.7B. A noteworthy finding is that introducing randomness during initialization significantly expedites convergence and results in superior overall performance throughout the pre-training process.

An essential aspect deserving attention is the routing methodology employed. Presently, there is a growing trend towards using shared and routing-specific experts within the MoE layer. To view it from a broader perspective, this is a generalized MoE routing approach, as having zero shared experts effectively reduces to the conventional MoE routing setup. In the case of Qwen1.5-MoE-A2.7B model, we have incorporated 4 shared experts to be always activated alongside 60 routing experts with 4 to be activated. This configuration offers a more adaptable method for constructing the MoE routing mechanism, providing greater flexibility and efficiency.

# Performance
In order to thoroughly assess and showcase the capabilities and superiority of our newly developed model, we have conducted extensive evaluations across various benchmark datasets for both the base and chat models. For the base model, we evaluated its performance on 3 benchmarks: MMLU, GSM8K, and HumanEval for evaluating language understanding, mathematics, and coding. Additionally, to gauge its multilingual proficiency, we followed the evaluation protocol of Qwen1.5 and tested it on several benchmarks that spanned diverse domains such as exams, understanding, math, and translation, presenting an aggregate score in the "Multilingual" column. For the chat model, rather than employing traditional benchmarks, we subjected it to testing using MT-Bench. 

In this comparative analysis, we juxtaposed Qwen1.5-MoE-A2.7B against top-performing 7B base models like Mistral-7B (v0.1 base and v0.2 instruct), Gemma-7B, and Qwen1.5-7B. Furthermore, we included a comparison with other MoE models of comparable parameter counts, notably DeepSeekMoE 16B. The results are summarized in the table below:

| Model        		| MMLU | GSM8K | HumanEval | Multilingual | MT-Bench  |
| :---------------- | :--: | :---: | :-------: | :--:         | :--: |
| Mistral-7B   		| 64.1 | 47.5  |   27.4    | 40.0         | 7.60 |
| Gemma-7B   		| 64.6 | 50.9  |    32.3   | -         | - |
| Qwen1.5-7B   		| 61.0 | 62.5  |   36.0    | 45.2         | 7.60 |
| DeepSeekMoE 16B   | 45.0 | 18.8  |   26.8    | -            | 6.93  |
| Qwen1.5-MoE-A2.7B | 62.5 | 61.5  |   34.2    | 40.8         | 7.17  |

The Qwen1.5-MoE-A2.7B model has demonstrated competitive performance akin to the top 7B models in various evaluations. Despite this parity, our analysis reveals untapped potential for enhancement in the domain of chat models specifically. As such, we are committed to furthering our research efforts towards refining the effective finetuning strategies for MoE models.


# Costs and Efficiency
The training costs of MoE models deviates significantly from that of their dense counterparts. Despite a larger parameter count, MoE models' training expenses can be notably reduced due to sparsity. To better understand this, let's first delve into three key components: total number of parameters, the count of active parameters, and non-embedding parameters and make a comparison between models:


| Model        		| #Parameters | #(Activated) Parameters | #(Activated) Non-embedding parameters |
| :---------------- | :--: | :----: | :---: | 
| Mistral-7B    	| 7.2  |  7.2   | 7.0   |
| Qwen1.5-7B   		| 7.7  |  7.7   | 6.4   |
| Gemma-7B   		| 8.5  |  7.8   | 7.8   | 
| DeepSeekMoE 16B   | 16.4 |  2.8   | 2.4   |
| Qwen1.5-MoE-A2.7B | 14.3 |  2.7   | 2.0   |

It is obvious that the count of non-embedding parameters of our MoE model is much smaller than those of 7B models. In our practical implementation, we have observed a remarkable reduction of 75% in training costs when using Qwen1.5-MoE-A2.7B in comparison to Qwen1.5-7B. Of particular significance is the fact that, through upcycling, the necessity for training an equivalent volume of tokens as in the original model has been eliminated. This constitutes a substantial enhancement in terms of economizing on training expenses.

We have deployed both Qwen1.5-7B and Qwen1.5-MoE-A2.7B models with vLLM and conducted performance tests using a single NVIDIA A100-80G GPU. Under the experimental setup where the input token count was set at 1000 and the output tokens at 1000, we measured the performance in terms of throughput (requests processed per second) and tokens per second (TPS):

|Model   | Throughput    | TPS     |
|:------------|:--------------|---------|
|Qwen2-7B-Chat| 1.15 | 2298.89 |
|Qwen1.5-MoE-A2.7B-Chat| 2.01| 4010.27 |

The Qwen1.5-MoE-A2.7B model exhibits an impressive improvement in speed, being approximately 1.74 times faster compared to the Qwen1.5-7B model. This acceleration is primarily attributed to the fact that the MoE architecture activates a notably smaller portion of its total parameters, thereby reducing computational demands. Moreover, the integration of shared experts contributes substantially to enhancing the model's inference efficiency. Consequently, despite the increased memory requirements associated with MoE models, they demonstrate clear advantages in terms of both throughput and inference speed.

# Develop with Qwen1.5-MoE
To utilize the Qwen1.5-MoE model with the `qwen2_moe` implementation in Hugging Face's transformers, since the latest release does not include this feature yet, you will have to install transformers from source instead of installing it via pip or conda:

```bash
git clone https://github.com/huggingface/transformers
cd transformers
pip install -e .
```

The following step is indeed straightforward and akin to using models such as Qwen1.5, Mistral, or Llama. We demonstrate an example of the usage of Qwen1.5-MoE-A2.7B-Chat. To use the quantized model instead, you can just substitute the model name ` Qwen1.5-MoE-A2.7B-Chat` with ` Qwen1.5-MoE-A2.7B-Chat-GPTQ-Int4` (temporarily AWQ is not supported). 

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

To use the model with vLLM, follow our fork first and then install vLLM from source as well:

```bash
git clone https://github.com/wenyujin333/vllm.git
cd vllm
git checkout add_qwen_moe
pip install -e .
```

Here we demonstrate an example to show how to use vLLM to build an OpenAI-API compatible interface for our model:

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

There remains an extensive array of tasks on our agenda, including the support of llama.cpp for GGUF files, MLX support, etc. We will continue updating the support of third-party frameworks.


# Conclusion
We are thrilled to introduce our pioneering MoE model, Qwen1.5-MoE-A2.7B, which achieves parity with contemporary 7B parameter models. Furthermore, we have shown substantial reductions in both training costs and inference time when compared to conventional 7B models. Our model developments underscore the vast potential of MoE models. In light of these encouraging outcomes, we remain steadfast in our commitment to advancing this technology further.

# Citation

```
@misc{qwen_moe,
    title = {Qwen1.5-MoE: Matching 7B Model Performance with 1/3 Activated Parameters"},
    url = {https://qwenlm.github.io/blog/qwen-moe/},
    author = {Qwen Team},
    month = {February},
    year = {2024}
}
```
