`````
开发指南

# 暗黑模式

组件库内置暗色的主题，你可以轻易的切换到暗色，也可以简单的通过调整色板来自动生成基于色板的新暗色主题。（点击官网右上角图标可进行暗黑模式预览。）
`````

## 如何切换暗黑模式

组件库通过 `body` 标签上的 `arco-theme` 属性来标明当前的主题，所以你只要修改这个属性，即可完成主题的切换。

**注意：通过设置 `arco-theme` 为 `dark`，只是将组件库切换成了暗色模式，你的页面的整体风格，需要利用一些 CSS 变量 调整为暗色。具体可查看[变量](/react/docs/dark#变量)**

```js
// 设置为暗黑主题
document.body.setAttribute('arco-theme', 'dark');

// 恢复亮色主题
document.body.removeAttribute('arco-theme');
```

**跟随系统主题自动切换**

```js
const darkThemeMq = window.matchMedia("(prefers-color-scheme: dark)");

darkThemeMq.addListener(e => {
 if (e.matches) {
   document.body.setAttribute('arco-theme', 'dark');
 } else {
    document.body.removeAttribute('arco-theme');
  }
});
```

**调整整体背景和字体**

```css
body {
  background-color: var(--color-bg-1);
  color: var(--color-text-1);
  color-scheme: dark; // 这个属性设置后，滚动条也能表现为暗色模式
}
```

## 原理

ArcoDesign 使用 [CSS 变量](https://developer.mozilla.org/zh-CN/docs/Web/CSS/--*) 来构建的暗黑主题。组件内部内置了两套色板，一套默认的亮色，另外一套是根据亮色色板生成的暗色色板。如果你对当前色板感兴趣，可以看这里：[ArcoDesign 色板](/react/docs/palette)。

ArcoDesign 内部 Less 变量和 CSS 变量共存，并且内置了亮色和暗色的色彩算法，可以更灵活的更改色板。

比如你想更改主色，你只需要更改 `@arcoblue-6` 这个变量的值即可，算法会自动帮你生成 1号到 10号的颜色，并且会自动生成暗色下反转后的 1号到 10号颜色。随心所欲，尽在掌握。

## 变量

**利用以下提供的变量，将页面上的背景和文字调整为合适的颜色，配合组件库本身的暗色主题，即可完美呈现暗黑视觉。**

