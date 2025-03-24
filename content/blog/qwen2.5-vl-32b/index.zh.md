---
title: "Qwen2.5-VL-32B: 更聪明、更轻量!"
date: 2025-03-24T00:00:04+08:00
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

{{< button href="https://chat.qwenlm.ai" label="QWEN CHAT" external=true >}}
{{< button href="https://github.com/QwenLM/Qwen2.5-VL" label="GITHUB" external=true >}}
{{< button href="https://huggingface.co/collections/Qwen/qwen25-vl-6795ffac22b334a837c0f9a5" label="HUGGING FACE" external=true >}}
{{< button href="https://modelscope.cn/collections/Qwen25-VL-58fbb5d31f1d47" label="MODELSCOPE" external=true >}}
{{< button href="https://discord.gg/yPEP2vHTu4" label="DISCORD" external=true >}}


## 介绍

今年一月底，我们推出了 Qwen2.5-VL 系列模型，获得了社区的广泛关注和积极反馈。在 Qwen2.5-VL 系列的基础上，我们使用强化学习持续优化模型，并使用 Apache 2.0 协议开源 32B 这个备受喜爱的参数规模的新 VL 模型—— **Qwen2.5-VL-32B-Instruct**。相比此前发布的 Qwen2.5-VL 系列模型，本次推出的 32B 模型的特点如下：


- **回复更符合人类主观偏好**：调整了输出风格，使回答更加详细、格式更规范，并更符合人类偏好。 
- **数学推理能力**：复杂数学问题求解的准确性显著提升。  
- **图像细粒度理解与推理**：在图像解析、内容识别以及视觉逻辑推导等任务中表现出更强的准确性和细粒度分析能力。  
 


## 性能表现  

我们与业内先进的同规模模型进行比较，包括近期推出的 Mistral-Small-3.1-24B 和 Gemma-3-27B-IT， **Qwen2.5-VL-32B-Instruct** 展现出了明显的优势，甚至超越了更大规模的 **Qwen2-VL-72B-Instruct** 模型。尤其是在多模态任务中，例如 **MMMU**、**MMMU-Pro** 和 **MathVista**，这些任务强调复杂的多步骤推理，Qwen2.5-VL-32B-Instruct 表现尤为突出。在注重主观用户体验评估的 **MM-MT-Bench** 基准测试中，该模型相较于其前代 **Qwen2-VL-72B-Instruct** 取得了显著进步。  

{{< figure src="https://qianwen-res.oss-cn-beijing.aliyuncs.com/Qwen2.5-VL-32B/qwen2.5vl-32b-vision.jpg" width="100%">}}

除了在视觉能力上优秀，**Qwen2.5-VL-32B-Instruct** 在纯文本能力上也达到了同规模的最优表现。

{{< figure src="https://qianwen-res.oss-cn-beijing.aliyuncs.com/Qwen2.5-VL-32B/qwen2.5vl-32b-text.jpg" width="100%">}}

## 样例

{{< fullwidth class="example-container" >}}
{{< example data="cases/reasoning.json" hide=false next=true >}}
{{< example data="cases/math3.json" hide=true next=true >}}
{{< example data="cases/math1.json" hide=true next=true >}}
{{< example data="cases/math2.json" hide=true next=true >}}
{{< example data="cases/image_understanding.json" hide=true next=true >}}
{{< /fullwidth >}}

## 下一步计划  

尽管 **Qwen2.5-VL-32B** 在强化学习框架下优化了主观体验和数学推理能力——这主要基于“快速思考”模式，但我们的下一步研究将聚焦于**长且有效的推理过程**，以突破视觉模型在处理高度复杂、多步骤视觉推理任务中的边界。  


## 引用

如果你觉得我们的模型对你有帮助，欢迎在你的工作中引用我们的技术报告：

```
@article{Qwen2.5-VL,
  title={Qwen2.5-VL Technical Report},
  author={Bai, Shuai and Chen, Keqin and Liu, Xuejing and Wang, Jialin and Ge, Wenbin and Song, Sibo and Dang, Kai and Wang, Peng and Wang, Shijie and Tang, Jun and Zhong, Humen and Zhu, Yuanzhi and Yang, Mingkun and Li, Zhaohai and Wan, Jianqiang and Wang, Pengfei and Ding, Wei and Fu, Zheren and Xu, Yiheng and Ye, Jiabo and Zhang, Xi and Xie, Tianbao and Cheng, Zesen and Zhang, Hang and Yang, Zhibo and Xu, Haiyang and Lin, Junyang},
  journal={arXiv preprint arXiv:2502.13923},
  year={2025}
}
```
