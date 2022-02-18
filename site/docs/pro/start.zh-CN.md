`````
Arco Pro

# 快速开始

请跟随以下步骤创建 Arco Design Pro
`````

## 环境

开始开发之前，请确认本地环境中安装好了 `node`， `git` 和 `arco cli >= 1.24.0`。

其中 `arco cli` 是安装项目模版的工具，请运行以下命令安装：

```
npm i -g arco-cli
```

## 技术栈

本项目的技术栈为 `React` + `ES2015+` + `TypeScript` + `bizcharts` 和 `Arco Design`，提前学习和了解这些知识将帮助你更好地上手我们的项目。

同时实现多架构创新方式，支持输出多种架构的 `pro` 模版。

目前 `React-Pro` 支持的架构
- [Next.js](https://nextjs.org/).
- [Create React App](https://create-react-app.dev/)
- [Vite](https://vitejs.dev/)

## 安装

这一步是以 Arco Design Pro 为模版创建一个新的项目，请按照以下步骤进行：

1.  进入到一个文件夹，新建项目

```bash
cd someDir
arco init hello-arco-pro
```

2. 选择使用的技术栈，本教程选 `React`

```bash
? 请选择你希望使用的技术栈
❯ React
  Vue
```

3. 选择 `arco-design-pro` 分类

```bash
? 请选择所要创建项目的类型
  业务组件
  区块
  页面
  组件库
  Lerna Monorepo 项目
❯ Arco Pro 项目
```

4. 选择输出的架构模版

```bash
? 请选择你想要使用的开发框架 (Use arrow keys)
  Next (https://nextjs.org/)
  Vite (https://vitejs.dev/)
❯ Create React App (https://create-react-app.dev)
```
看到以下输出就是创建成功了

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/8b78dd4bbdba4bf7939bd0a131357b31~tplv-uwbnlip3yd-image.image)

5. 如果出现以下错误，可能是node版本问题导致依赖包安装失败，可以需要手动进入项目中安装依赖。

```bash
cd hello-arco-pro
yarn install
```
![](http://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/89d7c478f657a70d1906548eb6cb9e79.png~tplv-uwbnlip3yd-png.png)

## 开发

进入到项目中，运行代码

```bash
cd hello-arco-pro
yarn dev
```

打开 localhost:3000 就能看到如下页面

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/1e331a3b8e2446e2be6c78b1c86e5e50~tplv-uwbnlip3yd-image.image)
