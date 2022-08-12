import React, { useEffect } from 'react';
import Parallax from 'parallax-js';
import anime from 'animejs';
import LogoArcoMaterial from '../../assets/logo_ArcoMaterial_w.svg';
import LogoArcoPro from '../../assets/logo_ArcoPro_w.svg';
import LogoFigma from '../../assets/logo_Figma_w.svg';
import LogoDesignLab from '../../assets/logo_DesignLab_w.svg';
import cs from '../../utils/classNames';
import Motion from './motion';
import styles from './style/images.module.less';

const chartBarHeightList = [48, 58, 43, 33, 28, 18, 38, 33, 28];

const floatLogoList = [
  {
    logo: <LogoArcoMaterial />,
    depth: 0.1,
  },
  {
    logo: <LogoArcoPro />,
    depth: 0.2,
  },
  {
    logo: <LogoFigma />,
    depth: 0.1,
  },
  {
    logo: <LogoDesignLab />,
    depth: 0.05,
  },
  {
    logo: <LogoDesignLab />,
    depth: 0.14,
  },
  {
    logo: <LogoDesignLab />,
    depth: 0.04,
  },
  {
    logo: <LogoDesignLab />,
    depth: 0.05,
  },
];

export default function BannerImages() {
  useEffect(() => {
    anime
      .timeline()
      .add({
        targets: '.js-images-bg-light',
        opacity: [0, 1],
        duration: 200,
        easing: 'linear',
      })
      .add({
        targets: '.js-images-motion',
        translateY: ['110%', '0'],
        scale: [0.86, 1],
        duration: 1800,
        easing: 'easeInOutQuart',
      })
      .add(
        {
          targets: '.js-images-scene',
          opacity: [0, 1],
          scale: [0.9, 1],
          duration: 1000,
          easing: 'easeOutBack',
        },
        1450
      )
      .add(
        {
          targets: '.js-motion-chart > div',
          opacity: [0, 1],
          height: (_, i) => {
            return ['100%', chartBarHeightList[i]];
          },
          delay: (el, i, l) => anime.stagger(600 / l)(el, i, l),
        },
        1000
      )
      .add(
        {
          targets: '.js-motion-top-content-item-3 > button',
          opacity: [0, 1],
          delay: (el, i, l) => anime.stagger(600 / l)(el, i, l),
        },
        1000
      )
      .add(
        {
          targets: '.js-motion-color-panel > div',
          opacity: [0, 1],
          delay: (el, i, l) => anime.stagger(300 / l)(el, i, l),
        },
        1000
      )
      .add(
        {
          targets: `
           .js-motion-top-content > div,
            .js-motion-bottom > div
          `,
          opacity: [0, 1],
          easing: 'easeOutCubic',
          delay: (el, i, l) => anime.stagger(400 / l)(el, i, l),
        },
        1200
      )
      .add(
        {
          targets: '.js-motion-icon-code path',
          opacity: [0, 1],
          easing: 'easeOutCubic',
          delay: (el, i, l) => anime.stagger(600 / l)(el, i, l),
        },
        '-=400'
      )
      .add(
        {
          targets: '.js-images-scene div',
          opacity: [0, 1],
          easing: 'easeOutCubic',
          delay: (el, i, l) => anime.stagger(1200 / l)(el, i, l),
        },
        1350
      );
  }, []);

  // 重力作用
  useEffect(() => {
    const scene = document.querySelector('.js-images-scene');
    if (scene) {
      // eslint-disable-next-line no-new
      new Parallax(scene, {});
    }
  }, []);

  return (
    <div className={styles.wrapper}>
      <div className={cs(styles['motion-wrapper'], 'js-images-motion-wrapper')}>
        <Motion className={cs(styles.motion, 'js-images-motion')} />
      </div>
      <div
        className={cs(styles.scene, 'js-images-scene')}
        data-calibrate-x="true"
        data-calibrate-y="true"
      >
        {floatLogoList.map((item, index) => (
          <div data-depth={item.depth} key={index}>
            <div className={cs(styles['float-logo'], styles[`float-logo-${index + 1}`])}>
              {item.logo}
            </div>
          </div>
        ))}
      </div>
      <div className={cs(styles['bg-light'], 'js-images-bg-light')} />
    </div>
  );
}
