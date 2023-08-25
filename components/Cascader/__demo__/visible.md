---
order: 15
title:
  zh-CN: 控制下拉框的展开收起
  en-US: Visibility of dropdown
---

## zh-CN
通过 popupVisible 和 onVisibleChange 控制下拉框的展开和收起。
更多示例可查看[Trigger](/react/en-US/components/trigger)组件文档

## en-US

Use `popupVisible` and `onVisibleChange` to control the visibility of the dropdown.

More examples can be found in [Trigger](/react/en-US/components/trigger).

```js
import React from 'react';
import { Cascader, Message, Link, Button } from '@arco-design/web-react';

const options = [
  {
    value: 'beijing',
    label: 'Beijing',
    children: [
      {
        value: 'Beijing',
        label: 'Beijing',
        children: [
          {
            value: 'chaoyang',
            label: 'Chaoyang',
            children: [
              {
                value: 'datunli',
                label: 'Datunli',
              },
            ],
          },
          {
            value: 'dongcheng',
            label: 'Dongcheng',
          },
          {
            value: 'xicheng',
            label: 'Xicheng',
          },
          {
            value: 'haidian',
            label: 'Haidian',
          },
          {
            value: 'fengtai',
            label: 'fengtai',
          },
          {
            value: 'shijingshan',
            label: 'Shijingshan',
          },
          {
            value: 'mentougou',
            label: 'Mentougou',
          },
          {
            value: 'fangshan',
            label: 'Fangshan',
          },
          {
            value: 'tongzhou',
            label: 'Tongzhou',
          },
          {
            value: 'shunyi',
            label: 'Shunyi',
          },
        ],
      },
    ],
  },
  {
    value: 'shanghai',
    label: 'Shanghai',
    children: [
      {
        value: 'shanghaishi',
        label: 'Shanghai',
        children: [
          {
            value: 'huangpu',
            label: 'Huangpu',
          },
        ],
      },
    ],
  },
  {
    value: 'guangzhou',
    label: 'guangzhou',
  },
  {
    value: 'shenzhen',
    label: 'Shenzhen',
  },
  {
    value: 'hangzhou',
    label: '杭州',
  },
];

function App() {
  const [visible, setVisible] = React.useState(false);
  return (
    <div>
      <p>
        <Button
          style={{ marginRight: 20 }}
          onClick={() => {
            setVisible(!visible);
          }}
        >
          Show Menu
        </Button>
      </p>
      <Cascader
        style={{ width: 300, marginTop: 20 }}
        placeholder="Please select ..."
        popupVisible={visible}
        trigger={[]} // 具体触发时机可查看Trigger组件文档
        onVisibleChange={setVisible}
        triggerProps={{
          clickOutsideToClose: false,
        }}
        allowClear
        options={options}
        renderFooter={() => {
          return (
            <Link
              onClick={() => {
                setVisible(false);
              }}
            >
              Close
            </Link>
          );
        }}
      />
    </div>
  );
}

export default App;
```
