---
title: "Notes on Qwen-Max-0428"
date: 2024-05-11T18:10:00+08:00
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

{{< button href="https://dashscope.aliyun.com" label="API" external=true >}}
{{< button href="https://huggingface.co/spaces/Qwen/Qwen-Max-0428" label="DEMO" external=true >}}
{{< button href="https://discord.gg/yPEP2vHTu4" label="DISCORD" external=true >}}

Previously, we opensourced a series of Qwen1.5 model ranging from 0.5 to 110 billion parameters. Now, we release a larger model, Qwen-Max-0428. Qwen-Max-0428 is an instruction-tuned model for chat service. Very recently, it is available via [Chatbot Arena](https://chat.lmsys.org/) and it has now become the top-10 in the leaderboard. Furthermore, our evaluation of MT-Bench also demonstrates that the new model outperforms our previous largest model Qwen1.5-110B-Chat.

{{< figure src="https://qianwen-res.oss-cn-beijing.aliyuncs.com/arena_leaderboard.jpg#center" width="100%">}}

<table>
    <tr>
        <th rowspan="1" align="center">Models</th>
        <th colspan="1" align="center">MT-Bench</th>
        <th colspan="1" align="center">Arena</th>
    </tr>
    <tr>
        <td>Qwen1.5-110B-Chat</td>
        <td align="center">8.88</td>
        <td align="center">1172</td>
    </tr>
    <tr>
        <td>Qwen-Max-0428</td>
        <td align="center">8.96</td>
        <td align="center">1186</td>
    </tr>
</table>

We provide a demo of chat service of Qwen-Max-0428 ([link](https://huggingface.co/spaces/Qwen/Qwen-Max-0428)) in Hugging Face Spaces:

<iframe
	src="https://qwen-qwen-max-0428.hf.space"
	frameborder="0"
	width="850"
	height="1000"
></iframe>

It is also accessible through the official DashScope API ([link](https://dashscope.aliyun.com)). Additionally, now the DashScope API is compatible with the OpenAI API format. Below is an example of usage:

```python
from openai import OpenAI

client = OpenAI(
    api_key="$your-dashscope-api-key",
    base_url="https://dashscope.aliyuncs.com/compatible-mode/v1"
)

completion = client.chat.completions.create(
    model="qwen-max",
    messages=[{'role': 'system', 'content': 'You are a helpful assistant.'},
              {'role': 'user', 'content': 'Tell me something about large language models.'}]
)
print(completion.choices[0].message)
```

This model is available in our web service and APP ([link](https://tongyi.aliyun.com/qianwen/), only accessible in mainland China). Enjoy!


# Citation

```
@misc{qwen1.5,
    title = {Introducing Qwen1.5},
    url = {https://qwenlm.github.io/blog/qwen1.5/},
    author = {Qwen Team},
    month = {February},
    year = {2024}
}
```