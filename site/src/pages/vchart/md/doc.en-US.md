## Installing and Using

### Installing

- npm

``` bash
# install VChart
$ npm install @visactor/react-vchart
# install @visactor/vchart-arco-theme
$ npm install @visactor/vchart-arco-theme
```

-  yarn

``` bash
$ yarn add @visactor/react-vchart
$ yarn add @visactor/vchart-arco-theme
```

The method of drawing charts and more detailed guidance can be found in [this tutorial](https://visactor.io/vchart/guide/tutorial_docs/Cross-terminal_and_Developer_Ecology/react).


### 使用

To access the default functionality, simply execute the `initVChartArcoTheme` method once globally for initialization. This statement can usually be placed in the entry file of a React project. As an example:


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

The `initVChartArcoTheme` method supports passing in an object as a parameter, whose type declaration is:

```js

interface IInitVChartArcoThemeOption {
  /** Initial light/dark mode */
  defaultMode?: 'light' | 'dark';
  /** Whether to listen for the light/dark mode switching and automatically change the chart theme. The default setting is true */
  isWatchingMode?: boolean;
  /** Arco CSS variable prefix, for example: the original variable name is --color-data-1, configured as "arco" and then changed to --arco-color-data-1 */
  prefix?: string;
  /** Specify a ThemeManager, usually not specified. If multiple versions of vchart coexist, it needs to be specified */
  themeManager?: typeof ThemeManager;
}

```


## Token mapping

VChart supports the overall configuration and reuse of chart themes. Conceptually, the VChart theme mainly consists of chart layout parameters, chart styles, and data color palettes. In terms of chart theme functions, VChart supports customized configuration of data color palettes and semantic color palettes. `@visactor/vchart-arco-theme` implements integration with Arco Design based on this feature.

### Data Palette


As described in the [document](https://visactor.io/vchart/guide/tutorial_docs/Theme/Theme_Concept_and_Design_Rules), the VChart data palette can also be dynamic and progressive. In general, the color palette will be dynamically adjusted based on the range of data item quantities. When there are no more than 10 data groups, a 10 color palette should be used; When there are more than 10 data groups, a 20 color palette is used. If there are more than 20 data groups, the palette colors will be applied repeatedly, starting from the first one.

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

    <div style={{ fontSize: 24, color: 'var(--color-text-1)', fontFamily: 'Roboto Mono', fontWeight: '700', }}>10≤N≤20(Extended 20 colors)</div>

  <div style={{ gap: 12, marginTop: 12, display: 'flex'}}>
  {
    [...new Array(20)].map((_, index) => {
      return <div key={index} style={{width: 28, height: 28, background: `var(--color-data-${index+1})`, borderRadius: 28}} />
    })
  }
  </div>

</div>
```



ArcoDesign declared the corresponding token for the data palette for VChart. Users can configure the following tokens when customizing themes in DSM to customize the data palette for VChart. The data palette of charts will automatically apply these variables, and users do not need to intervene. This feature is implemented by `@visactor/vchart-arco-theme`.


The corresponding colors of these tokens form VChart's default 20 color palette in ArcoDesign.


`@visactor/vchart-arco-theme` will automatically draw 10 colors from the 20 color palette mentioned earlier to form a 10 color palette that is compatible with small amounts of data. The current method is to take even indexed colors, which means that the default 10 color palette consists of the color values corresponding to the following tokens:

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

#### Semantic Color Palette

In addition to the tokens mentioned earlier, `@visactor/vchart-arco-theme` will also automatically crawl other tokens of the current Arco theme in the page environment to generate a VChart chart theme. These tokens are mainly used for the styles of various chart components. You can refer to the following document for details:

- [VChart Theme Concept and Design Rules](https://visactor.io/vchart/guide/tutorial_docs/Theme/Theme_Concept_and_Design_Rules)

