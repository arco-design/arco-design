import React from 'react';
import { CSSTransition } from 'react-transition-group';
import uploadRequest from './request';
import { UploaderProps, STATUS, UploadItem, UploadRequestReturn } from './interface';
import { isNumber, isFunction, isFile, isObject } from '../_util/is';
import TriggerNode from './trigger-node';
import { isAcceptFile } from './util';

export type UploaderType = {
  upload: (file: UploadItem) => void;
  abort: (file: UploadItem) => void;
  delete: (uid: UploadItem['uid']) => void;
  reupload: (file: UploadItem) => void;
};

type UploaderState = {
  uploadRequests: { [key: string]: UploadRequestReturn };
};
class Uploader extends React.Component<React.PropsWithChildren<UploaderProps>, UploaderState> {
  inputRef: HTMLInputElement | null;

  constructor(props) {
    super(props);

    this.state = {
      uploadRequests: {},
    };
  }

  // 提供 ref 调用
  upload = (file: UploadItem) => {
    this.doUpload(file);
  };

  // 提供 ref 调用。终止
  abort = (file: UploadItem) => {
    const req = this.state.uploadRequests[file.uid];
    if (req) {
      req.abort && req.abort();
      this.updateFileStatus({
        ...file,
        status: STATUS.fail,
      });
      this.deleteReq(file.uid);
    }
  };

  // 重新上传 。提供 ref 调用
  reupload = (file: UploadItem) => {
    this.doUpload({
      ...file,
      percent: 0,
      status: STATUS.uploading,
    });
  };

  deleteReq = (uid: string) => {
    const newValue = { ...this.state.uploadRequests };
    delete newValue[uid];
    this.setState({
      uploadRequests: newValue,
    });
  };

  // 提供 ref 调用
  // 删除上传（手动上传时，文件会出现在上传列表，但属于init状态）
  delete = this.deleteReq;

  updateFileStatus = (file: UploadItem, fileList = this.props.fileList) => {
    const { onFileStatusChange } = this.props;
    const key = 'uid' in file ? 'uid' : 'name';

    onFileStatusChange &&
      onFileStatusChange(
        fileList.map((item) => {
          return item[key] === file[key] ? file : item;
        }),
        file
      );
  };

  getTargetFile = (file: UploadItem) => {
    const key = 'uid' in file ? 'uid' : 'name';
    const targetFile = this.props.fileList.find((item) => item[key] === file[key]);

    return targetFile;
  };

  // 执行上传
  doUpload = async (file: UploadItem) => {
    const { action, headers, name, data, withCredentials, customRequest, method } = this.props;
    const onProgress = (percent: number, event?: ProgressEvent) => {
      const targetFile = this.getTargetFile(file);
      if (targetFile) {
        targetFile.status = STATUS.uploading;
        targetFile.percent = percent;
        this.props.onProgress && this.props.onProgress(targetFile, event);
      }
    };
    const onSuccess = (response?: object) => {
      const targetFile = this.getTargetFile(file);
      if (targetFile) {
        targetFile.status = STATUS.success;
        // 传入的响应将会作为 response 字段被附加到上传列表中对应的文件
        targetFile.response = response;

        this.updateFileStatus(targetFile);
      }
      this.deleteReq(file.uid);
    };
    const onError = (response?: object) => {
      const targetFile = this.getTargetFile(file);

      if (targetFile) {
        targetFile.status = STATUS.fail;
        // 传入的响应将会作为 response 字段被附加到上传列表中对应的文件
        targetFile.response = response;
        this.updateFileStatus(targetFile);
      }
      this.deleteReq(file.uid);
    };
    const options = {
      onProgress,
      onSuccess,
      onError,
      headers,
      name,
      file: file.originFile,
      data,
      withCredentials,
    };

    // 更新上传状态
    this.updateFileStatus(file);

    let request;
    if (action) {
      request = uploadRequest({ ...options, action, method });
    } else if (customRequest) {
      request = await customRequest(options);
    }

    this.setState({
      uploadRequests: {
        ...this.state.uploadRequests,
        [file.uid]: request,
      },
    });
  };

  handleFiles = (files: File[]) => {
    const { limit, fileList, onExceedLimit, autoUpload } = this.props;
    if (isNumber(limit) && limit < fileList.length + files.length) {
      return onExceedLimit && onExceedLimit(files, fileList);
    }
    const asyncUpload = (file: File, index: number) => {
      const list = this.props.fileList || [];
      const upload: UploadItem = {
        uid: `${String(+new Date())}${index}`,
        originFile: file,
        percent: 0,
        status: STATUS.init,
        name: file.name,
      };

      list.push(upload);

      // 更新上传状态为 init
      this.updateFileStatus(upload, list);

      if (autoUpload) {
        /**
         * 需要setTimeout，否则一次上传较多文件时，可能出现第i个文件和第i+1个文件同时更新上传列表中的状态，
         * 状态被相互覆盖的情况。
         */
        setTimeout(() => {
          this.doUpload({
            ...upload,
            status: STATUS.uploading,
          });
        }, 0);
      }
    };

    files.forEach((file, index) => {
      if (isAcceptFile(file, this.props.accept)) {
        // windows can upload file type not in accept bug
        if (isFunction(this.props.beforeUpload)) {
          // 只有在beforeUpload返回值 === false 时，取消上传操作
          Promise.resolve(this.props.beforeUpload(file, files))
            .then((val) => {
              if (val !== false) {
                const newFile = isFile(val) ? val : file;
                asyncUpload(newFile as File, index);
              }
            })
            .catch((e) => {
              console.error(e);
            });
        } else {
          asyncUpload(file, index);
        }
      }
    });
  };

  render() {
    const {
      accept,
      multiple,
      children,
      prefixCls,
      tip,
      disabled,
      drag,
      listType,
      hide,
      directory,
      onDrop,
      onDragOver,
      onDragLeave,
    } = this.props;

    return (
      <>
        <input
          key="trigger-input"
          ref={(node) => (this.inputRef = node)}
          style={{ display: 'none' }}
          type="file"
          accept={isObject(accept) ? accept?.type : accept}
          multiple={multiple}
          {...(directory ? { webkitdirectory: 'true' } : {})}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            const files = e.target.files;
            if (files) {
              this.handleFiles([].slice.call(files));

              this.inputRef.value = '';
            }
          }}
          onClick={(e) => {
            e.stopPropagation();
          }}
        />
        <CSSTransition
          key="trigger-node"
          in={!hide}
          timeout={100}
          unmountOnExit
          classNames="fadeIn"
        >
          <TriggerNode
            directory={directory}
            tip={tip}
            multiple={multiple}
            accept={accept}
            disabled={disabled}
            drag={drag}
            listType={listType}
            onDrop={onDrop}
            onDragOver={onDragOver}
            onDragLeave={onDragLeave}
            onDragFiles={this.handleFiles}
            onClick={() => {
              !disabled && this.inputRef && this.inputRef.click();
            }}
            prefixCls={prefixCls}
          >
            {isFunction(children) ? children({ fileList: this.props.fileList }) : children}
          </TriggerNode>
        </CSSTransition>
        {tip && listType !== 'picture-card' && !drag ? (
          <div key="trigger-tip" className={`${prefixCls}-trigger-tip`}>
            {tip}
          </div>
        ) : null}
      </>
    );
  }
}

export default Uploader;
