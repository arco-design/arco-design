import React from 'react';
import { Anchor } from '@self';

const AnchorLink = Anchor.Link;

export default {
  title: 'Anchor',
};

export const Demo = () => (
  <div>
    <div
      className="scroll"
      style={{
        height: 150,
        width: 50,
        overflow: 'auto',
        border: '1px solid',
      }}
    >
      <div>
        {[...new Array(20)].map((_, i) => (
          <div key={i} id={`anchor${i}`}>
            <a href={`#anchor${i}`}>{i}</a>
            <p>{i}</p>
            <p>{i}</p>
            <p>{i}</p>
            <p>{i}</p>
            <p>{i}</p>
            <p>{i}</p>
            <p>{i}</p>
            <p>{i}</p>
            <p>{i}</p>
          </div>
        ))}
      </div>
    </div>
    <Anchor scrollContainer=".scroll" animation={false} hash={false}>
      {[...new Array(20)].map((_, i) => (
        <AnchorLink key={i} href={`#anchor${i}`} title={i} />
      ))}
    </Anchor>
  </div>
);
