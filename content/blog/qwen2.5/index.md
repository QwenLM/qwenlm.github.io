---
title: "Qwen2.5: A Party of Foundation Models!"
date: 2024-09-19T00:00:04+08:00
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

<!-- {{< video src="https://qianwen-res.oss-cn-beijing.aliyuncs.com/Qwen2.5/qwen2-main-video.m4v" width="100%" alt="Qwen2.5 Main Video" autoplay=true loop=true controls=false muted=true playsinline=true >}} -->


<video width="100%" autoplay loop muted playsinline>
    <source src="https://qianwen-res.oss-cn-beijing.aliyuncs.com/Qwen2.5/qwen2-main-video.m4v" type="video/mp4">
</video>

<!-- {{< figure src="https://qianwen-res.oss-cn-beijing.aliyuncs.com/Qwen2.5/qwen2.5-main.jpg" width="100%" alt="Qwen2.5 Main Image" >}} -->

{{< button href="https://github.com/QwenLM/Qwen2.5" label="GITHUB" external=true >}}
{{< button href="https://huggingface.co/Qwen" label="HUGGING FACE" external=true >}}
{{< button href="https://modelscope.cn/organization/qwen" label="MODELSCOPE" external=true >}}
{{< button href="https://huggingface.co/spaces/Qwen/Qwen2.5" label="DEMO" external=true >}}
{{< button href="https://discord.gg/yPEP2vHTu4" label="DISCORD" external=true >}}

# Introduction

In the past three months since Qwen2's release, numerous developers have built new models on the Qwen2 language models, providing us with valuable feedback. During this period, we have focused on creating smarter and more knowledgeable language models. Today, we are excited to introduce the latest addition to the Qwen family: **Qwen2.5**. 
We are announcing what might be the largest opensource release in history! Let's get the party started!

Our latest release features the LLMs **Qwen2.5**, along with specialized models for coding, **Qwen2.5-Coder**, and mathematics, **Qwen2.5-Math**. All open-weight models are dense, decoder-only language models, available in various sizes, including:

* Qwen2.5: 0.5B, 1.5B, 3B, 7B, 14B, 32B, and 72B  
* Qwen2.5-Coder: 1.5B, 7B, and 32B on the way  
* Qwen2.5-Math: 1.5B, 7B, and 72B.  

<br>

All our open-source models, except for the 3B and 72B variants, are licensed under Apache 2.0. You can find the license files in the respective Hugging Face repositories. In addition to these models, we offer APIs for our flagship language models: **Qwen-Plus** and **Qwen-Turbo** through Model Studio, and we encourage you to explore them! Furthermore, we have also open-sourced the **Qwen2-VL-72B**, which features performance enhancements compared to last month's release.

For more details about Qwen2.5, Qwen2.5-Coder, and Qwen2.5-Math, feel free to visit the following links:

{{< button href="https://qwenlm.github.io/blog/qwen2.5-llm" label="Qwen2.5 LLM" external=true style="primary" >}}
{{< button href="https://qwenlm.github.io/blog/qwen2.5-coder" label="Qwen2.5-Coder" external=true style="primary" >}}
{{< button href="https://qwenlm.github.io/blog/qwen2.5-math" label="Qwen2.5-Math" external=true style="primary" >}}

<br>

Get ready to unlock a world of possibilities with our extensive lineup of models! We're excited to share these cutting-edge models with you, and we can't wait to see the incredible things you'll achieve with them!


# Takeaways

In terms of **Qwen2.5**, the language models, all models are pretrained on our latest large-scale dataset, encompassing up to **18 trillion** tokens. Compared to Qwen2, Qwen2.5 has acquired significantly more knowledge (MMLU: 85+) and has greatly improved capabilities in coding (HumanEval 85+) and mathematics (MATH 80+). Additionally, the new models achieve significant improvements in instruction following, generating long texts (over 8K tokens), understanding structured data (e.g, tables), and generating structured outputs especially JSON. Qwen2.5 models are generally more resilient to the diversity of system prompts, enhancing role-play implementation and condition-setting for chatbots. Like Qwen2, the Qwen2.5 language models support up to **128K** tokens and can generate up to **8K** tokens. They also maintain multilingual support for over **29** languages, including Chinese, English, French, Spanish, Portuguese, German, Italian, Russian, Japanese, Korean, Vietnamese, Thai, Arabic, and more. Below, we provide basic information about the models and details of the supported languages.

