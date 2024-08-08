---
title: "Introducing Qwen2-Math"
date: 2024-08-08T00:00:00+08:00
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



{{< figure src="https://qianwen-res.oss-cn-beijing.aliyuncs.com/assets/blog/qwen2-math/fig1.jpg#center" width="100%">}}

{{< button href="https://github.com/QwenLM/Qwen2-Math" label="GITHUB" external=true >}}
{{< button href="https://huggingface.co/Qwen" label="HUGGING FACE" external=true >}}
{{< button href="https://modelscope.cn/organization/qwen" label="MODELSCOPE" external=true >}}
{{< button href="https://discord.gg/yPEP2vHTu4" label="DISCORD" external=true >}}

> <div align="center">
> <b>
> 🚨 This model mainly supports English. We will release bilingual (English and Chinese) math models soon.
> </b>
> </div>

# Introduction

Over the past year, we have dedicated significant effort to researching and enhancing the reasoning capabilities of large language models, with a particular focus on their ability to solve arithmetic and mathematical problems. Today, we are delighted to introduce a series of **math-specific** large language models of our Qwen2 series,  Qwen2-Math and Qwen2-Math-Instruct-1.5B/7B/72B. Qwen2-Math is a series of specialized math language models built upon the Qwen2 LLMs, which significantly outperforms the mathematical capabilities of open-source models and even closed-source models (e.g., GPT-4o). We hope that Qwen2-Math can contribute to the community for solving complex mathematical problems.

We evaluate our math-specific models on a series of math benchmarks. The results below demonstrate that our largest math-specific model Qwen2-Math-72B-Instruct outperforms the state-of-the-art models, including GPT-4o, Claude-3.5-Sonnet, Gemini-1.5-Pro, and Llama-3.1-405B.

{{< figure src="https://qianwen-res.oss-cn-beijing.aliyuncs.com/assets/blog/qwen2-math/fig2.jpg#center" width="100%">}}


## Qwen2-Math: Base Models
The base models of Qwen2-Math are initialized with Qwen2-1.5B/7B/72B, and then pretrained on a meticulously designed Mathematics-specific Corpus. This corpus contains large-scale high-quality mathematical web texts, books, codes, exam questions, and mathematical pre-training data synthesized by Qwen2.

We evaluate our Qwen2-Math base models on three widely used English math benchmarks GSM8K, Math, and MMLU-STEM. In addition, we also evaluate three Chinese math benchmarks CMATH, GaoKao Math Cloze, and GaoKao Math QA. All evaluations are tested with few-shot chain-of-thought prompting. 

{{< figure src="https://qianwen-res.oss-cn-beijing.aliyuncs.com/assets/blog/qwen2-math/Base-Table1.png#center" width="90%">}}


## Qwen2-Math-Instruct: Instruction-Tuned Models

We first trained a math-specific reward model based on Qwen2-Math-72B. We then combined this dense reward signal with a binary signal indicating whether the model answered correctly. This combined signal is used as supervision for constructing the SFT data through Rejection Sampling and also in the reinforcement learning with Group Relative Policy Optimization (GRPO) after SFT.

We evaluate Qwen2-Math-Instruct on mathematical benchmarks in both English and Chinese. In addition to the widely-used benchmarks, such as GSM8K and Math, we also involve more exams that are much challenging to fully inspect the capabilities of Qwen2-Math-Instruct, such as OlympiadBench, CollegeMath, GaoKao, AIME2024, and AMC2023. For Chinese mathematical benchmarks, we use CMATH, Gaokao (Chinese college entrance examination 2024), and CN Middle School 24 (China High School Entrance Examination 2024).

We report greedy , Maj@8 and RM@8 performance on all benchmarks in the zero-shot setting, except for the multi-choice benchmarks (including MMLU STEM and multiple-choice problems in GaoKao and CN Middle School 24) with a 5-shot setting. Qwen2-Math-Instruct achieves the best performance among models of the same size, with RM@8 outperforming Maj@8, particularly in the 1.5B and 7B models. This demonstrates the effectiveness of our math reward model. 

{{< figure src="https://qianwen-res.oss-cn-beijing.aliyuncs.com/assets/blog/qwen2-math/Instruct-Table1.png#center" width="100%">}}

In more complex mathematical competition evaluations such as AIME 2024 and AMC 2023, Qwen2-Math-Instruct also performs well across various settings, including Greedy, Maj@64, RM@64, and RM@256.

{{< figure src="https://qianwen-res.oss-cn-beijing.aliyuncs.com/assets/blog/qwen2-math/Instruct-Table2.png#center" width="70%">}}

## Case Study

Here we list some test cases, which include some IMO math problems. From the experimental results and case study, we find that Qwen2-Math is capable of solving simple math competition problems. Feel free to click the expandable blocks to check the cases!

<details>
<summary>
Problem From IMO Shortlist 2002</summary>

**Problem**


