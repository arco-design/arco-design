import React from 'react';
import { UploadListProps, STATUS, CustomIconType } from '../interface';
import { UploadItem } from '../upload';
import { isFunction, isObject } from '../../_util/is';
import UploadProgress from './uploadProgress';
import IconImageClose from '../../../icon/react-icon/IconImageClose';
import IconEye from '../../../icon/react-icon/IconEye';
import IconDelete from '../../../icon/react-icon/IconDelete';
import IconUpload from '../../../icon/react-icon/IconUpload';
import { isPressEnter } from '../util';

const PictureItem = (props: UploadListProps & { file: UploadItem }) => {
  const { disabled, prefixCls, file, showUploadList } = props;
  const cls = `${prefixCls}-list-item-picture`;
  const { status, originFile } = file;
  const url =
    file.url !== undefined
      ? file.url
      : originFile && isFunction(URL.createObjectURL) && URL.createObjectURL(originFile);
  const actionIcons = isObject(showUploadList) ? (showUploadList as CustomIconType) : {};

  return (
    <div className={cls} tabIndex={0}>
      {status === STATUS.uploading ? (
        <UploadProgress
          onReupload={props.onReupload}
          onUpload={props.onUpload}
          onAbort={props.onAbort}
          listType="picture-card"
          file={file}
          prefixCls={prefixCls}
          progressProps={props.progressProps}
          {...actionIcons}
        />
      ) : (
        <>
          {isFunction(actionIcons.imageRender) ? actionIcons.imageRender(file) : <img src={url} />}
          <div className={`${cls}-mask`}>
            {file.status === STATUS.fail && (
              <div className={`${cls}-error-tip`}>
                {actionIcons.errorIcon !== null && (
                  <span className={`${prefixCls}-list-error-icon`}>
                    {actionIcons.errorIcon || <IconImageClose />}
                  </span>
                )}
              </div>
            )}
            <div className={`${cls}-operation`}>
              {file.status !== STATUS.fail && actionIcons.previewIcon !== null && (
                <span
                  className={`${prefixCls}-list-preview-icon`}
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (isPressEnter(e)) {
                      props.onPreview && props.onPreview(file);
                    }
                  }}
                  onClick={() => {
                    props.onPreview && props.onPreview(file);
                  }}
                >
                  {actionIcons.previewIcon || <IconEye />}
                </span>
              )}
              {file.status === STATUS.fail && actionIcons.reuploadIcon !== null && (
                <span
                  tabIndex={0}
                  className={`${props.prefixCls}-list-reupload-icon`}
                  onClick={() => {
                    props.onReupload && props.onReupload(file);
                  }}
                  onKeyDown={(e) => {
                    if (isPressEnter(e)) {
                      props.onReupload && props.onReupload(file);
                    }
                  }}
                >
                  {actionIcons.reuploadIcon || <IconUpload />}
                </span>
              )}
              {!disabled && actionIcons.removeIcon !== null && (
                <span
                  className={`${prefixCls}-list-remove-icon`}
                  tabIndex={0}
                  onClick={() => {
                    props.onRemove && props.onRemove(file);
                  }}
                  onKeyDown={(e) => {
                    if (isPressEnter(e)) {
                      props.onRemove && props.onRemove(file);
                    }
                  }}
                >
                  {actionIcons.removeIcon || <IconDelete />}
                </span>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default PictureItem;
