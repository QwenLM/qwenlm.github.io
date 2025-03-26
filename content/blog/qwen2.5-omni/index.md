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
{{< button href="https://github.com/QwenLM/Qwen2.5-Omni/assets/Qwen2.5_Omni.pdf" label="PAPER" external=true >}}
{{< button href="https://huggingface.co/spaces/Qwen/Qwen2.5-Omni-7B-Demo" label="DEMO" external=true >}}
{{< button href="https://discord.com/invite/yPEP2vHTu4" label="DISCORD" external=true >}}

We release **Qwen2.5-Omni**, the new flagship end-to-end multimodal model in the Qwen series. Designed for comprehensive multimodal perception, it seamlessly processes diverse inputs including text, images, audio, and video, while delivering real-time streaming responses through both text generation and natural speech synthesis. To try the latest model, feel free to visit [Qwen Chat](https://chat.qwenlm.ai) and choose Qwen2.5-Omni-7B. The model is now openly available on [Hugging Face](https://huggingface.co/Qwen/Qwen2.5-Omni-7B), [ModelScope](https://modelscope.cn/models/Qwen/Qwen2.5-Omni-7B), [DashScope](https://help.aliyun.com/zh/model-studio/user-guide/qwen-omni),and [GitHub](https://github.com/QwenLM/Qwen2.5-Omni), with technical documentation available in our [Paper](https://github.com/QwenLM/Qwen2.5-Omni/assets/Qwen2.5_Omni.pdf). Experience interactive capabilities through our [Demo](https://huggingface.co/spaces/Qwen/Qwen2.5-Omni-7B-Demo) or join our [Discord](https://discord.gg/yPEP2vHTu4) for discussions.



Key Features:

* **Omni and Novel Architecture**: We propose Thinker-Talker architecture, an end-to-end multimodal model designed to perceive diverse modalities, including text, images, audio, and video, while simultaneously
generating text and natural speech responses in a streaming manner. We prpose a novel position embedding, named TMRoPE (Time-aligned
Multimodal RoPE), to synchronize the timestamps of video inputs with audio.

* **Real-Time Voice and Video Chat**: Architecture Designed for fully real-time interactions, supporting chunked input and immediate output.

* **Natural and Robust Speech Generation**: Surpassing many existing streaming and non-streaming alternatives, demonstrating superior robustness and naturalness in speech generation.

* **Strong Performance Across Modalities**: Exhibiting exceptional performance across all modalities when benchmarked against similarly sized single-modality models. Qwen2.5-Omni outperforms the similarly sized Qwen2-Audio in audio capabilities and achieves comparable performance to Qwen2.5-VL-7B.

* **Excellent End-to-End Speech Instruction Following**: Qwen2.5-Omni shows performance in end-to-end speech instruction following that rivals its effectiveness with text inputs, evidenced by benchmarks such as MMLU and GSM8K.


<br><br>

<body class="body">
  <div class="container">
    <iframe src="https://www.youtube.com/embed/yKcANdkRuNI"
      style="display: block; margin: 0 auto; width: 900px; height: 510px; "
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowfullscreen>
    </iframe>
  </div>
</body>

## Architecture

Qwen2.5-Omni employs Thinker-Talker architecture. Thinker functions like a brain, responsible for processing and understanding inputs from text, audio and video modalities, generating high-level representations and corresponding text. Talker operates like a human mouth, taking in the high-level representations and text produced by the Thinker in a streaming manner, and outputting discrete tokens of speech fluidly. Thinker is a Transformer decoder, accompanied by encoders for audio and image that facilitate information extraction. In contrast, Talker is designed as a dual-track autoregressive Transformer Decoder architecture. During both training and inference, Talker directly receives high-dimensional representations from Thinker and shares all of Thinker's historical context information. Consequently, the entire architecture operates as a cohesive single model, enabling end-to-end training and inference.

{{< figure src="https://qianwen-res.oss-cn-beijing.aliyuncs.com/Qwen2.5-Omni/overview.png#center" width="100%">}} <!-- 2742 × 2499 -->

## Performance

We conducted a comprehensive evaluation of Qwen2.5-Omni, which demonstrates strong performance across all modalities when compared to similarly sized single-modality models and closed-source models like Qwen2.5-VL-7B, Qwen2-Audio, and Gemini-1.5-pro. In tasks requiring the integration of multiple modalities, such as OmniBench, Qwen2.5-Omni achieves state-of-the-art performance. Furthermore, in single-modality tasks, it excels in areas including speech recognition (Common Voice), translation (CoVoST2), audio understanding (MMAU), image reasoning (MMMU, MMStar), video understanding (MVBench), and speech generation (Seed-tts-eval and subjective naturalness).

{{< figure src="https://qianwen-res.oss-cn-beijing.aliyuncs.com/Qwen2.5-Omni/bar.png#center" width="100%">}} 

## What's Next

We are eager to hear your feedback and see the innovative applications you create with Qwen2.5-Omni. In the near future, our goal is to enhance our model's ability to follow voice commands and improve audio-visual collaborative understanding. Additionally, we strive to integrate more modalities towards an omni-model!
