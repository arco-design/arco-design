import React, { CSSProperties } from 'react';
import { Button } from '@arco-design/web-react';
import cs from '../../utils/classNames';
import styles from './style/index.module.less';
import useLocale from '../../hooks/useLocale';
import { linkDocsArcoComponent } from '../../constant/links';

interface StartBtnProps {
  style?: CSSProperties;
  className?: string | string[];
}

export default function StartBtn(props: StartBtnProps) {
  const { className, style } = props;
  const classNames = cs(styles['start-btn'], 'home-btn', className);
  const locale = useLocale();

  return (
    <Button type="primary" href={linkDocsArcoComponent} className={classNames} style={style}>
      <span className={styles['start-btn-icon']} />
      {locale['startBtn.text']}
    </Button>
  );
}
