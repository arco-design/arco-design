import React, {
  forwardRef,
  useContext,
  useImperativeHandle,
  useState,
  useRef,
  useEffect,
} from 'react';
import cs from '../_util/classNames';
import ResizeTrigger from './resize-trigger';
import { ConfigContext } from '../ConfigProvider';
import { on, off } from '../_util/dom';
import { SplitProps } from './interface';
import useIsomorphicLayoutEffect from '../_util/hooks/useIsomorphicLayoutEffect';

const DIRECTION_HORIZONTAL = 'horizontal';
const DIRECTION_VERTICAL = 'vertical';

function Split(props: SplitProps, ref) {
  const {
    style,
    className,
    component = 'div',
    direction = 'horizontal',
    icon,
    size = 0.5,
    min,
    max,
    panes,
    disabled,
    trigger,
  } = props;
  const { getPrefixCls, rtl } = useContext(ConfigContext);
  const prefixCls = getPrefixCls('resizebox-split');
  const isHorizontal = direction.includes(DIRECTION_HORIZONTAL);
  const isReverse = direction.includes('reverse');
  const rtlReverse = isHorizontal && rtl;
  const isTriggerHorizontal = !isHorizontal;
  const classNames = cs(
    prefixCls,
    `${prefixCls}-${isHorizontal ? DIRECTION_HORIZONTAL : DIRECTION_VERTICAL}`,
    { [`${prefixCls}-rtl`]: rtl },
    className
  );
  const [firstPane, secondPane] = panes;
  const isPxSize = typeof size === 'string';
  const [offset, setOffset] = useState<number>(parseFloat(size as string));
  const [triggerSize, setTriggerSize] = useState<number>(0);
  const recordRef = useRef<{
    startX: number;
    startY: number;
    startWidth: number;
    startHeight: number;
    startOffset: number;
    moving: boolean;
  }>({
    startX: 0,
    startY: 0,
    startWidth: 0,
    startHeight: 0,
    startOffset: 0,
    moving: false,
  });
  const wrapperRef = useRef<HTMLElement>();
  const paneContainers = useRef<HTMLElement[]>([]);

  useImperativeHandle(ref, () => wrapperRef.current, []);

  function px2percent(numerator, denominator) {
    return parseFloat(numerator) / parseFloat(denominator);
  }

  // startSize:  size of the total ResizeBox
  // startOffset: size of the first Panel
  // startPosition: position at the end of last moving
  // currentPosition: position at the end of current moving
  function getOffset(startSize, startOffset, startPosition, currentPosition) {
    //  0 < minOffsetRatio, maxOffsetRatio <1
    const minOffsetRatio =
      typeof min === 'string' ? px2percent(parseFloat(min), startSize) : min || 0;
    const maxOffsetRatio =
      typeof max === 'string' ? px2percent(parseFloat(max), startSize) : max || 1;
    let ratio = isReverse ? -1 : 1;
    const rtlRatio = rtlReverse ? -1 : 1;
    ratio *= rtlRatio;
    let moveOffset = isPxSize
      ? startOffset + (currentPosition - startPosition) * ratio
      : px2percent(startSize * startOffset + (currentPosition - startPosition) * ratio, startSize);

    const minOffset = isPxSize ? minOffsetRatio * startSize : minOffsetRatio;
    const maxOffset = isPxSize ? maxOffsetRatio * startSize : maxOffsetRatio;
    moveOffset = Math.max(moveOffset, minOffset);
    moveOffset = Math.min(moveOffset, maxOffset);
    return moveOffset;
  }

  // 移动开始，记录初始值，绑定移动事件
  function onTriggerMouseDown(e) {
    props.onMovingStart && props.onMovingStart();

    recordRef.current.moving = true;
    recordRef.current.startX = e.pageX;
    recordRef.current.startY = e.pageY;
    recordRef.current.startWidth = wrapperRef.current?.offsetWidth;
    recordRef.current.startHeight = wrapperRef.current?.offsetHeight;
    recordRef.current.startOffset = offset;

    on(window, 'mousemove', moving);
    on(window, 'touchmove', moving);
    on(window, 'mouseup', moveEnd);
    on(window, 'touchend', moveEnd);
    on(window, 'contextmenu', moveEnd);

    document.body.style.cursor = isTriggerHorizontal ? 'row-resize' : 'col-resize';
  }

  // 移动中，更新 firstPane 的占位大小
  function moving(e) {
    if (recordRef.current.moving) {
      /* eslint-disable */
      const newOffset = isHorizontal
        ? getOffset(
            recordRef.current.startWidth,
            recordRef.current.startOffset,
            recordRef.current.startX,
            e.pageX
          )
        : getOffset(
            recordRef.current.startHeight,
            recordRef.current.startOffset,
            recordRef.current.startY,
            e.pageY
          );

      setOffset(newOffset);
      props.onMoving && props.onMoving(e, isPxSize ? `${newOffset}px` : newOffset);
    }
  }

  // 移动结束，解除事件绑定
  function moveEnd() {
    recordRef.current.moving = false;
    off(window, 'mousemove', moving);
    off(window, 'touchmove', moving);
    off(window, 'mouseup', moveEnd);
    off(window, 'touchend', moveEnd);
    off(window, 'contextmenu', moveEnd);
    document.body.style.cursor = 'default';
    props.onMovingEnd && props.onMovingEnd();
  }

  // 更新 trigger 大小
  function onTriggerResize(e) {
    const { contentRect } = e[0];
    const newTriggerSize = contentRect[isTriggerHorizontal ? 'height' : 'width'];
    setTriggerSize(newTriggerSize);
  }

  // 根据 offset 和 triggerSize 计算 firstPane 的样式
  function getFirstPaneSize() {
    const unit = isPxSize ? 'px' : '%';
    if (!offset) return `0${unit}`;

    const baseVal = isPxSize ? offset : offset * 100;

    return `calc(${baseVal}${unit} - ${triggerSize / 2}px)`;
  }

  useEffect(() => {
    props.onPaneResize && props.onPaneResize(paneContainers.current);
  }, [offset, triggerSize]);

  useIsomorphicLayoutEffect(() => {
    const newOffset = parseFloat(size as string);
    if (offset !== newOffset) {
      setOffset(newOffset);
    }
  }, [size]);

  const Tag = component as any;

  const firstPaneNode = (
    <div
      className={cs(`${prefixCls}-pane`, 'first-pane')}
      style={{ flexBasis: getFirstPaneSize() }}
      ref={(el) => {
        paneContainers.current[0] = el;
      }}
    >
      {firstPane}
    </div>
  );

  const secondPaneNode = (
    <div
      className={cs(`${prefixCls}-pane`, 'second-pane')}
      ref={(el) => {
        paneContainers.current[1] = el;
      }}
    >
      {secondPane}
    </div>
  );
  const paneNodeArr = isReverse ? [secondPaneNode, firstPaneNode] : [firstPaneNode, secondPaneNode];

  return (
    <Tag style={style} className={classNames} ref={wrapperRef}>
      {paneNodeArr[0]}
      {!disabled && (
        <ResizeTrigger
          className={`${prefixCls}-trigger`}
          direction={isTriggerHorizontal ? DIRECTION_HORIZONTAL : DIRECTION_VERTICAL}
          icon={icon}
          onMouseDown={onTriggerMouseDown}
          onResize={onTriggerResize}
        >
          {trigger}
        </ResizeTrigger>
      )}
      {paneNodeArr[1]}
    </Tag>
  );
}

const SplitComponent = forwardRef<unknown, SplitProps>(Split);

SplitComponent.displayName = 'ResizeBoxSplit';

export default SplitComponent;

export { SplitProps };
