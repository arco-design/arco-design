import React, { useContext } from 'react';
import styles from './style/text.module.less';
import { GlobalContext } from '../../../../context';
import SloganHighLight from '../../assets/banner/banner-slogan.svg';

interface IGlobalContext {
  lang: 'zh-CN' | 'en-US';
  locale: { [key: string]: string };
}

export default function BannerContent() {
  const { locale, lang } = useContext(GlobalContext) as IGlobalContext;

  return (
    <div className={`${styles['banner-text-wrapper']} ${styles[`banner-text-wrapper-${lang}`]}`}>
      <div className={styles['banner-single-text']}>{locale['customer.banner.single.title']}</div>

      {lang === 'en-US' ? (
        <div className={`${styles['banner-slogan']} ${styles['banner-slogan-en']}`}>
          <div className={styles['banner-slogan-highlight']}>
            {locale['customer.banner.slogan.1']}
            <div className={styles['banner-slogan-highlight-svg']}>
              <SloganHighLight />
            </div>
          </div>
          {` ${locale['customer.banner.slogan.2']}`}
        </div>
      ) : (
        <div className={styles['banner-slogan']}>
          <div>{locale['customer.banner.slogan.1']}</div>
          <div className={styles['banner-slogan-highlight']}>
            {locale['customer.banner.slogan.2']}
            <div className={styles['banner-slogan-highlight-svg']}>
              <SloganHighLight />
            </div>
          </div>
        </div>
      )}

      <div className={styles['banner-description']}>{locale['customer.banner.description']}</div>
    </div>
  );
}
