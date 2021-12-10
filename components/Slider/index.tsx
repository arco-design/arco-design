import React, { forwardRef, memo, useContext, CSSProperties, useMemo, useRef } from 'react';
import { plus } from 'number-precision';
import SliderButton from './button';
import Marks from './marks';
import Dots from './dots';
import Input from './input';
import Ticks from './ticks';
import { isFunction, isObject } from '../_util/is';
import { formatPercent, getOffset } from './utils';
import cs from '../_util/classNames';
import { ConfigContext } from '../ConfigProvider';
import { TooltipPosition, SliderProps } from './interface';
import useMergeValue from '../_util/hooks/useMergeValue';
import { off, on } from '../_util/dom';
import useLegalValue from './hooks/useLegalValue';
import useMergeProps from '../_util/hooks/useMergeProps';
import useUpdate from '../_util/hooks/useUpdate';

function isSameOrder(firstNums: number[], secondNums) {
  const diff1 = firstNums[0] - firstNums[1];
  const diff2 = secondNums[0] - secondNums[1];
  return diff1 <= 0 === diff2 <= 0;
}

const defaultProps: SliderProps = {
  max: 100,
  min: 0,
  step: 1,
};

function Slider(baseProps: SliderProps, ref) {
  const { getPrefixCls, componentConfig } = useContext(ConfigContext);
  const props = useMergeProps<SliderProps>(baseProps, defaultProps, componentConfig?.Slider);
  const {
    className,
    style,
    tooltipVisible,
    tooltipPosition,
    disabled,
    min,
    max,
    range: propRange,
    step,
    showTicks,
    marks,
    onlyMarkValue,
    vertical,
    showInput,
    reverse,
  } = props;

  const range = !!propRange;
  const rangeConfig = isObject(propRange) ? { ...propRange } : { draggableBar: false };

  const { getLegalValue, getLegalRangeValue, isLegalValue } = useLegalValue({
    isRange: range,
    min,
    max,
    onlyMarkValue,
    step,
    marks,
  });

  // 受控与非受控值处理
  const [value, setValue] = useMergeValue<number | number[]>(range ? [min, min] : min, {
    defaultValue: props.defaultValue,
    value: props.value,
  });

  // 计算合法值
  const curVal = getLegalRangeValue(value);
  const lastVal = useRef<number[]>(curVal);
  let [beginVal, endVal] = curVal;

  // value变化后 更新lastVal
  useUpdate(() => {
    lastVal.current = getLegalRangeValue(value);
  }, [value, getLegalRangeValue]);

  if (!isSameOrder(curVal, lastVal.current)) {
    // 保持顺序
    [beginVal, endVal] = [endVal, beginVal];
  }
  // 偏移比例
  const beginOffset = getOffset(beginVal, [min, max]);
  const endOffset = getOffset(endVal, [min, max]);
  // 标签数组
  const markList = useMemo(
    () => Object.keys(marks || {}).map((key) => ({ key, content: marks[key] })),
    [marks]
  );
  // 是否显示输入框
  const isShowInput = showInput && !onlyMarkValue;
  // 样式前缀
  const prefixCls = getPrefixCls('slider');
  // ref
  const roadRef = useRef(null);
  const position = useRef({
    left: 0,
    height: 0,
    top: 0,
    width: 0,
  });
  const isDragging = useRef(false);
  const barStartDragVal = useRef(0);

  function getEmitParams([beginVal, endVal]: number[]): number | number[] {
    if (beginVal > endVal) {
      [beginVal, endVal] = [endVal, beginVal];
    }
    return range ? [beginVal, endVal] : endVal;
  }

  function updateValue(val) {
    let [newBeginVal, newEndVal] = val;
    newBeginVal = getLegalValue(newBeginVal);
    newEndVal = getLegalValue(newEndVal);

    lastVal.current = [newBeginVal, newEndVal];
    const emitParams = getEmitParams([newBeginVal, newEndVal]);
    setValue(emitParams);
    return emitParams;
  }

  function onChange(val) {
    const emitParams = updateValue(val);
    if (isFunction(props.onChange)) {
      props.onChange(emitParams);
    }
  }

  function onMouseUp() {
    if (isFunction(props.onAfterChange)) {
      const emitParams = getEmitParams(lastVal.current);
      props.onAfterChange(emitParams);
    }
  }

  function inRange(val: number) {
    let [range1, range2] = [beginVal, endVal];
    if (range1 > range2) {
      [range1, range2] = [range2, range1];
    }
    if (range) return val >= range1 && val <= range2;
    return val <= range2;
  }
  // 通过坐标获取值
  function getValueByCoords(x: number, y: number): number {
    const { left, top, width, height } = position.current;
    let roadLength = width;
    let diff = reverse ? left + width - x : x - left;
    if (vertical) {
      roadLength = height;
      diff = reverse ? y - top : top + height - y;
    }
    diff = diff < 0 ? 0 : diff > roadLength ? roadLength : diff;
    const stepLen = (roadLength * step) / (max - min);
    const steps = Math.round(diff / stepLen);

    return plus(min, steps * step);
  }

  function getBarStyle(offsets: number[]): CSSProperties {
    let [begin, end] = offsets;
    if (begin > end) {
      [begin, end] = [end, begin];
    }
    const beginOffset = formatPercent(begin);
    const endOffset = formatPercent(1 - end);
    return vertical
      ? {
          [reverse ? 'top' : 'bottom']: beginOffset,
          [reverse ? 'bottom' : 'top']: endOffset,
        }
      : {
          [reverse ? 'right' : 'left']: beginOffset,
          [reverse ? 'left' : 'right']: endOffset,
        };
  }

  function getBtnStyle(offset: number): CSSProperties {
    return vertical
      ? { [reverse ? 'top' : 'bottom']: formatPercent(offset) }
      : { [reverse ? 'right' : 'left']: formatPercent(offset) };
  }

  function getTooltipProps() {
    const tooltipProps: {
      tooltipPosition?: TooltipPosition;
      tooltipVisible?: boolean;
      getTooltipContainer?: SliderProps['getTooltipContainer'];
      formatTooltip?: SliderProps['formatTooltip'];
    } = {
      getTooltipContainer: props.getTooltipContainer,
      formatTooltip: props.formatTooltip,
    };
    if ('tooltipPosition' in props) {
      tooltipProps.tooltipPosition = tooltipPosition;
    }
    if ('tooltipVisible' in props) {
      tooltipProps.tooltipVisible = tooltipVisible;
    }
    return tooltipProps;
  }

  function getPosition() {
    position.current = roadRef.current.getBoundingClientRect();
  }

  function onRoadMouseDown(e) {
    getPosition();
    const val = getValueByCoords(e.clientX, e.clientY);
    if (rangeConfig.draggableBar && inRange(val)) {
      barStartDragVal.current = getLegalValue(val);
      on(window, 'mousemove', onBarMouseMove);
      on(window, 'mouseup', onBarMouseUp);
    } else {
      handleJumpClick(val);
    }
  }

  // 点击某个位置，快速跳转
  function handleJumpClick(val: number) {
    if (disabled) return;

    const value = getLegalValue(val);
    if (range && endVal - value > value - beginVal) {
      onChange([value, endVal]);
    } else {
      onChange([beginVal, value]);
    }
    onMouseUp();
  }

  function handleInputChange(val) {
    onChange(val);
    onMouseUp();
  }

  // 拖动开始节点
  function handleBeginMove(x: number, y: number) {
    isDragging.current = true;
    onChange([getValueByCoords(x, y), endVal]);
  }

  // 拖动结束节点
  function handleEndMove(x: number, y: number) {
    isDragging.current = true;
    onChange([beginVal, getValueByCoords(x, y)]);
  }

  function handleMoveEnd() {
    isDragging.current = false;
    onMouseUp();
  }

  // bar 移动中
  function onBarMouseMove(e) {
    const newVal = getLegalValue(getValueByCoords(e.clientX, e.clientY));
    const offsetVal = newVal - barStartDragVal.current;
    const newBeginVal = beginVal + offsetVal;
    const newEndVal = endVal + offsetVal;

    if (isLegalValue(newBeginVal) && isLegalValue(newEndVal)) {
      onChange([newBeginVal, newEndVal]);
    }
  }

  // bar 停止移动
  function onBarMouseUp() {
    off(window, 'mousemove', onBarMouseMove);
    off(window, 'mouseup', onBarMouseUp);
    onMouseUp();
  }

  return (
    <div
      className={cs(
        prefixCls,
        {
          [`${prefixCls}-vertical`]: vertical,
          [`${prefixCls}-with-marks`]: marks,
          [`${prefixCls}-reverse`]: reverse,
        },
        className
      )}
      style={style}
      ref={ref}
    >
      <div className={`${prefixCls}-wrapper`}>
        <div
          ref={roadRef}
          className={cs(`${prefixCls}-road`, {
            [`${prefixCls}-road-disabled`]: disabled,
            [`${prefixCls}-road-vertical`]: vertical,
          })}
          onMouseDown={onRoadMouseDown}
        >
          <div className={`${prefixCls}-bar`} style={getBarStyle([beginOffset, endOffset])} />
          {showTicks && (
            <Ticks
              step={step}
              min={min}
              max={max}
              value={[beginVal, endVal]}
              prefixCls={prefixCls}
              vertical={vertical}
              reverse={reverse}
            />
          )}
          <Dots
            data={markList}
            min={min}
            max={max}
            value={[beginVal, endVal]}
            vertical={vertical}
            prefixCls={prefixCls}
            reverse={reverse}
            onMouseDown={handleJumpClick}
          />
          <Marks
            data={markList}
            min={min}
            max={max}
            vertical={vertical}
            prefixCls={prefixCls}
            reverse={reverse}
            onMouseDown={handleJumpClick}
          />
          {range && (
            <SliderButton
              style={getBtnStyle(beginOffset)}
              disabled={disabled}
              prefixCls={prefixCls}
              value={beginVal}
              vertical={vertical}
              {...getTooltipProps()}
              onMoveBegin={getPosition}
              onMoving={handleBeginMove}
              onMoveEnd={handleMoveEnd}
            />
          )}
          <SliderButton
            style={getBtnStyle(endOffset)}
            disabled={disabled}
            prefixCls={prefixCls}
            value={endVal}
            vertical={vertical}
            {...getTooltipProps()}
            onMoveBegin={getPosition}
            onMoving={handleEndMove}
            onMoveEnd={handleMoveEnd}
          />
        </div>
        {isShowInput && (
          <Input
            min={min}
            max={max}
            step={step}
            value={[beginVal, endVal]}
            range={range}
            disabled={disabled}
            prefixCls={prefixCls}
            onChange={handleInputChange}
          />
        )}
      </div>
    </div>
  );
}

const SliderComponent = forwardRef<unknown, SliderProps>(Slider);

SliderComponent.displayName = 'Slider';

export default memo(SliderComponent);

export { SliderProps };
