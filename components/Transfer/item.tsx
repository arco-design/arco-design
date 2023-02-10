import React, { useEffect, useRef, useState } from 'react';
import { TransferItemProps } from './interface';
import cs from '../_util/classNames';
import IconHover from '../_class/icon-hover';
import Checkbox from '../Checkbox';
import IconClose from '../../icon/react-icon/IconClose';
import IconDragDotVertical from '../../icon/react-icon/IconDragDotVertical';
import useKeyboardEvent from '../_util/hooks/useKeyboardEvent';

type ActiveStatus = 'none' | 'dragged' | 'dragging';

function TransferItem(props: TransferItemProps) {
  const {
    className,
    prefixCls,
    render,
    item,
    selectedKeys,
    disabled,
    draggable,
    droppable,
    allowClear,
    onItemSelect,
    onItemRemove,
    onDragStart,
    onDragEnd,
    onDragLeave,
    onDragOver,
    onDrop,
  } = props;
  const getKeyboardEvents = useKeyboardEvent();
  const baseClassName = `${prefixCls}-view-item`;

  const refItem = useRef(null);
  const refDraggedTimer = useRef(null);

  const [dragStatus, setDragStatus] = useState<ActiveStatus>('none');
  const [dragOver, setDragOver] = useState(false);
  const [dragPosition, setDragPosition] = useState(0);

  const _disabled = disabled || item.disabled;
  const _draggable = draggable && !_disabled;
  const checked = selectedKeys.indexOf(item.key) > -1;
  const itemContent = render ? render(item) : item.value;

  useEffect(() => {
    return () => {
      refDraggedTimer.current && clearTimeout(refDraggedTimer.current);
    };
  }, []);

  useEffect(() => {
    if (dragStatus === 'dragged') {
      refDraggedTimer.current = setTimeout(() => setDragStatus('none'), 1000);
    }
  }, [dragStatus]);

  return (
    <li
      key={item.key}
      ref={refItem}
      className={cs(
        baseClassName,
        {
          [`${baseClassName}-disabled`]: _disabled,
          [`${baseClassName}-draggable`]: _draggable,
          [`${baseClassName}-gap-top`]: dragOver && dragPosition < 0,
          [`${baseClassName}-gap-bottom`]: dragOver && dragPosition > 0,
          [`${baseClassName}-${dragStatus}`]: dragStatus !== 'none',
        },
        className
      )}
      draggable={_draggable}
      onDragStart={(e) => {
        e.stopPropagation();
        setDragStatus('dragging');
        onDragStart && onDragStart(e, item);

        try {
          // ie throw error
          // firefox-need-it
          e.dataTransfer.setData('text/plain', '');
        } catch (error) {
          // empty
        }
      }}
      onDragEnd={(e) => {
        e.stopPropagation();
        setDragOver(false);
        setDragStatus('dragged');
        onDragEnd && onDragEnd(e, item);
      }}
      onDragOver={(e) => {
        if (droppable) {
          e.stopPropagation();
          e.preventDefault();

          const rect = refItem.current.getBoundingClientRect();
          const threshold = window.pageYOffset + rect.top + rect.height / 2;
          const position = e.pageY > threshold ? 1 : -1;

          setDragOver(true);
          setDragPosition(position);
          onDragOver && onDragOver(e, item);
        }
      }}
      onDragLeave={(e) => {
        if (droppable) {
          e.stopPropagation();
          setDragOver(false);
          onDragLeave && onDragLeave(e, item);
        }
      }}
      onDrop={(e) => {
        if (droppable) {
          e.stopPropagation();
          e.preventDefault();
          setDragOver(false);
          setDragPosition(0);
          setDragStatus('none');
          onDrop && onDrop(e, item, dragPosition);
        }
      }}
    >
      {draggable ? <IconDragDotVertical className={`${baseClassName}-icon-drag`} /> : null}

      {allowClear ? (
        <>
          <span className={`${baseClassName}-content`}>{itemContent}</span>
          {!_disabled && (
            <IconHover
              className={`${baseClassName}-icon-remove`}
              onClick={() => onItemRemove(item.key)}
              tabIndex={0}
              role="button"
              {...getKeyboardEvents({
                onPressEnter: () => onItemRemove(item.key),
              })}
            >
              <IconClose />
            </IconHover>
          )}
        </>
      ) : (
        <Checkbox
          className={`${baseClassName}-content`}
          checked={checked}
          disabled={_disabled}
          onChange={(checked) => onItemSelect(item.key, checked)}
        >
          {itemContent}
        </Checkbox>
      )}
    </li>
  );
}

export default TransferItem;
