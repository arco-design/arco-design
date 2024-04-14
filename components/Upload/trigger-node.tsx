import React, { useState, useContext, PropsWithChildren, useEffect } from 'react';
import cs from '../_util/classNames';
import Button from '../Button';
import IconUpload from '../../icon/react-icon/IconUpload';
import IconPlus from '../../icon/react-icon/IconPlus';
import { TriggerProps } from './interface';
import { ConfigContext } from '../ConfigProvider';
import { getFiles, loopDirectory } from './util';
import useKeyboardEvent from '../_util/hooks/useKeyboardEvent';

const TriggerNode = (props: PropsWithChildren<TriggerProps>) => {
  const getKeyboardEvents = useKeyboardEvent();
  const { locale } = useContext(ConfigContext);
  const [isDragging, setIsDragging] = useState(false);
  const [dragEnterCount, setDragEnterCount] = useState(0); // the number of times ondragenter was triggered

  const { tip, children, disabled, drag, listType, prefixCls, accept, multiple } = props;

  const nodeProps = {
    disabled,
  };

  useEffect(() => {
    setDragEnterCount(0);
  }, [isDragging]);

  return children === null ? null : (
    <div
      className={`${prefixCls}-trigger`}
      onClick={disabled ? undefined : props.onClick}
      {...getKeyboardEvents({
        onPressEnter: () => {
          !disabled && props.onClick?.();
        },
      })}
      onDragEnter={() => {
        setDragEnterCount(dragEnterCount + 1);
      }}
      onDragLeave={(e: React.DragEvent) => {
        e.preventDefault();
        /**  When dragging into a child element, it will trigger the dragleave and dragenter of the parent node.
         * Record the number of triggers of dragenter, and subtract 1 each time dragleave.
         * When dragEnterCount is equal to 0,  it means that the mouse has left the current node, then the drag state is cancelled.
         * https://github.com/arco-design/arco-design/issues/210
         */

        if (dragEnterCount === 0) {
          setIsDragging(false);
          !disabled && props.onDragLeave?.(e);
        } else {
          setDragEnterCount(dragEnterCount - 1);
        }
      }}
      onDrop={(e: React.DragEvent) => {
        e.preventDefault();
        if (!disabled && props.drag !== false) {
          setIsDragging(false);
          if (props.directory) {
            loopDirectory(e.dataTransfer.items, accept, (files) => {
              props.onDragFiles && props.onDragFiles(files);
            });
          } else {
            const directoryIndices = [].slice
              .call(e.dataTransfer.items || [])
              .reduce((result, item, index) => {
                if (item.webkitGetAsEntry) {
                  const entry = item.webkitGetAsEntry();
                  if (entry.isDirectory) {
                    return [...result, index];
                  }
                  return result;
                }
              }, []);
            // Filter out directories
            const droppedFiles = [].slice.call(e.dataTransfer.files || []).filter((_, index) => {
              return !directoryIndices.includes(index);
            });
            const files = getFiles(droppedFiles, accept);
            if (files.length > 0) {
              props.onDragFiles && props.onDragFiles(multiple ? files : files.slice(0, 1));
            }
          }
          props.onDrop && props.onDrop(e);
        }
      }}
      onDragOver={(e: React.DragEvent) => {
        e.preventDefault();
        if (!disabled && !isDragging) {
          setIsDragging(true);
          props.onDragOver?.(e);
        }
      }}
    >
      {React.isValidElement(children) ? (
        <div className={cs({ [`${prefixCls}-trigger-custom-active`]: isDragging })}>
          {React.cloneElement(children, nodeProps)}
        </div>
      ) : listType === 'picture-card' ? (
        <div className={`${prefixCls}-trigger-picture-wrapper`}>
          <div
            className={`${prefixCls}-trigger-picture`}
            tabIndex={0}
            aria-label={locale.Upload.upload}
          >
            <div className={`${prefixCls}-trigger-picture-text`}>
              <IconPlus />
            </div>
          </div>
        </div>
      ) : drag ? (
        <div
          className={cs(`${prefixCls}-trigger-drag`, {
            [`${prefixCls}-trigger-drag-active`]: isDragging,
          })}
          tabIndex={0}
          aria-label={locale.Upload.drag}
        >
          <IconPlus />
          <p className={`${prefixCls}-trigger-drag-text`}>
            {isDragging ? locale.Upload.dragHover : locale.Upload.drag}
          </p>
          {tip && <div className={`${prefixCls}-trigger-tip`}>{tip}</div>}
        </div>
      ) : (
        <Button
          {...nodeProps}
          aria-label={locale.Upload.upload}
          type="primary"
          className={`${prefixCls}-trigger-with-icon`}
        >
          <IconUpload />
          {locale.Upload.upload}
        </Button>
      )}
    </div>
  );
};

export default TriggerNode;
