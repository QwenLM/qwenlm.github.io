---
title: "GSPO：迈向持续拓展的语言模型强化学习"
date: 2025-07-27T15:00:00+08:00
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


{{< button href="https://huggingface.co/papers/2507.18071" label="PAPER" external=true >}}
{{< button href="https://discord.gg/yPEP2vHTu4" label="DISCORD" external=true >}}


## 引言

强化学习 （Reinforcement Learning，RL）已成为拓展语言模型、增强其深度推理与问题求解能力的关键技术范式。为了持续拓展 RL，首要前提是确保稳定、鲁棒的训练过程。然而，我们观察到现有的 RL 算法（如 GRPO）在长期训练中会暴露出严重的不稳定性问题并招致不可逆转的模型崩溃，阻碍了通过增加计算以获得进一步的性能提升。

为了能够持续拓展 RL，我们提出了 **Group Sequence Policy Optimization (GSPO)** 算法。不同于过去的 RL 算法，GSPO 定义了序列级别的重要性比率，并**在序列层面执行裁剪、奖励和优化**。相较于 GRPO，GSPO 在以下方面展现出突出优势：

- **强大高效**：GSPO 具备显著更高的训练效率，并且能够通过增加计算获得持续的性能提升；
- **稳定性出色**：GSPO 能够保持稳定的训练过程，并且根本地解决了混合专家（Mixture-of-Experts，MoE）模型的 RL 训练稳定性问题；
- **基础设施友好**：由于在序列层面执行优化，GSPO 原则上对精度容忍度更高，具有简化 RL 基础设施的诱人前景。

以上优点促成了最新的 Qwen3 模型（Instruct、Coder、Thinking）的卓越性能。

## 序列级别的优化目标

设 $x$ 为查询，$\pi_{\theta_\mathrm{old}}$ 为用于采样回复的策略，$\\{y_i\\}\_{i=1}^G$ 为采样得到的回复组，$\widehat{A}\_{i}$ 为各个回复的组内相对优势，$\pi_\theta$ 为需优化的当前策略。GSPO 采用以下优化目标：

{{< rawhtml >}}
$$f
\mathcal{J}_\text{GSPO} (\theta) 
=
\mathbb{E}_{ x \sim \mathcal{D},\, \{y_i\}_{i=1}^G \sim \pi_{\theta_\text{old}}( \cdot | x) }
\left[ 
\frac{1}{G} \sum_{i=1}^{G}
\min \left( s_{i}(\theta)  \widehat{A}_{i},  \, \mathrm{clip} \left( s_{i}(\theta), 1 - {\varepsilon}, 1 + {\varepsilon} \right) \widehat{A}_{i} \right) 
\right],
$$
{{< /rawhtml >}}

其中

{{< rawhtml >}}
$$
s_{i}(\theta) 
=
\left( \frac{ \pi_{\theta} (y_i | x) }{ \pi_{\theta_\text{old}} (y_i | x)} \right)^{\frac{1}{|y_i|}}
=
\exp \left( \frac{1}{|y_i|} \sum_{t=1}^{|y_i|} \log \frac{ \pi_{\theta} (y_{i,t} | x, y_{i,&lt;t}) }{ \pi_{\theta_\text{old}} (y_{i,t} | x,y_{i,&lt;t})} \right).
$$
{{< /rawhtml >}}

这里的 $s_i(\theta)$ 即为 GSPO **基于序列似然定义的重要性比率**，其中我们进行了长度归一化以降低方差并统一 $s_i(\theta)$ 的数值范围。

## 训练效率与性能

我们使用基于 Qwen3-30B-A3B-Base 微调得到的冷启动模型进行实验，并汇报其训练奖励曲线以及在 AIME'24、LiveCodeBench 和 CodeForces 等基准上的性能曲线。我们对比 GRPO 作为基线。注意 GRPO 必需采用 Routing Replay 训练策略才能正常收敛（我们将在后文讨论），而 **GSPO 则无需该策略**。

{{< figure src="results.jpg#center" title="结果">}}


从上图可见，GSPO 表现出比 GRPO **显著更高的训练效率**，即在同等计算开销下能够取得更优的性能。特别地，我们观察到 GSPO 可以**通过增加算力来获得持续的性能提升**——这正是我们所期待的算法的**可拓展性**。最终，我们成功地将 GSPO 应用于最新的 Qwen3 模型的大规模 RL 训练，进一步释放了 RL scaling 的潜能！

一个有趣的观察是，GSPO 所裁剪的 token 比例比 GRPO 要高上两个数量级（如下图所示），但却具有更高的训练效率。这进一步表明 GRPO 采用的 token 级别的优化目标是有噪和低效的，而 GSPO 的序列级别的优化目标则提供了更可靠、有效的学习信号。

{{< figure src="clipping.jpg#center" title="裁剪">}}


## 对 MoE RL 和基础设施的收益

我们发现，当采用 GRPO 算法时，MoE 模型的专家激活波动性会使得 RL 训练无法正常收敛。为了解决这一挑战，我们过去采用了**路由回放（Routing Replay）**训练策略，即缓存 $\pi_{\theta_\text{old}}$ 中激活的专家，并在计算重要性比率时在 $\pi_\theta$ 中“回放”这些路由模式。从下图可见，Routing Replay 对于 GRPO 训练 MoE 模型的正常收敛至关重要。然而，Routing Replay 的做法会产生额外的内存和通信开销，并可能限制 MoE 模型的实际可用容量。

{{< figure src="routing_replay.jpg#center" title="Routing Replay">}}

GSPO 的一大突出优势在于**彻底消除了对 Routing Replay 的依赖**。其核心洞见在于：GSPO 仅关注序列级别的似然（即 $\pi_\theta(y_i|x)$），而对个别 token 的似然（即 $\pi_\theta(y_{i,t}|x,y_{i,<t})$）不敏感。因此，其无需 Routing Replay 等对基础设施负担较大的手段，既简化和稳定了训练过程，又使得模型能够最大化地发挥容量与潜能。

此外，鉴于 GSPO 仅使用序列级别而非 token 级别的似然进行优化，直观上前者对精度差异的容忍度要高得多。因此，GSPO 使得直接使用推理引擎返回的似然进行优化成为可能，从而无需使用训练引擎进行重计算，这在 partial rollout、多轮 RL 以及训推分离框架等场景中特别有益。

## 结论

我们提出了 Group Sequence Policy Optimization (GSPO)，这是用于训练语言模型的全新 RL 算法。相较于 GRPO，GSPO 在训练稳定性、效率和性能方面展现出显著优势，并在 MoE 模型的大规模 RL 训练中表现出突出的功效。这些优点为最新 Qwen3 模型的卓越性能奠定了算法基础。以 GSPO 作为算法基石，我们将持续推动 RL scaling 的边界，并期待由此带来的智能进步。

## 引用

如果你觉得我们的工作有用，欢迎引用！

```tex
@article{gspo,
  title={Group Sequence Policy Optimization, 
  author={
    Chujie Zheng and Shixuan Liu and Mingze Li and Xiong-Hui Chen and Bowen Yu and 
    Chang Gao and Kai Dang and Yuqiong Liu and Rui Men and An Yang and Jingren Zhou and 
    Junyang Lin 
  },
  journal={arXiv preprint arXiv:2507.18071},
  year={2025}
}
```
