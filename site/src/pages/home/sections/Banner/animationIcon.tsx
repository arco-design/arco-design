import React, { CSSProperties, useRef, useState, ReactElement, useLayoutEffect } from 'react';
import { gsap } from 'gsap/all';
import cs from '../../utils/classNames';
import useIsFirstRender from '../../hooks/useIsFirstRender';

interface AnimationIconProps {
  style?: CSSProperties;
  className?: string | string[];
  icon: ReactElement;
  animation?: boolean; // 是否要播放动画
  onStart?: () => void; // 动画播放开始
  onComplete?: () => void; // 动画播放结束
}

const animationDuration = 0.5; // 秒
type AnimationInstance = gsap.core.Tween;

const animationDelay = 4; // 秒

function animationOut(target, config: gsap.TweenVars = {}): AnimationInstance {
  return gsap.to(target, {
    animationDuration,
    opacity: 0,
    ease: 'power1.inOut',
    delay: animationDelay,
    stagger: {
      amount: animationDuration,
      from: 'random',
    },
    ...config,
  });
}

function animationIn(target, config: gsap.TweenVars = {}): AnimationInstance {
  return gsap.from(target, {
    opacity: 0,
    ease: 'power1.inOut',
    stagger: {
      amount: animationDuration,
      from: 'random',
    },
    ...config,
  });
}

export default function AnimationIcon(props: AnimationIconProps) {
  const { style = {}, className, icon, animation, onStart, onComplete } = props;
  const isFirstRender = useIsFirstRender();
  const [Icon, setIcon] = useState(icon);
  const [updateKey, setUpdateKey] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const refAnimationInstance = useRef<AnimationInstance>();

  useLayoutEffect(() => {
    refAnimationInstance.current && refAnimationInstance.current.progress(1);
    if (!isFirstRender && animation) {
      const paths = ref.current.querySelectorAll('path');
      refAnimationInstance.current = animationOut(paths, {
        onComplete() {
          refAnimationInstance.current = null;
          setIcon(icon);
          setUpdateKey((pre) => pre + 1);
        },
      });
      onStart && onStart();
    } else {
      setIcon(icon);
    }
  }, [animation, icon]);

  useLayoutEffect(() => {
    refAnimationInstance.current && refAnimationInstance.current.progress(1);
    if (!isFirstRender) {
      const paths = ref.current.querySelectorAll('path');
      refAnimationInstance.current = animationIn(paths, {
        onComplete() {
          refAnimationInstance.current = null;
          onComplete && onComplete();
        },
      });
    }
  }, [updateKey]);

  return (
    <div ref={ref} style={style} className={cs(className)}>
      {Icon}
    </div>
  );
}
