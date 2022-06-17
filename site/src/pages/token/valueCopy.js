import React, { useEffect, useRef } from 'react';
import ClipboardJS from 'clipboard';
import { Message } from '@arco-design/web-react';

export default function ({ text }) {
  const ref = useRef(null);

  useEffect(() => {
    const clipboard = new ClipboardJS(ref.current);
    clipboard.on('success', () => {
      Message.success(`Copy Success!`);
    });

    clipboard.on('error', function (e) {
      Message.success(`Copy Failed! Please try again.`);
    });

    return () => {
      clipboard.destroy();
    };
  }, [text]);

  return (
    <span className="token-value" ref={ref} data-clipboard-text={text}>
      {text}
    </span>
  );
}
