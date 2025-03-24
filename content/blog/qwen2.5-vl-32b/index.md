---
title: "Qwen2.5-VL-32B: Smarter and Lighter"
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

## Introduction

At the end of January this year, we launched the Qwen2.5-VL series of models, which received widespread attention and positive feedback from the community. Building on the Qwen2.5-VL series, we continued to optimize the model using reinforcement learning and open-sourced the new VL model with the beloved 32B parameter scale under the Apache 2.0 license — **Qwen2.5-VL-32B-Instruct**. Compared to the previously released Qwen2.5-VL series models, the features of this 32B VL model are as follows:


- **Responses More Aligned with Human Preferences**: Adjusted the output style to provide more detailed, better-formatted answers that align more closely with human preferences.
- **Mathematical Reasoning**: Significant improvement in the accuracy of solving complex mathematical problems.  
- **Fine-grained Image Understanding and Reasoning**: Enhanced accuracy and detailed analysis in tasks such as image parsing, content recognition, and visual logic deduction.  




## Performance  
Extensive benchmarking against state-of-the-art (SoTA) models of comparable scale, **Qwen2.5-VL-32B-Instruct** has demonstrated superiority over baselines, e.g., Mistral-Small-3.1-24B and Gemma-3-27B-IT, even surpassing the larger **Qwen2-VL-72B-Instruct**. Notably, it achieves significant advantages in multimodal tasks such as **MMMU**, **MMMU-Pro**, and **MathVista**, which focus on complex, multi-step reasoning. On **MM-MT-Bench**, a benchmark emphasizing subjective user experience evaluation, **Qwen2.5-VL-32B-Instruct** outperforms its predecessor **Qwen2-VL-72B-Instruct** by a substantial margin.  


{{< figure src="https://qianwen-res.oss-cn-beijing.aliyuncs.com/Qwen2.5-VL-32B/qwen2.5vl-32b-vision.jpg" width="100%">}}

In addition to excelling in visual capabilities, Qwen2.5-VL-32B-Instruct has also achieved top-tier performance in pure text capabilities at the same scale.

{{< figure src="https://qianwen-res.oss-cn-beijing.aliyuncs.com/Qwen2.5-VL-32B/qwen2.5vl-32b-text.jpg" width="100%">}}


## Demo Cases

{{< fullwidth class="example-container" >}}
{{< example data="cases/reasoning.json" hide=false next=true >}}
{{< example data="cases/math3.json" hide=true next=true >}}
{{< example data="cases/math1.json" hide=true next=true >}}
{{< example data="cases/math2.json" hide=true next=true >}}
{{< example data="cases/image_understanding.json" hide=true next=true >}}
{{< /fullwidth >}}


## Next Step

While **Qwen2.5-VL-32B** has focused on optimizing subjective experience and mathematical reasoning through reinforcement learning—operating within the paradigm of **"fast thinking"**. Our next research direction will prioritize **long and effective reasoning processes** to push the boundaries of visual models in tackling highly complex, multi-step visual reasoning tasks.  



## Citation

If you find our model helpful, feel free to cite it:

```
@article{Qwen2.5-VL,
  title={Qwen2.5-VL Technical Report},
  author={Bai, Shuai and Chen, Keqin and Liu, Xuejing and Wang, Jialin and Ge, Wenbin and Song, Sibo and Dang, Kai and Wang, Peng and Wang, Shijie and Tang, Jun and Zhong, Humen and Zhu, Yuanzhi and Yang, Mingkun and Li, Zhaohai and Wan, Jianqiang and Wang, Pengfei and Ding, Wei and Fu, Zheren and Xu, Yiheng and Ye, Jiabo and Zhang, Xi and Xie, Tianbao and Cheng, Zesen and Zhang, Hang and Yang, Zhibo and Xu, Haiyang and Lin, Junyang},
  journal={arXiv preprint arXiv:2502.13923},
  year={2025}
}
```