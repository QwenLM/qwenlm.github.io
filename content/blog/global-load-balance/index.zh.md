---
title: "通过全局负载均衡提升混合专家模型的性能和特异化程度"
date: 2025-01-21T00:00:03+08:00
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

{{< figure src="https://qianwen-res.oss-cn-beijing.aliyuncs.com/assets/balance/main_results.png#center" width="100%">}}

{{< button href="https://github.com/QwenLM/Qwen2-Math" label="GITHUB" external=true >}}
{{< button href="https://huggingface.co/collections/Qwen/qwen25-math-66eaa240a1b7d5ee65f1da3e" label="HUGGING FACE" external=true >}}
{{< button href="https://modelscope.cn/organization/qwen" label="MODELSCOPE" external=true >}}
{{< button href="https://discord.gg/yPEP2vHTu4" label="DISCORD" external=true >}}



# 通过全局负载均衡提升混合专家模型的性能和特异化程度



## **引言**

混合专家模型（MoEs）通过路由机制动态并稀疏地激活模型参数，使得能高效地增大模型参数规模。基于 TopK 机制的稀疏激活会在训练中会遇到专家激活不均衡的问题：少数被频繁选择的专家会被优化得更多，进一步使得这些专家被更频繁地选择，最终导致只选择少数专家，造成剩余专家的冗余。因此，MoE 在训练中需要引入额外的辅助损失（load balance loss，LBL）来鼓励专家的选择趋于均衡。

目前主流 MoE 训练框架中 LBL 实现其实是局部的负载均衡，这使得模型需要将局部的输入都均匀分配给不同的专家。然而，局部的输入往往只来自个别领域，局部负载均衡会让模型将所有领域的输入都均匀分配。这种均匀分配会阻碍某些专家更多处理特定领域的数据，也即阻碍专家出现领域层次的分化特征。我们发现，将局部的负载均衡放松到全局的负载均衡，能显著增强专家的特异化并提高模型性能。

## 从局部均衡到全局均衡

LBL 的计算公式为 $N_E \sum_{i=1}^{N_E} f_ip_i$ ，其中 $N_E$ 为专家数， $f_i$ 为专家 i 被选择的频率， $p_i$ 为路由赋予专家 i 的平均分数。目前 Megatron-mcore 等主流框架中的 LBL 都是在每一张卡上统计计算后再全局平均，这使得 $f_i$ 也是在局部统计，而优化 LBL 也鼓励模型将每个局部的输入都均匀分配给所有的专家。这也解释了为什么目前大部分 MoE 工作没有观察到领域层面的专家分化。

得益于 LBL 计算的格式，我们可以通过通信不同节点的  $f_i$  来将局部的 LBL 转化为全局的 LBL。因为  $f_i$  只是一个专家数大小的向量，即使是在全局通信的情况下也不会带来明显的开销。此外由于 LBL 的计算与模型其它部分的计算相对独立，还可以用计算掩盖等策略进一步消除同步 $f_i$ 的通信开销。

## 扩大均衡的范围带来稳定的提升

我们在三种参数规模（3.4B 激活 0.6B, 15B 激活 2.54B，43B 激活 6.6B）下分别训练了 120B 和 400B tokens，对比了不同的均衡范围（Balance BSZ）对模型性能的影响。所有模型都使用了细粒度专家、共享专家及 dropless 策略（专家不会抛弃超过容量的tokens）。可以看到，将均衡范围从一般框架实现的 4，8 或者 16 增大到 128 以上后模型在 Benchmark 指标和 PPL 都有明显提升。

{{< figure src="https://qianwen-res.oss-cn-beijing.aliyuncs.com/assets/balance/table_results.png#center" width="90%">}}


我们在 3.4B 激活 0.6B 的模型训练 400B tokens 到设置上进一步对比了模型效果随着均衡范围的变化，可以看到 balance BSZ 从 2 到 128 模型的 PPL 在快速降低，在 128 后逐渐饱和。目前主流 MoE 框架中即使是进行了机内通信，对于较大的模型 balance BSZ 也一般在 8 到 16 的，这进一步体现了我们通信方法的意义。

{{< figure src="https://qianwen-res.oss-cn-beijing.aliyuncs.com/assets/balance/different_balance_BSZ.png#center" width="70%">}}


## 添加少量局部均衡损失能提高模型效率

只使用全局均衡会导致局部均衡状况有所降低，这会一定程度影响 MoE 的计算效率。我们进一步实验了在主要使用全局均衡的情况下，在训练过程中添加局部均衡（默认实现的 LBL，损失权重为全局 LBL 的 1%）限制对于模型性能和效率的影响。可以看到，添加局部均衡能提升模型的速度（每个更新步耗时从 1.64秒提升到1.59秒），同时模型的效果也几乎不受影响。

{{< figure src="https://qianwen-res.oss-cn-beijing.aliyuncs.com/assets/balance/efficiency.png#center" width="70%">}}


## 结论

我们回顾了目前 MoE 训练框架中均衡损失，发现目前的实现方式会将所有来自相同领域的局部输入都均匀分配，限制了专家的分化。通过轻量的通信将局部均衡放松为全局均衡，MoE 模型的性能和专家特异性都得到了显著的提升。我们认为这一进展解决了现有MoE训练中的一个关键问题，为MoE模型的优化提供了新的视角，并有助于构建更加可解释的模型。尽管我们的实验主要集中在基于语言的任务上，我们希望我们的工作能够为在不同领域训练更大规模、更有效的 MoE 模型提供帮助。

# 引用

如果你觉得我们的工作有用，欢迎引用！

```
@article{qiu2025demonsdetailimplementingload,
  title={Demons in the Detail: On Implementing Load Balancing Loss for Training Specialized Mixture-of-Expert Models}, 
  author={
    Zihan Qiu and Zeyu Huang and Bo Zheng and Kaiyue Wen and Zekun Wang and Rui Men and Ivan Titov and Dayiheng Liu and Jingren Zhou and Junyang Lin
  },
  journal={arXiv preprint arXiv:2501.11873},
  year={2025}
}
```