import React from 'react';
import BannerText from './text';
import IconWall from './iconWall';
import Circle from '../../assets/banner/circle.svg';
import DongCheDi from '../../assets/banner/dongchedi.svg';
import FanQie from '../../assets/banner/fanqie.svg';
import FanQieSmall from '../../assets/banner/fanqie-small.svg';
import Vcloud from '../../assets/banner/vcloud.svg';
import XiGua from '../../assets/banner/xigua.svg';
import YinQin from '../../assets/banner/yinqin.svg';
import styles from './style/index.module.less';

const GroupList = {
  left: [
    <Vcloud key="vcloud" />,
    <FanQie key="fanqie" />,
    <Circle key="circle" />,
    <YinQin key="yinqin" />,
  ],
  right: [
    <FanQieSmall key="fanqiesmall" />,
    <XiGua key="xigua" />,
    <Vcloud key="vcloud" />,
    <DongCheDi key="dongchedi" />,
  ],
};

export default function() {
  return (
    <div className={styles['banner-wrapper']}>
      <IconWall IconList={GroupList.left} direction="left" />
      <BannerText />
      <IconWall IconList={GroupList.right} direction="right" />
    </div>
  );
}
