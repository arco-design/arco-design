import React from 'react';
import { Typography, ConfigProvider } from '@self';
import enUS from '@self/locale/en-US';

const mockText =
  'A design is a plan or specification for the construction of an object or system or for the implementation of an activity or process, or the result of that plan or specification in the form of a prototype, product or process. The verb to design expresses the process of developing a design. The verb to design expresses the process of developing a design. A design is a plan or specification for the construction of an object or system or for the implementation of an activity or process, or the result of that plan or specification in the form of a prototype, product or process. The verb to design expresses the process of developing a design. The verb to design expresses the process of developing a design.';

const num = 0.123232;
function App() {
  return (
    <div>
      <ConfigProvider locale={enUS}>
        <Typography.Paragraph ellipsis={{ rows: 2, showTooltip: true, expandable: true }}>
          {mockText}
        </Typography.Paragraph>
      </ConfigProvider>
      <Typography.Text copyable>{(num * 100).toFixed(2)} %</Typography.Text>
      <Typography.Paragraph editable>{(num * 100).toFixed(2)} %</Typography.Paragraph>
    </div>
  );
}

export default App;
