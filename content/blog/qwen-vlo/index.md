---
title: "Qwen VLo: From \"Understanding\" the World to \"Depicting\" It"
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

## **Introduction**

The evolution of multimodal large models is continually pushing the boundaries of what we believe technology can achieve. From the initial QwenVL to the latest Qwen2.5 VL, we have made progress in enhancing the model's ability to understand image content. Today, we are excited to introduce a new model, Qwen VLo, a unified multimodal understanding and generation model. This newly upgraded model not only "understands" the world but also generates high-quality recreations based on that understanding, truly bridging the gap between perception and creation. Note that this is a preview version and you can access it through Qwen Chat. You can directly send a prompt like "Generate a picture of a cute cat" to generate an image or upload an image of a cat and ask "Add a cap on the cat's head" to modify an image. The image generation process is shown below.

**The Creative Process: Turn Your Imagination Into Reality**

{{<video src="https://qianwen-res.oss-accelerate.aliyuncs.com/Qwen-VLo/head_en.mov" muted="true" width="100%" loop="true" autoplay="true">}}

<!-- {{< figure src="https://qianwen-res.oss-cn-beijing.aliyuncs.com/QVQ-Max/test_time.png#center" width="80%">}} -->

As demonstrated in the video showcasing the generative process, Qwen VLo employs a progressive generation method, gradually constructing the entire image from left to right and top to bottom. During this process, the model continuously refines and optimizes its predictions to ensure that the final result is coherent and harmonious. This generative mechanism not only enhances visual quality but also provides users with a more flexible and controllable creative experience.

---

## **From Understanding to Creation: Enhanced Multimodal Generation Capabilities**

Qwen VLo has undergone a comprehensive upgrade in both its original multimodal understanding and generation capabilities. It significantly deepens its comprehension of image content and achieves more accurate and consistent generation results. Below are the core highlights of Qwen VLo:

1. **More Precise Content Understanding and Recreation**

   Previous multimodal models often struggled with semantic inconsistencies during the generation process, such as misinterpreting a car as another object or failing to retain key structural features of the original image. Qwen VLo, equipped with enhanced detail-capturing abilities, maintains a high level of semantic consistency throughout the generation process. For instance, when a user inputs a photo of a car and requests a "color change," Qwen VLo can accurately identify the car model, preserve its original structure, and naturally transform its color style. The generated result meets expectations while maintaining realism.

2. **Support for Open-Ended Instruction-Based Editing**  

   Users can provide creative instructions in natural language, such as "change this painting to a Van Gogh style," "make this photo look like it’s from the 19th century," or "add a sunny sky to this image." Qwen VLo can flexibly respond to these open-ended commands and produce results that align with user expectations. Whether it’s artistic style transfer, scene reconstruction, or detailed touch-ups, the model handles them all with ease. Even traditional visual perception tasks, such as predicting depth maps, segmentation maps, detection maps, and edge information, can be accomplished through simple editing instructions. Furthermore, Qwen VLo can also seamlessly handle more complex instructions — such as modifying objects, editing text, and changing backgrounds — all within a single command.

3. **Multilingual Instruction Support**  

   Qwen VLo supports multiple languages, including Chinese and English, breaking down language barriers and providing a unified, convenient interaction experience for global users. Regardless of the language you use, simply describe your needs, and the model will quickly understand and deliver the desired output.

---

## **Demo Cases**

Qwen VLo acts like a human artist, using its understanding to turn imagination into reality. Below are some examples for reference.


Qwen VLo is capable of directly generating images and modifying them by replacing backgrounds, adding subjects, performing style transfers, and even executing extensive modifications based on open-ended instructions, as well as handling detection and segmentation tasks.

{{< fullwidth class="example-container" >}}
{{< example data="cases/Shiba_en.json" hide=false next=true scroll=true >}}
{{< /fullwidth >}}

Qwen VLo can reinterpret and recreate based on its understanding, allowing for greater flexibility in style changes and migrations, such as transforming cartoons into realistic images or turning figures into balloons, among other creative outputs.

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

