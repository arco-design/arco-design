import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap/all';
import IconDrag from './iconDrag';
import { on, off } from '../../utils/dom';
import cs from '../../utils/classNames';
import Demo1 from './demo1';
import Demo2 from './demo2';
import EditorCard from './editorCard';
import styles from './style/index.module.less';
import { createScrollTrigger, scaleFadeIn, scaleFadeHide } from '../../utils/animation';

type DemoType = 'demo1' | 'demo2';

interface ComponentProps {
  isFirstRender?: boolean;
  onMounted?: () => void;
}

export default function Component(props: ComponentProps) {
  const { isFirstRender = true, onMounted } = props;
  const [leftSize, setLeftSize] = useState(53);
  const rightSize = 100 - leftSize;
  const [curDemo, setCurDemo] = useState<DemoType>('demo1');
  const [dragging, setDragging] = useState(false);
  const recordRef = useRef<{
    maxSize?: number;
    startX?: number;
    startLeftPxSize?: number;
    startWrapperPxSize?: number;
    dragging?: boolean;
  }>({});
  const wrapperRef = useRef<HTMLDivElement>();
  const leftRef = useRef<HTMLDivElement>();
  const leftBackgroundRef = useRef<HTMLDivElement>();
  const rightRef = useRef<HTMLDivElement>();
  const splitTriggerRef = useRef<HTMLDivElement>();

  function px2percent(numerator, denominator) {
    return parseFloat(numerator) / parseFloat(denominator);
  }

  function onSelectStart(e) {
    e.preventDefault();
    return false;
  }

  function onMouseDown(e) {
    recordRef.current.startX = e.pageX;
    recordRef.current.startWrapperPxSize = wrapperRef.current?.offsetWidth;
    recordRef.current.startLeftPxSize = leftRef.current?.offsetWidth;
    recordRef.current.dragging = true;
    setDragging(true);

    on(window, 'mousemove', moving);
    on(window, 'touchmove', moving);
    on(window, 'mouseup', moveEnd);
    on(window, 'touchend', moveEnd);
    on(window, 'contextmenu', moveEnd);
    on(document, 'selectstart', onSelectStart);

    document.body.style.cursor = 'col-resize';
  }

  function moving(e) {
    if (recordRef.current.dragging) {
      const movingPxSize = e.pageX - recordRef.current.startX;
      const newLeftPxSize = recordRef.current.startLeftPxSize + movingPxSize;
      const newLeftSize = px2percent(newLeftPxSize, recordRef.current.startWrapperPxSize) * 100;

      if (newLeftSize >= 30 && newLeftSize <= recordRef.current.maxSize) {
        setLeftSize(newLeftSize);
      }
    }
  }

  function moveEnd() {
    setDragging(false);
    recordRef.current.dragging = false;
    off(window, 'mousemove', moving);
    off(window, 'touchmove', moving);
    off(window, 'mouseup', moveEnd);
    off(window, 'touchend', moveEnd);
    off(window, 'contextmenu', moveEnd);
    off(document, 'selectstart', onSelectStart);
    document.body.style.cursor = 'default';
  }

  useEffect(() => {
    recordRef.current.maxSize = leftSize;
  }, []);

  useEffect(() => {
    onMounted && onMounted();
    if (!isFirstRender) {
      setTimeout(() => {
        wrapperRef.current.style.opacity = '1';
      });
      return;
    }
    const duration = 0.7;
    const show = (tl?: any) => {
      scaleFadeIn(rightRef.current, tl, `-=${duration * 0.6}`);
    };
    const hide = () => {
      scaleFadeHide(rightRef.current);
    };
    const slide = (tl: any) => {
      return tl
        .to([wrapperRef.current], {
          duration,
          opacity: 1,
        })
        .from(
          [leftBackgroundRef.current],
          {
            duration,
            right: `70%`,
          },
          '-=0.5'
        )
        .from(
          [leftRef.current],
          {
            duration,
            width: `30%`,
          },
          '<'
        )
        .from(
          [splitTriggerRef.current],
          {
            duration,
            left: `30%`,
          },
          '<'
        );
    };
    hide();
    createScrollTrigger(wrapperRef.current, {
      once: true,
      onEnter() {
        const tl = gsap.timeline();
        slide(tl);
        show(tl);
      },
    });
  }, []);

  return (
    <div className={styles.wrapper} ref={wrapperRef} style={{ opacity: 0 }}>
      <div
        className={styles['content-left-background']}
        style={{ right: `${rightSize}%` }}
        ref={leftBackgroundRef}
      />
      <div className={styles['content-left']} style={{ width: `${leftSize}%` }} ref={leftRef}>
        {curDemo === 'demo1' && <Demo1 />}
        {curDemo === 'demo2' && <Demo2 />}
      </div>
      <div className={styles['content-right']} style={{ width: `${rightSize}%` }} ref={rightRef}>
        <EditorCard activeDemo={curDemo} onChange={setCurDemo} />
      </div>
      <div
        className={styles['split-trigger-wrapper']}
        style={{ left: `${leftSize}%` }}
        ref={splitTriggerRef}
      >
        <div className={cs(styles['split-trigger'], { [styles['split-trigger-hover']]: dragging })}>
          <div
            className={styles['split-trigger-line']}
            onTouchStart={onMouseDown}
            onMouseDown={onMouseDown}
          />
          <div
            className={styles['split-trigger-icon']}
            onTouchStart={onMouseDown}
            onMouseDown={onMouseDown}
          >
            <IconDrag />
          </div>
        </div>
      </div>
    </div>
  );
}
