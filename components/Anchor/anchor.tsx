import React, {
  forwardRef,
  useCallback,
  useContext,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import throttle from 'lodash/throttle';
import compute from 'compute-scroll-into-view';
import scrollIntoViewIfNeeded from 'scroll-into-view-if-needed';
import { isFunction, isNumber, isWindow } from '../_util/is';
import { on, off } from '../_util/dom';
import cs from '../_util/classNames';
import useIsFirstRender from '../_util/hooks/useIsFirstRender';
import Affix from '../Affix';
import { ConfigContext } from '../ConfigProvider';
import { AnchorProps } from './interface';
import AnchorContext from './context';
import { findNode, slide, getContainer, getContainerElement } from './utils';
import useStateWithPromise from '../_util/hooks/useStateWithPromise';
import Link from './link';
import useMergeProps from '../_util/hooks/useMergeProps';

type AnchorPropsWithChildren = React.PropsWithChildren<AnchorProps>;

const defaultProps: AnchorProps = {
  animation: true,
  affix: true,
  hash: true,
  boundary: 'start',
};

function Anchor(baseProps: AnchorPropsWithChildren, ref) {
  const { getPrefixCls, componentConfig, rtl } = useContext(ConfigContext);
  const props = useMergeProps<AnchorPropsWithChildren>(
    baseProps,
    defaultProps,
    componentConfig?.Anchor
  );
  const {
    className,
    style,
    scrollContainer: propScrollContainer,
    animation = true,
    lineless,
    affix = true,
    affixStyle,
    offsetBottom,
    offsetTop,
    hash: willChangeHash = true,
    boundary = 'start',
    targetOffset,
    children,
    direction = 'vertical',
    onSelect,
    onChange,
    ...rest
  } = props;
  const prefixCls = getPrefixCls('anchor');
  const classNames = cs(prefixCls, className, {
    [`${prefixCls}-lineless`]: lineless,
    [`${prefixCls}-rtl`]: rtl,
    [`${prefixCls}-horizontal`]: direction === 'horizontal',
  });
  const wrapperRef = useRef<HTMLDivElement>(null);
  const sliderLineRef = useRef<HTMLDivElement>(null);
  const linkMap = useRef<Map<string, HTMLElement>>(new Map());
  const isScrolling = useRef(false);
  const scrollContainer = useRef<HTMLElement | Window>(null);

  // use this flag to trigger re-computing position of active link slider line
  const [flagUpdateSliderLine, setFlagUpdateSliderLine] = useState(0);
  const [currentLink, setCurrentLink] = useStateWithPromise('');
  const isFirstRender = useIsFirstRender();

  useEffect(() => {
    const container = getContainer(propScrollContainer);
    scrollContainer.current = container;
  }, [propScrollContainer]);

  const getAffixTarget = useCallback(() => {
    return getContainer(propScrollContainer);
  }, [propScrollContainer]);

  useImperativeHandle(
    ref,
    () => ({
      dom: wrapperRef.current,
    }),
    []
  );

  function addLink(hash: string, element: HTMLElement) {
    if (hash) {
      linkMap.current.set(hash, element);
      setFlagUpdateSliderLine(Math.random());
    }
  }

  function removeLink(hash: string) {
    linkMap.current.delete(hash);
    setFlagUpdateSliderLine(Math.random());
  }

  const setActiveLink = useCallback(
    (hash: string) => {
      if (!hash || !wrapperRef.current) return;
      // Try to add when there is no corresponding link
      if (!linkMap.current.has(hash)) {
        const node = findNode(wrapperRef.current, `a[data-href='${hash}']`);
        node && addLink(hash, node);
      }

      const node = linkMap.current.get(hash);

      if (node && hash !== currentLink) {
        scrollIntoViewIfNeeded(node, {
          behavior: 'instant',
          block: 'nearest',
          scrollMode: 'if-needed',
          boundary: wrapperRef.current,
        });

        setCurrentLink(hash).then(() => {
          isFunction(onChange) && onChange(hash, currentLink);
        });
      }
    },
    [currentLink, onChange]
  );

  const getEleInViewport = useCallback(() => {
    let result;
    const startTop = isNumber(boundary) ? boundary : 0;
    const container = scrollContainer.current;
    const containerElement = getContainerElement(container);
    const containerRect = containerElement.getBoundingClientRect();
    const documentHeight = document.documentElement.clientHeight;
    [...linkMap.current.keys()].some((hash) => {
      const element = findNode(document, hash);
      let inView = false;
      if (element) {
        const { top, height } = element.getBoundingClientRect();
        if (isWindow(container)) {
          const innerTargetOffset = targetOffset ?? documentHeight / 2;
          inView =
            (top >= startTop && top <= innerTargetOffset) ||
            (top <= startTop && top + height >= innerTargetOffset);
        } else {
          const offsetTop = top - containerRect.top - startTop;
          const innerTargetOffset = targetOffset ?? containerRect.height / 2;
          inView =
            (offsetTop >= 0 && offsetTop <= innerTargetOffset) ||
            (offsetTop <= 0 && offsetTop + height >= innerTargetOffset);
        }
        if (inView) {
          result = element;
        }
      }
      return inView;
    });
    return result;
  }, [boundary, targetOffset]);

  const onScroll = useCallback(
    throttle(
      () => {
        if (isScrolling.current) return;
        const element = getEleInViewport();

        if (element && element.id) {
          const hash = `#${element.id}`;
          setActiveLink(hash);
        }
      },
      30,
      { trailing: true }
    ),
    [getEleInViewport, setActiveLink]
  );

  function scrollIntoView(hash: string) {
    if (!hash) return;
    try {
      const element = findNode(document, hash);
      if (!element) return;
      const block = isNumber(boundary) ? 'start' : boundary;
      const offset = isNumber(boundary) ? boundary : 0;
      const actions = compute(element, { block });
      if (!actions.length) return;

      let stopScroll = false;

      const promises = actions.map(({ el, top }) => {
        return new Promise((resolve) => {
          if (!stopScroll) {
            if (el === scrollContainer.current) {
              stopScroll = true;
            }
            const targetTop = top - offset;
            if (!animation) {
              // Manually trigger scrolling as browser's default action is prevented when `props.hash` is false
              if (!willChangeHash) {
                el.scrollTop = targetTop;
              }
              return resolve(null);
            }
            return slide(el as HTMLElement, targetTop, resolve);
          }
          resolve(null);
        });
      });

      isScrolling.current = true;
      Promise.all(promises).then(() => {
        isScrolling.current = false;
      });
    } catch (e) {
      console.error(e);
    }
  }

  function onLinkClick(e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, hash: string) {
    if (!willChangeHash) {
      e.preventDefault();
    }
    setActiveLink(hash);
    scrollIntoView(hash);
    isFunction(onSelect) && onSelect(hash, currentLink);
  }

  useEffect(() => {
    const hash = decodeURIComponent(location.hash);
    if (hash) {
      setActiveLink(hash);
      scrollIntoView(hash);
    } else {
      // compute current active anchor
      onScroll();
    }
  }, []);

  useEffect(() => {
    if (!isFirstRender) {
      onScroll();
    }

    on(scrollContainer.current, 'scroll', onScroll);
    return () => {
      off(scrollContainer.current, 'scroll', onScroll);
    };
  }, [propScrollContainer, onScroll]);

  useEffect(() => {
    const link = linkMap.current.get(currentLink);
    if (link && !lineless && sliderLineRef.current) {
      if (direction === 'horizontal') {
        // if (rtl) {
        //   sliderLineRef.current.style.right = `${link.offsetLeft}px`;
        // } else {
        // }
        sliderLineRef.current.style.left = `${link.offsetLeft}px`;
        sliderLineRef.current.style.width = `${link.clientWidth}px`;
      } else {
        sliderLineRef.current.style.top = `${link.offsetTop}px`;
      }
    }
  }, [currentLink, lineless, direction, rtl, flagUpdateSliderLine]);

  const content = (
    <div className={classNames} style={style} ref={wrapperRef} {...rest}>
      {!lineless && currentLink && (
        <div className={`${prefixCls}-line-slider`} ref={sliderLineRef} />
      )}
      <AnchorContext.Provider
        value={{
          direction,
          currentLink,
          addLink,
          removeLink,
          onLinkClick,
        }}
      >
        <div className={`${prefixCls}-list`}>{children}</div>
      </AnchorContext.Provider>
    </div>
  );

  return affix ? (
    <Affix
      offsetTop={offsetTop}
      offsetBottom={offsetBottom}
      style={affixStyle}
      target={getAffixTarget}
    >
      {content}
    </Affix>
  ) : (
    content
  );
}

const ForwardRefAnchor = forwardRef<unknown, AnchorPropsWithChildren>(Anchor);

const AnchorComponent = ForwardRefAnchor as typeof ForwardRefAnchor & {
  Link: typeof Link;
};

AnchorComponent.displayName = 'Anchor';

AnchorComponent.Link = Link;

export default AnchorComponent;
