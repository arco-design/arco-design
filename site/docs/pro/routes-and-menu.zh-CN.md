`````
Arco Pro

# 路由与菜单

路由和菜单的生成。
`````

路由通常都和菜单绑定在一起，为了减少维护的量，我们直接通过路由表生成了菜单。

## 路由

首先，需要先了解一下路由表的配置

```js
// src/routes.ts
export const routes = [
  {
    name: 'menu.dashboard',                 // 菜单名，locale['menu.dashboard']
    key: 'dashboard',                       // 菜单项 key，也是菜单 path
    children: [
      {
        name: 'menu.dashboard.workplace',   // 菜单名，locale['menu.dashboard.workplace']
        key: 'dashboard/workplace',         // 菜单项 key，也是菜单 path
      },
    ],
  },
];
```

解释一下其中的几个变量：

- `name` 菜单项的名字，写的是语言包中的 key 值
- `key` 菜单项的 key，同时也作为 path 使用, 这里会将 `pages/${route.key}` 作为组件路径
- `children` 子菜单数组，各个字段同父菜单一致
- `breadcrumb` 是否展示在当前页面展示面包屑


路由配置很直观，所配置的这几个变量都是为了生成菜单以及处理路由跳转使用的，接下来看一下菜单和路由是如何串联起来的。

## 菜单

菜单栏是布局的一部分，所以从布局组件中就可以找到菜单生成过程：

1. 通过 `getFlattenRoutes` 得到带有路由组件的路由的扁平数组 `flattenRoutes`，用于生成路由

```js
function getFlattenRoutes() {
  const res = [];
  function travel(_routes) {
    _routes.forEach((route) => {
      if (route.key && !route.children) {
        route.component = lazyload(() => import(`./pages/${route.key}`));
        res.push(route);
      } else if (isArray(route.children) && route.children.length) {
        travel(route.children);
      }
    });
  }
  travel(routes);
  return res;
}

```

2. 通过 `flattenRoutes` 遍历路由表生成菜单项

```js
<Switch>
  {flattenRoutes.map((route) => {
    return <Route key={route.key} path={`/${route.key}`} component={route.component} />;
  })}
  <Redirect push to={`/${defaultRoute}`} />
</Switch>
```

## 新增一个菜单项的步骤

了解完路由和菜单的生成，就可以上手配置一个新的菜单项了，以新增一个监控页面为例。

3. 在 pages 中新增一个 monitor 文件夹，并在其中新增 index.tsx

```js
// src/pages/monitor/index.tsx
import React from 'react';

export default function Monitor() {
  return <div>监控页</div>;
}
```

4. 在路由表中新增监控页的路由配置

```js
// src/routes.ts
export const routes = [
  {
    name: 'menu.dashboard',
    key: 'dashboard',
    children: [
      {
        name: 'menu.dashboard.workplace',
        key: 'dashboard/workplace',
        componentPath: 'workPlace',
      },
+     {
+       name: 'menu.dashboard.monitor',
+       key: 'dashboard/monitor',
+     },
    ],
  },
];
```

5. 在语言包中新增菜单名

以下是中文语言包，其他语言包不赘述。

```js
// src/local/zh-CN.ts
export default {
  'menu.dashboard': '仪表盘',
  'menu.dashboard.workplace': '工作台',
+ 'menu.dashboard.monitor': '实时监控',
}
```

以上，就完成了一个菜单项的配置。现在刷新一下页面，就能看到新的菜单项。
