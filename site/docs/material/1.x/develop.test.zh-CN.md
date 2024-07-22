`````
物料平台

# 单元测试

了解物料项目的单元测试。
`````

*本文基于 Arco 官方物料模板所创建的项目进行说明*

arco-scripts 内置了 Jest 测试工具，你可以在项目中使用 Jest 编写你的单元测试。以组件物料项目为例，其 `src/__test__` 目录结构如下：

```
src/__test__
├── __snapshots__
│   └── demo.test.ts.snap
├── demo.test.ts
└── index.test.tsx
```

你可以在`__test__`目录中编写你的单元测试，然后执行以下命令进行测试：

```bash
# jest --env=jsdom
arco-scripts test:client

# jest --env=node
arco-scripts test:node

# 此命令为 test:client 与 test:node 的合并
arco-scripts test
```

如果你需要使用 Jest CLI 参数，可在 test/test:client/test:node 命令后直接传入，arco 会将这些参数全部透传给 Jest。

```bash
arco-scripts test --bail --updateSnapshot --passWithNoTests

arco-scripts test:client --updateSnapshot --coverage

arco-scripts test:node --bail
```

关于自定义 Jest 测试配置，请参考：创建项目 - 自定义配置，还可进一步参考以下文档：

- [Jest 配置文件](https://jestjs.io/docs/en/configuration)
- [Jest CLI 选项](https://jestjs.io/docs/en/cli)
