## 安装和使用

### 安装
- 使用 npm 安装

``` bash
# 安装 VChart
$ npm install @visactor/react-vchart
# 安装 @visactor/vchart-arco-theme 适配 arco 主题
$ npm install @visactor/vchart-arco-theme
```

- 使用 yarn 安装

``` bash
# 安装 VChart
$ yarn add @visactor/react-vchart
# 安装 @visactor/vchart-arco-theme 适配 arco 主题
$ yarn add @visactor/vchart-arco-theme
```

绘制图表以及更详细的指引详见[这个教程](https://visactor.io/vchart/guide/tutorial_docs/Cross-terminal_and_Developer_Ecology/react)。



### 使用

实现默认的功能，只需要在全局执行一次 initVChartArcoTheme 方法进行初始化。这个语句通常可以放在 React 项目的入口文件中。如以下示例：

```js
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './app.jsx';
import { initVChartArcoTheme } from '@visactor/vchart-arco-theme';

// initialization
initVChartArcoTheme();

const dom = document.querySelector('#root');
const root = createRoot(dom);
root.render(<App />);
```

`initVChartArcoTheme` 方法支持传入一个对象作为 option，其类型声明为：


```js
interface IInitVChartArcoThemeOption {
  /** 初始亮暗色模式 */
  defaultMode?: 'light' | 'dark';
  /** 是否监听亮暗色模式自动更改图表主题，默认为 true */
  isWatchingMode?: boolean;
  /** arco css 变量前缀，例如：原始变量名为 --color-data-1，配置为 "arco" 后变为 --arco-color-data-1 */
  prefix?: string;
  /** 指定 ThemeManager，一般不用指定，如果遇到多版本 vchart 共存时需要指定 */
  themeManager?: typeof ThemeManager;
}

```

## Token 映射

VChart 支持对图表主题的整体配置和复用。在概念上，VChart 主题主要由图表布局参数、图表样式以及数据色板组成。在图表主题的功能上，VChart 支持数据色板和语义色板的自定义配置。`@visactor/vchart-arco-theme` 基于这个特性实现了和 Arco Design 的结合。



### 数据色板

如文档 [VChart 主题概念和设计规范](https://visactor.io/vchart/guide/tutorial_docs/Theme/Theme_Concept_and_Design_Rules) 所述，VChart 数据色板也可以是动态的、渐进式的。在一般情况下，色板会根据数据项数量的范围来动态调整。数据组不超过 10 个时，采用 10 色的色板；数据组超过 10 个时，采用 20 色的色板。如果数据组超过 20 个，则会重复应用色板颜色，从第 1 个开始。

```js:react

<div style={{padding: 20}}>
  <div style={{ fontSize: 24, color: 'var(--color-text-1)', fontFamily: 'Roboto Mono', fontWeight: '700', }}>N≤10</div>

  <div style={{ gap: 12, marginTop: 12, marginBottom: 40, display: 'flex'}}>
  {
    [...new Array(10)].map((_, index) => {
      return <div key={index} style={{width: 28, height: 28, background: `var(--color-data-${(index * 2)+1})`, borderRadius: 28}} />
    })
  }
  </div>

    <div style={{ fontSize: 24, color: 'var(--color-text-1)', fontFamily: 'Roboto Mono', fontWeight: '700', }}>10≤N≤20（扩展20色）</div>

  <div style={{ gap: 12, marginTop: 12, display: 'flex'}}>
  {
    [...new Array(20)].map((_, index) => {
      return <div key={index} style={{width: 28, height: 28, background: `var(--color-data-${index+1})`, borderRadius: 28}} />
    })
  }
  </div>

</div>
```


Arco Design 为 VChart 声明了数据色板对应的 token。用户可以在 DSM 自定义主题时配置以下 token，来自定义 VChart 的数据色板。VChart 图表的数据色板会自动应用这些变量，用户则不需要介入。这个功能由 `@visactor/vchart-arco-theme` 主题包实现。

这些 token 的对应颜色组成了 VChart 在 Arco 下默认的 20 色色板。


```js:react

import { Table, Grid } from '@arco-design/web-react';

<Table
  pagination={false}
  size="small"
  border={false}
  columns={[{ title: 'index' , dataIndex: 'index', width: 100 },{ title: 'token' , dataIndex: 'token', width: 100 },{ title: 'color' , dataIndex: 'color', width: 100, render: (v, record) => {
    return <Grid.Row key={v} align="center"><div style={{width: 20, height: 20, borderRadius: 2, background: v}}></div> &nbsp; {window.getComputedStyle(document.body).getPropertyValue(record.token)}</Grid.Row>
  } }]}
  data={[...new Array(20)].map((_, index) => {
      return {
        key: index,
        index: index + 1,
        token: `--color-data-${index+1}`,
        color: `var(--color-data-${index+1})`
      }
    })}
></Table>

```

#### 语义色板

除了上文提到的 token 以外，`@visactor/vchart-arco-theme` 也会自动在页面环境爬取当前 Arco 主题的其他 token 来自动生成 VChart 图表主题。这些 token 主要用于各个图表组件的样式。具体可以参阅以下文档：

- [VChart 主题概念和设计规范](https://visactor.io/vchart/guide/tutorial_docs/Theme/Theme_Concept_and_Design_Rules)


## 联系 VChart

<img width="300" src="//lf-cdn-tos.bytescm.com/obj/static/visactor-site/output/bytedance/img/common/lark-group.jpeg"/>
