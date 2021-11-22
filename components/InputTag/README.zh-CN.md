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
|className|节点类名|`string \| string[]`|`-`|-|
|style|节点样式|`CSSProperties`|`-`|-|
|size|不同尺寸|`'mini' \| 'small' \| 'default' \| 'large'`|`-`|-|
|placeholder|预设文案|`string`|`-`|-|
|error|是否是错误状态|`boolean`|`-`|-|
|disabled|是否禁用|`boolean`|`-`|-|
|autoFocus|自动聚焦|`boolean`|`-`|-|
|readOnly|是否只读|`boolean`|`-`|-|
|allowClear|是否允许清除|`boolean`|`-`|-|
|animation|是否为内部标签变化添加动画。|`boolean`|`true`|2.15.0|
|saveOnBlur|是否在失焦时自动存储正在输入的文本|`boolean`|`-`|2.25.0|
|defaultValue|默认值|`T[]`|`-`|-|
|value|控件值|`T[]`|`-`|-|
|inputValue|控件的输入框内的值|`string`|`-`|-|
|labelInValue|设置传入和回调出的值均为 `{ label: '', value: ''}` 格式。|`boolean`|`-`|-|
|dragToSort|是否可以通过拖拽为 Tag 排序|`boolean`|`-`|2.27.0|
|suffix|后缀|`React.ReactNode`|`-`|-|
|icon|自定义图标|`{ removeIcon?: ReactNode; clearIcon?: ReactNode }`|`-`|-|
|validate|校验函数，默认在 按下enter时候触发。|`(inputValue: string, values: T[]) => boolean \| Promise<boolean>`|`(inputValue, values) => inputValue && values.every((item) => item !== inputValue)`|-|
|renderTag|自定义标签渲染，`props` 为当前标签属性，`index` 为当前标签的顺序，`values` 为所有标签的值.|`(props: {value: any;label: ReactNode;closable: boolean;onClose: (event) => void;},index: number,values: ObjectValueType[]) => React.ReactNode`|`-`|index、values added in 2.15.0|
|onRemove|移除某一个标签时改变时触发|`(value: T, index: number, event) => void`|`-`|-|
|onChange|控件值改变时触发|`(value: T[], reason: ValueChangeReason) => void`|`-`|`reason` in 2.27.0|
|onBlur|失去焦点时候触发|`(e) => void`|`-`|-|
|onFocus|聚焦时触发|`(e) => void`|`-`|-|
|onPressEnter|按 enter 键触发|`(e) => void`|`-`|-|
|onInputChange|输入框文本改变的回调。|`(inputValue: string, event?) => void`|`-`|-|
|onKeyDown|键盘事件回调|`(e) => void`|`-`|-|
|onPaste|输入框文本粘贴的回调。|`(e) => void`|`-`|-|
|onClear|点击清除按钮的回调|`() => void`|`-`|2.20.0|
|onClick|单击组件的回调。|`(e) => void`|`-`|-|
