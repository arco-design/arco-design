import React from 'react';
import { Cascader } from '@self';

const getOptionList = (labelPrefix: string, valuePrefix: string, len: number) => {
  return Array(len)
    .fill(0)
    .map((_, index) => {
      return {
        label: `${labelPrefix}${index}`,
        value: `${valuePrefix}${index}`,
      };
    });
};
const options = getOptionList('选项', 'value', 10).map((item) => {
  return {
    ...item,
    children: getOptionList(`${item.label}-`, `${item.value}-`, 10).map((item2) => {
      return {
        ...item2,
        children: getOptionList(`${item2.label}-`, `${item2.value}-`, 30),
      };
    }),
  };
});

function Demo1() {
  const [value, setValue] = React.useState<(string | string[])[]>([]);

  return (
    <Cascader
      placeholder="Please select ..."
      style={{ width: 300 }}
      options={options}
      mode="multiple"
      allowClear
      maxTagCount={20}
      onChange={setValue}
      value={value}
    />
  );
}

export const Demo = () => <Demo1 />;

export default {
  title: 'Cascader',
};
