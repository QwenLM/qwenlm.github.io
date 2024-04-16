---
title: "与 CodeQwen1.5 结对编程"
date: 2024-04-16T13:33:00+08:00
weight: 1
# aliases: ["/first"]
# tags: ["Research"]
# draft: false
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

{{< button href="https://github.com/QwenLM/CodeQwen1.5" label="GITHUB" external=true >}}
{{< button href="https://huggingface.co/Qwen" label="HUGGING FACE" external=true >}}
{{< button href="https://modelscope.cn/organization/qwen" label="MODELSCOPE" external=true >}}
{{< button href="https://huggingface.co/spaces/Qwen/CodeQwen1.5-7b-Chat-demo" label="DEMO" external=true >}}
{{< button href="https://discord.gg/yPEP2vHTu4" label="DISCORD" external=true >}}

# 简介


代码助手，是一种基于 LLMs 的智能化的编程工具，它可以帮助程序员更高效、更准确的编写代码，使得整个软件开发过程更加流畅和高效。然而流行的代码助手，比如 Github Copilot，依赖于闭源的商业模型，不仅昂贵还会引起如隐私、安全、版权等方面的担忧。幸运的是，开源社区正在致力于打造开放代码模型来实现开放的代码助手。近期涌现出了一批优秀的 Open CodeLLMs，比如 StarCoder2、CodeLlama、DeepSeek-Coder 等，提供了一条新的路径，但仍然值得探索。

{{< figure src="https://qianwen-res.oss-accelerate-overseas.aliyuncs.com/assets/blog/codeqwen1.5/intro.png#center" width="100%">}}


今天，我们非常激动地和大家介绍来自 Qwen1.5 开源家族的新成员，一个代码专家模型 CodeQwen1.5! CodeQwen1.5 基于 Qwen 语言模型初始化，拥有 7B 参数的模型，其拥有 GQA 架构，经过了 ~3T tokens 代码相关的数据进行预训练，共计支持 92 种编程语言、且最长支持 64K 的上下文输入。效果方面，CodeQwen1.5 展现出了非凡的代码生成、长序列建模、代码修改、SQL 能力等,该模型可以大大提高开发人员的工作效率，并在不同的技术环境中简化软件开发工作流程。



# CodeQwen 是基础的 Coder

代码生成是大语言模型的关键能力之一，期待模型将自然语言指令转换为具有精确的、可执行的代码。仅拥有 70 亿参数的 CodeQwen1.5 在基础代码生成能力上已经超过了更尺寸的模型，进一步缩小了开源 CodeLLM 和 GPT-4 之间编码能力的差距。我们对 HumanEval 和 MBPP 进行了评估，下面是具体的比较。

<style>
.cell-aux {
    font-size: 0.9rem;
    font-weight: normal;
    font-style: italic;
    color: #888;
}
</style>

