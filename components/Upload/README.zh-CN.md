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
|autoUpload|是否选中文件后自动上传|boolean |`true`|-|
|directory|文件夹上传|boolean |`-`|2.11.0|
|disabled|禁用|boolean |`-`|-|
|drag|是否拖拽上传|boolean |`-`|-|
|imagePreview|启用内置的图片预览，仅在 listType='picture-card' 时生效。(`v2.41.0`)|boolean |`-`|-|
|multiple|文件多选|boolean |`-`|-|
|withCredentials|上传请求是否携带 cookie|boolean |`-`|-|
|action|上传接口地址|string |`-`|-|
|method|上传请求的 http method|string |`post`|2.55.0|
|listType|展示类型|'text' \| 'picture-list' \| 'picture-card' |`text`|-|
|tip|提示文字，listType 不同，展示会有区别|string \| React.ReactNode |`-`|-|
|accept|接受上传的类型 [详细请参考](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file#accept)。（`strict` in `2.53.0`，默认为 true。设置为 false 时，accept 表现和原生一致。设置为 true 时，会严格匹配文件后缀名，过滤掉不符合 accept 规则的文件。)|string \| { type: string; strict?: boolean } |`-`|-|
|beforeUpload|上传文件之前的回调。返回 false 或者 promise抛出异常的时候会取消上传。|(file: File, filesList: File[]) =&gt; boolean \| Promise&lt;any&gt; |`() => true`|-|
|className|节点类名|string \| string[] |`-`|-|
|defaultFileList|默认已上传的文件列表|[UploadItem](upload#uploaditem)[] |`-`|-|
|fileList|已上传的文件列表|[UploadItem](upload#uploaditem)[] |`-`|-|
|headers|上传时使用的 headers|object |`-`|-|
|limit|限制上传数量。默认超出后会隐藏上传节点。对象类型在 `2.28.0` 支持|number \| { maxCount: number; hideOnExceedLimit?: boolean } |`-`|-|
|onRemove|点击删除文件时的回调。返回 `false` 或者 `Promise.reject` 的时候不会执行删除。|(file: [UploadItem](upload#uploaditem), fileList: [UploadItem](upload#uploaditem)[]) =&gt; void \| boolean \| Promise&lt;void \| boolean&gt; |`-`|-|
|progressProps|进度条属性，接收所有进度条的 props。|Partial&lt;[ProgressProps](progress#progress)&gt; |`-`|-|
|showUploadList|是否展示上传文件列表。预览图标，删除图标，文件图标，重新上传图标，取消上传图标。|boolean \| [CustomIconType](#customicontype) |`true`|-|
|style|节点样式|CSSProperties |`-`|-|
|customRequest|通过覆盖默认的上传行为，可以自定义自己的上传实现|(options: [RequestOptions](#requestoptions)) => [UploadRequestReturn](#uploadrequestreturn) \| void |`-`|-|
|data|上传时的 Body 参数|object \| ((any: any) => object) |`-`|-|
|name|发请求时文件内容的参数名|string \| ((any: any) => string) |`-`|-|
|onChange|上传文件改变时的回调。文件开始上传，失败，成功时会触发。注意：如果需要实时获取文件的上传进度，请在 `onProgress` 中处理。|(fileList: [UploadItem](upload#uploaditem)[], file: [UploadItem](upload#uploaditem)) => void |`-`|-|
|onDragLeave|拖拽上传文件离开拖拽区时的回调|(e: React.DragEvent) => void |`-`|2.41.0|
|onDragOver|拖拽上传文件进入拖拽区时的回调|(e: React.DragEvent) => void |`-`|2.41.0|
|onDrop|拖拽上传文件时执行的回调|(e: React.DragEvent) => void |`-`|2.37.0|
|onExceedLimit|超出上传数量限制时触发|(files: File[], fileList: [UploadItem](upload#uploaditem)[]) => void |`-`|-|
|onPreview|点击预览时候的回调|(file: [UploadItem](upload#uploaditem)) => void |`-`|-|
|onProgress|文件上传进度的回调|(file: [UploadItem](upload#uploaditem), e?: ProgressEvent) => void |`-`|-|
|onReupload|文件重新上传时触发的回调|(file: [UploadItem](upload#uploaditem)) => void |`-`|-|
|renderUploadItem|自定义上传列表项|(originNode: ReactNode, file: [UploadItem](upload#uploaditem), fileList: [UploadItem](upload#uploaditem)[]) => ReactNode |`-`|-|
|renderUploadList|自定义展示上传文件列表|(fileList: [UploadItem](upload#uploaditem)[], uploadListProps: [UploadListProps](upload#uploadlistprops)) => ReactNode |`-`|-|

### UploadListProps

文件上传列表展示

|参数名|描述|类型|默认值|
|---|---|---|---|
|disabled|禁用|boolean |`-`|
|onRemove|点击删除文件时的回调。返回 false 或者 Promise.reject 的时候不会执行删除|(file: [UploadItem](upload#uploaditem)) =&gt; void \| boolean \| Promise&lt;void \| boolean&gt; |`-`|
|onAbort|中止文件上传的回调|(file: [UploadItem](upload#uploaditem)) => void |`-`|
|onPreview|点击预览时候的回调。|(file: [UploadItem](upload#uploaditem)) => void |`-`|
|onReupload|重新上传的回调|(file: [UploadItem](upload#uploaditem)) => void |`-`|

### UploadItem

|参数名|描述|类型|默认值|
|---|---|---|---|
|percent|上传进度百分比|number |`-`|
|name|文件名|string |`-`|
|uid|当前上传文件的唯一标示|string  **(必填)**|`-`|
|url|文件 url|string |`-`|
|originFile|文件对象|File |`-`|
|response|当前文件上传请求返回的响应|object |`-`|
|status|当前上传文件的状态|[UploadStatus](#uploadstatus) |`-`|

### RequestOptions

```js
export type RequestOptions = Pick<
  UploadProps,
  "headers" | "name" | "data" | "withCredentials" | "action" | "method"
> & {
  /** 更新当前文件的上传进度 。percent: 当前上传进度百分比 */
  onProgress: (percent: number, event?: ProgressEvent) => void;
  /** 上传成功后，调用onSuccess方法，传入的response参数将会附加到当前上传文件的reponse字段上 */
  onSuccess: (response?: object) => void;
  /** 上传失败后，调用onError方法，传入的 response 参数将会附加到当前上传文件的response字段 */
  onError: (response?: object) => void;
  /** 当前上传文件 */
  file: File;
};
```

### UploadRequestReturn

```js
export interface UploadRequestReturn {
  abort?: () => void;
  [key: string]: any;
}
```

### CustomIconType

```js
export type CustomIconType = {
  previewIcon?: ReactNode;
  removeIcon?: ReactNode;
  fileIcon?: ReactNode;
  reuploadIcon?: ReactNode;
  cancelIcon?: ReactNode;
  startIcon?: ReactNode;
  errorIcon?: ReactNode;
  successIcon?: ReactNode;
  fileName?: (file: UploadItem) => ReactNode;
  // 2.34.0
  progressRender?: (
    file: UploadItem,
    originDom: ReactNode
  ) => React.ReactElement;
  // 2.34.0
  imageRender?: (file: UploadItem) => React.ReactNode;
};
```

### UploadStatus

```js
export type UploadStatus = "init" | "uploading" | "done" | "error";
```

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
  progressRender?: (file: UploadItem, originDom: ReactNode) => ReactElement; // 2.34.0
  imageRender?: (file: UploadItem) => ReactNode; // 2.34.0
}
```

## 常见问题

#### 如何完全控制上传文件的状态和进度？

可以参考 [示例](https://codepen.io/yinkaihui/pen/NWGmGRB?editors=0010) ，，建议设置 `autoUpload`为 `false`。并通过 `fileList` 和 `onChange` 使组件完全受控。
`fileList `是`UploadItem[]`，可以直接设置元素的 `status`，`percent `等字段。
