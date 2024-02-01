---
title: "Qwen-VL全新升级！"
date: 2024-01-25T13:33:00+08:00
weight: 1
# aliases: ["/first"]
# tags: ["Research"]
draft: false
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
我们在Qwen语言模型的基础上，结合此前我们提出的多模态多任务训练，以解决多模态模型在泛化能力上的局限性，并于2023年9月开源了多模态模型Qwen-VL。最近，Qwen-VL系列有了重大升级，推出了两个增强版本：Qwen-VL-Plus和Qwen-VL-Max。这两个版本的关键提升包括：

* 显著提升与图像相关的推理能力；
* 在识别、提取和分析图像及其内含文本中的细节方面有明显增强；
* 支持百万像素以上的高清晰度图像以及各种宽高比的图像。

<table>
  <tr>
    <td style="width: 15%;"><b>Model Name</b></td>
    <td><b>模型描述</b></td>
  </tr>
  <tr>
    <td>qwen-vl-plus</td>
    <td><sup>Qwen的增强型大规模视觉语言模型。该模型针对细节识别能力和文本识别能力进行了显著升级，支持高达数百万像素的超高清分辨率及任意图像输入的宽高比。它在各类视觉任务上都展现出卓越的性能表现。</sup></td>
  </tr>
  <tr>
    <td>qwen-vl-max</td>
    <td><sup>Qwen的最强大视觉语言模型。相较于增强版本，该模型在视觉推理和指令执行能力上做出了进一步提升，提供了更高级别的视觉感知与认知理解力,在更广泛复杂的任务上都能实现最优性能。</sup></td>
  </tr>
</table>


相比于开源版本的Qwen-VL，这两个模型在多个文本-图像多模态任务中与Gemini Ultra和GPT-4V的表现相当，显著超越了之前开源模型的最佳结果。值得一提的是，Qwen-VL-Max在中文问题回答和中文文本理解任务上超越了OpenAI的GPT-4V以及谷歌的Gemini。下文展示了实验结果及真实用例。

<table>
<thead>
  <tr>
    <th style="width: 20%;">Model</th>
    <th>DocVQA<br><sup><sup>Document understanding</sup><sup></th>
    <th>ChartQA<br><sup><sup>Chart understanding</sup></sup></th>
    <th>AI2D<br><sup><sup>Science diagrams</sup></sup></th>
    <th>TextVQA<br><sup><sup>Text reading</sup></sup></th>
    <th>MMMU<br><sup><sup>College-level problems</sup></sup></th>
    <th>MathVista<br><sup><sup>Mathematical reasoning</sup></sup></th>
    <th>MM-Bench-CN<br><sup><sup>Natural image QA in Chinese</sup></sup></th>
  </tr>
