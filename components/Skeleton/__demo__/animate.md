---
order: 2
title:
  zh-CN: 动画
  en-US: Animation
---

## zh-CN

骨架屏显示动画效果。

## en-US

Display animation effects.

```js
import React from 'react';
import { Skeleton, Switch, Avatar, Typography } from '@arco-design/web-react';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    };
  }

  onChange = (value) => {
    this.setState({
      loading: !this.state.loading,
    });
  };

  render() {
    return (
      <div>
        <div style={{ marginBottom: 40 }}>
          <Typography.Text style={{ margin: '0 8px' }}>Animation</Typography.Text>
          <Switch
            style={{ verticalAlign: 'middle' }}
            size="small"
            onChange={this.onChange}
            checked={this.state.loading}
          />
        </div>
        <Skeleton
          loading={this.state.loading}
          text={{ width: '90%' }}
          image={{ shape: 'circle' }}
          animation
        >
          <div style={{ display: 'flex' }}>
            <Avatar size={50} style={{ margin: '0 20px' }}>
              Arco
            </Avatar>
            <Typography>
              <Typography.Paragraph style={{ margin: 0 }}>
                This is content, this is content, this is content
              </Typography.Paragraph>
              <Typography.Paragraph style={{ margin: 0 }}>
                This is content, this is content
              </Typography.Paragraph>
              <Typography.Paragraph style={{ margin: 0 }}>
                This is content, this is content
              </Typography.Paragraph>
            </Typography>
          </div>
        </Skeleton>
      </div>
    );
  }
}

export default App;
```
