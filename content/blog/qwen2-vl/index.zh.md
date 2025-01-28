---
title: "Qwen2-VL: 更清晰地看世界"
date: 2024-08-29T0:24:00+08:00
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
{{< figure src="https://qianwen-res.oss-accelerate.aliyuncs.com/Qwen2-VL/qwen2vl-head.jpeg#center" width="100%">}}

{{< button href="https://huggingface.co/spaces/Qwen/Qwen2-VL" label="DEMO" external=true >}}
{{< button href="https://github.com/QwenLM/Qwen2-VL" label="GITHUB" external=true >}}
{{< button href="https://huggingface.co/collections/Qwen/qwen2-vl-66cee7455501d7126940800d" label="HUGGING FACE" external=true >}}
{{< button href="https://modelscope.cn/organization/qwen" label="MODELSCOPE" external=true >}}
{{< button href="https://help.aliyun.com/zh/model-studio/developer-reference/qwen-vl-api" label="API" external=true >}}
{{< button href="https://discord.gg/yPEP2vHTu4" label="DISCORD" external=true >}}


经历了接近一年时间的持续努力，今天我们很高兴地宣布我们最新一代的视觉语言模型：**Qwen2-VL** ！Qwen2-VL 基于 Qwen2 打造，相比 Qwen-VL，它具有以下特点：

1. **读懂不同分辨率和不同长宽比的图片**：Qwen2-VL 在 MathVista、DocVQA、RealWorldQA、MTVQA 等视觉理解基准测试中取得了全球领先的表现。

2. **理解20分钟以上的长视频**：Qwen2-VL 可理解长视频，并将其用于基于视频的问答、对话和内容创作等应用中。

3. **能够操作手机和机器人的视觉智能体**：借助复杂推理和决策的能力，Qwen2-VL 可集成到手机、机器人等设备，根据视觉环境和文字指令进行自动操作。

4. **多语言支持**：为了服务全球用户，除英语和中文外，Qwen2-VL 现在还支持理解图像中的多语言文本，包括大多数欧洲语言、日语、韩语、阿拉伯语、越南语等。
<br><br>

我们以 Apache 2.0 协议开源了 Qwen2-VL-2B 和 Qwen2-VL-7B，并发布了 Qwen2-VL-72B 的 API！开源代码已集成到 Hugging Face Transformers、vLLM 和其他第三方框架中。希望能为您提供便捷的开发体验！

## 模型性能

我们从六个方面来评估我们模型的视觉能力，包括综合的大学题目、数学能力、文档表格多语言文字图像的理解、通用场景下的问答、视频理解、Agent 能力。整体来看，我们 72B 规模的模型在大部分的指标上都达到了最优，甚至超过了 GPT-4o 和 Claude3.5-Sonnet 等闭源模型，特别是在文档理解方面优势明显，仅在对综合的大学题目上和 GPT-4o 还有差距。同时 Qwen2-VL 72B 也刷新了开源多模态模型的最好表现。
{{< figure src="https://qianwen-res.oss-accelerate-overseas.aliyuncs.com/Qwen2-VL/qwen2-vl-72b.jpg#center" width="100%">}}
在 7B 规模上，我们同样支持图像、多图、视频的输入，在更经济的规模上也实现了有竞争力的性能表现，特别是像 DocVQA 之类的文档理解能力和 MTVQA 考察的图片中多语言文字理解能力都处于 SOTA 水平。
{{< figure src="https://qianwen-res.oss-accelerate-overseas.aliyuncs.com/Qwen2-VL/qwen2-vl-7b.jpg#center" width="100%">}}
除此之外，我们还提供了一个更小的 2B 规模的模型，以此支持移动端的丰富应用。它具备完整图像视频多语言的理解能力，性能强劲，特别在视频文档和通用场景问答相较同规模模型优势明显。
{{< figure src="https://qianwen-res.oss-accelerate-overseas.aliyuncs.com/Qwen2-VL/qwen2-vl-2b.jpg#center" width="100%">}}

## 模型能力案例

### 1. 更细节的识别理解

Qwen2-VL 不仅能识别植物和地标，而且能理解场景中多个对象间的关系。我们还特别增强了对手写文字及图像中多种语言的识别能力，令其在全球范围内更加易用。

{{< fullwidth class="example-container" >}}
{{< example data="cases/1_3.json" hide=false next=true >}}
{{< example data="cases/1_4.json" hide=true next=true >}}
{{< example data="cases/1_6.json" hide=true next=true >}}
{{< example data="cases/1_7.json" hide=true next=true >}}
{{< example data="cases/1_1.json" hide=true next=true >}}
{{< example data="cases/1_5.json" hide=true next=true >}}
{{< /fullwidth >}}

### 2. 视觉推理：解决现实世界问题

在此版本中，Qwen2-VL 的数学和编程能力得到了显著增强。模型能够通过分析图片解决问题，还可以解读复杂的数学问题，通过图表进行分析，甚至极端长宽比的图片也能正确解读。除此之外，我们还强化了从真实世界图像和图表中提取信息的能力，并改进了其指令跟随的能力。这种视觉感知与逻辑推理的结合，赋予模型解决实际问题的能力，让模型能够扮演生活中的小助手。

