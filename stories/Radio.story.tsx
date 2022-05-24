/* eslint-disable no-console */
import React from 'react';
import { Radio, Tooltip } from '@self';

const RadioGroup = Radio.Group;

export const Demo = () => (
  <>
    <RadioGroup name="zhoujielun" defaultValue="jie">
      <Tooltip position="bottom" content="周杰伦">
        <Radio value="zhou">周</Radio>
      </Tooltip>
      <Radio value="jie">杰</Radio>
      <Radio disabled value="lun">
        伦
      </Radio>
    </RadioGroup>
    <RadioGroup
      onChange={(value) => {
        console.log(value);
      }}
      type="button"
      name="sing"
      defaultValue="jay"
    >
      <Tooltip content="许嵩">
        <Radio value="song">嵩</Radio>
      </Tooltip>
      <Radio value="jay">周杰伦</Radio>
      <Radio disabled value="eason">
        陈奕迅
      </Radio>
    </RadioGroup>
  </>
);

export default {
  title: 'Radio',
};
