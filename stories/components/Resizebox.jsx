import React, { useState } from 'react';
import { ResizeBox, Typography } from '@self';
import { IconDoubleLeft, IconDoubleRight } from '@self/icon';

const { Paragraph, Text } = Typography;

const panes = [
  { size: 0.2, collapsible: true },
  { size: 0.1, min: '50px' },
  {
    size: 0.1,
    resizable: false,
    collapsible: {
      prev: {
        icon: <IconDoubleLeft />,
        onClick: (_, collapsed, status, activeIndex) => {
          console.log('快速收缩：', collapsed, status, activeIndex);
        },
      },
      next: {
        icon: <IconDoubleRight />,
        onClick: (_, collapsed, status, activeIndex) => {
          console.log('快速收缩：', collapsed, status, activeIndex);
        },
      },
    },
    trigger: (prev, resize, next) => {
      return (
        <div
          style={{
            width: '12px',
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column',
            border: '1px solid #000000',
          }}
        >
          {prev}
          {resize}
          {next}
        </div>
      );
    },
  },
  {
    min: 0.2,
  },
];
function Demo() {
  const [offsets, setOffsets] = useState([]);
  return (
    <ResizeBox.SplitGroup
      onMoving={(_, sizes) => setOffsets(sizes)}
      className="resizebox-split-group-demo"
      style={{ height: 300, border: '1px solid #000000' }}
      panes={panes.map((obj, index) => ({
        content: (
          <div className="resizebox-split-group-demo-content">
            <Paragraph>
              <Paragraph>
                <Text mark>pane {index}</Text>
                <br />
                <Text code>min：{obj.min || 0}</Text>
                <br />
                <Text code>size： {obj.size || 'not set'}</Text>
                <br />
                <Text code>offset：{offsets[index] || 'initial'}</Text>
              </Paragraph>
            </Paragraph>
          </div>
        ),
        ...obj,
      }))}
    ></ResizeBox.SplitGroup>
  );
}

export default Demo;
