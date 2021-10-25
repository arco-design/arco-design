`````
物料平台

# 物料查询

开放接口，物料查询。
`````

## 查询所有

```
GET https://arco.design/material/api/material

Return { result: Array }
```

## 条件查询

```
POST https://arco.design/material/api/material

Return { result: Array }
```

请求参数如下：

```typescript
/***************************************************************
 根据 peerDependencies 查询物料信息, match 字段的含义如下（默认为 and）：
 or: 物料的依赖项包含 value 数组中的任意一个
 and: 物料的依赖项包含 value 数组中的全部
****************************************************************/

type ComplexMaterialQueryParamPeerDependencies = {
  value: string[];
  match?: 'or' | 'and';
};

type MaterialQueryParams = {
  // 根据 name/title 进行模糊查询
  like?: string;
  // npm package name
  name?: string | string[];
  // 物料标题
  title?: string;
  author?: string;
  // 物料种类：react-component / react-library / react-block 等
  type?: string | string[];
  // 物料描述性标签
  category?: string[];
  // 团队 ID
  group?: number | number[];
  peerDependencies?: string | string[] | ComplexMaterialQueryParamPeerDependencies;
  page?: number;
  pageSize?: number;
  sortDirection?: 1 | -1;
  sortBy?: 'name' | 'title' | 'downloadTimes' | 'createAt' | 'updateAt';
  // 是否需要返回 packageInfo 字段，默认 true
  needPackageInfo?: boolean;
  createdBefore?: string | number;
  createdAfter?: string | number;
};
```

## 返回数据类型

上述接口返回数据为 `MaterialInfo[]`，具体字段如下：

```typescript
type BaseUser = {
  email: string;
  // 中文用户名
  name: string;
  // 英文用户名
  enName: string;
  // 邮箱前缀的部分
  username: string;
  avatarUrl: string;
};

type DownloadStatistics = {
  all: number;
  today: number;
  thisWeek: number;
  thisMonth: number;
  lastDay: number;
  lastWeek: number;
  lastMonth: number;
};

type MaterialInfo = {
  name: string;
  title: string;
  description: string;
  type: string;
  category: string[];
  group: number;
  homepage: string;
  repository: string;
  author: string;
  logo: string;
  screenshot: string;
  publishTime: number;
  updateTime: number;
  // 物料平台所需的 NPM 信息
  package: {
    type: string;
    name: string;
    version: string;
    registry: string;
    peerDependencies: string[];
  };
  // 从 NPM 获取的完整的包信息
  packageInfo: Object;
  members: BaseUser[];
  createdAt: string;
  updatedAt: string;
  downloadTimes: number;
  favoriteTimes: number;
  downloadStatistics: DownloadStatistics;
};
```
