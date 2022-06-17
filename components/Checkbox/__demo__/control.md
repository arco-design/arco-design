---
order: 2
title:
  zh-CN: 受控
  en-US: Controlled
---

## zh-CN

通过 `checked` 属性控制是否选中

## en-US

Control whether the check box is selected

```js
import React from 'react';
import { Checkbox, Button } from '@arco-design/web-react';

function App() {
  const [checked, setChecked] = React.useState(false);
  return (
    <div>
      <Checkbox
        checked={checked}
        style={{ marginRight: 40 }}
      >
        Checkbox
      </Checkbox>
      <Checkbox checked={checked} disabled>
        disabled Checkbox
      </Checkbox>

      <div style={{ marginTop: 30 }}>
        <Button
          type="primary"
          onClick={() => {
            setChecked(!checked);
          }}
        >
          {checked ? 'unCheck' : 'Check'}
        </Button>
      </div>
    </div>
  );
}

export default App;
```
