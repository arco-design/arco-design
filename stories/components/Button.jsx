import React from 'react';
import { Button } from '@self';
import { IconInfoCircleFill, IconExclamationCircleFill, IconCloseCircleFill } from '@self/icon';

class DemoButton extends React.Component {
  render() {
    return (
      <div>
        <Button style={{ margin: 20 }}>默认按钮</Button>
        <Button onClick={(event) => console.log(event)} type="primary" style={{ margin: 20 }}>
          <IconInfoCircleFill />
          主要按钮
        </Button>
        <Button type="warning" style={{ margin: 20 }}>
          <IconExclamationCircleFill />
          危险按钮
        </Button>
        <Button type="danger" style={{ margin: 20 }}>
          <IconCloseCircleFill />
          高危按钮
        </Button>
        <Button disabled type="primary" style={{ margin: 20 }}>
          失效按钮
        </Button>
        <Button type="dashed" style={{ margin: 20 }}>
          虚线按钮
        </Button>
        <Button type="text" style={{ margin: 20 }}>
          文字按钮
        </Button>
        <Button size="small" loading style={{ margin: 20 }} onClick={()=>console.log("!!!!!")}>
          Default
        </Button>
        <Button size="large" loading style={{ margin: 20 }} onClick={()=>console.log("~~~~")}>
          Default
        </Button>
        <Button size="large" type="primary" loading style={{ margin: 20 }}>
          Default
        </Button>
        <Button size="large" type="warning" loading style={{ margin: 20 }}>
          Default
        </Button>
        <Button size="large" type="danger" loading style={{ margin: 20 }}>
          Default
        </Button>
        <Button size="large" type="dashed" loading style={{ margin: 20 }}>
          Default
        </Button>
        <Button size="large" type="text" loading style={{ margin: 20 }}>
          Default
        </Button>
      </div>
    );
  }
}

export default DemoButton;
