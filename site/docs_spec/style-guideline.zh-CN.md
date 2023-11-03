`````
ArcoDesign

# 样式指南

从形色质构字全方面深入页面细节。
`````

## 色彩

色彩对产品的视觉传达和多维度信息的承载有着很重要的影响，好的产品在色彩配置上应当清晰，准确的传达有效信息和品牌感。按照颜色类型和功能的不同，arco将色彩分为主色、中性色、功能色和遮罩色。

### 主色

主色是一个产品的代表颜色，一般与品牌色相关联。常用于主要按钮和文字、重点操作状态、高亮提醒、空状态等。arco的默认主色为#165DFF，同时根据使用场景的不同，基于主色衍生出了点击态、悬浮态等不同状态下的颜色。

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/a748591ee8ab424fb92b2d43bf40677e~tplv-uwbnlip3yd-image.image)

为尽可能贴合更多不同产品的色彩需求，arco提供了13种通用主色，并基于主色，通过动态梯度色彩算法衍生出[13套基础色板](/react/docs/palette)。同时，我们也支持用户使用[色彩配置工具](/palette/list)配置适合自己产品的色板。

### 中性色

中性色又称为无彩色系，能在产品界面中调和色彩搭配，衬托主色及其他色彩，同时有利于拉开内容层次，使用户更专注于内容。常用于文字、背景、图标、边框和分割线等元素。arco根据过往业务经验，提供了适合线条、填充和文字的中性色参考色。

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/bd2a4520b36d49d6b2f4be7f4ae7496e~tplv-uwbnlip3yd-image.image)

### 功能色

功能色的主要作用是向用户明确的传达成功、警告、错误、链接等信息和状态。arco基于用户对色彩的通用认知，提供了适合不同状态的功能色及其配套色板。

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/74b3a2095f254d21a0992c9f367f7078~tplv-uwbnlip3yd-image.image)

### 遮罩色

遮罩色常用于作为底色突出模态窗口，一般以黑色、白色为基色，配合透明度百分比使用。arco默认的遮罩色为#1D2129，透明度为60%。

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/d400ce6b21d04e1983c423622085998a~tplv-uwbnlip3yd-image.image)


## 文字

文字是重要的信息传达元素之一，它本身的视觉特性和品质影响着信息传递的质量和产品操作的效率。根据过往的产品设计经验，arco提供了通用的字体、字重、行高、段间距建议。

### 字体

用户通过文字来理解内容和完成工作，科学的字体系统应该具有良好的可读性。无衬线体更加亲和，现代，清晰便于阅读，为网页中常用的字体类型，因此arco优先使用各个系统中默认的无衬线字体。


|  | Mac OS-system   | Window-system |
| ------------- | --------------- | ----------- |
| **中文字体**      | PingFang SC | Microsoft Yahei |
| **英文字体**      | Nunito      | Nunito          |
| **数字字体**      | 常规数字： Nunito 特殊数字: Byte Number           | 常规数字： Nunito 特殊数字: Byte Number       |


同时考虑业务实际使用情况和不同平台稳定性，提供了一套备用字体。

```
@font-family: 'nunito_for_arco', 'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB',

  'Microsoft YaHei', '微软雅黑', Arial, sans-serif;
```

### 字号

文字的大小，层级，对比度等都是影响视觉可读性和阅读效率的重要因素，为保障文本的易读性，界面文字需满足以下要求：

-   最小可识别文字尺寸：12px
-   字体层级：区分文本主副层级，字号差距需保持2-4px
-   一个产品中不要有过多的字体层级，建议选择在 3-5 种之间，对于需要用户关注的文本信息可通过增加字重的方式突出

考虑arco的通用性和包容性，在字号的选择上，我们将主字号定义为14px，并提供了不同层级的字号以适配不同信息层级的展示需求。

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/db5b5a47727a464f81e4818ada13a67d~tplv-uwbnlip3yd-image.image)

### 行高

目前通用的建议中，西文的基本行高是字号的1.2倍左右。中文因为字符密实且高度一致，没有西文的上伸部（ascender）和下延部（descender）来创造行间空隙，所以一般行高需要更大，根据阅读人群划分（儿童、年轻人、老年人），可达到 1.5 至 2 倍甚至更大。arco默认的行高为1.4倍。

