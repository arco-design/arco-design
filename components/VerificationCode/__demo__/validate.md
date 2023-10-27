---
order: 5
title:
  zh-CN: 校验与格式化输入
  en-US: Validation and formatted input
---

## zh-CN

通过 validate 校验输入。此外，可以返回非布尔类型来将用户输入的字符串为特定的格式。

## en-US

Validate input via validate. Additionally, non-boolean types can be returned to format user-entered strings into a specific format.

```js
import { Grid, VerificationCode, Typography } from '@arco-design/web-react';

const App = () => {

  return (
    <div>
      <div style={{width: 200}}>
        <Typography.Paragraph>Only numbers can be entered: </Typography.Paragraph>
      </div>
      <VerificationCode
        style={{ width: 300 }}
        defaultValue="123456"
        validate={({ inputValue }) => {
          return /^\d*$/.test(inputValue) ? inputValue : false;
        }}
      />
      <br />
      <br />

      <div style={{width: 200}}>
        <Typography.Paragraph>Only `a-z` can be entered: </Typography.Paragraph>
      </div>

      <VerificationCode
        style={{ width: 300 }}
        defaultValue="abcdef"
        validate={({ inputValue }) => {
          return /^[a-zA-Z]*$/.test(inputValue) ? inputValue.toLowerCase() : false;
        }}
        />


    </div>
  );
};

export default App;

```
