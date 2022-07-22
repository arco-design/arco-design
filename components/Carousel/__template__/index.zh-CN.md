---
file: interface
---

`````
组件 / 数据展示

# 图片轮播 Carousel

用于展示多张图片、视频或内嵌框架等内容的循环播放，支持系统自动播放或用户手动切换。
`````

%%Content%%

## API

%%Props%%

## 常见问题

### 动画结束后闪动

如果子元素是透明的，`Carousel` 翻页完成之后可能出现由于浏览器渲染导致的闪动问题，此时可以尝试为子元素添加背景色解决。参考此 [ISSUE](https://github.com/arco-design/arco-design/issues/97)。
