---
title: "Qwen VLo: 从“看懂”世界到“描绘”世界"
date: 2025-06-26T22:00:04+08:00
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
{{< figure src="https://qianwen-res.oss-accelerate.aliyuncs.com/Qwen-VLo/vlo.png#center" width="100%">}}

{{< button href="https://chat.qwenlm.ai" label="QWEN CHAT" external=true >}}
{{< button href="https://discord.gg/yPEP2vHTu4" label="DISCORD" external=true >}}

{{<video src="https://qianwen-res.oss-accelerate.aliyuncs.com/Qwen-VLo/vlo.mov" muted="true" width="100%" loop="true" autoplay="true">}}

## **介绍**


多模态大模型的演进正在不断突破我们对技术边界的认知。从最初的 QwenVL 到如今的 Qwen2.5 VL ，我们在提升模型对图像内容的理解能力方面取得了一些进展。今天，我们正式推出 Qwen VLo ——一个多模态统一理解与生成模型。这一全新升级的模型不仅能够“看懂”世界，更能基于理解进行高质量的再创造，真正实现了从感知到生成的跨越。需要注意的是，这是一款预览版本，您可以通过 Qwen Chat 访问它。您可以直接发送类似“生成一张可爱猫咪的图片”的提示来生成图像，或者上传一张猫咪的图片并要求“给猫咪头上加顶帽子”来修改图像。图像的生成过程如下所示:

**生成过程：发挥你想象力，将你的想法变成现实**

{{<video src="https://qianwen-res.oss-accelerate.aliyuncs.com/Qwen-VLo/header_cn.mov" muted="true" width="100%" loop="true" autoplay="true">}}



正如视频中展示的生成过程，Qwen VLo 以一种渐进式生成方式，从左到右、从上到下逐步清晰地构建整幅图片。在生成过程中，模型会对预测的内容不断调整和优化，从而确保最终结果更加和谐一致。这种生成机制不仅提升了视觉效果，还为用户带来了更灵活、更可控的创作体验。

## **从理解到创造：更精准的多模态生成能力**

Qwen VLo在原始多模态理解与生成能力上进行了全面升级，显著增强了对图像内容的理解深度，并在此基础上实现了更加准确和一致的生成效果。以下是 Qwen VLo 的核心亮点：


1. **更精准的内容理解与再创造**

以往的多模态模型在生成过程中容易出现语义不一致的问题，例如将汽车误生成其他类型的物体，或者无法保留原图的关键结构特征。而 Qwen VLo 通过更强大的细节捕捉能力，能够在生成过程中保持高度的语义一致性。例如，当用户输入一张汽车的照片并要求“更换颜色”时，Qwen VLo 不仅能准确识别车型，还能保留其原有的结构特征，同时完成色彩风格的自然转换，让生成结果既符合预期又不失真实感。

2. **支持开放指令编辑修改生成**  

用户可以通过自然语言提出各种创意性指令，如“将这张画风改为梵高风格”、“让这张照片看起来像19世纪的老照片”或“给这张图片添加一个晴朗的天空”。Qwen VLo 能够灵活响应这些开放性指令，并生成符合用户预期的结果。无论是艺术风格迁移、场景重构还是细节修饰，模型都能轻松应对。甚至一些传统的视觉感知人物如预测深度图、分割图、检测图以及边缘信息等也可以通过编辑指令轻松完成。更进一步，像很多更复杂的指令，比如一条指令中同时包含修改物体、修改文字、更换背景，模型也能轻松完成。

3. **多语言指令支持**  

Qwen VLo 支持包括中文、英文在内的多种语言指令，打破了语言壁垒，为全球用户提供了统一且便捷的交互体验。无论您使用哪种语言，只需简单描述您的需求，模型便能快速理解并输出理想结果。


## **样例**

Qwen VLo 更像一个人类画师, 根据自己的理解再进行创作. 下面是一些具体的例子。


Qwen VLo 能够直接生成图像，并对其进行修改，例如替换背景、添加主体、进行风格迁移，甚至可以完成基于开放指令的大幅修改，包括检测和分割等视觉感知任务。

{{< fullwidth class="example-container" >}}
{{< example data="cases/Shiba_en.json" hide=false next=true scroll=true >}}
{{< /fullwidth >}}

Qwen VLo 会根据自己的理解进行重新创作，这意味着在风格转换和迁移方面拥有更大的发挥空间，比如将卡通变为写实、将形象变成气球等有趣的生成效果。

{{< fullwidth class="example-container" >}}
{{< example data="cases/style.json" hide=false next=true scroll=true >}}
{{< example data="cases/style2.json" hide=true next=true scroll=true >}}
{{< example data="cases/style3.json" hide=true next=true scroll=true >}}
{{< example data="cases/style_v2.json" hide=true next=true scroll=true >}}
{{< example data="cases/style_v3.json" hide=true next=true scroll=true >}}
{{< example data="cases/style_v4.json" hide=true next=true scroll=true >}}
{{< example data="cases/style_v5.json" hide=true next=true scroll=true >}}
{{< example data="cases/style_v6.json" hide=true next=true scroll=true >}}
{{< example data="cases/style_v7.json" hide=true next=true scroll=true >}}
{{< /fullwidth >}}


