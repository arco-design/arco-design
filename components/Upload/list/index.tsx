import React, { useContext, ReactNode, useState, useMemo } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import cs from '../../_util/classNames';
import PictureItem from './pictureItem';
import TextItem from './textItem';
import { ConfigContext } from '../../ConfigProvider';
import { STATUS, UploadListProps } from '../interface';
import { isFunction } from '../../_util/is';
import ImagePreviewGroup from '../../Image/image-preview-group';

export const FileList = (props: UploadListProps) => {
  const { locale, rtl } = useContext(ConfigContext);
  const { listType, fileList, renderUploadList, renderUploadItem, prefixCls, ...rest } = props;
  // hide image preview when previewCurrent = -1
  const [previewCurrent, setPreviewCurrent] = useState(-1);

  const srcList = useMemo(() => {
    return fileList
      .map((file) => {
        let url = file.url;

        if (file.url === undefined && [STATUS.init, STATUS.success].indexOf(file.status) > -1) {
          url =
            file.originFile &&
            isFunction(URL.createObjectURL) &&
            URL.createObjectURL(file.originFile);
        }

        return url;
      })
      .filter(Boolean);
  }, [fileList]);

  if (isFunction(renderUploadList)) {
    return <div className={`${prefixCls}-list`}>{renderUploadList(fileList, rest)}</div>;
  }

  const updatePreviewCurrent = (current: number) => {
    if (props.imagePreview) {
      setPreviewCurrent(current);
    }
  };

  return (
    <>
      <TransitionGroup
        className={cs(`${prefixCls}-list`, `${prefixCls}-list-type-${listType}`, {
          [`${prefixCls}-list-rtl`]: rtl,
        })}
      >
        {fileList.map((file, index) => {
          let originNode: ReactNode =
            listType === 'picture-card' ? (
              <div className={`${prefixCls}-list-item ${prefixCls}-list-item-${file.status}`}>
                <PictureItem
                  {...props}
                  onPreview={(file) => {
                    updatePreviewCurrent(index);
                    props.onPreview?.(file);
                  }}
                  file={file}
                  locale={locale}
                />
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

      {listType === 'picture-card' && props.imagePreview && (
        <ImagePreviewGroup
          srcList={srcList}
          visible={previewCurrent !== -1}
          current={previewCurrent}
          onChange={updatePreviewCurrent}
          onVisibleChange={(visible) => {
            updatePreviewCurrent(visible ? previewCurrent : -1);
          }}
        />
      )}
    </>
  );
};

FileList.displayName = 'FileList';

export default FileList;
