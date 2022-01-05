import React, { useState, useContext, PropsWithChildren, useEffect } from 'react';
import cs from '../_util/classNames';
import Button from '../Button';
import IconUpload from '../../icon/react-icon/IconUpload';
import IconPlus from '../../icon/react-icon/IconPlus';
import { TriggerProps } from './interface';
import { ConfigContext } from '../ConfigProvider';
import { getFiles, loopDirectory } from './util';

const TriggerNode = (props: PropsWithChildren<TriggerProps>) => {
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
        } else {
          setDragEnterCount(dragEnterCount - 1);
        }
      }}
      onDrop={(e: React.DragEvent) => {
        e.preventDefault();
        if (!disabled) {
          setIsDragging(false);
          if (props.directory) {
            loopDirectory(e.dataTransfer.items, accept, (files) => {
              props.onDragFiles && props.onDragFiles(files);
            });
          } else {
            const files = getFiles(e.dataTransfer.files, accept);
            props.onDragFiles && props.onDragFiles(multiple ? files : files.slice(0, 1));
          }
        }
      }}
      onDragOver={(e: React.DragEvent) => {
        e.preventDefault();
        if (!disabled && !isDragging) {
          setIsDragging(true);
        }
      }}
    >
      {React.isValidElement(children) ? (
        <div className={cs({ [`${prefixCls}-trigger-custom-active`]: isDragging })}>
          {React.cloneElement(children, nodeProps)}
        </div>
      ) : listType === 'picture-card' ? (
        <div className={`${prefixCls}-trigger-picture-wrapper`}>
          <div className={`${prefixCls}-trigger-picture`}>
            <div className={`${prefixCls}-trigger-picture-text`}>
              <IconPlus />
            </div>
          </div>
          {tip && <div className={`${prefixCls}-trigger-tip`}>{tip}</div>}
        </div>
      ) : drag ? (
        <div
          className={cs(`${prefixCls}-trigger-drag`, {
            [`${prefixCls}-trigger-drag-active`]: isDragging,
          })}
        >
          <IconPlus />
          <p className={`${prefixCls}-trigger-drag-text`}>
            {isDragging ? locale.Upload.dragHover : locale.Upload.drag}
          </p>
          {tip && <div className={`${prefixCls}-trigger-tip`}>{tip}</div>}
        </div>
      ) : (
        <Button {...nodeProps} type="primary" className={`${prefixCls}-trigger-with-icon`}>
          <IconUpload />
          {locale.Upload.upload}
        </Button>
      )}
    </div>
  );
};

export default TriggerNode;
