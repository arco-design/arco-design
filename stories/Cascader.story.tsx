/* eslint-disable no-console */
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
    children: getOptionList(`${item.label}-`, `${item.value}-`, 1000),
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
      virtualListProps={{}}
    />
  );
}

export const Demo = () => <Demo1 />;

export const LabelDemo = () => {
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
              label: <span>dd</span>,
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
  ];

  return (
    <Cascader
      placeholder="Please select ..."
      // inputValue="dongcheng"
      style={{ width: 300, marginBottom: 20 }}
      options={options}
      // defaultValue={['shanghai', 'shanghaishi', 'huangpu']}
      filterOption={(input, node) => {
        // console.log(node);
        return node.value.indexOf(input) > -1;
      }}
      showSearch
      allowClear
    />
  );
};

export default {
  title: 'Cascader',
};
