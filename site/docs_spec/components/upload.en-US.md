`````
Component / Data Entry

# Upload

Upload file by selecting or dragging.
`````

*Auto translate by google.*

## Basic attributes

### Component definition

Users can transfer files or submit corresponding content.

### Component composition

| Components | Description |
| ----------- | ----------------------------- |
| 1. Upload trigger (required) | Click the upload trigger to open the local folder to select the file or folder to upload |
| 2. Upload content (required) | The display form after upload includes text, picture list, picture wall, custom style, etc. |
| 3. Delete button (optional) | Used to delete files during or after uploading |
| 4. Upload status (required) | Display file upload progress |

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/73f5971058414bfd9bff643f3203b81f~tplv-uwbnlip3yd-image.image)

### Component type

Classified according to the way of uploading interaction: basic style, image upload, drag and drop upload, manual trigger upload

| Type | Description |
| -------- | --------------------------- |
| 1. Basic style | The user clicks the button to pop up the file selection box |
| 2. Picture upload | Click to upload the picture, you can limit the format and size of the picture uploaded by the user |
| 3. Drag and drop upload | Drag the file into the designated area to complete the upload, and click to upload is also supported |
| 4. Manually trigger the upload | After the file is selected, the upload will not be automatically triggered, you need to manually click the button to trigger the upload |

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/f1935fd3f8eb45698d50268eae57e61c~tplv-uwbnlip3yd-image.image)

Classified according to the file styles displayed after uploading: text style, picture list style, picture wall style, custom style

| Type | Description |
| -------- | ------------------------------ |
| 1. Text style | The icon, file name and format will be displayed after the file is uploaded successfully |
| 2. Picture list style | After the picture is uploaded successfully, the thumbnail, picture name and format will be displayed |
| 3. Picture wall style | After the picture is uploaded successfully, the thumbnail will be displayed in the list |
| 4. Customized styles | The picture wall card styles are more abundant, which can include thumbnails, picture names, previews, deletes, etc. |

Text style

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/f7dd161f8eb44634a7b65990279c1a2b~tplv-uwbnlip3yd-image.image)

Picture list style

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/8c71ba011a55beb8eeb0a03eb8613320.png~tplv-uwbnlip3yd-webp.webp)

Picture wall style

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/9b386c0bc8a91870fa6b0f5cfbe638c5.png~tplv-uwbnlip3yd-webp.webp)

Custom style

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/a92d5d17ce4bc6f0755c7227ab850d48.png~tplv-uwbnlip3yd-webp.webp)

On the basis of the above classification, additional functions can be added: **Verify before upload, verify before removal, crop before upload, limit the number of uploads, limit the size of uploaded files**, etc.

| Type | Description |
| -------- | ------------------------------- |
| 1. Verify before uploading | After selecting the file, click the upload button, a confirmation dialog box appears, click OK to start uploading the file |
| 2. Verify before removal | Click to remove the uploaded file, and the verification dialog box appears |
| 3. Crop before uploading | Support crop editing before uploading pictures |
| 4. Limit the number of uploads | Limit the maximum number of uploads, the upload button will be hidden or grayed out after the specified number is exceeded |

Verify before upload

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/e0c8a00351eb4d758af94f2746355198~tplv-uwbnlip3yd-image.image)

Check before removal

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/5b8687d7193b4fbf901e1d06274ac7f1~tplv-uwbnlip3yd-image.image)

Cropping before upload

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/a3a82213f414448831504f0fe0bf951d.png~tplv-uwbnlip3yd-webp.webp)

Limit the number of uploads

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/5ef762c662d310d5c1b3a46e248774aa.png~tplv-uwbnlip3yd-webp.webp)

### Component status

- **Common status:** Default status, mouse hover status, click status, disabled status

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/06a002130569455da2c28e88d7346cd3~tplv-uwbnlip3yd-image.image)

- **Uploading process status:** uploading successfully, uploading failed, uploading

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/f8d65c7edf3f15c88d7666bb47b9e39e.png~tplv-uwbnlip3yd-webp.webp)

## When to use

Uploading is the process of publishing information (webpages, texts, pictures, videos, etc.) to a remote server via a webpage or upload tool.

- When one or some files need to be uploaded.

- When it is necessary to show the progress of the upload.

- When you need to use drag and drop interaction.

## Three, associated components

[Button](/react/components/button)

[Progress](/react/components/progress)