<table style="text-align:center">
    <tr style="font-weight:bold">
        <td style="text-align: left">Model</td>
        <td style="text-align: left">Size</td>
        <td>
            <div>HumanEval</div>
            <div class="cell-aux">0-shot</div>
        </td>
        <td>
            <div>HumanEval+</div>
            <div class="cell-aux">0-shot</div>
        </td>
        <td>
            <div>MBPP</div>
            <div class="cell-aux">0-shot</div>
        </td>
        <td>
            <div>MBPP+</div>
            <div class="cell-aux">0-shot</div>
        </td>
        <td>
            <div>MBPP</div>
            <div class="cell-aux">3-shot</div>
        </td>
    </tr>
    <tr>
        <td colspan=7><b>Base Model</b></td>
    </tr>
    <tr>
        <td style="text-align: left">CodeLlama-Base</td>
        <td style="text-align: left">7B</td>
        <td>33.5</td>
        <td>25.6</td>
        <td>52.1</td>
        <td>41.6</td>
        <td>38.6</td>
    </tr>
    <tr>
        <td style="text-align: left">StarCoder2</td>
        <td style="text-align: left">7B</td>
        <td>35.4</td>
        <td>29.9</td>
        <td>54.4</td>
        <td>45.6</td>
        <td>51.0</td>
    </tr>
    <tr>
        <td style="text-align: left">DeepSeek-Coder-Base</td>
        <td style="text-align: left">6.7B</td>
        <td>47.6</td>
        <td>39.6</td>
        <td>70.2</td>
        <td>56.6</td>
        <td>60.6</td>
    </tr>
    <tr>
        <td style="text-align: left"><b>CodeQwen1.5</b></td>
        <td style="text-align: left">7B</td>
        <td>51.8</td>
        <td>45.7</td>
        <td>72.2</td>
        <td>60.2</td>
        <td>61.8</td>
    </tr>
    <tr>
        <td colspan=7><b>Chat Model</b></td>
    </tr>
    <tr>
        <td style="text-align: left">GPT-3.5-Turbo</td>
        <td style="text-align: left">-</td>
        <td>76.8</td>
        <td>70.7</td>
        <td>82.5</td>
        <td>69.7</td>
        <td>70.8</td>
    </tr>
    <tr>
        <td style="text-align: left">GPT-4-Turbo (Nov 2023)</td>
        <td style="text-align: left">-</td>
        <td>85.4</td>
        <td>81.7</td>
        <td>83.5</td>
        <td>70.7</td>
        <td>80.0</td>
    </tr>
    <tr>
        <td style="text-align: left">DeepSeek-Coder-Instruct</td>
        <td style="text-align: left">6.7B</td>
        <td>78.6</td>
        <td>70.1</td>
        <td>73.2</td>
        <td>63.4</td>
        <td>65.4</td>
    </tr>
    <tr>
        <td style="text-align: left"><b>CodeQwen1.5-Chat</b></td>
        <td style="text-align: left">7B</td>
        <td>83.5</td>
        <td>78.7</td>
        <td>77.7</td>
        <td>67.2</td>
        <td>70.6</td>
    </tr>
</table>

除了流行的 Humaneval 与 MBPP 外，我们还注意到了 LiveCodeBench，一个对 LLM 代码能力进行更全面、随着时间动态更新的评估。LiveCodeBench 不断地从 LeetCode、AtCoder 和 CodeForces 三个竞赛平台中收集问题来测试模型的泛化能力。我们选择在 LiveCodeBench (2023-09-01->2024-04-01)上对 CodeQwen1.5 进行评估，结果展示出了 CodeQwen1.5 极具竞争力的效果。但值得注意的是，在预训练语料中包含的 LeetCode 数据可能对该评测有帮助。

{{< figure src="https://qianwen-res.oss-accelerate-overseas.aliyuncs.com/assets/blog/codeqwen1.5/livecode.png#center" width="75%">}}

上述的评估主要围绕 Python 能力，但 CodeQwen1.5 不仅仅是 Python 专家，还是一个多编程语言专家。我们在 MultiPL-E 的 8 种主流语言（Python、C++、Java、PHP、TypeScript、C#、Bash，JavaScript）上对 CodeQwen1.5 进行全面评估。这些结果证明了 CodeQwen1.5 强大的编程能力。

{{< figure src="https://qianwen-res.oss-accelerate-overseas.aliyuncs.com/assets/blog/codeqwen1.5/radar-vertical.png#center" width="40%">}}

## CodeQwen 是长序列 Coder

长序列能力对于代码模型来说至关重要，是理解仓库级别代码、成为 Code Agent 的核心能力。而当前的代码模型对于长度的支持仍然非常有限，阻碍了其实际应用的潜力。CodeQwen1.5 希望进一步推进开源代码模型在长序列建模上的进展，我们收集并构造了仓库级别的长序列代码数据进行预训练，通过精细的数据配比和组织方式，使其最终可以最长支持 64K 的输入长度。

**评估一**：我们选择了不在 CodeQwen1.5 训练数据、最新产生的高质量 github 仓库 （来自 2024-3-28 的 Github Trending 仓库），来观测其长序列建模的有效性。下图可以发现在序列不断增长的情况下， CodeQwen1.5 的 PPL 仍然可以保持下降的趋势。

