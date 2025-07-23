---
title: "Qwen3-Coder: Agentic Coding in the World"
date: 2025-07-22T21:00:00+08:00
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


{{< button href="https://github.com/QwenLM/Qwen3-Coder" label="GITHUB" external=true >}}
{{< button href="https://huggingface.co/Qwen" label="HUGGING FACE" external=true >}}
{{< button href="https://modelscope.cn/organization/qwen" label="MODELSCOPE" external=true >}}
{{< button href="https://discord.gg/yPEP2vHTu4" label="DISCORD" external=true >}}


Today, we're announcing Qwen3-Coder, our most agentic code model to date. Qwen3-Coder is available in multiple sizes, but we're excited to introduce its most powerful variant first: Qwen3-Coder-480B-A35B-Instruct — a 480B-parameter Mixture-of-Experts model with 35B active parameters which supports the context length of 256K tokens natively and 1M tokens with extrapolation methods, offering exceptional performance in both coding and agentic tasks. Qwen3-Coder-480B-A35B-Instruct sets new state-of-the-art results among open models on Agentic Coding, Agentic Browser-Use, and Agentic Tool-Use, comparable to Claude Sonnet 4. 

<div align="center">
  <img src="https://qianwen-res.oss-cn-beijing.aliyuncs.com/Qwen3-Coder/qwen3-coder-main.jpg" alt="" width="800" />
</div>

Alongside the model, we're also open-sourcing a command-line tool for agentic coding: Qwen Code. Forked from Gemini Code, Qwen Code has been adapted with customized prompts and function calling protocols to fully unleash the capabilities of Qwen3-Coder on agentic coding tasks. Qwen3-Coder works seamlessly with the community’s best developer tools. As a foundation model, we hope it can be used anywhere across the digital world — Agentic Coding in the World!


## Qwen3-Coder

### Pre-Training
There’s still room to scale in pretraining—and with Qwen3-Coder, we’re advancing along multiple dimensions to strengthen the model’s core capabilities:

* Scaling Tokens: 7.5T tokens (70% code ratio), excelling in coding while preserving general and math abilities.
* Scaling Context: Natively supports 256K context and can be extended up to 1M with YaRN, optimized for repo-scale and dynamic data (e.g., Pull Requests) to empower Agentic Coding.
* Scaling Synthetic Data: Leveraged Qwen2.5-Coder to clean and rewrite noisy data, significantly improving overall data quality.

### Post-Training

#### Scaling Code RL: Hard to Solve, Easy to Verify
<div align="center">
  <img src="https://qianwen-res.oss-cn-beijing.aliyuncs.com/Qwen3-Coder/coderl.png" alt="" width="800" />
</div>
Unlike the prevailing focus on competitive-level code generation in the community, we believe all code tasks are naturally well-suited for execution-driven large-scale reinforcement learning. That’s why we scaled up Code RL training on a broader set of real-world coding tasks. By automatically scaling test cases of diversity coding tasks, we created high-quality training instances and successfully unlocked the full potential of reinforcement learning. It not only significantly boosted code execution success rates, but also brought gains to other tasks. This encourages us to keep exploring hard-to-solve, easy-to-verify tasks as fertile ground for large-scale reinforcement learning.

#### Scaling Long-Horizon RL
<div align="center">
  <img src="https://qianwen-res.oss-cn-beijing.aliyuncs.com/Qwen3-Coder/swe.jpg" alt="" width="800" />
</div>

In real-world software engineering tasks like SWE-Bench, Qwen3-Coder must engage in multi-turn interaction with the environment, involving planning, using tools, receiving feedback, and making decisions. In the post-training phase of Qwen3-Coder, we introduced long-horizon RL (Agent RL) to encourage the model to solve real-world tasks through multi-turn interactions using tools. The key challenge of Agent RL lies in environment scaling. To address this, we built a scalable system capable of running 20,000 independent environments in parallel, leveraging Alibaba Cloud's infrastructure. The infrastructure provides the necessary feedback for large-scale reinforcement learning and supports evaluation at scale. As a result, Qwen3-Coder achieves state-of-the-art performance among open-source models on SWE-Bench Verified without test-time scaling.


## Code with Qwen3-Coder

### Qwen Code
Qwen Code is a research-purpose CLI tool adapted from Gemini CLI, with enhanced parser and tool support for Qwen-Coder models.

Make sure you have installed nodejs 20+:

