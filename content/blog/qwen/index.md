---
title: "Introducing Qwen"
date: 2024-01-23T22:13:29+08:00
weight: 1
# aliases: ["/first"]
# tags: ["Research"]
author: ["Junyang Lin", "Binyuan Hui"]
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
4 months after our first release of Qwen-7B, which is the starting point of our opensource journey of large language models (LLM), we now provide an introduction to the Qwen series to give you a whole picture of our work as well as our objectives. Below are important links to our opensource projects and community.

{{< button href="https://arxiv.org/abs/2309.16609" label="PAPER" external=true >}}
{{< button href="https://github.com/QwenLM/Qwen" label="GITHUB" external=true >}}
{{< button href="https://huggingface.co/Qwen" label="HUGGING FACE" external=true >}}
{{< button href="https://modelscope.cn/organization/qwen" label="MODELSCOPE" external=true >}}
{{< button href="https://discord.gg/z3GAxXZ9C" label="DISCORD" external=true >}}

Additionally, we have WeChat groups for chatting and we invite you to join the groups through the provided link in our GitHub readme.

## Overview

In general, Qwen is more than a language model but a project towards AGI which for now consists of LLM and LMM. The following figure shows the main components of Qwen:

{{< figure src="family.png#center" width="80%">}}

where Qwen refers to the base language model, while Qwen-Chat refers to the chat model trained with techniques like SFT and RLHF. We also have models specialized for domains and tasks, such as Code-Qwen for coding and Math-Qwen for mathematics. LLM can be extended to multimodality with modality alignment, and thus we have vision-language model Qwen-VL as well as audio-language model Qwen-Audio. Note that this blog mainly serves for introducing the language model. As to the large multimodal models (LMM), such as Qwen-VL and Qwen-Audio, please refer to the respective blog.

## Base Model: A Good Starting Point for Alignment

The general procedure of building an assistant model includes pretraining and post-training, where the latter mostly consists of SFT and RLHF. As to pretraining, similar to previous LLM, GPT-3, Llama, Qwen is a Transformer-based language model pretrained by the task of next token prediction. For simplicity and stability, we did not introduce more tasks for the language model but focus on model size scaling and data scaling. For now, we have developed 5 models of different sizes, 4 of which are opensourced. Specially, we now release Qwen-1.8B, Qwen-7B, Qwen-14B, and Qwen-72B.

| Model     | Release Date | Max Length | System Prompt Enhancement | # of Pretrained Tokens | Minimum GPU Memory Usage of Finetuning (Q-Lora) | Minimum GPU Usage of Generating 2048 Tokens (Int4) | Tool Usage |
| --------- | ------------ | ---------- | ------------------------- | ---------------------- | ----------------------------------------------- | -------------------------------------------------- | ---------- |
| Qwen-1.8B | 23.11.30     | 32K        | ✔                        | 2.2T                   | 5.8GB                                           | 2.9GB                                              | ✔         |
| Qwen-7B   | 23.08.03     | 32K        | ✘                        | 2.4T                   | 11.5GB                                          | 8.2GB                                              | ✔         |
| Qwen-14B  | 23.09.25     | 8K         | ✘                        | 3.0T                   | 18.7GB                                          | 13.0GB                                             | ✔         |
| Qwen-72B  | 23.11.30     | 32K        | ✔                        | 3.0T                   | 61.4GB                                          | 48.9GB                                             | ✔         |

Models are sufficiently trained with 2-3 trillion tokens. The pretraining data are multilingual, and thus Qwen is essentially a multilingual model instead of a model of a single language or bilingual. Note that due to the limitations of our pretraining data, the model is strongly capable of English and Chinese and also capable of other languages, such as Spanish, French, and Japanese. To extend its multilingual capabilities, we applied a tokenizer with high efficiency in encoding information from different languages. In comparison with other tokenizers, ours demonstrates high compression rate in a series of languages.

{{< figure src="tokenizer.png#center" width="80%">}}

Another focus of our pretraining is the extension of context length. We directly apply continual pretraining with longer context length and larger base value for RoPE. Additionally, we find that.this method is also effective in extrapolation. Now our opensourced models mostly support a context length of 32K tokens, and they were evaluated through L-Eval and “Needle in a Haystack”.

| Model           | Input Length | Average | Coursera | GSM   | QuALITY | TOEFL | CodeU | SFcition |
| --------------- | ------------ | ------- | -------- | ----- | ------- | ----- | ----- | -------- |
| ChatGPT-3.5-16k | 16K          | 60.73   | 63.51    | 84.00 | 61.38   | 78.43 | 12.22 | 64.84    |
| Qwen-72B-Chat   | 32K          | 62.30   | 58.13    | 76.00 | 77.22   | 86.24 | 6.66  | 69.53    |

{{< figure src="haystack.png#center" width="80%" >}}

Benchmark evaluation shows that our largest opensourced model Qwen-72B as well as the largest proprietary shows competitive performance against Llama 2, GPT-3.5 and GPT-4.

{{< figure src="result.png#center" width="80%">}}

Note that this is an evaluation of base language model. This only reflects that we might have a good starting point for post-training, i.e., SFT and RLHF.

## Alignment

We refer both techniques to the word “alignment” in post-training. Currently, it is consensus that we can obtain a chat model with a relatively small amount of finetuning data. We focus on improving the diversity and complexity (instag and tulu 2) of the SFT data and strictly control the quality by manual checking and automatic evaluation.

Based on a good SFT model, we can then explore the effects of RLHF. It is difficult to train RLHF, specifically PPO-based method, Besides the training instabilities of PPO, another key to the final performance is the quality of reward model. Therefore, we have spent efforts in building a reliable reward model by reward model pretraining on large-scale comparison data and finetuning on carefully labeled comparison data of high quality. In comparison with the SFT model, we find that the RLHF model is more creative and follows the instructions better, and thus its generated responses are more preferred by human annotators.

{{< figure src="rlhf.png#center"  width="80%" >}}

## Tool Use and Agent

One of the most amazing parts of today’s LLMs is the capabilities of tool use and agent playing. We directly label data of ReAct formats in order to endow the abilities of generating thought and action and generating responses based on previous steps and observations. Also, the model directly learns the in-context learning ability and thus it then can use unseen tool through understanding instructions and demonstrations.

We currently support function calling, code interpreter, and hugging face agent, which respectively serves for tool use, data analysis and using AI models for different outputs, say image generation. Furthermore, based on our agent framework, we further build a project called AgentFabric, following GPTs, which allows you to build a specialzed AI agent for yourself simply by chatting with our model for configuration.

## Summary

We release the Qwen series, and in this blog, we provide a simple introduction to the Qwen language models Now, we are still following the recipes of pretraining, SFT, and RLHF and we are figuring out a path towards scaling model and data. We hope that our opensource is contributive to the research and application communities.