What is the smallest positive integer $t$ such that there exist integers $x_1,x_2,\ldots,x_t$ with

$$
x^3_1+x^3_2+\,\ldots\,+x^3_t=2002^{2002},
$$


**Qwen2-Math-72B-Instruct Solution**

To determine the smallest positive integer $ t $ such that there exist integers $ x_1, x_2, \ldots, x_t $ satisfying the equation

$$
x_1^3 + x_2^3 + \cdots + x_t^3 = 2002^{2002},
$$

we start by analyzing the properties of cubes and their sums. We need to find the smallest $ t $ for which the sum of $ t $ cubes equals $ 2002^{2002} $.

First, we note that $ 2002 $ can be factored into prime factors:

$$
2002 = 2 \times 7 \times 11 \times 13.
$$

Thus,

$$
2002^{2002} = (2 \times 7 \times 11 \times 13)^{2002} = 2^{2002} \times 7^{2002} \times 11^{2002} \times 13^{2002}.
$$

Next, we consider the properties of cubes modulo 9. Cubes modulo 9 can only be congruent to $ 0, 1, $ or $ -1 $. This is because:

$$
\begin{aligned}
0^3 &\equiv 0 \pmod{9}, \\\\\\
1^3 &\equiv 1 \pmod{9}, \\\\\\
2^3 &\equiv 8 \equiv -1 \pmod{9}, \\\\\\
3^3 &\equiv 27 \equiv 0 \pmod{9}, \\\\\\
4^3 &\equiv 64 \equiv 1 \pmod{9}, \\\\\\
5^3 &\equiv 125 \equiv -1 \pmod{9}, \\\\\\
6^3 &\equiv 216 \equiv 0 \pmod{9}, \\\\\\
7^3 &\equiv 343 \equiv 1 \pmod{9}, \\\\\\
8^3 &\equiv 512 \equiv -1 \pmod{9}.
\end{aligned}
$$

Now, we need to determine $ 2002^{2002} \mod 9 $. First, we find $ 2002 \mod 9 $:

$$
2002 \div 9 = 222 \text{ remainder } 4 \quad \Rightarrow \quad 2002 \equiv 4 \pmod{9}.
$$

Thus,

$$
2002^{2002} \equiv 4^{2002} \pmod{9}.
$$

Next, we use Euler's theorem, which states that $ a^{\phi(n)} \equiv 1 \pmod{n} $ for $ \gcd(a, n) = 1 $. Here, $ \phi(9) = 6 $, so:

$$
4^6 \equiv 1 \pmod{9}.
$$

We can reduce the exponent $ 2002 \mod 6 $:

$$
2002 \div 6 = 333 \text{ remainder } 4 \quad \Rightarrow \quad 2002 \equiv 4 \pmod{6}.
$$

Thus,

$$
4^{2002} \equiv 4^4 \pmod{9}.
$$

$$
4^4 = 256.
$$

Finally, we find $ 256 \mod 9 $:

$$
256 \div 9 = 28 \text{ remainder } 4 \quad \Rightarrow \quad 256 \equiv 4 \pmod{9}.
$$

Therefore,

$$
2002^{2002} \equiv 4 \pmod{9}.
$$

We need to find the smallest $ t $ such that the sum of $ t $ cubes is congruent to 4 modulo 9. The possible sums of cubes modulo 9 are:

$$
\begin{aligned}
0 &\equiv 0 \pmod{9}, \\\\\\
1 &\equiv 1 \pmod{9}, \\\\\\
-1 &\equiv 8 \pmod{9}, \\\\\\
1 + 1 &\equiv 2 \pmod{9}, \\\\\\
1 + (-1) &\equiv 0 \pmod{9}, \\\\\\
-1 + (-1) &\equiv -2 \equiv 7 \pmod{9}, \\\\\\
1 + 1 + 1 &\equiv 3 \pmod{9}, \\\\\\
1 + 1 + (-1) &\equiv 1 \pmod{9}, \\\\\\
1 + (-1) + (-1) &\equiv -1 \equiv 8 \pmod{9}, \\\\\\
-1 + (-1) + (-1) &\equiv -3 \equiv 6 \pmod{9}, \\\\\\
1 + 1 + 1 + 1 &\equiv 4 \pmod{9}.
\end{aligned}
$$

We see that the sum of four cubes can be congruent to 4 modulo 9. Therefore, the smallest $ t $ is 4.

Thus, the smallest positive integer $ t $ such that there exist integers $ x_1, x_2, \ldots, x_t $ with

$$
x_1^3 + x_2^3 + \cdots + x_t^3 = 2002^{2002}
$$

is

$$
\boxed{4}.
$$
</details>

<details>
<summary>
Problem From IMO Shortlist 2022</summary>

**Problem**

