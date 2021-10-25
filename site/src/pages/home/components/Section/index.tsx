import React, { CSSProperties, PropsWithChildren } from 'react';
import cs from '../../utils/classNames';
import SectionHeader, { SectionHeaderProps } from '../SectionHeader';
import styles from './index.module.less';

interface SectionProps {
  style?: CSSProperties;
  className?: string | string[];
  headerProps?: SectionHeaderProps;
  contentProps?: {
    style?: CSSProperties;
    className?: string | string[];
  };
}

export default function Section(props: PropsWithChildren<SectionProps>) {
  const { style, className, headerProps, contentProps, children } = props;

  return (
    <div className={cs(styles['section-wrapper'], className)} style={style}>
      <SectionHeader {...headerProps} />
      <div
        className={cs(styles['section-content'], contentProps?.className)}
        style={contentProps?.style}
      >
        {children}
      </div>
    </div>
  );
}
