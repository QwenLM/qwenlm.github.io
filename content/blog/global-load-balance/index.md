---
title: "Global-batch load balance almost free launch to improve your MoE LLM training"
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


# Global-batch load balance: almost free launch to improve your MoE LLM training.


## Background

The Mixture-of-Experts (MoEs) architecture has become a popular model-parameter-scale-up technique. Typically, one MoE layer consists of a router (often parameterized as one single Linear layer) and a group of experts (for transformer-based models, each expert is one feedforward layer). Given an input, only a subset of experts will be activated, and then their outputs will be aggregated based on the scores the router assigned. Specifically, 

$$
\mathbb{y}=\sum_{i\in N_E,g_i\in\operatorname{topK}}g_i(\mathbb{x})E_i(\mathbb{x})
$$

### Load Balancing loss

Load balancing loss is an essential regularization technique in training MoE-based networks, and high-level intuition encourages the balanced activation of all experts. It can be calculated as:

$$
L_{\text{balance}}=N_E \sum_{i=1}^{N_E} f_ip_i
$$

where $f_i$ is the activation frequency of the expert $E_i$, and the $p_i$ is the the average gating score that the expert $E_i$ is assigned. 

However, most existing MoE training frameworks (e.g., Megatron-core), implement **micro-batch** level balance, which means the $L_{\text{balance}}$ is calculated within every micro-batch and is then averaged on the global batch level.

Our key point is that this implementation could be problematic if one micro-batch does not contain diverse data. For instance, imagine one micro-batch only contains some code data; the aforementioned load-balancing loss still pushes the router to distribute these code tokens to all experts uniformly, potentially hurting the model performance and preventing expert specialization. 

This situation is even more common in training MoE-based LLMs: the data in one micro-batch is often from the same domain. This partially explains why most existing open-source MoE-based LLMs do not achieve notable expert specialization.

This drawback motivates us to extend the current method to the global-batch level balance.

## From micro-batch balance to global-batch balance

One easy way to calculate global-batch balance loss is to 1) Synchronize expert selection frequency $f_i$ across all parallel groups; 2) Calculate the load-balancing loss in each parallel group (e.g., one GPU); 3) Aggregate the loss across all micro-batches. 

Specifically,

$$
L_{\text{global}}=N_E\sum_{i=1}^{N_E}f_i^{\text{global}}p_i^{\text{global}}=N_E\sum_{i=1}^{n_E}f_i^{\text{global}}\cdot(\frac{1}{N_p}\sum_{j=1}^{N_p}p_j)= \frac{1}{N_P} \sum_{j=1}^{N_p}(N_E \sum_{i=1}^{N_E} \bar{f_i} \cdot P^j_i)
$$

Note that the expert selection frequency is just one expert-num-dimentional vector! It is almost free to synchronize them across micro-batches.

## Results: More Performant and Interpretable MoE

We experiment with three MoE configs (3.4B with 0.6B activated, 15B with 2.54B activated, and 43B with 6.6B activated) and two data configs (120B tokens and 400B tokens). The results are shown in the following figure and chart. 

In short, compared to the micro-batch-level loss, the global batch one achieves better performance in all settings (model, data, and tasks). More importantly, the MoE model achieves significant domain specialization with the global batch balance. In Figure (b) left, almost all experts are uniformly activated regardless of the domain. But in Figure (b) right, some experts are frequently activated by a specific domain, demonstrating their specialization.



{{< figure src="https://qianwen-res.oss-cn-beijing.aliyuncs.com/assets/balance/table_results.png#center" width="90%">}}


We further compare the model performance with balance batch size on a 3.4B with 0.6B activated model. The ptr-training PPL decreases rapidly from balance BSZ 2 to 128, and gradually saturates after 128. In the current mainstream MoE framework, even with cross expert-parallel groups communication, the balance BSZ is generally between 8 and 16 for larger models, which further reflects the significance of our method.

{{< figure src="https://qianwen-res.oss-cn-beijing.aliyuncs.com/assets/balance/different_balance_BSZ.png#center" width="70%">}}

Using global batch balance may result in a degradation in micro-batch balance, potentially affecting the computational efficiency of MoE. We further experimented with the effect of adding micro-batch balance loss on top of the global-batch balance loss (with constant weights of 0.01 of the global batch loss). It can be seen that adding local equalization improves the speed of the model (from 1.64 to 1.59 seconds per update step) while the effectiveness of the model is almost unaffected.

{{< figure src="https://qianwen-res.oss-cn-beijing.aliyuncs.com/assets/balance/efficiency.png#center" width="70%">}}


## Conclusion

In summary, we investigate the challenges associated with the LBL in training MoEs models. By introducing global-batch balance loss, we achieve improved performance and foster expert specialization within the MoE model. We believe this advancement addresses an essential limitation in existing MoE training, offering a novel perspective for MoEs model optimization.
Though mainly experimenting with language-based tasks, we hope our work could pave the way for training more substantial and specialised MoE models in various domains.

# Citation

If you find our work helpful, feel free to give us a citation.

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