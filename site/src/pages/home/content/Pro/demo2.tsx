import React from 'react';
import Form from './form';
import styles from './style/index.module.less';

export default function Demo2() {
  return (
    <div className={`${styles.demo} ${styles.demo2}`}>
      <Form />
    </div>
  );
}
