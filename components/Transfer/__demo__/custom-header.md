---
order: 10
title:
  zh-CN: 自定义标题栏
  en-US: Custom-Header
---

## zh-CN

`titleTexts` 允许传入 render 函数以完全自定义 Transfer 的标题栏，函数接收的参数为 `{ countTotal: number; countSelected: number; checkbox: ReactNode; clear: () => void }`。

## en-US

Pass render functions to `titleTexts` to completely customize the title bar of the Transfer. The parameter received by the function is `{ countTotal: number; countSelected: number; checkbox: ReactNode; clear: () => void }`.

```js
import { Transfer } from '@arco-design/web-react';
import { IconDelete } from '@arco-design/web-react/icon';

function App() {
  const dataSource = new Array(8).fill(null).map((_, index) => ({
    key: `${index + 1}`,
    value: `Option ${index + 1}`,
  }));
  const styleHeader = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  };
  return (
    <Transfer
      dataSource={dataSource}
      defaultTargetKeys={['1', '2', '3']}
      defaultSelectedKeys={['4', '6', '7']}
      titleTexts={[
        ({ countTotal, countSelected, checkbox }) => {
          return (
            <div style={styleHeader}>
              {`LEFT ${countSelected}-${countTotal}`}
              {checkbox}
            </div>
          );
        },
        ({ countTotal, countSelected, clear }) => {
          return (
            <div style={styleHeader}>
              {`RIGHT ${countSelected}-${countTotal}`}
              <IconDelete
                style={{ cursor: 'pointer', }}
                onClick={clear}
              />
            </div>
          );
        },
      ]}
    />
  );
}

export default App;
```
