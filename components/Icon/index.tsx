import React, { Component, CSSProperties, SVGAttributes } from 'react';
import addFromIconFontCn from './addFromIconFontCn';
import cs from '../_util/classNames';
import { ConfigConsumer } from '../ConfigProvider';

export interface IconProps extends Omit<SVGAttributes<SVGElement>, 'className'> {
  style?: CSSProperties;
  type?: string;
  spin?: boolean;
  className?: string | string[];
}

export interface CustomIconComponentProps {
  style?: CSSProperties;
  className?: string;
  width?: string | number;
  height?: string | number;
  fill?: string;
  viewBox?: string;
}

class Icon extends Component<IconProps> {
  static displayName = 'Icon';

  static addFromIconFontCn = addFromIconFontCn;

  renderIcon = ({ getPrefixCls }) => {
    const { className, spin, children, type, ...rest } = this.props;
    const defaultProps = {
      width: '1em',
      height: '1em',
      fill: 'currentColor',
    };
    const iconProps: CustomIconComponentProps = {
      ...defaultProps,
      ...rest,
    };
    const prefixCls = getPrefixCls('icon');
    const classNames = cs(
      prefixCls,
      type,
      {
        [`${prefixCls}-loading`]: spin,
      },
      className
    );
    iconProps.className = classNames;
    return <svg {...iconProps}>{children}</svg>;
  };

  render() {
    return <ConfigConsumer>{this.renderIcon}</ConfigConsumer>;
  }
}

export default Icon;
