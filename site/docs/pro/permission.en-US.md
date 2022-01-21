`````
Arco Pro

# Permission Control

Permission control is a very common basic function in middle and background scenarios. In `v2.1.0`, the permission control function is integrated into Arco Design Pro
`````
*Auto translate by google.*

## Applicable scene

The common front-end permission control in the middle and background can be roughly summarized as the following scenarios:

1. Menu permission control, manage permissions for **a certain menu/page**, if there are any, you can see this page, otherwise it will show no permission.

![](http://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/116622141d7b228ad2259c81cd32d095.gif~tplv-uwbnlip3yd-3.awebp)

2. **Manage permissions for a trigger** in a page, such as deleting a piece of data on a list page. If you have permission, the delete button will be displayed.

![](http://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/7b410fa5dad6e47665c264fae910c0c8.gif~tplv-uwbnlip3yd-3.awebp)

3. **Perform permission management for a certain page and a certain trigger** of an object, such as the deletion of data on a list page and the content genre is graphic and text. Display the delete button for this data if you have permission.

Arco Design Pro is trying its best to meet the above scenarios.

## Implementation

In implementation, a permission permission is mapped to two fields, `resource` and `action`.

- `resource`: a page, a trigger, a trigger of an element can be used as a `resource`.
- `action`: the specific behavior of the user, such as: read operation, write operation.

Therefore, the design of the permission field in the user information is as follows:


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

In terms of authority judgment, Arco Design Pro not only supports direct `resource` string judgment, but also supports regular matching `resource`. in order to cover more scenarios. The specific code for authority judgment is in `@/utils/authentication.ts`, which is briefly explained below.

```ts
type Auth = {
  resource: string | RegExp;
  actions?: string[];
};

interface AuthParams {
  // Array of permissions required for an operation
  requiredPermissions?: Array<Auth>;
  // Whether one needs to be satisfied, that is or is and.
  oneOfPerm?: boolean;
}

/**
 * Authenticate an operation on a resource
 * actions: Action permissions required by the current resource
 * perm: the permissions the user has on the current resource
 **/
const judge = (actions: string[], perm: string[]) => {
  if (!perm || !perm.length) {
    return false;
  }

  // The user has full permissions to this resource.
  // perm = ['*']
  if (perm.join('') === '*') {
    return true;
  }

  return actions.every((action) => perm.includes(action));
};

/**
 * Authenticate to a resource
 * params: resource + actions
 * userPermission: the permissions the user has
 **/
const auth = (params: Auth, userPermission: UserPermission) => {
  const { resource, actions = [] } = params;
  // current resource is a regular
  if (resource instanceof RegExp) {
    const permKeys = Object.keys(userPermission);

  // Get the resource that the user matches
    const matchPermissions = permKeys.filter((item) => item.match(resource));

    // Judge the permissions of all matching resources.
    return matchPermissions.every((key) => {
      const perm = userPermission[key];
      return judge(actions, perm);
    });
  }

  // resource is a simple string.
  const perm = userPermission[resource];
  return judge(actions, perm);
};

/**
 * Multiple resource combination authentication
 * params: resource + actions array
 * userPermission: user permission
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
    // or operation or and operation
    return oneOfPerm ? count > 0 : count === requiredPermissions.length;
  }
  return true;
};
```

## use

### Menu permission management

For menu and routing permission control, you can add the `requiredPermissions` parameter to a menu item in `routes.ts`.

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

### A button permission management

Arco Design Pro encapsulates the `PermissionWrapper` component, which can wrap fixed elements for permission management

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


### Permission management for a button of a card

This kind of permission management that requires specific objects only needs to be more detailed in `resource`.

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
The above is the specific method of using the front-end page for permission control, but it needs to combine the back-end interface to return the specific permissions owned by the user to the front-end.

At the same time, in the middle and back-end systems, it is far from enough to have simple front-end permission control, and the back-end is also required to perform interface permission control. In particular, some interfaces involving write operations need to strictly control permissions.
