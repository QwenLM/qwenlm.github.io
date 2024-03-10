---
title: "Introducing Qwen-VL"
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
Along with the rapid development of our large language model Qwen, we leveraged Qwen’s capabilities and unified multimodal pretraining to address the limitations of multimodal models in generalization, and we opensourced multimodal model Qwen-VL in Sep. 2023. Recently, the Qwen-VL series has undergone a significant upgrade with the launch of two enhanced versions, Qwen-VL-Plus and Qwen-VL-Max. The key technical advancements in these versions include:

* Substantially boost in image-related reasoning capabilities;
* Considerable enhancement in recognizing, extracting, and analyzing details within images and texts contained therein;
* Support for high-definition images with resolutions above one million pixels and images of various aspect ratios.

<table>
  <tr>
    <td style="width: 15%;"><b>Model Name</b></td>
    <td><b>Model Description</b></td>
  </tr>
  <tr>
    <td>qwen-vl-plus</td>
    <td><sup>Qwen's <b>Enhanced Large Visual Language Model</b>. Significantly upgraded for detailed recognition capabilities and text recognition abilities, supporting ultra-high pixel resolutions up to millions of pixels and arbitrary aspect ratios for image input. It delivers significant performance across a broad range of visual tasks.</sup></td>
  </tr>
  <tr>
    <td>qwen-vl-max</td>
    <td><sup>Qwen's <b>Most Capable Large Visual Language Model</b>. Compared to the enhanced version, further improvements have been made to visual reasoning and instruction-following capabilities, offering a higher level of visual perception and cognitive understanding. It delivers optimal performance on an even broader range of complex tasks.</sup></td>
  </tr>
</table>

