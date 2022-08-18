## 2.38.1

2022-08-05

### 🐛 BugFix

- fix `accept=*` does not work in `Upload`([#1233](https://github.com/arco-design/arco-design/pull/1233))

## 2.37.0

2022-07-08

### 🆕 Feature

- The `Upload` component supports listening to the `onDrop` event([#1071](https://github.com/arco-design/arco-design/pull/1071))

### 🐛 BugFix

- fix `Upload` can upload file type not in accept([#1097](https://github.com/arco-design/arco-design/pull/1097))

## 2.34.0

2022-05-27

### 🆕 Feature

- The `Upload` component supports rendering images via the `showUploadList.imageRender` property.([#925](https://github.com/arco-design/arco-design/pull/925))
- The `Upload` component supports rendering upload progress nodes via the `showUploadList.progressRender` property.([#925](https://github.com/arco-design/arco-design/pull/925))
- The `Upload` component supports `children` passed in the function type to render the node content that triggers the upload.([#925](https://github.com/arco-design/arco-design/pull/925))

### 💅 Style

- The default gray background has been added to the picture display area in the photo wall mode of the `Upload` component.([#925](https://github.com/arco-design/arco-design/pull/925))

## 2.33.0

2022-05-13

### 🐛 BugFix

- Adjust the order of parameters in the upload request of the `Upload` component (the `file` field is added last to `FormData`).([#857](https://github.com/arco-design/arco-design/pull/857))

## 2.29.0

2022-02-11

### 🐛 BugFix

- Fixed `Upload` component triggering `onClick` twice([#519](https://github.com/arco-design/arco-design/pull/519))

## 2.28.2

2022-01-21

### 🐛 BugFix

- Fix the type of the `webkitdirectory` attribute of the `Upload` component.([#470](https://github.com/arco-design/arco-design/pull/470))
- Fixed the edge click of the remove button not working in the Upload component upload list([#457](https://github.com/arco-design/arco-design/pull/457))

## 2.28.0

2022-01-07

### 🆕 Feature

- The limit parameter of the `Upload` component supports specifying that the upload node is disabled after the limit number is exceeded([#416](https://github.com/arco-design/arco-design/pull/416))

## 2.27.1

2021-12-24

### 🐛 BugFix

- Fix the bug that only 100 files will be uploaded when the upload component is dragged to upload a folder.([#357](https://github.com/arco-design/arco-design/pull/357))

## 2.27.0

2021-12-17

### 💅 Style

- Fix the style problem of the margin when the upload file list is empty in the `Upload` component([#336](https://github.com/arco-design/arco-design/pull/336))

## 2.26.2

2021-12-10

### 🐛 BugFix

- Fix the bug that the request cannot be terminated when the `CustomRequest` setting of the `Upload` component is an asynchronous function.([#306](https://github.com/arco-design/arco-design/pull/306))

## 2.26.1

2021-12-07

### 🐛 BugFix

- Fix the bug that the upload folder does not take effect when dragging and dropping the upload component.([#275](https://github.com/arco-design/arco-design/pull/275))

## 2.26.0

2021-12-03

### 🐛 BugFix

- Fix the bug that when the `Upload` component uploads a folder, the second parameter of `beforeUpload` does not get all the files uploaded this time.([#252](https://github.com/arco-design/arco-design/pull/252))

## 2.25.1

2021-11-26

### 🐛 BugFix

- Fix the bug that the upload node still shows the highlighted style when the `Upload` component is dragged out.([#234](https://github.com/arco-design/arco-design/pull/234))

## 2.23.0

2021-09-27

### 🆎 TypeScript

- Fix the problem that the `Upload` component loses the export of `RequestOptions` and `UploadRequestReturn` type definitions

## 2.20.0

2021-07-30

### 🆕 Feature

- The `Upload` component supports the display of error messages from the `response` field of the uploaded file when the upload fails.

## 2.19.3

2021-07-23

### 🐛 Bugfix

- Fix the bug that the `directory` attribute of the `Upload` component is set to the div tag which causes the console to warn.
- Fix the problem that the display width of individual pictures is 0 when uploading multiple pictures in a special scene when the `Upload` component is set to `listType="picture-card"`.

## 2.16.0

2021-05-28

### 🆕 Feature

- The `Upload` component supports returning a file object in the `beforeUpload` method for processing files.

## 2.15.0

2021-04-30

### 🐛 Bugfix

- Fix the bug that the Excel file type is judged abnormally when uploading files by dragging and dropping files by the `Upload` component.

## 2.14.0

2021-04-09

### 🐛 Bugfix

- Fix the bug that the state of the parent component accessed by the `Upload` component is not the latest value when calling `customRequest`.

## 2.13.2

2021-04-01

### 🐛 Bugfix

- Fixed the issue of flickering styles during and after the dragging of the `Upload` component when dragging.
- Fix the bug that the console warning appears when uploading the `Upload` component.

## 2.11.0

2021-03-12

### 🆕 Feature

- The `Upload` component supports folder upload.

## 2.7.0

2021-01-15

### 💅 Style

- Fix the problem of blank space after the upload node is hidden when the `Upload` component exceeds the `limit` limit.