</thead>
<tbody align="center">
  <tr>
    <td>Other Best<br><sup>Open-source LVLM</sup></td>
    <td>81.6%<br><sup><sup>(CogAgent)</sup></sup></td>
    <td>68.4%<br><sup><sup>(CogAgent)</sup></sup></td>
    <td>73.7%<br><sup><sup>(Fuyu-Medium)</sup></sup></td>
    <td>76.1%<br><sup><sup>(CogAgent)</sup></sup></td>
    <td>45.9%<br><sup><sup>(Yi-VL-34B)</sup></sup></td>
    <td>36.7%<br><sup><sup>(SPHINX-V2)</sup></sup></td>
    <td>72.4%<br><sup><sup>(InternLM-XComposer-VL)</sup></sup></td>
  </tr>
  <tr>
    <td>Gemini Pro</td>
    <td>88.1%</td>
    <td>74.1%</td>
    <td>73.9%</td>
    <td>74.6%</td>
    <td>47.9%</td>
    <td>45.2%</td>
    <td>74.3%</td>
  </tr>
  <tr>
    <td>Gemini Ultra</td>
    <td>90.9%</td>
    <td>80.8% <sup>1</sup></td>
    <td>79.5% <sup>1</sup></td>
    <td>82.3% <sup>1</sup></td>
    <td>59.4% <sup>1</sup></td>
    <td>53.0% <sup>1</sup></td>
    <td>-</td>
  </tr>
  <tr>
    <td>GPT-4V</td>
    <td>88.4%</td>
    <td>78.5%</td>
    <td>78.2%</td>
    <td>78.0%</td>
    <td>56.8%</td>
    <td>49.9%</td>
    <td>73.9%</td>
  </tr>
  <tr>
    <td><b>Qwen-VL-Plus</b></td>
    <td>91.4%</td>
    <td>78.1%</td>
    <td>75.9%</td>
    <td>78.9%</td>
    <td>45.2%</td>
    <td>43.3%</td>
    <td>68.0%</td>
  </tr>
  <tr>
    <td><b>Qwen-VL-Max</b></td>
    <td>93.1% <sup>1</sup></td>
    <td>79.8% <sup>2</sup></td>
    <td>79.3% <sup>2</sup></td>
    <td>79.5% <sup>2</sup></td>
    <td>51.4% <sup>3</sup></td>
    <td>51.0% <sup>2</sup></td>
    <td>75.1% <sup>1</sup></td>
  </tr>
</tbody>
</table>

