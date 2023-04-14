`````
Arco Pro

# 权限控制

权限控制是中后台场景非常常见的基础功能，在 `v2.1.0` 将权限控制功能集成至 Arco Design Pro
`````
## 适用场景

中后台常见的前端权限控制大概可概括为以下场景：

1. 菜单权限控制，针对**某个菜单/页面**进行权限管理，有则能看到此页面，否则将展示无权限。

2. **针对某页面中的某触发器**进行权限管理，例如对列表页的某一条数据进行删除操作。有权限情况下则展示删除按钮。

3. **针对某页面、某对象的某触发器**进行权限管理，例如列表页且内容体裁为图文的数据的删除操作。在有权限情况下对这条数据展示删除按钮。

Arco Design Pro 在尽力满足以上场景。具体效果可前往 [Arco Design Pro](https://react-pro.arco.design/) 体验。

![权限控制](http://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/20230414-182335.gif~tplv-uwbnlip3yd-3.awebp)

## 实现

在实现上，将一个权限权限映射为两个字段，`resource` 和 `action`。

- `resource`: 一个页面，一个触发器，某个元素的某触发器都可以作为 `resource`。
- `action`: 用户的具体行为，如：读操作，写操作。

所以，用户信息里的权限字段的设计如下：

```ts
/**
 * { data-analysis:  ['read', 'write'] }
 */
export type UserPermission = Record<string, string[]>;

userInfo.permission = {
  'data-analysis': ['read', 'write'],
  'search-table': ['read'],
};
```

在权限判断上，Arco Design Pro 不仅支持直接的 `resource` 字符串判断，还支持正则匹配的 `resource`。以便覆盖更多场景。权限判断具体代码在 `@/utils/authentication.ts` 中，下面做简单讲解。

```ts
type Auth = {
  resource: string | RegExp;
  actions?: string[];
};

interface AuthParams {
  // 某操作需要的权限数组
  requiredPermissions?: Array<Auth>;
  // 是否需要满足一个即可，即是或还是且。
  oneOfPerm?: boolean;
}

/**
 * 对 某资源的某操作鉴权
 * actions: 当前资源需要的操作权限
 * perm: 用户对当前资源所拥有的权限
 **/
const judge = (actions: string[], perm: string[]) => {
  if (!perm || !perm.length) {
    return false;
  }

  // 用户拥有这个资源的全部权限。
  // perm = ['*']
  if (perm.join('') === '*') {
    return true;
  }

  return actions.every((action) => perm.includes(action));
};

/**
 *  对某资源鉴权
 *  params: resource + actions
 *  userPermission: 用户所拥有的权限
 **/
const auth = (params: Auth, userPermission: UserPermission) => {
  const { resource, actions = [] } = params;
  // 当前 resource 是一个正则
  if (resource instanceof RegExp) {
    const permKeys = Object.keys(userPermission);

    // 获取用户与之匹配的资源
    const matchPermissions = permKeys.filter((item) => item.match(resource));

    // 对匹配的所有资源的权限进行判断。
    return matchPermissions.every((key) => {
      const perm = userPermission[key];
      return judge(actions, perm);
    });
  }

  // resource 是一个简单的字符串。
  const perm = userPermission[resource];
  return judge(actions, perm);
};

/**
 * 多个资源组合鉴权
 * params: resource + actions 数组
 * userPermission: 用户权限
 **/
export default (params: AuthParams, userPermission: UserPermission) => {
  const { requiredPermissions, oneOfPerm } = params;
  if (Array.isArray(requiredPermissions) && requiredPermissions.length) {
    let count = 0;
    for (const rp of requiredPermissions) {
      if (auth(rp, userPermission)) {
        count++;
      }
    }
    // 或操作 或者 且操作
    return oneOfPerm ? count > 0 : count === requiredPermissions.length;
  }
  return true;
};
```

## 使用

### 菜单权限管理

针对菜单及路由权限控制，可以在 `routes.ts` 中，对某个菜单项增加 `requiredPermissions` 参数即可。

```ts
const routes = [
  {
    name: 'menu.visualization',
    key: 'visualization',
    children: [
      {
        name: 'menu.visualization.dataAnalysis',
        key: 'visualization/data-analysis',
        requiredPermissions: [
          { resource: 'menu.visualization.dataAnalysis', actions: ['read'] },
        ],
      },
      {
        name: 'menu.visualization.multiDimensionDataAnalysis',
        key: 'visualization/multi-dimension-data-analysis',
        requiredPermissions: [
          {
            resource: 'menu.visualization.dataAnalysis',
            actions: ['read', 'write'],
          },
          {
            resource: 'menu.visualization.multiDimensionDataAnalysis',
            actions: ['write'],
          },
        ],
        oneOfPerm: true,
      },
    ],
  },
];
```

### 某按钮权限管理

Arco Design Pro 封装了 `PermissionWrapper` 组件，可包裹固定元素进行权限管理

```ts
import PermissionWrapper from '@/components/permissionWrapper';

return (
  <PermissionWrapper
    requiredPermissions={[{ resource: /^menu.list.*/, actions: ['write'] }]}
  >
    <Button loading={loading}>删除</Button>
  </PermissionWrapper>
);
```

### 针对某卡片的某按钮进行权限管理

这种对特定对象有要求的权限管理，只需要将 `resource` 做的更细致些即可

```ts
import PermissionWrapper from '@/components/permissionWrapper';

return (
  <div>
    {data.map((item) => {
      const { key, ...rest } = item;
      return (
        <PermissionWrapper
          requiredPermissions={[
            { resource: `list-card-${key}`, actions: ['write'] },
          ]}
        >
          <Card {...rest} />
        </PermissionWrapper>
      );
    })}
  </div>
);
```

以上是前端页面进行权限控制的具体使用方法，但是需要结合后端接口将用户所拥有的具体权限返回至前端。

同时，在中后台系统中，仅仅有简单的前端权限控制是远远不够的，还需要后端进行接口权限控制。特别是涉及到写操作的一些接口，需要严格把控权限。
