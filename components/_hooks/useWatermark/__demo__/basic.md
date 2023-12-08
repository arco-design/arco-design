---
order: 0
title:
  zh-CN: 基本用法
  en-US: Basic
---

## zh-CN

通过 useWatermark 自定义水印组件

## en-US

通过 useWatermark 自定义水印组件


```js
import { useWatermark } from '@arco-design/web-react/hooks';

const CustomWatermark = (props) => {
  const { setWatermark } = useWatermark({});

  const containerRef = React.useRef();

  React.useEffect(() => {
    setWatermark({
      content: props.content,
      fontStyle: { color: 'pink' },
      getContainer: () => containerRef.current,
    });
  }, [containerRef.current]);

  return <div ref={containerRef} style={{position: 'relative'}}>{props.children}</div>;
};

const App = () => {
  return (
    <CustomWatermark content="CustomWatermark">
      <div style={{ height: 200, background: 'var(--color-primary-light-1)' }}></div>
    </CustomWatermark>
  );
};

export default App;

```
