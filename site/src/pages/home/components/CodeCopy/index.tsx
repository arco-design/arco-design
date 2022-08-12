import React, { useEffect, useRef, useState } from 'react';
import { IconCopy, IconCheckCircleFill } from '@arco-design/web-react/icon';
import ClipboardJS from 'clipboard';
import style from './style/index.module.less';

export default function CodeCopy(props) {
  const copyBtn = useRef(null);
  const [isCopySuccess, setCopySuccess] = useState(false);

  useEffect(() => {
    const clipboard = new ClipboardJS(copyBtn.current);
    clipboard.on('success', () => {
      setCopySuccess(true);

      setTimeout(() => {
        setCopySuccess(false);
      }, 2000);
    });
  }, []);

  let btnCls = style['code-copy-btn'];
  if (isCopySuccess) {
    btnCls += ` ${style['code-copy-btn-success']}`;
  }

  return (
    <div className={style['code-copy']}>
      <span className={style['code-copy-symbol']}>{'>'}</span>
      <span className={style['code-copy-content']}>
        <span className="language-bash" dangerouslySetInnerHTML={{ __html: props.code }} />
      </span>
      <span className={btnCls} ref={copyBtn} data-clipboard-text={props.copyText}>
        {isCopySuccess ? <IconCheckCircleFill /> : <IconCopy />}
      </span>
    </div>
  );
}
