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


{{< button href="https://huggingface.co/spaces/Qwen/Qwen3-MT-Demo" label="DEMO" external=true >}}
{{< button href="https://modelstudio.console.alibabacloud.com/?tab=doc#/doc/?type=model&url=https://www.alibabacloud.com/help/en/doc-detail/2840914_2.html&renderType=component&modelId=qwen-mt-turbo" label="API" external=true >}}
{{< button href="https://discord.gg/yPEP2vHTu4" label="DISCORD" external=true >}}

## Introduction


Here we introduce the latest update of Qwen-MT (qwen-mt-turbo) via [Qwen API](https://modelstudio.console.alibabacloud.com/). This update builds upon the powerful Qwen3, leveraging trillions multilingual and translation tokens to comprehensively enhance the model’s multilingual understanding and translation capabilities. By integrating reinforcement learning techniques, the model achieves significant improvements in translation accuracy and linguistic fluency.

Key Features:
- **Multilingual Support for 92 Languages**: Qwen-MT enables high-quality translation across 92 major official languages and prominent dialects, covering over 95% of the global population to meet diverse cross-lingual communication needs.
- **High Customizability**: The new version provides advanced translation capabilities such as terminology intervention, domain prompts and translation memory. By enabling customizable prompt engineering, it delivers optimized translation performance tailored to complex, domain-specific, and mission-critical application scenarios.
- **Low Latency & Cost Efficiency**: By leveraging a lightweight Mixture of Experts (MoE) architecture, Qwen-MT achieves high translation performance with faster response times and significantly reduced API costs (as low as $0.5 per million output tokens). This is particularly well-suited for high-concurrency environments and latency-sensitive applications.


<br><br>


## Translation Quality

### Automatic Evaluation
We evaluate Qwen-MT on multi-domain translation benchmark, specifically Chinese-English and English-German translation, as well as WMT24 multilingual translation benchmark. Experimental results demonstrate that Qwen-MT significantly outperforms comparably-sized models including GPT-4.1-mini, Gemini-2.5-Flash, and Qwen3-8B. Notably, even when compared to state-of-the-art large language models such as GPT-4.1, Gemini-2.5-Pro, and Qwen3-235B-A22B, Qwen-MT maintains competitive translation quality while its optimized lightweight architecture enables rapid translation processing.

{{< figure src="https://qianwen-res.oss-accelerate-overseas.aliyuncs.com/qwen-mt-001.jpeg" width="100%">}}


### Human Evaluation

Automatic evaluation methods have inherent limitations, we further implemented human evaluation protocols leveraging real-world translation data across ten major languages: Chinese, English, Japanese, Korean, Thai, Arabic, Italian, Russian, Spanish, and French. Our rigorous evaluation framework involved three independent professional translators scoring each test sample, followed by systematic cross-validation procedures to ensure both objectivity and reliability of the assessment outcomes. Notably, Qwen-MT achieved superior performance metrics, demonstrating significant advantages in both acceptance rates and excellence rates, validating its exceptional translation capabilities in practical deployment scenarios.

{{< figure src="https://qianwen-res.oss-accelerate-overseas.aliyuncs.com/qwen-mt-002.jpeg" width="100%">}}
{{< figure src="https://qianwen-res.oss-accelerate-overseas.aliyuncs.com/qwen-mt-003.png" width="100%">}}

Here are some translation examples：

| Source Text      | Qwen-MT |
|:------------|:------|
| Make your **cubicle** neat, tidy and make it a **homey charm**. | 让你的**隔间**整洁有序，营造出**温馨舒适**的氛围。 |
| Little study **hack** for **y’all**… do your homework/assignments the first day it was given to you… NO PROCRASTINATING!!! **the day it was assigned** | 给**大家**一个学习小**技巧**……拿到作业/任务的第一天就完成它……千万别拖延！**就在布置的当天完成！** |
| **Kim** **also** attended her ex's first Donda **listening party** at Atlanta's Mercedes-Benz Stadium on July 22. | **金·卡戴珊也**于7月22日出席了她前男友在亚特兰大的梅赛德斯-奔驰体育场举行的首场《Donda》专辑**试听会**。 |
| 作为互联网公司搬砖的表示，用结果来推导自己的论点，真是闲得蛋疼，马后炮事后诸葛亮就别分析那么多。 | As a representation of **working hard** at an internet company, it's really **annoying** to use results to deduce one's own arguments. Don't overanalyze things after the fact **like a hindsight expert**. |
| **浪姐**一、二季还行，挺励志的。虽然什么成团确实挺扯的，起码过程也算新鲜，可以看。后面就有点**炒回锅肉**的赶脚了：大家意识到了浪姐的讨论度，然后都来上浪姐，浪姐有需要继续办下去，所以就有了故取所需的**赶脚**。 | Seasons one and two of "**Sister Who Makes Waves**" were decent and quite inspiring. Although the idea of forming a group was indeed ridiculous, at least the process itself was fresh and worth watching. Later on, it started to **feel like** **reheated leftovers**: everyone realized the show's popularity, so they all jumped on the bandwagon. Since the show needed to continue, it **felt like** everything was being done for the sake of convenience. |
| 发言人陈斌华表示：大陆企业出品的**3A游戏《黑神话：悟空》**，受到**岛内**青年、游戏爱好者的追捧和好评。一方面是游戏本身制作精良、体验感好、趣味性强；另一方面是取材于**《西游记》**的故事和人物角色，融入了大量古代建筑、东方美学、国风音乐等中华文化元素，**岛内玩家**很熟悉、易亲近，毕竟大家都是读着**四大名著**长大的中国人。 | Spokesperson Chen Binhua stated: The **3A game "Black Myth: Wukong"** produced by a mainland company, has been enthusiastically embraced and highly praised by young people and gaming enthusiasts **in Taiwan**. On one hand, the game itself is well-made, offers an excellent experience, and is highly engaging. On the other hand, it draws inspiration from the story and characters of **"Journey to the West,"** incorporating numerous elements of traditional Chinese culture, such as ancient architecture, Eastern aesthetics, and national-style music. These elements are familiar and easily relatable to **players in Taiwan**, after all, they are all Chinese who grew up reading the Four Great Classical Novels. |
| 且夫秦欲璧，赵弗予璧，两无所曲直也。入璧而秦弗予城，曲在秦；秦出城而璧归，曲在赵。 | Moreover, if Qin desires the jade, and Zhao refuses to give it, neither side is at fault. If Zhao gives the jade but Qin does not provide the city, the fault lies with Qin; if Qin provides the city but the jade returns to Zhao, the fault lies with Zhao. |


<br><br>

## Language Support

| Language Family | Language Name |
|:--|:--|
Indo-European | Afrikaans, Armenian, Assamese, Asturian, Belarusian, Bengali, Bosnian, Bulgarian, Catalan, Croatian, Czech, Danish, Dutch, English, French, Galician, German, Greek, Gujarati, Hindi, Icelandic, Italian, Latvian, Lithuanian, Luxembourgish, Macedonian, Maithili, Marathi, Nepali, Norwegian Bokmål, Norwegian Nynorsk, Occitan, Odia, Polish, Portuguese, Romanian, Russian, Serbian, Sicilian, Sindhi, Sinhala, Slovak, Slovenian, Spanish, Swedish, Tosk Albanian, Ukrainian, Urdu, Venetian, Welsh, Western Persian |
| Sino-Tibetan | Chinese (Cantonese, Simplified, and Traditional), Burmese |
| Afro-Asiatic | Arabic (Standard, Egyptian, Mesopotamian, Moroccan, Najdi, North Levantine, South Levantine, Ta’izzi-Adeni, and Tunisian), Hebrew, Maltese |
| Austronesian | Cebuano, Indonesian, Javanese, Malay, Pangasinan, Tagalog, Waray |
| Dravidian | Kannada, Tamil, Telugu |
| Turkic | Kazakh, North Azerbaijani, Northern Uzbek, Turkish |
| Tai-Kadai | Thai, Lao |
| Uralic | Estonian, Finnish, Hungarian |
| Austroasiatic | Khmer, Vietnamese |
| Other | Basque, Georgian, Japanese, Korean, Swahili |

<br><br>


## How to use

You can easily use Qwen-MT through Qwen API. Here we take a simple scenario of translating from Chinese to English as an example.

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

Qwen-MT supports features such as terminology intervention, domain prompts, and translation memory. For instance, in a translation scenario involves specialized terms, users can predefine key terminology pairs and inject them as parameters into the model, ensuring consistent application of user-specified lexicon throughout the output.


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


Moreover, translation style must adapt to contextual nuances. For example, in legal and official contexts, formal register is imperative, whereas social media communication demands a conversational tone. To ensure appropriate stylistic adaptation, users can provide contextual details and stylistic preferences in natural language alongside their source text.

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

For more advanced features, please refer to [Qwen API](https://www.alibabacloud.com/help/zh/model-studio/videos/translation-ability).

<br><br>


## Conclusion

Qwen-MT is an advanced machine translation model that supports translations among 92 languages. It aims to provide global users with smart, flexible, and efficient translation experience through APIs. While "faithfulness, fluency, and elegance" remains an ongoing journey filled with challenges, we are persistently exploring and improving. Looking ahead, we will continue to enhance translation accuracy and naturalness, expand coverage to more languages, ultimately dismantling language barriers to realize truly borderless communication.

<br><br>
