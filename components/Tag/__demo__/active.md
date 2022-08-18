---
order: 4
title:
  zh-CN: 动态编辑标签
  en-US: Active
---

## zh-CN

可动态添加和删除标签。

## en-US

Can add and delete tags dynamically.

```js
import { useState } from 'react';
import { Tag, Button, Input, Message, Space } from '@arco-design/web-react';
import { IconPlus } from '@arco-design/web-react/icon';

function App() {
  const [tags, setTags] = useState(['Tag 1', 'Tag 2', 'Tag 3']);
  const [showInput, setShowInput] = useState(false);
  const [inputValue, setInputValue] = useState('');

  function addTag() {
    if (inputValue) {
      tags.push(inputValue);
      setTags(tags);
      setInputValue('');
    }

    setShowInput(false);
  }

  function removeTag(removeTag) {
    const newTags = tags.filter((tag) => tag !== removeTag);
    setTags(newTags);
  }

  return (
    <Space size={20}>
      {tags.map((tag, index) => {
        return (
          <Tag
            key={tag}
            closable={index !== 0}
            onClose={() => removeTag(tag)}
          >
            {tag}
          </Tag>
        );
      })}
      {showInput ? (
        <Input
          autoFocus
          size="mini"
          value={inputValue}
          style={{ width: 84 }}
          onPressEnter={addTag}
          onBlur={addTag}
          onChange={setInputValue}
        />
      ) : (
        <Tag
          icon={<IconPlus />}
          style={{
            width: 84,
            backgroundColor: 'var(--color-fill-2)',
            border: '1px dashed var(--color-fill-3)',
            cursor: 'pointer',
          }}
          onClick={() => setShowInput(true)}
        >
          Add Tag
        </Tag>
      )}
    </Space>
  );
}

export default App;
```
