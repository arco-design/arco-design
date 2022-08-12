import React from 'react';
import { mobileHeroJpg } from '../../utils/cdn-resource';
import useTheme from '../../hooks/useTheme';
import styles from './style/images-for-mobile.module.less';

export default function ImagesForMobile() {
  const { realTheme } = useTheme();
  const img = realTheme === 'dark' ? mobileHeroJpg.heroDark : mobileHeroJpg.hero;
  return (
    <div className={styles.wrapper}>
      <img src={img} />
    </div>
  );
}
