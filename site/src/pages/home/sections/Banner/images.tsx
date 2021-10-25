import React, { useEffect } from 'react';
import { gsap } from 'gsap/all';
import Parallax from 'parallax-js';
import LogoArcoMaterial from '../../assets/logo_ArcoMaterial_w.svg';
import LogoArcoPro from '../../assets/logo_ArcoPro_w.svg';
import LogoFigma from '../../assets/logo_Figma_w.svg';
import LogoDesignLab from '../../assets/logo_DesignLab_w.svg';
import cs from '../../utils/classNames';
import Motion from './motion';
import styles from './style/images.module.less';

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
  // 出场动画
  useEffect(() => {
    gsap
      .timeline()
      .from('.js-images-bg-light', {
        opacity: 0,
        duration: 0.2,
        ease: 'ease',
      })
      .from('.js-images-motion', {
        y: '110%',
        scale: 0.86,
        duration: 1.8,
        ease: 'power3.inOut',
      })
      .from(
        '.js-images-scene',
        {
          opacity: 0,
          scale: '0.9',
          duration: 1,
          ease: 'cubic-bezier(0.34, 1.56, 0.64, 1) ',
        },
        'start-=0.55'
      )
      .from(
        '.js-motion-chart > div',
        {
          opacity: 0,
          height: '100%',
          stagger: {
            amount: 0.6,
          },
        },
        'start-=1'
      )
      .from(
        '.js-motion-top-content-item-3 > button',
        {
          opacity: 0,
          stagger: {
            amount: 0.6,
          },
        },
        'start-=1'
      )
      .from(
        '.js-motion-color-panel > div',
        {
          opacity: 0,
          stagger: {
            amount: 0.3,
          },
        },
        'start-=1'
      )
      .from(
        `
          .js-motion-top-content > div,
          .js-motion-bottom > div
        `,
        {
          opacity: 0,
          stagger: {
            amount: 0.4,
          },
        },
        'start-=0.8'
      )
      .from(
        '.js-motion-icon-code path',
        {
          opacity: 0,
          stagger: {
            amount: 0.6,
          },
        },
        '<0.4'
      )
      .from(
        '.js-images-scene div',
        {
          opacity: 0,
          stagger: {
            amount: 1.4,
          },
        },
        'start-=0.65'
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
