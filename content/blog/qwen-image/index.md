---
title: "Qwen-Image: Crafting with Native Text Rendering"
date: 2025-08-04T22:08:30+08:00
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
{{< figure src="https://qianwen-res.oss-accelerate-overseas.aliyuncs.com/Qwen-Image/merge3.jpg#center" width="100%">}}


{{< button href="https://github.com/QwenLM/Qwen-Image" label="GITHUB" external=true >}}
{{< button href="https://huggingface.co/Qwen/Qwen-Image" label="HUGGING FACE" external=true >}}
{{< button href="https://modelscope.cn/models/Qwen/Qwen-Image" label="MODELSCOPE" external=true >}}
{{< button href="https://modelscope.cn/aigc/imageGeneration?tab=advanced" label="DEMO" external=true >}}
{{< button href="https://discord.gg/yPEP2vHTu4" label="DISCORD" external=true >}}

We are thrilled to release **Qwen-Image**, a 20B MMDiT image foundation model that achieves significant advances in complex text rendering and precise image editing. To try the latest model, feel free to visit [Qwen Chat](https://chat.qwenlm.ai) and choose “Image Generation”.


The key features include:

* **Superior Text Rendering**: Qwen-Image excels at complex text rendering, including multi-line layouts, paragraph-level semantics, and fine-grained details. It supports both alphabetic languages (e.g., English) and logographic languages (e.g., Chinese) with high fidelity.
* **Consistent Image Editing**: Through our enhanced multi-task training paradigm, Qwen-Image achieves exceptional performance in preserving both semantic meaning and visual realism during editing operations.
* **Strong Cross-Benchmark Performance**: Evaluated on multiple public benchmarks, Qwen-Image consistently outperforms existing models across diverse generation and editing tasks, establishing a strong foundation model for image generation.



## Performance

We present a comprehensive evaluation of Qwen-Image across multiple public benchmarks, including GenEval, DPG, and OneIG-Bench for general image generation, as well as GEdit, ImgEdit, and GSO for image editing. Qwen-Image achieves state-of-the-art performance on all benchmarks, demonstrating its strong capabilities in both image generation and editing. Furthermore, results on LongText-Bench, ChineseWord, and TextCraft show that it excels in text rendering—particularly in Chinese text generation—outperforming existing state-of-the-art models by a significant margin. This highlights Qwen-Image’s unique position as a leading image generation model that combines broad general capability with exceptional text rendering precision.

{{< figure src="https://qianwen-res.oss-cn-beijing.aliyuncs.com/Qwen-Image/bench.png#center" width="100%">}}




## Demo



One of Qwen-Image's outstanding capabilities is its ability to achieve high-fidelity text rendering in different scenarios. Let's take a look at the following Chinese rendering case:

>宫崎骏的动漫风格。平视角拍摄，阳光下的古街热闹非凡。一个穿着青衫、手里拿着写着“阿里云”卡片的逍遥派弟子站在中间。旁边两个小孩惊讶的看着他。左边有一家店铺挂着“云存储”的牌子，里面摆放着发光的服务器机箱，门口两个侍卫守护者。右边有两家店铺，其中一家挂着“云计算”的牌子，一个穿着旗袍的美丽女子正看着里面闪闪发光的电脑屏幕；另一家店铺挂着“云模型”的牌子，门口放着一个大酒缸，上面写着“千问”，一位老板娘正在往里面倒发光的代码溶液。

{{< figure src="https://qianwen-res.oss-cn-beijing.aliyuncs.com/Qwen-Image/aliyun.png#center " width="100%">}}

The model not only accurately captures Miyazaki's anime style, but also features shop signs like "云存储" "云计算" and "云模型" as well as the "千问" on the wine jars, all rendered realistically and accurately with the depth of field. The poses and expressions of the characters are also perfectly preserved.


Let's look at another example of Chinese rendering:

>一副典雅庄重的对联悬挂于厅堂之中，房间是个安静古典的中式布置，桌子上放着一些青花瓷，对联上左书“义本生知人机同道善思新”，右书“通云赋智乾坤启数高志远”， 横批“智启通义”，字体飘逸，中间挂在一着一副中国风的画作，内容是岳阳楼。


{{< figure src="https://qianwen-res.oss-cn-beijing.aliyuncs.com/Qwen-Image/tongyi.png#center" width="100%">}}
The model accurately drew the left and right couplets and the horizontal scroll, applied calligraphy effects, and accurately generated the Yueyang Tower in the middle. The blue and white porcelain on the table also looked very realistic.

So, how does the model perform on English?
Let's look at an English rendering example:

>Bookstore window display. A sign displays "New Arrivals This Week". Below, a shelf tag with the text "Best-Selling Novels Here". To the side, a colorful poster advertises "Author Meet And Greet on Saturday" with a central portrait of the author. There are four books on the bookshelf, namely "The light between worlds" "When stars are scattered" "The slient patient" "The night circus"

{{< figure src="https://qianwen-res.oss-cn-beijing.aliyuncs.com/Qwen-Image/book.png#center " width="100%">}}
In this example, the model not only accurately outputs "New Arrivals This Week", but also accurately generates the cover text of four books: "The light between worlds", "When stars are scattered", "The slient patient", and "The night circus".

Let's look at a more complex case of English rendering:
>A slide featuring artistic, decorative shapes framing neatly arranged textual information styled as an elegant infographic. At the very center, the title "Habits for Emotional Wellbeing" appears clearly, surrounded by a symmetrical floral pattern. On the left upper section, "Practice Mindfulness" appears next to a minimalist lotus flower icon, with the short sentence, "Be present, observe without judging, accept without resisting". Next, moving downward, "Cultivate Gratitude" is written near an open hand illustration, along with the line, "Appreciate simple joys and acknowledge positivity daily". Further down, towards bottom-left, "Stay Connected" accompanied by a minimalistic chat bubble icon reads "Build and maintain meaningful relationships to sustain emotional energy". At bottom right corner, "Prioritize Sleep" is depicted next to a crescent moon illustration, accompanied by the text "Quality sleep benefits both body and mind". Moving upward along the right side, "Regular Physical Activity" is near a jogging runner icon, stating: "Exercise boosts mood and relieves anxiety". Finally, at the top right side, appears "Continuous Learning" paired with a book icon, stating "Engage in new skill and knowledge for growth". The slide layout beautifully balances clarity and artistry, guiding the viewers naturally along each text segment.

{{< figure src="https://qianwen-res.oss-cn-beijing.aliyuncs.com/Qwen-Image/six.png#center " width="100%">}}
In this case, the model needs to generate 6 submodules, each with its own icon, title, and corresponding introductory text. Qwen-Image has completed the layout.

What about smaller text? Let us test it:
>A man in a suit is standing in front of the window, looking at the bright moon outside the window. The man is holding a yellowed paper with handwritten words on it: "A lantern moon climbs through the silver night, Unfurling quiet dreams across the sky, Each star a whispered promise wrapped in light, That dawn will bloom, though darkness wanders by." There is a cute cat on the windowsill.

{{< figure src="https://qianwen-res.oss-cn-beijing.aliyuncs.com/Qwen-Image/small.png#center " width="100%">}}
In this case, the paper is less than one-tenth of the entire image, and the paragraph of text is relatively long, but the model still accurately generates the text on the paper.

What if there are more words? Let's try a harder case:

>一个穿着"QWEN"标志的T恤的中国美女正拿着黑色的马克笔面相镜头微笑。她身后的玻璃板上手写体写着 "一、Qwen-Image的技术路线： 探索视觉生成基础模型的极限，开创理解与生成一体化的未来。二、Qwen-Image的模型特色：1、复杂文字渲染。支持中英渲染、自动布局； 2、精准图像编辑。支持文字编辑、物体增减、风格变换。三、Qwen-Image的未来愿景：赋能专业内容创作、助力生成式AI发展。"


{{< figure src="https://qianwen-res.oss-cn-beijing.aliyuncs.com/Qwen-Image/long.png#center " width="100%">}}
You can see that the model has completely generated a complete handwritten paragraph on the glass plate.

What if it's bilingual? For the same scenario, let's try this prompt:
>一个穿着"QWEN"标志的T恤的中国美女正拿着黑色的马克笔面相镜头微笑。她身后的玻璃板上手写体写着 "Meet Qwen-Image -- a powerful image foundation model capable of complex text rendering and precise image editing. 欢迎了解Qwen-Image, 一款强大的图像基础模型，擅长复杂文本渲染与精准图像编辑"

{{< figure src="https://qianwen-res.oss-cn-beijing.aliyuncs.com/Qwen-Image/bi.png#center " width="50%">}}
As you can see, the model can switch between two languages at any time when rendering text.

Qwen-Image's text capabilities make it easy to create posters, such as:

>A movie poster. The first row is the movie title, which reads "Imagination Unleashed". The second row is the movie subtitle, which reads "Enter a world beyond your imagination". The third row reads "Cast: Qwen-Image". The fourth row reads "Director: The Collective Imagination of Humanity". The central visual features a sleek, futuristic computer from which radiant colors, whimsical creatures, and dynamic, swirling patterns explosively emerge, filling the composition with energy, motion, and surreal creativity. The background transitions from dark, cosmic tones into a luminous, dreamlike expanse, evoking a digital fantasy realm. At the bottom edge, the text "Launching in the Cloud, August 2025" appears in bold, modern sans-serif font with a glowing, slightly transparent effect, evoking a high-tech, cinematic aesthetic. The overall style blends sci-fi surrealism with graphic design flair—sharp contrasts, vivid color grading, and layered visual depth—reminiscent of visionary concept art and digital matte painting, 32K resolution, ultra-detailed.

{{< figure src="https://qianwen-res.oss-cn-beijing.aliyuncs.com/Qwen-Image/poster.png#center " width="50%">}}


Since we can make posters, of course we can also make PPTs directly. Let’s look at a case of making PPTs in Chinese:
>一张企业级高质量PPT页面图像，整体采用科技感十足的星空蓝为主色调，背景融合流动的发光科技线条与微光粒子特效，营造出专业、现代且富有信任感的品牌氛围；页面顶部左侧清晰展示橘红色Alibaba标志，色彩鲜明、辨识度高。主标题位于画面中央偏上位置，使用大号加粗白色或浅蓝色字体写着“通义千问视觉基础模型”，字体现代简洁，突出技术感；主标题下方紧接一行楷体中文文字：“原生中文·复杂场景·自动布局”，字体柔和优雅，形成科技与人文的融合。下方居中排布展示了四张与图片，分别是：一幅写实与水墨风格结合的梅花特写，枝干苍劲、花瓣清雅，背景融入淡墨晕染与飘雪效果，体现坚韧不拔的精神气质；上方写着黑色的楷体"梅傲"。一株生长于山涧石缝中的兰花，叶片修长、花朵素净，搭配晨雾缭绕的自然环境，展现清逸脱俗的文人风骨；上方写着黑色的楷体"兰幽"。一组迎风而立的翠竹，竹叶随风摇曳，光影交错，背景为青灰色山岩与流水，呈现刚柔并济、虚怀若谷的文化意象；上方写着黑色的楷体"竹清"。一片盛开于秋日庭院的菊花丛，花色丰富、层次分明，配以落叶与古亭剪影，传递恬然自适的生活哲学；上方写着黑色的楷体"菊淡"。所有图片采用统一尺寸与边框样式，呈横向排列。页面底部中央用楷体小字写明“2025年8月，敬请期待”，排版工整、结构清晰，整体风格统一且细节丰富，极具视觉冲击力与品牌调性。
{{< figure src="https://qianwen-res.oss-cn-beijing.aliyuncs.com/Qwen-Image/ppt.png#center " width="100%">}}


In fact, beyond text processing, Qwen-Image also excels at general image generation, supporting a wide range of artistic styles. From photorealistic scenes to impressionistic paintings, from anime styles to minimalist designs, the model flexibly responds to a wide range of creative prompts, becoming a versatile tool for artists, designers, and storytellers. We will describe these in detail in our technical report.

{{< figure src="https://qianwen-res.oss-cn-beijing.aliyuncs.com/Qwen-Image/s2.jpg#center " width="100%">}}


In terms of image editing, Qwen-Image supports a variety of operations, including style transfer, additions, deletions, detail enhancement, text editing, and character pose adjustment. This allows even ordinary users to easily achieve professional-level image editing. We will describe these in detail in our technical report.



{{< figure src="https://qianwen-res.oss-cn-beijing.aliyuncs.com/Qwen-Image/s3.jpg#center " width="100%">}}

In summary, we hope that Qwen-Image can further promote the development of image generation, lower the technical barriers to visual content creation, and inspire more innovative applications. At the same time, we also look forward to the active participation and feedback of the community to jointly build an open, transparent, and sustainable generative AI ecosystem.
