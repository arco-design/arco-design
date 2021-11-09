import React, { ReactNode, CSSProperties } from 'react';
import { teaLog } from '@arco-design/arco-site-utils';
import styles from './index.module.less';
import IconRoundArrow from '../../../../assets/ic_round_arrow.svg';
import IconCommonArrow from '../../../../assets/ic_common_arrow.svg';
import cs from '../../../../utils/classNames';
import { EventMap } from '../../../../utils/eventMap';

interface ResourceItem {
  logo?: ReactNode;
  href: string;
  name: string;
}

interface ResourceCardProps {
  type?: 'dark' | 'blue';
  title: string;
  href: string;
  description: string;
  bodyResourceList: ResourceItem[];
  footerResourceList: ResourceItem[];
  bodyStyle?: CSSProperties;
}

export default function ResourceCard(props: ResourceCardProps) {
  const {
    type = 'blue',
    title,
    href,
    description,
    bodyResourceList,
    footerResourceList,
    bodyStyle,
  } = props;

  const openLink = (link: string) => {
    if (link) {
      window.open(link);
    }
  };

  const reportTea = (resource: ResourceItem) => {
    teaLog(EventMap.clickResourceBtn, {
      menu: title,
      name: resource.name,
      link: resource.href,
      target: '_blank',
    });
  };

  return (
    <div
      className={cs(styles.card, {
        [styles['card-dark']]: type === 'dark',
      })}
    >
      <div className={styles['card-header']}>
        <div className={styles['card-header-left']}>
          <div className={styles['card-title']}>{title}</div>
          <div className={styles['card-desc']}>{description}</div>
        </div>
        <div className={styles['card-header-right']}>
          <div className={styles['card-link']} onClick={() => openLink(href)}>
            <IconRoundArrow />
          </div>
        </div>
      </div>
      <div className={styles['card-body']} style={bodyStyle}>
        <div className={styles['card-body-resource-list']}>
          {bodyResourceList.map(({ name, href, logo }) => (
            <div
              className={styles['card-body-resource-item']}
              key={name}
              onClick={() => {
                openLink(href);
                reportTea({ name, href, logo });
              }}
            >
              <div className={styles['card-body-resource-item-logo']}>{logo}</div>
              <div className={styles['card-body-resource-item-name']}>{name}</div>
            </div>
          ))}
        </div>
      </div>
      <div className={styles['card-footer']}>
        {footerResourceList.map(({ name, href, logo }) => (
          <div
            className={styles['card-footer-resource-item']}
            key={name}
            onClick={() => {
              openLink(href);
              reportTea({ name, href, logo });
            }}
          >
            {logo && <div className={styles['card-footer-resource-item-logo']}>{logo}</div>}
            <div className={styles['card-footer-resource-item-name']}>{name}</div>
            <div className={styles['card-footer-resource-item-arrow']}>
              <IconCommonArrow />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
