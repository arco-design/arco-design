---
order: 6
title:
  zh-CN: useVerificationCode
  en-US: useVerificationCode
---

## zh-CN

通过 useVerificationCode 自定义验证码组件

## en-US

通过 useVerificationCode 自定义验证码组件


```js
import { Space } from "@arco-design/web-react";
import { useVerificationCode } from "@arco-design/web-react/hooks";


const App = () => {

  const inputRefList = React.useRef([]);

  const { filledValue, getInputProps } = useVerificationCode({
    getInputRefList: () => inputRefList.current || [],
    onFinish: (value) => {
      console.log(value);
    },
    onChange: (value) => {
      console.log(value);
    }
  });

  return (
    <div>
       <Space size="large">
        {filledValue.map((v, index) => {
          const inputProps = { ...getInputProps(index) };
          return (
            <input
              className="custom-code-input"
              ref={(node) => {
                inputRefList.current[index] = node;
              }}
              {...inputProps}
              onChange={(e) => {
                inputProps.onChange?.(e.target.value);
              }}
            />
          );
        })}
      </Space>
    </div>
  );
};

export default App;

```
```css

.custom-code-input {
  border: none;
  width: 32px;
  height: 32px;
  display: block;
  border-bottom: 2px solid var(--color-border-3);
  text-align: center;
}

.custom-code-input:focus {
  border-bottom-color: rgb(var(--primary-6));
}

```
