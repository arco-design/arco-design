import React from 'react';
import { Anchor } from '@self';

const AnchorLink = Anchor.Link;

export default {
  title: 'Anchor',
};

export const Demo = () => {
  return (
    <div>
      <Anchor direction="horizontal">
        <AnchorLink href="#content1" title="content 1" />
        <AnchorLink href="#content2" title="contentcontent 2" />
        <AnchorLink href="#content3" title="content 3" />
      </Anchor>
      <div id="content1" style={{ height: '100vh', background: 'var(--color-primary-light-1)' }}>
        {' '}
      </div>
      <div id="content2" style={{ height: '100vh', background: 'var(--color-danger-light-1)' }}>
        {' '}
      </div>
      <div id="content3" style={{ height: '100vh', background: 'var(--color-warning-light-1)' }}>
        {' '}
      </div>
    </div>
  );
};
