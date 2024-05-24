---
title: "Code with CodeQwen1.5"
date: 2024-04-16T13:33:00+08:00
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
{{< button href="https://github.com/QwenLM/CodeQwen1.5" label="GITHUB" external=true >}}
{{< button href="https://huggingface.co/Qwen" label="HUGGING FACE" external=true >}}
{{< button href="https://modelscope.cn/organization/qwen" label="MODELSCOPE" external=true >}}
{{< button href="https://huggingface.co/spaces/Qwen/CodeQwen1.5-7b-Chat-demo" label="DEMO" external=true >}}
{{< button href="https://discord.gg/yPEP2vHTu4" label="DISCORD" external=true >}}

# Introduction


The advent of advanced programming tools, which harnesses the power of large language models (LLMs), has significantly enhanced programmer productivity and accuracy. Notwithstanding these advancements, dominant coding assistants like Github Copilot, built upon proprietary LLMs, pose notable challenges in terms of cost, privacy, security, and potential copyright infringement. Recognizing the imperative for a more transparent and accessible alternative, the open-source community has embarked on a concerted endeavor to develop open codeLLMs. This initiative has already given rise to several promising open-source models, including StarCoder2, CodeLlama, and DeepSeek-Coder, offering a path forward, albeit one that necessitates continued refinement.

{{< figure src="https://qianwen-res.oss-accelerate-overseas.aliyuncs.com/assets/blog/codeqwen1.5/intro.png#center" width="100%">}}


Today, we are delighted to introduce a new member of the Qwen1.5 open-source family, the CodeQwen1.5-7B, a specialized codeLLM built upon the Qwen1.5 language model. CodeQwen1.5-7B has been pretrained with around 3 trillion tokens of code-related data. It supports an extensive repertoire of 92 programming languages, and it exhibits exceptional capacity in long-context understanding and generation with the ability to process information of 64K tokens. In terms of performance, CodeQwen1.5 demonstrates impressive capabilities in basic code generation, long-context modeliing, code editation and SQL. We believe this model can significantly enhance developer productivity and streamline software development workflows within diverse technological environments.



# CodeQwen is a Basic Coder

Code generation is a key competence for large language models, as they are tasked with translating natural language instructions into executable code with unwavering precision. CodeQwen1.5, with only 7 billion parameters, has surpassed larger models in basic code generation capabilities, further narrowing the gap in coding proficiency between GPT-4 and opensource code LLMs. We conducted a thorough evaluation on HumanEval and MBPP to provide a clear and fair comparison as follows.

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

In addition to the widely recognized HumanEval and MBPP benchmarks, we explored LiveCodeBench. This benchmark assesses code performance by introducing fresh challenges sourced from coding competitions such as LeetCode, AtCoder, and CodeForces over time. Our evaluation of CodeQwen1.5 on LiveCodeBench spanned from September 1, 2023, to April 1, 2024. The findings indicate that CodeQwen1.5 ranks among the top open-access models currently available. Note: it is possible that the inclusion of LeetCode data in our pretraining corpus may contribute to the performance in LiveCodeBench.

{{< figure src="https://qianwen-res.oss-accelerate-overseas.aliyuncs.com/assets/blog/codeqwen1.5/livecode.png#center" width="75%">}}

The evaluations mentioned primarily revolve around Python capabilities; however, CodeQwen1.5 is not merely a Python specialist but also an expert across multiple programming languages. We conducted a comprehensive evaluation of CodeQwen1.5 in the eight mainstream languages featured in MultiPL-E, including Python, C++, Java, PHP, TypeScript, C#, Bash, and JavaScript. The results highlight the exceptional programming capabilities of CodeQwen1.5.

{{< figure src="https://qianwen-res.oss-accelerate-overseas.aliyuncs.com/assets/blog/codeqwen1.5/radar-vertical.png#center" width="40%">}}

# CodeQwen is a Long Context Coder

Long context capability is crucial for code LLMs, serving as the core skill for understanding repository-level code and becoming a code agent. However, current code models still have very limited support for length, which hinders their potential for practical application. CodeQwen1.5 aims to further advance the progress of open-source code models in long context modeling. To achieve this, we have collected and constructed long sequence code data at the repository level for pre-training. Through careful data proportioning and organization, we have enabled it to support input lengths of up to 64K tokens.

**Evaluation 1**: We collected high-quality repo from GitHub Trending repositories on 2024-3-28 that were not included in CodeQwen1.5's training data  to observe the effectiveness of long context modeling. The following figure demonstrates that as the sequence length increases, CodeQwen1.5's Perplexity (PPL) still manages to maintain a downward trend.

