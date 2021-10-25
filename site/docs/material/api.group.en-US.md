`````
Material Market

# API for Group

Open interface, material team query.
`````

*Auto translate by google.*

## Query all

```
GET https://arco.design/material/api/group

Return {result: Array}
```

## Condition query

```
POST https://arco.design/material/api/group

Return {result: Array}
```

The request parameters are as follows:

```typescript
type GroupQueryParams = {
  id?: number;
  name?: string;
  createdBefore?: string | number;
  createdAfter?: string | number;
};
```

The return data of the above interface is `GroupInfo[]`, and the specific fields are as follows:

```typescript
type User = {
  email: string;
  name: string;
  username: string;
  avatarUrl: string;
  role:'owner' |'master';
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

## Query team site

```
POST https://arco.design/material/api/group/queryGroupSite

Return {result: Array}
```

The request parameters are as follows:

```typescript
type GroupQueryParams = {
  id?: number;
  createdBefore?: string | number;
  createdAfter?: string | number;
};
```

The data returned by the above interface is an array containing site information. The specific fields are as follows:

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
