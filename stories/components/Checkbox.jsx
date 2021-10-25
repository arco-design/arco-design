import React from 'react';
import { Checkbox, Divider, Button } from '@self';

const CheckboxGroup = Checkbox.Group;
const options = [...Array(10)].map((_, i) => ({ label: `选项${i}`, value: i }));

function Demo1() {
  const {
    selected,
    selectAll,
    setSelected,
    unSelectAll,
    isAllSelected,
    isPartialSelected,
    toggle,
  } = Checkbox.useCheckbox(
    options.map((x) => x.value),
    [1, 2]
  );

  return (
    <div>
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
        全选
      </Checkbox>
      <Checkbox
        style={{ marginLeft: 16 }}
        onChange={() => {
          toggle();
        }}
      >
        反选
      </Checkbox>
      <Divider />
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
        全选
      </Checkbox>
      <Checkbox
        style={{ marginLeft: 16 }}
        onChange={() => {
          toggle();
        }}
      >
        反选
      </Checkbox>
      <Divider />
      {options.map((option) => {
        return (
          <Checkbox
            style={{ marginRight: 16 }}
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

const options2 = options.map((x, i) => {
  return {
    value: x.value,
    label: '选项' + x.value,
    disabled: !(i % 2),
  };
});

function Demo3() {
  const { selected, setSelected } = Checkbox.useCheckbox(
    options2.map((x) => x.value),
    [1, 2]
  );

  return (
    <div>
      <a
        type="text"
        onClick={() => {
          setSelected(options2.filter((x) => !x.disabled).map((x) => x.value));
        }}
      >
        选择未禁用
      </a>
      <Divider />
      <CheckboxGroup value={selected} onChange={setSelected} options={options2}></CheckboxGroup>
    </div>
  );
}

export default function Demo() {
  return (
    <div>
      <p>复选框组：</p>
      <Demo1 />
      <Divider />
      <p>单个复选框:</p>
      <Demo2 />
      <p>存在禁用</p>
      <Demo3 />
    </div>
  );
}
