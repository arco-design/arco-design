`````
Arco Pro

# State management

Global state management
`````

*Auto translate by google.*

## State Management

Global state management is an inevitable existence of a large-scale system, because there are often some information that needs to be shared globally, such as user information, which needs to be stored, so redux is built into pro for information sharing.

```bash
├── redux
│ ├── global.ts
│ └── index.ts
```

Redux information can be roughly divided into two categories,

-One category is global shared information. For example, user information, which is stored in global.ts.
-The other is the sharing of information within the page. For example, the information of multiple forms must be shared between multiple steps in a step-form. This type of information is first defined in the folder of the page, and then imported into the global redux for registration. as follows

```js
import {combineReducers} from'redux';
import global, {GlobalState} from'./global';
import stepForm, {StepFormState} from'../pages/step-form/redux/reducer';

export interface ReducerState {
  global: GlobalState;
  stepForm: StepFormState;
}

export default combineReducers({
  global,
  stepForm,
});
```

Such a defect is that only physical separation is achieved. In fact, page-level information can be accessed globally, and how to improve it can be explored later.