<!-- ![eval_result](http://ofasys-wlcb.oss-accelerate-overseas.aliyuncs.com/QwenVL/blog/eval_result.jpg) -->
<!-- ![eval_result](http://qianwen-res.oss-accelerate-overseas.aliyuncs.com/Qwen-VL/blog/eval_result.jpg)  -->

最新版本的Qwen-VL-Plus和Qwen-VL-Max模型不仅在基准测试性能上表现出色，而且在解决实际场景中的问题方面也展现了显著的进步。这些先进的模型能够轻松进行对话互动、识别名人和地标、生成文本，并且它们在描述和解读视觉内容的能力上有了显著提升。

以下是一些实际应用示例：

### 1. 基础识别能力

最新的Qwen-VL模型在准确描述和识别图像中的复杂信息以及提供详尽背景和回答相关问题方面表现出更高的能力。例如，Qwen-VL不仅能识别常见的物体，还能识别名人和地标。此外，Qwen-VL还能根据视觉输入创作各种语言的诗歌，并能对日常截图进行分析解读。

{{< fullwidth class="example-container" >}}
{{< example data="1_celeb.json" hide=false next=true >}}
{{< example data="1_2.json" hide=true next=true >}}
{{< example data="1_3.json" hide=true next=true >}}
{{< example data="1_4.json" hide=true next=true >}}
{{< /fullwidth >}}

### 2. 视觉Agent能力

除了在描述和识别方面的基本功能外，Qwen-VL还具有强大的定位和检索特定元素的能力。例如，它能够精准地在图像中标识出黑色的汽车。此外，Qwen-VL还具备根据场景的当前上下文进行判断、推理和决策的能力。

{{< fullwidth class="example-container" >}}
{{< example data="2_visual_grounding.json" hide=false next=true >}}
{{< example data="2_grounded_caption.json" hide=true next=true >}}
{{< example data="2_driving.json" hide=true next=true >}}
{{< /fullwidth >}}

### 3. 视觉推理能力

最新的Qwen-VL的一项重大突破在于其基于视觉输入进行复杂推理的能力。这项增强的视觉推理功能超越了简单的内容描述，能够理解和解读诸如流程图、图表和其他符号系统等复杂的表达形式。在问题解决和推理领域，Qwen-VL-Plus/Max不仅擅长数学问题求解和信息组织，还在对图表和图形进行深度诠释与分析方面表现出色。

{{< fullwidth class="example-container" >}}
{{< example data="3_1.json" hide=false next=true >}}
{{< example data="3_2.json" hide=true next=true >}}
{{< example data="3_3.json" hide=true next=true >}}
{{< example data="3_4.json" hide=true next=true >}}
{{< example data="3_5.json" hide=true next=true >}}
{{< /fullwidth >}}

### 4. 文字识别及处理

在识别中文和英文文本方面。Qwen-VL-Plus/Max现在能够高效地从表格和文档中提取信息，并根据自定义输出需求重新格式化这些信息。此外，它还具备一种高效的密集文本识别与转换机制，在处理包含大量信息的文档时表现非常出色。该技术支持各种极端纵横比的图像，确保了对多样视觉内容进行处理的灵活性。

{{< fullwidth class="example-container" >}}
{{< example data="3_6.json" hide=false next=true >}}
{{< example data="4_1.json" hide=true next=true >}}
{{< example data="4_2.json" hide=true next=true >}}
{{< /fullwidth >}}

## 如何使用

当前，用户可以通过Huggingface Spaces、通义千问官方网站以及Dashscope APIs来使用Qwen-VL-Plus和Qwen-VL-Max模型。

* [Qwen-VL-Plus](https://huggingface.co/spaces/Qwen/Qwen-VL-Plus)
* [Qwen-VL-Max](https://huggingface.co/spaces/Qwen/Qwen-VL-Max)

<iframe
	src="https://qwen-qwen-vl-max.hf.space"
	frameborder="0"
	width="850"
	height="1100"
></iframe>

* 登录千问官网 https://tongyi.aliyun.com/qianwen，并使用图像理解模式来使用最新的Qwen-VL模型。
{{< figure src="http://qianwen-res.oss-accelerate-overseas.aliyuncs.com/Qwen-VL/blog/qwen_web.png#center" width="60%">}}

* 通过DashScope使用Qwen-VL-Plus和Qwen-VL-Max的API([DashScope](https://help.aliyun.com/zh/dashscope/developer-reference/vl-plus-quick-start)).
{{< figure src="http://qianwen-res.oss-accelerate-overseas.aliyuncs.com/Qwen-VL/blog/dash_api.jpeg#center" width="80%">}}

## 总结

Qwen-VL-Plus和Qwen-VL-Max在提升高分辨率识别、文本分析和图像推理能力方面取得了重大突破。这些模型现在已经达到了GPT4-V和Gemini的性能水平，在诸如MMMU、CMMMU和MathVista等众多任务上超越了所有其他开源及专有模型。它们在文档分析（DocVQA）和中文相关的图像理解（MM-Bench-CN）等领域取得了领先的表现。

我们的目标是持续挖掘并提升Qwen-VL的潜力，使其能够在更广泛的应用场景中发挥作用。我们可以设想一个具备超人视觉和语言理解能力的Qwen-VL助手，无论是在日常对话中，还是在复杂的驾驶环境和编程场景下，都能提供强有力的支持。

尽管我们还有很长的路要走，但我们坚信通过持续优化和扩展，Qwen-VL将逐步进化到能够像人类认知一样感知和理解世界！

* 官网：[https://tongyi.aliyun.com/qianwen](https://tongyi.aliyun.com/qianwen)
* Github: [https://github.com/QwenLM/Qwen-VL](https://github.com/QwenLM/Qwen-VL)
* Huggingface: [http://huggingface.co/Qwen/Qwen-VL-Chat](http://huggingface.co/Qwen/Qwen-VL-Chat)
* ModelScope: [https://modelscope.cn/studios/qwen/Qwen-VL-Chat-Demo](https://modelscope.cn/studios/qwen/Qwen-VL-Chat-Demo)
* API: [https://help.aliyun.com/zh/dashscope/developer-reference/tongyi-qianwen-vl-plus-api](https://help.aliyun.com/zh/dashscope/developer-reference/tongyi-qianwen-vl-plus-api)
* Discord: [https://discord.gg/z3GAxXZ9C](https://discord.gg/z3GAxXZ9C)