The specialized expert language models, namely **Qwen2.5-Coder** for coding and **Qwen2.5-Math** for mathematics, have undergone substantial enhancements compared to their predecessors, CodeQwen1.5 and Qwen2-Math. Specifically, Qwen2.5-Coder has been trained on **5.5 trillion** tokens of code-related data, enabling even smaller coding-specific models to deliver competitive performance against larger language models on coding evaluation benchmarks. Meanwhile, Qwen2.5-Math supports both **Chinese** and **English** and incorporates various reasoning methods, including Chain-of-Thought (CoT), Program-of-Thought (PoT), and Tool-Integrated Reasoning (TIR).

{{< figure src="http://qianwen-res.oss-cn-beijing.aliyuncs.com/Qwen2.5/Qwen2.5%20modelcard.001.jpeg" width="100%" alt="Qwen2.5 Specification" >}}

<!-- 
|  Models  | Params | Non-Emb Params | Layers | Heads (KV) | Tie Embedding | Context Length | Generation Length | License |
| :--------| :--------: | :--------: | :------: | :------------: | :-------: | :------------: | :-------: | :-------: |
| Qwen2.5-0.5B |  0.49B |  0.36B | 24 | 14 / 2 | Yes |  32K | 8K | Apache 2.0 |
| Qwen2.5-1.5B | 1.54B |  1.31B | 28 | 12 / 2 | Yes |  32K | 8K | Apache 2.0 |
| Qwen2.5-3B  |  3.09B |  2.77B | 36 | 16 / 2 | Yes |  32K | 8K | Qwen Research |
| Qwen2.5-7B | 7.61B |  6.53B | 28 | 28 / 4 | No |  128K | 8K | Apache 2.0 |
| Qwen2.5-14B | 14.7B |  13.1B | 48 | 40 / 8 | No |  128K  | 8K | Apache 2.0 |
| Qwen2.5-32B  |  32.5B |  31.0B | 64 | 40 / 8 | No |  128K | 8K | Apache 2.0 |
| Qwen2.5-72B  | 72.7B |  70.0B | 80 | 64 / 8 | No |  128K | 8K | Qwen | -->




# Performance

## Qwen2.5

To showcase Qwen2.5's capabilities, we benchmark our largest open-source model, **Qwen2.5-72B** - a 72B-parameter dense decoder-only language model - against leading open-source models like Llama-3.1-70B and Mistral-Large-V2. We present comprehensive results from instruction-tuned versions across various benchmarks, evaluating both model capabilities and human preferences.

{{< figure src="https://qianwen-res.oss-cn-beijing.aliyuncs.com/Qwen2.5/Qwen2.5-72B-Instruct-Score.jpg" width="100%" alt="Qwen2.5-72B Instruct Performance" >}}

Besides the instruction-tuned language models, we figure out that the base language model of our flagship opensource model Qwen2.5-72B reaches top-tier performance even against larger models like Llama-3-405B.

{{< figure src="https://qianwen-res.oss-cn-beijing.aliyuncs.com/Qwen2.5/Qwen2.5-72B-base.001.jpeg" width="100%" alt="Qwen2.5-72B Base Model Performance" >}}


