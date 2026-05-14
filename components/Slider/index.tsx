import React, { forwardRef, memo, useContext, CSSProperties, useRef, useMemo } from 'react';
import NP, { plus, times, divide } from 'number-precision';
import omit from '../_util/omit';
import SliderButton, { SliderButtonHandle } from './button';
import Marks from './marks';
import Dots from './dots';
import Input from './input';
import Ticks from './ticks';
import { isFunction, isObject, isArray } from '../_util/is';
import {
  findNearestIndex,
  formatPercent,
  getIntervalOffset,
  needSort,
  sortNumberArray,
} from './utils';
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

  const refSliderButtons = useRef<{ [key: number]: SliderButtonHandle }>({});

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
  let curVal = getLegalRangeValue(value);
  const lastVal = useRef<number[]>(curVal);
  // let [beginVal, endVal] = curVal;
  const reverseOrder = useRef(needSort(curVal));

  // value变化后 更新lastVal
  useUpdate(() => {
    lastVal.current = getLegalRangeValue(value);
  }, [value, getLegalRangeValue]);

  if (reverseOrder.current) {
    curVal = sortNumberArray(curVal);
  }

  const maxVal = curVal[curVal.length - 1];
  const minVal = curVal[0];

  // 是否显示输入框。多点选择不显示 input
  const isShowInput = showInput && !onlyMarkValue && (!range || curVal.length < 3);
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

  function getEmitParams(value: number[]): number | number[] {
    const sortedValue = sortNumberArray(value);
    return range ? sortedValue : sortedValue[sortedValue.length - 1];
  }

  function updateValue(val) {
    const copyVal = val.map((x) => getLegalValue(x));
    lastVal.current = copyVal;
    return copyVal;
  }

  function onChange(val, reason?: 'mousemove' | 'jumpToClick' | 'inputValueChange') {
    const newValue = updateValue(val);
    const emitParams = getEmitParams(newValue);

    setValue(emitParams);

    // 在手动修改的情况下才可能出现反序问题。
    if (reason === 'inputValueChange') {
      reverseOrder.current = newValue.some((x, i) => x > newValue[i]);
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
    let [range1, range2] = [curVal[0], curVal[curVal.length - 1]];
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
    // 防止拖动的时候鼠标选中
    e.preventDefault();
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
    // 找到 value 临近的两个值。
    const [beforeIndex, nextIndex] = findNearestIndex(value, curVal);
    const nearBeginVal = curVal[beforeIndex];
    const nearEndValue = curVal[nextIndex];
    const copyVal = curVal.slice(0);

    if (range && nearEndValue - value > value - nearBeginVal) {
      copyVal[beforeIndex] = value;
      onChange(copyVal, 'jumpToClick');
      // 触发鼠标点击的事件，SliderButton 在此时可以一起被拖动
      refSliderButtons.current[beforeIndex]?.mouseDown?.();
    } else {
      copyVal[nextIndex] = value;
      onChange(copyVal, 'jumpToClick');
      refSliderButtons.current[nextIndex]?.mouseDown?.();
    }
    onMouseUp();
  }

  function handleInputChange(val) {
    onChange(val, 'inputValueChange');
    onMouseUp();
  }

  // 拖动开始节点
  function handleMove(x: number, y: number, index) {
    isDragging.current = true;
    const copyVal = curVal.slice(0);

    copyVal[index] = getValueByCoords(x, y);

    onChange(copyVal, 'mousemove');
  }

  function handleMoveEnd() {
    isDragging.current = false;
    onMouseUp();
  }

  // 结束节点的 arrow event
  function handleArrowEvent(type: 'addition' | 'subtraction', index: number) {
    if (disabled) return;
    const copyVal = curVal.slice(0);

    copyVal[index] = getNextMarkValue(curVal[index], type);

    onChange(copyVal);
  }

  // bar 移动中
  function onBarMouseMove(e) {
    const newVal = getLegalValue(getValueByCoords(e.clientX, e.clientY));
    const offsetVal = newVal - barStartDragVal.current;
    const copyVal = curVal.map((x) => x + offsetVal);

    if (copyVal.every((v) => isLegalValue(v))) {
      onChange(copyVal, 'mousemove');
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
          <div
            className={`${prefixCls}-bar`}
            style={getBarStyle([
              getIntervalOffset(minVal, intervalConfigs),
              getIntervalOffset(maxVal, intervalConfigs),
            ])}
          />
          {showTicks && (
            <Ticks
              intervalConfigs={intervalConfigs}
              min={min}
              max={max}
              valueRange={[minVal, maxVal]}
              prefixCls={prefixCls}
              vertical={vertical}
              reverse={isReverse}
            />
          )}
          <Dots
            data={markList}
            intervalConfigs={intervalConfigs}
            valueRange={[minVal, maxVal]}
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
          {curVal.map((val, index) => {
            if (!range && index !== curVal.length - 1) {
              return null;
            }
            return (
              <SliderButton
                key={index}
                ref={(ref) => (refSliderButtons.current[index] = ref)}
                style={getBtnStyle(getIntervalOffset(val, intervalConfigs))}
                disabled={disabled}
                prefixCls={prefixCls}
                value={val}
                maxValue={max}
                minValue={min}
                vertical={vertical}
                {...getTooltipProps()}
                onMoveBegin={getPosition}
                onMoving={(x, y) => handleMove(x, y, index)}
                onMoveEnd={handleMoveEnd}
                onArrowEvent={(type) => handleArrowEvent(type, index)}
              />
            );
          })}
        </div>
        {isShowInput && (
          <Input
            min={min}
            max={max}
            step={step}
            value={curVal}
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
