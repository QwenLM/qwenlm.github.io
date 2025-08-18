---
title: "Qwen-Image-Edit: 全能图像编辑，驱动内容创作提质增效"
date: 2025-08-19T01:30:00+08:00
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
{{< figure src="https://qianwen-res.oss-accelerate-overseas.aliyuncs.com/Qwen-Image/edit_homepage.jpg#center" width="100%">}}


{{< button href="https://qwen.ai" label="QWEN CHAT" external=true >}}
{{< button href="https://github.com/QwenLM/Qwen-Image" label="GITHUB" external=true >}}
{{< button href="https://huggingface.co/Qwen/Qwen-Image-Edit" label="HUGGING FACE" external=true >}}
{{< button href="https://modelscope.cn/models/Qwen/Qwen-Image-Edit" label="MODELSCOPE" external=true >}}
{{< button href="https://discord.gg/yPEP2vHTu4" label="DISCORD" external=true >}}


我们很高兴推出 Qwen-Image-Edit，Qwen-Image的图像编辑版本。Qwen-Image-Edit基于我们20B的 Qwen-Image 模型进一步训练，成功将Qwen-Image的独特的文本渲染能力延展至图像编辑领域，实现了对图片中文字的精准编辑。此外，Qwen-Image-Edit将输入图像同时输入到Qwen2.5-VL（实现视觉语义控制）和VAE Encoder（实现视觉外观控制），从而兼具语义与外观的双重编辑能力。如需体验最新模型，欢迎访问 [Qwen Chat](https://qwen.ai) 并选择“图像编辑”功能。

主要特性包括：

* **语义与外观双重编辑**：Qwen-Image-Edit 既支持 low-level 的视觉外观编辑（如元素的添加、删除、修改等，要求图片其他区域完全不变），也支持 high-level 的视觉语义编辑（如 IP 创作、物体旋转、风格迁移等，允许整体像素变化但保持语义一致）。

* **精准文字编辑**：Qwen-Image-Edit 支持中英文双语文字编辑，可在保留原有字体、字号、风格的前提下，直接对图片中的文字进行增、删、改等操作。

* **强大的基准性能**: 在多个公开基准测试中的评估表明，Qwen-Image-Edit 在图像编辑任务上具备SOTA性能，是一个强大的图像编辑基础模型。


## 示例展示
Qwen-Image-Edit的一大亮点在于其强大的语义与外观双重编辑能力。所谓语义编辑，是指在保持原始图像视觉语义不变的前提下，对图像内容进行修改。我们以Qwen的吉祥物——卡皮巴拉为例，来直观展示这一能力：

{{< figure src="https://qianwen-res.oss-cn-beijing.aliyuncs.com/Qwen-Image/edit/幻灯片3.JPG#center " width="100%">}}
可以看到，虽然编辑后的图像大多数像素与输入图像（最左侧的图）都不一样，但依然完美地保持了卡皮巴拉的角色一致性。Qwen-Image的强大的语义编辑能力使其能够轻松的进行原创IP的多样化创作。
更进一步的，我们在Qwen Chat上围绕MBTI十六型人格，设计了一系列编辑prompt，成功地基于吉祥物卡皮巴拉，完成了MBTI表情包的制作，轻松地拓展了IP。

{{< figure src="https://qianwen-res.oss-cn-beijing.aliyuncs.com/Qwen-Image/edit/幻灯片4.JPG#center " width="100%">}}
此外，视角转换同样是语义编辑中的一个重要应用场景。如下方两张示例图所示，Qwen-Image-Edit不仅能够实现物体的90度旋转，还可以完成180度旋转，让我们直接看到物体的背面：
{{< figure src="https://qianwen-res.oss-cn-beijing.aliyuncs.com/Qwen-Image/edit/幻灯片12.JPG#center " width="100%">}}
{{< figure src="https://qianwen-res.oss-cn-beijing.aliyuncs.com/Qwen-Image/edit/幻灯片13.JPG#center " width="100%">}}
语义编辑的另一个典型应用是风格迁移。例如，输入一张人物头像，Qwen-Image-Edit可以轻松将其转换为吉卜力等多种风格，这在虚拟形象创作等场景中极具价值：
{{< figure src="https://qianwen-res.oss-cn-beijing.aliyuncs.com/Qwen-Image/edit/幻灯片1.JPG#center " width="100%">}}
除了语义编辑，外观编辑也是常见的图像编辑需求。外观编辑强调在编辑过程中保持图像的部分区域完全不变，实现元素的增、删、改。下图展示了在图片中添加指示牌的案例，可以看到Qwen-Image-Edit不仅成功添加了指示牌，还生成了相应的倒影，细节处理十分到位。
{{< figure src="https://qianwen-res.oss-cn-beijing.aliyuncs.com/Qwen-Image/edit/幻灯片6.JPG#center " width="100%">}}
下方是另一个有趣的例子，展示了如何在图片中删除细小的头发丝等微小物体。
{{< figure src="https://qianwen-res.oss-cn-beijing.aliyuncs.com/Qwen-Image/edit/幻灯片7.JPG#center " width="100%">}}
此外，还可以对图像中指定的字母“n”进行颜色修改，将其变为蓝色，实现对特定元素的修改。
{{< figure src="https://qianwen-res.oss-cn-beijing.aliyuncs.com/Qwen-Image/edit/幻灯片8.JPG#center " width="100%">}}
外观编辑在人物背景调整、服装更换等场景中同样有着广泛的应用，下面三张图片分别展示了这些实际应用场景。
{{< figure src="https://qianwen-res.oss-cn-beijing.aliyuncs.com/Qwen-Image/edit/幻灯片11.JPG#center " width="100%">}}
{{< figure src="https://qianwen-res.oss-cn-beijing.aliyuncs.com/Qwen-Image/edit/幻灯片5.JPG#center " width="100%">}}

Qwen-Image-Edit的另一大亮点在于其准确的的文字编辑能力，这得益于Qwen-Image在文字渲染方面的深厚积累。如下所示，以下两个案例直观展示了Qwen-Image-Edit在英文文字编辑上的强大表现：
{{< figure src="https://qianwen-res.oss-cn-beijing.aliyuncs.com/Qwen-Image/edit/幻灯片15.JPG#center " width="100%">}}
{{< figure src="https://qianwen-res.oss-cn-beijing.aliyuncs.com/Qwen-Image/edit/幻灯片16.JPG#center " width="100%">}}
Qwen-Image-Edit同样能够直接对中文海报进行编辑，不仅可以修改海报中的大字，连细小的文字也能精准调整。
{{< figure src="https://qianwen-res.oss-cn-beijing.aliyuncs.com/Qwen-Image/edit/幻灯片17.JPG#center " width="100%">}}

最后，让我们通过一个具体的图像编辑案例，演示如何利用链式编辑的方式，逐步修正Qwen-Image生成的书法作品中的错误：
{{< figure src="https://qianwen-res.oss-cn-beijing.aliyuncs.com/Qwen-Image/edit/幻灯片18.JPG#center " width="100%">}}
在这幅作品中，有不少汉字存在生成错误。我们可以借助Qwen-Image-Edit，逐步修复它们。例如，可以在原图中用方框标注出需要修改的区域，指示Qwen-Image-Edit针对这些部分进行修正。这里，我们希望红框内正确地写出“稽”字，蓝色区域正确地写出“亭”字。
{{< figure src="https://qianwen-res.oss-cn-beijing.aliyuncs.com/Qwen-Image/edit/幻灯片19.JPG#center " width="100%">}}
但实际操作中，“稽”字较为生僻，模型未能一次性完成修改。“稽”的右下角应为“旨”而非“日”。此时，我们可以进一步用红框圈出“日”的部分，让Qwen-Image-Edit对该细节进行微调，将其改为“旨”。

{{< figure src="https://qianwen-res.oss-cn-beijing.aliyuncs.com/Qwen-Image/edit/幻灯片20.JPG#center " width="100%">}}
是不是很神奇？通过这种链式、逐步的编辑方式，我们可以持续修正错字，直至获得理想的最终效果。
{{< figure src="https://qianwen-res.oss-cn-beijing.aliyuncs.com/Qwen-Image/edit/幻灯片21.JPG#center " width="100%">}}
{{< figure src="https://qianwen-res.oss-cn-beijing.aliyuncs.com/Qwen-Image/edit/幻灯片22.JPG#center " width="100%">}}
{{< figure src="https://qianwen-res.oss-cn-beijing.aliyuncs.com/Qwen-Image/edit/幻灯片23.JPG#center " width="100%">}}
{{< figure src="https://qianwen-res.oss-cn-beijing.aliyuncs.com/Qwen-Image/edit/幻灯片24.JPG#center " width="100%">}}
{{< figure src="https://qianwen-res.oss-cn-beijing.aliyuncs.com/Qwen-Image/edit/幻灯片25.JPG#center " width="100%">}}
最终，我们成功获得了完全正确的兰亭集序书法版本！

综上，我们希望Qwen-Image-Edit能够进一步推动在图像生成领域的发展，真正降低视觉内容创作的技术门槛，激发更多创新应用的可能。
