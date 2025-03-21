import React, { useState } from 'react';
import { ConfigProvider, Descriptions, Radio } from '@self';

const RadioGroup = Radio.Group;
const data = [
  {
    label: 'Name',
    value: 'Socrates',
  },
  {
    label: 'Mobile',
    value: '123-1234-1234',
  },
  {
    label: 'Residence',
    value: 'Beijing',
  },
  {
    label: 'Hometown',
    value: 'Beijing',
  },
  {
    label: 'Date of Birth',
    value: '2020-05-15',
    span: 2,
  },
  {
    label: 'Address',
    value: 'Yingdu Building, Zhichun Road, Beijing',
  },
];

type Size = 'mini' | 'small' | 'medium' | 'default' | 'large';

export const Demo = () => {
  const [size, setSize] = useState<Size>('default');
  return (
    <div>
      <RadioGroup
        value={size}
        options={['mini', 'small', 'medium', 'default', 'large']}
        onChange={(value) => setSize(value)}
        type="button"
        style={{ marginBottom: 20 }}
      />
      <p>use Descriptions props.size</p>
      <Descriptions border title="User Info" data={data} size={size} style={{ marginBottom: 20 }} />
      <p>use ConfigProvider props.size</p>
      <ConfigProvider size={size}>
        <Descriptions border title="User Info" data={data} style={{ marginBottom: 20 }} />
      </ConfigProvider>
      <Descriptions
        column={1}
        title="User Info"
        data={data}
        size={size}
        labelStyle={{ paddingRight: 40 }}
      />
    </div>
  );
};

export default {
  title: 'Descriptions',
};
