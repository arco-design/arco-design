---
order: 1
title:
  zh-CN: 主题配置
  en-US: Theme
skip: true
---

配置组件主题，可以配置颜色等基本参数。

```js
import { useState } from 'react';
import { ConfigProvider, Button, Input, Radio } from '@arco-design/web-react';
const themes = {
  blue: {
    primaryColor: '#3370ff',
  },
  red: {
    primaryColor: '#ee4d38',
  },
  green: {
    primaryColor: '#0fbf60',
  },
  orange: {
    primaryColor: '#f58505',
  },
};

function App() {
  const [theme, setTheme] = useState(null);
  return (
    <ConfigProvider theme={theme && themes[theme]}>
      <Radio.Group
        name="theme"
        options={['blue', 'red', 'green', 'orange']}
        onChange={(theme) => {
          setTheme(theme);
        }}
        style={{ display: 'block', marginBottom: 40 }}
      />
      <Button
        style={{ marginRight: 40 }}
        type="primary"
      >
        Button
      </Button>
      <Input
        style={{ width: 200 }}
        placeholder="Please Enter ..."
      />
    </ConfigProvider>
  );
}

export default App;
```