For a positive integer $n$ we denote by $s(n)$ the sum of the digits of $n$. Let $P(x)=x^n+a_{n-1}x^{n-1}+\cdots+a_1x+a_0$ be a polynomial, where $n \geqslant 2$ and $a_i$ is a positive integer for all $ 0 \leqslant i \leqslant n-1$. Could it be the case that, for all positive integers $k$, $s(k)$ and $s(P(k))$ have the same parity?

**Qwen2-Math-72B-Instruct Solution**

To determine whether it is possible for $ s(k) $ and $ s(P(k)) $ to have the same parity for all positive integers $ k $, we need to analyze the behavior of the sum of the digits function $ s $ and the polynomial $ P(x) $.

First, recall that the sum of the digits of a number $ k $ modulo 2 is equivalent to $ k \mod 2 $. This is because the sum of the digits of $ k $ in base 10 is congruent to $ k \mod 9 $, and since $ 9 \equiv 1 \mod 2 $, the sum of the digits modulo 2 is the same as $ k \mod 2 $.

Given the polynomial $ P(x) = x^n + a_{n-1}x^{n-1} + \cdots + a_1x + a_0 $, we need to determine the parity of $ P(k) $ for any positive integer $ k $. Specifically, we need to check if $ P(k) \mod 2 $ is the same as $ k \mod 2 $.

Let's consider the polynomial modulo 2:

$$
P(x) \equiv x^n + a_{n-1}x^{n-1} + \cdots + a_1x + a_0 \mod 2.
$$

Since $ a_i $ are positive integers, $ a_i \mod 2 $ is either 0 or 1. Let $ b_i = a_i \mod 2 $. Then we can rewrite the polynomial modulo 2 as:

$$
P(x) \equiv x^n + b_{n-1}x^{n-1} + \cdots + b_1x + b_0 \mod 2.
$$

Now, we need to check the parity of $ P(k) $ for $ k \equiv 0 \mod 2 $ and $ k \equiv 1 \mod 2 $.

1. **Case 1: $ k \equiv 0 \mod 2 $**
    
    $$
    P(0) \equiv b_0 \mod 2.
    $$
    
    For $ s(P(0)) $ to have the same parity as $ s(0) $, $ b_0 $ must be 0. Therefore, $ a_0 $ must be even.
2. **Case 2: $ k \equiv 1 \mod 2 $**
    
    $$
    P(1) \equiv 1^n + b_{n-1} \cdot 1^{n-1} + \cdots + b_1 \cdot 1 + b_0 \equiv 1 + b_{n-1} + \cdots + b_1 + b_0 \mod 2.
    $$
    
    For $ s(P(1)) $ to have the same parity as $ s(1) $, $ 1 + b_{n-1} + \cdots + b_1 + b_0 $ must be odd. Since $ 1 $ is odd, the sum $ b_{n-1} + \cdots + b_1 + b_0 $ must be even.

From the above cases, we have:

- $ a_0 $ must be even.
- The sum $ b_{n-1} + \cdots + b_1 + b_0 $ must be even.

However, if $ a_0 $ is even, then $ b_0 = 0 $. This means the sum $ b_{n-1} + \cdots + b_1 $ must be even. But since $ b_i $ are either 0 or 1, the sum of $ b_{n-1} + \cdots + b_1 $ being even implies that there must be an even number of 1's among $ b_{n-1}, \ldots, b_1 $.

Now, consider the polynomial $ P(x) = x^n + 1 $. For this polynomial:

- $ a_0 = 1 $ (odd), which contradicts our requirement that $ a_0 $ must be even.
- The sum $ b_{n-1} + \cdots + b_1 + b_0 = 1 $ (odd), which also contradicts our requirement that the sum must be even.

Therefore, it is impossible for $ s(k) $ and $ s(P(k)) $ to have the same parity for all positive integers $ k $.

Thus, the final answer is:

$$
\boxed{\text{No}}
$$
</details>

<details>
<summary>
Problem From IMO 2022</summary>

**Problem**

Let $\mathbb{R}^+$ denote the set of positive real numbers. Find all functions $f: \mathbb{R}^+ \to \mathbb{R}^+$ such that for each $x \in \mathbb{R}^+$, there is exactly one $y \in \mathbb{R}^+$ satisfying

$$
xf(y)+yf(x) \leq 2
$$



**Qwen2-Math-72B-Instruct Solution**

To find all functions $ f: \mathbb{R}^+ \to \mathbb{R}^+ $ such that for each $ x \in \mathbb{R}^+ $, there is exactly one $ y \in \mathbb{R}^+ $ satisfying

$$
xf(y) + yf(x) \leq 2,
$$

we will proceed step by step.

**Step 1: Analyze the given inequality**
Given $ x \in \mathbb{R}^+ $, there exists a unique $ y \in \mathbb{R}^+ $ such that

$$
xf(y) + yf(x) \leq 2.
$$

We need to explore the implications of this condition.

**Step 2: Consider the case $ x = y $**
Substitute $ y = x $ into the inequality:

