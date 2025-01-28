---
title: "Qwen2-Audio：开启语音对话！"
date: 2024-08-09T16:22:39+08:00
weight: 1
# aliases: ["/first"]
# tags: ["Research"]
#author: "Me"
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

{{< button href="https://huggingface.co/spaces/Qwen/Qwen2-Audio-Instruct-Demo" label="DEMO" external=true >}}
{{< button href="https://arxiv.org/pdf/2407.10759" label="PAPER" external=true >}}
{{< button href="https://github.com/QwenLM/Qwen2-Audio" label="GITHUB" external=true >}}
{{< button href="https://huggingface.co/collections/Qwen/qwen2-audio-66b628d694096020e0c52ff6" label="HUGGING FACE" external=true >}}
{{< button href="https://modelscope.cn/organization/qwen" label="MODELSCOPE" external=true >}}
{{< button href="https://discord.gg/yPEP2vHTu4" label="DISCORD" external=true >}}


在一个通用的AI系统中，核心模型应该能够理解不同模态的信息。当前的大语言模型现在已经能够理解语言并进行推理，并且已经扩展到了更多的模态，包括视觉和音频。此前我们陆续发布了多个 Qwen 语言模型系列以及 Qwen-VL 和 Qwen-Audio 等多模态模型。今天，我们正式发布 Qwen2-Audio。这是 Qwen-Audio 的下一代版本，它能够接受音频和文本输入，并生成文本输出。Qwen2-Audio 具有以下特点：

* 语音聊天：用户可以使用语音向音频语言模型发出指令，无需通过自动语音识别（ASR）模块。

* 音频分析：该模型能够根据文本指令分析音频信息，包括语音、声音、音乐等。

* 多语言支持：该模型支持超过8种语言和方言，例如中文、英语、粤语、法语、意大利语、西班牙语、德语和日语。


<br>

我们在 Hugging Face 和 ModelScope 上开源了 Qwen2-Audio-7B 以及 Qwen2-Audio-7B-Instruct，并且我们搭建了一个 demo 供用户互动。下面是一些具体例子：

<style>
  .example-content .grid-layout {
    display: grid;
    grid-template-columns: 1fr
    ;
    row-gap: var(--content-gap)
}
  .example-container {
    width: 100%; /* 确保容器占满父元素 */
    padding: 0; /* 移除内边距 */
    margin: 0; /* 移除外边距 */
  }
  .grid-layout {
    display: flex;
    flex-direction: column;
    width: 100%; /* 确保占满父元素 */
    grid-template-columns: 1fr;
  }
  .message {
    display: flex;
    flex-direction: column; /* 保持行内布局 */
    align-items: flex-start;
    width: 100%; /* 确保占满父元素 */
  }
  .role {
    font-weight: bold;
    margin-right: 5px;
    white-space: nowrap;
  }
  .content {
    display: flex;
    align-items: center;
    white-space: pre-wrap;
    width: 100%; /* 确保占满父元素 */
    margin-bottom: 10px; /* 添加音频图标底部边距 */
    margin-left: 50px;

  }
  .wide-content {
    width: 100%; /* 确保占满父元素 */
  }
  .audio-icon {
    flex-shrink: 0; /* 防止音频图标缩小 */
    margin-right: 10px; /* 与文字之间的间距 */
    margin-bottom: 10px; /* 添加音频图标底部边距 */
  }
  .text-content {
    flex-grow: 1; /* 占据剩余宽度 */
    width: 100%; /* 确保占满父元素 */
    white-space: pre-wrap;
    margin-top: 10px;
  }
  audio {
    vertical-align: middle; /* 确保音频控件正确对齐 */
  }
</style>

### 语音交互


{{< fullwidth class="example-container" >}}
{{< example_audio data="case/zh_chat_1.json" hide=false next=true >}}
{{< example_audio data="case/zh_chat_2.json" hide=true next=true >}}
{{< example_audio data="case/zh_chat_3.json" hide=true next=true >}}
{{< /fullwidth >}}

### 音频分析

{{< fullwidth class="example-container" >}}
{{< example_audio data="case/zh_ana_1.json" hide=false next=true >}}
{{< example_audio data="case/zh_ana_2.json" hide=true next=true >}}
{{< example_audio data="case/zh_ana_3.json" hide=true next=true >}}
{{< example_audio data="case/zh_ana_4.json" hide=true next=true >}}
{{< example_audio data="case/zh_ana_5.json" hide=true next=true >}}
{{< /fullwidth >}}



## 模型效果

我们已经在一系列基准数据集上进行了实验，包括 LibriSpeech、Common Voice 15、Fleurs、Aishell2、CoVoST2、Meld、Vocalsound 以及 AIR-Benchmark，以评估 Qwen2-Audio 与我们之前发布的 Qwen-Audio 以及各项任务中的最先进模型相比的表现。下面我们将展示一张图表来说明 Qwen2-Audio 相对于竞争对手的表现。在所有任务中，Qwen2-Audio 都显著超越了先前的最佳模型或是 Qwen-Audio。


{{< figure src="https://qianwen-res.oss-cn-beijing.aliyuncs.com/Qwen2-Audio/demo/radar_compare_qwen_audio.png#center" width="80%">}}


关于数据集的更具体结果列于下表中。

{{< figure src="https://qianwen-res.oss-cn-beijing.aliyuncs.com/assets/blog/qwenaudio/table.jpg#center" width="100%">}}



## 结构与训练范式