Furthermore, we benchmark the latest version of our API-based model, **Qwen-Plus**, against leading proprietary and open-source models, including GPT4-o, Claude-3.5-Sonnet, Llama-3.1-405B, and DeepSeek-V2.5. This comparison showcases Qwen-Plus's competitive standing in the current landscape of large language models. We show that **Qwen-Plus** significantly outcompetes DeepSeek-V2.5 and demonstrates competitive performance against Llama-3.1-405B, while still underperforming compared to GPT4-o and Claude-3.5-Sonnet in some aspects. This benchmarking not only highlights Qwen-Plus's strengths but also identifies areas for future improvement, reinforcing our commitment to continuous enhancement and innovation in the field of large language models.

{{< figure src="https://qianwen-res.oss-cn-beijing.aliyuncs.com/Qwen2.5/qwen-plus-instruct.001.jpeg" width="100%" alt="Qwen-Plus Instruct Performance" >}}


A significant update in Qwen2.5 is the reintroduction of our 14B and 32B models, **Qwen2.5-14B** and **Qwen2.5-32B**. These models outperform baseline models of comparable or larger sizes, such as Phi-3.5-MoE-Instruct and Gemma2-27B-IT, across diverse tasks. They achieve an optimal balance between model size and capability, delivering performance that matches or exceeds some larger models. Additionally, our API-based model, **Qwen-Turbo**, offers highly competitive performance compared to the two open-source models, while providing a cost-effective and rapid service.

{{< figure src="https://qianwen-res.oss-cn-beijing.aliyuncs.com/Qwen2.5/qwen2.5-32B-instruct_wturbo.001.jpeg" width="100%" alt="Qwen2.5-32B Instruct Performance" >}}



In recent times, there has been a notable shift towards small language models (SLMs). Although SLMs have historically trailed behind their larger counterparts (LLMs), the performance gap is rapidly diminishing. Remarkably, even models with just 3 billion parameters are now delivering highly competitive results. The accompanying figure illustrates a significant trend: newer models achieving scores above 65 in MMLU are increasingly smaller, underscoring the accelerated growth in knowledge density among language models. Notably, our **Qwen2.5-3B** stands out as a prime example, achieving impressive performance with only around 3 billion parameters, showcasing its efficiency and capability compared to its predecessors.

{{< figure src="https://qianwen-res.oss-cn-beijing.aliyuncs.com/Qwen2.5/qwen2.5-small.jpg" width="100%" alt="Qwen2.5 Small Model" >}}

In addition to the notable enhancements in benchmark evaluations, we have refined our post-training methodologies. Our four key updates include support for long text generation of up to 8K tokens, significantly improved comprehension of structured data, more reliable generation of structured outputs, particularly in JSON format, and enhanced performance across diverse system prompts, which facilitates effective role-playing. Check the LLM blog for details about how to leverage these capabilities.


## Qwen2.5-Coder

Since the launch of CodeQwen1.5, we have attracted numerous users who rely on this model for various coding tasks, such as debugging, answering coding-related questions, and providing code suggestions. Our latest iteration, Qwen2.5-Coder, is specifically designed for coding applications. In this section, we present the performance results of Qwen2.5-Coder-7B-Instruct, benchmarked against leading open-source models, including those with significantly larger parameter sizes.

{{< figure src="https://qianwen-res.oss-cn-beijing.aliyuncs.com/Qwen2.5/Qwen2.5-Coder/coder-main.png" width="100%" alt="Qwen2.5-Coder Instruct Performance" >}}

We believe that Qwen2.5-Coder is an excellent choice as your personal coding assistant. Despite its smaller size, it outperforms many larger language models across a range of programming languages and tasks, demonstrating its exceptional coding capabilities.


## Qwen2.5-Math

In terms of the math specific language models, we released the first models, Qwen2-Math, last month, and this time, compared to Qwen2-Math, Qwen2.5-Math has been pretrained larger-scale of math related data, including the synthetic data generated by Qwen2-Math. Additionally we extend the support of Chinese this time and we also strengthen its reasoning capabilities by endowing it with the abilities to perform CoT, PoT, and TIR. The general performance of Qwen2.5-Math-72B-Instruct surpasses both Qwen2-Math-72B-Instruct and GPT4-o, and even very small expert model like Qwen2.5-Math-1.5B-Instruct can achieve highly competitive performance against large language models.