{{< fullwidth class="example-container" >}}
{{< example data="cases/2_2.json" hide=false next=true >}}
{{< example data="cases/2_1.json" hide=true next=true >}}
{{< example data="cases/2_3.json" hide=true next=true >}}
{{< example data="cases/2_4.json" hide=true next=true >}}
{{< example data="cases/2_5.json" hide=true next=true >}}
{{< example data="cases/2_6.json" hide=true next=true >}}
{{< example data="cases/2_7.json" hide=true next=true >}}
{{< /fullwidth >}}



### 3. 视频理解与实时聊天
除了静态图像，Qwen2-VL 的能力已扩展到视频内容分析。它能够总结视频要点、即时回答相关问题，并维持连贯对话，仿佛一位随时待命的个人助手，帮助用户从视频中获取有价值的信息。这一特性无疑拓宽了AI应用的边界，为用户提供更加直观且即时的帮助。


{{< fullwidth class="example-container" >}}
{{< example data="cases/3_1.json" hide=false next=true >}}
{{< example data="cases/3_2.json" hide=true next=true >}}
{{< /fullwidth >}}


{{< fullwidth class="example-container" >}}
{{< example data="cases/3_3.json" hide=false next=true >}}
{{< example data="cases/3_4.json" hide=true next=true >}}
{{< /fullwidth >}}

### 4. Visual Agent 能力: 函数调用和视觉交互.

Qwen2-VL 在作为视觉代理方面展示了强大的潜力，已经初步具备一些能够利用视觉能力完成一些自动化的工具调用和交互。

- Function Calling: 模型支持函数调用，使其能够利用外部工具进行实时数据检索——无论是航班状态、天气预报还是包裹追踪——通过解读视觉线索。视觉解读与功能执行的整合提升了模型的实用性，使其成为信息管理和决策的有力工具。

{{< fullwidth class="example-container" >}}
{{< example data="cases/4_1.json" hide=false next=true >}}
{{< example data="cases/4_2.json" hide=true next=true >}}
{{< example data="cases/4_7.json" hide=true next=true >}}
{{< example data="cases/4_8.json" hide=true next=true >}}
{{< /fullwidth >}}

* Visual Interactions: 视觉交互对多模态大模型是更高的感知能力要求。我们初步做了一些简单的探索，让模型能够更像人一样和环境交互。使得 Qwen2-VL 不仅作为观察者，而是能有代替人做更多的执行者的可能。

{{< fullwidth class="example-container" >}}
{{< example data="cases/4_3.json" hide=false next=true >}}
{{< example data="cases/4_4.json" hide=true next=true >}}
{{< example data="cases/4_5.json" hide=true next=true >}}
{{< example data="cases/4_6.json" hide=true next=true >}}
{{< /fullwidth >}}

当然模型并不完美，仍然存在一些局限性，比如无法从视频中提取音频、知识仅更新至 2023 年 6 月等。此外，模型在复杂的指令和复杂场景下不能保证完全正确，在计数、人物识别和3D空间感知方面也相对薄弱。

## 模型架构

整体上我们仍然延续了 Qwen-VL 中 ViT 加 Qwen2 的串联结构，在三个不同尺度的模型上，我们都采用 600M 规模大小的 ViT，并且支持图像和视频统一输入。为了让模型更清楚地感知视觉信息和理解视频，我们还进行了以下升级：

* Qwen2-VL 在架构上的一大改进是实现了对**原生动态分辨率**的全面支持。与上一代模型相比，Qwen2-VL 能够处理任意分辨率的图像输入，不同大小图片被转换为动态数量的 tokens，最小只占 4 个 tokens。这种设计不仅确保了模型输入与图像原始信息之间的高度一致性，更是模拟了人类视觉感知的自然方式，赋予模型处理任意尺寸图像的强大能力，使其在图像处理领域展现出更加灵活和高效的表现。

{{< figure src="https://qianwen-res.oss-cn-beijing.aliyuncs.com/Qwen2-VL/qwen2_vl.jpg#center" width="90%">}}


* Qwen2-VL 在架构上的另一重要创新则是**多模态旋转位置嵌入（M-ROPE）**。传统的旋转位置嵌入只能捕捉一维序列的位置信息，而 M-ROPE 通过将原始旋转嵌入分解为代表时间、高度和宽度的三个部分，使得大规模语言模型能够同时捕捉和整合一维文本序列、二维视觉图像以及三维视频的位置信息。这一创新赋予了语言模型强大的多模态处理和推理能力，能够更好地理解和建模复杂的多模态数据。

{{< figure src="https://qianwen-res.oss-cn-beijing.aliyuncs.com/Qwen2-VL/mrope.png#center" width="90%">}}



## 玩转 Qwen2-VL

