import React, { ReactNode, CSSProperties, ReactElement } from 'react';
import cs from '../../utils/classNames';
import styles from './style/index.module.less';

interface LogoWrapperProps {
  style?: CSSProperties;
  className?: string | string[];
  icon: ReactNode;
  iconSize?: number;
  size?: 'default' | 'large' | 'medium';
  theme?: boolean;
}

export default function LogoWrapper(props: LogoWrapperProps) {
  const { icon, style = {}, className, size = 'default', iconSize, theme = false } = props;

  const classNames = cs(
    styles.wrapper,
    {
      [styles.theme]: theme,
      [styles.large]: size === 'large',
      [styles.medium]: size === 'medium',
    },
    className
  );

  const iconStyle: CSSProperties = {};
  if (iconSize) {
    iconStyle.width = iconSize;
    iconStyle.height = iconSize;
  }

  return (
    <div className={classNames} style={style}>
      {React.cloneElement(icon as ReactElement, { style: iconStyle, className: styles.icon })}
    </div>
  );
}
