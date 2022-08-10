---
file: interface
---

`````
组件 / 数据输入

# 上传 Upload

用户可传输文件或提交相应的内容。
`````

%%Content%%

## API

%%Props%%

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
