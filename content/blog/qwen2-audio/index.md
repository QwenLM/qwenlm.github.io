---
title: "Qwen2-Audio: Chat with Your Voice!"
date: 2024-08-09T16:18:19+08:00
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


To achieve the objective of building an AGI system, the model should be capable of understanding information from different modalities. Thanks to the rapid development of large language models, LLMs are now capable of understanding language and reasoning. Previously we have taken a step forward to extend our LLM, i.e., Qwen, to more modalities, including vision and audio, and built Qwen-VL and Qwen-Audio. Today, we release Qwen2-Audio, the next version of Qwen-Audio, which is capable of accepting audio and text inputs and generating text outputs. Qwen2-Audio has the following features:

* Voice Chat: for the first time, users can use the voice to give instructions to the audio-language model without ASR modules.

* Audio Analysis: the model is capable of analyzing audio information, including speech, sound, music, etc., with text instructions.

* Multilingual: the model supports more than 8 languages and dialects, e.g., Chinese, English, Cantonese, French, Italian, Spanish, German, and Japanese.

<br>

We open-weight Qwen2-Audio-7B and Qwen2-Audio-7B-Instruct in Hugging Face and ModelScope, and we have built a demo for users to interact with. Below are some examples to show the model performance:

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
    /* flex-grow: 1; 占据剩余宽度 */
    width: 90%; /* 确保占满父元素 */
    white-space: pre-wrap;
    margin-top: 10px;
  }
  audio {
    vertical-align: middle; /* 确保音频控件正确对齐 */
  }
</style>

### Voice Chat
{{< fullwidth class="example-container" >}}
{{< example_audio data="case/chat_1.json" hide=false next=true >}}
{{< example_audio data="case/chat_2.json" hide=true next=true >}}
{{< example_audio data="case/chat_3.json" hide=true next=true >}}
{{< /fullwidth >}}

### Audio Analysis
{{< fullwidth class="example-container" >}}
{{< example_audio data="case/ana_1.json" hide=false next=true >}}
{{< example_audio data="case/ana_2.json" hide=true next=true >}}
{{< example_audio data="case/ana_3.json" hide=true next=true >}}
{{< example_audio data="case/ana_4.json" hide=true next=true >}}
{{< /fullwidth >}}


## Performance

We have conducted a series of experiments on benchmark datasets, including LibriSpeech, Common Voice 15, Fleurs, Aishell2, CoVoST2, Meld, Vocalsound, and AIR-Benchmark, to evaluate the performance of Qwen2-Audio in comparison with our previously released Qwen-Audio as well as the state-of-the-art models in each tasks. Below we demonstrate a figure to show how Qwen2-Audio performs against the competitors. In all the tasks, Qwen2-Audio significantly surpasses either previous SOTAs or Qwen-Audio.


{{< figure src="https://qianwen-res.oss-cn-beijing.aliyuncs.com/Qwen2-Audio/demo/radar_compare_qwen_audio.png#center" width="80%">}}


More specific results on the datasets are listed below in the table.

{{< figure src="https://qianwen-res.oss-cn-beijing.aliyuncs.com/assets/blog/qwenaudio/table.jpg#center" width="100%">}}



## Architecture

Below is a demonstration of the training architecture. Specifically, we start from the Qwen language model and an audio encoder as the foundation models. We sequentially apply multi-task pretraining for the audio language alignment, and supervised finetuning as well as direct preference optimization to grasp the capabilities of downstream tasks and model human preference.

{{< figure src="https://qianwen-res.oss-cn-beijing.aliyuncs.com/Qwen2-Audio/demo/framework.png#center" width="80%">}}



## How to Use

Now Qwen2-Audio is officially supported by Hugging Face Transfomers. We advise you install the latest version of `transformers` from source:

```bash
pip install git+https://github.com/huggingface/transformers
```

We demonstrate how to use `Qwen2-Audio-7B-Instruct` to play with voice chat and audio analysis. Here is an example of voice chat:

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

In voice chat mode, the user input is simply the audio without text, and the instructions from the users are inside the audio. Next is an example of audio analysis:

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

In comparison, in audio analysis mode, there is additional text instructions. However, switching between either mode only needs to modify your user inputs and there is no need to worry about others such as system prompt.

## Next Step
This time we bring a new audio language model, Qwen2-Audio, which supports voice chat and audio analysis at the same time and understands more than 8 languages and dialects. In the near future, we plan to train improved Qwen2-Audio models on larger pretraining datasets, enabling the model to support longer audio (over 30s). We also plan to build larger Qwen2-Audio models to explore the scaling laws of audio language models.