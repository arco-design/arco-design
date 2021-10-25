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
|style|Additional style|`CSSProperties`|`-`|-|
|className|Additional css class|`string \| string[]`|`-`|-|
|defaultFileList|Default list of files that have been uploaded|`UploadItem[]`|`-`|-|
|fileList|List of files that have been uploaded|`UploadItem[]`|`-`|-|
|directory|Support upload whole directory|`boolean`|`-`|2.11.0|
|accept|Accepted [file types](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file#accept)|`string`|`-`|-|
|customRequest|Provide an override for the default xhr behavior for additional customization|`(options: RequestOptions) => UploadRequestReturn \| void`|`-`|-|
|listType|Upload list Style|`'text' \| 'picture-list' \| 'picture-card'`|`text`|-|
|showUploadList|Whether to show upload list.It can be an object to customize the `previewIcon`, `removeIcon`,`fileIcon`, `reuploadIcon`, `cancelIcon`, `startIcon`, `errorIcon` and `fileName`|`boolean \| CustomIconType`|`true`|-|
|autoUpload|Whether to automatically upload files after selecting them|`boolean`|`true`|-|
|action|Uploading URL|`string`|`-`|-|
|limit|maximum number of uploads allowed|`number`|`-`|-|
|disabled|Whether to disable|`boolean`|`-`|-|
|drag|Whether to enable drag and drop upload|`boolean`|`-`|-|
|multiple|Whether to allow multiple files to be selected|`boolean`|`-`|-|
|tip|The tip text|`string \| React.ReactNode`|`-`|-|
|headers|Set request headers|`object`|`-`|-|
|data|additions params of request|`object \| ((any: any) => object)`|`-`|-|
|name|The key name of uploading file|`string \| ((any: any) => string)`|`-`|-|
|withCredentials|Whether to carry cookies when uploading requests|`boolean`|`-`|-|
|progressProps|The props of [Progress component](/react/en-US/components/progress).|`Partial<ProgressProps>`|`-`|-|
|renderUploadItem|Custom item of uploadList|`(originNode: ReactNode, file: UploadItem, fileList: UploadItem[]) => ReactNode`|`-`|-|
|renderUploadList|Custom uploadList|`(fileList: UploadItem[], uploadListProps: UploadListProps) => ReactNode`|`-`|-|
|onChange|Callback when uploading state is changing|`(fileList: UploadItem[], file: UploadItem) => void`|`-`|-|
|onPreview|Callback when the preview icon is clicked|`(file: UploadItem) => void`|`-`|-|
|onRemove|Callback when the remove icon is clicked.Remove actions will be aborted when the return value is false or a Promise which resolve(false) or reject.|`(file: UploadItem, fileList: UploadItem[]) => void`|`-`|-|
|onProgress|Callback when uploading progress is changing|`(file: UploadItem, e?: ProgressEvent) => void`|`-`|-|
|onReupload|Callback when the re-upload icon is clicked|`(file: UploadItem) => void`|`-`|-|
|onExceedLimit|Callback when limit is exceeded|`(files: File[], fileList: UploadItem[]) => void`|`-`|-|
|beforeUpload|Callback before uploading. Uploading will be aborted when the return value is false or a Promise which resolve(false) or reject.|`(file: File, filesList: File[]) => boolean \| Promise<any>`|`() => true`|-|

### UploadListProps

File upload list display

|Property|Description|Type|DefaultValue|
|---|---|---|---|
|onAbort|Callback when the cancel icon is clicked|`(file: UploadItem) => void`|`-`|
|onRemove|Callback when the remove icon is clicked.Remove actions will be aborted when the return value is false or a Promise which resolve(false) or reject|`(file: UploadItem) => void`|`-`|
|onReupload|Callback when the re-upload icon is clicked|`(file: UploadItem) => void`|`-`|
|onPreview|Callback when the preview icon is clicked|`(file: UploadItem) => void`|`-`|
|disabled|Whether to disable|`boolean`|`-`|

### UploadItem

|Property|Description|Type|DefaultValue|
|---|---|---|---|
|uid|Unique identifier|`string` **(Required)**|`-`|
|status|Uploading status|`UploadStatus`|`-`|
|originFile|File Object|`File`|`-`|
|percent|Upload progress percentage|`number`|`-`|
|response|Response of upload request|`object`|`-`|
|url|File url|`string`|`-`|
|name|File name|`string`|`-`|

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
}
```


## Q&A

#### How to control the status and progress of uploaded files?

See [example](https://codepen.io/yinkaihui/pen/NWGmGRB?editors=0010),
You can directly set the `status`, `percent` and other fields for each element in the `fileList`.
