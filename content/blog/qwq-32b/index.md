---
title: "QwQ-32B: Embracing the Power of Reinforcement Learning"
date: 2025-03-06T00:00:04+08:00
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

{{< video src="https://qianwen-res.oss-accelerate-overseas.aliyuncs.com/QwQ.mp4" width="100%" alt="This is a demo created by QwQ-32B." autoplay=true loop=true controls=false muted=true playsinline=true >}}


{{< button href="https://chat.qwen.ai" label="QWEN CHAT" external=true >}}
{{< button href="https://huggingface.co/Qwen/QwQ-32B" label="Hugging Face" external=true >}}
{{< button href="https://modelscope.cn/models/Qwen/QwQ-32B" label="ModelScope" external=true >}}
{{< button href="https://huggingface.co/spaces/Qwen/QwQ-32B-Demo" label="DEMO" external=true >}}
{{< button href="https://discord.gg/yPEP2vHTu4" label="DISCORD" external=true >}}



Scaling Reinforcement Learning (RL) has the potential to enhance model performance beyond conventional pretraining and post-training methods. Recent studies have demonstrated that RL can significantly improve the reasoning capabilities of models. For instance, DeepSeek R1 has achieved state-of-the-art performance by integrating cold-start data and multi-stage training, enabling deep thinking and complex reasoning.

Our research explores the scalability of Reinforcement Learning (RL) and its impact on enhancing the intelligence of large language models. We are excited to introduce QwQ-32B, a model with 32 billion parameters that achieves performance comparable to DeepSeek-R1, which boasts 671 billion parameters (with 37 billion activated). This remarkable outcome underscores the effectiveness of RL when applied to robust foundation models pretrained on extensive world knowledge. Furthermore, we have integrated agent-related capabilities into the reasoning model, enabling it to think critically while utilizing tools and adapting its reasoning based on environmental feedback. These advancements not only demonstrate the transformative potential of RL but also pave the way for further innovations in the pursuit of artificial general intelligence.

QwQ-32B is open-weight in [Hugging Face](https://huggingface.co/Qwen/QwQ-32B) and [ModelScope](https://modelscope.cn/models/Qwen/QwQ-32B) under the Apache 2.0 license and is accessible via [Qwen Chat](https://chat.qwen.ai/?models=Qwen2.5-Plus).


## Performance

QwQ-32B is evaluated across a range of benchmarks designed to assess its mathematical reasoning, coding proficiency, and general problem-solving capabilities. The results below highlight QwQ-32B's performance in comparison to other leading models, including DeepSeek-R1-Distilled-Qwen-32B, DeepSeek-R1-Distilled-Llama-70B, o1-mini, and the original DeepSeek-R1.


{{< figure src="https://qianwen-res.oss-accelerate-overseas.aliyuncs.com/qwq-32b-final.jpg" width="100%">}}


## Reinforcement Learning

We began with a cold-start checkpoint and implemented a reinforcement learning (RL) scaling approach driven by outcome-based rewards. In the initial stage, we scale RL specifically for math and coding tasks. Rather than relying on traditional reward models, we utilized an accuracy verifier for math problems to ensure the correctness of final solutions and a code execution server to assess whether the generated codes successfully pass predefined test cases. As training episodes progress, performance in both domains shows continuous improvement. After the first stage, we add another stage of RL for general capabilities. It is trained with rewards from general reward model and some rule-based verifiers. We find that this stage of RL training with a small amount of steps can increase the performance of other general capabilities, such as instruction following, alignment with human preference, and agent performance, without significant performance drop in math and coding.

## Use QwQ-32B

Below are brief examples demonstrating how to use QwQ-32B via Hugging Face Transformers and Alibaba Cloud DashScope API.

```python
from transformers import AutoModelForCausalLM, AutoTokenizer

model_name = "Qwen/QwQ-32B"

model = AutoModelForCausalLM.from_pretrained(
    model_name,
    torch_dtype="auto",
    device_map="auto"
)
tokenizer = AutoTokenizer.from_pretrained(model_name)

prompt = "How many r's are in the word \"strawberry\""
messages = [
    {"role": "user", "content": prompt}
]
text = tokenizer.apply_chat_template(
    messages,
    tokenize=False,
    add_generation_prompt=True
)

model_inputs = tokenizer([text], return_tensors="pt").to(model.device)

generated_ids = model.generate(
    **model_inputs,
    max_new_tokens=32768
)
generated_ids = [
    output_ids[len(input_ids):] for input_ids, output_ids in zip(model_inputs.input_ids, generated_ids)
]

response = tokenizer.batch_decode(generated_ids, skip_special_tokens=True)[0]
print(response)
```


```python
from openai import OpenAI
import os

# Initialize OpenAI client
client = OpenAI(
    # If the environment variable is not configured, replace with your API Key: api_key="sk-xxx"
    # How to get an API Key：https://help.aliyun.com/zh/model-studio/developer-reference/get-api-key
    api_key=os.getenv("DASHSCOPE_API_KEY"),
    base_url="https://dashscope.aliyuncs.com/compatible-mode/v1"
)

reasoning_content = ""
content = ""

is_answering = False

completion = client.chat.completions.create(
    model="qwq-32b",
    messages=[
        {"role": "user", "content": "Which is larger, 9.9 or 9.11?"}
    ],
    stream=True,
    # Uncomment the following line to return token usage in the last chunk
    # stream_options={
    #     "include_usage": True
    # }
)

print("\n" + "=" * 20 + "reasoning content" + "=" * 20 + "\n")

for chunk in completion:
    # If chunk.choices is empty, print usage
    if not chunk.choices:
        print("\nUsage:")
        print(chunk.usage)
    else:
        delta = chunk.choices[0].delta
        # Print reasoning content
        if hasattr(delta, 'reasoning_content') and delta.reasoning_content is not None:
            print(delta.reasoning_content, end='', flush=True)
            reasoning_content += delta.reasoning_content
        else:
            if delta.content != "" and is_answering is False:
                print("\n" + "=" * 20 + "content" + "=" * 20 + "\n")
                is_answering = True
            # Print content
            print(delta.content, end='', flush=True)
            content += delta.content
```


## Future Work

This marks Qwen's initial step in scaling Reinforcement Learning (RL) to enhance reasoning capabilities. Through this journey, we have not only witnessed the immense potential of scaled RL but also recognized the untapped possibilities within pretrained language models. As we work towards developing the next generation of Qwen, we are confident that combining stronger foundation models with RL powered by scaled computational resources will propel us closer to achieving Artificial General Intelligence (AGI). Additionally, we are actively exploring the integration of agents with RL to enable long-horizon reasoning, aiming to unlock greater intelligence with inference time scaling.
