/* eslint-disable no-console */
import React from 'react';
import { Cascader } from '@self';

const options = [
  {
    value: 'beijing',
    label: 'Beijing Municipality Very Long Option Text',
    children: [
      {
        value: 'Beijing',
        label: 'Beijing Urban Area Very Long Option Text',
        children: [
          {
            value: 'chaoyang',
            label: 'Chaoyang District Very Long Option Text',
            children: [
              {
                value: 'datunli',
                label: 'Datunli Subdistrict Very Long Option Text',
              },
            ],
          },
        ],
      },
    ],
  },
  {
    value: 'shanghai',
    label: 'Shanghai Municipality Very Long Option Text',
    children: [
      {
        value: 'shanghaishi',
        label: 'Shanghai Urban Area Very Long Option Text',
        children: [
          {
            value: 'huangpu',
            label: 'Huangpu District Very Long Option Text',
          },
        ],
      },
    ],
  },
];

const Demo1 = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
      <Cascader
        placeholder="Please select ..."
        style={{ width: 300 }}
        options={options}
        onChange={(value, option) => {
          console.log(value, option);
        }}
        allowClear
      />
    </div>
  );
};

export const Demo = () => <Demo1 />;
export default {
  title: 'Private Components/BugFix',
};
