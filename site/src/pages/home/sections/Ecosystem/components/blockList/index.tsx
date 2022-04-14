import React, { useRef } from 'react';
import { Message } from '@arco-design/web-react';
import Block from '../block';
import styles from './index.module.less';
import useLocale from '../../../../hooks/useLocale';
import cs from '../../../../utils/classNames';
import { EcosystemItem } from '../../interface';

export default function EcosystemBlockList({
  list,
  animation,
  reportTea,
}: {
  list: EcosystemItem[];
  animation?: boolean;
  reportTea?: (item: EcosystemItem) => void;
}) {
  const locale = useLocale();
  const blockListRef = useRef<HTMLDivElement>();

  return (
    <div className={styles['block-list']} ref={blockListRef}>
      {list.map(({ href, ...item }) => (
        <Block
          key={item.name}
          className={cs(styles['block-item'], 'js-ecosystem-block-item')}
          name={item.name}
          logo={item.logo}
          logoPlaceholder={item.logoPlaceholder || item.logo}
          desc={item.desc}
          image={item.image}
          waiting={!href}
          data-aos={animation ? 'scale-fade-in' : undefined}
          onClick={() => {
            reportTea && reportTea({ href, ...item });
            if (href) {
              window.open(href);
            } else {
              Message.info(locale['global.message.waiting']);
            }
          }}
        />
      ))}
    </div>
  );
}
