---
order: 5
title:
  zh-CN: 自定义节点内容
  en-US: Custom Render Radio
---

## zh-CN

可以通过传入函数类型的 `children` 来自定义渲染单选节点。(`2.29.0`)

## en-US

Render radio nodes can be customized by passing a function of type 'children'.(`2.29.0`)

```js
import { Radio, Button, Space, Typography } from '@arco-design/web-react';

const App = () => {
  return (
    <div>
      <div style={{ marginBottom: 20 }}>
        <Radio.Group defaultValue={'Beijing'} name="button-radio-group">
          {['Beijing', 'Shanghai', 'Guangzhou'].map((item) => {
            return (
              <Radio key={item} value={item}>
                {({ checked }) => {
                  return (
                    <Button tabIndex={-1} key={item} shape="round" type={checked ? 'primary' : 'default'}>
                      {item}
                    </Button>
                  );
                }}
              </Radio>
            );
          })}
        </Radio.Group>
      </div>
      <Radio.Group name="card-radio-group">
        {[1, 2].map((item) => {
          return (
            <Radio key={item} value={item}>
              {({ checked }) => {
                return (
                  <Space
                    align="start"
                    className={`custom-radio-card ${checked ? 'custom-radio-card-checked' : ''}`}
                  >
                    <div className="custom-radio-card-mask">
                      <div className="custom-radio-card-mask-dot"></div>
                    </div>
                    <div>
                      <div className="custom-radio-card-title">Radio Card {item}</div>
                      <Typography.Text type="secondary">this is a text</Typography.Text>
                    </div>
                  </Space>
                );
              }}
            </Radio>
          );
        })}
      </Radio.Group>
    </div>
  );
};

export default App;
```

```css

input[name='button-radio-group']:focus-visible + .arco-btn {
  box-shadow: 0 0 0 2px var(--color-primary-light-3);
}

.custom-radio-card {
  padding: 10px 16px;
  border: 1px solid var(--color-border-2);
  border-radius: 4px;
  width: 250px;
  box-sizing: border-box;
}

.custom-radio-card-mask {
  height: 14px;
  width: 14px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 100%;
  border: 1px solid var(--color-border-2);
  box-sizing: border-box;
}

.custom-radio-card-mask-dot {
  width: 8px;
  height: 8px;
  border-radius: 100%;
}

.custom-radio-card-title {
  color: var(--color-text-1);
  font-size: 14px;
  font-weight: bold;
  margin-bottom: 8px;
}

input[name='card-radio-group']:focus-visible + .custom-radio-card {
  box-shadow: 0 0 0 2px var(--color-primary-light-3);
}

.custom-radio-card:hover,
.custom-radio-card-checked,
.custom-radio-card:hover .custom-radio-card-mask,
.custom-radio-card-checked .custom-radio-card-mask {
  border-color: rgb(var(--primary-6));
}

.custom-radio-card-checked {
  background-color: var(--color-primary-light-1);
}

.custom-radio-card:hover .custom-radio-card-title,
.custom-radio-card-checked .custom-radio-card-title {
  color: rgb(var(--primary-6));
}

.custom-radio-card-checked .custom-radio-card-mask-dot {
  background-color: rgb(var(--primary-6));
}
```
