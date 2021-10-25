`````
Arco Pro

# 目录结构

项目文件的组织结构。
`````

## 目录

我们根据资源的类型来组织文件，尽量让每个文件夹或者文件的功能相对独立，减少耦合，当以下结构不够使用的时候，建议调整的时候尽量不脱离这个原则。

```bash
├── README.md
├── package-lock.json
├── package.json
├── public
│   └── index.html
├── src
│   ├── assets                 # 静态资源
│   ├── components             # 通用业务组件
│   ├── context.ts             # 全局配置
│   ├── declaration.d.ts
│   ├── history.ts             # history 实例
│   ├── index.tsx              # 入口文件
│   ├── layout                 # 布局
│   ├── locale                 # 国际化语言包
│   ├── mock                   # 模拟数据
│   ├── pages                  # 页面模板
│   ├── redux                  # 状态管理中心
│   ├── routes.tsx             # 路由配置
│   ├── settings.json          # 配置文件
│   ├── style                  # 全局样式
│   └── utils                  # 工具库
└── tsconfig.json
```

