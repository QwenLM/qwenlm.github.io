---
title: "Resources"
search_hidden: true
show_bread_crumbs: false
show_code_copy_buttons: true
disable_share: true
hide_meta: true
header:
    background: "linear-gradient(to top, #a18cd1 0%, #fbc2eb 100%);"
---
## Links

In the following, we provide important links for you to refer to our opensource resources.




{{< button href="https://github.com/QwenLM/Qwen" label="GITHUB" external=true >}}
{{< button href="https://huggingface.co/Qwen" label="HUGGING FACE" external=true >}}
{{< button href="https://modelscope.cn/organization/qwen" label="MODELSCOPE" external=true >}}
{{< button href="https://dashscope.aliyun.com/" label="API" external=true >}}

## Quick Start

It is simple to use Qwen through Hugging Face Transformers. Below is a demo usage for a quick start:

```python
from transformers import AutoModelForCausalLM, AutoTokenizer
device = "cuda" # the device to load the model onto

model = AutoModelForCausalLM.from_pretrained("Qwen/Qwen2.5-7B-Instruct", device_map="auto")
tokenizer = AutoTokenizer.from_pretrained("Qwen/Qwen2.5-7B-Instruct")

prompt = "Give me a short introduction to large language model."
messages = [{"role": "user", "content": prompt}]
text = tokenizer.apply_chat_template(messages, tokenize=False, add_generation_prompt=True)
model_inputs = tokenizer([text], return_tensors="pt").to(device)

generated_ids = model.generate(model_inputs.input_ids, max_new_tokens=512, do_sample=True)
generated_ids = [output_ids[len(input_ids):] for input_ids, output_ids in zip(model_inputs.input_ids, generated_ids)]

response = tokenizer.batch_decode(generated_ids, skip_special_tokens=True)[0]
```