The model's advanced capabilities in image and instruction comprehension enable it to better interpret complex commands, incorporating multiple operations and modifications in a single instruction. This allows for the completion of multi-step tasks in one go, such as creating posters or combining objects.

{{< fullwidth class="example-container" >}}
{{< example data="cases/complex.json" hide=false next=true scroll=true >}}
{{< example data="cases/complex2.json" hide=true next=true scroll=true >}}
{{< example data="cases/Poster-your-cat.json" hide=true next=true scroll=true >}}
{{< example data="cases/Poster_generation.json" hide=true next=true scroll=true >}}
{{< /fullwidth >}}

In addition to image editing and re-creation, Qwen VLo can also perform annotations on existing information, such as detection, segmentation, edge detection, and more.

{{< fullwidth class="example-container" >}}
{{< example data="cases/cv.json" hide=false next=true scroll=true >}}
{{< example data="cases/Select-Remove-Add.json" hide=true next=true scroll=true >}}
{{< /fullwidth >}}

Qwen VLo supports the understanding and generation of multiple input images. (The function of multiple image inputs has not yet been officially launched, so stay tuned.)

{{< fullwidth class="example-container" >}}
{{< example data="cases/multi_obj.json" hide=false next=true scroll=true >}}
{{< /fullwidth >}}


Moreover, besides supporting tasks that involve both text and image inputs, Qwen VLo also supports direct text-to-image generation, including general images as well as bilingual (Chinese and English) posters.


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

Qwen VLo supports image generation with dynamic aspect ratio, and can easily handle elongated formats with aspect ratios as extreme as 4:1 or 1:3. (The feature for generating images with extreme aspect ratios is not yet officially launched—stay tuned for its release.)

{{< fullwidth class="example-container" >}}
{{< example data="cases/t2i_9.json" hide=false next=true scroll=true >}}
{{< example data="cases/t2i_10.json" hide=true next=true scroll=true >}}
{{< example data="cases/t2i_11.json" hide=true next=true scroll=true >}}
{{< example data="cases/t2i_12.json" hide=true next=true scroll=true >}}
{{< example data="cases/t2i_13.json" hide=true next=true scroll=true >}}
{{< /fullwidth >}}

As a unified understanding and generative model, Qwen VLo can also reanalyze and understand the content it generates. For example, it can identify the breeds of dogs and cats within the generated images.

{{< fullwidth class="example-container" >}}
{{< example data="cases/Generation_and_Understanding.json" hide=false next=true scroll=true >}}
{{< /fullwidth >}}






## **How to Use**

Qwen VLo uses dynamic resolution training, supporting dynamic resolution generation. Both input and output allow for images of arbitrary resolutions and aspect ratios. This means users are no longer constrained by fixed formats and can generate images tailored to different scenarios, whether it’s posters, illustrations, web banners, or social media covers.

Additionally, Qwen VLo introduces an innovative generative mechanism: a progressive top-to-bottom, left-to-right generation process.

This mechanism not only improves generation efficiency but is particularly suited for tasks requiring fine control, such as generating long paragraphs of text. For example, when designing advertisements or comic panels with extensive text, Qwen VLo generates content progressively, allowing users to observe and adjust the process in real-time for optimal creative results.


## **Limitations**

Qwen VLo is still in the preview stage, and there are many shortcomings. During the generation process, there may be issues such as inaccuracies, inconsistencies with the original image, non-compliance with instructions, and instability in recognizing and understanding the intent of the generated images. We appreciate your understanding. We will continue to iterate and improve the stability and robustness of the model.

---

## **Next Steps: Express Ideas Through Images, Foster Understanding Through Generation**

As multimodal large models increasingly gain the ability to handle bidirectional text and visual inputs and outputs, we are opening up new avenues for expression and interaction. In the future, models will not only answer questions with text but also convey ideas and meanings through images. For example, generating diagrams, adding auxiliary lines, or annotating key areas will provide users with more diverse communication tools.

Moreover, multimodal models with generative capabilities offer new ways to supervise and refine their understanding. By generating intermediate results like segmentation maps or detection maps, the model can verify its own comprehension and further improve its performance. This is a direction we will continue to explore and develop in the future. 
