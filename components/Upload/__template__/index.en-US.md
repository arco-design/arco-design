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


## Q&A

#### How to control the status and progress of uploaded files?

See [example](https://codepen.io/yinkaihui/pen/NWGmGRB?editors=0010),
You can directly set the `status`, `percent` and other fields for each element in the `fileList`.
