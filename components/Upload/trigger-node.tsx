import React, { useState, useContext, PropsWithChildren, useRef } from 'react';
import cs from '../_util/classNames';
import Button from '../Button';
import IconUpload from '../../icon/react-icon/IconUpload';
import IconPlus from '../../icon/react-icon/IconPlus';
import { TriggerProps } from './interface';
import { ConfigContext } from '../ConfigProvider';
import { isArray } from '../_util/is';
import { contains } from '../_util/dom';

const isAcceptFile = (file, accept?: string | string[]): boolean => {
  if (accept && file) {
    const accepts = isArray(accept)
      ? accept
      : accept
          .split(',')
          .map((x) => x.trim())
          .filter((x) => x);
    const fileExtension = file.name.indexOf('.') > -1 ? file.name.split('.').pop() : '';
    return accepts.some((type) => {
      const text = type && type.toLowerCase();
      const fileType = (file.type || '').toLowerCase();
      if (text === fileType) {
        // 类似excel文件这种
        // 比如application/vnd.ms-excel和application/vnd.openxmlformats-officedocument.spreadsheetml.sheet
        // 本身就带有.字符的，不能走下面的.jpg等文件扩展名判断处理
        // 所以优先对比input的accept类型和文件对象的type值
        return true;
      }
      if (/\/\*/.test(text)) {
        // image/* 这种通配的形式处理
        return fileType.replace(/\/.*$/, '') === text.replace(/\/.*$/, '');
      }
      if (/\..*/.test(text)) {
        // .jpg 等后缀名
        return text === `.${fileExtension && fileExtension.toLowerCase()}`;
      }
      return false;
    });
  }
  return !!file;
};

const getFiles = (fileList, accept) => {
  if (!fileList) {
    return;
  }
  let files = [].slice.call(fileList);
  if (accept) {
    files = files.filter((file) => {
      return isAcceptFile(file, accept);
    });
  }
  return files;
};

const loopDirectory = (items: DataTransferItemList, accept, callback) => {
  const _loopDirectory = (item) => {
    if (item.isFile) {
      item.file((file) => {
        if (isAcceptFile(file, accept)) {
          Object.defineProperty(file, 'webkitRelativePath', {
            value: item.fullPath.replace(/^\//, ''),
          });
          callback(file);
        }
      });
    } else if (item.isDirectory) {
      // item 是个文件夹
      const reader = item.createReader();
      reader.readEntries((entries) => {
        entries.forEach(_loopDirectory);
      });
    }
  };

  [].slice
    .call(items)
    .forEach(
      (item: DataTransferItem) => item.webkitGetAsEntry && _loopDirectory(item.webkitGetAsEntry())
    );
};
const TriggerNode = (props: PropsWithChildren<TriggerProps>) => {
  const { locale } = useContext(ConfigContext);
  const [isDraging, setIsDraging] = useState(false);
  const nodeRef = useRef();
  const { tip, children, disabled, drag, listType, prefixCls, accept, multiple } = props;

  const nodeProps = {
    disabled,
  };

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    if (!disabled && !isDraging) {
      setIsDraging(true);
    }
  };

  if (children === null) {
    return null;
  }

  return (
    <div
      ref={nodeRef}
      className={`${prefixCls}-trigger`}
      onClick={disabled ? undefined : props.onClick}
      onDrop={(e: React.DragEvent) => {
        e.preventDefault();
        if (!disabled) {
          setIsDraging(false);
          if (props.directory) {
            loopDirectory(e.dataTransfer.items, accept, (file) => {
              props.onDragFiles && props.onDragFiles([file]);
            });
          } else {
            const files = getFiles(e.dataTransfer.files, accept);
            props.onDragFiles && props.onDragFiles(multiple ? files : files.slice(0, 1));
          }
        }
      }}
      onDragLeave={(e: React.DragEvent) => {
        e.preventDefault();

        if (!nodeRef.current || !contains(nodeRef.current, e.target)) {
          setIsDraging(false);
        }
      }}
      onDragOver={onDragOver}
    >
      {React.isValidElement(children) ? (
        <div className={cs({ [`${prefixCls}-trigger-custom-active`]: isDraging })}>
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
          draggable={false}
          className={cs(`${prefixCls}-trigger-drag`, {
            [`${prefixCls}-trigger-drag-active`]: isDraging,
          })}
        >
          <IconPlus />
          <p className={`${prefixCls}-trigger-drag-text`}>
            {isDraging ? locale.Upload.dragHover : locale.Upload.drag}
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
