import React from 'react';
import styles from './index.module.less';
import { coverArcoMaterial } from '../../utils/cdn-resource';

export default function ContentMaterial() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.cover}>
        <img src={coverArcoMaterial} />
      </div>
    </div>
  );
}
