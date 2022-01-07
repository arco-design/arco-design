`````
Arco Pro

# Routing and menu

Route and menu generation.
`````

*Auto translate by google.*

Routing is usually tied to the menu. In order to reduce the amount of maintenance, we directly generate the menu through the routing table.

## Routing

First of all, you need to understand the routing table configuration

```js
// src/routes.ts
export const routes = [
  {
    name:'menu.dashboard', // Menu name, locale['menu.dashboard']
    key:'dashboard', // menu item key, also menu path
    children: [
      {
        name:'menu.dashboard.workplace', // Menu name, locale['menu.dashboard.workplace']
        key:'dashboard/workplace', // menu item key, also menu path
      },
    ],
  },
];
```

Explain some of the variables:

- `name` The name of the menu item, which is the key value in the language pack
- `key` The key of the menu item, also used as path, here will use `pages/${route.key}` as the component path
- `children` sub-menu array, each field is the same as the parent menu
- `breadcrumb` whether to display breadcrumbs on the current page

The routing configuration is very intuitive. The configured variables are used to generate the menu and process the routing jump. Next, let's look at how the menu and the routing are connected in series.

## menu

The menu bar is part of the layout, so the menu generation process can be found in the layout component:

1. Obtain a flat array of routes with routing components `flattenRoutes` through `getFlattenRoutes`, which is used to generate routes

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

2. Generate menu items by traversing the routing table through `flattenRoutes`

```js
<Switch>
  {flattenRoutes.map((route) => {
    return <Route key={route.key} path={`/${route.key}`} component={route.component} />;
  })}
  <Redirect push to={`/${defaultRoute}`} />
</Switch>
```

## Steps to add a menu item

After understanding the routing and menu generation, you can start configuring a new menu item. Take a new monitoring page as an example.

3. Add a monitor folder in pages and add index.tsx to it

```js
// src/pages/monitor/index.tsx
import React from'react';

export default function Monitor() {
  return <div>Monitoring page</div>;
}
```

4. Add the routing configuration of the monitoring page in the routing table

```js
// src/routes.ts
export const routes = [
  {
    name:'menu.dashboard',
    key:'dashboard',
    children: [
      {
        name:'menu.dashboard.workplace',
        key:'dashboard/workplace',
      },
+     {
+       name:'menu.dashboard.monitor',
+       key:'dashboard/monitor',
+     },
    ],
  },
];
```

5. Add a new menu name in the language pack

The following is the Chinese language pack, other language packs will not be repeated.

```js
// src/local/zh-CN.ts
export default {
  'menu.dashboard':'Dashboard',
  'menu.dashboard.workplace':'Workbench',
+ 'menu.dashboard.monitor':'Real-time monitoring',
}
```

Above, the configuration of a menu item is completed. Now refresh the page to see the new menu item.
