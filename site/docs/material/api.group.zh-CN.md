`````
物料平台

# 团队查询

开放接口，物料团队查询。
`````

## 查询所有

```
GET https://arco.design/material/api/group

Return { result: Array }
```

## 条件查询

```
POST https://arco.design/material/api/group

Return { result: Array }
```

请求参数如下：

```typescript
type GroupQueryParams = {
  id?: number;
  name?: string;
  createdBefore?: string | number;
  createdAfter?: string | number;
};
```

上述接口返回数据为 `GroupInfo[]`，具体字段如下：

```typescript
type User = {
  email: string;
  name: string;
  username: string;
  avatarUrl: string;
  role: 'owner' | 'master';
};

type GroupInfo = {
  id: number;
  name: string;
  logo: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  members: User[];
  materialStatistics: {
    count: number;
    downloadTimes: number;
    favoriteTimes: number;
    downloadStatistics: {
      all: number;
      today: number;
      thisWeek: number;
      thisMonth: number;
      lastDay: number;
      lastWeek: number;
      lastMonth: number;
    };
  };
};
```

## 查询团队站点

```
POST https://arco.design/material/api/group/queryGroupSite

Return { result: Array }
```

请求参数如下：

```typescript
type GroupQueryParams = {
  id?: number;
  createdBefore?: string | number;
  createdAfter?: string | number;
};
```

上述接口返回数据为包含站点信息的数组，具体字段如下：

```typescript
{
  id: number;
  site: Array<{
    key: string;
    path: string;
    link?: boolean;
  }>
}
```

## 查询团队站点文档大纲

```
POST https://arco.design/material/api/group/queryGroupSiteOutline

Return { ok: boolean, result: Record<string, { text: string; depth: number; href: string }[]> }
```

请求参数如下：

```typescript
type GroupQueryParams = {
  /**
   * 团队 ID
   */
  id: number;
  /**
   * 查询关键词
   */
  keyword?: string;
};
```

上述接口返回数据为包含站点文档大纲的数组，具体字段如下：

```typescript
{
  DocSearch: [
    {
      href: '/DocSearch#basic',
      text: 'Basic',
      depth: 2,
    },
    {
      href: '/DocSearch#docsearchprops',
      text: 'DocSearchProps',
      depth: 2,
    },
  ]
}
```