### 字重

同一个字体的不同字重能传达不同的信息权重和情绪。细的字体给人以细腻、轻快的感觉，而粗体则给人着重和严肃的认知。因此适合的场景使用合适的字重非常重要。多数情况下，采用 Regular 以及 Medium 的两种字体重量，分别对应代码中的 400 和 500。在英文或数字字体加粗的情况下会采用 semibold 的字体重量，对应代码中的 600。在部分特殊场景中会采用Light的字体重量，对应代码中的300。

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/68c8456911d84fe19771908d9a8a2956~tplv-uwbnlip3yd-image.image)

### 段落间距

段落文本中文字的可读性，由字号、行高和段间距的变量决定。在文字较多的内容中，段落与段落之间需要有一定的间距以保证最好的显示效果。根据 WCAG 中的 AAA 标准，段落间距至少为字体大小的 1.5 倍。正文14px字号对应段间距为21px。

## 阴影

在界面中，我们常用阴影来模拟元素之间的物理层级关系。清晰自然的阴影能帮助用户快速理解界面中元素的空间关系，更清楚的理解整理界面内容。

不同的阴影高度可以代表不同的元素层级，arco定义了四层基础的阴影高度，以适配页面中常用的元素层级。低层级元素（例如卡片等）的默认阴影可使用一级阴影，hover态等常规交互操作可以使用二级阴影，需要进行突出展示以及表示在空间上最上层的元素（例如下拉菜单、模态框等）可以使用三级和四级阴影。

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/6f3296e4825249e296b9c8ea8ca40c55~tplv-uwbnlip3yd-image.image)

## 文案样式

文案样式影响着界面中信息传达的效率和准确性，界面中文案样式应符合相应的文本规范，并保持简洁清晰和表达一致。基于中英文文案规范及过往业务经验，arco总结了中后台产品中常用的文案样式建议。

### 日期与时间

时间是界面中很常用的数据格式，arco建议使用24小时制，最大程度避免因格式不统一而带来的困惑与误解。

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/f1b932205155433f9eb455d410077fba~tplv-uwbnlip3yd-image.image)

### 通用标点符号

使用「…」作为省略号。

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/7146fda6cf3c4c148a47877e2f88c54e~tplv-uwbnlip3yd-image.image)

破折号应占两个汉字空间。

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/ab9ce77c2f64439fa06839a92fa04286~tplv-uwbnlip3yd-image.image)

使用“≤”表示“小于等于”。

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/74421766d8de4e899c79529bb39b072c~tplv-uwbnlip3yd-image.image)

点号（顿号、逗号、句号等）、结束引号、结束括号等，不能出现在一行的开头。

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/6278f43be4474ccaaf0d8c79da33f59a~tplv-uwbnlip3yd-image.image)

开始引号、开始括号、开始双书名号等，不能出现在一行的结尾。

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/41949974fe524b3f85b857c0f2d34c15~tplv-uwbnlip3yd-image.image)

### 英文标点符号

逗号、句号等标号后加需一个空格。

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/1d7acf8e004b414e9464a2c68d0e3dc3~tplv-uwbnlip3yd-image.image)

度的标志、百分号等符号前不加空格。

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/914ed5a45ad641169c10c5bb49671a40~tplv-uwbnlip3yd-image.image)

货币标志、表正负数符号等符号后不加空格。

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/cc50836f86d544bc88faa3f89bc4fe07~tplv-uwbnlip3yd-image.image)

「at」标志（电子邮件除外）、版权标识、项目符号等符号后加空格。

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/481c45515cec4a998209dcb8d21e0032~tplv-uwbnlip3yd-image.image)

括号、引号前后加空格，中间内容无空格。

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/11158319359f4c898f090049c9571b11~tplv-uwbnlip3yd-image.image)

连字符（-）将两个相关单词组合成一个单词。

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/7548a66aff31445ab08d7ec762dc88a6~tplv-uwbnlip3yd-image.image)

