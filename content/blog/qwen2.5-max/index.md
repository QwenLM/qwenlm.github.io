---
title: "Qwen2.5-Max: Exploring the Intelligence of Large-scale MoE Model"
date: 2025-01-28T23:00:04+08:00
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


{{< figure src="https://qianwen-res.oss-accelerate-overseas.aliyuncs.com/Qwen2.5-max-banner.png" width="100%">}}


{{< button href="https://chat.qwenlm.ai" label="QWEN CHAT" external=true >}}
{{< button href="https://www.alibabacloud.com/help/en/model-studio/developer-reference/what-is-qwen-llm" label="API" external=true >}}
{{< button href="https://huggingface.co/spaces/Qwen/Qwen2.5-Max-Demo" label="DEMO" external=true >}}
{{< button href="https://discord.gg/yPEP2vHTu4" label="DISCORD" external=true >}}


It is widely recognized that continuously scaling both data size and model size can lead to significant improvements in model intelligence. However, the research and industry community has limited experience in effectively scaling extremely large models, whether they are dense or Mixture-of-Expert (MoE) models. Many critical details regarding this scaling process were only disclosed with the recent release of DeepSeek V3. Concurrently, we are developing Qwen2.5-Max, a large-scale MoE model that has been pretrained on over 20 trillion tokens and further post-trained with curated Supervised Fine-Tuning (SFT) and Reinforcement Learning from Human Feedback (RLHF) methodologies. Today, we are excited to share the performance results of Qwen2.5-Max and announce the availability of its [API](https://www.alibabacloud.com/help/en/model-studio/developer-reference/what-is-qwen-llm) through Alibaba Cloud. We also invite you to explore Qwen2.5-Max on [Qwen Chat](https://chat.qwenlm.ai)!


## Performance

We evaluate Qwen2.5-Max alongside leading models, whether proprietary or open-weight, across a range of benchmarks that are of significant interest to the community. These include MMLU-Pro, which tests knowledge through college-level problems, LiveCodeBench, which assesses coding capabilities, LiveBench, which comprehensively tests the general capabilities, and Arena-Hard, which approximates human preferences. Our findings include the performance scores for both base models and instruct models.

We begin by directly comparing the performance of the instruct models, which can serve for downstream applications such as chat and coding. We present the performance results of Qwen2.5-Max alongside leading state-of-the-art models, including DeepSeek V3, GPT-4o, and Claude-3.5-Sonnet.

{{< figure src="https://qianwen-res.oss-accelerate-overseas.aliyuncs.com/Qwen2.5-max-instruct.jpg" width="100%">}}

Qwen2.5-Max outperforms DeepSeek V3 in benchmarks such as Arena-Hard, LiveBench, LiveCodeBench, and GPQA-Diamond, while also demonstrating competitive results in other assessments, including MMLU-Pro.

When comparing base models, we are unable to access the proprietary models such as GPT-4o and Claude-3.5-Sonnet. Therefore, we evaluate Qwen2.5-Max against DeepSeek V3, a leading open-weight MoE model, Llama-3.1-405B, the largest open-weight dense model, and Qwen2.5-72B, which is also among the top open-weight dense models. The results of this comparison are presented below.

{{< figure src="https://qianwen-res.oss-accelerate-overseas.aliyuncs.com/Qwen2.5-Max.jpeg" width="100%">}}

Our base models have demonstrated significant advantages across most benchmarks, and we are optimistic that advancements in post-training techniques will elevate the next version of Qwen2.5-Max to new heights.


## Use Qwen2.5-Max

Now Qwen2.5-Max is available in Qwen Chat, and you can directly chat with the model, or play with artifacts, search, etc.

<video width="100%" autoplay loop muted playsinline>
    <source src="https://qianwen-res.oss-accelerate-overseas.aliyuncs.com/qwen-max.mp4" type="video/mp4">
</video>

The API of Qwen2.5-Max (whose model name is `qwen-max-2025-01-25`) is available. You can first [register an Alibaba Cloud account](https://account.alibabacloud.com/register/intl_register.htm) and activate Alibaba Cloud Model Studio service, and then navigate to the console and create an API key.

Since the APIs of Qwen are OpenAI-API compatible, we can directly follow the common practice of using OpenAI APIs. Below is an example of using Qwen2.5-Max in Python:

``` python
from openai import OpenAI
import os

client = OpenAI(
    api_key=os.getenv("API_KEY"),
    base_url="https://dashscope-intl.aliyuncs.com/compatible-mode/v1",
)

completion = client.chat.completions.create(
    model="qwen-max-2025-01-25",
    messages=[
      {'role': 'system', 'content': 'You are a helpful assistant.'},
      {'role': 'user', 'content': 'Which number is larger, 9.11 or 9.8?'}
    ]
)

print(completion.choices[0].message)
```


## Future Work

The scaling of data and model size not only showcases advancements in model intelligence but also reflects our unwavering commitment to pioneering research. We are dedicated to enhancing the thinking and reasoning capabilities of large language models through the innovative application of scaled reinforcement learning. This endeavor holds the promise of enabling our models to transcend human intelligence, unlocking the potential to explore uncharted territories of knowledge and understanding.


# Citation

Feel free to cite the following article if you find Qwen2.5 helpful.

```
@article{qwen25,
  title={Qwen2.5 technical report},
  author={Qwen Team},
  journal={arXiv preprint arXiv:2412.15115},
  year={2024}
}
```

