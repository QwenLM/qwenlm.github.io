---
title: "Qwen3-Coder: 在世界中自主编程"
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

<!-- {{< video src="https://qianwen-res.oss-cn-beijing.aliyuncs.com/Qwen2.5/qwen2-main-video.m4v" width="100%" alt="Qwen2.5 Main Video" autoplay=true loop=true controls=false muted=true playsinline=true >}} -->


{{< button href="https://github.com/QwenLM/Qwen3-Coder" label="GITHUB" external=true >}}
{{< button href="https://huggingface.co/Qwen" label="HUGGING FACE" external=true >}}
{{< button href="https://modelscope.cn/organization/qwen" label="MODELSCOPE" external=true >}}
{{< button href="https://discord.gg/yPEP2vHTu4" label="DISCORD" external=true >}}


今天我们正式发布 Qwen3-Coder，这是我们迄今为止最具代理能力的代码模型。Qwen3-Coder 拥有多个尺寸，但我们迫不及待地给大家提供当前最强大的版本，Qwen3-Coder-480B-A35B-Instruct。这是一个总参数量 480B，激活 35B 的 MoE 模型，原生支持 256K token 的上下文并可通过 YaRN 扩展到 1M token，拥有卓越的代码和 Agent 能力。Qwen3-Coder-480B-A35B-Instruct 在 Agentic Coding、Agentic Browser-Use 和 Agentic Tool-Use 上取得了开源模型的 SOTA 效果，可以与 Cluade Sonnet4 媲美。

<div align="center">
  <img src="https://qianwen-res.oss-cn-beijing.aliyuncs.com/Qwen3-Coder/qwen3-coder-main.jpg" alt="" width="800" />
</div>

与此同时，我们还推出并开源了一款用于代理式编程的命令行工具：Qwen Code。Qwen Code 基于 Gemini Code 进行二次开发，但我们进行了 prompt 和工具调用协议适配，使得 Qwen Code 可以最大程度激发 Qwen3-Coder 在 Agentic Coding 任务上的表现。另外，Qwen3-Coder 可以和社区优秀的编程工具结合，如 Claude Code、Cline 等，作为一款基础模型，我们期待在数字世界的任何角落都可以使用它，Agentic Coding in the World!


## Qwen3-Coder

### Pre-Training
我们在预训练阶段上仍然在努力，这次 Qwen3-Coder 我们从不同角度进行 Scaling，以提升模型的代码能力：
* 数据扩展：总计 7.5T（代码占比 70%），在保持通用与数学能力的同时，具备卓越的编程能力；
* 上下文扩展：原生支持 256K 上下文，借助 YaRN 可拓展至 1M，专为仓库级和动态数据（如 Pull Request）优化，助力 Agentic Coding；
* 合成数据扩展：利用 Qwen2.5-Coder 对低质数据进行清洗与重写，显著提升整体数据质量；

### Post-Training

#### Scaling Code RL: Hard to Solve, Easy to Verify
<div align="center">
  <img src="https://qianwen-res.oss-cn-beijing.aliyuncs.com/Qwen3-Coder/coderl.png" alt="" width="800" />
</div>
与当前社区普遍聚焦于竞赛类代码生成不同，我们认为所有的代码任务天然适合执行驱动的大规模强化学习。因此我们选择在更丰富的真实代码任务上扩展 Code RL 训练。通过自动扩展测试样例，我们构造了大量高质量的训练实例，成功释放了强化学习的潜力：不仅显著提升了代码执行成功率，还对其他任务带来增益。这将鼓励我们继续寻找 Hard to Solve, Easy to Verify 的任务，作为强化学习的土壤。

#### Scaling Long-Horizon RL
<div align="center">
  <img src="https://qianwen-res.oss-cn-beijing.aliyuncs.com/Qwen3-Coder/swe.jpg" alt="" width="800" />
</div>

在真实世界的 Software Engneering Task，比如 SWE-Bench，模型需要在环境中不断交互，自主规划、选择工具调用、接受反馈不断做出新决策，这是一个典型的 Long-Horizon RL 任务。我们在 Qwen3-Coder 的后训练阶段执行了 Agent RL，鼓励模型通过多轮交互的方式利用工具解决问题。Agent RL 的主要挑战在于 Environment Scaling，我们实现了可验证环境的扩展系统，借助阿里云的基础设施，实现同时运行 20k 独立环境。这一套基础设施可以提供大规模的强化学习反馈和评测，最终我们在 SWE-bench Verified 上实现了开源模型 SOTA 的效果。


## Code with Qwen3-Coder

