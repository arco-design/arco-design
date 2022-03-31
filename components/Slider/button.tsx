import React, {
  ReactNode,
  CSSProperties,
  useState,
  useContext,
  memo,
  useEffect,
  useRef,
  useMemo,
} from 'react';
import cs from '../_util/classNames';
import { on, off } from '../_util/dom';
import { isFunction, isNumber, isString } from '../_util/is';
import Trigger from '../Trigger';
import { TooltipPosition } from './interface';
import { ConfigContext } from '../ConfigProvider';
import useMergeValue from '../_util/hooks/useMergeValue';

interface SliderButtonProps {
  style?: CSSProperties;
  disabled?: boolean;
  prefixCls: string;
  value: number;
  maxValue?: number;
  minValue?: number;
  vertical?: boolean;
  tooltipVisible?: boolean;
  tooltipPosition?: TooltipPosition;
  formatTooltip?: (value: number) => string | ReactNode;
  getTooltipContainer?: () => Element;
  // 事件
  onMoving?: (x: number, y: number) => void;
  onMoveEnd?: () => void;
  onMoveBegin?: () => void;
}

const SliderButton = function (props: SliderButtonProps) {
  // props
  const {
    style,
    disabled,
    prefixCls,
    value,
    vertical,
    tooltipVisible,
    tooltipPosition,
    formatTooltip,
    getTooltipContainer,
    onMoving,
    onMoveEnd,
    onMoveBegin,
  } = props;

  // state
  const [isActive, setIsActive] = useState(false);
  const [popupVisible, setPopupVisible] = useMergeValue(false, { value: tooltipVisible });

  const { getPrefixCls } = useContext(ConfigContext);
  const position = useMemo(
    () => tooltipPosition || (vertical ? 'right' : 'top'),
    [tooltipPosition, vertical]
  );
  const delayTimer = useRef(null as any);
  const inButtonOrPopup = useRef(false);
  const isDragging = useRef(false);
  const tooltip = useRef(null);

  function handleMouseDown(e) {
    e.stopPropagation();
    if (disabled) return;

    moveStart(e);
    setIsActive(true);
    on(window, 'mousemove', moving);
    on(window, 'touchmove', moving);
    on(window, 'mouseup', moveEnd);
    on(window, 'touchend', moveEnd);
    on(window, 'contextmenu', moveEnd);
  }

  // 鼠标移入
  function handleMouseEnter() {
    inButtonOrPopup.current = true;
    clearDelayTimer();
    if (!popupVisible) {
      delayTimer.current = setTimeout(() => {
        updatePopupVisible(true);
      }, 50);
    }
  }

  // 鼠标移出
  function handleMouseLeave() {
    inButtonOrPopup.current = false;
    if (!isDragging.current) {
      clearDelayTimer();
      delayTimer.current = setTimeout(() => {
        updatePopupVisible(false);
      }, 200);
    }
  }

  function moveStart(e) {
    // 如果不阻止默认行为可能会在拖动时产生鼠标选中状态，所以手动处理元素失焦
    e.preventDefault();
    const activeElement = document.activeElement as HTMLElement;
    activeElement && activeElement.blur && activeElement.blur();

    isFunction(onMoveBegin) && onMoveBegin();
  }

  function moving(e) {
    isDragging.current = true;

    if (e.type === 'touchstart') {
      e.clientY = e.touches[0].clientY;
      e.clientX = e.touches[0].clientX;
    }
    isFunction(onMoving) && onMoving(e.clientX, e.clientY);
  }

  function moveEnd() {
    isDragging.current = false;
    setIsActive(false);
    offEvents();
    updatePopupVisible(inButtonOrPopup.current);
    isFunction(onMoveEnd) && onMoveEnd();
  }

  function offEvents() {
    clearDelayTimer();
    off(window, 'mousemove', moving);
    off(window, 'touchmove', moving);
    off(window, 'mouseup', moveEnd);
    off(window, 'touchend', moveEnd);
    off(window, 'contextmenu', moveEnd);
  }

  // 清除定时器
  function clearDelayTimer() {
    if (delayTimer.current) {
      clearTimeout(delayTimer.current);
      delayTimer.current = null;
    }
  }

  // 设置 tooltip 显示状态
  function updatePopupVisible(value: boolean) {
    if (isDragging.current) return;

    const newPopupVisible = 'tooltipVisible' in props ? tooltipVisible : value;
    setPopupVisible(newPopupVisible);
  }

  function handlePopupMouseEnter() {
    inButtonOrPopup.current = true;
    clearDelayTimer();
  }

  const tooltipText = useMemo(() => {
    return isFunction(formatTooltip) ? formatTooltip(value) : value;
  }, [formatTooltip, value]);

  function renderTooltipContent(position: TooltipPosition) {
    const tooltipPrefixCls = getPrefixCls('tooltip');
    return (
      <div
        className={cs(`${tooltipPrefixCls}-content`, `${tooltipPrefixCls}-content-${position}`)}
        onMouseLeave={handleMouseLeave}
        onMouseEnter={handlePopupMouseEnter}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div className={`${tooltipPrefixCls}-content-inner`}>{tooltipText}</div>
      </div>
    );
  }

  useEffect(() => {
    tooltip && tooltip.current && tooltip.current.updatePopupPosition();
  }, [value]);

  return (
    <Trigger
      style={{ maxWidth: 350 }}
      classNames="zoomInFadeOut"
      duration={{
        enter: 300,
        exit: 100,
      }}
      showArrow
      popupAlign={{
        left: 12,
        right: 12,
        top: 12,
        bottom: 12,
      }}
      ref={tooltip}
      popup={() => renderTooltipContent(position)}
      popupVisible={popupVisible}
      disabled={tooltipVisible === false}
      getPopupContainer={getTooltipContainer}
      position={position}
      childrenPrefix={getPrefixCls('tooltip')}
    >
      <div
        className={cs(`${prefixCls}-button`, { [`${prefixCls}-button-active`]: isActive })}
        onMouseDown={handleMouseDown}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={style}
        role="slider"
        aria-valuemax={props.maxValue}
        aria-valuemin={props.minValue}
        aria-valuenow={value}
        aria-disabled={!!disabled}
        tabIndex={0}
        aria-valuetext={
          isString(tooltipText) || isNumber(tooltipText) ? String(tooltipText) : undefined
        }
      />
    </Trigger>
  );
};

export default memo(SliderButton);
