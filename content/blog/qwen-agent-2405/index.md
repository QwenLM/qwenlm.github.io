---
title: "Generalizing an LLM from 8k to 1M Context using Qwen-Agent"
date: 2024-06-06T11:59:59+08:00
weight: 1
summary: We've created an agent using Qwen2 models with an 8k context size to understand documents with 1M tokens, surpassing RAG and native long-context models. This agent was also used to generate data for training new long-context Qwen models.
# aliases: ["/first"]
# tags: ["Research"]
# author: "Me"
# draft: true
# comments: false
# description: "Desc Text."
# disable_share: false
# hide_meta: false
# hide_summary: false # to hide summary in list
# hide_footer: false
# math: false
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

{{< button href="https://github.com/QwenLM/Qwen-Agent" label="Qwen-Agent" external=true >}}

**TLDR:** We've created an agent using Qwen2 models with an 8k context size to understand documents with 1M tokens, surpassing RAG and native long-context models. This agent was also used to generate data for training new long-context Qwen models.

# Introduction

Recently, there has been a <strike>hype</strike> trend in LLMs that can natively process sequences of millions of tokens. Most work has been focusing on sophisticated mathematical tweaks like RoPE-based extrapolation or architectural overhauls such as non-transformer LLMs. However, preparing fine-tuning data that is sufficiently long is a less discussed but equally important topic.

We adopt the following approach:
1. We use a *weak* 8k-context chat model to build a relatively *strong* agent capable of handling 1M-contexts.
2. Subsequently, we synthesize fine-tuning data using the agent and apply automated filtering to ensure quality.
3. Finally, we use the synthetic data to fine-tune a pretrained model, resulting in a *strong* 1M-context chat model.

This blog primarily focuses on Step 1, with details of the subsequent steps to be revealed in the coming weeks or months.

# Building the Agent

The agent we are building consists of three levels of complexity, each building upon the previous one.

## Level 1: Retrieval-Augmented Generation

A naive approach to processing a 1M-token context is to simply use retrieval-augmented generation (RAG) .
RAG divides the context into shorter chunks, each not exceeding 512 tokens, for example, and then retains only the most relevant chunks within an 8k-token context.

The challenge lies in how to pinpoint the chunks that are the most relevant. After several trials, we have come up with a keyword-based solution:

- Step 1: Instruct the chat model to separate the instruction and the non-instruction information in the user's query. For instance, transform the user query `"You should reply in 2000 words and be as detailed as possible. My question is, when were bicycles invented? Reply in English."` into `{"information": ["when were bicycles invented"], "instruction": ["reply in 2000 words", "be as detailed as possible", "reply in English"]}`.
- Step 2: Ask the chat model to deduce multilingual keywords from the informational part of the query. For example, the phrase `"when were bicycles invented"` would be converted to `{"keywords_en": ["bicycles", "invented", "when"], "keywords_zh": ["自行车", "发明", "时间"]}`.
- Step 3: Employ the BM25 algorithm, a traditional keyword-based retrieval method, to locate the chunks that most relevant to the extracted keywords.

{{< figure src="https://qianwen-res.oss-cn-beijing.aliyuncs.com/assets/qwen_agent/qwen-agent-2405-lv1-agent.png" width="100%" title="Dataflows of retrieval-augmented generation" >}}


We have also experimented with vector-based retrieval. However, in most cases, it does not offer a significant enough improvement to outweigh the additional complexity that arises from the necessity of deploying a separate embedding model.

{{< button href="https://github.com/QwenLM/Qwen-Agent/blob/main/examples/assistant_rag.py" label="RAG Code" external=true >}}

## Level 2: Chunk-by-Chunk Reading

The aforementioned RAG approach is fast but often fails when the relevant chunks do not have sufficient keyword overlap with the user query, resulting in these chunks not being retrieved and thus not provided to the model. Although vector retrieval theoretically can mitigate this issue, in practice, it frequently does not.

To address this limitation, we employ a brute-force strategy to reduce the chance of missing relevant context:

- Step 1: For each 512-token chunk, we ask the model to assess its relevance to the user query, outputting `"None"` if it is deemed irrelevant, or outputting the relevant sentences if it is deemed relevant. The chunks are processed in parallel to avoid long waiting times.
- Step 2: We then take the outputs that are not `"None"` (the relevant sentences) and use them as the search query to retrieve the most relevant chunks (within an 8k-context limit) using BM25.
- Step 3: Finally, we generate the final answer based on the retrieved context in the same manner as RAG.

{{< figure src="https://qianwen-res.oss-cn-beijing.aliyuncs.com/assets/qwen_agent/qwen-agent-2405-lv2-agent.png" width="100%" title="Dataflows of chunk-by-chunk reading" >}}

{{< button href="https://github.com/QwenLM/Qwen-Agent/blob/main/examples/parallel_doc_qa.py" label="Agent Code" external=true >}}

## Level 3: Step-by-Step Reasoning

