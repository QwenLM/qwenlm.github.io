---
title: "Qwen2.5 Omni: See, Hear, Talk, Write, Do It All!"
date: 2025-03-27T00:00:45+08:00
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
{{< figure src="https://qianwen-res.oss-accelerate-overseas.aliyuncs.com/Qwen2.5-Omni/qwen_omni.png#center" width="100%">}} <!-- 5737 × 3094 -->

{{< button href="https://chat.qwenlm.ai" label="QWEN CHAT" external=true >}}
{{< button href="https://huggingface.co/Qwen/Qwen2.5-Omni-7B" label="HUGGING FACE" external=true >}}
{{< button href="https://modelscope.cn/models/Qwen/Qwen2.5-Omni-7B" label="MODELSCOPE" external=true >}}
{{< button href="https://help.aliyun.com/zh/model-studio/user-guide/qwen-omni" label="DASHSCOPE" external=true >}}
{{< button href="https://github.com/QwenLM/Qwen2.5-Omni" label="GITHUB" external=true >}}
{{< button href="https://github.com/QwenLM/Qwen2.5-Omni/blob/main/assets/Qwen2.5_Omni.pdf" label="PAPER" external=true >}}
{{< button href="https://modelscope.cn/studios/Qwen/Qwen2.5-Omni-Demo" label="DEMO" external=true >}}
{{< button href="https://discord.gg/yPEP2vHTu4" label="DISCORD" external=true >}}


我们发布了 **Qwen2.5-Omni**，Qwen 模型家族中新一代端到端多模态旗舰模型。该模型专为全方位多模态感知设计，能够无缝处理文本、图像、音频和视频等多种输入形式，并通过实时流式响应同时生成文本与自然语音合成输出。想要体验最新的模型，请访问 [Qwen Chat](https://chat.qwenlm.ai) 并选择Qwen2.5-Omni-7B。该模型现已在 [Hugging Face](https://huggingface.co/Qwen/Qwen2.5-Omni-7B)、[ModelScope](https://modelscope.cn/models/Qwen/Qwen2.5-Omni-7B)、[DashScope](https://help.aliyun.com/zh/model-studio/user-guide/qwen-omni)和 [GitHub](https://github.com/QwenLM/Qwen2.5-Omni)上开放，技术文档请查阅我们的[论文](https://github.com/QwenLM/Qwen2.5-Omni/assets/Qwen2.5_Omni.pdf)。您可以通过我们的[Demo](https://modelscope.cn/studios/Qwen/Qwen2.5-Omni-Demo)体验互动功能，或加入我们的[Discord](https://discord.gg/yPEP2vHTu4)进行讨论。

主要特点：

* **全能创新架构**：我们提出了一种全新的Thinker-Talker架构，这是一种端到端的多模态模型，旨在支持文本/图像/音频/视频的跨模态理解，同时以流式方式生成文本和自然语音响应。我们提出了一种新的位置编码技术，称为TMRoPE（Time-aligned Multimodal RoPE），通过时间轴对齐实现视频与音频输入的精准同步。

* **实时音视频交互**：架构旨在支持完全实时交互，支持分块输入和即时输出。

* **自然流畅的语音生成**：在语音生成的自然性和稳定性方面超越了许多现有的流式和非流式替代方案。

* **全模态性能优势**：在同等规模的单模态模型进行基准测试时，表现出卓越的性能。Qwen2.5-Omni在音频能力上优于类似大小的Qwen2-Audio，并与Qwen2.5-VL-7B保持同等水平。

* **卓越的端到端语音指令跟随能力**：Qwen2.5-Omni在端到端语音指令跟随方面表现出与文本输入处理相媲美的效果，在MMLU通用知识理解和GSM8K数学推理等基准测试中表现优异。

<br><br>

<video width="100%" controls>
  <source src="https://qianwen-res.oss-accelerate-overseas.aliyuncs.com/Qwen2.5-Omni/demo_cn.mp4" type="video/mp4">
  Your browser does not support the video tag.
</video>

## 模型架构

Qwen2.5-Omni采用Thinker-Talker双核架构。Thinker模块如同大脑，负责处理文本、音频、视频等多模态输入，生成高层语义表征及对应文本内容；Talker模块则类似发声器官，以流式方式接收Thinker实时输出的语义表征与文本，流畅合成离散语音单元。Thinker基于Transformer解码器架构，融合音频/图像编码器进行特征提取；Talker则采用双轨自回归Transformer解码器设计，在训练和推理过程中直接接收来自Thinker的高维表征，并共享全部历史上下文信息，形成端到端的统一模型架构。

{{< figure src="https://qianwen-res.oss-cn-beijing.aliyuncs.com/Qwen2.5-Omni/overview.png#center" width="100%">}} <!-- 2742 × 2499 -->

## 模型性能

Qwen2.5-Omni在包括图像，音频，音视频等各种模态下的表现都优于类似大小的单模态模型以及封闭源模型，例如Qwen2.5-VL-7B、Qwen2-Audio和Gemini-1.5-pro。在多模态任务OmniBench，Qwen2.5-Omni达到了SOTA的表现。此外，在单模态任务中，Qwen2.5-Omni在多个领域中表现优异，包括语音识别（Common Voice）、翻译（CoVoST2）、音频理解（MMAU）、图像推理（MMMU、MMStar）、视频理解（MVBench）以及语音生成（Seed-tts-eval和主观自然听感）。

{{< figure src="https://qianwen-res.oss-cn-beijing.aliyuncs.com/Qwen2.5-Omni/bar.png#center" width="100%">}} 

## 下一步

我们期待听到您的反馈，并看到您使用 Qwen2.5-Omni 开发的创新应用。在不久的将来，我们将着力增强模型对语音指令的遵循能力，并提升音视频协同理解能力。更值得期待的是，我们将持续拓展多模态能力边界，以发展成为一个全面的通用模型！
