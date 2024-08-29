---
title: "Qwen2-VL: To See the World More Clearly"
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


After a year's relentless efforts, today we are thrilled to release **Qwen2-VL**! Qwen2-VL is the latest version of the vision language models based on **Qwen2** in the Qwen model familities. Compared with Qwen-VL, Qwen2-VL has the capabilities of:

* **SoTA understanding of images of various resolution & ratio**: Qwen2-VL achieves state-of-the-art performance on visual understanding benchmarks, including MathVista, DocVQA, RealWorldQA, MTVQA, etc.

* **Understanding videos of 20min+**: Qwen2-VL can understand videos over 20 minutes for high-quality video-based question answering, dialog, content creation, etc.

* **Agent that can operate your mobiles, robots, etc.**: with the abilities of complex reasoning and decision making, Qwen2-VL can be integrated with devices like mobile phones, robots, etc., for automatic operation based on visual environment and text instructions.

* **Multilingual Support**: to serve global users, besides English and Chinese, Qwen2-VL now supports the understanding of texts in different languages inside images, including most European languages, Japanese, Korean, Arabic, Vietnamese, etc.
<br><br>

We opensourced Qwen2-VL-2B and Qwen2-VL-7B with Apache 2.0 license, and we release the API of Qwen2-VL-72B! The opensource is integrated to Hugging Face Transformers, vLLM, and other third-party frameworks. Hope you enjoy!





## Performance

We evaluate our model’s visual capabilities across six key dimensions: complex college-level problem-solving, mathematical abilities, document and table comprehension, multilingual text-image understanding, general scenario question-answering, video comprehension, and agent-based interactions. Overall, our 72B model showcases top-tier performance across most metrics, often surpassing even closed-source models like GPT-4o and Claude 3.5-Sonnet. Notably, it demonstrates a significant edge in document understanding. 

{{< figure src="https://qianwen-res.oss-accelerate-overseas.aliyuncs.com/Qwen2-VL/qwen2-vl-72b.jpg#center" width="100%">}}

At the 7B scale, we’ve managed to retain support for image, multi-image, and video inputs, delivering competitive performance in a more cost-effective model size. Specifically, our model excels in document understanding tasks such as DocVQA and in multilingual text understanding from images, as assessed by MTVQA, establishing state-of-the-art performance.

{{< figure src="https://qianwen-res.oss-accelerate-overseas.aliyuncs.com/Qwen2-VL/qwen2-vl-7b.jpg#center" width="100%">}}

Additionally, we’re excited to introduce a smaller 2B model, optimized for potential mobile deployment. Despite its compact size, this model boasts strong performance in image, video, and multilingual comprehension. It particularly shines in video-related tasks, document understanding, and general scenario question-answering when compared to other models of similar scale.

{{< figure src="https://qianwen-res.oss-accelerate-overseas.aliyuncs.com/Qwen2-VL/qwen2-vl-2b.jpg#center" width="100%">}}



## Model Capabilities

### 1. Enhanced Recognition Capabilities

Qwen2-VL now boasts improved object recognition, extending beyond plants and landmarks to comprehend complex relationships between multiple objects in a scene. We've also significantly boosted the model's ability to recognize handwritten text and multiple languages within images, making it more accessible to users worldwide.

{{< fullwidth class="example-container" >}}
{{< example data="cases/1_3.json" hide=false next=true >}}
{{< example data="cases/1_4.json" hide=true next=true >}}
{{< example data="cases/1_6.json" hide=true next=true >}}
{{< example data="cases/1_7.json" hide=true next=true >}}
{{< example data="cases/1_1.json" hide=true next=true >}}
{{< example data="cases/1_5.json" hide=true next=true >}}
{{< /fullwidth >}}

### 2. Visual Reasoning: Solving Real-World Problems

In this iteration, we have significantly enhanced Qwen2-VL's mathematical and coding proficiencies. The model is not only capable of solving problems by analyzing pictures but can also interpret and solve complex mathematical problems through chart analysis. Extremely aspect-ratio-distorted images can also be correctly interpreted.  Additionally, we have reinforced the model's capability to extract information from real-world images and charts and improved its instruction-following skills. This fusion of visual perception and logical reasoning empowers the model to tackle practical issues, bridging the gap between abstract concepts and tangible solutions.

{{< fullwidth class="example-container" >}}
{{< example data="cases/2_2.json" hide=false next=true >}}
{{< example data="cases/2_1.json" hide=true next=true >}}
{{< example data="cases/2_3.json" hide=true next=true >}}
{{< example data="cases/2_4.json" hide=true next=true >}}
{{< example data="cases/2_5.json" hide=true next=true >}}
{{< example data="cases/2_6.json" hide=true next=true >}}
{{< example data="cases/2_7.json" hide=true next=true >}}
{{< /fullwidth >}}

### 3. Video Understanding and Live Chat

Beyond static images, Qwen2-VL extends its prowess to video content analysis. It can summarize video content, answer questions related to it, and maintain a continuous flow of conversation in real-time, offering live chat support. This functionality allows it to act as a personal assistant, helping users by providing insights and information drawn directly from video content.

{{< fullwidth class="example-container" >}}
{{< example data="cases/3_1.json" hide=false next=true >}}
{{< example data="cases/3_2.json" hide=true next=true >}}
{{< /fullwidth >}}


