import React from 'react';
import cs from 'classnames';
import styles from './style/iconWall.module.less';

export default function (props: { IconList: React.ReactNode[]; direction: 'left' | 'right' }) {
  const { IconList, direction } = props;

  const getIconNode = (list: React.ReactNode[]) => {
    return (
      <>
        {list.map((icon, index) => {
          return (
            <div className={`${styles[`icon-wall-item-${index}`]}`} key={index}>
              {icon}
            </div>
          );
        })}
      </>
    );
  };

  return (
    <div className={cs(styles['icon-wall'], styles[`icon-wall-${direction}`])}>
      <div className={styles['icon-wall-block']} data-calibrate-x="true" data-calibrate-y="true">
        {getIconNode(IconList)}
      </div>
    </div>
  );
}