<!-- ![model_name](http://qianwen-res.oss-accelerate-overseas.aliyuncs.com/Qwen-VL/blog/model_name.jpeg)  -->

Compared to the open-source version of Qwen-VL, these two models perform on par with Gemini Ultra and GPT-4V in multiple text-image multimodal tasks, significantly surpassing the previous best results from open-source models.

Notably, Qwen-VL-Max outperforms both GPT-4V from OpenAI and Gemini from Google in tasks on Chinese question answering and Chinese text comprehension. This breakthrough underscores the model's advanced capabilities and its potential to set new standards in the field of multimodal AI research and application.

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
    <td>50.0% <sup>2</sup></td>
    <td>75.1% <sup>1</sup></td>
  </tr>
</tbody>
</table>

<!-- ![eval_result](http://ofasys-wlcb.oss-accelerate-overseas.aliyuncs.com/QwenVL/blog/eval_result.jpg) -->
<!-- ![eval_result](http://qianwen-res.oss-accelerate-overseas.aliyuncs.com/Qwen-VL/blog/eval_result.jpg)  -->

New versions of the Qwen\-VL\-Plus and Qwen\-VL\-Max models not only exhibit exceptional benchmark performance but also demonstrate a marked improvement in problem-solving capabilities within real-world scenarios. These advanced models effortlessly engage in dialogue, identify celebrities and landmarks, generate text, and notably, have significantly enhanced their abilities to describe and interpret visual content.

Here we present some practical examples:

### 1. Basic Recognition Capabilities

The latest Qwen-VL models are now more adept at accurately describing and identifying complex information within images, as well as providing detailed background and answering related questions. For instance, Qwen-VL can recognize not only common objects, but also celebrities and landmarks. Qwen-VL can write poetry in various languages inspired by visuals, and analyze everyday screenshots.

{{< fullwidth class="example-container" >}}
{{< example data="1_celeb.json" hide=false next=true >}}
{{< example data="1_2.json" hide=true next=true >}}
{{< example data="1_3.json" hide=true next=true >}}
{{< example data="1_4.json" hide=true next=true >}}
{{< /fullwidth >}}

### 2. Visual Agent Capability: The Essential Role of Localization

Beyond its fundamental capabilities in description and recognition, Qwen-VL also has impressive abilities to pinpoint and query specific elements. For instance, it can accurately highlight the black cars within an image. Moreover, Qwen-VL is also equipped to make judgments, deductions, and decisions based on the prevailing context of a scene.

{{< fullwidth class="example-container" >}}
{{< example data="2_visual_grounding.json" hide=false next=true >}}
{{< example data="2_grounded_caption.json" hide=true next=true >}}
{{< example data="2_driving.json" hide=true next=true >}}
{{< /fullwidth >}}

### 3. Visual Reasoning Capability: To Solve Real Problems

One of the most notable advancements in the latest Qwen-VL is its capacity for complex reasoning based on visual inputs. This enhanced visual reasoning capability goes well beyond mere content description, extending to the comprehension and interpretation of intricate representations such as flowcharts, diagrams, and other symbolic systems. In the realms of problem-solving and reasoning, Qwen-VL-Plus/Max excels not only in mathematical problem-solving and information organization but also in conducting more profound interpretations and analyses of charts and graphs.

{{< fullwidth class="example-container" >}}
{{< example data="3_1.json" hide=false next=true >}}
{{< example data="3_2.json" hide=true next=true >}}
{{< example data="3_3.json" hide=true next=true >}}
{{< example data="3_4.json" hide=true next=true >}}
{{< example data="3_5.json" hide=true next=true >}}
{{< /fullwidth >}}

### 4. Text Information Recognition & Processing

Text processing in images has also improved significantly, especially in terms of recognizing Chinese and English text. Qwen-VL-Plus/Max can now efficiently extract information from tables and documents and reformat this information to meet custom output requirements. In addition, it has an efficient mechanism for identifying and converting dense text, which is very effective in dealing with documents that contain a lot of information. It supports images with extreme aspect ratios, ensuring the flexibility to process diverse visual content.

{{< fullwidth class="example-container" >}}
{{< example data="3_6.json" hide=false next=true >}}
{{< example data="4_1.json" hide=true next=true >}}
{{< example data="4_2.json" hide=true next=true >}}
{{< /fullwidth >}}

## How to Use

Now you can access Qwen-VL-Plus and Qwen-VL-Max through the Huggingface Spaces, the Qwen website, and Dashscope APIs.

* Try Qwen-VL-Plus ([https://huggingface.co/spaces/Qwen/Qwen-VL-Plus](https://huggingface.co/spaces/Qwen/Qwen-VL-Plus)) and Qwen-VL-Max ([https://huggingface.co/spaces/Qwen/Qwen-VL-Max](https://huggingface.co/spaces/Qwen/Qwen-VL-Max)) in the Huggingface Spaces

<iframe
	src="https://qwen-qwen-vl-max.hf.space"
	frameborder="0"
	width="850"
	height="1100"
></iframe>

* Log in to the QianWen web portal at https://tongyi.aliyun.com/qianwen, and switch to "Image Understanding" mode to harness the latest Qwen-VL-Max capabilities.
{{< figure src="http://qianwen-res.oss-accelerate-overseas.aliyuncs.com/Qwen-VL/blog/qwen_web.png#center" width="60%">}}

* Access the powerful APIs of Qwen-VL-Plus and Qwen-VL-Max through the Dashscope platform ([https://help.aliyun.com/zh/dashscope/developer-reference/vl-plus-quick-start](https://help.aliyun.com/zh/dashscope/developer-reference/vl-plus-quick-start)).
{{< figure src="http://qianwen-res.oss-accelerate-overseas.aliyuncs.com/Qwen-VL/blog/dash_api.jpeg#center" width="80%">}}

## Summary

Qwen-VL-Plus and Qwen-VL-Max make significant strides in enhancing high-resolution recognition, text analysis, and image reasoning capabilities. These models now match the performance of GPT4-v and Gemini, outperforming all other open-source and proprietary models in many tasks, such as MMMU, CMMMU, and MathVista. They achieve world-class results in document analysis (DocVQA) and Chinese language-related image understanding (MM-Bench-CN).

Our objective is to continually tap into and elevate the potential of Qwen-VL, enabling it to make a difference across a broader range of applications. We can envision Qwen-VL as an assistant equipped with superhuman visual and linguistic comprehension skills that can provide robust support in everyday dialogues as well as complex scenarios like driving environments and programming contexts.

While there is still a long way to go, we are confident that Qwen-VL will evolve to perceive and understand the world akin to human cognition through continuous optimization and expansion!

* Our Official Website: [https://tongyi.aliyun.com/qianwen](https://tongyi.aliyun.com/qianwen)
* Github: [https://github.com/QwenLM/Qwen-VL](https://github.com/QwenLM/Qwen-VL)
* Huggingface: [http://huggingface.co/Qwen/Qwen-VL-Chat](http://huggingface.co/Qwen/Qwen-VL-Chat)
* ModelScope: [https://modelscope.cn/studios/qwen/Qwen-VL-Chat-Demo](https://modelscope.cn/studios/qwen/Qwen-VL-Chat-Demo)
* API: [https://help.aliyun.com/zh/dashscope/developer-reference/tongyi-qianwen-vl-plus-api](https://help.aliyun.com/zh/dashscope/developer-reference/tongyi-qianwen-vl-plus-api)
* Discord: [https://discord.gg/CV4E9rpNSD](https://discord.gg/CV4E9rpNSD)
