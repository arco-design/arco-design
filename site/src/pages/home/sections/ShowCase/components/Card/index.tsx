import React from 'react';
import { IconArrowRight } from '@arco-design/web-react/icon';
import styles from './index.module.less';
import { ShowCaseCardProps } from '../../../../../../hooks/useShowCase';

export default function ShowCaseCard(props: ShowCaseCardProps) {
  const { logo, content, image, data, link, title } = props;
  return (
    <div className={styles.card} onClick={() => window.open(`/showcase#${title}`, '_blank')}>
      <div className={styles['card-left']}>
        <img width={550} height={344} src={image} className={styles['card-image']} />
      </div>
      <div className={styles['card-right']}>
        <div className={styles['card-logo']}>{logo}</div>
        <div className={styles['card-content']}>{content}</div>
        {data?.length &&
          data.map((item, index) => (
            <div className={styles['card-data']} key={index}>
              <div className={styles['card-data-label']}>{item.label}</div>
              <div className={styles['card-data-text']}>{item.text}</div>
            </div>
          ))}
        {link?.length &&
          link.map((item, index) => (
            <a href={item.href} key={index} className={styles['card-link']}>
              <div className={styles['card-link-left']}>
                <div className={styles['card-link-logo']}>{item.logo}</div>
                <div className={styles['card-link-name']}>{item.name}</div>
              </div>
              <div className={styles['card-link-arrow']}>
                <IconArrowRight />
              </div>
            </a>
          ))}
      </div>
    </div>
  );
}
