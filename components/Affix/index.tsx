import React, {
  CSSProperties,
  forwardRef,
  useRef,
  useImperativeHandle,
  useContext,
  PropsWithChildren,
  useState,
  useEffect,
  useCallback,
} from 'react';
import throttleByRaf from '../_util/throttleByRaf';
import cs from '../_util/classNames';
import { ConfigContext } from '../ConfigProvider';
import { on, off } from '../_util/dom';
import ResizeObserver from '../_util/resizeObserver';
import { isWindow, isUndefined, isFunction, isObject } from '../_util/is';
import useIsomorphicLayoutEffect from '../_util/hooks/useIsomorphicLayoutEffect';
import { AffixProps } from './interface';
import useMergeProps from '../_util/hooks/useMergeProps';

function getTargetRect(target: HTMLElement | Window) {
  return isWindow(target)
    ? {
        top: 0,
        bottom: window.innerHeight,
      }
    : target.getBoundingClientRect();
}

type AffixHandle = {
  updatePosition: () => void;
};

const defaultProps = {
  offsetTop: 0,
  target: () => window,
};

function Affix(baseProps: PropsWithChildren<AffixProps>, ref) {
  const { getPrefixCls, componentConfig, rtl } = useContext(ConfigContext);
  const props = useMergeProps<PropsWithChildren<AffixProps>>(
    baseProps,
    defaultProps,
    componentConfig?.Affix
  );
  const {
    className,
    style,
    affixClassName,
    affixStyle,
    offsetTop,
    offsetBottom,
    target,
    targetContainer,
    children,
    onChange,
    ...rest
  } = props;

  const [state, setState] = useState<{
    status: 'MEASURE_DONE' | 'MEASURE_START';
    isFixed: boolean;
    sizeStyles: CSSProperties;
    fixedStyles: CSSProperties;
  }>({
    status: 'MEASURE_DONE',
    isFixed: false,
    sizeStyles: {},
    fixedStyles: {},
  });
  const { isFixed, sizeStyles, fixedStyles } = state;
  const lastIsFixed = useRef(isFixed);

  const prefixCls = getPrefixCls('affix');
  const classNames = cs({ [prefixCls]: isFixed, [`${prefixCls}-rtl`]: rtl }, affixClassName);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const targetRef = useRef<HTMLElement | Window>(null);

  const updatePosition = useCallback(
    throttleByRaf(() => {
      setState({
        status: 'MEASURE_START',
        isFixed: false,
        fixedStyles: {},
        sizeStyles: {},
      });
    }),
    []
  );

  useIsomorphicLayoutEffect(() => {
    const { status } = state;
    if (status !== 'MEASURE_START' || !wrapperRef.current || !targetRef.current) return;

    const offsetType = isUndefined(offsetBottom) ? 'top' : 'bottom';
    const wrapperRect = wrapperRef.current.getBoundingClientRect();
    const targetRect = getTargetRect(targetRef.current);

    let newIsFixed = false;
    let newFixedStyles = {};
    if (offsetType === 'top') {
      newIsFixed = wrapperRect.top - targetRect.top < (offsetTop || 0);
      newFixedStyles = newIsFixed
        ? {
            position: 'fixed',
            top: targetRect.top + (offsetTop || 0),
          }
        : {};
    } else {
      newIsFixed = targetRect.bottom - wrapperRect.bottom < (offsetBottom || 0);
      newFixedStyles = newIsFixed
        ? {
            position: 'fixed',
            bottom: window.innerHeight - targetRect.bottom + (offsetBottom || 0),
          }
        : {};
    }
    const newSizeStyles = newIsFixed
      ? {
          width: wrapperRef.current.offsetWidth,
          height: wrapperRef.current.offsetHeight,
        }
      : {};

    setState({
      status: 'MEASURE_DONE',
      isFixed: newIsFixed,
      sizeStyles: newSizeStyles,
      fixedStyles: { ...newFixedStyles, ...newSizeStyles },
    });

    if (newIsFixed !== lastIsFixed.current) {
      lastIsFixed.current = newIsFixed;
      isFunction(onChange) && onChange(newIsFixed);
    }
  }, [state, offsetBottom, offsetTop, onChange]);

  useEffect(() => {
    updatePosition();
  }, [target, targetContainer, offsetBottom, offsetTop, updatePosition]);

  // listen to scroll and resize event of target and update position correspondingly
  useEffect(() => {
    targetRef.current = target && isFunction(target) ? target() : null;
    if (targetRef.current) {
      on(targetRef.current, 'scroll', updatePosition);
      on(targetRef.current, 'resize', updatePosition);
      return () => {
        off(targetRef.current, 'scroll', updatePosition);
        off(targetRef.current, 'resize', updatePosition);
      };
    }
  }, [target, updatePosition]);

  useEffect(() => {
    const container = targetContainer && isFunction(targetContainer) ? targetContainer() : null;
    // listen to scroll event of container if target is not window
    if (targetRef.current !== window && container) {
      on(container, 'scroll', updatePosition);
      return () => {
        off(container, 'scroll', updatePosition);
      };
    }
  }, [targetContainer, updatePosition]);

  useImperativeHandle<any, AffixHandle>(ref, () => ({
    updatePosition,
  }));

  return (
    <ResizeObserver onResize={updatePosition}>
      <div className={cs(className)} style={style} ref={wrapperRef} {...rest}>
        {isFixed && <div style={sizeStyles} />}
        <div
          className={classNames}
          style={{ ...fixedStyles, ...(isObject(affixStyle) ? affixStyle : {}) }}
        >
          <ResizeObserver onResize={updatePosition}>{children || <span />}</ResizeObserver>
        </div>
      </div>
    </ResizeObserver>
  );
}

const AffixComponent = forwardRef<AffixHandle, PropsWithChildren<AffixProps>>(Affix);

AffixComponent.displayName = 'Affix';

export default AffixComponent;

export { AffixProps };
