import React, { useRef, useEffect } from 'react';
import { Message } from '@arco-design/web-react';
import { gsap, ScrollTrigger } from 'gsap/all';
import Block from '../block';
import styles from './index.module.less';
import useLocale from '../../../../hooks/useLocale';
import cs from '../../../../utils/classNames';
import { createScrollTrigger, scaleFadeHide, scaleFadeIn } from '../../../../utils/animation';
import { EcosystemItem } from '../../interface';

gsap.registerPlugin(ScrollTrigger);

export default function EcosystemBlockList({
  list,
  animation,
}: {
  list: EcosystemItem[];
  animation?: boolean;
}) {
  const locale = useLocale();
  const blockListRef = useRef<HTMLDivElement>();

  useEffect(() => {
    if (!animation) return;
    const _target =
      blockListRef.current && blockListRef.current.querySelectorAll('.js-ecosystem-block-item');
    if (!_target || !_target.length) return;

    const show = () => {
      scaleFadeIn(_target as any);
    };
    const hide = () => {
      scaleFadeHide(_target as any);
    };

    hide();
    createScrollTrigger(blockListRef.current, {
      onEnter: show,
      once: true,
    });
  }, [animation]);

  return (
    <div className={styles['block-list']} ref={blockListRef}>
      {list.map(({ href, ...item }) => (
        <Block
          key={item.name}
          className={cs(styles['block-item'], 'js-ecosystem-block-item')}
          name={item.name}
          logo={item.logo}
          logoPlaceholder={item.logoPlaceholder || item.logo}
          desc={item.desc}
          image={item.image}
          waiting={!href}
          onClick={() => {
            if (href) {
              window.open(href);
            } else {
              Message.info(locale['global.message.waiting']);
            }
          }}
        />
      ))}
    </div>
  );
}
