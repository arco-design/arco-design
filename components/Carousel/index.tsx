import React, {
  CSSProperties,
  ReactElement,
  useContext,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import cs from '../_util/classNames';
import CarouselIndicator from './indicator';
import CarouselArrow from './arrow';
import { ConfigContext } from '../ConfigProvider';
import { CarouselProps } from './interface';
import { useInterval } from '../_util/hooks/useInterval';
import ResizeObserver from '../_util/resizeObserver';
import warning from '../_util/warning';
import omit from '../_util/omit';
import useMergeProps from '../_util/hooks/useMergeProps';

const DEFAULT_AUTO_PLAY_INTERVAL = 3000;

const defaultProps: CarouselProps = {
  animation: 'slide',
  indicatorType: 'dot',
  indicatorPosition: 'bottom',
  direction: 'horizontal',
  showArrow: 'always',
  trigger: 'click',
  moveSpeed: 500,
  timingFunc: 'cubic-bezier(0.34, 0.69, 0.1, 1)',
};

function Carousel(baseProps: CarouselProps, ref) {
  const { getPrefixCls, componentConfig } = useContext(ConfigContext);
  const props = useMergeProps<CarouselProps>(baseProps, defaultProps, componentConfig?.Carousel);
  const {
    style,
    className,
    children,
    currentIndex,
    animation,
    trigger,
    direction,
    moveSpeed,
    timingFunc,
    indicatorType,
    indicatorPosition,
    indicatorClassName,
    showArrow,
    miniRender,
    arrowClassName,
    carousel,
    icons,
    onChange,
    ...rest
  } = props;

  // TODO 兼容 autoPlaySpeed， 3.x 移除
  let autoPlay = props.autoPlay;
  if (autoPlay && props.autoPlaySpeed) {
    autoPlay = {
      interval: props.autoPlaySpeed,
    };
    warning(
      true,
      `[Arco Carousel] The 'autoPlaySpeed' property will be removed in the next major version, please use 'autoPlay.interval' instead.`
    );
  }

  const childrenList = React.Children.toArray(children).filter((child) =>
    React.isValidElement(child)
  ) as ReactElement[];
  const childrenLength = childrenList.length;

  const refDom = useRef(null);
  const refSliderWrapper = useRef(null);
  const refAnimationTimer = useRef(null);

  const [index, setIndex] = useState(
    typeof currentIndex === 'number' ? getValidIndex(currentIndex) : 0
  );
  const [previousIndex, setPreviousIndex] = useState<number>(index);
  const [isPause, setIsPause] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [slideDirection, setSlideDirection] = useState<'positive' | 'negative'>(null);
  const [computedStyle, setComputedStyle] = useState<{
    sliderWrapper: CSSProperties;
    indicatorWrapper: CSSProperties;
  }>({
    sliderWrapper: null,
    indicatorWrapper: null,
  });

  const mergedIndex = typeof currentIndex === 'number' ? getValidIndex(currentIndex) : index;
  const prevIndex = getValidIndex(mergedIndex - 1);
  const nextIndex = getValidIndex(mergedIndex + 1);
  const autoPlayInterval =
    typeof autoPlay === 'object' && autoPlay.interval
      ? autoPlay.interval
      : DEFAULT_AUTO_PLAY_INTERVAL;

  useEffect(() => {
    return () => refAnimationTimer.current && clearTimeout(refAnimationTimer.current);
  }, []);

  useEffect(() => {
    slideTo({
      targetIndex: mergedIndex,
    });
  }, [mergedIndex]);

  const resetInterval = useInterval(
    () => {
      slideTo({
        targetIndex: nextIndex,
      });
    },
    autoPlay && !isPause && childrenLength > 1 ? autoPlayInterval : null
  );

  useImperativeHandle(carousel, () => {
    return {
      dom: refDom.current,
      goto: ({ index, isNegative, isManual, resetAutoPlayInterval }) => {
        slideTo({
          targetIndex: getValidIndex(index),
          isNegative,
          isManual,
          resetAutoPlayInterval,
        });
      },
    };
  });

  function getValidIndex(i): number {
    const indexNumber = +i;
    return typeof indexNumber === 'number' && !isNaN(indexNumber)
      ? (indexNumber + childrenLength) % childrenLength
      : i;
  }

  function slideTo({
    targetIndex,
    isNegative = false,
    isManual = false,
    resetAutoPlayInterval = false,
  }: {
    targetIndex: number;
    isNegative?: boolean;
    isManual?: boolean;
    resetAutoPlayInterval?: boolean;
  }) {
    if (!isAnimating && targetIndex !== mergedIndex) {
      setIsAnimating(true);
      setIndex(targetIndex);
      setPreviousIndex(index);
      setSlideDirection(isNegative ? 'negative' : 'positive');
      onChange && onChange(targetIndex, mergedIndex, isManual);

      if (autoPlay && resetAutoPlayInterval) {
        resetInterval();
      }

      refAnimationTimer.current = setTimeout(() => {
        setIsAnimating(false);
        refAnimationTimer.current = null;
      }, moveSpeed);
    }
  }

  function computeStyle() {
    if (animation === 'card') {
      if (refSliderWrapper.current) {
        const sliderElement = refSliderWrapper.current.children[0];

        if (!sliderElement) {
          return;
        }

        const totalWidth = refSliderWrapper.current.clientWidth;
        const sliderWidth = sliderElement.clientWidth;
        const edge = (totalWidth - sliderWidth) / 2;

        // deltaZ is TranslateZ(-Zpx) of prev/next slider's style
        // perspective / (perspective + deltaZ) = x / X
        const deltaZ = 200;
        const x = totalWidth / 2;
        const X = sliderWidth;
        // avoid getting a huge perspective value
        const perspective = x + 50 >= X ? deltaZ * 4 : (deltaZ * x) / (X - x);

        setComputedStyle({
          sliderWrapper: {
            perspective,
          },
          indicatorWrapper: {
            width: 'auto',
            left: edge,
            right: edge,
          },
        });
      }
    } else {
      setComputedStyle({
        sliderWrapper: null,
        indicatorWrapper: null,
      });
    }
  }

  const prefixCls = getPrefixCls('carousel');
  const classNames = cs(
    prefixCls,
    `${prefixCls}-indicator-position-${indicatorPosition}`,
    className
  );
  const eventHandlers = Object.assign(
    {},
    autoPlay && (typeof autoPlay !== 'object' || autoPlay.hoverToPause !== false)
      ? {
          onMouseEnter: () => setIsPause(true),
          onMouseLeave: () => setIsPause(false),
        }
      : null
  );

  return (
    <ResizeObserver onResize={computeStyle}>
      <div
        ref={(_ref) => {
          ref = _ref;
          refDom.current = ref;
        }}
        className={classNames}
        style={style}
        {...omit(rest, ['autoplay', 'autoPlaySpeed'])}
        {...eventHandlers}
      >
        <div
          ref={refSliderWrapper}
          style={computedStyle.sliderWrapper}
          className={cs(`${prefixCls}-${animation}`, `${prefixCls}-${direction}`, {
            [`${prefixCls}-negative`]: slideDirection === 'negative',
          })}
        >
          {childrenList.map((child, index) => {
            const isCurrent = index === mergedIndex;
            const isPrev = index === prevIndex;
            const isNext = index === nextIndex;
            const shouldRenderChild = !miniRender || isCurrent || isPrev || isNext;

            if (!shouldRenderChild) {
              return null;
            }

            const {
              style: childStyle,
              className: childClassName,
              onClick: childOnClick,
            } = child.props;

            return React.cloneElement(child, {
              'aria-hidden': !isCurrent,
              style: Object.assign(
                {
                  transitionTimingFunction: timingFunc,
                  transitionDuration: `${moveSpeed}ms`,
                  animationTimingFunction: timingFunc,
                  animationDuration: `${moveSpeed}ms`,
                },
                childStyle
              ),
              className: cs(childClassName, {
                [`${prefixCls}-item-prev`]: isPrev,
                [`${prefixCls}-item-next`]: isNext,
                [`${prefixCls}-item-current`]: isCurrent,
                [`${prefixCls}-item-slide-in`]:
                  animation === 'slide' && slideDirection && isAnimating && isCurrent,
                [`${prefixCls}-item-slide-out`]:
                  animation === 'slide' && slideDirection && isAnimating && index === previousIndex,
              }),
              onClick: (event) => {
                childOnClick && childOnClick(event);
                slideTo({
                  targetIndex: index,
                  isNegative: index === prevIndex,
                  isManual: true,
                });
              },
            });
          })}
        </div>

        {indicatorType !== 'never' && childrenLength > 1 && (
          <div
            style={computedStyle.indicatorWrapper}
            className={cs(
              `${prefixCls}-indicator-wrapper`,
              `${prefixCls}-indicator-wrapper-${indicatorPosition}`
            )}
          >
            <CarouselIndicator
              className={indicatorClassName}
              type={indicatorType}
              count={childrenLength}
              activeIndex={mergedIndex}
              position={indicatorPosition}
              trigger={trigger}
              onSelectIndex={(index) =>
                slideTo({
                  targetIndex: index,
                  isNegative: index < mergedIndex,
                  isManual: true,
                })
              }
            />
          </div>
        )}

        {showArrow !== 'never' && childrenLength > 1 && (
          <CarouselArrow
            className={arrowClassName}
            direction={direction}
            showArrow={showArrow}
            icons={icons}
            prev={() =>
              slideTo({
                targetIndex: prevIndex,
                isNegative: true,
                isManual: true,
              })
            }
            next={() =>
              slideTo({
                targetIndex: nextIndex,
                isManual: true,
              })
            }
          />
        )}
      </div>
    </ResizeObserver>
  );
}

const CarouselComponent = React.forwardRef<unknown, CarouselProps>(Carousel);

CarouselComponent.displayName = 'Carousel';

export default CarouselComponent;

export { CarouselProps };
