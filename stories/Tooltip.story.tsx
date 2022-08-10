import React, { Component } from 'react';
import { Tooltip, Button } from '@self';
import { TooltipHandle } from '@self/Tooltip';

class DemoTooltip extends Component {
  ref: TooltipHandle | null = null;

  state: {
    left: number;
  } = {
    left: 0,
  };

  constructor(props: {}) {
    super(props);
  }

  componentDidMount() {
    let i = 0;
    const timer = setInterval(() => {
      if (i > 400) {
        clearInterval(timer);
      }
      this.setState(
        {
          left: i++ * 2,
        },
        () => {
          this.ref?.updatePopupPosition();
        }
      );
    }, 10);
  }

  render() {
    const { left } = this.state;
    return (
      <div>
        <div style={{ position: 'relative', width: 400, height: 400 }}>
          <Tooltip position="tl" trigger="hover" content="上左～～～">
            <Button style={{ position: 'absolute', top: 20, left: 70 }}>上左</Button>
          </Tooltip>
          <Tooltip position="top" trigger="hover" content="上～～～">
            <Button style={{ position: 'absolute', top: 20, left: 180 }}>上边</Button>
          </Tooltip>
          <Tooltip position="tr" trigger="hover" content="上右～～～">
            <Button style={{ position: 'absolute', top: 20, left: 290 }}>上右</Button>
          </Tooltip>
          <Tooltip position="lt" trigger="hover" content="左上～～～">
            <Button style={{ position: 'absolute', top: 60, left: 10 }}>左上</Button>
          </Tooltip>
          <Tooltip position="left" trigger="hover" content="左～～～">
            <Button style={{ position: 'absolute', top: 120, left: 10 }}>左边</Button>
          </Tooltip>
          <Tooltip position="lb" trigger="hover" content="左下～～～">
            <Button style={{ position: 'absolute', top: 180, left: 10 }}>左下</Button>
          </Tooltip>
          <Tooltip position="rt" trigger="hover" content="右上～～～">
            <Button style={{ position: 'absolute', top: 60, left: 350 }}>右上</Button>
          </Tooltip>
          <Tooltip position="right" trigger="hover" content="右边～～～">
            <Button style={{ position: 'absolute', top: 120, left: 350 }}>右边</Button>
          </Tooltip>
          <Tooltip position="rb" trigger="hover" content="右下～～～">
            <Button style={{ position: 'absolute', top: 180, left: 350 }}>右下</Button>
          </Tooltip>
          <Tooltip position="bl" trigger="hover" content="下左～～～">
            <Button style={{ position: 'absolute', top: 226, left: 70 }}>下左</Button>
          </Tooltip>
          <Tooltip position="bottom" trigger="hover" content="下边～～～">
            <Button style={{ position: 'absolute', top: 226, left: 180 }}>下边</Button>
          </Tooltip>
          <Tooltip position="br" trigger="hover" content="下右～～～">
            <Button style={{ position: 'absolute', top: 226, left: 290 }}>下右</Button>
          </Tooltip>
        </div>
        <div>
          <Tooltip popupVisible ref={(ref) => (this.ref = ref)} content="TOP!!!!!">
            <Button style={{ marginLeft: left, transition: 'none' }}>Top</Button>
          </Tooltip>
        </div>
      </div>
    );
  }
}

export const Demo = () => <DemoTooltip />;

export default {
  title: 'Tooltip',
};
