`````
组件 / 数据输入

# 上传 Upload

用户可传输文件或提交相应的内容。
`````

%%Content%%

## API

### Upload

|参数名|描述|类型|默认值|版本|
|---|---|---|---|---|
|style|节点样式|`CSSProperties`|`-`|-|
|className|节点类名|`string \| string[]`|`-`|-|
|defaultFileList|默认已上传的文件列表|`UploadItem[]`|`-`|-|
|fileList|已上传的文件列表|`UploadItem[]`|`-`|-|
|directory|文件夹上传|`boolean`|`-`|2.11.0|
|accept|接受上传的类型 [详细请参考](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file#accept)|`string`|`-`|-|
|customRequest|通过覆盖默认的上传行为，可以自定义自己的上传实现|`(options: RequestOptions) => UploadRequestReturn \| void`|`-`|-|
|listType|展示类型|`'text' \| 'picture-list' \| 'picture-card'`|`text`|-|
|showUploadList|是否展示上传文件列表。预览图标，删除图标，文件图标，重新上传图标，取消上传图标。|`boolean \| CustomIconType`|`true`|-|
|autoUpload|是否选中文件后自动上传|`boolean`|`true`|-|
|action|action|`string`|`-`|-|
|limit|限制上传数量。默认超出后会隐藏上传节点。对象类型在 `2.28.0` 支持|`number \| { maxCount: number; hideOnExceedLimit?: boolean }`|`-`|-|
|disabled|禁用|`boolean`|`-`|-|
|drag|是否拖拽上传|`boolean`|`-`|-|
|multiple|文件多选|`boolean`|`-`|-|
|tip|提示文字，listType 不同，展示会有区别|`string \| React.ReactNode`|`-`|-|
|headers|上传时使用的 headers|`object`|`-`|-|
|data|上传时的 Body 参数|`object \| ((any: any) => object)`|`-`|-|
|name|发请求时文件内容的参数名|`string \| ((any: any) => string)`|`-`|-|
|withCredentials|上传请求是否携带 cookie|`boolean`|`-`|-|
|progressProps|进度条属性，接收所有进度条的 props。|`Partial<ProgressProps>`|`-`|-|
|renderUploadItem|自定义上传列表项|`(originNode: ReactNode, file: UploadItem, fileList: UploadItem[]) => ReactNode`|`-`|-|
|renderUploadList|自定义展示上传文件列表|`(fileList: UploadItem[], uploadListProps: UploadListProps) => ReactNode`|`-`|-|
|onChange|上传文件改变时的回调。文件开始上传，失败，成功时会触发。注意：如果需要实时获取文件的上传进度，请在 `onProgress` 中处理。|`(fileList: UploadItem[], file: UploadItem) => void`|`-`|-|
|onPreview|点击预览时候的回调|`(file: UploadItem) => void`|`-`|-|
|onRemove|点击删除文件时的回调。返回 `false` 或者 `Promise.reject` 的时候不会执行删除。|`(file: UploadItem, fileList: UploadItem[]) => void`|`-`|-|
|onProgress|文件上传进度的回调|`(file: UploadItem, e?: ProgressEvent) => void`|`-`|-|
|onReupload|文件重新上传时触发的回调|`(file: UploadItem) => void`|`-`|-|
|onExceedLimit|超出上传数量限制时触发|`(files: File[], fileList: UploadItem[]) => void`|`-`|-|
|beforeUpload|上传文件之前的回调。返回 false 或者 promise抛出异常的时候会取消上传。|`(file: File, filesList: File[]) => boolean \| Promise<any>`|`() => true`|-|
|onDrop|拖拽上传文件时执行的回调|`(e: React.DragEvent) => void`|`-`|2.37.0|

### UploadListProps

文件上传列表展示

|参数名|描述|类型|默认值|
|---|---|---|---|
|onAbort|中止文件上传的回调|`(file: UploadItem) => void`|`-`|
|onRemove|点击删除文件时的回调。返回 false 或者 Promise.reject 的时候不会执行删除|`(file: UploadItem) => void`|`-`|
|onReupload|重新上传的回调|`(file: UploadItem) => void`|`-`|
|onPreview|点击预览时候的回调。|`(file: UploadItem) => void`|`-`|
|disabled|禁用|`boolean`|`-`|

### UploadItem

|参数名|描述|类型|默认值|
|---|---|---|---|
|uid|当前上传文件的唯一标示|`string` **(必填)**|`-`|
|status|当前上传文件的状态|`UploadStatus`|`-`|
|originFile|文件对象|`File`|`-`|
|percent|上传进度百分比|`number`|`-`|
|response|当前文件上传请求返回的响应|`object`|`-`|
|url|文件 url|`string`|`-`|
|name|文件名|`string`|`-`|

### 方法/Methods

| 参数名     |                                  描述                                   |                         类型                        |
| ---------- | :---------------------------------------------------------------------: | :--------------------------------------------------: |
| submit   | 手动上传时，调用该方法，开始上传。[示例](/react/components/upload#手动上传)。不传参数时，会默认上传全部`init`状态的文件。  | `(file?: UploadItem) => void` |
| abort   | 中止文件上传 | `(file: UploadItem) => void` |
| reupload   | 重新上传文件 | `(file: UploadItem) => void` |

```js
// 自定义图标类型
type CustomIconType = {
  previewIcon?: ReactNode;
  removeIcon?: ReactNode;
  fileIcon?: ReactNode;
  reuploadIcon?: ReactNode;
  cancelIcon?: ReactNode;
  startIcon?: ReactNode;
  errorIcon?: ReactNode;
  fileName?: (file: UploadItem) => ReactNode;
}
```


## 常见问题

#### 如何完全控制上传文件的状态和进度？

可以参考 [示例](https://codepen.io/yinkaihui/pen/NWGmGRB?editors=0010) ，，建议设置 `autoUpload`为 `false`。并通过 `fileList` 和 `onChange` 使组件完全受控。
`fileList `是`UploadItem[]`，可以直接设置元素的 `status`，`percent `等字段。
