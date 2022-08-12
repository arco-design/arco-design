import React from 'react';
import {
  Button,
  Carousel,
  Divider,
  Skeleton,
  Rate,
  Slider,
  Switch,
  Badge,
  Space,
} from '@arco-design/web-react';
import {
  IconCommon,
  IconSubscribe,
  IconSubscribeAdd,
  IconSubscribed,
  IconUser,
} from '@arco-design/web-react/icon';
import cs from '../../utils/classNames';
import IconBall from '../../assets/banner/ic_ball.svg';
import IconArcoDesign from '../../assets/ic_arco.design.svg';
import IconFont from '../../assets/banner/ic_font.svg';
import IconReact from './iconReact';
import IconCode from '../../assets/banner/ic_code.svg';
import styles from './style/motion.module.less';
import useLocale from '../../hooks/useLocale';
import { bannerHeroPng } from '../../utils/cdn-resource';

export default function Motion(props) {
  const chartBarHeightList = [48, 58, 43, 33, 28, 18, 38, 33, 28];
  const imageSrc = [
    bannerHeroPng.heroBanner1,
    bannerHeroPng.heroBanner2,
    bannerHeroPng.heroBanner3,
  ];
  const locale = useLocale();

  return (
    <div className={cs(styles.wrapper, props.className, 'js-motion')}>
      <div className={styles.header}>
        <div className={styles.dots}>
          <i />
          <i />
          <i />
        </div>
        <div className={styles.url}>
          <IconBall />
          arco.design
        </div>
      </div>
      <div className={cs(styles.top, 'js-motion-top')}>
        <div className={styles.badge}>
          <IconArcoDesign className={styles['badge-icon']} />
          <Divider type="vertical" />
          <span className={styles['badge-text']}>{locale['banner.badge.title']}</span>
        </div>
        <div className={cs(styles['top-content'], 'js-motion-top-content')}>
          <div className={cs(styles['top-content-item-1'], 'js-motion-top-content-item-1')}>
            <div className={styles['icon-font']}>
              <IconFont />
            </div>
            <Skeleton
              text={{ rows: 4, width: [78, 78, 60, 60] }}
              image
              animation
              className={styles.skeleton}
            />
          </div>
          <div className={cs(styles['top-content-item-2'], 'js-motion-top-content-item-2')}>
            <div className={cs(styles.chart, 'js-motion-chart')}>
              {chartBarHeightList.map((height, index) => (
                <div
                  key={`${index}`}
                  className={styles['chart-bar']}
                  style={{ height, width: `calc(100% / ${chartBarHeightList.length} - 2px)` }}
                />
              ))}
            </div>
            <Carousel className={styles.carousel} autoPlay showArrow="hover">
              {imageSrc.map((src, index) => (
                <div key={index}>
                  <img src={src} alt="banner" style={{ width: '120%' }} />
                </div>
              ))}
            </Carousel>
          </div>
          <div className={cs(styles['top-content-item-3'], 'js-motion-top-content-item-3')}>
            <Button long type="primary" size="mini">
              Primary
            </Button>
            <Button long type="secondary" size="mini">
              Secondary
            </Button>
            <Button long type="dashed" size="mini">
              Dashed
            </Button>
            <Button long type="outline" size="mini">
              Outline
            </Button>
            <Button long type="text" size="mini">
              Text
            </Button>
          </div>
          <div className={cs(styles['top-content-item-4'], 'js-motion-top-content-item-4')}>
            <div className={cs(styles['color-panel'], 'js-motion-color-panel')}>
              {new Array(15).fill(null).map((_, index) => (
                <div key={index} className={styles['color-panel-item']} />
              ))}
            </div>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '2fr 1fr',
                gridGap: 20,
              }}
            >
              <div>
                <Rate
                  className={styles.rate}
                  allowHalf
                  defaultValue={2.5}
                  tooltips={['😠', '🙂', '😊', '😘', '😍']}
                />
                <Slider defaultValue={30} />
              </div>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-evenly',
                }}
              >
                <Switch size="small" />
                <Switch size="small" type="round" defaultChecked />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={cs(styles.bottom, 'js-motion-bottom')}>
        <div className={styles['bottom-item-1']}>
          <IconReact />
        </div>
        <div className={styles['bottom-item-2']}>
          <Space size={20} style={{ marginBottom: 12 }}>
            <Badge count={9} offset={[-6, 6]}>
              <div
                className={cs(
                  styles.avatar,
                  styles['avatar-circle'],
                  styles['avatar-large'],
                  styles['avatar-active']
                )}
              >
                <IconUser />
              </div>
            </Badge>
            <div className={cs(styles.avatar, styles['avatar-circle'], styles['avatar-medium'])}>
              <IconUser />
            </div>
            <div className={cs(styles.avatar, styles['avatar-circle'], styles['avatar-small'])}>
              <IconUser />
            </div>
            <div className={cs(styles.avatar, styles['avatar-circle'], styles['avatar-mini'])}>
              <IconUser />
            </div>
          </Space>
          <Space size={12}>
            <div className={cs(styles.avatar, styles['avatar-medium'])}>
              <IconSubscribeAdd />
            </div>
            <div className={cs(styles.avatar, styles['avatar-medium'])}>
              <IconSubscribe />
            </div>
            <div className={cs(styles.avatar, styles['avatar-medium'])}>
              <IconSubscribed />
            </div>
            <div className={cs(styles.avatar, styles['avatar-medium'])}>
              <IconCommon />
            </div>
          </Space>
        </div>
        <div className={styles['bottom-item-3']}>
          <IconCode className="js-motion-icon-code" />
        </div>
      </div>
    </div>
  );
}
