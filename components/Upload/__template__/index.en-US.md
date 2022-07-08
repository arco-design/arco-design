---
file: interface
---

`````
Component / Data Entry

# Upload

Upload file by selecting or dragging.
`````

%%Content%%

## API

%%Props%%

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