$$
xf(x) + xf(x) = 2xf(x) \leq 2.
$$

This simplifies to:

$$
xf(x) \leq 1.
$$

Thus, for all $ x \in \mathbb{R}^+ $,

$$
f(x) \leq \frac{1}{x}.
$$

**Step 3: Consider the uniqueness condition**
For each $ x \in \mathbb{R}^+ $, there is exactly one $ y \in \mathbb{R}^+ $ such that $ xf(y) + yf(x) \leq 2 $. We need to ensure that this $ y $ is unique.

**Step 4: Test the function $ f(x) = \frac{1}{x} $**
Consider the function $ f(x) = \frac{1}{x} $. Substitute $ f(x) = \frac{1}{x} $ and $ f(y) = \frac{1}{y} $ into the inequality:

$$
x \cdot \frac{1}{y} + y \cdot \frac{1}{x} = \frac{x}{y} + \frac{y}{x}.
$$

We need:

$$
\frac{x}{y} + \frac{y}{x} \leq 2.
$$

Using the AM-GM inequality, we know:

$$
\frac{x}{y} + \frac{y}{x} \geq 2.
$$

Equality holds if and only if $ \frac{x}{y} = 1 $, which implies $ x = y $.

Thus, for $ f(x) = \frac{1}{x} $, the inequality $ xf(y) + yf(x) \leq 2 $ holds if and only if $ x = y $. This satisfies the condition that there is exactly one $ y $ for each $ x $.

**Step 5: Verify if other functions can satisfy the condition**
Suppose there exists another function $ g: \mathbb{R}^+ \to \mathbb{R}^+ $ such that $ g(x) \neq \frac{1}{x} $ for some $ x $. Then, for some $ x $, $ g(x) < \frac{1}{x} $ or $ g(x) > \frac{1}{x} $.

- If $ g(x) < \frac{1}{x} $, then $ xg(y) + yg(x) $ might not satisfy the inequality for all $ y $.
- If $ g(x) > \frac{1}{x} $, then $ xg(y) + yg(x) $ might exceed 2 for some $ y $.

Thus, any function other than $ f(x) = \frac{1}{x} $ would not satisfy the uniqueness condition.

**Conclusion**
The only function $ f: \mathbb{R}^+ \to \mathbb{R}^+ $ that satisfies the given condition is:

$$
\boxed{f(x) = \frac{1}{x}}.
$$
</details>

<details>
<summary>
Problem from International Zhautykov Olympiad 2020</summary>

**Problem**

Let $Z$ be the set of all integers. Find all the function $f: Z \to Z$ such that

$$
f(4x+3y)=f(3x+y)+f(x+2y)
$$

For all integers $x,y$

**Qwen2-Math-72B-Instruct Solution**

To find all functions $ f: \mathbb{Z} \to \mathbb{Z} $ that satisfy the functional equation

$$
f(4x + 3y) = f(3x + y) + f(x + 2y)
$$

for all integers $ x $ and $ y $, we will proceed step by step.

**Step 1: Initial Substitution**

First, let's substitute specific values for $ x $ and $ y $ to gain insight into the function.

Substitution 1: $ x = 0 $

$$
f(4 \cdot 0 + 3y) = f(3 \cdot 0 + y) + f(0 + 2y)
$$

$$
f(3y) = f(y) + f(2y)
$$

Substitution 2: $ y = 0 $

$$
f(4x + 3 \cdot 0) = f(3x + 0) + f(x + 2 \cdot 0)
$$

$$
f(4x) = f(3x) + f(x)
$$

**Step 2: Exploring Further Substitutions**

We now have two equations:

1. $ f(3y) = f(y) + f(2y) $
2. $ f(4x) = f(3x) + f(x) $

Substitution 3: $ y = 1 $ in the first equation

$$
f(3 \cdot 1) = f(1) + f(2 \cdot 1)
$$

$$
f(3) = f(1) + f(2)
$$

Substitution 4: $ x = 1 $ in the second equation

$$
f(4 \cdot 1) = f(3 \cdot 1) + f(1)
$$

$$
f(4) = f(3) + f(1)
$$

**Step 3: Using the Equations to Find a Pattern**

We have:

$$
f(3) = f(1) + f(2)
$$

$$
f(4) = f(3) + f(1)
$$

Substitute $ f(3) $ from the first equation into the second equation:

$$
f(4) = (f(1) + f(2)) + f(1)
$$

$$
f(4) = 2f(1) + f(2)
$$

**Step 4: Generalizing the Function**

We hypothesize that $ f $ might be a linear function. Let's assume $ f(x) = kx $ for some integer $ k $.

*Verification*
Substitute $ f(x) = kx $ into the original functional equation:

$$
f(4x + 3y) = k(4x + 3y)
$$

$$
f(3x + y) = k(3x + y)
$$

$$
f(x + 2y) = k(x + 2y)
$$

The original equation becomes:

