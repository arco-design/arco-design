`````
Arco Pro

# Mock Data

Intercept ajax and return simulated data
`````

*Auto translate by google.*

## Solution

Parallel development of front and back ends means that the front end needs to be developed without interface data. In this case, if the function of simulating data requests can be provided, our data request code can be written normally. Pro uses Mock.js to achieve This feature.

Mock.js will intercept the ajax request. If there is a matching mock rule, the ajax will not be sent out, but the mock data will be returned. Mock.js has a wealth of simulation data generation methods, it is recommended to read the document first, the document is very clear and easy to understand [MockJs document](http://mockjs.com/).

```js
import Mock from'mockjs';

Mock.mock(new RegExp('/api/chatList'), () => {
  const data = Mock.mock({
    'data|4-6': [
      {
        'id|+1': 1,
        username:'User 7352772',
        content:'It will start soon, so excited! ',
        time: '13:09:12',
        'isCollect|2': true,
      },
    ],
  });

  return data.data;
});
```

When the url sent by the client is matched by `new RegExp('/api/chatList')`, Mock.js will intercept the request, execute the corresponding callback function, and return the data returned in the callback function.

> Note: Requests that are matched and intercepted by Mock.js will not appear in the network panel of the developer tools.

## Close Mock

In order to facilitate the opening and closing of the data simulation function, each `Mock` will be wrapped by `setupMock.setup`, setupMock is as follows:

```js
export default function setupMock(config: {
  mock?: boolean;
  setup: () => void
}) {
  const {mock = !__PRODUCTION__, setup} = config;

  if (mock === false) return;

  setup();
};
```

Data simulation is started by default in a non-production environment. When we need to debug the interface, we only need to set the mock parameter of setupMock to false, as follows:

```js
import Mock from'mockjs';
import setupMock from'../utils/setupMock';

setupMock({
  mock: false
  setup() {
    // User Info
    Mock.mock(new RegExp('/api/userInfo'), () => {
      return {
        name:'name',
      };
    });
  },
});
```
