import React from 'react';
import { IconArrowRight } from '@arco-design/web-react/icon';
import IcContact1 from '../../assets/ic_contact_1.svg';
import IcContact2 from '../../assets/ic_contact_2.svg';
import styles from './style/index.module.less';
import LogoWrapper from '../../components/LogoWrapper';
import useLocale from '../../hooks/useLocale';
import { linkDocsArcoComponent } from '../../constant/links';
import joinChat from '../../utils/joinChat';

export default function Footer() {
  const locale = useLocale();
  return (
    <div className={styles['section-wrapper']}>
      <div className={styles['footer-item']}>
        <LogoWrapper icon={<IcContact1 />} />
        <div className={styles['footer-item-content']}>
          <a className={styles['footer-item-name']} href={linkDocsArcoComponent}>
            {locale['footer.start.title']} <IconArrowRight />
          </a>
          <div className={styles['footer-item-desc']}>{locale['footer.start.desc']}</div>
        </div>
      </div>
      <div className={styles['footer-divider']} />
      <div className={styles['footer-item']}>
        <LogoWrapper icon={<IcContact2 />} />
        <div className={styles['footer-item-content']}>
          <div className={styles['footer-item-name']} onClick={joinChat}>
            {locale['footer.contact.title']} <IconArrowRight />
          </div>
          <div className={styles['footer-item-desc']}>{locale['footer.contact.desc']}</div>
        </div>
      </div>
    </div>
  );
}
