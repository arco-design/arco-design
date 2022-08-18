`````
Developer Guild

# Questions

Here is a summary of some common questions occurred when using the component library.
`````

## When `antd` and `arco-design` coexist in the project, there will be style problems.

If both `antd` and `arco-design` are used in the project, and both uses the reference method of `less`, then the `less` variables will overlay each other when compiling. You can use `css` to import styles, so that the `less` variables will not be overlaid.

## Does ArcoDesign support SSR?

Yes.

## When the popup realized by `Trigger` components, such as `Tooltip` `Popover` `Select` and other components, the position of the pop-up box is wrong, Or the popup box does not follow the scroll when scrolling.

Popup box is mounted under `body` by default. If your scroll container is not `body`, then you need to set `getPopupContainer` to mount the popup to your scrolling container. Please remember that you need to add `position: relative` to the style for the container set by `getPopupContainer`.

## Why are null and ""  in Select component regarded as a value rather than a placeholder?

`null` and `''` are regarded as a value in Select, as follows:

```js
<Select>
  <Option value={null}>未选择</Option>
  <Option value={''}>留空</Option>
  <Option value="male">男</Option>
  <Option value="female">女</Option>
</Select>
```

## When `Tooltip` and other pop-up components wrap components, the pop-up does not take effect?

Because the component needs to receive the Tooltip and other pop-up components that need to sneak events to the dom of the wrapping element, the custom component needs to process the parameters passed down from the upper layer. There are two solutions:

1. Wrap a div out of the component.

```js
<Tooltip>
  <div>
    <MyComponent />
  </div>
</Tooltip>
```

2. Deconstruct the upper props in the component to the outermost dom.

```js
<Tooltip>
  <MyComponent />
</Tooltip>

function MyComponent(props) {
   const { a,b,c, ...rest } = props;
   return <div {...rest} />
}
```

## When `Popconfirm`, `Tooltip` and `Popover` are nested, only one of them takes effect?

For example:

```js
<Popover
  // ...
>
  <Tooltip
    // ....
  >
    <Button>click</Button>
  </Tooltip>
</Popover>
```

`Tooltip` takes effect, `Popover` doesn't take effect. You can wrap a `span` tag outside `Tooltip`.

## How to replace the css class name prefix

1. Configure the `prefixCls` of the component globally via `ConfigProvider`:

```js
// In this way, the css class name prefix of all components will become byte, and the default is arco.
<ConfigProvider prefixCls="byte">
  <App />
</ConfigProvider>
```

2. Configure the `prefix` variable in less via `modifyVars`:

```diff
// webpack.config.js

module.exports = {
  rules: [{
    test: /\.less$/,
    use: [{
      loader: 'style-loader',
    }, {
      loader: 'css-loader',
    }, {
      loader: 'less-loader',
+     options: {
+       modifyVars: {
+         prefix: 'byte',
+       },
+       javascriptEnabled: true
+     },
    }],
    ...
  }],
  ...
}
```

3. Configure the `prefixCls` prefix of the dialog created by the static method through `Modal.config`:

```js
Modal.config({
   prefixCls: 'byte',
})
```

After the above three steps, the component css class name prefix and style prefix in ArcoDesign will become `byte-`.

## After Modal and Drawer are opened, the input component cannot be input?

Because the `Modal` and `Drawer` components enable `focusLock` by default, it will cause the focus to be locked in the `Modal` and `Drawer`, causing the external input component to fail to obtain the focus.
You can set `focusLock={false}` to `Drawer` and `Modal`, or use the `ConfigProvider` component global configuration `componentConfig={{ Modal: {focusLock: false} }}`.

## Popover, Tooltip, Popconfirm, Trigger Can't show popover when wrapping custom components?

Custom components need to receive attributes from Trigger/Popover/Tooltip/Popconfirm

For example:

````
   function Demo(props) {
     // Receive the properties passed in by Popover
     return <div {...props}>

     </div>
   }

   <Popover>
     <Demo />
   </Popover>
````
