%%Content%%

## Custom Icon

When using webpack, if you want to use a custom icon, you need to use with [@svgr/webpack](https://www.npmjs.com/package/@svgr/webpack).

```js
{
  test: /\.svg$/,
  use: ['@svgr/webpack'],
}
```

Then, directly import the svg file:

```js
import IconIronMan from'./Iron Man.svg';

<IconIronMan className="arco-icon" style={{ fontSize: '50px' }} />
```

**Remember to add `className="arco-icon"` to add arco's default Icon style.

## Load Icon from iconfont.cn

`Icon.addFromIconFontCn(options)`

```js
const IconFont = Icon.addFromIconFontCn({ src:'url' });
```

This url is exported in **symbol** mode from the project on **iconfont.cn**.

The principle is to create a component that uses the `<use>` tag to render the icon.

The `options` parameters:

|Property|Description|Type|Default value|
|---|:---:|:---:|---:|
|src|[iconfont.cn](iconfont.cn) The js address generated online by the project|string|`-`|
|extraProps|Set extra properties to the `svg` tag|{ [key: string]: any }|`{}`|

## Props

### `<IconXXX>`

|Property|Description|Type|Default value|
|---|:---:|:---:|---:|
|className|The additional css class|string \| string[]|`-`|
|style|The additional css style|CSSProperties|`-`|
|spin|Whether to spin|boolean|`false`|