{{< figure src="https://qianwen-res.oss-accelerate-overseas.aliyuncs.com/assets/blog/codeqwen1.5/longcontext-ppl.png#center" width="90%">}}

**评估二**：一个名为 `Needle in the Code` 的合成任务， 其效仿文本领域流行的长序列评测。我们在一个较长的代码库（我们选择了 Megatron，向其对开源 LLMs 的贡献致敬）的不同位置中插入非常简单的一个自定义函数，测试模型能否在代码库最后重复这个函数。下图可以发现，CodeQwen 能够在 64k 长度范围内仍然可以很好的完成这个任务。

{{< figure src="https://qianwen-res.oss-accelerate-overseas.aliyuncs.com/assets/blog/codeqwen1.5/longcontext-needle.png#center" width="90%">}}

无论是评估一还是评估二，都是初步的、基础的评估方式，仅仅是一个起点而非全部。但是，对于 Chat 模型，我们希望用更实际的任务来评估其长序列能力。

**评估三**：SWE Bench 的目的是解决真实软件开发中的问题，给定一个代码仓库和 issue，期待 LLMs/Agents 能够给出相应的 commit patch 来解决这个 issue。SWE Bench 对 Code LLMs 的长序列能力提出了更高的要求，不仅需要理解代码仓库，还要生成可通过单测的代码。 

{{< figure src="https://qianwen-res.oss-accelerate-overseas.aliyuncs.com/assets/blog/codeqwen1.5/swe-bench.png#center" width="95%">}}

目前 SWEBench 竞技场上的玩家都依赖闭源模型，我们让 CodeQwen1.5 首次入局，尽管仅有 0.89 的分数但仍强于 ChatGPT3.5，这展示了开源代码模型与专有模型的竞争力尽管尚处于初期，但具有潜力。

## CodeQwen 是优秀的代码修改者
一个好的代码助手不仅可以根据指令生成代码，还能够针对已有代码或者新的需求进行修改或错误修复。为此，我们评估了 CodeQwen1.5 在代码修改方面的能力。我们首先在关注 CodeEditorBench，涉及到 Debug、Translate、Switch、Polish 等四个方面的代码修改能力，结果表明 CodeQwen1.5 在 7B 规模上达到了最好的效果。

{{< figure src="https://qianwen-res.oss-accelerate-overseas.aliyuncs.com/assets/blog/codeqwen1.5/codeedit.jpeg#center" width="90%">}}


## CodeQwen 是出色的 SQL 专家
CodeQwen1.5 可以作为一个智能的 SQL 专家，弥合了非编程专业人士与高效数据交互之间的差距。它通过自然语言使无编程专业知识的用户能够查询数据库，从而缓解了与SQL相关的陡峭学习曲线。我们在两个流行的文本到SQL基准测试Spider和Bird上评估了CodeQwen1.5-Chat的性能。实验结果显示，CodeQwen1.5在接近GPT-4的位置排名第二（结果来自DIN-SQL，一种 SOTA 的提示方法）。这一出色的表现得益于在预训练和微调阶段均广泛利用了合成数据。合成数据具有可扩展性、可验证性和多样性的特点，在增强CodeQwen1.5的SQL能力方面已被证明是一项具有吸引力的未来研究领域。

{{< figure src="https://qianwen-res.oss-accelerate-overseas.aliyuncs.com/assets/blog/codeqwen1.5/sql-score.png#center" width="90%">}}


## 部署 CodeQwen1.5

CodeQwen1.5 隶属 Qwen1.5 开源家族，我们推荐您阅读我们的 [Qwen1.5](https://qwenlm.github.io/blog/qwen1.5/) 文档来了解具体的使用方式，目前已支持  Transformers, vLLM, llama.cpp, Ollama, 等等。

## 结论

我们发布了 CodeQwen1.5-7B 及 CodeQwen1.5-7B-Chat，一个开放的、多面体的 Code LLM，我们希望这个模型能在 Code 助手、Code Agent 等方面为社区贡献。未来我们仍然会积极的投入代码智能建设，实现真正的 AI 程序员。