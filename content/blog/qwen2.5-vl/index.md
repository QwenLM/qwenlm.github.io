---
title: "Qwen2.5 VL! Qwen2.5 VL! Qwen2.5 VL!"
date: 2025-01-26T19:08:30+08:00
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
{{< figure src="https://qianwen-res.oss-accelerate-overseas.aliyuncs.com/Qwen2.5-vl-Capybara.png#center" width="100%">}}

{{< button href="https://chat.qwenlm.ai" label="QWEN CHAT" external=true >}}
{{< button href="https://github.com/QwenLM/Qwen2-VL" label="GITHUB" external=true >}}
{{< button href="https://huggingface.co/collections/Qwen/qwen25-vl-6795ffac22b334a837c0f9a5" label="HUGGING FACE" external=true >}}
{{< button href="https://modelscope.cn/collections/Qwen25-VL-58fbb5d31f1d47" label="MODELSCOPE" external=true >}}
{{< button href="https://discord.gg/yPEP2vHTu4" label="DISCORD" external=true >}}


We release **Qwen2.5-VL**, the new flagship vision-language model of Qwen and also a significant leap from the previous Qwen2-VL. To try the latest model, feel free to visit [Qwen Chat](https://chat.qwenlm.ai) and choose Qwen2.5-VL-72B-Instruct. Also, we open both base and instruct models in 3 sizes, including 3B, 7B, and 72B, in both [Hugging Face](https://huggingface.co/collections/Qwen/qwen25-vl-6795ffac22b334a837c0f9a5) and [ModelScope](https://modelscope.cn/collections/Qwen25-VL-58fbb5d31f1d47).


The key features include:

* **Understand things visually**: Qwen2.5-VL is not only proficient in recognizing common objects such as flowers, birds, fish, and insects, but it is highly capable of analyzing texts, charts, icons, graphics, and layouts within images.

* **Being agentic**: Qwen2.5-VL directly plays as a visual agent that can reason and dynamically direct tools, which is capable of computer use and phone use.

* **Understanding long videos and capturing events**: Qwen2.5-VL can comprehend videos of over 1 hour, and this time it has a new ability of capturing event by pinpointing the relevant video segments.

* **Capable of visual localization in different formats**: Qwen2.5-VL can accurately localize objects in an image by generating bounding boxes or points, and it can provide stable JSON outputs for coordinates and attributes.

* **Generating structured outputs**: for data like scans of invoices, forms, tables, etc. Qwen2.5-VL supports structured outputs of their contents, benefiting usages in finance, commerce, etc.
<br><br>


## Performance

We evaluate our models with the SOTA models as well as the best models of similar model sizes. In terms of the flagship model Qwen2.5-VL-72B-Instruct, it achieves competitive performance in a series of benchmarks covering domains and tasks, inlcuding college-level problems, math, document understanding, general question answering, math, video understanding, and visual agent. Notably, Qwen2.5-VL achieves significant advantages in understanding documents and diagrams, and it is capable of playing as a visual agent without task-specific finetuning. 

{{< figure src="https://qianwen-res.oss-cn-beijing.aliyuncs.com/Qwen2.5-VL/qwen2.5vl-tab1.jpg#center" width="100%">}}


In terms of smaller models, Qwen2.5-VL-7B-Instruct outperforms GPT-4o-mini in a number of tasks, and Qwen2.5-VL-3B, which is a solution for edge AI, even outperforms the 7B model of our previous version Qwen2-VL.

{{< figure src="https://qianwen-res.oss-cn-beijing.aliyuncs.com/Qwen2.5-VL/qwen2.5vl-tab2.jpg#center" width="100%">}}


{{< figure src="https://qianwen-res.oss-cn-beijing.aliyuncs.com/Qwen2.5-VL/qwen2.5vl-tab3.jpg#center" width="100%">}}




## Model Capabilities

### 1. World-wide Image Recognition
Qwen2.5-VL has significantly enhanced its general image recognition capabilities, expanding the categories of images to an ultra-large number. It not only includes plants, animals, landmarks of famous mountains and rivers, but also IPs from film and TV series, as well as a wide variety of products.

{{< fullwidth class="example-container" >}}
{{< example data="cases/recoAll_attractions.json" hide=false next=true >}}
{{< example data="cases/recoAll_birds.json" hide=true next=true >}}
{{< example data="cases/recoAll_cars.json" hide=true next=true >}}
{{< example data="cases/recoAll_celebrities.json" hide=true next=true >}}
{{< example data="cases/recoAll_foods.json" hide=true next=true >}}
{{< example data="cases/recoAll_products.json" hide=true next=true >}}
{{< /fullwidth >}}

### 2. Precise Object Grounding

Qwen2.5-VL utilizes bounding boxes and point-based representations for grounding, enabling hierarchical positioning and standardized JSON output. This enhanced localization capability serves as a foundation for visual reasoning.

{{< fullwidth class="example-container" >}}
{{< example data="cases/grounding_box_safety.json" hide=false next=true >}}
{{< example data="cases/grounding_point_athletes.json" hide=true next=true >}}
{{< example data="cases/grounding_counting_birds.json" hide=true next=true >}}
{{< example data="cases/grounding_counting_items.json" hide=true next=true >}}
{{< example data="cases/grounding_cupcakes_descriptions.json" hide=true next=true >}}
{{< example data="cases/grounding_brave.json" hide=true next=true >}}
{{< /fullwidth >}}

### 3. Enhanced Text Recognition and Understanding

Qwen2.5-VL has upgraded its OCR recognition capabilities to a new level, with enhanced multi-scenario, multi-language and multi-orientation text recognition and text localization performance. Furthermore, it has been significantly enhanced in information extraction to meet the growing digitalized and intelligent demands in areas such as qualification review and financial business.

{{< fullwidth class="example-container" >}}
{{< example data="cases/ocr_vertical.json" hide=false next=true >}}
{{< example data="cases/ocr_arabic.json" hide=true next=true >}}
{{< example data="cases/ocr_grounding1.json" hide=true next=true >}}
{{< example data="cases/kie_receipt.json" hide=true next=true >}}
{{< example data="cases/kie_express.json" hide=true next=true >}}
{{< example data="cases/kie_table3.json" hide=true next=true >}}
{{< /fullwidth >}}

### 4. Powerful Document Parsing

Qwen2.5-VL has designed a unique document parsing format called QwenVL HTML format, which extracts layout information based on HTML. QwenVL HTML can perform document parsing in various scenarios, such as magazines, research papers, web pages, and even mobile screenshots.

{{< fullwidth class="example-container" >}}
{{< example data="cases/docparsing4.json" hide=false next=true >}}
{{< example data="cases/docparsing2.json" hide=true next=true >}}
{{< example data="cases/docparsing6.json" hide=true next=true >}}
{{< example data="cases/docparsing8.json" hide=true next=true >}}
{{< /fullwidth >}}

### 5. Enhanced Video Comprehension Ability

Qwen2.5-VL's video comprehension capabilities have been comprehensively upgraded. In terms of temporal processing, we have introduced dynamic frame rate (FPS) training and absolute time encoding technology. As a result, the model can not only support the understanding of ultra-long videos on an hourly scale but also achieve second-level event localization. It is capable of accurately comprehending content from long videos spanning hours, searching for specific events within videos, and summarizing key points from different time segments. This allows users to quickly and efficiently extract crucial information embedded in the videos.

{{< fullwidth class="example-container" >}}
{{< example data="cases/video_ocr.json" hide=false next=true >}}
{{< example data="cases/video_reasoning_zh.json" hide=true next=true >}}
{{< example data="cases/video_long_caption.json" hide=true next=true >}}
{{< example data="cases/video_livechat.json" hide=true next=true >}}
{{< example data="cases/video_grounding.json" hide=true next=true >}}
{{< example data="cases/video_structured_caption.json" hide=true next=true >}}
{{< /fullwidth >}}


### 6. Superior Computer and Mobile Agent

{{< fullwidth class="example-container" >}}
{{< example data="cases/agent_booking_with_log.json" hide=false next=true >}}
{{< example data="cases/agent_qq_with_log.json" hide=true next=true >}}
{{< example data="cases/agent_osworld_chrome.json" hide=true next=true >}}
{{< example data="cases/agent_osworld_gimp.json" hide=true next=true >}}
{{< example data="cases/agent_osworld_vscode.json" hide=true next=true >}}
{{< /fullwidth >}}

## Model Updates

Compared to Qwen2-VL, Qwen2.5-VL has enhanced the model's perception of temporal and spatial scales, and further simplified the network structure to improve model efficiency.

* **Perception of Time and Image Size**

In the spatial dimension, Qwen2.5-VL not only dynamically converts images of different sizes into tokens of varying lengths but also directly represents coordinates such as detection boxes and points using the actual size scale of the image, without performing traditional coordinate normalization. This allows the model to directly learn the scale of the images. In the temporal dimension, dynamic FPS (Frames Per Second) training and absolute time encoding have been introduced, aligning mRoPE ids directly with the speed of time. This enables the model to learn the pace of time through the intervals of temporal dimension ids.


{{< figure src="https://qianwen-res.oss-cn-beijing.aliyuncs.com/Qwen2.5-VL/qwen2.5vl_arc.jpeg" width="90%">}}


* **More Concise and Efficient Visual Encoder**

The visual encoder plays a crucial role in multimodal large models. We trained a native dynamic resolution ViT from scratch, including stages for CLIP, vision-language model alignment, and end-to-end training. To address the issue of load imbalance in ViT during the training and testing phases of multimodal large models, we introduced Window Attention to effectively reduce the computational load on the ViT side. In our ViT setup, only four layers are Full Attention layers, while the rest use Window Attention. The maximum window size is 8x8, and regions smaller than 8x8 do not require padding; instead, they retain their original scale, ensuring that the model maintains native resolution. Additionally, to simplify the overall network structure, we made the ViT architecture more consistent with LLMs by adopting RMSNorm and SwiGLU structures.




## What's Next

In the near future, we will further enhance the model's problem-solving and reasoning capabilities, while incorporating more modalities. This will make the model smarter and move us towards an integrated omni-model that can handle multiple types of input and tasks.