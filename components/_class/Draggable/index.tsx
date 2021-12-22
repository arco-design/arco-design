import React, { useContext, useState } from 'react';

import { ConfigContext } from '../../ConfigProvider';
import cs from '../../_util/classNames';
import Item from './item';
import { DraggableProps } from './interface';

export default function Draggable(props: DraggableProps) {
  const { getPrefixCls } = useContext(ConfigContext);
  const prefixCls = getPrefixCls('draggable');
  const { className, children, direction, onIndexChange, itemWrapperStyle } = props;

  const [dragItemIndex, setDragItemIndex] = useState(null);

  return (
    <div className={cs(prefixCls, className)}>
      {React.Children.map(children, (child, index) => {
        return (
          <Item
            style={itemWrapperStyle}
            prefixCls={prefixCls}
            direction={direction}
            onDragStart={() => setDragItemIndex(index)}
            onDragEnd={() => setDragItemIndex(null)}
            onDrop={(_, dropPosition) => {
              const prevIndex = dragItemIndex;
              const nextIndex =
                dropPosition === 'left' || dropPosition === 'top' ? index : index + 1;
              if (onIndexChange && prevIndex !== nextIndex) {
                onIndexChange(nextIndex, prevIndex);
              }
            }}
          >
            {child}
          </Item>
        );
      })}
    </div>
  );
}

Draggable.defaultProps = {
  direction: 'vertical',
};
