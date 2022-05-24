/* eslint-disable no-console */
import React from 'react';
import { Input } from '@self';
import { IconCheckCircleFill, IconBook } from '@self/icon';

const { Search, TextArea } = Input;

export const Demo = () => (
  <div
    style={{
      padding: 10,
      boxSizing: 'border-box',
      display: 'flex',
      flexDirection: 'column',
    }}
  >
    <Input
      value="Arco Design"
      onChange={(value) => {
        console.log(value);
      }}
      placeholder="Please enter ..."
      style={{ marginTop: 10 }}
    />
    <Input placeholder="输入错误" error style={{ marginTop: 10 }} />
    <Input placeholder="不可输入状态" error style={{ marginTop: 10 }} disabled />
    <Input
      placeholder="test"
      addBefore={<span>addBefore</span>}
      addAfter={<span>addAfter</span>}
      allowClear
      prefix={<IconBook />}
      suffix={<IconCheckCircleFill />}
      style={{ marginTop: 10 }}
    />
    <Search
      placeholder="please enter search text"
      onSearch={(value) => {
        console.log(value);
      }}
      style={{ marginTop: 10 }}
      searchButton
    />
    <Search
      defaultValue="This is a search input"
      onSearch={(value) => {
        console.log(value);
      }}
      style={{ marginTop: 10 }}
    />
    <TextArea
      style={{ marginTop: 20, resize: 'none' }}
      autoSize={{ minRows: 1, maxRows: 6 }}
      placeholder="please enter..."
      onPressEnter={(e) => {
        console.log(e);
      }}
    />
  </div>
);

export default {
  title: 'Input',
};
