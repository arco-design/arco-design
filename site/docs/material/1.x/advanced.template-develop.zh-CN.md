`````
物料平台

# 模板开发

学习如何开发自定义物料模板。
`````

Arco 官方提供了多种物料模板，当它们无法满足你的需求的时，你可以开发自己的物料模板。推荐基于 Arco 官方的物料项目进行修改，再将其转制为物料模板。

## **将项目转制为模板**

假定你已经有一个二次开发过的 Arco 物料项目，通过 `arco template --create` 命令可以快速将其转制为一个模板。

```
$ arco template --create

        ___                    ____            _
       /   |  ______________  / __ \___  _____(_)___ _____
      / /| | / ___/ ___/ __ \/ / / / _ \/ ___/ / __ `/ __ \
     / ___ |/ /  / /__/ /_/ / /_/ /  __(__  ) / /_/ / / / /
    /_/  |_/_/   \___/\____/_____/\___/____/_/\__, /_/ /_/
                                             /____/

? 请输入作为模板的现有项目路径 ./hello-arco
? 请输入生成模板的目标路径 ./my-template
? 生成的模板是否用于 monorepo 项目? No
? 请输入此模板的 NPM 包名 my-template
✔ 项目内容拷贝完成！
✔ 转化模板成功！
```

生成的模板目录结构如下，**请确保模板中无副作用产物（如打包产物等）** ：

```
.
├── package.json
└── template
    ├── .config
    ├── .eslintignore
    ├── .eslintrc
    ├── .prettierrc
    ├── .storybook
    ├── .stylelintignore
    ├── .stylelintrc
    ├── README.md
    ├── gitignore
    ├── package.json
    ├── src
    ├── stories
    ├── tests
    └── tsconfig.json
```

## **添加 HOOK**

在 `arco init` 初始化项目完成之后，会尝试执行模板自定义的钩子函数，你可以在此自定义帮助信息、执行项目构建等。在项目的根目录添加 `hook/after-init.js`, 下边是一个钩子函数示例：

```javascript
// hook/after-init.js
const { spawn } = require('child_process');

const logInfo = (messages) => {
  messages.forEach((m) => {
    console.log(`\x1B[32m${m}\x1B[0m`);
  });
};

module.exports = ({ projectName, isForMonorepo }) => {
  return new Promise((resolve, reject) => {
    spawn('npm', ['run', 'build'], { stdio: 'inherit' }).on('close', (code) => {
      if (code) {
        reject();
      } else {
        if (isForMonorepo) {
          logInfo([
            '******************************************************************',
            '  你可以在 Lerna 根目录重新执行以下命令，预览所有项目',
            `    $ npm run dev`,
            '******************************************************************',
          ]);
        } else {
          logInfo([
            '******************************************************************',
            '  你可以执行如下命令，启动项目',
            `    $ cd ${projectName}`,
            `    $ npm run dev`,
            '******************************************************************',
          ]);
        }
        resolve();
      }
    });
  });
};
```

**需要注意：`after-init` 中不应使用任何 NPM 依赖包 —— 此时下载的模板已经被移除，它是一个内存中的函数。**

## **调试本地模板**

```
# 使用 template 参数指定本地路径作为模板
arco init hello-arco --template file:../path/to/your/template
```

## **发布和使用模板**

模板开发调试无误后，将其发布至 NPM 后即可使用。你可以通过 `arco init hello-arco --template yourTemplatePackageName` 来使用该模板初始化物料项目。
