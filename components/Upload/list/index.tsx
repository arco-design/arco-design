import React, { useContext, ReactNode } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import cs from '../../_util/classNames';
import PictureItem from './pictureItem';
import TextItem from './textItem';
import { ConfigContext } from '../../ConfigProvider';
import { UploadListProps } from '../interface';
import { isFunction } from '../../_util/is';

export const FileList = (props: UploadListProps) => {
  const { locale, rtl } = useContext(ConfigContext);
  const { listType, fileList, renderUploadList, renderUploadItem, prefixCls, ...rest } = props;

  if (isFunction(renderUploadList)) {
    return <div className={`${prefixCls}-list`}>{renderUploadList(fileList, rest)}</div>;
  }

  return (
    <TransitionGroup
      className={cs(`${prefixCls}-list`, `${prefixCls}-list-type-${listType}`, {
        [`${prefixCls}-list-rtl`]: rtl,
      })}
    >
      {fileList.map((file) => {
        let originNode: ReactNode =
          listType === 'picture-card' ? (
            <div className={`${prefixCls}-list-item ${prefixCls}-list-item-${file.status}`}>
              <PictureItem {...props} file={file} />
            </div>
          ) : (
            <TextItem {...props} file={file} locale={locale} />
          );
        if (isFunction(renderUploadItem)) {
          originNode = renderUploadItem(originNode, file, fileList);
        }
        return listType === 'picture-card' ? (
          <CSSTransition
            key={file.uid}
            timeout={{ enter: 200, exit: 400 }}
            classNames={`${prefixCls}-slide-inline`}
            onEntered={(e) => {
              e.style.width = '';
            }}
            onExit={(e) => {
              e.style.width = `${e.scrollWidth}px`;
            }}
            onExiting={(e) => {
              e.style.width = 0;
            }}
            onExited={(e) => {
              e.style.width = 0;
            }}
          >
            {originNode}
          </CSSTransition>
        ) : (
          <CSSTransition
            key={file.uid}
            timeout={{ enter: 200, exit: 400 }}
            classNames={`${prefixCls}-slide-up`}
            onExit={(e) => {
              e.style.height = `${e.scrollHeight}px`;
            }}
            onExiting={(e) => {
              e.style.height = 0;
            }}
            onExited={(e) => {
              e.style.height = 0;
            }}
          >
            {originNode}
          </CSSTransition>
        );
      })}
    </TransitionGroup>
  );
};

FileList.defaultProps = {
  listType: 'text',
};

FileList.displayName = 'FileList';

export default FileList;
