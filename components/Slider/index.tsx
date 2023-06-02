import React, { forwardRef, memo, useContext, CSSProperties, useRef, useMemo } from 'react';
import NP, { plus, times, divide } from 'number-precision';
import omit from '../_util/omit';
import SliderButton from './button';
import Marks from './marks';
import Dots from './dots';
import Input from './input';
import Ticks from './ticks';
import { isFunction, isObject, isArray } from '../_util/is';
import { formatPercent, getIntervalOffset } from './utils';
import cs from '../_util/classNames';
import { ConfigContext } from '../ConfigProvider';
import { TooltipPosition, SliderProps } from './interface';
import useMergeValue from '../_util/hooks/useMergeValue';
import { off, on } from '../_util/dom';
import useLegalValue from './hooks/useLegalValue';
import useInterval from './hooks/useInterval';
import useMergeProps from '../_util/hooks/useMergeProps';
import useUpdate from '../_util/hooks/useUpdate';

NP.enableBoundaryChecking(false);

const defaultProps: SliderProps = {
  max: 100,
  min: 0,
  step: 1,
};

function Slider(baseProps: SliderProps, ref) {
  const { getPrefixCls, componentConfig, rtl } = useContext(ConfigContext);
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
    getIntervalConfig,
    ...rest
  } = props;

  const range = !!propRange;
  const rangeConfig = isObject(propRange) ? { ...propRange } : { draggableBar: false };
  const isReverse = rtl ? !reverse : reverse;

  const { intervalConfigs, markList } = useInterval({
    min,
    max,
    onlyMarkValue,
    step,
    marks,
    getIntervalConfig,
  });

  const { getLegalValue, getLegalRangeValue, isLegalValue, getNextMarkValue } = useLegalValue({
    isRange: range,
    min,
    max,
    onlyMarkValue,
    step,
    intervalConfigs,
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
  const reverseOrder = useRef(beginVal > endVal);

  // value变化后 更新lastVal
  useUpdate(() => {
    lastVal.current = getLegalRangeValue(value);
  }, [value, getLegalRangeValue]);

  if (reverseOrder.current) {
    [beginVal, endVal] = [endVal, beginVal];
  }
  // 偏移比例
  const beginOffset = getIntervalOffset(beginVal, intervalConfigs);
  const endOffset = getIntervalOffset(endVal, intervalConfigs);

  // 是否显示输入框
  const isShowInput = showInput && !onlyMarkValue;
  const extraInputProps = useMemo(() => {
    if (isShowInput && (isArray(showInput) || isObject(showInput))) {
      return isArray(showInput) ? [...showInput] : [{ ...showInput }, { ...showInput }];
    }
    return [];
  }, [isShowInput, showInput]);

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
    return [newBeginVal, newEndVal];
  }

  function onChange(val, reason?: 'mousemove' | 'jumpToClick' | 'inputValueChange') {
    const [newBeginVal, newEndVal] = updateValue(val);
    const emitParams = getEmitParams([newBeginVal, newEndVal]);
    setValue(emitParams);

    // 在手动修改的情况下才可能出现反序问题。
    if (reason === 'inputValueChange') {
      reverseOrder.current = newBeginVal > newEndVal;
    } else {
      // 在mousemove 跟 jumpToClick 顺序会保持 [begin,end]
      reverseOrder.current = false;
    }
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
    let diff = isReverse ? left + width - x : x - left;
    if (vertical) {
      roadLength = height;
      diff = isReverse ? y - top : top + height - y;
    }
    if (roadLength <= 0) {
      return 0;
    }
    // 通过坐标点偏移算出当前值相对于整个滑动轴的比例位置
    let offset = Math.max(divide(diff, roadLength), 0);
    offset = Math.min(1, offset);
    // 通过偏移值算出当前值在哪个区间
    const currentInterval = intervalConfigs.find((config) => {
      return offset >= config.beginOffset && offset <= config.endOffset;
    });
    const { begin, beginOffset, step: currentStep, endOffset, end } = currentInterval;
    // 当前值对整体来说，多出这个区间的比例
    const currentValueOffset = offset - beginOffset;
    // 这个区间整体的比例
    const currentIntervalOffset = endOffset - beginOffset;
    // 当前在这个区间的值 = （在这个区间的比例（相对于整体） / 这个区间相对于整体的比例）* 这个区间的总值
    const valueInInterval = (currentValueOffset / currentIntervalOffset) * (end - begin);
    // 算出当前值在这个区间的步数
    const stepNum = Math.round(valueInInterval / currentStep);
    // 当前值 = 区间起始值 + 区间步数 * 步长
    return plus(begin, times(stepNum, currentStep));
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
          [isReverse ? 'top' : 'bottom']: beginOffset,
          [isReverse ? 'bottom' : 'top']: endOffset,
        }
      : {
          [isReverse ? 'right' : 'left']: beginOffset,
          [isReverse ? 'left' : 'right']: endOffset,
        };
  }

  function getBtnStyle(offset: number): CSSProperties {
    return vertical
      ? { [isReverse ? 'top' : 'bottom']: formatPercent(offset) }
      : { [isReverse ? 'right' : 'left']: formatPercent(offset) };
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
      onChange([value, endVal], 'jumpToClick');
    } else {
      onChange([beginVal, value], 'jumpToClick');
    }
    onMouseUp();
  }

  function handleInputChange(val) {
    onChange(val, 'inputValueChange');
    onMouseUp();
  }

  // 拖动开始节点
  function handleBeginMove(x: number, y: number) {
    isDragging.current = true;
    onChange([getValueByCoords(x, y), endVal], 'mousemove');
  }

  // 拖动结束节点
  function handleEndMove(x: number, y: number) {
    isDragging.current = true;
    onChange([beginVal, getValueByCoords(x, y)], 'mousemove');
  }

  function handleMoveEnd() {
    isDragging.current = false;
    onMouseUp();
  }

  // 结束节点的 arrow event
  function handleEndArrowEvent(type: 'addition' | 'subtraction') {
    if (disabled) return;

    onChange([beginVal, getNextMarkValue(endVal, type)]);
  }

  // 起始节点的 arrow event
  function handleBeginArrowEvent(type: 'addition' | 'subtraction') {
    if (disabled) return;
    onChange([getNextMarkValue(beginVal, type), endVal]);
  }

  // bar 移动中
  function onBarMouseMove(e) {
    const newVal = getLegalValue(getValueByCoords(e.clientX, e.clientY));
    const offsetVal = newVal - barStartDragVal.current;
    const newBeginVal = beginVal + offsetVal;
    const newEndVal = endVal + offsetVal;

    if (isLegalValue(newBeginVal) && isLegalValue(newEndVal)) {
      onChange([newBeginVal, newEndVal], 'mousemove');
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
      {...omit(rest, [
        'defaultValue',
        'value',
        'onChange',
        'getTooltipContainer',
        'formatTooltip',
        'onAfterChange',
      ])}
      className={cs(
        prefixCls,
        {
          [`${prefixCls}-vertical`]: vertical,
          [`${prefixCls}-with-marks`]: marks,
          [`${prefixCls}-reverse`]: isReverse,
          [`${prefixCls}-rtl`]: rtl,
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
              intervalConfigs={intervalConfigs}
              min={min}
              max={max}
              value={[beginVal, endVal]}
              prefixCls={prefixCls}
              vertical={vertical}
              reverse={isReverse}
            />
          )}
          <Dots
            data={markList}
            intervalConfigs={intervalConfigs}
            value={[beginVal, endVal]}
            vertical={vertical}
            prefixCls={prefixCls}
            reverse={isReverse}
            onMouseDown={handleJumpClick}
          />
          <Marks
            data={markList}
            intervalConfigs={intervalConfigs}
            vertical={vertical}
            prefixCls={prefixCls}
            reverse={isReverse}
            onMouseDown={handleJumpClick}
          />
          {range && (
            <SliderButton
              style={getBtnStyle(beginOffset)}
              disabled={disabled}
              prefixCls={prefixCls}
              value={beginVal}
              maxValue={max}
              minValue={min}
              vertical={vertical}
              {...getTooltipProps()}
              onMoveBegin={getPosition}
              onMoving={handleBeginMove}
              onMoveEnd={handleMoveEnd}
              onArrowEvent={handleBeginArrowEvent}
            />
          )}
          <SliderButton
            style={getBtnStyle(endOffset)}
            disabled={disabled}
            prefixCls={prefixCls}
            value={endVal}
            maxValue={max}
            minValue={min}
            vertical={vertical}
            {...getTooltipProps()}
            onMoveBegin={getPosition}
            onMoving={handleEndMove}
            onMoveEnd={handleMoveEnd}
            onArrowEvent={handleEndArrowEvent}
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
            extra={extraInputProps}
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