Qwen VLo 在图像与指令理解上的优势使其能够更好地解析复杂指令，一条指令中可以包含多个操作和修改，从而一次性完成多重任务，例如生成海报、组合物体等。

{{< fullwidth class="example-container" >}}
{{< example data="cases/complex.json" hide=false next=true scroll=true >}}
{{< example data="cases/complex2.json" hide=true next=true scroll=true >}}
{{< example data="cases/Poster-your-cat.json" hide=true next=true scroll=true >}}
{{< example data="cases/Poster_generation.json" hide=true next=true scroll=true >}}
{{< /fullwidth >}}

Qwen VLo 除了能对图像的编辑和再创作，还可以完成一些对已有信息的标注，比如检测、分割、边缘检测等。

{{< fullwidth class="example-container" >}}
{{< example data="cases/cv.json" hide=false next=true scroll=true >}}
{{< example data="cases/Select-Remove-Add.json" hide=true next=true scroll=true >}}
{{< /fullwidth >}}


Qwen VLo 可以支持多张图像的输入理解和生成。(多图输入的功能还没有正式上线，敬请期待。)

{{< fullwidth class="example-container" >}}
{{< example data="cases/multi_obj.json" hide=false next=true scroll=true >}}
{{< /fullwidth >}}


当然除了图文同时输入的情况，Qwen VLo 也支持文本到图像的直接生成，包括通用图像和中英文海报等。

{{< fullwidth class="example-container" >}}
{{< example data="cases/t2i_1.json" hide=false next=true scroll=true >}}
{{< example data="cases/t2i_2.json" hide=true next=true scroll=true >}}
{{< example data="cases/t2i_3.json" hide=true next=true scroll=true >}}
{{< example data="cases/t2i_4.json" hide=true next=true scroll=true >}}
{{< example data="cases/t2i_5.json" hide=true next=true scroll=true >}}
{{< example data="cases/t2i_6.json" hide=true next=true scroll=true >}}
{{< example data="cases/t2i_7.json" hide=true next=true scroll=true >}}
{{< example data="cases/t2i_8.json" hide=true next=true scroll=true >}}
{{< /fullwidth >}}

Qwen VLo 支持动态长宽比的图像生成，对于长宽比高达 4:1 ，1:3 等细长类型图像也能轻松掌握。(极端长宽比图像生成功能还没有正式上线，敬请期待。)

{{< fullwidth class="example-container" >}}
{{< example data="cases/t2i_9.json" hide=false next=true scroll=true >}}
{{< example data="cases/t2i_10.json" hide=true next=true scroll=true >}}
{{< example data="cases/t2i_11.json" hide=true next=true scroll=true >}}
{{< example data="cases/t2i_12.json" hide=true next=true scroll=true >}}
{{< example data="cases/t2i_13.json" hide=true next=true scroll=true >}}
{{< /fullwidth >}}

作为统一的理解与生成模型，Qwen VLo 还可以对生成的内容进行再分析和理解，例如识别生成图片中的狗和猫的品种。

{{< fullwidth class="example-container" >}}
{{< example data="cases/Generation_and_Understanding.json" hide=false next=true scroll=true >}}
{{< /fullwidth >}}




## **如何使用**

Qwen VLo 采用动态分辨率训练，支持动态分辨率生成。无论是输入端还是输出端，模型都支持任意分辨率和长宽比的图像生成。这意味着用户不再受限于固定的格式，可以根据实际需求生成适配不同场景的图像内容，无论是海报、插图、网页 Banner 还是社交媒体封面，都能轻松应对。

此外，Qwen VLo 还创新性地引入了一种全新的生成机制：从上到下、从左到右逐步清晰的生成过程
这一机制不仅提升了生成效率，还特别适用于需要精细控制的长段落文字生成任务。例如，在生成带有大量文本的广告设计或漫画分镜时，Qwen VLo 逐步生成慢慢修改。这种渐进式的生成方式让用户可以实时观察生成过程，并根据需要进行调整，从而获得最佳的创作效果。

## **局限性**
Qwen VLo 还属于预览阶段，有很多不足的地方，在生成的过程可能存在不符合事实、不完全和原图一致、指令不遵循、在识别生图和理解的意图不够稳定的问题，还请谅解。我们会持续迭代，不断提升模型的稳定性和鲁棒性。 

## **下一步：用图像表达想法，用生成促进理解**

随着多模态大模型逐渐具备视觉与文本的双向输入输出能力，我们也开启了一种全新的表达和交互方式。未来，模型不仅可以用文本回答问题，还可以用图像来传递想法和含义。例如，生成示意图、添加辅助线、标注关键区域等功能，都将为用户提供更多元化的交流手段。

与此同时，具备输出能力的多模态模型也为我们提供了新的监督方式。通过生成任务，我们可以更好地帮助模型理解世界。例如，模型可以通过生成分割图、检测图等中间结果来验证自身的理解是否正确，从而进一步提升性能。这将是我们在未来持续关注和探索的方向。





