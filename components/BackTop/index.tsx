import React, { PropsWithChildren, forwardRef, useState, useEffect, useContext, memo } from 'react';
import { CSSTransition } from 'react-transition-group';
import BTween from 'b-tween';
import cs from '../_util/classNames';
import IconToTop from '../../icon/react-icon/IconToTop';
import { ConfigContext } from '../ConfigProvider';
import { on, off } from '../_util/dom';
import throttleByRaf from '../_util/throttleByRaf';
import { BackTopProps } from './interface';
import useMergeProps from '../_util/hooks/useMergeProps';

const defaultProps: BackTopProps = {
  visibleHeight: 400,
  easing: 'quartOut',
  duration: 400,
  target: () => window,
};

function BackTop(baseProps: PropsWithChildren<BackTopProps>, ref) {
  const { getPrefixCls, componentConfig, rtl } = useContext(ConfigContext);
  const props = useMergeProps<PropsWithChildren<BackTopProps>>(
    baseProps,
    defaultProps,
    componentConfig?.BackTop
  );

  const prefixCls = getPrefixCls('backtop');

  const [visible, setVisible] = useState(false);

  const getTarget = (target: HTMLElement | Window): HTMLElement => {
    return target === window ? document.documentElement : (target as HTMLElement);
  };

  useEffect(() => {
    const target = props.target && props.target();
    const scrollHandler = throttleByRaf(() => {
      const visibleHeight = props.visibleHeight;
      const scrollTop = getTarget(target).scrollTop;
      setVisible(scrollTop >= visibleHeight);
    });

    on(target, 'scroll', scrollHandler);

    scrollHandler();

    return () => {
      scrollHandler.cancel && scrollHandler.cancel();
      off(target, 'scroll', scrollHandler);
    };
  }, [props.target, props.visibleHeight]);

  const scrollToTop = () => {
    const targetDom = props.target && props.target();
    const t = getTarget(targetDom);
    const scrollTop = t.scrollTop;
    const tween = new BTween({
      from: { scrollTop },
      to: { scrollTop: 0 },
      easing: props.easing,
      duration: props.duration,
      onUpdate: (keys) => {
        t.scrollTop = keys.scrollTop;
      },
    });
    tween.start();
    props.onClick && props.onClick();
  };

  return (
    <div
      ref={ref}
      className={cs(`${prefixCls}`, { [`${prefixCls}-rtl`]: rtl }, props.className)}
      style={props.style}
      onClick={scrollToTop}
    >
      <CSSTransition in={visible} timeout={100} classNames="fadeIn" unmountOnExit>
        {props.children || (
          <button className={`${prefixCls}-button`}>
            <IconToTop />
          </button>
        )}
      </CSSTransition>
    </div>
  );
}

const BackTopRef = forwardRef<unknown, PropsWithChildren<BackTopProps>>(BackTop);

BackTopRef.displayName = 'BackTop';

export default memo(BackTopRef);

export { BackTopProps };
