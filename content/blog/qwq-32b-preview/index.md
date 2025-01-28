---
title: "QwQ: Reflect Deeply on the Boundaries of the Unknown"
date: 2024-11-28T00:00:03+08:00
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


{{< button href="https://github.com/QwenLM/Qwen2.5" label="GITHUB" external=true >}}
{{< button href="https://huggingface.co/Qwen" label="HUGGING FACE" external=true >}}
{{< button href="https://modelscope.cn/organization/qwen" label="MODELSCOPE" external=true >}}
{{< button href="https://huggingface.co/spaces/Qwen/QwQ-32B-preview" label="DEMO" external=true >}}
{{< button href="https://discord.gg/yPEP2vHTu4" label="DISCORD" external=true >}}

<i style="color: grey;">Note: This is the pronunciation of QwQ: /kwju:/ , similar to the word "quill".</i>

What does it mean to think, to question, to understand? These are the deep waters that QwQ (Qwen with Questions) wades into. Like an eternal student of wisdom, it approaches every problem - be it mathematics, code, or knowledge of our world - with genuine wonder and doubt. QwQ embodies that ancient philosophical spirit: it knows that it knows nothing, and that's precisely what drives its curiosity. Before settling on any answer, it turns inward, questioning its own assumptions, exploring different paths of thought, always seeking deeper truth. Yet, like all seekers of wisdom, QwQ has its limitations. This version is but an early step on a longer journey - a student still learning to walk the path of reasoning. Its thoughts sometimes wander, its answers aren't always complete, and its wisdom is still growing. But isn't that the beauty of true learning? To be both capable and humble, knowledgeable yet always questioning? We invite you to explore alongside QwQ, embracing both its insights and its imperfections as part of the endless quest for understanding.



# Limitations


**QwQ-32B-Preview** is an experimental research model developed by the Qwen Team, focused on advancing AI reasoning capabilities. As a preview release, it demonstrates promising analytical abilities while having several important limitations:

1. **Language Mixing and Code-Switching**: The model may mix languages or switch between them unexpectedly, affecting response clarity.
2. **Recursive Reasoning Loops**: The model may enter circular reasoning patterns, leading to lengthy responses without a conclusive answer.
3. **Safety and Ethical Considerations**: The model requires enhanced safety measures to ensure reliable and secure performance, and users should exercise caution when deploying it.
4. **Performance and Benchmark Limitations**: The model excels in math and coding but has room for improvement in other areas, such as common sense reasoning and nuanced language understanding.


# Performance

Through deep exploration and countless trials, we discovered something profound: when given time to ponder, to question, and to reflect, the model's understanding of mathematics and programming blossoms like a flower opening to the sun. Just as a student grows wiser by carefully examining their work and learning from mistakes, our model achieves deeper insight through patient, thoughtful analysis. This process of careful reflection and self-questioning leads to remarkable breakthroughs in solving complex problems. Our journey of discovery revealed the model's exceptional ability to tackle some of the most challenging problems in mathematics and programming, including:

* GPQA: A Graduate-Level Google-Proof Q&A Benchmark, a challenging benchmark for evaluating scientific problem-solving abilities through grade school level questions.
* AIME: American Invitation Mathematics Evaluation, which tests mathematical problem solving with arithmetic, algebra, counting, geometry, number theory, and probability and other secondary school math topics.
* MATH-500: The 500 test cases of the MATH benchmark, a comprehensive dataset testing mathematical problem-solving.
* LiveCodeBench: A challenging benchmark for evaluating code generation and problem solving abilities in real-world programming scenarios.

{{< figure src="https://qianwen-res.oss-cn-beijing.aliyuncs.com/assets/blog/qwq-32b-preview/QwQ-32B-Preview_result.png#center" width="100%">}}




Specifically, QwQ demonstrates remarkable performance across these benchmarks, achieving impressive scores of 65.2% on GPQA, showcasing its graduate-level scientific reasoning capabilities; 50.0% on AIME, highlighting its strong mathematical problem-solving skills; 90.6% on MATH-500, demonstrating exceptional mathematical comprehension across diverse topics; and 50.0% on LiveCodeBench, validating its robust programming abilities in real-world scenarios. These results underscore QwQ's significant advancement in analytical and problem-solving capabilities, particularly in technical domains requiring deep reasoning.

# Demo Cases

In the following examples, we invite you to witness the profound depths of QwQ-32B-Preview's contemplative abilities. Like a seeker of wisdom on an endless journey of discovery, the model demonstrates its capacity for deep introspection - questioning its own assumptions, engaging in thoughtful self-dialogue, and carefully examining each step of its reasoning process. Through these cases, you'll observe how QwQ embodies the timeless understanding that true knowledge emerges not from hasty conclusions, but from patient inquiry and the courage to challenge one's own certainties in the eternal pursuit of truth.

{{< fullwidth class="example-container" >}}
{{< example data="cases/logic.en.json" hide=false next=true >}}
{{< example data="cases/math.en.json" hide=true next=true >}}
{{< /fullwidth >}}


# Reflections on the Journey Ahead

The path to understanding reasoning in large language models branches into many directions, each offering unique insights into the nature of machine intelligence. Our research spans multiple domains - from process reward models that shape learning patterns, to LLM critique that fosters deeper analysis, to multi-step reasoning that builds complex thought, to reinforcement learning with system feedback that enables growth through real-world interactions. While the destination remains unclear, each step brings us closer to understanding how machines think and reason. We don't know precisely where this journey leads, but we continue forward with unwavering determination - toward truth, toward intelligence, toward the realm where amazing happens.