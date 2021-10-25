`````
Arco Pro

# 模拟数据

拦截 ajax 并返回模拟的数据
`````

## 解决方案

前后端并行开发意味着前端需要在没有接口数据的情况下进行开发，在这种情况下如果能提供模拟数据请求的功能，我们的数据请求代码就能正常书写，pro 采用了 Mock.js 来实现这个功能。

Mock.js 会拦截 ajax 请求，如果有匹配的 mock 规则，就不会将 ajax 发出去，而是返回 mock 的数据。Mock.js 有着丰富的模拟数据生成方法，建议先读一下文档，文档写的很清晰易懂 [MockJs 文档](http://mockjs.com/).

```js
import Mock from 'mockjs';

Mock.mock(new RegExp('/api/chatList'), () => {
  const data = Mock.mock({
    'data|4-6': [
      {
        'id|+1': 1,
        username: '用户7352772',
        content: '马上就开始了，好激动！',
        time: '13:09:12',
        'isCollect|2': true,
      },
    ],
  });

  return data.data;
});
```

当客户端发送请求的 url 被 `new RegExp('/api/chatList')` 匹配到，Mock.js 就会拦截这条请求，并执行对应的回调函数，返回回调函数中 return 的数据。

> 注意：被 Mock.js 匹配并拦截的请求，不会出现在开发者工具的 network 面板中。

## 关闭 Mock

为了方便开启和关闭数据模拟功能，每个 `Mock` 都会被 `setupMock.setup` 包裹，setupMock 如下：

```js
export default function setupMock(config: { 
  mock?: boolean; 
  setup: () => void 
}) {
  const { mock = !__PRODUCTION__, setup } = config;

  if (mock === false) return;

  setup();
};
```

非生产环境下默认启动数据模拟，当我们需要调试接口的时候只需要将 setupMock 的 mock 参数置为 false 即可，如下：

```js
import Mock from 'mockjs';
import setupMock from '../utils/setupMock';

setupMock({
  mock: false
  setup() {
    // 用户信息
    Mock.mock(new RegExp('/api/userInfo'), () => {
      return {
        name: 'name',
      };
    });
  },
});
```
