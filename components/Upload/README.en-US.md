`````
Component / Data Entry

# Upload

Upload file by selecting or dragging.
`````

%%Content%%

## API

### Upload

|Property|Description|Type|DefaultValue|Version|
|---|---|---|---|---|
|autoUpload|Whether to automatically upload files after selecting them|boolean |`true`|-|
|directory|Support upload whole directory|boolean |`-`|2.11.0|
|disabled|Whether to disable|boolean |`-`|-|
|drag|Whether to enable drag and drop upload|boolean |`-`|-|
|imagePreview|Enable built-in image preview, only works when listType='picture-card'. (`v2.41.0`)|boolean |`-`|-|
|multiple|Whether to allow multiple files to be selected|boolean |`-`|-|
|withCredentials|Whether to carry cookies when uploading requests|boolean |`-`|-|
|action|Uploading URL|string |`-`|-|
|method|The http method of upload request|string |`post`|2.55.0|
|listType|Upload list Style|'text' \| 'picture-list' \| 'picture-card' |`text`|-|
|tip|The tip text|string \| React.ReactNode |`-`|-|
|accept|Accepted [file types](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file#accept)（`strict` in `2.53.0`, defaultValue is true. When set to false, accept behaves the same as native. When set to true, file extensions will be strictly matched and files that do not meet the accept rules will be filtered out. )|string \| { type: string; strict?: boolean } |`-`|-|
|beforeUpload|Callback before uploading. Uploading will be aborted when the return value is false or a Promise which resolve(false) or reject.|(file: File, filesList: File[]) =&gt; boolean \| Promise&lt;any&gt; |`() => true`|-|
|className|Additional css class|string \| string[] |`-`|-|
|defaultFileList|Default list of files that have been uploaded|[UploadItem](upload#uploaditem)[] |`-`|-|
|fileList|List of files that have been uploaded|[UploadItem](upload#uploaditem)[] |`-`|-|
|headers|Set request headers|object |`-`|-|
|limit|maximum number of uploads allowed. Object type is supported in `2.28.0`|number \| { maxCount: number; hideOnExceedLimit?: boolean } |`-`|-|
|onRemove|Callback when the remove icon is clicked.Remove actions will be aborted when the return value is false or a Promise which resolve(false) or reject.|(file: [UploadItem](upload#uploaditem), fileList: [UploadItem](upload#uploaditem)[]) =&gt; void \| boolean \| Promise&lt;void \| boolean&gt; |`-`|-|
|progressProps|The props of [Progress component](/react/en-US/components/progress).|Partial&lt;[ProgressProps](progress#progress)&gt; |`-`|-|
|showUploadList|Whether to show upload list.It can be an object to customize the `previewIcon`, `removeIcon`,`fileIcon`, `reuploadIcon`, `cancelIcon`, `startIcon`, `errorIcon` and `fileName`|boolean \| [CustomIconType](#customicontype) |`true`|-|
|style|Additional style|CSSProperties |`-`|-|
|customRequest|Provide an override for the default xhr behavior for additional customization|(options: [RequestOptions](#requestoptions)) => [UploadRequestReturn](#uploadrequestreturn) \| void |`-`|-|
|data|additions params of request|object \| ((any: any) => object) |`-`|-|
|name|The key name of uploading file|string \| ((any: any) => string) |`-`|-|
|onChange|Callback when uploading state is changing|(fileList: [UploadItem](upload#uploaditem)[], file: [UploadItem](upload#uploaditem)) => void |`-`|-|
|onDragLeave|Callback when drag and drop uploaded file leaves the drag area|(e: React.DragEvent) => void |`-`|2.41.0|
|onDragOver|Callback when drag and drop uploaded file into the drag area|(e: React.DragEvent) => void |`-`|2.41.0|
|onDrop|Callback after drag file to the upload area and drop.|(e: React.DragEvent) => void |`-`|2.37.0|
|onExceedLimit|Callback when limit is exceeded|(files: File[], fileList: [UploadItem](upload#uploaditem)[]) => void |`-`|-|
|onPreview|Callback when the preview icon is clicked|(file: [UploadItem](upload#uploaditem)) => void |`-`|-|
|onProgress|Callback when uploading progress is changing|(file: [UploadItem](upload#uploaditem), e?: ProgressEvent) => void |`-`|-|
|onReupload|Callback when the re-upload icon is clicked|(file: [UploadItem](upload#uploaditem)) => void |`-`|-|
|renderUploadItem|Custom item of uploadList|(originNode: ReactNode, file: [UploadItem](upload#uploaditem), fileList: [UploadItem](upload#uploaditem)[]) => ReactNode |`-`|-|
|renderUploadList|Custom uploadList|(fileList: [UploadItem](upload#uploaditem)[], uploadListProps: [UploadListProps](upload#uploadlistprops)) => ReactNode |`-`|-|

### UploadListProps

File upload list display

|Property|Description|Type|DefaultValue|
|---|---|---|---|
|disabled|Whether to disable|boolean |`-`|
|onRemove|Callback when the remove icon is clicked.Remove actions will be aborted when the return value is false or a Promise which resolve(false) or reject|(file: [UploadItem](upload#uploaditem)) =&gt; void \| boolean \| Promise&lt;void \| boolean&gt; |`-`|
|onAbort|Callback when the cancel icon is clicked|(file: [UploadItem](upload#uploaditem)) => void |`-`|
|onPreview|Callback when the preview icon is clicked|(file: [UploadItem](upload#uploaditem)) => void |`-`|
|onReupload|Callback when the re-upload icon is clicked|(file: [UploadItem](upload#uploaditem)) => void |`-`|

### UploadItem

|Property|Description|Type|DefaultValue|
|---|---|---|---|
|percent|Upload progress percentage|number |`-`|
|name|File name|string |`-`|
|uid|Unique identifier|string  **(Required)**|`-`|
|url|File url|string |`-`|
|originFile|File Object|File |`-`|
|response|Response of upload request|object |`-`|
|status|Uploading status|[UploadStatus](#uploadstatus) |`-`|

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

### Methods

| Property     |                                  Description                                   |                         Type                        |
| ---------- | :---------------------------------------------------------------------: | :--------------------------------------------------: |
| submit   | upload the file list manually. [example](/react/en-US/components/upload#upload-manually). If no parameters, all files in the `init` state will be uploaded by default. | `(file?: UploadItem) => void` |
| abort   | cancel upload request	 | `(file: UploadItem) => void` |
| reupload   | re-upload request	 | `(file: UploadItem) => void` |

```js
// Custom icons
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
## Q&A

#### How to control the status and progress of uploaded files?

See [example](https://codepen.io/yinkaihui/pen/NWGmGRB?editors=0010),
You can directly set the `status`, `percent` and other fields for each element in the `fileList`.
