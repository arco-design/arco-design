import React, { useContext } from 'react';
import { ConfigContext } from '../ConfigProvider';
import useMergeProps from '../_util/hooks/useMergeProps';
import cs from '../_util/classNames';
import Trigger from '../Trigger';
import { Panel } from './panel';
import { colors } from './colors';
import { ColorPickerProps } from './interface';
import { useColorPicker } from './hooks/useColorPicker';
import { isFunction, isNullOrUndefined } from '../_util/is';
import { getGradientString, renderBackground } from './utils';

const defaultProps: ColorPickerProps = {
  size: 'default' as const,
  presetColors: colors,
};

function ColorPicker(baseProps: React.PropsWithChildren<ColorPickerProps>, ref) {
  const { getPrefixCls, componentConfig, size: ctxSize } = useContext(ConfigContext);
  const props = useMergeProps<ColorPickerProps>(
    baseProps,
    { ...defaultProps, size: ctxSize || defaultProps.size },
    componentConfig?.ColorPicker
  );
  const {
    style,
    className,
    size,
    mode,
    disabled,
    disabledAlpha = false,
    triggerProps = {},
    unmountOnExit,
    showText,
    historyColors,
    presetColors,
    showHistory,
    showPreset,
    renderFooter,
  } = props;

  const prefixCls = getPrefixCls('color-picker');

  const {
    value,
    activeMode,
    gradientColors,
    activeColorId,
    activeColorIdRef,
    popupVisible,
    color,
    alpha,
    onHsvChange,
    onAlphaChange,
    onVisibleChange,
    onActiveModeChange,
    onGradientColorsChange,
    onActiveColorIdChange,
  } = useColorPicker(props);

  const renderInput = () => {
    const customTriggerElement = isFunction(baseProps.triggerElement)
      ? baseProps.triggerElement({ value })
      : baseProps.triggerElement;

    if (!isNullOrUndefined(customTriggerElement)) {
      return customTriggerElement;
    }

    const stringifiedValue = typeof value === 'string' ? value : getGradientString(value);

    return (
      <div
        className={cs(prefixCls, className, {
          [`${prefixCls}-size-${size}`]: size,
          [`${prefixCls}-disabled`]: disabled,
        })}
        style={style}
        ref={ref}
      >
        <div
          className={`${prefixCls}-preview`}
          style={
            Array.isArray(value)
              ? {
                  background: renderBackground(value),
                }
              : { backgroundColor: value }
          }
        />
        {Boolean(showText) && <div className={`${prefixCls}-value`}>{stringifiedValue}</div>}
        <input
          className={`${prefixCls}-input`}
          value={stringifiedValue}
          disabled={disabled}
          readOnly
        />
      </div>
    );
  };

  const renderPanel = () => {
    return (
      <Panel
        value={value}
        mode={mode}
        activeMode={activeMode}
        gradientColors={gradientColors}
        activeColorId={activeColorId}
        activeColorIdRef={activeColorIdRef}
        color={color}
        alpha={alpha}
        historyColors={historyColors}
        presetColors={presetColors}
        showHistory={showHistory}
        showPreset={showPreset}
        onHsvChange={onHsvChange}
        onAlphaChange={onAlphaChange}
        onActiveModeChange={onActiveModeChange}
        onGradientColorsChange={onGradientColorsChange}
        onActiveColorIdChange={onActiveColorIdChange}
        disabledAlpha={disabledAlpha}
        renderFooter={renderFooter}
      />
    );
  };

  return (
    <Trigger
      popup={renderPanel}
      trigger="click"
      position="bl"
      popupAlign={{
        top: 8,
        bottom: 8,
        left: 8,
        right: 8,
      }}
      disabled={disabled}
      popupVisible={popupVisible}
      classNames="slideDynamicOrigin"
      unmountOnExit={unmountOnExit}
      {...triggerProps}
      onVisibleChange={onVisibleChange}
    >
      {renderInput()}
    </Trigger>
  );
}

const ColorPickerComponent = React.forwardRef<unknown, ColorPickerProps>(ColorPicker);

ColorPickerComponent.displayName = 'ColorPicker';

export default ColorPickerComponent;

export { ColorPickerProps };
