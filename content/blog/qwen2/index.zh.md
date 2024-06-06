---
title: "你好，Qwen2"
date: 2024-06-07T00:00:00+08:00
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

{{< figure src="https://qianwen-res.oss-accelerate-overseas.aliyuncs.com/assets/blog/qwen2/qwen.jpg#center" width="100%">}}

{{< button href="https://github.com/QwenLM/Qwen2" label="GITHUB" external=true >}}
{{< button href="https://huggingface.co/Qwen" label="HUGGING FACE" external=true >}}
{{< button href="https://modelscope.cn/organization/qwen" label="MODELSCOPE" external=true >}}
{{< button href="https://huggingface.co/spaces/Qwen/Qwen2-72B-Instruct" label="DEMO" external=true >}}
{{< button href="https://discord.gg/yPEP2vHTu4" label="DISCORD" external=true >}}

# 简介
历经数月努力, 我们很高兴迎来了Qwen系列模型从Qwen1.5到Qwen2的重大升级。这一次，我们为大家带来了：

* 5个尺寸的预训练和指令微调模型, 包括Qwen2-0.5B、Qwen2-1.5B、Qwen2-7B、Qwen2-57B-A14B以及**Qwen2-72B**；
* 在中文英语的基础上，训练数据中增加了**27**种语言相关的高质量数据；
* 多个评测基准上的领先表现；
* 代码和数学能力显著提升；  
* 增大了上下文长度支持，最高达到**128K** tokens（Qwen2-72B-Instruct）。
<br><br>

目前，我们已在Hugging Face和ModelScope上同步开源。期待听到你们的使用反馈！

## 模型基础信息

Qwen2系列包含5个尺寸的预训练和指令微调模型，其中包括Qwen2-0.5B、Qwen2-1.5B、Qwen2-7B、Qwen2-57B-A14B和Qwen2-72B。如下表所示:

|  模型  | Qwen2-0.5B | Qwen2-1.5B | Qwen2-7B | Qwen2-57B-A14B | Qwen2-72B |
| :--------| :--------: | :--------: | :------: | :------------: | :-------: |
| 参数量 |  0.49B |  1.54B | 7.07B | 57.41B | 72.71B | 
| 非Embedding参数量 | 0.35B | 1.31B | 5.98B | 56.32B | 70.21B |
| GQA |  True | True | True | True | True |
| Tie Embedding |  True | True | False | False | False |
| 上下文长度 | 32K | 32K | 128K | 64K | 128K |

在Qwen1.5系列中，只有32B和110B的模型使用了GQA。这一次，所有尺寸的模型都使用了GQA，以便让大家体验到GQA带来的推理加速和显存占用降低的优势。针对小模型，由于embedding参数量较大，我们使用了tie embedding的方法让输入和输出层共享参数，增加非embedding参数的占比。

