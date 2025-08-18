---
title: "Qwen-Image-Edit: Image Editing with Higher Quality and Efficiency"
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


We are excited to introduce Qwen-Image-Edit, the image editing version of Qwen-Image. Built upon our 20B Qwen-Image model, Qwen-Image-Edit successfully extends Qwen-Image's unique text rendering capabilities to image editing tasks, enabling precise text editing. Furthermore, Qwen-Image-Edit simultaneously feeds the input image into Qwen2.5-VL (for visual semantic control) and the VAE Encoder (for visual appearance control), achieving capabilities in both semantic and appearance editing. To experience the latest model, visit [Qwen Chat](https://qwen.ai) and select the "Image Editing" feature.

Key Features:

* **Semantic and Appearance Editing**: Qwen-Image-Edit supports both low-level visual appearance editing (such as adding, removing, or modifying elements, requiring all other regions of the image to remain completely unchanged) and high-level visual semantic editing (such as IP creation, object rotation, and style transfer, allowing overall pixel changes while maintaining semantic consistency).

* **Precise Text Editing**: Qwen-Image-Edit supports bilingual (Chinese and English) text editing, allowing direct addition, deletion, and modification of text in images while preserving the original font, size, and style.

* **Strong Benchmark Performance**: Evaluations on multiple public benchmarks demonstrate that Qwen-Image-Edit achieves state-of-the-art (SOTA) performance in image editing tasks, establishing it as a powerful foundation model for image editing.


## Showcase
One of the highlights of Qwen-Image-Edit lies in its powerful capabilities for semantic and appearance editing. Semantic editing refers to modifying image content while preserving the original visual semantics. To intuitively demonstrate this capability, let's take Qwen's mascot—Capybara—as an example:

{{< figure src="https://qianwen-res.oss-cn-beijing.aliyuncs.com/Qwen-Image/edit_en/幻灯片3.JPG#center " width="100%">}}
As can be seen, although most pixels in the edited image differ from those in the input image (the leftmost image), the character consistency of Capybara is perfectly preserved. Qwen-Image-Edit's powerful semantic editing capability enables effortless and diverse creation of original IP content.
Furthermore, on Qwen Chat, we designed a series of editing prompts centered around the 16 MBTI personality types. Leveraging these prompts, we successfully created a set of MBTI-themed emoji packs based on our mascot Capybara, effortlessly expanding the IP's reach and expression.

{{< figure src="https://qianwen-res.oss-cn-beijing.aliyuncs.com/Qwen-Image/edit_en/幻灯片4.JPG#center " width="100%">}}
Moreover, novel view synthesis is another key application scenario in semantic editing. As shown in the two example images below, Qwen-Image-Edit can not only rotate objects by 90 degrees, but also perform a full 180-degree rotation, allowing us to directly see the back side of the object:
{{< figure src="https://qianwen-res.oss-cn-beijing.aliyuncs.com/Qwen-Image/edit_en/幻灯片12.JPG#center " width="100%">}}
{{< figure src="https://qianwen-res.oss-cn-beijing.aliyuncs.com/Qwen-Image/edit_en/幻灯片13.JPG#center " width="100%">}}
Another typical application of semantic editing is style transfer. For instance, given an input portrait, Qwen-Image-Edit can easily transform it into various artistic styles such as Studio Ghibli. This capability holds significant value in applications like virtual avatar creation:
{{< figure src="https://qianwen-res.oss-cn-beijing.aliyuncs.com/Qwen-Image/edit_en/幻灯片1.JPG#center " width="100%">}}
In addition to semantic editing, appearance editing is another common image editing requirement. Appearance editing emphasizes keeping certain regions of the image completely unchanged while adding, removing, or modifying specific elements. The image below illustrates a case where a signboard is added to the scene. 
As shown, Qwen-Image-Edit not only successfully inserts the signboard but also generates a corresponding reflection, demonstrating exceptional attention to detail.
{{< figure src="https://qianwen-res.oss-cn-beijing.aliyuncs.com/Qwen-Image/edit_en/幻灯片6.JPG#center " width="100%">}}
Below is another interesting example, demonstrating how to remove fine hair strands and other small objects from an image.
{{< figure src="https://qianwen-res.oss-cn-beijing.aliyuncs.com/Qwen-Image/edit_en/幻灯片7.JPG#center " width="100%">}}
Additionally, the color of a specific letter "n" in the image can be modified to blue, enabling precise editing of particular elements.
{{< figure src="https://qianwen-res.oss-cn-beijing.aliyuncs.com/Qwen-Image/edit_en/幻灯片8.JPG#center " width="100%">}}
Appearance editing also has wide-ranging applications in scenarios such as adjusting a person's background or changing clothing. The three images below demonstrate these practical use cases respectively.
{{< figure src="https://qianwen-res.oss-cn-beijing.aliyuncs.com/Qwen-Image/edit_en/幻灯片11.JPG#center " width="100%">}}
{{< figure src="https://qianwen-res.oss-cn-beijing.aliyuncs.com/Qwen-Image/edit_en/幻灯片5.JPG#center " width="100%">}}