{{< figure src="https://qianwen-res.oss-accelerate-overseas.aliyuncs.com/assets/blog/codeqwen1.5/longcontext-ppl.png#center" width="90%">}}


**Evaluation 2**: We created a synthetic task called `Needle in the Code`, inspired by popular long-context evaluations in the text domain. In this task, we inserted a very simple custom function at various positions within a longer codebase (we chose Megatron to honor its contributions to open-source LLMs!) and tested whether the model could replicate this function at the end of the codebase. The figure below shows that CodeQwen is capable of successfully completing this task within a 64k length range.

{{< figure src="https://qianwen-res.oss-accelerate-overseas.aliyuncs.com/assets/blog/codeqwen1.5/longcontext-needle.png#center" width="90%">}}


Both Evaluation 1 and Evaluation 2 serve as initial and foundational assessments. For the Chat model, we aim to evaluate its long context capabilities with more practical tasks. However, our objective is to examine the Chat model's capability to handle long contexts through more pragmatic, real-world evaluation tasks.

**Evaluation 3**: SWE Bench is a benchmark designed to assess the ability of Large Language Models (LLMs) or agents to tackle practical software development challenges. It presents contestants with a code repository and an associated issue, tasking them with generating a commit patch that resolves the issue effectively. The benchmark uniquely emphasizes the long-context processing capabilities of code LLMs, necessitating both deep comprehension of the given codebase and the generation of extensive, unit-test-passing code. 

{{< figure src="https://qianwen-res.oss-accelerate-overseas.aliyuncs.com/assets/blog/codeqwen1.5/swe-bench.png#center" width="95%">}}


Currently, participants in the SWE Bench competition predominantly are proprietary models. We introduce CodeQwen1.5 as an open-source model entry. Despite achieving a score of 0.89, CodeQwen1.5 surpasses ChatGPT-3.5, demonstrating the nascent yet promising competitiveness of open-source code models against their proprietary counterparts.

# CodeQwen is a Debugger
An effective code assistant must demonstrate proficiency in both generating code in response to given specifications and adeptly modifying or debugging existing code to accommodate evolving requirements or rectify errors. In assessing CodeQwen1.5's proficiency in code modification tasks, we concentrated our evaluation on the CodeEditorBench suite, encompassing four distinct dimensions: Debugging, Translation, Language Switching, and Code Polishing. The results indicate that CodeQwen1.5 achieves the SOTA performance at the 7 billion parameter scale.

{{< figure src="https://qianwen-res.oss-accelerate-overseas.aliyuncs.com/assets/blog/codeqwen1.5/codeedit.jpeg#center" width="90%">}}


# CodeQwen is a SQLer
CodeQwen1.5 serves as a solution to bridge the gap between non-programming professionals and efficient data interaction. It alleviates the steep learning curve associated with SQL by enabling users without coding expertise to query databases through natural language. We evaluated CodeQwen1.5-Chat's performance on two popular Text-to-SQL benchmarks, Spider and Bird. Experimental results pose CodeQwen1.5 a second position close to GPT-4 (results come from DIN-SQL, a SOTA prompting method). This outstanding performance is attributed to the utilization of synthetic data throughout both pre-training and fine-tuning stages. Synthetic data, characterized by its scalability, verifiability, and variety, emerges as a compelling area for future research due to its proven effectiveness in enhancing CodeQwen1.5's SQL capabilities.

{{< figure src="https://qianwen-res.oss-accelerate-overseas.aliyuncs.com/assets/blog/codeqwen1.5/sql-score.png#center" width="90%">}}


# Develop with CodeQwen1.5

CodeQwen1.5 is part of the Qwen1.5 open-source family. We advise you to read our blog for [Qwen1.5](https://qwenlm.github.io/blog/qwen1.5/) to figure out the usages with Transformers, vLLM, llama.cpp, Ollama, etc. 



# Conclusion

We have released CodeQwen1.5-7B and CodeQwen1.5-7B-Chat, an open and versatile code LLM. The models are intended to aid progress in code assistance and code agents, benefiting the research community. We'll keep investing heavily in smart code development, with the ultimate goal of creating AI programmers.

# Citation

```
@misc{codeqwen1.5,
    title = {Code with CodeQwen1.5},
    url = {https://qwenlm.github.io/blog/codeqwen1.5/},
    author = {Qwen Team},
    month = {April},
    year = {2024}
}
```