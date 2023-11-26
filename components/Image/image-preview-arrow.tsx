import React, { useContext } from 'react';
import IconLeft from '../../icon/react-icon/IconLeft';
import IconRight from '../../icon/react-icon/IconRight';
import { ConfigContext } from '../ConfigProvider';
import cs from '../_util/classNames';

interface ImagePreviewArrowProps {
  current: number;
  previewCount: number;
  infinite?: boolean;
  onPrev?: () => void;
  onNext?: () => void;
}

function ImagePreviewArrow(props: ImagePreviewArrowProps) {
  const { current, previewCount, infinite = false, onPrev, onNext } = props;
  const { getPrefixCls } = useContext(ConfigContext);

  const prefixCls = getPrefixCls('image-preview');
  const classNames = cs(`${prefixCls}-arrow`);
  const disableLeft = !infinite && current <= 0;
  const disableRight = !infinite && current >= previewCount - 1;

  return (
    <div className={classNames}>
      <div
        className={cs(`${prefixCls}-arrow-left`, {
          [`${prefixCls}-arrow-disabled`]: disableLeft,
        })}
        onClick={(e) => {
          e.preventDefault();
          !disableLeft && onPrev?.();
        }}
      >
        <IconLeft />
      </div>
      <div
        className={cs(`${prefixCls}-arrow-right`, {
          [`${prefixCls}-arrow-disabled`]: disableRight,
        })}
        onClick={(e) => {
          e.preventDefault();
          !disableRight && onNext?.();
        }}
      >
        <IconRight />
      </div>
    </div>
  );
}

export default ImagePreviewArrow;
