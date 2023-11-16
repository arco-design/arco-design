import React, {
  forwardRef,
  useContext,
  useRef,
  useState,
  useImperativeHandle,
  PropsWithChildren,
} from 'react';
import cs from '../_util/classNames';
import UploadList from './list/index';
import Uploader from './uploader';
import { isFunction, isNumber } from '../_util/is';
import { UploadProps, STATUS, UploadItem, UploadInstance } from './interface';
import { ConfigContext } from '../ConfigProvider';
import omit from '../_util/omit';
import useMergeProps from '../_util/hooks/useMergeProps';
import warning from '../_util/warning';

const processFile = function (fileList?: UploadItem[]): UploadItem[] {
  const files = [].concat(fileList || []).filter(Boolean);

  return files.reduce((total, file, index) => {
    if (file.uid) {
      const repeatUidIndex = files.findIndex((item) => file.uid === item.uid && file !== item);
      warning(repeatUidIndex !== -1, '[Upload]: duplicate uid');
      const item = {
        status: STATUS.success,
        percent: 100,
        ...file,
      };
      if (repeatUidIndex === -1) {
        total.push(item);
      } else {
        // TODO: remove splice logic.
        // 这里是为了兼容以前 uid 出现重复时，会以最后传入的 file 为主的逻辑。p.s: Use bugs as feature
        total.splice(repeatUidIndex, 1, item);
      }
    } else {
      warning(true, '[Upload]: uid is required');
      const uid = `${String(+new Date())}${index}`;
      total.push({
        uid,
        status: STATUS.success,
        percent: 100,
        ...file,
      });
    }
    return total;
  }, []);
};

export type UploadState = {
  uploadState: {
    [key: string]: UploadItem;
  };
};

const defaultProps: UploadProps = {
  listType: 'text',
  autoUpload: true,
  showUploadList: true,
  beforeUpload: () => true,
  method: 'post',
};

