`````
Arco Pro

# Quick start

Please follow the steps below to create Arco Design Pro
`````

*Auto translate by google.*

## Environment

Before starting development, please make sure that `node`, `git` and `arco cli >= 1.24.0` are installed in the local environment.

Among them, `arco cli` is a tool for installing project templates, please run the following command to install

```
npm i -g arco-cli
```

## Technology Stack

The technology stack of this project is `React` + `ES2015+` + `TypeScript` + `bizcharts` and `Arco Design`. Learning and understanding these knowledge in advance will help you get started with our project better.

At the same time, it realizes the multi-architecture innovation method, and supports the output of the `pro` template of multiple architectures.

Architecture currently supported by `React-Pro`
-[Next.js](https://nextjs.org/).
-[Create React App](https://create-react-app.dev/)
-[Vite](https://vitejs.dev/)

## Install

This step uses Arco Design Pro as a template to create a new project, please follow the steps below:

1. Go to a folder and create a new project

```bash
cd someDir
arco init hello-arco-pro
```

2. Choose the technology stack to use, this tutorial chooses `React`

```bash
? Please select the technology stack you wish to use
❯ React
  Vue
```

3. Select the `arco-design-pro` category

```bash
? Please select the type of project you want to create
  Business component
  Block
  page
  Component library
  Lerna Monorepo project
❯ Arco Pro project
```

4. Select the output architecture template

```bash
? Please select the development framework you want to use (Use arrow keys)
  Next (https://nextjs.org/)
  Vite (https://vitejs.dev/)
❯ Create React App (https://create-react-app.dev)
```
When you see the following output, the creation is successful

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/8b78dd4bbdba4bf7939bd0a131357b31~tplv-uwbnlip3yd-image.image)

5. If the following error occurs, it may be the node version problem that caused the dependency package installation to fail, and you may need to manually enter the project to install the dependency.

```bash
cd hello-arco-pro
yarn install
yarn dev
```

![](http://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/89d7c478f657a70d1906548eb6cb9e79.png~tplv-uwbnlip3yd-png.png)

## Development

Enter the project, run the code

```bash
cd hello-arco-pro

npm run dev
```

Open localhost:3000 and you can see the following page.

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/1e331a3b8e2446e2be6c78b1c86e5e50~tplv-uwbnlip3yd-image.image)
