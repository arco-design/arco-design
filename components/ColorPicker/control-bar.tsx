import React, { CSSProperties, useContext } from 'react';
import { ConfigContext } from '../ConfigProvider';
import { useControlBlock } from './hooks/useControlBlock';
import cs from '../_util/classNames';
import { Color } from './interface';

interface ControlBarProps {
  x: number;
  type?: 'hue' | 'alpha';

  colorString: string;
  // for alpha bar use
  color?: Color;
  onChange: (x: number) => void;
  style?: CSSProperties;
}

export const ControlBar: React.FC<ControlBarProps> = ({
  x,
  type = 'hue',
  color,
  colorString,
  onChange,
  style,
}) => {
  const { getPrefixCls } = useContext(ConfigContext);
  const prefixCls = getPrefixCls('color-picker');
  const { r, g, b } = color.rgb;

  const { blockRef, handlerRef, onMouseDown } = useControlBlock({
    value: [x, 0],
    onChange: (pos) => onChange(pos[0]),
  });

  const renderHandler = () => {
    return (
      <div
        ref={handlerRef}
        style={{
          left: `${x * 100}%`,
        }}
        className={`${prefixCls}-handler`}
      >
        <div className={`${prefixCls}-handler-center`} style={{ backgroundColor: colorString }} />
      </div>
    );
  };

  if (type === 'alpha') {
    return (
      <div className={`${prefixCls}-control-bar-bg`}>
        <div
          ref={blockRef}
          className={cs(
            `${prefixCls}-control-bar`,
            `${prefixCls}-control-bar-alpha`,
            `${prefixCls}-control-bar-alpha`
          )}
          style={{
            background: `linear-gradient(to right, rgba(0, 0, 0, 0), rgb(${r}, ${g}, ${b}))`,
            ...style,
          }}
          onMouseDown={onMouseDown as any}
        >
          {renderHandler()}
        </div>
      </div>
    );
  }

  return (
    <div
      ref={blockRef}
      style={style}
      className={cs(`${prefixCls}-control-bar`, `${prefixCls}-control-bar-hue`)}
      onMouseDown={onMouseDown as any}
    >
      {renderHandler()}
    </div>
  );
};