const Upload: React.ForwardRefRenderFunction<UploadInstance, PropsWithChildren<UploadProps>> = (
  baseProps: PropsWithChildren<UploadProps>,
  ref
) => {
  const { getPrefixCls, componentConfig, rtl } = useContext(ConfigContext);
  const props = useMergeProps<PropsWithChildren<UploadProps>>(
    baseProps,
    defaultProps,
    componentConfig?.Upload
  );

  const prefixCls = getPrefixCls('upload');
  const uploaderRef = useRef<Uploader>();

  const [innerUploadState, setInnerUploadState] = useState<UploadItem[]>(() => {
    return 'fileList' in props
      ? processFile(props.fileList)
      : 'defaultFileList' in props
      ? processFile(props.defaultFileList)
      : [];
  });

  const mergeFileList = 'fileList' in props ? processFile(props.fileList) : innerUploadState;

  const tryUpdateUploadList = (fileList, file) => {
    if (!('fileList' in props)) {
      setInnerUploadState(fileList);
    }

    props.onChange?.(fileList, file);
  };

  const uploadFile = (file: UploadItem) => {
    file &&
      setTimeout(() => {
        uploaderRef.current && uploaderRef.current.upload(file);
      }, 0);
  };

  // 重新上传
  const reuploadFile = (file: UploadItem) => {
    uploaderRef.current && uploaderRef.current.reupload(file);
    props.onReupload && props.onReupload(file);
  };

  // 移除文件，如果正在上传，终止上传
  const removeFile = (file: UploadItem) => {
    if (file) {
      const { onRemove } = props;
      Promise.resolve(isFunction(onRemove) ? onRemove(file, mergeFileList) : onRemove)
        .then((val) => {
          if (val !== false) {
            uploaderRef.current && uploaderRef.current.abort(file);
            tryUpdateUploadList(
              mergeFileList.filter((x) => x.uid !== file.uid),
              file
            );
          }
        })
        .catch((e) => {
          console.error(e);
        });
    }
  };

  // 中止文件上传
  const abortFile = (file: UploadItem) => {
    if (file) {
      uploaderRef.current && uploaderRef.current.abort(file);
    }
  };

  useImperativeHandle(ref, () => {
    return {
      submit: (file?: UploadItem) => {
        let list: UploadItem[] = [];
        if (file) {
          list = [file];
        } else {
          list = mergeFileList.filter((x) => x.status === STATUS.init);
        }
        list.forEach((x) => {
          uploadFile(x);
        });
      },
      // file: fileList中的file对象
      abort: (file: UploadItem) => {
        abortFile(file);
      },
      // file: fileList中的file对象
      reupload: (file: UploadItem) => {
        reuploadFile(file);
      },
    };
  });

  const {
    listType,
    className,
    style,
    renderUploadItem,
    showUploadList,
    renderUploadList,
    progressProps,
    imagePreview,
    ...rest
  } = props;

  // const fileList = getFileList(uploadState.current);
  const limit = isNumber(props.limit)
    ? { hideOnExceedLimit: true, maxCount: props.limit }
    : { hideOnExceedLimit: true, ...props.limit };

  const exceedLimit = limit.maxCount && limit.maxCount <= mergeFileList.length;
  const disabledUploadDom =
    'disabled' in props ? props.disabled : !limit.hideOnExceedLimit && exceedLimit;

  const uploadDom = (
    <div
      {...omit(rest, [
        'disabled',
        'directory',
        'onReupload',
        'defaultFileList',
        'fileList',
        'autoUpload',
        'error',
        'action',
        'method',
        'multiple',
        'name',
        'accept',
        'customRequest',
        'children',
        'autoUpload',
        'limit',
        'drag',
        'tip',
        'headers',
        'data',
        'withCredentials',
        'onChange',
        'onPreview',
        'onRemove',
        'onProgress',
        'onExceedLimit',
        'beforeUpload',
        'onDrop',
        'onDragOver',
        'onDragLeave',
      ])}
      className={cs(
        prefixCls,
        {
          [`${prefixCls}-type-${listType}`]: listType,
          [`${prefixCls}-drag`]: props.drag,
          [`${prefixCls}-disabled`]: disabledUploadDom,
          [`${prefixCls}-hide`]: limit.hideOnExceedLimit && exceedLimit,
          [`${prefixCls}-rtl`]: rtl,
        },
        className
      )}
      style={style}
    >
      <Uploader
        ref={uploaderRef}
        {...props}
        limit={limit.maxCount}
        hide={limit.hideOnExceedLimit && exceedLimit}
        disabled={disabledUploadDom}
        prefixCls={prefixCls}
        fileList={mergeFileList}
        onProgress={(file: UploadItem, e: ProgressEvent) => {
          if (file) {
            if (!('fileList' in props)) {
              setInnerUploadState(
                mergeFileList.map((item) => {
                  return item.uid === file.uid ? file : item;
                })
              );
            }
            props.onProgress && props.onProgress(file, e);
          }
        }}
        onFileStatusChange={tryUpdateUploadList}
      />
    </div>
  );

  return (
    <>
      {listType !== 'picture-card' && uploadDom}
      {showUploadList && (
        <UploadList
          imagePreview={imagePreview}
          progressProps={progressProps}
          showUploadList={showUploadList}
          disabled={props.disabled}
          listType={listType}
          fileList={mergeFileList}
          renderUploadItem={renderUploadItem}
          renderUploadList={renderUploadList}
          onUpload={uploadFile}
          onAbort={abortFile}
          onRemove={removeFile}
          onReupload={reuploadFile}
          onPreview={props.onPreview}
          prefixCls={prefixCls}
        />
      )}
      {listType === 'picture-card' && uploadDom}
      {props.tip && listType === 'picture-card' && (
        <div className={`${prefixCls}-trigger-tip`}>{props.tip}</div>
      )}
    </>
  );
};

const UploadRef = forwardRef<UploadInstance, PropsWithChildren<UploadProps>>(Upload);

UploadRef.displayName = 'Upload';

export default UploadRef;

export { UploadItem, UploadProps };
