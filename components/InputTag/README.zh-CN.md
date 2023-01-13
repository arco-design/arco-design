`````
组件 / 输入

# InputTag

标签输入。
`````

%%Content%%

## API

### InputTag

|参数名|描述|类型|默认值|版本|
|---|---|---|---|---|
|allowClear|是否允许清除|boolean |`-`|-|
|animation|是否为内部标签变化添加动画。|boolean |`true`|2.15.0|
|autoFocus|自动聚焦|boolean |`-`|-|
|disabled|是否禁用|boolean |`-`|-|
|dragToSort|是否可以通过拖拽为 Tag 排序|boolean |`-`|2.27.0|
|error|是否是错误状态|boolean |`-`|-|
|labelInValue|设置传入和回调出的值均为 `{ label: '', value: ''}` 格式。|boolean |`-`|-|
|readOnly|是否只读|boolean |`-`|-|
|saveOnBlur|是否在失焦时自动存储正在输入的文本|boolean |`-`|2.25.0|
|inputValue|控件的输入框内的值|string |`-`|-|
|placeholder|预设文案|string |`-`|-|
|size|不同尺寸|'mini' \| 'small' \| 'default' \| 'large' |`-`|-|
|suffix|后缀|ReactNode |`-`|-|
|className|节点类名|string \| string[] |`-`|-|
|defaultValue|默认值|T[] |`-`|-|
|icon|自定义图标|{ removeIcon?: ReactNode; clearIcon?: ReactNode } |`-`|-|
|style|节点样式|CSSProperties |`-`|-|
|tokenSeparators|触发自动分词的分隔符|string[] |`-`|2.44.0|
|validate|校验函数，默认在 按下enter时候触发。|(inputValue: string, values: T[]) =&gt; boolean \| Promise&lt;boolean&gt; \| T \| Promise&lt;T&gt; |`(inputValue, values) => inputValue && values.every((item) => item !== inputValue)`|return type T and `Promise<T>` in 2.37.0|
|value|控件值|T[] |`-`|-|
|onBlur|失去焦点时候触发|(e) => void |`-`|-|
|onChange|控件值改变时触发|(value: T[], reason: [ValueChangeReason](#valuechangereason)) => void |`-`|`reason` in 2.27.0|
|onClear|点击清除按钮的回调|() => void |`-`|2.20.0|
|onClick|单击组件的回调。|(e) => void |`-`|-|
|onFocus|聚焦时触发|(e) => void |`-`|-|
|onInputChange|输入框文本改变的回调。|(inputValue: string, event?) => void |`-`|-|
|onKeyDown|键盘事件回调|(e) => void |`-`|-|
|onPaste|输入框文本粘贴的回调。|(e) => void |`-`|-|
|onPressEnter|按 enter 键触发|(e) => void |`-`|-|
|onRemove|移除某一个标签时改变时触发|(value: T, index: number, event) => void |`-`|-|
|renderTag|自定义标签渲染，`props` 为当前标签属性，`index` 为当前标签的顺序，`values` 为所有标签的值.|(props: {value: any;label: ReactNode;closable: boolean;onClose: (event) => void;},index: number,values: [ObjectValueType](#objectvaluetype)[]) => ReactNode |`-`|index、values added in 2.15.0|

### ObjectValueType

```js
export type ObjectValueType = {
  value?: any;
  label?: ReactNode;
  closable?: boolean;
};
```

### ValueChangeReason

```js
export type ValueChangeReason = "add" | "remove" | "clear" | "sort";
```
