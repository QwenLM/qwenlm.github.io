---
title: "Qwen3: Think Deeper, Act Faster"
date: 2025-04-29T04:00:00+08:00
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





{{< figure src="https://qianwen-res.oss-accelerate-overseas.aliyuncs.com/qwen3-banner.png" width="100%" alt="Qwen3 Main Image" >}}


{{< button href="https://chat.qwen.ai" label="QWEN CHAT" external=true >}}
{{< button href="https://github.com/QwenLM/Qwen3" label="GitHub" external=true >}}
{{< button href="https://huggingface.co/collections/Qwen/qwen3-67dd247413f0e2e4f653967f" label="Hugging Face" external=true >}}
{{< button href="https://modelscope.cn/collections/Qwen3-9743180bdc6b48" label="ModelScope" external=true >}}
{{< button href="https://www.kaggle.com/models/qwen-lm/qwen-3" label="Kaggle" external=true >}}
{{< button href="https://huggingface.co/spaces/Qwen/Qwen3-Demo" label="DEMO" external=true >}}
{{< button href="https://discord.gg/yPEP2vHTu4" label="DISCORD" external=true >}}

## Introduction


Today, we are excited to announce the release of **Qwen3**, the latest addition to the Qwen family of large language models. Our flagship model, **Qwen3-235B-A22B**, achieves competitive results in benchmark evaluations of coding, math, general capabilities, etc., when compared to other top-tier models such as DeepSeek-R1, o1, o3-mini, Grok-3, and Gemini-2.5-Pro. Additionally, the small MoE model, **Qwen3-30B-A3B**, outcompetes QwQ-32B with 10 times of activated parameters, and even a tiny model like Qwen3-4B can rival the performance of Qwen2.5-72B-Instruct.

{{< figure src="https://qianwen-res.oss-cn-beijing.aliyuncs.com/Qwen3/qwen3-235a22.jpg" width="100%">}}


{{< figure src="https://qianwen-res.oss-cn-beijing.aliyuncs.com/Qwen3/qwen3-30a3.jpg" width="100%">}}

We are open-weighting two MoE models: **Qwen3-235B-A22B**, a large model with 235 billion total parameters and 22 billion activated parameters, and **Qwen3-30B-A3B**, a smaller MoE model with 30 billion total parameters and 3 billion activated parameters. Additionally, six dense models are also open-weighted, including **Qwen3-32B**, **Qwen3-14B**, **Qwen3-8B**, **Qwen3-4B**, **Qwen3-1.7B**, and **Qwen3-0.6B**, under Apache 2.0 license. 

| Models      | Layers | Heads (Q / KV) | Tie Embedding | Context Length |
|:------------|:------:|:--------------:|:-------------:|:--------------:|
| Qwen3-0.6B  | 28     | 16 / 8         | Yes           | 32K            |
| Qwen3-1.7B  | 28     | 16 / 8         | Yes           | 32K            |
| Qwen3-4B    | 36     | 32 / 8         | Yes           | 32K            |
| Qwen3-8B    | 36     | 32 / 8         | No            | 128K           |
| Qwen3-14B   | 40     | 40 / 8         | No            | 128K           |
| Qwen3-32B   | 64     | 64 / 8         | No            | 128K           |


| Models          | Layers | Heads (Q / KV) | # Experts (Total / Activated) | Context Length |
|:----------------|:------:|:--------------:|:-----------------------------:|:--------------:|
| Qwen3-30B-A3B   |   48   |     32 / 4     |            128 / 8            |      128K      |
| Qwen3-235B-A22B |   94   |     64 / 4     |            128 / 8            |      128K      |

The post-trained models, such as **Qwen3-30B-A3B**, along with their pre-trained counterparts (e.g., **Qwen3-30B-A3B-Base**), are now available on platforms like **Hugging Face**, **ModelScope**, and **Kaggle**. For deployment, we recommend using frameworks like **SGLang** and **vLLM**. For local usage, tools such as **Ollama**, **LMStudio**, **MLX**, **llama.cpp**, and **KTransformers** are highly recommended. These options ensure that users can easily integrate Qwen3 into their workflows, whether in research, development, or production environments.

We believe that the release and open-sourcing of Qwen3 will significantly advance the research and development of large foundation models. Our goal is to empower researchers, developers, and organizations around the world to build innovative solutions using these cutting-edge models.


