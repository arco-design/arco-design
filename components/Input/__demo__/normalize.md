---
order: 11
title:
  zh-CN: 格式化输入值
  en-US: Normalize Value
---

## zh-CN

在指定时机对用户输入的值进行格式化处理，前后值不一致时，会触发 onChange

## en-US

Format the value entered by the user at the specified time, and when the previous and subsequent values are inconsistent, onChange will be triggered

```js
import { Input, Space,Typography } from '@arco-design/web-react';

const App = () => {
  return (
    <Space wrap size={20}>
      <div>
        <Typography.Paragraph>trim whitespace when out of focus：</Typography.Paragraph>
        <Input
          onChange={v => { console.log('current value: ', v); }}
          normalizeTrigger={['onBlur']}
          normalize={v => v ? v.trim() : v}
          style={{ width: 350 }}
        />
      </div>
      <div>

        <Typography.Paragraph>trim whitespace when press enter：</Typography.Paragraph>
        <Input
          onChange={v => { console.log('current value: ', v); }}
          normalize={v => v ? v.trim() : v}
          normalizeTrigger={['onPressEnter']}
          style={{ width: 350 }}
        />
      </div>
    </Space>
  );
};

export default App;
```
