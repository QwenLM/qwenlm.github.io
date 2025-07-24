---
title: "Qwen-MT：速度与智能翻译的完美融合"
date: 2025-07-24T22:00:00+08:00
weight: 1
# aliases: ["/first"]
# tags: ["Research"]
# draft: true
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



{{< button href="https://modelscope.cn/studios/Qwen/Qwen3-MT-demo" label="DEMO" external=true >}}
{{< button href="https://bailian.console.aliyun.com/?tab=model#/model-market/detail/qwen-mt-turbo" label="API" external=true >}}
{{< button href="https://discord.gg/yPEP2vHTu4" label="DISCORD" external=true >}}

## 简介

我们通过[Qwen API](https://bailian.console.aliyun.com/?tab=model#/model-market/detail/qwen-mt-turbo) 推出了 Qwen-MT（qwen-mt-turbo）的最新升级版本。本次更新基于强大的 Qwen3 模型，进一步使用超大规模多语言和翻译数据对模型进行训练，全面增强其多语言理解与翻译能力，并结合强化学习技术，显著提升了翻译结果的准确性与语言流畅度。

核心亮点包括：
- **92 种语言互译**：支持超过92种主流官方语言及重要方言之间的高质量互译，覆盖全球 95% 以上的人口，满足广泛的语言交流需求。
- **高度可控性**：提供术语干预、领域提示、记忆库等专业翻译功能，并支持用户自定义提示，有效提升模型在复杂、专业或特定应用场景下的翻译表现。
- **低延迟、低成本**：采用轻量级 MoE（Mixture of Experts）架构，在保证卓越性能的同时实现更快的响应速度和更低的 API 调用价格（每百万输出token低至2元），更适合高并发、实时性要求高的应用场景。

<br><br>


## 自动评估

在中英、英德多领域翻译以及 WMT24 多语言翻译任务中，Qwen-MT 显著优于同规模模型，如 GPT-4.1-mini、Gemini-2.5-Flash 和 Qwen3-8B。甚至与 GPT-4.1、Gemini-2.5-Pro、Qwen3-235B-A22B 等顶级大模型相比，翻译效果依然毫不逊色，凭借轻量化的模型架构设计带来快速的翻译体验。

{{< figure src="https://qianwen-res.oss-accelerate-overseas.aliyuncs.com/qwen-mt-001.jpeg" width="100%">}}

## 人工评估

翻译自动评测存在一定的局限性。为更准确地评估翻译质量，我们针对中文、英语、日语、韩语、泰语、阿拉伯语、意大利语、俄语、西班牙语、法语等主要语言，开展了基于真实场景翻译数据的人工评测。每条测试样本均由三名专业译员独立评分并进行交叉校准，确保评估结果的客观性与可靠性。在合格率、优良率上，Qwen-MT 均展现出显著优势，体现出其在实际应用中的卓越翻译能力。

{{< figure src="https://qianwen-res.oss-accelerate-overseas.aliyuncs.com/qwen-mt-002.jpeg" width="100%">}}
{{< figure src="https://qianwen-res.oss-accelerate-overseas.aliyuncs.com/qwen-mt-003.png" width="100%">}}

以下是一些翻译样例：

| 原文      | Qwen-MT译文 |
|:------------|:------|
| Make your **cubicle** neat, tidy and make it a **homey charm**. | 让你的**隔间**整洁有序，营造出**温馨舒适**的氛围。 |
| Little study **hack** for **y’all**… do your homework/assignments the first day it was given to you… NO PROCRASTINATING!!! **the day it was assigned** | 给**大家**一个学习小**技巧**……拿到作业/任务的第一天就完成它……千万别拖延！**就在布置的当天完成！** |
| **Kim** **also** attended her ex's first Donda **listening party** at Atlanta's Mercedes-Benz Stadium on July 22. | **金·卡戴珊也**于7月22日出席了她前男友在亚特兰大的梅赛德斯-奔驰体育场举行的首场《Donda》专辑**试听会**。 |
| 作为互联网公司搬砖的表示，用结果来推导自己的论点，真是闲得蛋疼，马后炮事后诸葛亮就别分析那么多。 | As a representation of **working hard** at an internet company, it's really **annoying** to use results to deduce one's own arguments. Don't overanalyze things after the fact **like a hindsight expert**. |
| **浪姐**一、二季还行，挺励志的。虽然什么成团确实挺扯的，起码过程也算新鲜，可以看。后面就有点**炒回锅肉**的赶脚了：大家意识到了浪姐的讨论度，然后都来上浪姐，浪姐有需要继续办下去，所以就有了故取所需的**赶脚**。 | Seasons one and two of "**Sister Who Makes Waves**" were decent and quite inspiring. Although the idea of forming a group was indeed ridiculous, at least the process itself was fresh and worth watching. Later on, it started to **feel like** **reheated leftovers**: everyone realized the show's popularity, so they all jumped on the bandwagon. Since the show needed to continue, it **felt like** everything was being done for the sake of convenience. |
| 发言人陈斌华表示：大陆企业出品的**3A游戏《黑神话：悟空》**，受到**岛内**青年、游戏爱好者的追捧和好评。一方面是游戏本身制作精良、体验感好、趣味性强；另一方面是取材于**《西游记》**的故事和人物角色，融入了大量古代建筑、东方美学、国风音乐等中华文化元素，**岛内玩家**很熟悉、易亲近，毕竟大家都是读着**四大名著**长大的中国人。 | Spokesperson Chen Binhua stated: The **3A game "Black Myth: Wukong"** produced by a mainland company, has been enthusiastically embraced and highly praised by young people and gaming enthusiasts **in Taiwan**. On one hand, the game itself is well-made, offers an excellent experience, and is highly engaging. On the other hand, it draws inspiration from the story and characters of **"Journey to the West,"** incorporating numerous elements of traditional Chinese culture, such as ancient architecture, Eastern aesthetics, and national-style music. These elements are familiar and easily relatable to **players in Taiwan**, after all, they are all Chinese who grew up reading the Four Great Classical Novels. |
| 且夫秦欲璧，赵弗予璧，两无所曲直也。入璧而秦弗予城，曲在秦；秦出城而璧归，曲在赵。 | Moreover, if Qin desires the jade, and Zhao refuses to give it, neither side is at fault. If Zhao gives the jade but Qin does not provide the city, the fault lies with Qin; if Qin provides the city but the jade returns to Zhao, the fault lies with Zhao. |


<br><br>

## 语种支持

| 语系 | 语种 |
|:--|:--|
| 印欧语系 | 南非荷兰语，亚美尼亚语，阿萨姆语，阿斯图里亚斯语，白俄罗斯语，孟加拉语，波斯尼亚语，保加利亚语，加泰罗尼亚语，克罗地亚语，捷克语，丹麦语，荷兰语，英语，法语，加利西亚语，德语，希腊语，古吉拉特语，印地语，冰岛语，意大利语，拉脱维亚语，立陶宛语，卢森堡语，马其顿语，马加希语，马拉地语，美索不达米亚阿拉伯语，尼泊尔语，书面语挪威语，新挪威语，奥克语，奥里亚语，波兰语，葡萄牙语，罗马尼亚语，俄语，塞尔维亚语，西西里语，信德语，僧伽罗语，斯洛伐克语，斯洛文尼亚语，西班牙语，瑞典语，托斯克阿尔巴尼亚语，乌克兰语，乌尔都语，威尼斯语，威尔士语，波斯语 |
| 汉藏语系 | 中文（粤语、简体、繁体），缅甸语 |
| 亚非语系 | 阿拉伯语（标准、埃及、美索不达米亚、摩洛哥、内志、北黎凡特、南黎凡特、塔伊兹-亚丁、突尼斯），希伯来语，马耳他语 |
| 南岛语系 | 宿务语，印度尼西亚语，爪哇语，马来语，邦阿西楠语，他加禄语，瓦莱语， |
| 达罗毗荼语系 | 卡纳达语，泰米尔语，泰卢固语 |
| 突厥语系 | 哈萨克语，北阿塞拜疆语，北乌兹别克语，土耳其语 |
| 壮侗语系 | 泰语，老挝语 |
| 乌拉尔语系 | 爱沙尼亚语，芬兰语，匈牙利语 |
| 南亚语系 | 高棉语，越南语 |
| 其它语系 | 巴斯克语，格鲁吉亚语，日语，韩语，斯瓦希里语 |

<br><br>


## 使用方法

您可以通过 Qwen API 轻松使用Qwen-MT，此处以中译英的简单场景为例。

```python
import os
from openai import OpenAI

client = OpenAI(
    api_key=os.getenv("DASHSCOPE_API_KEY"),
    base_url="https://dashscope.aliyuncs.com/compatible-mode/v1",
)

messages = [
    {
        "role": "user",
        "content": "我看到这个视频后没有笑"
    }
]

translation_options = {
    "source_lang": "auto",
    "target_lang": "English"
}

completion = client.chat.completions.create(
    model="qwen-mt-turbo",
    messages=messages,
    extra_body={
        "translation_options": translation_options
    }
)

print(completion.choices[0].message.content)
```

Qwen-MT支持术语干预、自定义指令、翻译记忆等功能，例如翻译场景中有较多专业术语，您可以提前指定这些术语及其翻译结果，并作为参数传入模型，使其能够结合您提供的术语来进行翻译。

```python
import os
from openai import OpenAI

client = OpenAI(
    api_key=os.getenv("DASHSCOPE_API_KEY"),
    base_url="https://dashscope.aliyuncs.com/compatible-mode/v1",
)

messages = [
    {
        "role": "user",
        "content": "而这套生物传感器运用了石墨烯这种新型材料，它的目标物是化学元素，敏锐的“嗅觉”让它能更深度、准确地体现身体健康状况。"
    }
]

translation_options = {
    "source_lang": "Chinese",
    "target_lang": "English",
    "terms": [
        {
            "source": "生物传感器",
            "target": "biological sensor"
        },
        {
            "source": "石墨烯",
            "target": "graphene"
        },
        {
            "source": "化学元素",
            "target": "chemical elements"
        },
        {
            "source": "身体健康状况",
            "target": "health status of the body"
        }
    ]
}

completion = client.chat.completions.create(
    model="qwen-mt-turbo",
    messages=messages,
    extra_body={
        "translation_options": translation_options
    }
)
    
print(completion.choices[0].message.content)

# Response:
# This biological sensor uses graphene, a new material, and its target is chemical elements. Its sensitive "nose" can more deeply and accurately reflect the health status of the body. 
```


此外，不同领域有不同的文风，如法律、政务领域翻译用语应当严肃正式，社交领域用语应当口语化，您可以通过一段自然语言文本描述领域和要求，将其作为翻译的提示。

```python
import os
from openai import OpenAI

client = OpenAI(
    api_key=os.getenv("DASHSCOPE_API_KEY"),
    base_url="https://dashscope.aliyuncs.com/compatible-mode/v1",
)

messages = [
    {
        "role": "user",
        "content": "第二个SELECT语句返回一个数字，表示在没有LIMIT子句的情况下，第一个SELECT语句返回了多少行。"
    }
]

translation_options = {
    "source_lang": "Chinese",
    "target_lang": "English",
    "domains": "The sentence is from Ali Cloud IT domain. It mainly involves computer-related software development and usage methods, including many terms related to computer software and hardware. Pay attention to professional troubleshooting terminologies and sentence patterns when translating. Translate into this IT domain style."
}

completion = client.chat.completions.create(
    model="qwen-mt-turbo",
    messages=messages,
    extra_body={
        "translation_options": translation_options
    }
)
    
print(completion.choices[0].message.content)

# Response:
# The second SELECT statement returns a number that indicates how many rows were returned by the first SELECT statement without LIMIT clause.
```

更多进阶功能请参考[Qwen API](https://bailian.console.aliyun.com/?tab=doc#/doc/?type=model&url=https%3A%2F%2Fhelp.aliyun.com%2Fdocument_detail%2F2860790.html&renderType=iframe)文档。

<br><br>


## 结语

Qwen-MT 是一款机器翻译模型，支持 92 种语言之间的互译，旨在通过 API 为全球用户打造更智能、更灵活、更高效的翻译体验。“信、达、雅”之路道阻且长，但我们始终在不断探索与精进。未来，我们将持续提升翻译的准确性与自然度，拓展更多语种覆盖，力求突破语言壁垒，让沟通没有语言障碍。

<br><br>