下图展示了模型结构及训练方法。具体来说，我们使用 Qwen 语言模型和音频编码器这两个基础模型，接着依次进行多任务预训练以实现音频与语言的对齐，以及 SFT 和 DPO 来掌握下游任务的能力并捕捉人类的偏好。

{{< figure src="https://qianwen-res.oss-cn-beijing.aliyuncs.com/Qwen2-Audio/demo/framework.png#center" width="80%">}}


## 如何使用

Qwen2-Audio 已经被 Hugging Face Transfomers 官方支持。我们建议您通过源码安装 `transformers` ，如下所示：

```bash
pip install git+https://github.com/huggingface/transformers
```

下面我们展示如何使用 `Qwen2-Audio-7B-Instruct` 来进行语音对话和音频分析. 下面是一个语音对话的例子：

```python
from io import BytesIO
from urllib.request import urlopen
import librosa
from transformers import Qwen2AudioForConditionalGeneration, AutoProcessor

processor = AutoProcessor.from_pretrained("Qwen/Qwen2-Audio-7B-Instruct")
model = Qwen2AudioForConditionalGeneration.from_pretrained("Qwen/Qwen2-Audio-7B-Instruct", device_map="auto")

conversation = [
    {"role": "user", "content": [
        {"type": "audio", "audio_url": "https://qianwen-res.oss-cn-beijing.aliyuncs.com/Qwen2-Audio/audio/guess_age_gender.wav"},
    ]},
    {"role": "assistant", "content": "Yes, the speaker is female and in her twenties."},
    {"role": "user", "content": [
        {"type": "audio", "audio_url": "https://qianwen-res.oss-cn-beijing.aliyuncs.com/Qwen2-Audio/audio/translate_to_chinese.wav"},
    ]},
]
text = processor.apply_chat_template(conversation, add_generation_prompt=True, tokenize=False)
audios = []
for message in conversation:
    if isinstance(message["content"], list):
        for ele in message["content"]:
            if ele["type"] == "audio":
                audios.append(librosa.load(
                    BytesIO(urlopen(ele['audio_url']).read()), 
                    sr=processor.feature_extractor.sampling_rate)[0]
                )

inputs = processor(text=text, audios=audios, return_tensors="pt", padding=True)
inputs.input_ids = inputs.input_ids.to("cuda")

generate_ids = model.generate(**inputs, max_length=256)
generate_ids = generate_ids[:, inputs.input_ids.size(1):]

response = processor.batch_decode(generate_ids, skip_special_tokens=True, clean_up_tokenization_spaces=False)[0]
```

在语音对话模式中，用户只需输入语音而无需输入文字，指令则通过语音直接传达给模型。下面则是一个音频分析的例子：

```python
from io import BytesIO
from urllib.request import urlopen
import librosa
from transformers import Qwen2AudioForConditionalGeneration, AutoProcessor

processor = AutoProcessor.from_pretrained("Qwen/Qwen2-Audio-7B-Instruct")
model = Qwen2AudioForConditionalGeneration.from_pretrained("Qwen/Qwen2-Audio-7B-Instruct", device_map="auto")

conversation = [
    {'role': 'system', 'content': 'You are a helpful assistant.'}, 
    {"role": "user", "content": [
        {"type": "audio", "audio_url": "https://qianwen-res.oss-cn-beijing.aliyuncs.com/Qwen2-Audio/audio/glass-breaking-151256.mp3"},
        {"type": "text", "text": "What's that sound?"},
    ]},
    {"role": "assistant", "content": "It is the sound of glass shattering."},
    {"role": "user", "content": [
        {"type": "text", "text": "What can you do when you hear that?"},
    ]},
    {"role": "assistant", "content": "Stay alert and cautious, and check if anyone is hurt or if there is any damage to property."},
    {"role": "user", "content": [
        {"type": "audio", "audio_url": "https://qianwen-res.oss-cn-beijing.aliyuncs.com/Qwen2-Audio/audio/1272-128104-0000.flac"},
        {"type": "text", "text": "What does the person say?"},
    ]},
]
text = processor.apply_chat_template(conversation, add_generation_prompt=True, tokenize=False)
audios = []
for message in conversation:
    if isinstance(message["content"], list):
        for ele in message["content"]:
            if ele["type"] == "audio":
                audios.append(
                    librosa.load(
                        BytesIO(urlopen(ele['audio_url']).read()), 
                        sr=processor.feature_extractor.sampling_rate)[0]
                )

inputs = processor(text=text, audios=audios, return_tensors="pt", padding=True)
inputs.input_ids = inputs.input_ids.to("cuda")

generate_ids = model.generate(**inputs, max_length=256)
generate_ids = generate_ids[:, inputs.input_ids.size(1):]

response = processor.batch_decode(generate_ids, skip_special_tokens=True, clean_up_tokenization_spaces=False)[0]
```

与上述例子不同，音频分析模式可以传入文字指令。但是，在这两个模式之间切换只需修改用户输入而无需担心诸如系统指令等其他内容。

## 下一步

这次我们带来了全新的音频语言模型 Qwen2-Audio，它支持语音对话和音频分析，并且能够理解超过 8 种语言和方言。在不久的将来，我们计划在更大的预训练数据集上训练出更优秀的 Qwen2-Audio 模型，使该模型能够支持更长的音频（超过30秒），并且我们还将构建更大规模的 Qwen2-Audio 模型，用于研究音频语言模型的扩展定律。
