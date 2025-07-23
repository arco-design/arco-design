import React from 'react';
import { InputTag } from '@self';

export const Demo = () => {
  const placeholder = 'Please input';
  return <InputTag defaultValue={['1', '2', '3']} dragToSort placeholder={placeholder} />;
};

export const MaxLengthDemo = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div>
        <p>限制输入长度为 10 个字符：</p>
        <InputTag placeholder="最多输入10个字符" maxLength={10} style={{ width: 300 }} />
      </div>

      <div>
        <p>带默认值的 maxLength 限制：</p>
        <InputTag
          defaultValue={['标签1', '标签2', '很长的标签内容']}
          placeholder="最多输入8个字符"
          maxLength={8}
          style={{ width: 300 }}
        />
      </div>
    </div>
  );
};

export default {
  title: 'InputTag',
};
