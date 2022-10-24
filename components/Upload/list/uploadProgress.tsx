import React, { FC, useContext } from 'react';
import { STATUS, UploadListProps, CustomIconType } from '../interface';
import Progress, { ProgressProps } from '../../Progress';
import { UploadItem } from '../upload';
import { ConfigContext } from '../../ConfigProvider';
import IconCheck from '../../../icon/react-icon/IconCheck';
import IconUpload from '../../../icon/react-icon/IconUpload';
import IconPlayArrowFill from '../../../icon/react-icon/IconPlayArrowFill';
import IconPause from '../../../icon/react-icon/IconPause';
import Tooltip from '../../Tooltip';
import { isFunction } from '../../_util/is';
import useKeyboardEvent from '../../_util/hooks/useKeyboardEvent';

const UploadProgress: FC<
  {
    listType?: UploadListProps['listType'];
    file: UploadItem;
    prefixCls: string;
    progressProps?: Partial<ProgressProps>;
    onReupload?: UploadListProps['onReupload'];
    onUpload?: UploadListProps['onUpload'];
    onAbort?: UploadListProps['onAbort'];
  } & CustomIconType
> = (props) => {
  const keyboardEvents = useKeyboardEvent();
  const { file, prefixCls, progressProps, progressRender } = props;
  const { locale } = useContext(ConfigContext);
  const { status, percent = 0 } = file;
  const cls = `${prefixCls}-list`;
  const widthStyle = progressProps && progressProps.width ? { width: progressProps.width } : {};
  const dom = (
    <>
      {status === STATUS.fail && props.reuploadIcon !== null && (
        <span
          className={`${prefixCls}-list-reupload-icon`}
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
          {props.reuploadIcon ||
            (props.listType === 'picture-card' ? <IconUpload /> : locale.Upload.reupload)}
        </span>
      )}
      {status === STATUS.success && props.successIcon !== null && (
        <span className={`${prefixCls}-list-success-icon`}>
          {props.successIcon || <IconCheck />}
        </span>
      )}
      {status !== STATUS.success && (
        <div className={`${cls}-status`} style={widthStyle}>
          <Progress
            showText={false}
            className={`${cls}-progress`}
            type="circle"
            status={
              status === STATUS.fail ? 'error' : status === STATUS.success ? 'success' : 'normal'
            }
            percent={percent}
            size="mini"
            {...progressProps}
          />
          {status === STATUS.init && props.startIcon !== null && (
            <span
              tabIndex={0}
              role="button"
              aria-label={locale.Upload.start}
              className={`${prefixCls}-list-start-icon`}
              onClick={() => {
                props.onUpload && props.onUpload(file);
              }}
              {...keyboardEvents({
                onPressEnter: () => {
                  props.onUpload && props.onUpload(file);
                },
              })}
            >
              {props.startIcon || (
                <Tooltip content={locale.Upload.start}>
                  <IconPlayArrowFill />
                </Tooltip>
              )}
            </span>
          )}

          {status === STATUS.uploading && props.cancelIcon !== null && (
            <span
              className={`${props.prefixCls}-list-cancel-icon`}
              onClick={() => {
                props.onAbort && props.onAbort(file);
              }}
              tabIndex={0}
              aria-label={locale.Upload.cancel}
              {...keyboardEvents({
                onPressEnter: () => {
                  props.onAbort && props.onAbort(file);
                },
              })}
            >
              {props.cancelIcon || (
                <Tooltip content={locale.Upload.cancel}>
                  <IconPause />
                </Tooltip>
              )}
            </span>
          )}
        </div>
      )}
    </>
  );

  return isFunction(progressRender) ? progressRender(file, dom) : dom;
};

export default UploadProgress;
