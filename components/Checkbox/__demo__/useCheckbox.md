---
order: 5
title: useCheckbox
---

## zh-CN

使用 `useCheckbox` 快捷管理复选框数据

## en-US

`useCheckbox` hook offers an efficient way to manage checkbox state.


```js
import { useState } from 'react';
import { Checkbox, Divider, Button, Typography } from '@arco-design/web-react';
const CheckboxGroup = Checkbox.Group;
const useCheckbox = Checkbox.useCheckbox;
const options = [...Array(6)].map((_, i) => ({
  label: `Option ${i}`,
  value: i,
}));

function Demo1() {
  const {
    selected,
    selectAll,
    setSelected,
    unSelectAll,
    isAllSelected,
    isPartialSelected,
    toggle,
  } = useCheckbox(
    options.map((x) => x.value),
    [1, 2]
  );
  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <Checkbox
          onChange={(checked) => {
            if (checked) {
              selectAll();
            } else {
              unSelectAll();
            }
          }}
          checked={isAllSelected()}
          indeterminate={isPartialSelected()}
        >
          Check All
        </Checkbox>
        <Button
          size="small"
          type="primary"
          style={{ margin: '0 16px' }}
          onClick={() => { toggle() }}
        >
          Inverse Check
        </Button>
      </div>
      <CheckboxGroup value={selected} options={options} onChange={setSelected} />
    </div>
  );
}

function Demo2() {
  const {
    selectAll,
    isSelected,
    unSelectAll,
    isAllSelected,
    isPartialSelected,
    toggle,
    setValueSelected,
  } = Checkbox.useCheckbox(
    options.map((x) => x.value),
    [1, 2]
  );
  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <Checkbox
          onChange={(checked) => {
            if (checked) {
              selectAll();
            } else {
              unSelectAll();
            }
          }}
          checked={isAllSelected()}
          indeterminate={isPartialSelected()}
        >
          Check All
        </Checkbox>

        <Button
          size="small"
          type="primary"
          style={{ margin: '0 16px' }}
          onClick={() => {
            toggle();
          }}
        >
          Inverse Check
        </Button>
      </div>
      {options.map((option) => {
        return (
          <Checkbox
            key={option.value}
            style={{ margin: '0 16px' }}
            checked={isSelected(option.value)}
            value={option.value}
            onChange={(checked) => {
              setValueSelected(option.value, checked);
            }}
          >
            {option.label}
          </Checkbox>
        );
      })}
    </div>
  );
}

function Demo3() {
  const options2 = options.map((x, i) => {
    return {
      value: x.value,
      label: 'Option' + x.value,
      disabled: !(i % 2),
    };
  });
  const { selected, setSelected } = Checkbox.useCheckbox(
    options2.map((x) => x.value),
    [1, 2]
  );
  return (
    <div>
      <div
        style={{ margin: '16px 0' }}
      >
        <Button
          size="small"
          type="primary"
          onClick={() => {
            setSelected(options2.filter((x) => !x.disabled).map((x) => x.value));
          }}
        >
          Check undisabled Options
        </Button>
      </div>
      <CheckboxGroup value={selected} onChange={setSelected} options={options2}></CheckboxGroup>
    </div>
  );
}

const App = () => {
  return (
    <div>
      <Typography.Paragraph
        style={{ margin: '20px 0' }}
      >
        Checkbox group
      </Typography.Paragraph>
      <Demo1 />
      <Divider />
      <Typography.Paragraph
        style={{ margin: '20px 0' }}
      >
        Checkbox
      </Typography.Paragraph>
      <Demo2 />
      <Divider />
      <Typography.Paragraph>Checkbox group with disabled items</Typography.Paragraph>
      <Demo3 />
    </div>
  );
};

export default App;
```