全角连接号（—）常表示文章中断、转折或说明。

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/6f27e138dee0457f98d3be0bd9552f96~tplv-uwbnlip3yd-image.image)

### 中英文排版规则

中英文之间需要加空格。

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/209990b4a6444f77bebe80e75afdb498~tplv-uwbnlip3yd-image.image)

中文与链接之间增加空格。

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/5e4ca3b1017541358b8259ca98c78c85~tplv-uwbnlip3yd-image.image)

使用正确的缩写。

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/66b1914dfa4447788b58c8ff8ec9835b~tplv-uwbnlip3yd-image.image)

全角标点与英文或数字之间不加空格。

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/9f9498ef4d4c478d8f751687d06dbacd~tplv-uwbnlip3yd-image.image)

遇到完整的英文句子使用半角标点。

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/3ea1667e785e4205aa819cf78c1e2df4~tplv-uwbnlip3yd-image.image)

### 数字

边界情况：若文案中含有不断变化的数字，应考虑边界情况。

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/faad3b5da3214f3faa03d812e75a2a0f~tplv-uwbnlip3yd-image.image)

汉字数字：当需要突出庄重典雅的表达效果，应使用汉字数字。

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/e8698b7b77e24d2a98512e2859879bc5~tplv-uwbnlip3yd-image.image)

数字分节：为便于阅读，四位以上的整数或小数，应该使用千分撇进行分节：整数部分每三位一组，以“,”分节,小数部分不分节。四位以内（含四位数）的整数可以不分节。

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/2ef34ebf7771429790357902d552f003~tplv-uwbnlip3yd-image.image)

数值范围：在表示数值的范围时，可采用波浪式连接号“~”或一字线连接号“—”。前后两个数值的附加符号或计量单位相同时，在不造成歧义的情况下，前一个数值的附加符号或计量单位可省略。

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/51f9f21996f4422abce9231f942c74fb~tplv-uwbnlip3yd-image.image)

中文与数字之间需要加空格，但类似于“7号线”、“3D打印”等不表达数量信息的数字无需补加空格。

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/9da0015fabf74304a89c6b21be2ba79f~tplv-uwbnlip3yd-image.image)

## 用语原则

界面中的用语应遵循5个主要原则：词汇统一、语法正确、文案精炼、通俗易懂、语言友好。

### 词汇统一

不同场景描述同一事物的词汇需要统一。

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/e427572c9c4d46728a81ca9c2364be95~tplv-uwbnlip3yd-image.image)

页面入口文案和二级页 Title 文案要相关一致，不能毫无关联。

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/bc0ca7e1e131410faefa216a95dbd35d~tplv-uwbnlip3yd-image.image)

### 语法正确

统计文案格式：数字+单位+动词/名词。

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/6af8b1a3854d47f8a5168b2727534505~tplv-uwbnlip3yd-image.image)

操作文案格式：动词+名词。

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/0aa15c6c04c84036b35e4018589f86e5~tplv-uwbnlip3yd-image.image)

### 文案精炼

精简语句，减轻用户理解负担。

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/c310d02cbec8497ebfecea334ceb9f82~tplv-uwbnlip3yd-image.image)

避免口语化。

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/dae1f41bd58f49f9a97fd3ef165ece94~tplv-uwbnlip3yd-image.image)

### 通俗易懂

报错时，告知用户原因。

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/0bad1bffa0e4473b851e1e624afbe075~tplv-uwbnlip3yd-image.image)

使用用户熟悉的语言，避免看不懂的术语。

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/6ab450468f404d6ead9328353b5806ee~tplv-uwbnlip3yd-image.image)

### 语言友好

正确使用人称代词：不使用敬称「您」和有性别歧义的代词。

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/ac3c6f0c222e4a31a4927149626c40a5~tplv-uwbnlip3yd-image.image)

默认状态下，避免使用「不要」、「不能」、「请勿」。

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/40b1de64e26445b9b04d27964870001b~tplv-uwbnlip3yd-image.image)

避免使用过于绝对的表述，会让用户觉得不适。

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/e78b11cca3f54c1caae500e34bfe3380~tplv-uwbnlip3yd-image.image)
