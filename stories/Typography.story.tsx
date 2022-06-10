import React, { useState } from 'react';
import { Typography, Button } from '@self';

const DemoExpand = () => {
  const [expandable, setExpandable] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const ellipsisProps = { rows: 1, expandable, onExpand: setExpanded, expanded };

  return (
    <div>
      <Typography.Paragraph editable={{ onChange: (s) => console.log(s) }}>
        Hello world
      </Typography.Paragraph>
    </div>
  );
};

export const Expand = () => <DemoExpand />;

export default {
  title: 'Typography',
};