$$
k(4x + 3y) = k(3x + y) + k(x + 2y)
$$

$$
4kx + 3ky = 3kx + ky + kx + 2ky
$$

$$
4kx + 3ky = 4kx + 3ky
$$

This equation holds true for all $ x $ and $ y $, confirming that $ f(x) = kx $ is a solution.

**Conclusion**

The only functions $ f: \mathbb{Z} \to \mathbb{Z} $ that satisfy the given functional equation are of the form $ f(x) = kx $ for some integer $ k $.

Thus, the final answer is:

$$
\boxed{f(x) = kx \text{ for some integer } k}
$$
</details>

<details>
<summary>
Problem From Baltic Way 2023</summary>

**Problem**

Find all functions $f: \mathbb{R} \rightarrow \mathbb{R}$ such that

$$
f(f(x)+y)+xf(y)=f(xy+y)+f(x)
$$

    for reals $x, y$.

**Qwen2-Math-72B-Instruct Solution:**

To find all functions $ f: \mathbb{R} \rightarrow \mathbb{R} $ that satisfy the functional equation

$$
f(f(x) + y) + x f(y) = f(xy + y) + f(x),
$$

we will proceed step by step.

**Step 1: Initial Substitution**

First, let's substitute $ y = 0 $ into the equation:

$$
f(f(x) + 0) + x f(0) = f(x \cdot 0 + 0) + f(x).
$$

This simplifies to:

$$
f(f(x)) + x f(0) = f(0) + f(x).
$$

Rearranging terms, we get:

$$
f(f(x)) = f(x) + f(0) - x f(0).
$$

**Step 2: Analyzing the Simplified Equation**

Let $ c = f(0) $. The equation becomes:

$$
f(f(x)) = f(x) + c - x c.
$$

**Step 3: Substituting $ x = 0 $**

Next, substitute $ x = 0 $ into the original equation:

$$
f(f(0) + y) + 0 \cdot f(y) = f(0 \cdot y + y) + f(0).
$$

This simplifies to:

$$
f(c + y) = f(y) + c.
$$

**Step 4: Substituting $ y = -c $**

Substitute $ y = -c $ into the equation $ f(c + y) = f(y) + c $:

$$
f(c - c) = f(-c) + c.
$$

This simplifies to:

$$
f(0) = f(-c) + c.
$$

Since $ f(0) = c $, we have:

$$
c = f(-c) + c.
$$

Subtracting $ c $ from both sides, we get:

$$
f(-c) = 0.
$$

**Step 5: Substituting $ y = -f(x) $**

Substitute $ y = -f(x) $ into the original equation:

$$
f(f(x) - f(x)) + x f(-f(x)) = f(x(-f(x)) - f(x)) + f(x).
$$

This simplifies to:

$$
f(0) + x f(-f(x)) = f(-x f(x) - f(x)) + f(x).
$$

Since $ f(0) = c $, we have:

$$
c + x f(-f(x)) = f(-x f(x) - f(x)) + f(x).
$$

**Step 6: Considering $ f(x) = 0 $**

Assume $ f(x) = 0 $ for all $ x $. Substitute $ f(x) = 0 $ into the original equation:

$$
f(0 + y) + x f(y) = f(xy + y) + f(x).
$$

This simplifies to:

$$
f(y) + 0 = f(y) + 0,
$$

which is always true.

**Step 7: Verifying $ f(x) = x $**

Assume $ f(x) = x $. Substitute $ f(x) = x $ into the original equation:

$$
f(x + y) + x f(y) = f(xy + y) + f(x).
$$

This simplifies to:

$$
x + y + xy = xy + y + x,
$$

which is always true.

**Conclusion**

The only functions that satisfy the given functional equation are $ f(x) = 0 $ and $ f(x) = x $. Therefore, the solutions are:

$$
\boxed{f(x) = 0 \text{ or } f(x) = x}.
$$
</details>

<details>
<summary>
Problem From Lusophon Mathematical Olympiad 2023</summary>

**Problem**

A long time ago, there existed Martians with $ 3$ different colours: red, green and blue. As Mars was devastated by an intergalactic war, only $ 2$ Martians of each colours survived. In order to reconstruct the Martian population, they decided to use a machine that transforms two Martians of distinct colours into four Martians of colour different to the two initial ones. For example, if a red Martian and a blue Martian use the machine, they'll be transformed into four green Martians.

a) Is it possible that, after using that machine finitely many times, we have $ 2022 $ red Martians, $ 2022$ green Martians and $ 2022$ blue Martians?

b) Is it possible that, after using that machine finitely many times, we have $ 2021$ red Martians, $ 2022$ green Martians and $ 2023$ blue Martians?

**Qwen2-Math-72B-Instruct Solution**

Let's analyze the problem step by step.

**Part (a)**

We start with 2 red, 2 green, and 2 blue Martians. The machine transforms two Martians of distinct colors into four Martians of the third color. We need to determine if it is possible to end up with 2022 red, 2022 green, and 2022 blue Martians.

