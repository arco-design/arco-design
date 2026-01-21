---
order: 10
title:
  zh-CN: 最大输入长度
  en-US: Max Length
---

## zh-CN

通过 `maxLength` 属性可以限制输入框的最大输入长度。

## en-US

You can limit the maximum input length of the input box through the `maxLength` property.

```js
import { InputTag, Space } from '@arco-design/web-react';

const App = () => {
  return (
    <Space direction="vertical" size="large">
      <div>
        <p>限制输入长度为 10 个字符：</p>
        <InputTag 
          placeholder="最多输入10个字符" 
          maxLength={10}
          style={{ width: 300 }}
        />
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
    </Space>
  );
};

export default App;
``` 