---
title: "Time to Speak Some Dialects, Qwen-TTS!"
date: 2025-06-27T15:01:30+08:00
weight: 1
# aliases: ["/first"]
# tags: ["Research"]
draft: false
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


{{< button href="https://help.aliyun.com/zh/model-studio/qwen-tts" label="API" external=true >}}
{{< button href="https://discord.gg/yPEP2vHTu4" label="DISCORD" external=true >}}


## Introduction


Here we introduce the latest update of **Qwen-TTS** (`qwen-tts-latest` or `qwen-tts-2025-05-22`) through [Qwen API](https://help.aliyun.com/zh/model-studio/qwen-tts) . Trained on a large-scale dataset encompassing over millions of hours of speech, Qwen-TTS achieves human-level naturalness and expressiveness. Notably, Qwen-TTS automatically adjusts prosody, pacing, and emotional inflections in response to the input text. Notably, Qwen-TTS supports the generation of 3 Chinese dialects, including Pekingese, Shanghainese, and Sichuanese.


As of now, Qwen-TTS supports 7 Chinese-English bilingual voices, including Cherry, Ethan, Chelsie, Serena, Dylan (Pekingese), Jada (Shanghainese) and Sunny (Sichuanese). More languages and stylistic options will be released in the near future.



## Samples of Chinese Dialects

Here are some samples showcase Qwen-TTS's ability to capture dialects and natural speech patterns.


<style type="text/css">
.tg  {border:none;border-collapse:collapse;border-spacing:0;}
.tg td{border-style:solid;border-width:0px;font-family:Arial, sans-serif;font-size:14px;overflow:hidden;
  padding:10px 5px;word-break:normal;}
.tg th{border-style:solid;border-width:0px;font-family:Arial, sans-serif;font-size:14px;font-weight:normal;
  overflow:hidden;padding:10px 5px;word-break:normal;}
.tg .tg-x5q1{font-size:16px;text-align:left;vertical-align:top}
.tg .tg-t0cb{background-color:#FFF;color:#1F1F1F;font-size:16px;text-align:left;vertical-align:middle}
.tg .tg-hxmt{background-color:#FFF;color:#1F1F1F;font-size:16px;text-align:left;vertical-align:top}
.tg .tg-19xi{background-color:#FFF;color:#1F1F1F;font-size:16px;font-weight:bold;text-align:center;vertical-align:middle}
</style>
<table class="tg"><thead>
  <tr>
    <th class="tg-19xi">Speaker</th>
    <th class="tg-19xi">Dialects</th>
    <th class="tg-19xi">Text</th>
    <th class="tg-19xi">Sample</th>
  </tr></thead>
<tbody>
  <tr>
    <td class="tg-t0cb" rowspan="2">Dylan</td>
    <td class="tg-t0cb" rowspan="2">Beijing</td>
    <td class="tg-t0cb">我们家那边后面有一个后山，就护城河那边，完了呢我们就在山上啊就其实也没什么，就是在土坡上跑来跑去，然后谁捡个那个嗯比较威风的棍，完了我们就呃得瞎打呃，要不就是什么掏个洞啊什么的。</td>
    <td class="tg-hxmt"><audio controls><source src="https://qianwen-res.oss-cn-beijing.aliyuncs.com/Qwen-TTS/sample/北京话-zh.wav" type="audio/wav"></audio></td>
  </tr>
  <tr>
    <td class="tg-t0cb">得有自己的想法，别净跟着别人瞎起哄，多动动脑子，有点儿结构化的思维啥的。</td>
    <td class="tg-hxmt"><audio controls><source src="https://qianwen-res.oss-cn-beijing.aliyuncs.com/Qwen-TTS/sample/北京话-zh0.wav" type="audio/wav"></audio></td>
  </tr>
  <tr>
    <td class="tg-t0cb" rowspan="2">Jada</td>
    <td class="tg-t0cb" rowspan="2">Shanghai</td>
    <td class="tg-t0cb">侬只小赤佬，啊呀，数学句子错它八道题，还想吃肯德基啊！夜到麻将队三缺一啊，嘿嘿，叫阿三头来顶嘛！哦，提前上料这样产品，还要卖300块硬币啊。</td>
    <td class="tg-hxmt"><audio controls><source src="https://qianwen-res.oss-cn-beijing.aliyuncs.com/Qwen-TTS/sample/上海话-zh.wav" type="audio/wav"></audio></td>
  </tr>
  <tr>
    <td class="tg-t0cb">侬来帮伊向暖吧，天光已经暗转亮哉。</td>
    <td class="tg-hxmt"><audio controls><source src="https://qianwen-res.oss-cn-beijing.aliyuncs.com/Qwen-TTS/sample/上海话-zh0.wav" type="audio/wav"></audio></td>
  </tr>
  <tr>
    <td class="tg-t0cb" rowspan="2">Sunny</td>
    <td class="tg-t0cb" rowspan="2">Sichuan</td>
    <td class="tg-t0cb">胖娃胖嘟嘟，骑马上成都，成都又好耍。胖娃骑白马，白马跳得高。胖娃耍关刀，关刀耍得圆。胖娃吃汤圆。</td>
    <td class="tg-hxmt"><audio controls><source src="https://qianwen-res.oss-cn-beijing.aliyuncs.com/Qwen-TTS/sample/四川话-zh.wav" type="audio/wav"></audio></td>
  </tr>
  <tr>
    <td class="tg-t0cb">他一辈子的使命就是不停地爬哟，爬到大海头上去，不管有好多远！</td>
    <td class="tg-x5q1"><audio controls><source src="https://qianwen-res.oss-cn-beijing.aliyuncs.com/Qwen-TTS/sample/四川话-zh0.wav" type="audio/wav"></audio></td>
  </tr>
</tbody></table>



## Additional Results

Qwen-TTS has demonstrated human-level performance, and metrics on the SeedTTS-Eval benchmark is shown below:

<style type="text/css">
.tg  {border:none;border-collapse:collapse;border-spacing:0;}
.tg td{border-style:solid;border-width:0px;font-family:Arial, sans-serif;font-size:14px;overflow:hidden;
  padding:10px 5px;word-break:normal;}
.tg th{border-style:solid;border-width:0px;font-family:Arial, sans-serif;font-size:14px;font-weight:normal;
  overflow:hidden;padding:10px 5px;word-break:normal;}
.tg .tg-qv16{font-size:16px;font-weight:bold;text-align:center;vertical-align:top}
.tg .tg-lvth{font-size:16px;text-align:center;vertical-align:top}
</style>
<table class="tg"><thead>
  <tr>
    <th class="tg-qv16" rowspan="2">Speaker</th>
    <th class="tg-qv16" colspan="3">WER (↓) </th>
    <th class="tg-qv16" colspan="3">SIM (↑) </th>
  </tr>
  <tr>
    <th class="tg-lvth">zh</th>
    <th class="tg-lvth">en</th>
    <th class="tg-lvth">hard</th>
    <th class="tg-lvth">zh</th>
    <th class="tg-lvth">en</th>
    <th class="tg-lvth">hard</th>
  </tr></thead>
<tbody>
  <tr>
    <td class="tg-lvth">Chelsie</td>
    <td class="tg-lvth">1.256</td>
    <td class="tg-lvth">2.004</td>
    <td class="tg-lvth">6.171</td>
    <td class="tg-lvth">0.658</td>
    <td class="tg-lvth">0.473</td>
    <td class="tg-lvth">0.662</td>
  </tr>
  <tr>
    <td class="tg-lvth">Serena</td>
    <td class="tg-lvth">1.495</td>
    <td class="tg-lvth">2.206</td>
    <td class="tg-lvth">7.394</td>
    <td class="tg-lvth">0.804</td>
    <td class="tg-lvth">0.508</td>
    <td class="tg-lvth">0.803</td>
  </tr>
  <tr>
    <td class="tg-lvth">Ethan</td>
    <td class="tg-lvth">1.489</td>
    <td class="tg-lvth">1.969</td>
    <td class="tg-lvth">6.754</td>
    <td class="tg-lvth">0.777</td>
    <td class="tg-lvth">0.558</td>
    <td class="tg-lvth">0.779</td>
  </tr>
  <tr>
    <td class="tg-lvth">Cherry</td>
    <td class="tg-lvth">1.209</td>
    <td class="tg-lvth">1.967</td>
    <td class="tg-lvth">6.069</td>
    <td class="tg-lvth">0.799</td>
    <td class="tg-lvth">0.664</td>
    <td class="tg-lvth">0.801</td>
  </tr>
</tbody></table>

Here are some Chinese-English bilingual samples for these four speakers:


<style type="text/css">
.tg  {border:none;border-collapse:collapse;border-spacing:0;}
.tg td{border-style:solid;border-width:0px;font-family:Arial, sans-serif;font-size:14px;overflow:hidden;
  padding:10px 5px;word-break:normal;}
.tg th{border-style:solid;border-width:0px;font-family:Arial, sans-serif;font-size:14px;font-weight:normal;
  overflow:hidden;padding:10px 5px;word-break:normal;}
.tg .tg-t0cb{background-color:#FFF;color:#1F1F1F;font-size:16px;text-align:left;vertical-align:middle}
.tg .tg-hxmt{background-color:#FFF;color:#1F1F1F;font-size:16px;text-align:left;vertical-align:top}
.tg .tg-19xi{background-color:#FFF;color:#1F1F1F;font-size:16px;font-weight:bold;text-align:center;vertical-align:middle}
</style>
<table class="tg"><thead>
  <tr>
    <th class="tg-19xi"><span style="font-weight:700;color:#1F1F1F;background-color:#FFF">Speaker</span></th>
    <th class="tg-19xi"><span style="font-weight:700;color:#1F1F1F;background-color:#FFF">Text</span></th>
    <th class="tg-19xi"><span style="font-weight:700;color:#1F1F1F;background-color:#FFF">Sample</span></th>
  </tr></thead>
<tbody>
  <tr>
    <td class="tg-t0cb" rowspan="2"><span style="color:#1F1F1F;background-color:#FFF">Cherry</span></td>
    <td class="tg-t0cb">对吧！我就特别喜欢这种超市，尤其是过年的时候，去逛超市就觉得超级超级开心，然后买点儿东西就要买好多好多东西，这个也想买那个也想买，然后买一堆东西带回去。</td>
    <td class="tg-hxmt"><audio controls><source src="https://qianwen-res.oss-cn-beijing.aliyuncs.com/Qwen-TTS/sample/tts_sample/Cherry_ZH.wav" type="audio/wav"></audio></td>
  </tr>
  <tr>
    <td class="tg-t0cb">Take a look at http://www.granite.ab.ca/access/email.</td>
    <td class="tg-hxmt"><audio controls><source src="https://qianwen-res.oss-cn-beijing.aliyuncs.com/Qwen-TTS/sample/tts_sample/Cherry_EN.wav" type="audio/wav"></audio></td>
  </tr>
  <tr>
    <td class="tg-t0cb" rowspan="2"><span style="color:#1F1F1F;background-color:#FFF">Ethan</span></td>
    <td class="tg-t0cb">啊？真的假的？他们俩拍吻戏。可是我觉得他们两个没有CP感欸。</td>
    <td class="tg-hxmt"><audio controls><source src="https://qianwen-res.oss-cn-beijing.aliyuncs.com/Qwen-TTS/sample/tts_sample/Ethan_ZH.wav" type="audio/wav"></audio></td>
  </tr>
  <tr>
    <td class="tg-t0cb"><span style="color:#1F1F1F;background-color:#FFF">Jane's eyes wide with terror, she screamed, "The brakes aren't working! What do we do now? We're completely trapped, and we're heading straight for that wall, I can't stop it!" Then, a strange calm washed over her as she murmured, "Well, at least the view was nice. It's almost poetic, this beautiful scene for our grand finale, isn't it?"</span></td>
    <td class="tg-hxmt"><audio controls><source src="https://qianwen-res.oss-cn-beijing.aliyuncs.com/Qwen-TTS/sample/tts_sample/Ethan_EN.wav" type="audio/wav"></audio></td>
  </tr>
  <tr>
    <td class="tg-t0cb" rowspan="2"><span style="color:#1F1F1F;background-color:#FFF">Chelsie</span></td>
    <td class="tg-t0cb">哼！还让不让人好好减肥啦，不行，你要请我一顿好的赔偿我哦。</td>
    <td class="tg-hxmt"><audio controls><source src="https://qianwen-res.oss-cn-beijing.aliyuncs.com/Qwen-TTS/sample/tts_sample/Chelsie_ZH.wav" type="audio/wav"></audio></td>
  </tr>
  <tr>
    <td class="tg-t0cb">"Oh my gosh! Are we really going to the Maldives? That’s unbelievable!" Jennie squealed.</td>
    <td class="tg-hxmt"><audio controls><source src="https://qianwen-res.oss-cn-beijing.aliyuncs.com/Qwen-TTS/sample/tts_sample/Chelsie_EN.wav" type="audio/wav"></audio></td>
  </tr>
  <tr>
    <td class="tg-t0cb" rowspan="2"><span style="color:#1F1F1F;background-color:#FFF">Serena</span></td>
    <td class="tg-t0cb">小狗，么么么么么，你快看它，它好可爱。哇，它倒立了是不是，太厉害了！好呀，我们要不要用狗粮把它拐回家，嗯？</td>
    <td class="tg-hxmt"><audio controls><source src="https://qianwen-res.oss-cn-beijing.aliyuncs.com/Qwen-TTS/sample/tts_sample/Serena_ZH.wav" type="audio/wav"></audio></td>
  </tr>
  <tr>
    <td class="tg-t0cb">You can call me directly at 4257037344 or my cell 4254447474 or send me a meeting request with all the appropriate information.</td>
    <td class="tg-hxmt"><audio controls><source src="https://qianwen-res.oss-cn-beijing.aliyuncs.com/Qwen-TTS/sample/tts_sample/Serena_EN.wav" type="audio/wav"></audio></td>
  </tr>
</tbody></table>


## How to use
Using Qwen-TTS with Qwen API is simple. We demonstrate a code snippet for you to play with it below:

```python
import os
import requests
import dashscope


def get_api_key():
    api_key = os.getenv("DASHSCOPE_API_KEY")
    if not api_key:
        raise EnvironmentError("DASHSCOPE_API_KEY environment variable not set.")
    return api_key


def synthesize_speech(text, voice="Dylan", model="qwen-tts-latest"):
    api_key = get_api_key()
    try:
        response = dashscope.audio.qwen_tts.SpeechSynthesizer.call(
            model=model,
            api_key=api_key,
            text=text,
            voice=voice,
        )
        
        # Check if response is None
        if response is None:
            raise RuntimeError("API call returned None response")
        
        # Check if response.output is None
        if response.output is None:
            raise RuntimeError("API call failed: response.output is None")
        
        # Check if response.output.audio exists
        if not hasattr(response.output, 'audio') or response.output.audio is None:
            raise RuntimeError("API call failed: response.output.audio is None or missing")
        
        audio_url = response.output.audio["url"]
        return audio_url
    except Exception as e:
        raise RuntimeError(f"Speech synthesis failed: {e}")


def download_audio(audio_url, save_path):
    try:
        resp = requests.get(audio_url, timeout=10)
        resp.raise_for_status()
        with open(save_path, 'wb') as f:
            f.write(resp.content)
        print(f"Audio file saved to: {save_path}")
    except Exception as e:
        raise RuntimeError(f"Download failed: {e}")


def main():
    text = (
        """哟，您猜怎么着？今儿个我看NBA，库里投篮跟闹着玩似的，张手就来，篮筐都得喊他“亲爹”了"""
    )
    save_path = "downloaded_audio.wav"
    try:
        audio_url = synthesize_speech(text)
        download_audio(audio_url, save_path)
    except Exception as e:
        print(e)


if __name__ == "__main__":
    main()
```


## Summary
Qwen-TTS is a text-to-speech model that supports Chinese-English bilingual synthesis and several Chinese dialects. It aims to produce natural and expressive speech, and is available via API. While it shows promising results, we look forward to further improvements and broader language support in the future.

