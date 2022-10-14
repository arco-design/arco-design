import React from 'react';
import { ConfigProviderProps } from '../../ConfigProvider';
import { UploadListProps, STATUS, CustomIconType } from '../interface';
import { UploadItem } from '../upload';
import { isFunction, isObject } from '../../_util/is';
import UploadProgress from './uploadProgress';
import IconImageClose from '../../../icon/react-icon/IconImageClose';
import IconEye from '../../../icon/react-icon/IconEye';
import IconDelete from '../../../icon/react-icon/IconDelete';
import IconUpload from '../../../icon/react-icon/IconUpload';
import useKeyboardEvent from '../../_util/hooks/useKeyboardEvent';

const PictureItem = (
  props: UploadListProps & { file: UploadItem; locale: ConfigProviderProps['locale'] }
) => {
  const { disabled, prefixCls, file, showUploadList, locale } = props;
  const keyboardEvents = useKeyboardEvent();
  const cls = `${prefixCls}-list-item-picture`;
  const { status, originFile } = file;

  const url =
    file.url !== undefined
      ? file.url
      : originFile && isFunction(URL.createObjectURL) && URL.createObjectURL(originFile);
  const actionIcons = isObject(showUploadList) ? (showUploadList as CustomIconType) : {};

  return (
    <div className={cls}>
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
          {isFunction(actionIcons.imageRender) ? (
            actionIcons.imageRender(file)
          ) : (
            <img src={url} alt={file.name} />
          )}
          <div className={`${cls}-mask`} role="radiogroup">
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
                  role="button"
                  aria-label={locale.Upload.preview}
                  {...keyboardEvents({
                    onPressEnter: () => {
                      props.onPreview && props.onPreview(file);
                    },
                  })}
                  onClick={() => {
                    props.onPreview && props.onPreview(file);
                  }}
                >
                  {actionIcons.previewIcon || <IconEye />}
                </span>
              )}
              {file.status === STATUS.fail && actionIcons.reuploadIcon !== null && (
                <span
                  className={`${props.prefixCls}-list-reupload-icon`}
                  onClick={() => {
                    props.onReupload && props.onReupload(file);
                  }}
                  tabIndex={0}
                  role="button"
                  aria-label={locale.Upload.reupload}
                  {...keyboardEvents({
                    onPressEnter: () => {
                      props.onReupload && props.onReupload(file);
                    },
                  })}
                >
                  {actionIcons.reuploadIcon || <IconUpload />}
                </span>
              )}
              {!disabled && actionIcons.removeIcon !== null && (
                <span
                  className={`${prefixCls}-list-remove-icon`}
                  onClick={() => {
                    props.onRemove && props.onRemove(file);
                  }}
                  role="button"
                  aria-label={locale.Upload.delete}
                  tabIndex={0}
                  {...keyboardEvents({
                    onPressEnter: () => {
                      props.onRemove && props.onRemove(file);
                    },
                  })}
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