{{< figure src="http://qianwen-res.oss-cn-beijing.aliyuncs.com/Qwen2.5/2024-08-qwen2.5-math-allsize.png" width="100%" alt="Qwen2.5 Math Performance Across All Sizes" >}}


# Develop with Qwen2.5

The simplest way to use is through [Hugging Face Transfomer]() as demonstrated in the [model card](https://huggingface.co/Qwen/Qwen2.5-7B-Instruct):

```python
from transformers import AutoModelForCausalLM, AutoTokenizer
model_name = "Qwen/Qwen2.5-7B-Instruct"
model = AutoModelForCausalLM.from_pretrained(
    model_name,
    torch_dtype="auto",
    device_map="auto"
)
tokenizer = AutoTokenizer.from_pretrained(model_name)
prompt = "Give me a short introduction to large language model."
messages = [
    {"role": "user", "content": prompt}
]
text = tokenizer.apply_chat_template(
    messages,
    tokenize=False,
    add_generation_prompt=True
)
model_inputs = tokenizer([text], return_tensors="pt").to(model.device)
generated_ids = model.generate(
    **model_inputs,
    max_new_tokens=512
)
generated_ids = [
    output_ids[len(input_ids):] for input_ids, output_ids in zip(model_inputs.input_ids, generated_ids)
]
response = tokenizer.batch_decode(generated_ids, skip_special_tokens=True)[0]
```

To use Qwen2.5 with vLLM, running the following command can deploy an OpenAI API compatible service:

```python
python -m vllm.entrypoints.openai.api_server \
    --model Qwen/Qwen2.5-7B-Instruct
```

or use `vllm serve` if you use `vllm>=0.5.3`. Then you can communicate with Qwen2.5 via `curl`:

```bash
curl http://localhost:8000/v1/chat/completions -H "Content-Type: application/json" -d '{
  "model": "Qwen/Qwen2.5-7B-Instruct",
  "messages": [
    {"role": "user", "content": "Tell me something about large language models."}
  ],
  "temperature": 0.7,
  "top_p": 0.8,
  "repetition_penalty": 1.05,
  "max_tokens": 512
}'
```

Furthermore, Qwen2.5 supports vllm's built-in tool calling. This functionality requires `vllm>=0.6`. If you want to enable this functionality, please start vllm's OpenAI-compatible service with:
```bash
vllm serve Qwen/Qwen2.5-7B-Instruct --enable-auto-tool-choice --tool-call-parser hermes
```
You can then use it in the same way you use [GPT's tool calling](https://cookbook.openai.com/examples/how_to_call_functions_with_chat_models).

Qwen2.5 also supports [Ollama's tool calling](https://ollama.com/blog/tool-support). You can use it by starting Ollama's OpenAI-compatible service and using it in the same way you use GPT's tool calling.

Qwen2.5's chat template also includes a tool calling template, meaning that you can use Hugging Face [transformers' tool calling support](https://huggingface.co/docs/transformers/main/en/chat_templating#advanced-tool-use--function-calling). 

The vllm / Ollama / transformers tool calling support uses a tool calling template inspired by [Nous' Hermes](https://huggingface.co/NousResearch/Hermes-3-Llama-3.1-8B). Historically, [Qwen-Agent](https://github.com/QwenLM/Qwen-Agent) provided tool calling support using Qwen2's own tool calling template (which is harder to be integrated with vllm and Ollama), and Qwen2.5 maintains compatibility with Qwen2's template and Qwen-Agent as well.

<br>

# Friends of Qwen


💗 Qwen is nothing without its friends! So many thanks to the support of these old buddies and new friends :

- [Hugging Face Transformers](https://huggingface.co/)

- Finetuning: [Peft](https://github.com/huggingface/peft), [ChatLearn](https://github.com/alibaba/ChatLearn/), [Llama-Factory](https://github.com/hiyouga/LLaMA-Factory), [Axolotl](https://github.com/OpenAccess-AI-Collective/axolotl), [Firefly](https://github.com/yangjianxin1/Firefly), [Swift](https://github.com/modelscope/swift), [XTuner](https://github.com/InternLM/xtuner), [Unsloth](https://unsloth.ai/), [Liger Kernel](https://github.com/linkedin/Liger-Kernel)

- Quantization: [AutoGPTQ](https://github.com/AutoGPTQ/AutoGPTQ), [AutoAWQ](https://github.com/casper-hansen/AutoAWQ), [Neural Compressor](https://github.com/intel/neural-compressor)  

- Deployment: [vLLM](https://github.com/vllm-project/vllm), [SGL](https://github.com/sgl-project/sglang), [SkyPilot](https://github.com/skypilot-org/skypilot), [TensorRT-LLM](https://github.com/NVIDIA/TensorRT-LLM), [OpenVino](https://github.com/openvinotoolkit/openvino), [TGI](https://github.com/huggingface/text-generation-inference), [Xinference](https://inference.readthedocs.io/)

- API Platforms: [Together](https://www.together.ai/), [Fireworks](https://fireworks.ai/), [OpenRouter](https://openrouter.ai/), [Sillicon Flow](https://siliconflow.cn/)

- Local Run: [MLX](https://github.com/ml-explore/mlx), [Llama.cpp](https://github.com/ggerganov/llama.cpp), [Ollama](https://ollama.com/), [LM Studio](https://lmstudio.ai/), [Jan](https://jan.ai/)

- Agent and RAG Frameworks: [Dify](https://dify.ai/), [LlamaIndex](https://www.llamaindex.ai/), [CrewAI](https://www.crewai.com/)  

- Evaluation: [LMSys](https://chat.lmsys.org/), [OpenCompass](https://opencompass.org.cn/home), [Open LLM Leaderboard](https://huggingface.co/spaces/HuggingFaceH4/open_llm_leaderboard)  

- Model Training: [Arcee AI](https://www.arcee.ai/), [Sailor](https://sailorllm.github.io/), [Dolphin](https://huggingface.co/cognitivecomputations), [Openbuddy](https://github.com/OpenBuddy/OpenBuddy)

We would like to extend our heartfelt gratitude to the numerous teams and individuals who have contributed to Qwen, even if they haven't been specifically mentioned. Your support is invaluable, and we warmly invite more friends to join us in this exciting journey. Together, we can enhance collaboration and drive forward the research and development of the open-source AI community, making it stronger and more innovative than ever before.


# What's Next?

While we are thrilled to launch numerous high-quality models simultaneously, we recognize that significant challenges remain. Our recent releases demonstrate our commitment to developing robust foundation models across language, vision-language, and audio-language domains. However, it is crucial to integrate these different modalities into a single model to enable seamless end-to-end processing of information across all three. Additionally, although we have made strides in enhancing reasoning capabilities through data scaling, we are inspired by the recent advancements in reinforcement learning (e.g., o1) and are dedicated to further improving our models' reasoning abilities by scaling inference compute. We look forward to introducing you to the next generation of models soon! Stay tuned for more exciting developments!



# Citation

We are going to release the technical report for Qwen2.5 very soon. Before the release, feel free to cite our Qwen2 paper as well as this blog

```
@misc{qwen2.5,
    title = {Qwen2.5: A Party of Foundation Models},
    url = {https://qwenlm.github.io/blog/qwen2.5/},
    author = {Qwen Team},
    month = {September},
    year = {2024}
}
```

```
@article{qwen2,
  title={Qwen2 technical report},
  author={Yang, An and Yang, Baosong and Hui, Binyuan and Zheng, Bo and Yu, Bowen and Zhou, Chang and Li, Chengpeng and Li, Chengyuan and Liu, Dayiheng and Huang, Fei and others},
  journal={arXiv preprint arXiv:2407.10671},
  year={2024}
}
```

