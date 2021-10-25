`````
Arco Pro

# 状态管理

全局状态管理
`````

## 状态管理

全局状态管理是一个大型系统不可避免的存在，因为经常有一些需要全局共享的信息需要存储，比如用户信息，所以 pro 中内置了 redux 用于信息共享。

```bash
├── redux
│   ├── global.ts
│   └── index.ts
```

redux 信息大体可以分为两类，

-  一类是全局共享的信息。比如用户信息，这类信息存储在 global.ts 中。
-  另一类是页面内的信息共享，比如 step-form 中多个 step 间要共享多个 form 的信息，这类信息首先定义在页面的文件夹中，然后再引入到全局的 redux 中注册，如下

```js
import { combineReducers } from 'redux';
import global, { GlobalState } from './global';
import stepForm, { StepFormState } from '../pages/step-form/redux/reducer';

export interface ReducerState {
  global: GlobalState;
  stepForm: StepFormState;
}

export default combineReducers({
  global,
  stepForm,
});
```

这样的缺陷是只做到了物理分离，实际上页面级的信息在全局都能访问到，后续可以探索如何改进。
