/* eslint-disable no-console */
import React, { StrictMode, forwardRef } from 'react';
import { Trigger, Space, Typography, Tooltip } from '@self';

function Son(props) {
  return <div {...props}>Son</div>;
}

function Son2(props, ref) {
  return (
    <div {...props} ref={ref}>
      ForardRefSon
    </div>
  );
}

function Popup() {
  return (
    <div className="demo-trigger-popup" style={{ width: 300 }}>
      <Tooltip content="123" defaultPopupVisible>
        <span>123123</span>
      </Tooltip>
    </div>
  );
}

const ForardRefSon = forwardRef(Son2);

class Child extends React.Component {
  render() {
    return <div {...this.props}>Child</div>;
  }
}

export const Demo = () => (
  <StrictMode>
    <div
      style={{
        padding: 10,
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Space>
        {/* <Trigger popup={Popup}>
        <span>{`<span></span>`}</span>
      </Trigger>

      <Trigger popup={Popup}>string</Trigger>
      <Trigger popup={Popup}>{1}</Trigger> */}

        <Trigger
          popup={() => (
            <div className="demo-trigger-popup" style={{ width: 300 }}>
              <Tooltip content="123" defaultPopupVisible>
                <span>123123</span>
              </Tooltip>
            </div>
          )}
        >
          <span>123</span>
        </Trigger>

        {/* <Trigger popup={Popup}>
        <Son />
      </Trigger>
      <Trigger popup={Popup}>
        <ForardRefSon />
      </Trigger> */}
      </Space>
    </div>
  </StrictMode>
);

export default {
  title: ' Trigger',
};