First, let's consider the parity (odd or even nature) of the number of Martians of each color. Initially, we have:

- 2 red (even)
- 2 green (even)
- 2 blue (even)

Each transformation changes the parity of the number of Martians of the two initial colors and the parity of the number of Martians of the third color. Specifically:

- If we transform 1 red and 1 green Martian, we get 4 blue Martians. This changes the parity of red and green Martians from even to odd, and the parity of blue Martians from even to odd.
- If we transform 1 red and 1 blue Martian, we get 4 green Martians. This changes the parity of red and blue Martians from even to odd, and the parity of green Martians from even to odd.
- If we transform 1 green and 1 blue Martian, we get 4 red Martians. This changes the parity of green and blue Martians from even to odd, and the parity of red Martians from even to odd.

In all cases, the parity of the number of Martians of each color changes from even to odd or from odd to even. Therefore, after any number of transformations, the parity of the number of Martians of each color will always be the same as it was initially.

Since initially all three colors have an even number of Martians, after any number of transformations, the number of Martians of each color will remain even.

Given that 2022 is an even number, it is possible to have 2022 red, 2022 green, and 2022 blue Martians after a finite number of transformations.

Thus, the answer to part (a) is:

$$
\boxed{\text{Yes}}
$$

**Part (b)**

We start again with 2 red, 2 green, and 2 blue Martians. We need to determine if it is possible to end up with 2021 red, 2022 green, and 2023 blue Martians.

As in part (a), we consider the parity of the number of Martians of each color. Initially, we have:

- 2 red (even)
- 2 green (even)
- 2 blue (even)

Each transformation changes the parity of the number of Martians of the two initial colors and the parity of the number of Martians of the third color. Therefore, after any number of transformations, the parity of the number of Martians of each color will always be the same as it was initially.

Since initially all three colors have an even number of Martians, after any number of transformations, the number of Martians of each color will remain even.

Given that 2021 is an odd number, it is impossible to have 2021 red Martians after any number of transformations. Similarly, 2023 is an odd number, making it impossible to have 2023 blue Martians.

Thus, the answer to part (b) is:

$$
\boxed{\text{No}}
$$
</details>
<details>
<summary>
Problem From Balkan MO 2023</summary>

**Problem**

Joe and Penny play a game. Initially there are $ 5000$ stones in a pile, and the two players remove stones from the pile by making a sequence of moves. On the $ k$-th move, any number of stones between $ 1$ and $ k$ inclusive may be removed. Joe makes the odd-numbered moves and Penny makes the even-numbered moves. The player who removes the very last stone is the winner. Who wins if both players play perfectly?

**Qwen2-Math-72B-Instruct Solution**

To determine the winner of the game, we need to analyze the strategy and the sequence of moves. Let's break down the problem step by step.

1. **Understanding the Game Rules:**
    
    - Initially, there are 5000 stones.
    - Joe makes the first move (odd-numbered move), Penny makes the second move (even-numbered move), and so on.
    - On the $ k $-th move, a player can remove between 1 and $ k $ stones.
    - The player who removes the last stone wins.
2. **Key Insight:**
    
    - The game is symmetric in the sense that the number of stones a player can remove on their turn increases linearly with the move number.
    - The total number of moves in the game is equal to the number of stones initially in the pile, which is 5000.
3. **Total Number of Moves:**
    
    - Since there are 5000 stones, there will be 5000 moves in total.
    - Joe makes the odd-numbered moves: 1st, 3rd, 5th, ..., 4999th.
    - Penny makes the even-numbered moves: 2nd, 4th, 6th, ..., 5000th.
4. **Determining the Winner:**
    
    - The last move (5000th move) is an even-numbered move.
    - Therefore, Penny will make the last move.
5. **Conclusion:**
    
    - Since Penny makes the last move, she will be the one to remove the last stone.
    - Hence, Penny wins the game if both players play perfectly.

Thus, the final answer is:

$$
\boxed{\text{Penny}}

$$
</details>

<details>
<summary>
Problem From Math Odyssey</summary>

**Problem**

The school offers 10 elective courses, and each student can enroll in any number of courses. The director selects $k$ students, where although each student's combination of courses is different, any two students have at least one course in common. At this point, it is found that any student outside these $k$ students cannot be classmates with these $k$ students regardless of how they enroll (having one course in common is enough to be classmates). Find the maximum number of $k$.

**Qwen2-Math-72B-Instruct Solution**

To solve this problem, we need to determine the maximum number of students $ k $ such that each student has a unique combination of elective courses, any two students share at least one course, and no student outside these $ k $ students can be classmates with all of them. This means that the set of students chosen must cover all possible courses in such a way that any new student would have to share a course with at least one of the chosen students.

