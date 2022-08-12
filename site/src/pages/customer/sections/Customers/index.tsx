import React from 'react';
import cs from 'classnames';
import Case from './case';
import styles from './styles/index.module.less';
import useShowcaseData from '../../../../hooks/useShowCase';
import Anchor from './anchor';
import useTheme from '../../../home/hooks/useTheme';

export default function () {
  const { realTheme } = useTheme();

  const data = useShowcaseData();

  return (
    <>
      <div
        className={cs(styles['customer-color-handler'], {
          [styles['customer-color-handler-dark']]: realTheme === 'dark',
        })}
      />
      <div className={styles['customer-case']}>
        <div className={styles['customer-case-sider']}>
          <Anchor list={data} />
        </div>
        <div className={styles['customer-case-content']}>
          {data.map((item, index) => (
            <Case {...item} key={index} />
          ))}
        </div>
      </div>
    </>
  );
}
