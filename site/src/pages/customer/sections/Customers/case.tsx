import React from 'react';
import styles from './styles/case.module.less';
import { IconArrowRight } from '@arco-design/web-react/icon';
import { ShowCaseCardProps } from '../../../../hooks/useShowCase';

const prefixCls = 'case';

export default function (props: ShowCaseCardProps) {
  const { data = [], link = [] } = props;
  const getCaseRecord = () => {
    const recordPrefixCls = `${prefixCls}-record`;
    if (data.length) {
      return (
        <div className={styles[`${recordPrefixCls}`]}>
          {data.map((item, index) => (
            <div className={styles[`${recordPrefixCls}-item`]} key={index}>
              <div className={styles[`${recordPrefixCls}-item-label`]}>{item.label}</div>
              <div className={styles[`${recordPrefixCls}-item-value`]}>{item.text}</div>
            </div>
          ))}
        </div>
      );
    }
    return '';
  };

  const hasInfo = data.length || link.length;

  return (
    <div className={styles[`${prefixCls}-wrapper`]}>
      <div className={styles[`${prefixCls}-title`]} id={props.title}>
        {props.logo}
      </div>
      <div className={styles[`${prefixCls}-content`]}>{props.content}</div>
      {!!hasInfo && (
        <div className={styles[`${prefixCls}-info`]}>
          {getCaseRecord()}
          <div className={styles[`${prefixCls}-link-wrapper`]}>
            {link.map((item, index) => (
              <div
                key={index}
                className={styles['card-link']}
                onClick={() => {
                  window.open(item.href);
                }}
              >
                <div className={styles['card-link-left']}>
                  <div className={styles['card-link-logo']}>{item.logo}</div>
                  <div className={styles['card-link-name']}>{item.name}</div>
                </div>
                <div className={styles['card-link-arrow']}>
                  <IconArrowRight />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      <div className={styles[`${prefixCls}-cover`]}>
        <img src={props.image} alt="cover" />
      </div>
    </div>
  );
}
