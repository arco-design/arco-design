import React, { useContext } from 'react';
import { ConfigContext } from '../ConfigProvider';
import { ColorPickerProps } from './interface';
import useMergeProps from '../_util/hooks/useMergeProps';
import { Panel } from './panel';
import cs from '../_util/classNames';
import Trigger from '../Trigger';
import { colors } from './colors';
import { useColorPicker } from './hooks/useColorPicker';

const defaultProps: ColorPickerProps = {
  size: 'default' as const,
  presetColors: colors,
};

function ColorPicker(baseProps: ColorPickerProps, ref) {
  const { getPrefixCls, componentConfig } = useContext(ConfigContext);
  const props = useMergeProps<ColorPickerProps>(
    baseProps,
    defaultProps,
    componentConfig?.ColorPicker
  );
  const {
    style,
    className,
    size,
    disabled,
    triggerProps = {},
    unmountOnExit,
    showText,
    historyColors,
    presetColors,
    showHistory,
    showPreset,
  } = props;

  const prefixCls = getPrefixCls('color-picker');

  const {
    value,
    popupVisible,
    color,
    alpha,
    colorString,
    onHsvChange,
    onAlphaChange,
    onVisibleChange,
  } = useColorPicker(props);

  const renderInput = () => {
    return (
      <div
        className={cs(prefixCls, className, {
          [`${prefixCls}-size-${size}`]: size,
          [`${prefixCls}-disabled`]: disabled,
        })}
        style={style}
        ref={ref}
      >
        <div className={`${prefixCls}-preview`} style={{ backgroundColor: value }} />
        {Boolean(showText) && <div className={`${prefixCls}-value`}>{value}</div>}
        <input className={`${prefixCls}-input`} value={value} disabled={disabled} readOnly />
      </div>
    );
  };

  const renderPanel = () => {
    return (
      <Panel
        color={color}
        alpha={alpha}
        colorString={colorString}
        historyColors={historyColors}
        presetColors={presetColors}
        showHistory={showHistory}
        showPreset={showPreset}
        onHsvChange={onHsvChange}
        onAlphaChange={onAlphaChange}
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
