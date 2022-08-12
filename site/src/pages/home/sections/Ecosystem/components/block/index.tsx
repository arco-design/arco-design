import React, { ReactNode, ReactElement, CSSProperties } from 'react';
import cs from '../../../../utils/classNames';
import styles from './index.module.less';

export interface BlockProps {
  style?: CSSProperties;
  className?: string | string[];
  name: string;
  logo: ReactNode;
  logoPlaceholder: ReactNode;
  desc?: string;
  image?: string;
  onClick?: () => void;
  'data-aos'?: string;
}

export default function EcosystemBlock(props: BlockProps) {
  const { logo, logoPlaceholder, name, desc, image, style, className, onClick } = props;

  return (
    <div
      className={cs(styles['ecosystem-block'], className)}
      style={style}
      onClick={onClick}
      data-aos={props['data-aos']}
    >
      <div className={styles['ecosystem-block-header']}>
        <div className={styles['ecosystem-block-icon-wrapper']}>
          {React.cloneElement(logo as ReactElement, { className: styles['ecosystem-block-icon'] })}
          {React.cloneElement(logoPlaceholder as ReactElement, {
            className: cs(
              styles['ecosystem-block-icon'],
              styles['ecosystem-block-icon-placeholder']
            ),
          })}
        </div>
        <div className={styles['ecosystem-block-title']}>{name}</div>
      </div>
      {desc && <div className={styles['ecosystem-block-description']}>{desc}</div>}
      {image && <img className={styles['ecosystem-block-image']} src={image} />}
    </div>
  );
}