### Qwen Code
Qwen Code 是一个 CLI 工具，修改自 Gemini CLI，针对 Qwen3‑Coder系列的模型增强了解析器和工具支持。

确保已安装 Node.js 20 及以上版本，可以通过以下命令安装：

```
curl -qL https://www.npmjs.com/install.sh | sh
```
然后通过 npm 管理器安装 Qwen Code：
```
npm i -g @qwen-code/qwen-code
```
> 另一种方式是从源码安装：
> ```
> git clone https://github.com/QwenLM/qwen-code.git
> cd qwen-code && npm install && npm install -g
> ``` 

Qwen Code 支持 OpenAI SDK 调用 LLM，你可以导出以下环境变量，或者简单地将其放在 `.envfile` 中。

```
export OPENAI_API_KEY="your_api_key_here"
export OPENAI_BASE_URL="https://dashscope-intl.aliyuncs.com/compatible-mode/v1"
export OPENAI_MODEL="qwen3-coder-plus"
```
现在，你可以通过简单地输入 `qwen` 来享受 Qwen-Code 和 Qwen 带来的编程体验。

### Claude Code
除了 Qwen Code 之外，现在还可以将 Qwen3‑Coder 与 Claude Code 搭配使用。只需在[阿里云百炼](https://bailian.console.aliyun.com/)平台申请 API Key，并安装 Claude Code，即可开始畅享编码体验。

```
npm install -g @anthropic-ai/claude-code
```

我们提供了两种接入方式，帮助你无缝地用 Qwen3‑Coder 进行编码。

#### 使用dashscope提供的代理  API
只需要将Anthropic的base url替换成dashscope上提供的endpoint即可。
```
export ANTHROPIC_BASE_URL=https://dashscope-intl.aliyuncs.com/api/v2/apps/claude-code-proxy
export ANTHROPIC_AUTH_TOKEN=your-dashscope-apikey
```
可选方案 2：使用 claude-code-config 自定义路由

#### Optional 2: 使用 claude-code-config 自定义路由
claude-code-router 是一个第三方的路由工具，用于为 Claude Code 灵活地切换不同的后端 API。dashScope平台提供了一个简单的扩展包 claude-code-config，可为 claude-code-router 生成包含 dashScope 支持的默认配置。
```
npm install -g @musistudio/claude-code-router
npm install -g @dashscope-js/claude-code-config
```
生成配置文件和插件目录：
```
ccr-dashscope
```
该命令会自动生成 ccr 所需的配置文件和插件目录。你也可以手动调整 ~/.claude-code-router/config.json 和 ~/.claude-code-router/plugins/ 中的配置。

最后，通过 ccr 开始使用 Claude Code：
```
ccr code
```
至此，你即可通过 ccr 使用 Claude Code 畅享 Qwen3‑Coder 的强大编码能力。祝开发顺利！

### Cline
配置 Qwen3-Coder-480B-A35B-instruct 以使用 cline
‒ 进入 cline 的配置设置
‒ 选择“OpenAI Compatible”模式
‒ 在 OpenAI Compatible API tokens处，输入从 Dashscope 获取的密钥
‒ 勾选“使用自定义基础 URL”，并输入：`https://dashscope.aliyuncs.com/compatible-mode/v1`
‒ 输入模型名称：`qwen3-coder-plus`

<video width="100%" muted controls="1">
    <source src="https://qianwen-res.oss-cn-beijing.aliyuncs.com/Qwen3-Coder/qwen3_coder_plus_with_cline.mp4" type="video/mp4">
</video>

## Use Cases

<!-- Physics-Based Chimney Demolition Simulation with Controlled Explosion -->
<!-- https://qianwen-res.oss-cn-beijing.aliyuncs.com/Qwen3-Coder/demo1.mp4 -->

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
如您希望通过百炼 API 平台 [Alibaba Cloud Model Studio](https://modelstudio.console.alibabacloud.com/) 调用 Qwen3-Coder，欢迎使用以下示例代码进行测试:

```
import os
from openai import OpenAI

client = OpenAI(
    api_key=os.getenv("DASHSCOPE_API_KEY"),
    base_url="https://dashscope.aliyuncs.com/compatible-mode/v1",
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
我们仍在继续努力提升 Coding Agent 的效果，我们希望它能承担更多复杂软件工程中的繁琐任务，解放人类的生产力。Qwen3-Coder 仍有更多尺寸在路上，在保证良好效果的同时降低部署的开销。另外我们也在积极探索 Coding Agent 是否能够实现 self-improving，这是一个令人激动的话题。
