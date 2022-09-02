%%Content%%

## 自定义Icon

在使用webpack构建的时候，如果你想要使用自定义Icon，需要配合引入[@svgr/webpack](https://www.npmjs.com/package/@svgr/webpack)。

```js
{
  test: /\.svg$/,
  use: ['@svgr/webpack'],
}
```

然后，直接引用svg文件即可：

```js
import IconIronMan from './Iron Man.svg';

<IconIronMan className="arco-icon" style={{ fontSize: '50px' }} />
```

**记得**加上`className="arco-icon"`，会添加上 arco 的默认 Icon 样式。

## 从 iconfont.cn 加载Icon

`Icon.addFromIconFontCn(options)`

```js
const IconFont = Icon.addFromIconFontCn({ src: 'url' });
```

这个 url 是在 **iconfont.cn** 上你创建的项目或者加入的项目，**symbol** 模式导出的 url。

原理是创建了一个使用 `<use>` 标签来渲染图标的组件。

`options` 参数如下：

|参数名|描述|类型|默认值|
|---|:---:|:---:|---:|
|src|[iconfont.cn](https://www.iconfont.cn/) 项目在线生成的 js 地址|string|`-`|
|extraProps|给 `svg` 标签设置额外的属性|{ [key: string]: any }|`{}`|

## API

### `<IconXXX>`

|参数名|描述|类型|默认值|
|---|:---:|:---:|---:|
|className|节点类名|string \| string[]|`-`|
|style|节点样式|object|`{}`|
|spin|是否旋转|boolean|`false`|