You could install it via the following commands:
```bash
curl -qL https://www.npmjs.com/install.sh | sh
```
Then install Qwen code via npm manager:
```bash
npm i -g @qwen-code/qwen-code
```
> The other way is to install from the source:
> ```bash
> git clone https://github.com/QwenLM/qwen-code.git
> cd qwen-code && npm install && npm install -g
> ``` 

Qwen Code supports the OpenAI SDK when calling LLMs, and you can export the following environment variables or simply put them under the `.envfile`.

```bash
export OPENAI_API_KEY="your_api_key_here"
export OPENAI_BASE_URL="https://dashscope-intl.aliyuncs.com/compatible-mode/v1"
export OPENAI_MODEL="qwen3-coder-plus"
```
Now enjoy your vibe coding with Qwen-Code and Qwen, by simply typing: qwen!

### Claude Code
In addition to Qwen Code, you can now use Qwen3‑Coder with Claude Code. Simply request an API key on [Alibaba Cloud Model Studio](https://modelstudio.console.alibabacloud.com/) platform and install Claude Code to start coding.

```bash
npm install -g @anthropic-ai/claude-code
```

We have provided two entrypoints for seamlessly experiencing coding with Qwen3-Coder.

#### Optional 1: Claude Code proxy API
```bash
export ANTHROPIC_BASE_URL=https://dashscope-intl.aliyuncs.com/api/v2/apps/claude-code-proxy
export ANTHROPIC_AUTH_TOKEN=your-dashscope-apikey
```
Then you should be able to use Claude Code with Qwen3-Coder!

#### Optional 2: claude-code-config npm package for router customization
claude-code-router aims for customizing different backend models for Claude Code. The dashscope team also provide a convenient config npm extension, namely claude-code-config, that provides default configuration for claude-code-router with DashScope support.
Run installation:
```bash
npm install -g @musistudio/claude-code-router
npm install -g @dashscope-js/claude-code-config
```
and then run configuration:
```bash
ccr-dashscope
```
The command will automatically generate the config json files and plugin directories for ccr. (You could also manually adjust these under ~/.claude-code-router/config.json and ~/.claude-code-router/plugins/ )
Start using claude code via ccr:
```bash
ccr code
```

### Cline
Configure the Qwen3-Coder-480B-A35B-Instruct to cline
‒ Go to the Cline configuration settings
‒ For API Provider, select 'OpenAI Compatible'
‒ For the OpenAI Compatible API Key, enter the key obtained from Dashscope
‒ Check 'Use custom base URL' and enter: `https://dashscope-intl.aliyuncs.com/compatible-mode/v1`
‒ Enter `qwen3-coder-plus`

<video width="100%" muted controls="1">
    <source src="https://qianwen-res.oss-cn-beijing.aliyuncs.com/Qwen3-Coder/qwen3_coder_plus_with_cline.mp4" type="video/mp4">
</video>

## Use Cases

{{< fullwidth class="example-container" >}}
{{< example data="cases/demo1.json" hide=false next=true >}}
{{< example data="cases/demo2.json" hide=true next=true >}}
{{< example data="cases/demo3.json" hide=true next=true >}}
{{< example data="cases/demo4.json" hide=true next=true >}}
{{< example data="cases/demo5.json" hide=true next=true >}}
{{< example data="cases/demo6.json" hide=true next=true >}}
{{< example data="cases/demo7.json" hide=true next=true >}}
{{< /fullwidth >}}

## API
You can directly access the API of Qwen3-Coder through [Alibaba Cloud Model Studio](https://modelstudio.console.alibabacloud.com/). Here is a demonstration of how to use this model with the Qwen API.

```python
import os
from openai import OpenAI

# Create client - using intl URL for users outside of China
# If you are in mainland China, use the following URL:
# "https://dashscope.aliyuncs.com/compatible-mode/v1"
client = OpenAI(
    api_key=os.getenv("DASHSCOPE_API_KEY"),
    base_url="https://dashscope-intl.aliyuncs.com/compatible-mode/v1",
)

prompt = "Help me create a web page for an online bookstore."


# Send request to qwen3-coder-plus model
completion = client.chat.completions.create(
    model="qwen3-coder-plus",
    messages=[
        {"role": "system", "content": "You are a helpful assistant."},
        {"role": "user", "content": prompt}
    ],
)

# Print the response
print(completion.choices[0].message.content.strip())
```

## Further Work
We are still actively working to improve the performance of our Coding Agent, aiming for it to take on more complex and tedious tasks in software engineering, thereby freeing up human productivity. More model sizes of Qwen3-Coder are on the way, delivering strong performance while reducing deployment costs. Additionally, we are actively exploring whether the Coding Agent can achieve self-improvement—an exciting and inspiring direction.
