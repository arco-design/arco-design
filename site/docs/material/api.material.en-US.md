`````
Material Market

# API for Material

Open interface, material query.
`````

*Auto translate by google.*

## Query all

```
GET https://arco.design/material/api/material

Return {result: Array}
```

## Condition query

```
POST https://arco.design/material/api/material

Return {result: Array}
```

The request parameters are as follows:

```typescript
/************************************************* **************
 According to peerDependencies query material information, the meaning of the match field is as follows (default is and):
 or: The dependency of the material contains any one of the value array
 and: The dependencies of the material include all of the value array
************************************************** **************/

type ComplexMaterialQueryParamPeerDependencies = {
  value: string[];
  match?:'or' |'and';
};

type MaterialQueryParams = {
  // Fuzzy query based on name/title
  like?: string;
  // npm package name
  name?: string | string[];
  // Material title
  title?: string;
  author?: string;
  // Material types: react-component / react-library / react-block, etc.
  type?: string | string[];
  // Material descriptive label
  category?: string[];
  // Team ID
  group?: number | number[];
  peerDependencies?: string | string[] | ComplexMaterialQueryParamPeerDependencies;
  page?: number;
  pageSize?: number;
  sortDirection?: 1 | -1;
  sortBy?:'name' |'title' |'downloadTimes' |'createAt' |'updateAt';
  // Do you need to return the packageInfo field, the default is true
  needPackageInfo?: boolean;
  createdBefore?: string | number;
  createdAfter?: string | number;
};
```

## Return data type

The return data of the above interface is `MaterialInfo[]`, the specific fields are as follows:

```typescript
type BaseUser = {
  email: string;
  // Chinese user name
  name: string;
  // English user name
  enName: string;
  // The part of the mailbox prefix
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
  // NPM information required by the material platform
  package: {
    type: string;
    name: string;
    version: string;
    registry: string;
    peerDependencies: string[];
  };
  // Complete package information obtained from NPM
  packageInfo: Object;
  members: BaseUser[];
  createdAt: string;
  updatedAt: string;
  downloadTimes: number;
  favoriteTimes: number;
  downloadStatistics: DownloadStatistics;
};
```
