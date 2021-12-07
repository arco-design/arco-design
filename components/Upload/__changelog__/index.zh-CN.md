## 2.26.1

2021-12-07

### 🐛 问题修复

- 修复 `Upload` 组件拖拽上传文件夹不生效的 bug。([#275](https://github.com/arco-design/arco-design/pull/275))

## 2.26.0

2021-12-03

### 🐛 问题修复

- 修复 `Upload` 组件上传文件夹时，`beforeUpload` 的第二个参数未获取到本次上传的全部文件的 bug。([#252](https://github.com/arco-design/arco-design/pull/252))

## 2.25.1

2021-11-26

### 🐛 问题修复

- 修复 `Upload` 组件在拖拽移出时，上传节点仍然显示高亮样式的 bug。([#234](https://github.com/arco-design/arco-design/pull/234))

## 2.23.0

2021-09-27

### 🆎 类型修正

- 修复 `Upload` 组件丢失`RequestOptions`、`UploadRequestReturn`类型定义导出的问题

## 2.20.0

2021-07-30

### 🆕 Feature

- `Upload` 组件支持上传失败时从上传文件的 `response` 字段获取错误信息进行展示。

## 2.19.3

2021-07-23

### 🐛 Bugfix

- 修复 `Upload` 组件 `directory` 属性被设置到 div 标签导致控制台警告的 bug。
- 修复 `Upload` 组件在设置 `listType="picture-card"` 时特殊场景下多张图片上传出现个别图片展示宽度为 0 的问题。

## 2.17.3

2021-06-24

### 💅 Style

- 修复 `Upload` 组件照片墙折行时图片上下未设置间距的问题。

## 2.16.0

2021-05-28

### 🆕 Feature

- `Upload` 组件支持在 `beforeUpload` 方法中返回一个 file 对象，用于处理文件。

## 2.15.0

2021-04-30

### 🐛 Bugfix

- 修复 `Upload` 组件拖拽文件上传时对 Excel 文件类型判断异常的 bug。

## 2.14.0

2021-04-09

### 🐛 Bugfix

- 修复 `Upload` 组件在调用 `customRequest` 时，访问到的父组件的状态不是最新的值的 bug。

## 2.13.2

2021-04-01

### 🐛 Bugfix

- 修复 `Upload` 组件拖拽时出现拖拽中和拖拽完成的样式闪烁问题。
- 修复 `Upload` 组件上传时出现控制台 warning 的 bug。

## 2.11.0

2021-03-12

### 🆕 Feature

- `Upload` 组件支持文件夹上传。

## 2.7.0

2021-01-15

### 💅 Style

- 修复 `Upload` 组件超出 `limit` 限制而隐藏上传节点后出现空白占位的问题。

## 2.2.0

2020-11-20

### 🆕 Feature

- `Upload` 组件拖拽上传时不区分后缀名大小写。