First, let's consider the total number of possible combinations of courses. Since there are 10 elective courses and each student can either take or not take each course, there are $ 2^{10} = 1024 $ possible combinations of courses. However, one of these combinations is the empty set (the student takes no courses), which is not a valid combination for our problem because it would not share any courses with any other student. Therefore, there are $ 1024 - 1 = 1023 $ non-empty combinations of courses.

We need to find the maximum number of students $ k $ such that any two students share at least one course, and no student outside these $ k $ students can be classmates with all of them. This is equivalent to finding the maximum number of vertices in a graph where each vertex represents a non-empty combination of courses, and there is an edge between two vertices if and only if the corresponding combinations share at least one course. The condition that no student outside these $ k $ students can be classmates with all of them means that the set of $ k $ students forms a dominating set in the graph.

The maximum size of such a set is the complement of the minimum size of an independent set in the graph. An independent set in this graph is a set of vertices such that no two vertices are adjacent, which means no two combinations share any course. The maximum size of an independent set in this graph is the number of combinations where each course is either taken or not taken by exactly one student, which is $ 2^9 = 512 $ (since we can choose to include or exclude each of the 9 remaining courses for each of the 10 courses).

Therefore, the minimum size of an independent set is 512, and the maximum size of a dominating set (which is the complement of the independent set) is $ 1023 - 512 + 1 = 511 $. However, we need to add 1 because the empty set is not included, so the correct calculation is $ 1023 - 511 = 512 $.

Thus, the maximum number of students $ k $ is $\boxed{512}$.
</details>
<details>
<summary>
Problem from USAMO 2010</summary>

**Problem**

Let $ABC$ be a triangle with $\angle A = 90^{\circ}$. Points $D$ and $E$ lie on sides $AC$ and $AB$, respectively, such that $\angle ABD = \angle DBC$ and $\angle ACE = \angle ECB$. Segments $BD$ and $CE$ meet at $I$. Determine whether or not it is possible for segments $AB$, $AC$, $BI$, $ID$, $CI$, $IE$ to all have integer lengths.

**Qwen2-Math-72B-Instruct Solution**

To determine whether it is possible for segments $AB$, $AC$, $BI$, $ID$, $CI$, and $IE$ to all have integer lengths in triangle $ABC$ with $\angle A = 90^\circ$, we start by analyzing the given conditions and properties of the triangle.

Given:

- $\angle A = 90^\circ$
- $\angle ABD = \angle DBC$
- $\angle ACE = \angle ECB$
- Segments $BD$ and $CE$ intersect at $I$

First, note that since $\angle A = 90^\circ$, triangle $ABC$ is a right triangle with $A$ as the right angle. Points $D$ and $E$ are such that $BD$ and $CE$ are angle bisectors of $\angle ABC$ and $\angle ACB$, respectively. Therefore, $I$ is the incenter of triangle $ABC$.

**Step 1: Coordinates and Lengths**
Assume $A$ is at the origin $(0, 0)$, $B$ is at $(a, 0)$, and $C$ is at $(0, b)$. The lengths of the sides are:

- $AB = a$
- $AC = b$
- $BC = \sqrt{a^2 + b^2}$

**Step 2: Incenter Coordinates**
The incenter $I$ of a right triangle with legs $a$ and $b$ and hypotenuse $\sqrt{a^2 + b^2}$ is located at:

$$
I = \left( \frac{a}{2}, \frac{b}{2} \right)
$$

**Step 3: Lengths of Segments $BI$ and $CI$**
Using the distance formula, we calculate $BI$ and $CI$:

$$
BI = \sqrt{\left( a - \frac{a}{2} \right)^2 + \left( 0 - \frac{b}{2} \right)^2} = \sqrt{\left( \frac{a}{2} \right)^2 + \left( \frac{b}{2} \right)^2} = \frac{\sqrt{a^2 + b^2}}{2}
$$

$$
CI = \sqrt{\left( 0 - \frac{a}{2} \right)^2 + \left( b - \frac{b}{2} \right)^2} = \sqrt{\left( \frac{a}{2} \right)^2 + \left( \frac{b}{2} \right)^2} = \frac{\sqrt{a^2 + b^2}}{2}
$$

**Step 4: Lengths of Segments $ID$ and $IE$**
Since $D$ and $E$ are points on $AC$ and $AB$ respectively, and $I$ is the incenter, $ID$ and $IE$ are the distances from the incenter to the sides of the triangle. For a right triangle, these distances are given by:

$$
ID = IE = r = \frac{a + b - \sqrt{a^2 + b^2}}{2}
$$

**Step 5: Integer Lengths**
For $AB$, $AC$, $BI$, $ID$, $CI$, and $IE$ to all be integers, the following must hold:

- $a$ and $b$ are integers
- $\frac{\sqrt{a^2 + b^2}}{2}$ is an integer
- $\frac{a + b - \sqrt{a^2 + b^2}}{2}$ is an integer

