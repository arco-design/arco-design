import React from 'react';
import BannerText from './text';
import IconWall from './iconWall';
import styles from './style/index.module.less';
import ShowCaseLogo1 from '../../assets/banner/showcase_logo1.svg';
import ShowCaseLogo2 from '../../assets/banner/showcase_logo2.svg';
import ShowCaseLogo3 from '../../assets/banner/showcase_logo3.svg';
import ShowCaseLogo4 from '../../assets/banner/showcase_logo4.svg';
import ShowCaseLogo5 from '../../assets/banner/showcase_logo5.svg';
import ShowCaseLogo6 from '../../assets/banner/showcase_logo6.svg';
import ShowCaseLogo7 from '../../assets/banner/showcase_logo7.svg';
import ShowCaseLogo8 from '../../assets/banner/showcase_logo8.svg';

const GroupList = {
  left: [
    <ShowCaseLogo6 key={1} />,
    <ShowCaseLogo2 key={2} />,
    <ShowCaseLogo3 key={3} />,
    <ShowCaseLogo7 key={4} />,
  ],
  right: [
    <ShowCaseLogo5 key={1} />,
    <ShowCaseLogo1 key={2} />,
    <ShowCaseLogo4 key={3} />,
    <ShowCaseLogo8 key={4} />,
  ],
};

export default function () {
  return (
    <div className={styles['banner-wrapper']}>
      <IconWall IconList={GroupList.left} direction="left" />
      <BannerText />
      <IconWall IconList={GroupList.right} direction="right" />
    </div>
  );
}
