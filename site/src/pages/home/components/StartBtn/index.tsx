import React, { CSSProperties } from 'react';
import { Button } from '@arco-design/web-react';
import cs from '../../utils/classNames';
import styles from './style/index.module.less';
import useLocale from '../../hooks/useLocale';
import { linkDocsArcoComponent } from '../../constant/links';

interface StartBtnProps {
  style?: CSSProperties;
  className?: string | string[];
  reportTea?: (params: any) => void;
}

export default function StartBtn(props: StartBtnProps) {
  const { className, style, reportTea } = props;
  const classNames = cs(styles['start-btn'], 'home-btn', className);
  const locale = useLocale();
  return (
    <Button
      type="primary"
      href={linkDocsArcoComponent}
      className={classNames}
      style={style}
      onClick={() => {
        reportTea &&
          reportTea({
            name: locale['startBtn.text'],
            link: linkDocsArcoComponent,
            target: '_self',
          });
      }}
    >
      <span className={styles['start-btn-icon']} />
      {locale['startBtn.text']}
    </Button>
  );
}