上下文长度方面，所有的预训练模型均在32K tokens的数据上进行训练，并且我们发现其在128K tokens时依然能在PPL评测中取得不错的表现。然而，对指令微调模型而言，除PPL评测之外还需要进行[大海捞针](https://github.com/gkamradt/LLMTest_NeedleInAHaystack)等长序列理解实验。在该表中，我们根据大海捞针实测结果，列出了各个指令微调模型所支持的最大上下文长度。而在使用YARN这类方法时，Qwen2-7B-Instruct和Qwen2-72B-Instruct均实现了长达128K tokens上下文长度的支持。

我们投入了大量精力研究如何扩展多语言预训练和指令微调数据的规模并提升其质量，从而提升模型的多语言能力。尽管大语言模型本身具有一定的泛化性，我们还是针对性地对除中英文以外的27种语言进行了增强：

|   地区 | 语言 | 
| :--------| :---------------------: |
| 西欧 | 德语、法语、西班牙语、葡萄牙语、 意大利语、荷兰语|
| 东欧及中欧 | 俄语、捷克语、波兰语 |
| 中东 | 阿拉伯语、波斯语、希伯来语、土耳其语 |
| 东亚 | 日语、韩语 |
| 东南亚 | 越南语、泰语、印尼语、马来语、老挝语、缅甸语、宿务语、高棉语、菲律宾语 |
| 南亚| 印地语、孟加拉语、乌尔都语 |

此外，我们针对性地优化了多语言场景中常见的语言转换（code switch）问题，模型当前发生语言转换的概率大幅度降低。我们使用容易触发语言转换现象的提示词进行测试，观察到Qwen2系列模型在此方面能力的显著提升。


# 模型评测

相比Qwen1.5，Qwen2在大规模模型实现了非常大幅度的效果提升。我们对Qwen2-72B进行了全方位的评测。在针对预训练语言模型的评估中，对比当前最优的开源模型，Qwen2-72B在包括自然语言理解、知识、代码、数学及多语言等多项能力上均显著超越当前领先的模型，如Llama-3-70B以及Qwen1.5最大的模型Qwen1.5-110B。这得益于其预训练数据及训练方法的优化。

{{< figure src="https://qianwen-res.oss-accelerate-overseas.aliyuncs.com/assets/blog/qwen2/qwen2-72b.jpg#center" width="100%">}}

大规模预训练后，我们对模型进行精细的微调，以提升其智能水平，让其表现更接近人类。这个过程进一步提升了代码、数学、推理、指令遵循、多语言理解等能力。此外，模型学会对齐人类价值观，它也随之变得更加对人类有帮助、诚实以及安全。我们的微调过程遵循的原则是使训练尽可能规模化的同时并且尽可能减少人工标注。我们探索了如何采用多种自动方法以获取高质量、可靠、有创造力的指令和偏好数据，其中包括针对数学的[拒绝采样](https://arxiv.org/pdf/2308.01825)、针对代码和指令遵循的代码执行反馈、针对创意写作的回译、针对角色扮演的[scalable oversight](https://arxiv.org/pdf/2401.12474)、等等。在训练方面，我们结合了有监督微调、反馈模型训练以及在线DPO等方法。我们还采用了[在线模型合并](https://arxiv.org/pdf/2405.17931)的方法减少对齐税。这些做法都大幅提升了模型的基础能力以及模型的智能水平。

{{< figure src="https://qianwen-res.oss-accelerate-overseas.aliyuncs.com/assets/blog/qwen2/qwen2-72b-instruct.jpg#center" width="100%">}}

我们全面评估了Qwen2-72B-Instruct在16个基准测试中的表现。Qwen2-72B-Instruct在提升基础能力以及对齐人类价值观这两方面取得了较好的平衡。相比Qwen1.5的72B模型，Qwen2-72B-Instruct在所有评测中均大幅超越，并且了取得了匹敌Llama-3-70B-Instruct的表现。

而在小模型方面，Qwen2系列模型基本能够超越同等规模的最优开源模型甚至更大规模的模型。相比近期推出的最好的模型，Qwen2-7B-Instruct依然能在多个评测上取得显著的优势，尤其是代码及中文理解上。

{{< figure src="https://qianwen-res.oss-accelerate-overseas.aliyuncs.com/assets/blog/qwen2/qwen2-7b.jpg#center" width="100%">}}

# 亮点

## 代码 & 数学
我们持续投入提升Qwen的代码及数学能力。在代码方面，我们成功将[CodeQwen1.5](https://qwenlm.github.io/blog/codeqwen1.5/)的成功经验融入Qwen2的研发中，实现了在多种编程语言上的显著效果提升。而在数学方面，大规模且高质量的数据帮助Qwen2-72B-Instruct实现了数学解题能力的飞升。

{{< figure src="https://qianwen-res.oss-accelerate-overseas.aliyuncs.com/assets/blog/qwen2/qwen2-code-math.jpg#center" width="100%">}}




## 长文本处理

Qwen2系列中的所有Instruct模型，均在32k上下文长度上进行训练，并通过[YARN](https://arxiv.org/abs/2309.00071)或[Dual Chunk Attention](https://arxiv.org/abs/2402.17463)等技术扩展至更长的上下文长度。

下图展示了我们在[Needle in a Haystack](https://github.com/gkamradt/LLMTest_NeedleInAHaystack)测试集上的结果。值得注意的是，Qwen2-72B-Instruct能够完美处理128k上下文长度内的信息抽取任务。结合其本身强大的性能，只要有充足的算力，它一定能成为你处理长文本任务的首选！

此外，Qwen2系列中的其他模型的表现也十分突出：Qwen2-7B-Instruct几乎完美地处理长达128k的上下文；Qwen2-57B-A14B-Instruct则能处理64k的上下文长度；而该系列中的两个较小模型则支持32k的上下文长度。

除了长上下文模型，我们还开源了一个智能体解决方案，用于高效处理100万tokens级别的上下文。更多详细信息，请参见[我们关于该主题的博客文章](https://qwenlm.github.io/blog/qwen-agent-2405/)。

{{< figure src="https://qianwen-res.oss-accelerate-overseas.aliyuncs.com/assets/blog/qwen2/qwen2_needle_in_haystack.png#center" width="100%">}}

## 安全

下表展示了大型模型在四种多语言不安全查询类别（非法活动、欺诈、色情、隐私暴力）中生成有害响应的比例。测试数据来源于[Jailbreak](https://github.com/verazuo/jailbreak_llms/tree/main)，并被翻译成多种语言进行评估。我们发现Llama-3在处理多语言提示方面表现不佳，因此没有将其纳入比较。通过显著性检验（P值），我们发现Qwen2-72B-Instruct模型在安全性方面与GPT-4的表现相当，并且显著优于Mistral-8x22B模型。

| Language |  | Illegal Activity |  |  | Fraud |  |  | Pornography |  |  | Privacy Violence |  |
|---|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
|  | GPT-4 | Mistral-8x22B | Qwen2-72B-Instruct | GPT-4 | Mistral-8x22B | Qwen2-72B-Instruct | GPT-4 | Mistral-8x22B | Qwen2-72B-Instruct | GPT-4 | Mistral-8x22B | Qwen2-72B-Instruct |
| zh | **0%** | 13% | **0%** | **0%** | 17% | **0%** | **43%** | 47% | 53% | **0%** | 10% | **0%** |
| en | **0%** | 7% | **0%** | **0%** | 23% | **0%** | **37%** | 67% | 63% | **0%** | 27% | 3% |
| ar | **0%** | 13% | **0%** | **0%** | 7% | **0%** | **15%** | 26% | **15%** | 3% | 13% | **0%** |
| es | **0%** | 7% | **0%** | 3% | **0%** | **0%** | **48%** | 64% | 50% | **3%** | 7% | **3%** |
| fr | **0%** | 3% | **0%** | **3%** | **3%** | 7% | **3%** | 19% | 7% | **0%** | 27% | **0%** |
| ko | **0%** | 4% | **0%** | **3%** | 8% | 4% | 17% | 29% | **10%** | **0%** | 26% | 4% |
| pt | **0%** | 7% | **0%** | **3%** | 7% | **3%** | **47%** | 57% | **47%** | **4%** | 26% | **4%** |
| th | **0%** | 10% | **0%** | 7% | 23% | **3%** | 13% | 17% | **10%** | 13% | **7%** | **7%** |
| vi | **0%** | 4% | **0%** | 4% | 11% | **0%** | **22%** | 26% | **22%** | **0%** | **0%** | **0%** |
| Average | **0%** | 8% | **0%** | 3% | 11% | **2%** | **27%** | 39% | 31% | 3% | 16% | **2%** |

# 使用Qwen2

现在，模型均已开源在Hugging Face和ModelScope上。欢迎查阅模型卡了解具体用法和更多关于模型的信息，如特性、指标等。

长时间以来，来自开源生态的朋友们一致支持着Qwen的发展，包括微调（[Axolotl](https://github.com/OpenAccess-AI-Collective/axolotl)、[Llama-Factory](https://github.com/hiyouga/LLaMA-Factory)、[Firefly](https://github.com/yangjianxin1/Firefly)、[Swift](https://github.com/modelscope/swift)、[XTuner](https://github.com/InternLM/xtuner)）、量化（[AutoGPTQ](https://github.com/AutoGPTQ/AutoGPTQ)、[AutoAWQ](https://github.com/casper-hansen/AutoAWQ)、[Neural Compressor](https://github.com/intel/neural-compressor)）、部署（[vLLM](https://github.com/vllm-project/vllm)、[SGL](https://github.com/sgl-project/sglang)、[SkyPilot](https://github.com/skypilot-org/skypilot)、[TensorRT-LLM](https://github.com/NVIDIA/TensorRT-LLM)、[OpenVino](https://github.com/openvinotoolkit/openvino)、[TGI](https://github.com/huggingface/text-generation-inference)）、本地运行（[MLX](https://github.com/ml-explore/mlx)、[Llama.cpp](https://github.com/ggerganov/llama.cpp)、[Ollama](https://ollama.com/)、[LM Studio](https://lmstudio.ai/)）、Agent及RAG（检索增强生成）框架（[LlamaIndex](https://www.llamaindex.ai/), [CrewAI](https://www.crewai.com/), [OpenDevin](https://github.com/OpenDevin/OpenDevin/)）、评测（[LMSys](https://lmsys.org/), [OpenCompass](https://opencompass.org.cn/home), [Open LLM Leaderboard](https://huggingface.co/spaces/HuggingFaceH4/open_llm_leaderboard)）、模型二次开发（[Dolphin](https://huggingface.co/cognitivecomputations), [Openbuddy](https://github.com/OpenBuddy/OpenBuddy)）。想了解更多关于如何在三方框架中使用Qwen，欢迎阅读各项目的官方文档以及我们的[官方文档](https://qwen.readthedocs.io/en/latest/)了解更多用法！


{{< figure src="https://qianwen-res.oss-accelerate-overseas.aliyuncs.com/assets/blog/qwen2/logo_v2.png#center" width="80%">}}

当然，这里还有很多一直帮助我们的朋友们未被提及。我们真诚地感谢大家的支持，我们也希望社区的合作能够携手推动开源AI的发展。


# 模型许可

此次我们采用不同的模型许可。除了Qwen2-72B依旧使用此前的Qianwen License外，其余模型，包括Qwen2-0.5B、Qwen2-1.5B、Qwen2-7B以及Qwen2-57B-A14B在内，均采用**Apache 2.0**的许可。我们希望本次开放程度的提升能够加速Qwen2在全球各地的落地及商业应用。


# Qwen2的下一步是什么？
我们还在训练更大的模型，继续探索模型及数据的Scaling Law。此外，我们还将把Qwen2扩展成多模态模型，融入视觉及语音的理解。在不久的将来，我们还会继续开源新模型。敬请期待！


# 引用

不久后我们将推出Qwen2的技术报告。欢迎引用！

```
@article{qwen2,
  title={Qwen2 Technical Report},
  year={2024}
}
```

# 附录



## 预训练语言模型评测

对预训练模型的评估主要集中在自然语言理解、通用问题回答、代码、数学、科学知识、推理、多语言能力等能力上。

评测数据集包括
 
**英语任务**: MMLU (5-shot)、MMLU-Pro (5-shot)、GPQA (5shot)、Theorem QA (5-shot)、BBH (3-shot)、HellaSwag (10-shot)、Winogrande (5-shot)、TruthfulQA (0-shot)以及ARC-C (25-shot)
 
**代码任务**: EvalPlus (0-shot) (HumanEval、MBPP, HumanEval+、MBPP+)、MultiPL-E (0-shot) (Python、C++、JAVA、PHP、TypeScript、C#、Bash和JavaScript)
  
**数学任务**: GSM8K (4-shot)、MATH (4-shot)
 
**中文任务**: C-Eval(5-shot)、CMMLU (5-shot)
 
**多语言任务**: Multi-Exam (M3Exam 5-shot、IndoMMLU 3-shot、ruMMLU 5-shot、mMMLU 5-shot)、Multi-Understanding (BELEBELE 5-shot、XCOPA 5-shot、XWinograd 5-shot、XStoryCloze 0-shot、PAWS-X 5-shot)、Multi-Mathematics (MGSM 8-shot)、Multi-Translation (Flores-101 5-shot)
 
### Qwen2-72B
|  Datasets  | DeepSeek-V2 | Mixtral-8x22B   |   Llama-3-70B  |   Qwen1.5-72B  |   Qwen1.5-110B  |  **Qwen2-72B**  |
| :--------| :---------: | :------------: | :------------: | :------------: | :------------: |:------------: |
|Architecture | MoE | MoE | Dense | Dense | Dense | Dense |
|#Activated Params | 21B | 39B | 70B | 72B | 110B | 72B |
|#Params | 236B | 140B | 70B | 72B | 110B   | 72B|
|   ***English***  |    |    |   |    |	    |	    |
|MMLU |78.5 | 77.8  | 79.5 | 77.5 | 80.4 |  **84.2**  |
|MMLU-Pro | - | 49.5  | 52.8 | 45.8 | 49.4 |  **55.6**  |
|GPQA | -| 34.3  | 36.3 | 36.3 | 35.9 |  **37.9**  |
|Theorem QA | -| 35.9  | 32.3 | 29.3 | 34.9 |  **43.1**  |
|BBH  | 78.9 |78.9   | 81.0 | 65.5 | 74.8 |  **82.4**  |
|HellaSwag  | 87.8 | **88.7**   | 88.0 |  86.0 | 87.5 | 87.6 |
|WindoGrande  | 84.8|85.0  |  **85.3**  |  83.0 | 83.5 |  85.1 |
|ARC-C  | 70.0| **70.7**   | 68.8 | 65.9 | 69.6 |  68.9 |
|TruthfulQA  | 42.2 | 51.0  | 45.6 |  **59.6**  | 49.6 | 54.8 |
|   ***Coding***  |    |    |   |    |	    |	    |
|HumanEval | 45.7 | 46.3  | 48.2 | 46.3 | 54.3 |  **64.6**   |
|MBPP |73.9 | 71.7  | 70.4 | 66.9 | 70.9 |  **76.9**   |
|EvalPlus | 55.0 | 54.1  | 54.8 | 52.9 | 57.7 |  **65.4**   |
|MultiPL-E |44.4 | 46.7  | 46.3 | 41.8 | 52.7 |  **59.6**   |
|   ***Mathematics***  |    |    |   |    |	    |	    |
|GSM8K | 79.2 | 83.7   | 83.0 | 79.5 | 85.4 |  **89.5**  |
|MATH  | 43.6 | 41.7  | 42.5 | 34.1 | 49.6 |  **51.1**  |
|   ***Chinese***  |    |    |   |    |	    |	    |
|C-Eval | 81.7 | 54.6    |  65.2 |  84.1 | 89.1 |   **91.0**  |
|CMMLU   | 84.0 | 53.4  | 67.2 | 83.5 | 88.3 |  **90.1**  |
|   ***Multilingual***  |    |    |   |    |	    |	    |
|Mulit-Exam   | 67.5 | 63.5 |   70.0    |  66.4 |  75.6 |   **76.6**  |
|Multi-Understanding | 77.0 |  77.7    |  79.9 |  78.2 | 78.2 |   **80.7**  |
|Multi-Mathematics |  58.8 | 62.9    |  67.1 |  61.7 | 64.4 |   **76.0**  |
|Multi-Translation |   36.0 | 23.3    |   **38.0**  |  35.6 | 36.2 |  37.8 |

### Qwen2-57B-A14B
|  Datasets  |  Jamba  |   Mixtral-8x7B |   Yi-1.5-34B  |   Qwen1.5-32B  |  ****Qwen2-57B-A14B****  |
| :--------| :---------: | :------------: | :------------: | :------------: | :------------: |
|Architecture | MoE | MoE | Dense | Dense | MoE |
|#Activated Params | 12B | 12B | 34B | 32B | 14B |
|#Params | 52B | 47B | 34B | 32B | 57B   |
|   ***English***  |    |    |   |    |	    |
|MMLU | 67.4 | 71.8 | **77.1** | 74.3 | 76.5 |
|MMLU-Pro | - | 41.0 | **48.3** | 44.0 | 43.0 |
|GPQA | - | 29.2 | - | 30.8 | **34.3** |
|Theorem QA | - | 23.2 | - | 28.8 | **33.5** |
|BBH  | 45.4 |  50.3  | **76.4** | 66.8 | 67.0 |
|HellaSwag  | **87.1** |  86.5  | 85.9 |  85.0 | 85.2 |
|Winogrande  | 82.5 |  81.9  | **84.9** |  81.5 |  79.5 |
|ARC-C  | 64.4 |  **66.0**  | 65.6 | 63.6 |  64.1 |
|TruthfulQA  | 46.4 |  51.1  | 53.9 | 57.4 |  **57.7** |
|   ***Coding***  |    |    |   |    |	    |
|HumanEval | 29.3 | 37.2 | 46.3 | 43.3 | **53.0**  |
|MBPP | - | 63.9 | 65.5 | 64.2 | **71.9**  |
|EvalPlus | - | 46.4 | 51.9 | 50.4 | **57.2**  |
|MultiPL-E | - | 39.0 | 39.5 | 38.5 | **49.8**  |
|   ***Mathematics***  |    |    |   |    |	    |
|GSM8K | 59.9 |  62.5  | **82.7** | 76.8 | 80.7 |
|MATH  | - |  30.8  | 41.7 | 36.1 | **43.0** |
|   ***Chinese***  |    |    |   |    |	    |
|C-Eval   | - |   -    |  - |  83.5 |  **87.7** |
|CMMLU   | - |   -    | 84.8 | 82.3 | **88.5** |
|   ***Multilingual***  |    |    |   |    |	    |
|Multi-Exam   | - |   56.1    |  58.3 |  61.6 |  **65.5** |
|Multi-Understanding | - |   70.7    |  73.9 |  76.5 |  **77.0** |
|Multi-Mathematics | - |   45.0    |  49.3 |  56.1 |  **62.3** |
|Multi-Translation | - |   29.8    |  30.0 |  33.5 |  **34.5** |
  
### Qwen2-7B
|  Datasets  |  Mistral-7B  |   Gemma-7B |   Llama-3-8B  |   Qwen1.5-7B  |  Qwen2-7B  |
| :--------| :---------: | :------------: | :------------: | :------------: | :------------: |
|# Params | 7.2B | 8.5B | 8.0B | 7.7B | 7.6B  |
|# Non-emb Params | 7.0B | 7.8B | 7.0B | 6.5B | 6.5B |
|   ***English***  |    |    |   |    |	    |
|MMLU | 64.2 | 64.6 | 66.6 | 61.0 | **70.3** |
|MMLU-Pro | 30.9 | 33.7 | 35.4 | 29.9 | **40.0** |
|GPQA | 24.7 | 25.7 | 25.8 | 26.7 | **31.8** |
|Theorem QA | 19.2 | 21.5 | 22.1 | 14.2 | **31.1** |
|BBH  | 56.1 |  55.1  | 57.7 | 40.2 | **62.6** |
|HellaSwag  | **83.2** |  82.2  | 82.1 | 78.5 | 80.7 |
|Winogrande  | 78.4 |  **79.0**  | 77.4 |  71.3 |  77.0 |
|ARC-C  | 60.0 |  **61.1**  | 59.3 | 54.2 |  60.6 |
|TruthfulQA  | 42.2 |  44.8  | 44.0 | 51.1 |  **54.2** |
|   ***Coding***  |    |    |   |    |	    |
|HumanEval | 29.3 | 37.2 | 33.5 | 36.0 | **51.2**  |
|MBPP | 51.1 | 50.6 | 53.9 | 51.6 | **65.9**  |
|EvalPlus | 36.4 | 39.6 | 40.3 | 40.0 | **54.2**  |
|MultiPL-E | 29.4 | 29.7 | 22.6 | 28.1 | **46.3**  |
|   ***Mathematics***  |    |    |   |    |	    |
|GSM8K | 52.2 |  46.4  | 56.0 | 62.5 | **79.9** |
|MATH  | 13.1 |  24.3  | 20.5 | 20.3 | **44.2** |
|   ***Chinese***  |    |    |   |    |	    |
|C-Eval   | 47.4 |   43.6    |  49.5 |  74.1 |  **83.2** |
|CMMLU   | - |   -    | 50.8 | 73.1 | **83.9** |
|   ***Multilingual***  |    |    |   |    |	    |
|Multi-Exam   | 47.1 |   42.7    |  52.3 |  47.7 |  **59.2** |
|Multi-Understanding | 63.3 |  58.3    |  68.6 |  67.6 |  **72.0** |
|Multi-Mathematics | 26.3 |   39.1    |  36.3 |  37.3 |  **57.5** |
|Multi-Translation | 23.3 |   31.2    |  **31.9** |  28.4 |  31.5 |

### Qwen2-0.5B & Qwen2-1.5B
|  Datasets  |  Phi-2 |   Gemma-2B | MiniCPM |  Qwen1.5-1.8B  |   Qwen2-0.5B  |  Qwen2-1.5B  |
| :--------| :---------: | :------------: | :------------: |:------------: | :------------: | :------------: |
|#Non-Emb Params | 2.5B | 2.0B | 2.4B | 1.3B | 0.35B | 1.3B |
|MMLU | 52.7 | 42.3 | 53.5 | 46.8 | 45.4 | **56.5** |
|MMLU-Pro | - | 15.9 | - | - | 14.7 | 21.8 |
|Theorem QA | - | - | - |- | 8.9 | **15.0** |
|HumanEval | 47.6 |  22.0 |**50.0**| 20.1 | 22.0 | 31.1 |
|MBPP | **55.0** | 29.2 | 47.3 | 18.0 | 22.0 | 37.4  |
|GSM8K | 57.2 |  17.7  | 53.8 | 38.4 | 36.5 | **58.5** |
|MATH  | 3.5 |  11.8  | 10.2 | 10.1 | 10.7 | **21.7** |
|BBH  | **43.4** |  35.2 | 36.9 | 24.2 | 28.4 | 37.2 |
|HellaSwag  | **73.1** |  71.4 | 68.3 | 61.4 |  49.3 | 66.6 |
|Winogrande  | **74.4** |  66.8 | -| 60.3 |  56.8 |  66.2 |
|ARC-C  | **61.1** |  48.5  | -| 37.9 | 31.5 |  43.9 |
|TruthfulQA  | 44.5 |  33.1  | -| 39.4 | 39.7 |  **45.9** |
|C-Eval   | 23.4 |   28.0    | 51.1| 59.7 |  58.2 |  **70.6** |
|CMMLU   | 24.2 |   -    | 51.1 | 57.8 | 55.1 | **70.3** |
  
## 指令微调模型评测

### Qwen2-72B-Instruct
| Datasets | Llama-3-70B-Instruct | Qwen1.5-72B-Chat | **Qwen2-72B-Instruct** |
| :--- | :---: | :---: | :---: |
| _**English**_ |  |  |  |
| MMLU | 82.0 | 75.6 | **82.3** |
| MMLU-Pro | 56.2 | 51.7 | **64.4** |
| GPQA | 41.9 | 39.4 | **42.4** |
| TheroemQA | 42.5 | 28.8 | **44.4** |
| MT-Bench | 8.95 | 8.61 | **9.12** |
| Arena-Hard | 41.1 | 36.1 | **48.1** |
| IFEval (Prompt Strict-Acc.) | 77.3 | 55.8 | **77.6** |
| _**Coding**_ |  |  |  |
| HumanEval | 81.7 | 71.3 | **86.0** |
| MBPP | **82.3** | 71.9 | 80.2 |
| MultiPL-E | 63.4 | 48.1 | **69.2** |
| EvalPlus | 75.2 | 66.9 | **79.0** |
| LiveCodeBench | 29.3 | 17.9 | **35.7** |
| _**Mathematics**_ |  |  |  |
| GSM8K | **93.0** | 82.7 | 91.1 |
| MATH | 50.4 | 42.5 | **59.7** |
| _**Chinese**_ |  |  |  |
| C-Eval | 61.6 | 76.1 | **83.8** |
| AlignBench | 7.42 | 7.28 | **8.27** |

### Qwen2-57B-A14B-Instruct
| Datasets | Mixtral-8x7B-Instruct-v0.1 | Yi-1.5-34B-Chat | Qwen1.5-32B-Chat | **Qwen2-57B-A14B-Instruct** |
| :--- | :---: | :---: | :---: | :---: |
|Architecture | MoE | Dense | Dense | MoE |
|#Activated Params | 12B | 34B | 32B | 14B |
|#Params | 47B | 34B | 32B | 57B   |
| _**English**_ |  |  |  |  |
| MMLU | 71.4 | **76.8** | 74.8 | 75.4 |
| MMLU-Pro | 43.3 | 52.3 | 46.4 | **52.8** |
| GPQA | - | - | 30.8 | **34.3** |
| TheroemQA | - | - | 30.9 | **33.1** |
| MT-Bench | 8.30 | 8.50 | 8.30 | **8.55** |
| _**Coding**_ |  |  |  |  |
| HumanEval | 45.1 | 75.2 | 68.3 | **79.9** |
| MBPP | 59.5 | **74.6** | 67.9 | 70.9 |
| MultiPL-E | - | - | 50.7 | **66.4** |
| EvalPlus | 48.5 | - | 63.6 | **71.6** |
| LiveCodeBench | 12.3 | - | 15.2 | **25.5** |
| _**Mathematics**_ |  |  |  |  |
| GSM8K | 65.7 | **90.2** | 83.6 | 79.6 |
| MATH | 30.7 | **50.1** | 42.4 | 49.1 |
| _**Chinese**_ |  |  |  |  |
| C-Eval | - | - | 76.7 | 80.5 |
| AlignBench | 5.70 | 7.20 | 7.19 | **7.36** |

### Qwen2-7B-Instruct
| Datasets | Llama-3-8B-Instruct | Yi-1.5-9B-Chat | GLM-4-9B-Chat | Qwen1.5-7B-Chat | Qwen2-7B-Instruct |
| :--- | :---: | :---: | :---: | :---: | :---: |
| _**English**_ |  |  |  |  |  |
| MMLU | 68.4 | 69.5 | **72.4** | 59.5 | 70.5 |
| MMLU-Pro | 41.0 | - | - | 29.1 | **44.1** |
| GPQA | **34.2** | - | **-** | 27.8 | 25.3 |
| TheroemQA | 23.0 | - | - | 14.1 | **25.3** |
| MT-Bench | 8.05 | 8.20 | 8.35 | 7.60 | **8.41** |
| _**Coding**_ |  |  |  |  |  |
| Humaneval | 62.2 | 66.5 | 71.8 | 46.3 | **79.9** |
| MBPP | **67.9** | - | - | 48.9 | 67.2 |
| MultiPL-E | 48.5 | - | - | 27.2 | **59.1** |
| Evalplus | 60.9 | - | - | 44.8 | **70.3** |
| LiveCodeBench | 17.3 | - | - | 6.0 | **26.6** |
| _**Mathematics**_ |  |  |  |  |  |
| GSM8K | 79.6 | **84.8** | 79.6 | 60.3 | 82.3 |
| MATH | 30.0 | 47.7 | **50.6** | 23.2 | 49.6 |
| _**Chinese**_ |  |  |  |  |  |
| C-Eval | 45.9 | - | 75.6 | 67.3 | **77.2** |
| AlignBench | 6.20 | 6.90 | 7.01 | 6.20 | **7.21** |

### Qwen2-0.5B-Instruct & Qwen2-1.5B-Instruct
| Datasets | Qwen1.5-0.5B-Chat | **Qwen2-0.5B-Instruct** | Qwen1.5-1.8B-Chat | **Qwen2-1.5B-Instruct** |
| :--- | :---: | :---: | :---: | :---: |
| MMLU | 35.0 | **37.9** | 43.7 | **52.4** |
| HumanEval | 9.1 | **17.1** | 25.0 | **37.8** |
| GSM8K | 11.3 | **40.1** | 35.3 | **61.6** |
| C-Eval | 37.2 | **45.2** | 55.3 | **63.8** |
| IFEval (Prompt Strict-Acc.) | 14.6 | **20.0** | 16.8 | **29.0** |

## 多语言能力评测

我们通过多个跨语言开放基准测试以及人工评估，比较了Qwen2指令微调模型与其他近期的大型语言模型。对于基准测试，我们展示了在2个评估数据集上的结果：
+ [M-MMLU](https://github.com/nlp-uoregon/mlmm-evaluation)： 来自Okapi的多语言常识理解数据集（我们在阿、德、西、法、意、荷、俄、乌、越、中这几个子集进行测试）
<!-- + [WMT23](https://www2.statmt.org/wmt23/translation-task.html): translation tasks between en, de, he, cs, ja, ru, uk and zh languages -->
+ [MGSM](https://arxiv.org/abs/2210.03057)：包含德、英、西、法、日、俄、泰、中和孟在内的数学评测。

结果如下所示：

| Models | M-MMLU (5-shot) | MGSM (0-shot, CoT) |
| :--- | :---: | :---: |
| **_Proprietary LLMs_** |  |  |
| GPT-4-0613  | 78.0 | 87.0 |
| GPT-4-Turbo-0409 | 79.3 | 90.5 |
| GPT-4o-0513 | 83.2 | 89.6 |
| Claude-3-Opus-20240229 | 80.1 | 91.0 |
| Claude-3-Sonnet-20240229 | 71.0 | 85.6 |
| **_Open-source LLMs_** |  |  |
| command-r-plus-110b | 65.5 | 63.5 |
| Qwen1.5-7B-Chat | 50.0 | 37.0 |
| Qwen1.5-32B-Chat | 65.0 | 65.0 |
| Qwen1.5-72B-Chat | 68.4 | 71.7 |
| **Qwen2-7B-Instruct** | **60.0** | **57.0** |
| **Qwen2-57B-A14B-Instruct** | **68.0** | **74.0** |
| **Qwen2-72B-Instruct** | **78.0** | **86.6** |

针对人工评测，我们使用内部评估集比较了Qwen2-72B-Instruct与GPT3.5、GPT4和Claude-3-Opus，该评测集包括10种语言：ar（阿拉伯语）、es（西班牙语）、fr（法语）、ko（韩语）、th（泰语）、vi（越南语）、pt（葡萄牙语）、id（印度尼西亚语）、ja（日语）和ru（俄语）。

| Models | ar | es | fr | ko | th | vi | pt | id | ja | ru | Average |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| Claude-3-Opus-20240229 | 4.15 | 4.31 | 4.23 | 4.23 | 4.01 | 3.98 | 4.09 | 4.40 | 3.85 | 4.25 | 4.15 |
| GPT-4o-0513 | 3.55 | 4.26 | 4.16 | 4.40 | 4.09 | 4.14 | 3.89 | 4.39 | 3.72 | 4.32 | 4.09 |
| GPT-4-Turbo-0409 | 3.44 | 4.08 | 4.19 | 4.24 | 4.11 | 3.84 | 3.86 | 4.09 | 3.68 | 4.27 | 3.98 |
| **Qwen2-72B-Instruct** | 3.86 | 4.10 | 4.01 | 4.14 | 3.75 | 3.91 | 3.97 | 3.83 | 3.63 | 4.15 | 3.93 |
| GPT-4-0613 | 3.55 | 3.92 | 3.94 | 3.87 | 3.83 | 3.95 | 3.55 | 3.77 | 3.06 | 3.63 | 3.71 |
| GPT-3.5-Turbo-1106 | 2.52 | 4.07 | 3.47 | 2.37 | 3.38 | 2.90 | 3.37 | 3.56 | 2.75 | 3.24 | 3.16 |

将上述结果分类求平均后，结果如下所示：

| Models | Knowledge | Understanding | Creation | Math |
| :--- | :---: | :---: | :---: | :---: |
| Claude-3-Opus-20240229 | 3.64 | 4.45 | 4.42 | 3.81 |
| GPT-4o-0513 | 3.76 | 4.35 | 4.45 | 3.53 |
| GPT-4-Turbo-0409 | 3.42 | 4.29 | 4.35 | 3.58 |
| **Qwen2-72B-Instruct** | 3.41 | 4.07 | 4.36 | 3.61 |
| GPT-4-0613 | 3.42 | 4.09 | 4.10 | 3.32 |
| GPT-3.5-Turbo-1106 | 3.37 | 3.67 | 3.89 | 2.97 |

以上结果均反映了Qwen2指令微调模型突出的多语言能力。

