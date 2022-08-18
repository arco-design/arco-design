import React, { CSSProperties, ReactElement, ReactNode } from 'react';
import cs from '../../utils/classNames';
import styles from './style/index.module.less';

interface CardIntroduceProps {
  style?: CSSProperties;
  className?: string | string[];
  title?: string;
  description?: string | ReactNode;
  code?: ReactNode;
  product?: {
    name: string | ReactNode;
    logo: ReactNode;
    description: string;
    extra?: ReactNode;
  };
}

export default function CardIntroduce(props: CardIntroduceProps) {
  const { style, className, title, description, code, product } = props;
  const hasContent = Boolean(title || description);
  const hasCode = Boolean(code);
  const hasProduct = Boolean(product);
  const classNames = cs(styles.wrapper, className, {
    [`${styles['with-code']}`]: hasCode,
  });

  return (
    <div className={classNames} style={style} data-aos="scale-fade-in">
      {hasCode && <div className={styles.code}>{code}</div>}
      {hasContent && (
        <div className={styles.content}>
          {title && <div className={styles.title}>{title}</div>}
          {description && <div className={styles.description}>{description}</div>}
        </div>
      )}
      {hasProduct && (
        <div className={styles.footer}>
          <div className={styles.product}>
            <div className={styles['product-header']}>
              <div className={styles['product-title']}>
                {React.cloneElement(product.logo as ReactElement, {
                  className: styles['product-title-icon'],
                })}
                <div className={styles['product-title-text']}>{product.name}</div>
              </div>
              <div className={styles['product-extra']}>{product.extra}</div>
            </div>
            <div className={styles['product-content']}>{product.description}</div>
          </div>
        </div>
      )}
    </div>
  );
}
