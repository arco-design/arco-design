export interface TestData {
  key: string;
  name: string;
  address: string;
  sex: 'male' | 'female';
  age: number;
  email: string;
}

export const data: TestData[] = [
  {
    key: '1',
    name: 'Name1',
    address: 'Address1',
    sex: 'male',
    age: 20,
    email: 'email1@123.com',
  },
  {
    key: '2',
    name: 'Name2',
    address: 'Address2',
    sex: 'male',
    age: 26,
    email: 'email2@123.com',
  },
  {
    key: '3',
    name: 'Name3',
    address: 'Address3',
    sex: 'female',
    age: 19,
    email: 'email3@123.com',
  },
  {
    key: '4',
    name: 'Name4',
    address: 'Address4',
    sex: 'male',
    age: 30,
    email: 'email4@123.com',
  },
  {
    key: '5',
    name: 'Name5',
    address: 'Address5',
    sex: 'female',
    age: 24,
    email: 'email5@123.com',
  },
];

export interface TestTreeData extends TestData {
  children?: TestTreeData[];
}

export const treeData: TestTreeData[] = [
  {
    key: '1',
    name: 'Name1',
    address: 'Address1',
    sex: 'male',
    age: 30,
    email: 'email1@123.com',
    children: [
      {
        key: '1-1',
        name: 'Name1-1',
        address: 'Address1-1',
        sex: 'male',
        age: 30,
        email: 'email1-1@123.com',
        children: [
          {
            key: '1-1-1',
            name: 'Name1-1-1',
            address: 'Address1-1-1',
            sex: 'male',
            age: 30,
            email: 'email1-1-1@123.com',
          },
        ],
      },
      {
        key: '1-2',
        name: 'Name1-2',
        address: 'Address1-2',
        sex: 'male',
        age: 30,
        email: 'email1-2@123.com',
      },
    ],
  },
  {
    key: '2',
    name: 'Name2',
    address: 'Address2',
    sex: 'male',
    age: 30,
    email: 'email2@123.com',
    children: [],
  },
];
