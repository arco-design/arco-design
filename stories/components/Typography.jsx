import React, { useState } from 'react';
import { Typography, Button } from '@self';

const defaultText = `A design is a plan or specification for the construction of an object or system or for the
implementation of an activity or process. A design is a plan or specification for the
construction of an object or system or for the implementation of an activity or process. A design is a plan or specification for the construction of an object or system or for the
implementation of an activity or process. A design is a plan or specification for the
construction of an object or system or for the implementation of an activity or process. `;

const Demo = () => {
  const [expandable, setExpandable] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const ellipsisProps = { rows: 1, expandable, onExpand: setExpanded, expanded };

  console.log(expanded);
  return (
    <div>
      <Button onClick={() => setExpandable(!expandable)}>
        {!expandable ? '显示按钮' : '不显示按钮'}
      </Button>
      <Button onClick={() => setExpanded(!expanded)} style={{ marginLeft: '10px' }} type="primary">
        {expanded ? '折叠' : '展开'}
      </Button>
      <Typography.Text code ellipsis={ellipsisProps}>
        {defaultText}
      </Typography.Text>
      <Typography.Text mark ellipsis={ellipsisProps}>
        {defaultText}
      </Typography.Text>
    </div>
  );
};

export default Demo;
