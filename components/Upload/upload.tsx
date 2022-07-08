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
import { isFunction, isArray, isNumber } from '../_util/is';
import { UploadProps, STATUS, UploadItem, UploadInstance } from './interface';
import { ConfigContext } from '../ConfigProvider';
import omit from '../_util/omit';
import useMergeProps from '../_util/hooks/useMergeProps';

const processFile = function (fileList?: UploadItem[]): { [key: string]: UploadItem } {
  const res = {};
  if (!isArray(fileList)) {
    return res;
  }
  fileList.forEach((file, index) => {
    if (file.uid) {
      res[file.uid] = {
        status: STATUS.success,
        percent: 100,
        ...file,
      };
    } else {
      const uid = `${String(+new Date())}${index}`;
      res[uid] = {
        ...file,
        uid,
        status: STATUS.success,
        percent: 100,
      };
    }
  });
  return res;
};

const getFileList = (uploadState): UploadItem[] => {
  return Object.keys(uploadState).map((x) => uploadState[x]);
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
  const uploadState = useRef<{ [key: string]: UploadItem }>({});

  const [innerUploadState, setInnerUploadState] = useState<{
    [key: string]: UploadItem;
  }>(
    'fileList' in props
      ? processFile(props.fileList)
      : 'defaultFileList' in props
      ? processFile(props.defaultFileList)
      : {}
  );

  uploadState.current = 'fileList' in props ? processFile(props.fileList) : innerUploadState;

  const deleteUpload = (file: UploadItem) => {
    const obj = { ...uploadState.current };
    delete obj[file.uid];

    if (!('fileList' in props)) {
      setInnerUploadState(obj);
    }
    props.onChange && props.onChange(getFileList(obj), file);
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
      Promise.resolve(isFunction(onRemove) ? onRemove(file) : onRemove)
        .then((val) => {
          if (val !== false) {
            uploaderRef.current && uploaderRef.current.abort(file);
            deleteUpload(file);
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
          list = getFileList(uploadState.current).filter((x) => x.status === STATUS.init);
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
    ...rest
  } = props;

  const fileList = getFileList(uploadState.current);
  const limit = isNumber(props.limit)
    ? { hideOnExceedLimit: true, maxCount: props.limit }
    : { hideOnExceedLimit: true, ...props.limit };

  const exceedLimit = limit.maxCount && limit.maxCount <= fileList.length;
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
        fileList={fileList}
        onProgress={(file: UploadItem, e: ProgressEvent) => {
          if (file) {
            if (!('fileList' in props)) {
              setInnerUploadState((v) => {
                return {
                  ...v,
                  [file.uid]: file,
                };
              });
            }
            props.onProgress && props.onProgress(file, e);
          }
        }}
        onFileStatusChange={(file: UploadItem) => {
          if (!('fileList' in props)) {
            setInnerUploadState((v) => {
              return {
                ...v,
                [file.uid]: file,
              };
            });
          }
          props.onChange &&
            props.onChange(getFileList({ ...uploadState.current, [file.uid]: file }), file);
        }}
      />
    </div>
  );

  return (
    <>
      {listType !== 'picture-card' && uploadDom}
      {showUploadList && (
        <UploadList
          progressProps={progressProps}
          showUploadList={showUploadList}
          disabled={props.disabled}
          listType={listType}
          fileList={fileList}
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