**Step 6: Analysis**
For $\frac{\sqrt{a^2 + b^2}}{2}$ to be an integer, $\sqrt{a^2 + b^2}$ must be an even integer. Let $\sqrt{a^2 + b^2} = 2k$ for some integer $k$. Then:

$$
a^2 + b^2 = 4k^2
$$

For $\frac{a + b - \sqrt{a^2 + b^2}}{2}$ to be an integer, $a + b - 2k$ must be even. Since $a$ and $b$ are integers, $a + b$ must be even.

**Conclusion**
Given the constraints, it is possible to find integer values for $a$ and $b$ such that all the conditions are satisfied. For example, if $a = 3$ and $b = 4$, then:

- $AB = 3$
- $AC = 4$
- $BC = 5$
- $BI = CI = \frac{5}{2} = 2.5$ (not an integer)

Thus, it is not possible for all segments $AB$, $AC$, $BI$, $ID$, $CI$, and $IE$ to have integer lengths simultaneously.

$$
\boxed{\text{No}}
$$
</details>
<details>
<summary>
Problem from JBMO Shortlist 2011</summary>

**Problem**

Let $AD,BF$ and ${CE}$ be the altitudes of $\vartriangle ABC$. A line passing through ${D}$ and parallel to ${AB}$intersects the line ${EF}$at the point ${G}$. If ${H}$ is the orthocenter of $\vartriangle ABC$, find the angle ${\angle{CGH}}$.

**Qwen2-Math-72B-Instruct Solution**

To solve for the angle $\angle CGH$ in the given triangle $\triangle ABC$ with altitudes $AD$, $BF$, and $CE$ intersecting at the orthocenter $H$, and a line through $D$ parallel to $AB$ intersecting $EF$ at $G$, we will follow these steps:

1. **Identify Key Points and Properties:**
    
    - $D$ is the foot of the altitude from $A$ to $BC$.
    - $E$ is the foot of the altitude from $B$ to $AC$.
    - $F$ is the foot of the altitude from $C$ to $AB$.
    - $H$ is the orthocenter of $\triangle ABC$.
    - $G$ is the intersection of the line through $D$ parallel to $AB$ and the line $EF$.
2. **Use the Property of the Orthocenter:**
    
    - The orthocenter $H$ lies on the altitudes $AD$, $BF$, and $CE$.
    - The points $D$, $E$, and $F$ are collinear with $H$ on the respective altitudes.
3. **Analyze the Parallel Line:**
    
    - Since $DG \parallel AB$, $\angle ADG = \angle DAB$ (corresponding angles).
4. **Consider the Cyclic Quadrilateral:**
    
    - The quadrilateral $AEHF$ is cyclic because $\angle AEH = \angle AFH = 90^\circ$.
    - Therefore, $\angle EHF = 180^\circ - \angle EAF$.
5. **Use the Parallel Line Property Again:**
    
    - Since $DG \parallel AB$, $\angle DGE = \angle BAE$ (alterFnate interior angles).
6. **Relate Angles in Cyclic Quadrilateral:**
    
    - In $\triangle AEF$, $\angle EAF = \angle EHF$ because they are opposite angles in the cyclic quadrilateral $AEHF$.
7. **Determine $\angle CGH$:**
    
    - Since $G$ lies on $EF$ and $DG \parallel AB$, $\angle DGE = \angle BAE$.
    - $\angle BAE = \angle EAF$ (as established).
    - Therefore, $\angle DGE = \angle EAF$.
8. **Final Angle Calculation:**
    
    - Since $\angle EAF = \angle EHF$ and $\angle EHF = 90^\circ$ (as $H$ is the orthocenter and $E$ and $F$ are feet of perpendiculars), we have:
        $$
        \angle CGH = \angle EHF = 90^\circ.
        $$

Thus, the angle $\angle CGH$ is $\boxed{90^\circ}$.
</details>

## Decontamination

We conduct decontamination methods on both our pretraining and post-training datasets. Specifically, for pretraining data, we target on math datasets, including GSM8K, MATH, and remove samples that have significant overlaps with the test sets. We use exact match to remove the identical samples and further apply 13-gram deduplication (with a condition that the ratio of longest common sequence should be larger than 0.6) to remove more samples that might cause contamination. For post-training data, we remove more postitive contaminated samples that have overlaps with GSM8K, MATH, Aqua, SAT Math, OlympiadBench, College Math, AIME24, AMC23, etc. with the same filtering method.

## Summary

This time, we're releasing a new model series focused on mathematical capabilities, Qwen2-Math, built upon the Qwen2 foundation. Our flagship model, Qwen2-Math-72B-Instruct, outperforms proprietary models such as GPT-4o and Claude 3.5 in math-related tasks. Given the current limitation of English-only support, we plan to release bilingual models that support both English and Chinese shortly, with the development of multilingual models also in the pipeline. Moreover, we will continue to enhance our models' ability to solve complex and challenging mathematical problems.
