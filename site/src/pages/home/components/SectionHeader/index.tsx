import React, { CSSProperties, ReactNode } from 'react';
import cs from '../../utils/classNames';
import LogoWrapper from '../../components/LogoWrapper';
import styles from './style/index.module.less';

export interface SectionHeaderProps {
  style?: CSSProperties;
  className?: string | string[];
  title?: string;
  subTitle?: string;
  description?: string;
  icon?: ReactNode;
  descriptionStyle?: CSSProperties;
  inDark?: boolean;
}

export default function SectionHeader(props: SectionHeaderProps) {
  const { title, subTitle, icon, description, className, style, descriptionStyle, inDark } = props;

  let titleContent = (
    <div className={styles['section-header-title-wrapper']}>
      {subTitle && <div className={styles['section-header-sub-title']}>{subTitle}</div>}
      {title && <div className={styles['section-header-title']}>{title}</div>}
    </div>
  );

  if (icon) {
    titleContent = (
      <div className={styles['section-header-content']}>
        <LogoWrapper icon={icon} size="large" theme className={styles['section-header-icon']} />
        {titleContent}
      </div>
    );
  }

  return (
    <div
      className={cs(className, styles['section-header'], {
        [styles['section-header-in-dark']]: inDark,
      })}
      style={style}
    >
      {titleContent}
      {description && (
        <div className={styles['section-header-description']} style={descriptionStyle}>
          {description}
        </div>
      )}
    </div>
  );
}
