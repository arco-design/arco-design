import React, { CSSProperties, useContext } from 'react';
import { ConfigContext } from '../ConfigProvider';
import { useControlBlock } from './hooks/useControlBlock';
import cs from '../_util/classNames';

interface ControlBarProps {
  style?: CSSProperties;
  className?: string;
  multiple?: boolean;
  value: number | number[];
  onChange: (x: number) => void;
  onAdd?: (x: number) => void;
  onActive?: (index: number) => void;
  renderHandlerStyle?: (index?: number) => CSSProperties;
  renderHandlerCenterStyle?: (index?: number) => CSSProperties;
}

export const ControlBar: React.FC<ControlBarProps> = ({
  className,
  multiple = false,
  value,
  onChange,
  onActive,
  onAdd,
  style,
  renderHandlerStyle,
  renderHandlerCenterStyle,
}) => {
  const { getPrefixCls } = useContext(ConfigContext);
  const prefixCls = getPrefixCls('color-picker');

  const { blockRef, handlerRef, onMouseDown } = useControlBlock({
    multiple,
    value: multiple
      ? (value as number[]).map((item) => [item / 100, 0] as [number, number])
      : [value as number, 0],
    onChange: (pos) => onChange(pos[0]),
    onAdd: (pos) => onAdd(pos[0]),
    onActive,
  });

  const renderHandler = () => {
    const render = (x: number, index?: number) => {
      return (
        <div
          key={`${x}-${index}`}
          ref={handlerRef}
          style={{
            left: `${x * 100}%`,
            ...renderHandlerStyle?.(index),
          }}
          className={`${prefixCls}-handler`}
          data-index={index}
        >
          <div
            className={`${prefixCls}-handler-center`}
            style={renderHandlerCenterStyle?.(index)}
            data-index={index}
          />
        </div>
      );
    };
    return multiple
      ? (value as number[]).map((item, index) => {
          return render(item, index);
        })
      : render(value as number);
  };

  return (
    <div
      ref={blockRef}
      style={style}
      className={cs(`${prefixCls}-control-bar`, className)}
      onMouseDown={onMouseDown as any}
    >
      {renderHandler()}
    </div>
  );
};
