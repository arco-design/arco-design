import React from 'react';
import useIsMobile from '../../utils/useIsMobile';

import Content from './content';
import Images from './images';
import Products from './products';
import ImagesForMobile from './imagesForMobile';

import styles from './style/index.module.less';

export default function Banner() {
  const isMobile = useIsMobile();

  return (
    <div className={styles['banner-wrapper']} data-tracker-name="home-banner">
      <div className={styles['banner-content']}>
        <div className={styles['banner-content-left']}>
          <Content />
        </div>
        <div className={styles['banner-content-right']}>
          {isMobile && <ImagesForMobile />}
          {!isMobile && <Images />}
        </div>
      </div>
      <div className={styles['banner-footer']}>
        <Products />
      </div>
    </div>
  );
}