A classic challenge in document-based question-answering is multi-hop reasoning. For example, consider answering the question "What vehicle was invented in the same century as the Fifth Symphony was composed?" when given a long document containing relevant facts. The model needs to first determine the answer to the sub-question "In which century was the Fifth Symphony composed?" which is the 19th century. Then, it can realize that a chunk containing "Bicycles were invented in the 19th century" is actually relevant to the original question.

Tool-calling (also known as function-calling) agents or ReAct agents are classic solutions that have built-in capabilities for question decomposition and step-by-step reasoning. We therefore wrap the aforementioned Level-2 agent as a tool to be called by a tool-calling agent. The tool-calling agent conducts multi-hop reasoning as follows:

```plaintext
Ask the Lv3-Agent a question.
while (the Lv3-Agent cannot answer the question based on its memory) {
    The Lv3-Agent proposes a new sub-question to be answered.
    The Lv3-Agent asks the Lv2-Agent the sub-question.
    Add the Lv2-Agent's response to the Lv3-Agent's memory.
}
The Lv3-Agent provides the final answer to the original question.
```

{{< figure src="https://qianwen-res.oss-cn-beijing.aliyuncs.com/assets/qwen_agent/qwen-agent-2405-lv3-agent.png" width="100%" title="Dataflows of step-by-step reasioning" >}}

For example, the Lv3-Agent initially poses a sub-question to the Lv2-Agent: "In which century was Beethoven's Fifth Symphony composed?" Upon receiving the response, "the 19th century," the Lv3-Agent formulates a subsequent sub-question: "What vehicle was invented during the 19th century?" By consolidating all the feedback from the Lv2-Agent, the Lv3-Agent can then answer the original question: "What vehicle was invented in the same century that the Fifth Symphony was composed?"

# Experiments

We conducted experiments on two benchmarks designed for 256k-context:
- NeedleBench is a benchmark designed to test whether a model can identify the most relevant sentences within a context filled with numerous irrelevant ones, akin to finding needles in a haystack. Answering a question may require the simultaneous discovery of several "needles" and the execution of multi-hop reasoning.
- LV-Eval is a challenging benchmark that demands the comprehension of multiple pieces of evidence at once. We modified the evaluation metric from LV-Eval's original version because it was excessively stringent, resulting in a high number of false negatives.

We compared the following methods:
- The 32k-Model, a 7B chat model fine-tuned mainly on 8k-context samples, with a few 32k-context samples, extended to a 256k context using a training-free method such as RoPE-based extrapolation.
- The 4k-RAG, which uses the same model as the 32k-Model but applies the Lv1-Agent RAG strategy. It only retrieves and processes the most relevant 4k context.
- The 4k-Agent, using the same model as the 32k-Model, follows the more advanced agent strategy described above. The agent strategy utilizes only a 4k-context with the model each time.

{{< figure src="https://qianwen-res.oss-cn-beijing.aliyuncs.com/assets/qwen_agent/qwen-agent-2405-blog-long-context-results.png" width="100%">}}

The empirical data reveals:
- In scenarios with short contexts, the 4k-RAG may perform less effectively than the 32k-Model. This could be due to difficulties in retrieving the right information or understanding multiple parts.
- Conversely, as document length increases, the 4k-RAG becomes more likely to outperform the 32k-Model. This trend suggests the 32k-Model isn't optimally trained for handling long contexts.
- Significantly, the 4K-Agent consistently surpasses the 32k-Model and the 4k-RAG. Its ability to read all the context in chunks allows it to avoid the limitations posed by under-trained context lengths.

Overall, the 32k-Model should ideally outshine all if it receives proper training. However, due to its under-training in practice, the 32k-Model under-performs compared to the 4k-Agent.

Finally, we have also tested the agent on a 1-million-token pressure test (finding a single needle in a haystack of 1 million tokens) and found that it functioned properly. However, we still lack a more reliable quantitative benchmark for evaluating its performance in handling contexts of 1 million tokens in real-world applications.


# Conclusion

In this blog, we have introduced how to build the agent that is capable of handling 1M-context with a 8k-context model. It then becomes obvious how to synthesize the data once the agent is prepared. For instance, we could enlist volunteers to interact with the agents and record the outcomes to construct the fine-tuning dataset. Additionally, we can employ the agent to cross-validate the data generated by other methods to ensure the quality of the data. Moreover, the general idea of distilling an agent into a model is applicable to other fields as well, such as enhancing a model's ability to solve long-horizon tasks.

# What's More

[Qwen-Agent](https://github.com/QwenLM/Qwen-Agent), our open-source RAG and agent framework, which began as internal utility code to facilitate model development, has recently undergone rapid development. We have released an implementation of the aforementioned long-context agent in the framework.

We hope to provide you with models that have improved capabilities for handling long contexts, as well as a more user-friendly infrastructure framework in the near future.

# Citation
```
@misc{qwen-agent-2405,
    title = {Generalizing an LLM from 8k to 1M Context using Qwen-Agent},
    url = {https://qwenlm.github.io/blog/qwen-agent-2405/},
    author = {Qwen Team},
    month = {May},
    year = {2024}
}
```
