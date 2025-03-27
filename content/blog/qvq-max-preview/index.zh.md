---
title: "QVQ-Max：有依据地思考"
date: 2025-03-28T00:00:04+08:00
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
{{<video src="http://qianwen-res.oss-cn-beijing.aliyuncs.com/QVQ-Max/head.mov" muted="true" width="100%" loop="true" autoplay="true">}}

{{< button href="https://chat.qwenlm.ai" label="QWEN CHAT" external=true >}}
{{< button href="https://github.com/QwenLM/Qwen2.5-VL" label="GITHUB" external=true >}}
{{< button href="https://huggingface.co/collections/Qwen/qwen25-vl-6795ffac22b334a837c0f9a5" label="HUGGING FACE" external=true >}}
{{< button href="https://modelscope.cn/collections/Qwen25-VL-58fbb5d31f1d47" label="MODELSCOPE" external=true >}}
{{< button href="https://discord.gg/yPEP2vHTu4" label="DISCORD" external=true >}}


### **介绍**

去年12月，我们推出了 QVQ-72B-Preview, 作为一个探索模型，它存在很多问题。今天，我们正式推出 QVQ-Max 视觉推理模型的第一版。这款模型的特点是，它不仅能够“看懂”图片和视频里的内容，还能结合这些信息进行分析、推理，甚至给出解决方案。从数学题到生活小问题，从编程代码到艺术创作，QVQ-Max 都表现出了不俗的能力。虽然这只是我们的第一个版本，但它的潜力已经让人眼前一亮。


{{< figure src="https://qianwen-res.oss-cn-beijing.aliyuncs.com/QVQ-Max/test_time.png#center" width="80%">}}

MathVision 是汇集各类困难多模态数学的 benchmark，我们通过模型在上面的表现来评估模型解决复杂数学问题的能力。如图所示，通过调整模型 thinking 的最大长度，我们会发现模型在 MathVision 的准确率会持续提升，这展现了模型巨大的潜力。

接下来，我们就来聊聊 QVQ-Max 的设计初衷、实际能力以及它能为大家做些什么。


### **为什么需要视觉推理？**

传统的AI模型大多依赖文字输入，比如回答问题、写文章或者生成代码。但现实生活中，很多信息并不是用文字表达的，而是以图片、图表甚至视频的形式存在。一张图片可能包含丰富的细节，比如颜色、形状、位置关系等，而这些信息往往比文字更直观、也更复杂。

举个例子，如果你想知道一张建筑图纸是否合理，光靠描述可能很难判断，但如果能看到图纸并结合专业知识去分析，就会容易得多。这就是视觉推理的意义——它让 AI 不仅能“看”，还能“理解”并“思考”。

我们设计 QVQ-Max 的目标很简单：让它成为一个既“眼尖”又“脑快”的助手，帮助用户解决各种实际问题。

---

### **核心能力：从观察到推理**

QVQ-Max的能力可以总结为三个方面：细致观察、深入推理和灵活应用。下面分别来说说它在这些方面的表现。

1. **细致观察：抓住每一个细节**  
   QVQ-Max 对图片的解析能力非常强，无论是复杂的图表还是日常生活中随手拍的照片，它都能快速识别出关键元素。比如，它可以告诉你一张照片里有哪些物品、有什么文字标识，甚至还能指出一些你可能忽略的小细节。

2. **深入推理：不只是“看到”，还要“想到”**  
   仅仅识别出图片里的内容还不够，QVQ-Max 还能进一步分析这些信息，并结合背景知识得出结论。例如，在一道几何题中，它可以根据题目附带的图形推导出答案；在一段视频里，它能根据画面内容推测出接下来可能发生的情节。

3. **灵活应用：从解答问题到创作**  
   除了分析和推理，QVQ-Max 还能做一些有趣的事情，比如帮你设计插画、生成短视频脚本，甚至根据你的需求创作角色扮演的内容。如果你上传一幅草稿，它可能会帮你完善成一幅完整的作品；上传一个日常照片，它可以化身犀利的评论家，占卜师。

## 样例

QVQ-Max 的应用范围很广，无论是在学习、工作还是日常生活中，它都能派上用场。

- **职场工具**：在工作中，QVQ-Max 可以协助完成数据分析、信息整理、编程写代码等任务。
- **学习助手**：对于学生来说，QVQ-Max 可以帮助解答数学、物理等科目的难题，尤其是那些配有图表的题目。它还能通过直观的方式讲解复杂概念，让学习变得更轻松。
- **生活小帮手**：在生活中，QVQ-Max 也能提供不少实用建议。比如，它可以根据你的衣柜照片推荐穿搭方案，或者根据食谱图片指导你如何烹饪一道新菜。

{{< fullwidth class="example-container" >}}
{{< example data="cases/recognition.json" hide=false next=true >}}
{{< example data="cases/math.json" hide=true next=true >}}
{{< example data="cases/Palm_reading.json" hide=true next=true >}}
{{< example data="cases/video.json" hide=true next=true >}}
{{< example data="cases/video_and_game.json" hide=true next=true >}}
{{< /fullwidth >}}

---

## **下一步**

目前的 QVQ-Max 只是第一版，还有很多可以提升的空间。接下来，我们会重点关注以下几个方向：

1. **更准确地观察**：通过视觉内容的校验，如grounding来检查观察内容的准确性提高识别能力。
2. **视觉Agent**：提升模型在处理多步和更复杂的任务，如手机电脑操控，玩游戏。
3. **更好的交互**：让模型在思考和交互中不局限于文字，还可以涵盖更多的模态，比如工具校验，视觉生成等。


QVQ-Max 是一款既有“眼力”又有“脑力”的视觉推理模型。它不仅能识别图片里的内容，还能结合这些信息进行分析和推理，甚至完成一些创造性的任务。虽然它还在成长阶段，但已经展现出了很大的潜力。我们希望通过不断的优化，让 QVQ-Max 成为一款真正实用的视觉 Agent，帮助大家解决实际问题。





