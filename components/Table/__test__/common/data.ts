export interface TestData {
  key: string;
  name: string;
  address: string;
  sex: 'male' | 'female';
  age: number;
  email: string;
}

export interface MultipleSorterTestData {
  key: string;
  name: string;
  age: number;
  scoreA: number;
  scoreB: number;
  scoreC: number;
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
        age: 25,
        email: 'email1-1@123.com',
        children: [
          {
            key: '1-1-1',
            name: 'Name1-1-1',
            address: 'Address1-1-1',
            sex: 'male',
            age: 19,
            email: 'email1-1-1@123.com',
          },
          {
            key: '1-1-2',
            name: 'Name1-1-2',
            address: 'Address1-1-2',
            sex: 'male',
            age: 24,
            email: 'email1-1-2@123.com',
          },
        ],
      },
      {
        key: '1-2',
        name: 'Name1-2',
        address: 'Address1-2',
        sex: 'male',
        age: 29,
        email: 'email1-2@123.com',
      },
    ],
  },
  {
    key: '2',
    name: 'Name2',
    address: 'Address2',
    sex: 'male',
    age: 20,
    email: 'email2@123.com',
    children: [],
  },
];

export const multipleSorterData = [
  {
    key: '1',
    name: 'A',
    age: 18,
    scoreA: 100,
    scoreB: 60,
    scoreC: 70,
  },
  {
    key: '2',
    name: 'B',
    age: 17,
    scoreA: 100,
    scoreB: 90,
    scoreC: 80,
  },
  {
    key: '3',
    name: 'C',
    age: 19,
    scoreA: 100,
    scoreB: 70,
    scoreC: 60,
  },
  {
    key: '4',
    name: 'D',
    age: 15,
    scoreA: 80,
    scoreB: 70,
    scoreC: 100,
  },
  {
    key: '5',
    name: 'E',
    age: 20,
    scoreA: 80,
    scoreB: 70,
    scoreC: 90,
  },
];