Feel free to try Qwen3 out in Qwen Chat Web ([chat.qwen.ai](https://chat.qwen.ai)) and mobile APP!

<br><br>


## Key Features


- **Hybrid Thinking Modes**

Qwen3 models introduce a hybrid approach to problem-solving. They support two modes:

1. Thinking Mode: In this mode, the model takes time to reason step by step before delivering the final answer. This is ideal for complex problems that require deeper thought.
2. Non-Thinking Mode: Here, the model provides quick, near-instant responses, suitable for simpler questions where speed is more important than depth.

This flexibility allows users to control how much "thinking" the model performs based on the task at hand. For example, harder problems can be tackled with extended reasoning, while easier ones can be answered directly without delay. Crucially, the integration of these two modes greatly enhances the model's ability to implement stable and efficient thinking budget control. As demonstrated above, Qwen3 exhibits scalable and smooth performance improvements that are directly correlated with the computational reasoning budget allocated. This design enables users to configure task-specific budgets with greater ease, achieving a more optimal balance between cost efficiency and inference quality.

{{< figure src="https://qianwen-res.oss-accelerate.aliyuncs.com/assets/blog/qwen3/thinking_budget.png" width="100%">}}



- **Multilingual Support**

Qwen3 models are supporting **119 languages and dialects**. This extensive multilingual capability opens up new possibilities for international applications, enabling users worldwide to benefit from the power of these models.

| Language Family | Languages & Dialects |
|---|---|
| Indo-European | English, French, Portuguese, German, Romanian, Swedish, Danish, Bulgarian, Russian, Czech, Greek, Ukrainian, Spanish, Dutch, Slovak, Croatian, Polish, Lithuanian, Norwegian Bokmål, Norwegian Nynorsk, Persian, Slovenian, Gujarati, Latvian, Italian, Occitan, Nepali, Marathi, Belarusian, Serbian, Luxembourgish, Venetian, Assamese, Welsh, Silesian, Asturian, Chhattisgarhi, Awadhi, Maithili, Bhojpuri, Sindhi, Irish, Faroese, Hindi, Punjabi, Bengali, Oriya, Tajik, Eastern Yiddish, Lombard, Ligurian, Sicilian, Friulian, Sardinian, Galician, Catalan, Icelandic, Tosk Albanian, Limburgish, Dari, Afrikaans, Macedonian, Sinhala, Urdu, Magahi, Bosnian, Armenian |
| Sino-Tibetan | Chinese (Simplified Chinese, Traditional Chinese, Cantonese), Burmese |
| Afro-Asiatic | Arabic (Standard, Najdi, Levantine, Egyptian, Moroccan, Mesopotamian, Ta'izzi-Adeni, Tunisian), Hebrew, Maltese |
| Austronesian | Indonesian, Malay, Tagalog, Cebuano, Javanese, Sundanese, Minangkabau, Balinese, Banjar, Pangasinan, Iloko, Waray (Philippines)  |
| Dravidian | Tamil, Telugu, Kannada, Malayalam |
| Turkic | Turkish, North Azerbaijani, Northern Uzbek, Kazakh, Bashkir, Tatar |
| Tai-Kadai | Thai, Lao |
| Uralic | Finnish, Estonian, Hungarian |
| Austroasiatic | Vietnamese, Khmer |
| Other | Japanese, Korean, Georgian, Basque, Haitian, Papiamento, Kabuverdianu, Tok Pisin, Swahili |


- **Improved Agentic Capabilities**

We have optimized the Qwen3 models for coding and agentic capabilities, and also we have strengthened the support of MCP as well. Below we provide examples to show how Qwen3 thinks and interacts with the environment.

<video src="https://qianwen-res.oss-accelerate-overseas.aliyuncs.com/mcp.mov" controls></video>


<br><br>

## Pre-training

In terms of pretraining, the dataset for Qwen3 has been significantly expanded compared to Qwen2.5. While Qwen2.5 was pre-trained on 18 trillion tokens, Qwen3 uses nearly twice that amount, with approximately 36 trillion tokens covering 119 languages and dialects. To build this large dataset, we collected data not only from the web but also from PDF-like documents. We used Qwen2.5-VL to extract text from these documents and Qwen2.5 to improve the quality of the extracted content. To increase the amount of math and code data, we used Qwen2.5-Math and Qwen2.5-Coder to generate synthetic data. This includes textbooks, question-answer pairs, and code snippets. 

The pre-training process consists of three stages. In the first stage (S1), the model was pretrained on over 30 trillion tokens with a context length of 4K tokens. This stage provided the model with basic language skills and general knowledge. In the second stage (S2), we improved the dataset by increasing the proportion of knowledge-intensive data, such as STEM, coding, and reasoning tasks. The model was then pretrained on an additional 5 trillion tokens. In the final stage, we used high-quality long-context data to extend the context length to 32K tokens. This ensures the model can handle longer inputs effectively.


{{< figure src="https://qianwen-res.oss-accelerate-overseas.aliyuncs.com/qwen3-base.jpg" width="100%">}}


Due to advancements in model architecture, increase in training data, and more effective training methods, the overall performance of Qwen3 dense base models matches that of Qwen2.5 base models with more parameters. For instance, Qwen3-1.7B/4B/8B/14B/32B-Base performs as well as Qwen2.5-3B/7B/14B/32B/72B-Base, respectively. Notably, in areas like STEM, coding, and reasoning, Qwen3 dense base models even outperform larger Qwen2.5 models. For Qwen3-MoE base models, they achieve similar performance to Qwen2.5 dense base models while using only 10% of the active parameters. This results in significant savings in both training and inference costs.


<br><br>


## Post-training

{{< figure src="https://qianwen-res.oss-accelerate.aliyuncs.com/assets/blog/qwen3/post-training.png" width="100%">}}

To develop the hybrid model capable of both step-by-step reasoning and rapid responses, we implemented a four-stage training pipeline. This pipeline includes: (1) long chain-of-thought (CoT) cold start, (2) reasoning-based reinforcement learning (RL), (3) thinking mode fusion, and (4) general RL. 

In the first stage, we fine-tuned the models using diverse long CoT data, covering various tasks and domains such as mathematics, coding, logical reasoning, and STEM problems. This process aimed to equip the model with fundamental reasoning abilities. The second stage focused on scaling up computational resources for RL, utilizing rule-based rewards to enhance the model's exploration and exploitation capabilities.

In the third stage, we integrated non-thinking capabilities into the thinking model by fine-tuning it on a combination of long CoT data and commonly used instruction-tuning data. This data was generated by the enhanced thinking model from the second stage, ensuring a seamless blend of reasoning and quick response capabilities. Finally, in the fourth stage, we applied RL across more than 20 general-domain tasks to further strengthen the model’s general capabilities and correct undesired behaviors. These tasks included instruction following, format following, and agent capabilities, etc.


<br><br>


## Develop with Qwen3

Below is a simple guide for you to use Qwen3 on different frameworks. First of all, we provide an standard example of using Qwen3-30B-A3B in Hugging Face transformers:

```python
from modelscope import AutoModelForCausalLM, AutoTokenizer

model_name = "Qwen/Qwen3-30B-A3B"

# load the tokenizer and the model
tokenizer = AutoTokenizer.from_pretrained(model_name)
model = AutoModelForCausalLM.from_pretrained(
    model_name,
    torch_dtype="auto",
    device_map="auto"
)

# prepare the model input
prompt = "Give me a short introduction to large language model."
messages = [
    {"role": "user", "content": prompt}
]
text = tokenizer.apply_chat_template(
    messages,
    tokenize=False,
    add_generation_prompt=True,
    enable_thinking=True # Switch between thinking and non-thinking modes. Default is True.
)
model_inputs = tokenizer([text], return_tensors="pt").to(model.device)

# conduct text completion
generated_ids = model.generate(
    **model_inputs,
    max_new_tokens=32768
)
output_ids = generated_ids[0][len(model_inputs.input_ids[0]):].tolist() 

# parsing thinking content
try:
    # rindex finding 151668 (</think>)
    index = len(output_ids) - output_ids[::-1].index(151668)
except ValueError:
    index = 0

thinking_content = tokenizer.decode(output_ids[:index], skip_special_tokens=True).strip("\n")
content = tokenizer.decode(output_ids[index:], skip_special_tokens=True).strip("\n")

print("thinking content:", thinking_content)
print("content:", content)
```

To disable thinking, you just need to make changes to the argument `enable_thinking` like the following:

```python
text = tokenizer.apply_chat_template(
    messages,
    tokenize=False,
    add_generation_prompt=True,
    enable_thinking=False  # True is the default value for enable_thinking.
)
```


For deployment, you can use `sglang>=0.4.6.post1` or `vllm>=0.8.4` to create an OpenAI-compatible API endpoint:

- SGLang:
    ```shell
    python -m sglang.launch_server --model-path Qwen/Qwen3-30B-A3B --reasoning-parser qwen3
    ```

- vLLM:
    ```shell
    vllm serve Qwen/Qwen3-30B-A3B --enable-reasoning --reasoning-parser deepseek_r1
    ```

If you use it for local development, you can use ollama by running a simple command `ollama run qwen3:30b-a3b` to play with the model, or you can use LMStudio or llama.cpp and ktransformers to build locally.


### Advanced Usages

We provide a soft switch mechanism that allows users to dynamically control the model's behavior when enable_thinking=True. Specifically, you can add /think and /no_think to user prompts or system messages to switch the model's thinking mode from turn to turn. The model will follow the most recent instruction in multi-turn conversations.

Here is an example of a multi-turn conversation:

```python
from transformers import AutoModelForCausalLM, AutoTokenizer

class QwenChatbot:
    def __init__(self, model_name="Qwen/Qwen3-30B-A3B"):
        self.tokenizer = AutoTokenizer.from_pretrained(model_name)
        self.model = AutoModelForCausalLM.from_pretrained(model_name)
        self.history = []

    def generate_response(self, user_input):
        messages = self.history + [{"role": "user", "content": user_input}]

        text = self.tokenizer.apply_chat_template(
            messages,
            tokenize=False,
            add_generation_prompt=True
        )

        inputs = self.tokenizer(text, return_tensors="pt")
        response_ids = self.model.generate(**inputs, max_new_tokens=32768)[0][len(inputs.input_ids[0]):].tolist()
        response = self.tokenizer.decode(response_ids, skip_special_tokens=True)

        # Update history
        self.history.append({"role": "user", "content": user_input})
        self.history.append({"role": "assistant", "content": response})

        return response

# Example Usage
if __name__ == "__main__":
    chatbot = QwenChatbot()

    # First input (without /think or /no_think tags, thinking mode is enabled by default)
    user_input_1 = "How many r's in strawberries?"
    print(f"User: {user_input_1}")
    response_1 = chatbot.generate_response(user_input_1)
    print(f"Bot: {response_1}")
    print("----------------------")

    # Second input with /no_think
    user_input_2 = "Then, how many r's in blueberries? /no_think"
    print(f"User: {user_input_2}")
    response_2 = chatbot.generate_response(user_input_2)
    print(f"Bot: {response_2}") 
    print("----------------------")

    # Third input with /think
    user_input_3 = "Really? /think"
    print(f"User: {user_input_3}")
    response_3 = chatbot.generate_response(user_input_3)
    print(f"Bot: {response_3}")
```

### Agentic Usages

Qwen3 excels in tool calling capabilities. We recommend using [Qwen-Agent](https://github.com/QwenLM/Qwen-Agent) to make the best use of agentic ability of Qwen3. Qwen-Agent encapsulates tool-calling templates and tool-calling parsers internally, greatly reducing coding complexity.

To define the available tools, you can use the MCP configuration file, use the integrated tool of Qwen-Agent, or integrate other tools by yourself.


```python
from qwen_agent.agents import Assistant

# Define LLM
llm_cfg = {
    'model': 'Qwen3-30B-A3B',

    # Use the endpoint provided by Alibaba Model Studio:
    # 'model_type': 'qwen_dashscope',
    # 'api_key': os.getenv('DASHSCOPE_API_KEY'),

    # Use a custom endpoint compatible with OpenAI API:
    'model_server': 'http://localhost:8000/v1',  # api_base
    'api_key': 'EMPTY',

    # Other parameters:
    # 'generate_cfg': {
    #         # Add: When the response content is `<think>this is the thought</think>this is the answer;
    #         # Do not add: When the response has been separated by reasoning_content and content.
    #         'thought_in_content': True,
    #     },
}

# Define Tools
tools = [
    {'mcpServers': {  # You can specify the MCP configuration file
            'time': {
                'command': 'uvx',
                'args': ['mcp-server-time', '--local-timezone=Asia/Shanghai']
            },
            "fetch": {
                "command": "uvx",
                "args": ["mcp-server-fetch"]
            }
        }
    },
  'code_interpreter',  # Built-in tools
]

# Define Agent
bot = Assistant(llm=llm_cfg, function_list=tools)

# Streaming generation
messages = [{'role': 'user', 'content': 'https://qwenlm.github.io/blog/ Introduce the latest developments of Qwen'}]
for responses in bot.run(messages=messages):
    pass
print(responses)
```

<br><br>


## Friends of Qwen

Thanks to the support of so many friends. Qwen is nothing without its friends! We welcome more people or organizations to join our community and help us become better!

{{< figure src="https://qianwen-res.oss-accelerate-overseas.aliyuncs.com/qwen3-logo.png" width="100%">}}


<br><br>

## Future Work

Qwen3 represents a significant milestone in our journey toward Artificial General Intelligence (AGI) and Artificial Superintelligence (ASI). By scaling up both pretraining and reinforcement learning (RL), we have achieved higher levels of intelligence. We have seamlessly integrated thinking and non-thinking modes, offering users the flexibility to control the thinking budget. Additionally, we have expanded support for a wide range of languages, enhancing global accessibility.

Looking ahead, we aim to enhance our models across multiple dimensions. This includes refining model architectures and training methodologies to achieve several key objectives: scaling data, increasing model size, extending context length, broadening modalities, and advancing RL with environmental feedback for long-horizon reasoning. We believe we are transitioning from an era focused on training models to one centered on training agents. Our next iteration promises to bring meaningful advancements to everyone's work and life.



