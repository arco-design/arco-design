---
order: 5
title:
  zh-CN: 其他评分字符
  en-US: Custom Character
---

## zh-CN

可以将星星替换为其他字符，比如表情、字母，数字，字体图标甚至中文。

## en-US

Use `character` to customize the characters used in `Rate`.

```js
import { Rate } from '@arco-design/web-react';
import { IconHeartFill } from '@arco-design/web-react/icon';

function TextWrapper(props) {
  return (
    <div
      style={{
        width: 24,
        lineHeight: '24px',
        textAlign: 'center',
        fontSize: 16,
        fontWeight: 'bold',
      }}
    >
      {props.text}
    </div>
  );
}

const App = () => {
  return (
    <div>
      <Rate
        style={{ display: 'block', margin: '10px 0' }}
        defaultValue={3}
        character={<TextWrapper text="A" />}
      />
      <Rate
        style={{ display: 'block', margin: '10px 0' }}
        defaultValue={3}
        character={(index) => <TextWrapper text={index + 1} />}
      />
      <Rate
        style={{ display: 'block', margin: '10px 0' }}
        defaultValue={2.5}
        allowHalf
        character={<TextWrapper text="好" />}
      />
      <Rate
        style={{ display: 'block', margin: '10px 0' }}
        defaultValue={2.5}
        allowHalf
        character={
          <TextWrapper
            text={
              <IconHeartFill
                style={{
                  fontSize: 18,
                }}
              />
            }
          />
        }
      />
    </div>
  );
};

export default App;
```
