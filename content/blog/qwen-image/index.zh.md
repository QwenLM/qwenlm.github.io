---
title: "Qwen-Image：擅长文字渲染的创作利器"
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


我们很高兴推出 Qwen-Image，一个20B的MMDiT模型。这是通义千问系列中首个图像生成基础模型，其在复杂文本渲染和精确图像编辑方面取得了显著进展。如需体验最新模型，欢迎访问  [Qwen Chat](https://qwen.ai) 并选择“图像生成”功能。

主要特性包括：

* **卓越的文本渲染能力**: Qwen-Image 在复杂文本渲染方面表现出色，支持多行布局、段落级文本生成以及细粒度细节呈现。无论是英语还是中文，均能实现高保真输出。
* **一致性的图像编辑能力**: 通过增强的多任务训练范式，Qwen-Image 在编辑过程中能出色地保持编辑的一致性。
* **强大的跨基准性能表现**: 在多个公开基准测试中的评估表明，Qwen-Image 在各类生成与编辑任务中均获得SOTA，是一个强大的图像生成基础模型。



## 性能表现

我们在多个公开基准上对Qwen-Image进行了全面评估，包括用于通用图像生成的GenEval、DPG和OneIG-Bench，以及用于图像编辑的GEdit、ImgEdit和GSO。Qwen-Image在所有基准测试中均取得了最先进的性能，展现出其在图像生成与图像编辑方面的强大能力。此外，在用于文本渲染的LongText-Bench、ChineseWord和TextCraft上的结果表明，Qwen-Image在文本渲染方面表现尤为出色，特别是在中文文本渲染上，大幅领先现有的最先进模型。这凸显了Qwen-Image作为先进图像生成模型的独特地位，兼具广泛的通用能力与卓越的文本渲染精度。




{{< figure src="https://qianwen-res.oss-cn-beijing.aliyuncs.com/Qwen-Image/bench.png#center" width="100%">}}



## 示例展示



Qwen-Image的突出能力之一是能够在不同场景中实现高保真的文本渲染。我们来看下面这个中文渲染的case：

>宫崎骏的动漫风格。平视角拍摄，阳光下的古街热闹非凡。一个穿着青衫、手里拿着写着“阿里云”卡片的逍遥派弟子站在中间。旁边两个小孩惊讶的看着他。左边有一家店铺挂着“云存储”的牌子，里面摆放着发光的服务器机箱，门口两个侍卫守护者。右边有两家店铺，其中一家挂着“云计算”的牌子，一个穿着旗袍的美丽女子正看着里面闪闪发光的电脑屏幕；另一家店铺挂着“云模型”的牌子，门口放着一个大酒缸，上面写着“千问”，一位老板娘正在往里面倒发光的代码溶液。

{{< figure src="https://qianwen-res.oss-cn-beijing.aliyuncs.com/Qwen-Image/aliyun.png#center " width="100%">}}
模型不仅仅准确展示了宫崎骏的动漫风格，店铺的牌匾“云存储”，“云计算”，“云模型”，包括酒缸上的“千问”，都随着构图的景深，被真实准确的渲染。并且保留了人物姿势、神态刻画。

让我们再看一个中文渲染的case：
>一副典雅庄重的对联悬挂于厅堂之中，房间是个安静古典的中式布置，桌子上放着一些青花瓷，对联上左书“义本生知人机同道善思新”，右书“通云赋智乾坤启数高志远”， 横批“智启通义”，字体飘逸，中间挂在一着一副中国风的画作，内容是岳阳楼。

{{< figure src="https://qianwen-res.oss-cn-beijing.aliyuncs.com/Qwen-Image/tongyi.png#center" width="100%">}}
模型准确了绘制了左右联和横批，并且使用了书法效果，并在中间准确的生成了岳阳楼。桌子上放着的青花瓷也看着非常真实。

那么，模型在英文上的能力如何呢？
让我们来看一个英文渲染的case：
>Bookstore window display. A sign displays "New Arrivals This Week". Below, a shelf tag with the text "Best-Selling Novels Here". To the side, a colorful poster advertises "Author Meet And Greet on Saturday" with a central portrait of the author. There are four books on the bookshelf, namely "The light between worlds" "When stars are scattered" "The slient patient" "The night circus"

{{< figure src="https://qianwen-res.oss-cn-beijing.aliyuncs.com/Qwen-Image/book.png#center " width="100%">}}
在这个样例中，模型不仅仅准确输出了"New Arrivals This Week"， 而且还把四本书的封面文字"The light between worlds" "When stars are scattered" "The slient patient" "The night circus"准确的生成了出来。

让我们来看一个更复杂的英文渲染的case：
>A slide featuring artistic, decorative shapes framing neatly arranged textual information styled as an elegant infographic. At the very center, the title "Habits for Emotional Wellbeing" appears clearly, surrounded by a symmetrical floral pattern. On the left upper section, "Practice Mindfulness" appears next to a minimalist lotus flower icon, with the short sentence, "Be present, observe without judging, accept without resisting". Next, moving downward, "Cultivate Gratitude" is written near an open hand illustration, along with the line, "Appreciate simple joys and acknowledge positivity daily". Further down, towards bottom-left, "Stay Connected" accompanied by a minimalistic chat bubble icon reads "Build and maintain meaningful relationships to sustain emotional energy". At bottom right corner, "Prioritize Sleep" is depicted next to a crescent moon illustration, accompanied by the text "Quality sleep benefits both body and mind". Moving upward along the right side, "Regular Physical Activity" is near a jogging runner icon, stating: "Exercise boosts mood and relieves anxiety". Finally, at the top right side, appears "Continuous Learning" paired with a book icon, stating "Engage in new skill and knowledge for growth". The slide layout beautifully balances clarity and artistry, guiding the viewers naturally along each text segment.

{{< figure src="https://qianwen-res.oss-cn-beijing.aliyuncs.com/Qwen-Image/six.png#center " width="100%">}}
在这个case中，模型需要生成6个子模块，每个部分都有各自的图标、标题和对应的介绍文本。Qwen-Image准备完成了排版。


那如果是更小的文字呢？让我来测试一个：
>A man in a suit is standing in front of the window, looking at the bright moon outside the window. The man is holding a yellowed paper with handwritten words on it: "A lantern moon climbs through the silver night, Unfurling quiet dreams across the sky, Each star a whispered promise wrapped in light, That dawn will bloom, though darkness wanders by." There is a cute cat on the windowsill.

{{< figure src="https://qianwen-res.oss-cn-beijing.aliyuncs.com/Qwen-Image/small.png#center " width="100%">}}
在这个case中，纸张不足整个画面的十分之一，而且段落文字也比较长，模型还是准确的生成了纸张地上的文字。

那如果是更多的文字呢？让我们试一个更难的case：
>一个穿着"QWEN"标志的T恤的中国美女正拿着黑色的马克笔面相镜头微笑。她身后的玻璃板上手写体写着 "一、Qwen-Image的技术路线： 探索视觉生成基础模型的极限，开创理解与生成一体化的未来。二、Qwen-Image的模型特色：1、复杂文字渲染。支持中英渲染、自动布局； 2、精准图像编辑。支持文字编辑、物体增减、风格变换。三、Qwen-Image的未来愿景：赋能专业内容创作、助力生成式AI发展。"

{{< figure src="https://qianwen-res.oss-cn-beijing.aliyuncs.com/Qwen-Image/long.png#center " width="100%">}}
可以看到模型完完整整的在玻璃板生成了完整的手写体段落。

那如果是中英双语呢？对于同样的场景，我们试这样的prompt：
>一个穿着"QWEN"标志的T恤的中国美女正拿着黑色的马克笔面相镜头微笑。她身后的玻璃板上手写体写着 "Meet Qwen-Image -- a powerful image foundation model capable of complex text rendering and precise image editing. 欢迎了解Qwen-Image, 一款强大的图像基础模型，擅长复杂文本渲染与精准图像编辑"

{{< figure src="https://qianwen-res.oss-cn-beijing.aliyuncs.com/Qwen-Image/bi.png#center " width="50%">}}
可以看到，模型在双语间也可以随时切换。


Qwen-Image的文字能力使得其可以轻松的制作一些海报，比如
>A movie poster. The first row is the movie title, which reads "Imagination Unleashed". The second row is the movie subtitle, which reads "Enter a world beyond your imagination". The third row reads "Cast: Qwen-Image". The fourth row reads "Director: The Collective Imagination of Humanity". The central visual features a sleek, futuristic computer from which radiant colors, whimsical creatures, and dynamic, swirling patterns explosively emerge, filling the composition with energy, motion, and surreal creativity. The background transitions from dark, cosmic tones into a luminous, dreamlike expanse, evoking a digital fantasy realm. At the bottom edge, the text "Launching in the Cloud, August 2025" appears in bold, modern sans-serif font with a glowing, slightly transparent effect, evoking a high-tech, cinematic aesthetic. The overall style blends sci-fi surrealism with graphic design flair—sharp contrasts, vivid color grading, and layered visual depth—reminiscent of visionary concept art and digital matte painting, 32K resolution, ultra-detailed.

{{< figure src="https://qianwen-res.oss-cn-beijing.aliyuncs.com/Qwen-Image/poster.png#center " width="50%">}}


既然可以制作海报，当然我们也可以直接制作PPT啦,我们看一个中文制作PPT的case：
>一张企业级高质量PPT页面图像，整体采用科技感十足的星空蓝为主色调，背景融合流动的发光科技线条与微光粒子特效，营造出专业、现代且富有信任感的品牌氛围；页面顶部左侧清晰展示橘红色Alibaba标志，色彩鲜明、辨识度高。主标题位于画面中央偏上位置，使用大号加粗白色或浅蓝色字体写着“通义千问视觉基础模型”，字体现代简洁，突出技术感；主标题下方紧接一行楷体中文文字：“原生中文·复杂场景·自动布局”，字体柔和优雅，形成科技与人文的融合。下方居中排布展示了四张与图片，分别是：一幅写实与水墨风格结合的梅花特写，枝干苍劲、花瓣清雅，背景融入淡墨晕染与飘雪效果，体现坚韧不拔的精神气质；上方写着黑色的楷体"梅傲"。一株生长于山涧石缝中的兰花，叶片修长、花朵素净，搭配晨雾缭绕的自然环境，展现清逸脱俗的文人风骨；上方写着黑色的楷体"兰幽"。一组迎风而立的翠竹，竹叶随风摇曳，光影交错，背景为青灰色山岩与流水，呈现刚柔并济、虚怀若谷的文化意象；上方写着黑色的楷体"竹清"。一片盛开于秋日庭院的菊花丛，花色丰富、层次分明，配以落叶与古亭剪影，传递恬然自适的生活哲学；上方写着黑色的楷体"菊淡"。所有图片采用统一尺寸与边框样式，呈横向排列。页面底部中央用楷体小字写明“2025年8月，敬请期待”，排版工整、结构清晰，整体风格统一且细节丰富，极具视觉冲击力与品牌调性。
{{< figure src="https://qianwen-res.oss-cn-beijing.aliyuncs.com/Qwen-Image/ppt.png#center " width="100%">}}


其实，除了文本处理，Qwen-Image 也会在通用图像生成方面也表现出色，支持多种艺术风格。从照片级写实场景到印象派绘画，从动漫风格到极简设计，该模型能够灵活响应各种创意提示，成为艺术家、设计师和故事创作者的多功能工具，这些我们在技术报告中会详细描述。

{{< figure src="https://qianwen-res.oss-cn-beijing.aliyuncs.com/Qwen-Image/s2.jpg#center " width="100%">}}


在图像编辑方面，Qwen-Image支持风格迁移、增删改、细节增强、文字编辑，人物姿态调整等多种操作。这让普通用户也能轻松实现专业级的图像编辑。这些我们在技术报告中会详细描述。



{{< figure src="https://qianwen-res.oss-cn-beijing.aliyuncs.com/Qwen-Image/s3.jpg#center " width="100%">}}

综上，我们希望Qwen-Image能够进一步推动在图像生成领域的发展，降低视觉内容创作的技术门槛，激发更多创新应用的可能。同时，我们也期待社区的积极参与与反馈，共同构建开放、透明、可持续发展的生成式AI生态。