Another standout feature of Qwen-Image-Edit is its accurate text editing capability, which stems from Qwen-Image's deep expertise in text rendering. As shown below, the following two cases vividly demonstrate Qwen-Image-Edit's powerful performance in editing English text:
{{< figure src="https://qianwen-res.oss-cn-beijing.aliyuncs.com/Qwen-Image/edit_en/幻灯片15.JPG#center " width="100%">}}
{{< figure src="https://qianwen-res.oss-cn-beijing.aliyuncs.com/Qwen-Image/edit_en/幻灯片16.JPG#center " width="100%">}}
Qwen-Image-Edit can also directly edit Chinese posters, enabling not only modifications to large headline text but also precise adjustments to even small and intricate text elements.
{{< figure src="https://qianwen-res.oss-cn-beijing.aliyuncs.com/Qwen-Image/edit_en/幻灯片17.JPG#center " width="100%">}}

Finally, let's walk through a concrete image editing example to demonstrate how to use a chained editing approach to progressively correct errors in a calligraphy artwork generated by Qwen-Image:
{{< figure src="https://qianwen-res.oss-cn-beijing.aliyuncs.com/Qwen-Image/edit_en/幻灯片18.JPG#center " width="100%">}}
In this artwork, several Chinese characters contain generation errors. We can leverage Qwen-Image-Edit to correct them step by step. For instance, we can draw bounding boxes on the original image to mark the regions that need correction, instructing Qwen-Image-Edit to fix these specific areas. Here, we want the character "稽" to be correctly written within the red box, and the character "亭" to be accurately rendered in the blue region.
{{< figure src="https://qianwen-res.oss-cn-beijing.aliyuncs.com/Qwen-Image/edit_en/幻灯片19.JPG#center " width="100%">}}
However, in practice, the character "稽" is relatively obscure, and the model fails to correct it correctly in one step. The lower-right component of "稽" should be "旨" rather than "日". At this point, we can further highlight the "日" portion with a red box, instructing Qwen-Image-Edit to fine-tune this detail and replace it with "旨".

{{< figure src="https://qianwen-res.oss-cn-beijing.aliyuncs.com/Qwen-Image/edit_en/幻灯片20.JPG#center " width="100%">}}
Isn't it amazing? With this chained, step-by-step editing approach, we can continuously correct character errors until the desired final result is achieved.
{{< figure src="https://qianwen-res.oss-cn-beijing.aliyuncs.com/Qwen-Image/edit_en/幻灯片21.JPG#center " width="100%">}}
{{< figure src="https://qianwen-res.oss-cn-beijing.aliyuncs.com/Qwen-Image/edit_en/幻灯片22.JPG#center " width="100%">}}
{{< figure src="https://qianwen-res.oss-cn-beijing.aliyuncs.com/Qwen-Image/edit_en/幻灯片23.JPG#center " width="100%">}}
{{< figure src="https://qianwen-res.oss-cn-beijing.aliyuncs.com/Qwen-Image/edit_en/幻灯片24.JPG#center " width="100%">}}
{{< figure src="https://qianwen-res.oss-cn-beijing.aliyuncs.com/Qwen-Image/edit_en/幻灯片25.JPG#center " width="100%">}}
Finally, we have successfully obtained a completely correct calligraphy version of *Lantingji Xu (Orchid Pavilion Preface)*!

In summary, we hope that Qwen-Image-Edit can further advance the field of image generation, truly lower the technical barriers to visual content creation, and inspire even more innovative applications.