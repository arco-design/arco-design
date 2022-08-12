import React, { CSSProperties } from 'react';
import { Space } from '@arco-design/web-react';
import styles from './index.module.less';
import IconArcoA from '../../../../assets/arco_a.svg';
import IconArcoR from '../../../../assets/arco_r.svg';
import IconArcoC from '../../../../assets/arco_c.svg';
import IconArcoO from '../../../../assets/arco_o.svg';
import useLocale from '../../../../hooks/useLocale';
import useIsMobile from '../../../../utils/useIsMobile';

interface DesignValuesProps {
  style?: CSSProperties;
}

export default function DesignValues({ style }: DesignValuesProps) {
  const locale = useLocale();
  const isMobile = useIsMobile();
  const designValueList = [
    {
      icon: <IconArcoA />,
      title: locale['resource.designValue.title.a'],
      description: locale['resource.designValue.desc.a'],
    },
    {
      icon: <IconArcoR />,
      title: locale['resource.designValue.title.r'],
      description: locale['resource.designValue.desc.r'],
    },
    {
      icon: <IconArcoC />,
      title: locale['resource.designValue.title.c'],
      description: locale['resource.designValue.desc.c'],
    },
    {
      icon: <IconArcoO />,
      title: locale['resource.designValue.title.o'],
      description: locale['resource.designValue.desc.o'],
    },
  ];
  return (
    <div className={styles.wrapper} style={style}>
      <Space
        size={20}
        style={{ display: 'flex', justifyContent: 'space-between' }}
        direction={isMobile ? 'vertical' : 'horizontal'}
      >
        {designValueList.map(({ icon, title, description }) => (
          <Space size={20} key={title}>
            <div>{icon}</div>
            <div>
              <div className={styles.title}>{title}</div>
              <div className={styles.desc}>{description}</div>
            </div>
          </Space>
        ))}
      </Space>
    </div>
  );
}
