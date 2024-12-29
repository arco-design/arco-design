import React, { CSSProperties, useContext } from 'react';
import { ConfigContext } from '../ConfigProvider';
import { useControlBlock } from './hooks/useControlBlock';
import cs from '../_util/classNames';

interface MultiValueItem {
  value: number;
  key: string;
}

interface ControlBarProps {
  style?: CSSProperties;
  className?: string;
  multiple?: boolean;
  value: number | MultiValueItem[];
  onChange: (x: number) => void;
  onAdd?: (x: number) => void;
  onActive?: (key: string) => void;
  renderHandlerStyle?: (key?: string, index?: number) => CSSProperties;
  renderHandlerCenterStyle?: (key?: string, index?: number) => CSSProperties;
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
      ? (value as MultiValueItem[]).map((item) => ({
          value: [item.value / 100, 0] as [number, number],
          key: item.key,
        }))
      : [value as number, 0],
    onChange: (pos) => onChange(pos[0]),
    onAdd: (pos) => onAdd(pos[0]),
    onActive,
  });

  const renderHandler = () => {
    const render = (x: number, key?: string, index?: number) => {
      return (
        <div
          key={key}
          ref={handlerRef}
          className={`${prefixCls}-handler`}
          style={{
            left: `${x * 100}%`,
            ...renderHandlerStyle?.(key, index),
          }}
          data-key={key}
        >
          <div
            className={`${prefixCls}-handler-center`}
            style={renderHandlerCenterStyle?.(key, index)}
            data-key={key}
          />
        </div>
      );
    };
    return multiple
      ? (value as MultiValueItem[]).map((item, index) => {
          return render(item.value, item.key, index);
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