如需使用 Qwen2-VL 系列的最强模型 Qwen2-VL-72B，目前您可以通过我们的官方 API （登录 [DashScope](https://dashscope.aliyun.com/) 注册并获取API Key）来体验该模型：

```python
from openai import OpenAI
import os
import base64


def encode_image(image_path):
    with open(image_path, "rb") as image_file:
        return base64.b64encode(image_file.read()).decode("utf-8")


# Path to your image
image_path = "dog_and_girl.jpeg"

# Getting the base64 string
base64_image = encode_image(image_path)


def get_response():
    client = OpenAI(
        api_key=os.getenv("DASHSCOPE_API_KEY"),
        base_url="https://dashscope.aliyuncs.com/compatible-mode/v1",
    )
    completion = client.chat.completions.create(
        model="qwen-vl-max-0809",
        messages=[
            {
                "role": "user",
                "content": [
                    {"type": "text", "text": "What is this?"},
                    {
                        "type": "image_url",
                        "image_url": {
                            "url": "https://dashscope.oss-cn-beijing.aliyuncs.com/images/dog_and_girl.jpeg"
                        },
                    },
                    {
                        "type": "image_url",
                        "image_url": {"url": f"data:image/jpeg;base64,{base64_image}"},
                    },
                ],
            }
        ],
        top_p=0.8,
        stream=True,
        stream_options={"include_usage": True},
    )
    for chunk in completion:
        print(chunk.model_dump_json())


if __name__ == "__main__":
    get_response()
```

Qwen2-VL 系列的 2B 和 7B 模型及其量化模型已经开源，您可以在Hugging Face和ModelScope上找到它们，通过 Model Card 深入了解使用指南、特色功能及性能指标。下面我们展示一个基于 HF Transformers 的最简用例。

请先确保您已通过此命令 `pip install git+https://github.com/huggingface/transformers` 从源安装了 `transformers`。如果您没有通过源安装，您可能遇到如下报错：

```bash
KeyError: 'qwen2_vl'
```

我们提供了帮助您处理不同类型的视觉输入的工具。它支持 base64、URL、穿插的图文与视频等。您可以通过如下命令安装：

```bash
pip install qwen-vl-utils
```

下面是一段示例代码。我们推荐您使用 flash attention 2 来实现加速和节省显存。

<details>

<summary>示例代码</summary>

```python
from transformers import Qwen2VLForConditionalGeneration, AutoTokenizer, AutoProcessor
from qwen_vl_utils import process_vision_info

# default: Load the model on the available device(s)
model = Qwen2VLForConditionalGeneration.from_pretrained(
    "Qwen/Qwen2-VL-7B-Instruct", device_map="auto"
)

# We recommend enabling flash_attention_2 for better acceleration and memory saving, especially in multi-image and video scenarios.
# model = Qwen2VLForConditionalGeneration.from_pretrained(
#     "Qwen/Qwen2-VL-7B-Instruct",
#     torch_dtype=torch.bfloat16,
#     attn_implementation="flash_attention_2",
#     device_map="auto",
# )

# default processer
processor = AutoProcessor.from_pretrained("Qwen/Qwen2-VL-7B-Instruct")

# The default range for the number of visual tokens per image in the model is 4-16384. You can set min_pixels and max_pixels according to your needs, such as a token count range of 256-1280, to balance speed and memory usage.
# min_pixels = 256*28*28
# max_pixels = 1280*28*28
# processor = AutoProcessor.from_pretrained("Qwen/Qwen2-VL-7B-Instruct", min_pixels=min_pixels, max_pixels=max_pixels)

messages = [
    {
        "role": "user",
        "content": [
            {
                "type": "image",
                "image": "https://qianwen-res.oss-cn-beijing.aliyuncs.com/Qwen-VL/assets/demo.jpeg",
            },
            {"type": "text", "text": "Describe this image."},
        ],
    }
]

# Preparation for inference
text = processor.apply_chat_template(
    messages, tokenize=False, add_generation_prompt=True
)
image_inputs, video_inputs = process_vision_info(messages)
inputs = processor(
    text=[text],
    images=image_inputs,
    videos=video_inputs,
    padding=True,
    return_tensors="pt",
)

# Inference: Generation of the output
generated_ids = model.generate(**inputs, max_new_tokens=128)
generated_ids_trimmed = [
    out_ids[len(in_ids) :] for in_ids, out_ids in zip(inputs.input_ids, generated_ids)
]
output_text = processor.batch_decode(
    generated_ids_trimmed, skip_special_tokens=True, clean_up_tokenization_spaces=False
)
print(output_text)
```
</details>


> 为了方便大家更好地使用我们的模型，我们提供了开源生态的多个三方框架的支持，其中包括量化工具（[AutoGPTQ](https://github.com/AutoGPTQ/AutoGPTQ), [AutoAWQ](https://github.com/casper-hansen/AutoAWQ)）、部署工具（[vLLM](https://github.com/vllm-project/vllm)）、以及微调工具（[Llama-Factory](https://github.com/hiyouga/LLaMA-Factory)）等。

## License

Qwen2-VL-2B 和 Qwen2-VL-7B 均使用 Apache 2.0 License。

## 下一步

我们希望得到您的反馈以及了解您如何应用 Qwen2-VL。在接下来的时间里，我们将进一步基于下一代语言模型打造更强的视觉语言模型，同时将研究结合更多模态以实现一个真正意义的统一模型！