{{< fullwidth class="example-container" >}}
{{< example data="cases/3_3.json" hide=false next=true >}}
{{< example data="cases/3_4.json" hide=true next=true >}}
{{< /fullwidth >}}

### 4. Visual Agent Capabilities: Function Calling and Visual Interactions.

Qwen2-VL demonstrates strong potential as a visual agent, facilitating interactions similar to human perceptions of the world. 

- The model facilitates Function Calling, enabling it to harness external tools for real-time data retrieval – be it flight statuses, weather forecasts, or package tracking – by deciphering visual cues. This integration of visual interpretation with functional execution elevates its utility, making it a powerful tool for information management and decision-making.

{{< fullwidth class="example-container" >}}
{{< example data="cases/4_1.json" hide=false next=true >}}
{{< example data="cases/4_2.json" hide=true next=true >}}
{{< example data="cases/4_7.json" hide=true next=true >}}
{{< example data="cases/4_8.json" hide=true next=true >}}
{{< /fullwidth >}}

* Visual Interactions represent a significant stride towards mimicking human perception. By allowing the model to engage with visual stimuli akin to human senses, we're pushing the boundaries of AI's ability to perceive and respond to its environment. This capability paves the way for more intuitive and immersive interactions, where Qwen2-VL acts not just as an observer, but an active participant in our visual experiences.

{{< fullwidth class="example-container" >}}
{{< example data="cases/4_3.json" hide=false next=true >}}
{{< example data="cases/4_4.json" hide=true next=true >}}
{{< example data="cases/4_5.json" hide=true next=true >}}
{{< example data="cases/4_6.json" hide=true next=true >}}
{{< /fullwidth >}}

Certainly, the model is not perfect and has some limitations that I hope you can understand. For example, the model is unable to extract audio from videos, and its knowledge is only up to date as of June 2023. Additionally, the model cannot guarantee complete accuracy when processing complex instructions or scenarios, and it is relatively weak in tasks involving counting, character recognition, and 3D spatial awareness.

## Model Architecture

Overall, we've continued with the Qwen-VL architecture, which leverages a Vision Transformer (ViT) model and Qwen2 language models. For all these variants, we utilized a ViT with approximately 600M parameters, designed to handle both image and video inputs seamlessly. To further enhance the model's ability to effectively perceive and comprehend visual information in videos, we introduced several key upgrades:

* A key architectural improvement in Qwen2-VL is the implementation of **Naive Dynamic Resolution support**. Unlike its predecessor, Qwen2-VL can handle arbitrary image resolutions, mapping them into a dynamic number of visual tokens, thereby ensuring consistency between the model input and the inherent information in images. This approach more closely mimics human visual perception, allowing the model to process images of any clarity or size. 

{{< figure src="https://qianwen-res.oss-cn-beijing.aliyuncs.com/Qwen2-VL/qwen2_vl.jpg#center" width="90%">}}


* Another key architectural enhancement is the innovation of **Multimodal Rotary Position Embedding (M-ROPE)**. By deconstructing the original rotary embedding into three parts representing temporal and spatial (height and width) information，M-ROPE enables LLM to concurrently capture and integrate 1D textual, 2D visual, and 3D video positional information.

{{< figure src="https://qianwen-res.oss-cn-beijing.aliyuncs.com/Qwen2-VL/mrope.png#center" width="90%">}}


## Developing with Qwen2-VL

To use the largest Qwen2-VL model, Qwen2-VL-72B, you can access it through our official API (sign up the account and obtain the API key through [DashScope](https://dashscope.aliyun.com/)) temporarily as demonstrated below:

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

The 2B and 7B models of the Qwen2-VL series are open-sourced and accessible on Hugging Face and ModelScope. You can explore the model cards for detailed usage instructions, features, and performance metrics. Below we provide an example of the simplest usage with HF Transformers.

Make sure you install `transformers` from source by `pip install git+https://github.com/huggingface/transformers` as codes for Qwen2-VL were just merged into the main branch. If you didn't install it from source, you may encounter the following error:

```bash
KeyError: 'qwen2_vl'
```

We offer a toolkit to help you handle various types of visual input more conveniently. It supports inputs including base64, URLs, and interleaved images and videos. You can install it using the following command:

```bash
pip install qwen-vl-utils
```

Here is a code snippet for demonstration. Specifically, we recommend using flash attention 2 if possible for the sake of acceleration and memory saving. 

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

To facilitate seamless integration and use of our latest models, we support a range of tools and frameworks in the open-source ecosystem, including quantization ([AutoGPTQ](https://github.com/AutoGPTQ/AutoGPTQ), [AutoAWQ](https://github.com/casper-hansen/AutoAWQ)), deployment ([vLLM](https://github.com/vllm-project/vllm)), finetuning ([Llama-Factory](https://github.com/hiyouga/LLaMA-Factory)), etc. 

## License
Both the opensource Qwen2-VL-2B and Qwen2-VL-7B are under Apache 2.0. 

## What's Next

We look forward to your feedback and the innovative applications you will build with Qwen2-VL. In the near future, we are going to build stronger vision language models upon our next-version language models and endeavor to integrate more modalities towards an omni model! 

