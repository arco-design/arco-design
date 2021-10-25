import { gsap, ScrollTrigger } from 'gsap/all';
import { isArray, isString } from '../utils/is';

export function scaleFadeIn(
  elem: HTMLDivElement | HTMLDivElement[] | string,
  tl?: gsap.core.Timeline,
  position?: gsap.Position
) {
  return (tl || gsap).fromTo(
    elem,
    {
      y: 24,
      scale: 0.96,
      autoAlpha: 0,
    },
    {
      y: 0,
      scale: 1,
      autoAlpha: 1,
      duration: 0.7,
      ease: 'cubic-bezier(.16,1,.3,1)',
      stagger: {
        amount: 0.6,
      },
    },
    position
  );
}

export function scaleFadeOut(
  elem: HTMLDivElement | HTMLDivElement[],
  tl?: gsap.core.Timeline,
  position?: gsap.Position
) {
  return (tl || gsap).to(
    elem,
    {
      y: 24,
      scale: 0.96,
      autoAlpha: 0,
      duration: 0.7,
      ease: 'cubic-bezier(.16,1,.3,1)',
      stagger: {
        amount: 0.6,
      },
    },
    position
  );
}

export function scaleFadeHide(elem: HTMLDivElement | HTMLDivElement[] | string) {
  let _elem = elem as Array<HTMLDivElement | string>;
  if (!isArray(elem)) {
    _elem = [elem];
  }

  _elem.forEach((item) => {
    gsap.set(item, { autoAlpha: 0 });
  });
}

export function createScrollTrigger(
  elem: HTMLDivElement | HTMLDivElement[] | string,
  options?: {
    offsetBottom?: number | string;
  } & gsap.plugins.ScrollTriggerStaticVars
) {
  const { offsetBottom = '20%', ...rest } = options || {};
  const _offsetBottom = isString(offsetBottom) ? offsetBottom : `${offsetBottom}px`;
  if (!elem) return;

  return ScrollTrigger.create({
    trigger: elem as any,
    start: `top bottom-=${_offsetBottom}`,
    // markers: true,
    ...rest,
  });
}
