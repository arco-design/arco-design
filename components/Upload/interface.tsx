import React, { CSSProperties, ReactNode } from 'react';
import { ProgressProps } from '../Progress';

export const STATUS: {
  [key: string]: UploadStatus;
} = {
  init: 'init',
  uploading: 'uploading',
  success: 'done',
  fail: 'error',
};

export type UploadStatus = 'init' | 'uploading' | 'done' | 'error';

export type ListType = 'text' | 'picture-list' | 'picture-card';

export type CustomIconType = {
  previewIcon?: ReactNode;
  removeIcon?: ReactNode;
  fileIcon?: ReactNode;
  reuploadIcon?: ReactNode;
  cancelIcon?: ReactNode;
  startIcon?: ReactNode;
  errorIcon?: ReactNode;
  successIcon?: ReactNode;
  fileName?: (file: UploadItem) => ReactNode;
  // 2.34.0
  progressRender?: (file: UploadItem, originDom: ReactNode) => React.ReactElement;
  // 2.34.0
  imageRender?: (file: UploadItem) => React.ReactNode;
};

export type RequestOptions = Pick<
  UploadProps,
  'headers' | 'name' | 'data' | 'withCredentials' | 'action' | 'method'
> & {
  /** 更新当前文件的上传进度 。percent: 当前上传进度百分比 */
  onProgress: (percent: number, event?: ProgressEvent) => void;
  /** 上传成功后，调用onSuccess方法，传入的response参数将会附加到当前上传文件的reponse字段上 */
  onSuccess: (response?: object) => void;
  /** 上传失败后，调用onError方法，传入的 response 参数将会附加到当前上传文件的response字段 */
  onError: (response?: object) => void;
  /** 当前上传文件 */
  file: File;
};

export interface UploadRequestReturn {
  abort?: () => void;
  [key: string]: any;
}

export type UploadRequest = (options: RequestOptions) => UploadRequestReturn | void;

/**
 * @title Upload
 */
export interface UploadProps {
  style?: CSSProperties;
  className?: string | string[];
  /**
   * @zh 默认已上传的文件列表
   * @en Default list of files that have been uploaded
   */
  defaultFileList?: UploadItem[];
  /**
   * @zh 已上传的文件列表
   * @en List of files that have been uploaded
   */
  fileList?: UploadItem[];
  /**
   * @zh 文件夹上传
   * @en Support upload whole directory
   * @version 2.11.0
   */
  directory?: boolean;
  /**
   * @zh 接受上传的类型 [详细请参考](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file#accept)。（`strict` in `2.53.0`，默认为 true。设置为 false 时，accept 表现和原生一致。设置为 true 时，会严格匹配文件后缀名，过滤掉不符合 accept 规则的文件。)
   * @en Accepted [file types](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file#accept)（`strict` in `2.53.0`, defaultValue is true. When set to false, accept behaves the same as native. When set to true, file extensions will be strictly matched and files that do not meet the accept rules will be filtered out. )
   */
  accept?: string | { type: string; strict?: boolean };
  /**
   * @zh 通过覆盖默认的上传行为，可以自定义自己的上传实现
   * @en Provide an override for the default xhr behavior for additional customization
   */
  customRequest?: (options: RequestOptions) => UploadRequestReturn | void;
  /**
   * @zh 展示类型
   * @en Upload list Style
   * @defaultValue text
   */
  listType?: 'text' | 'picture-list' | 'picture-card';
  /**
   * @zh 启用内置的图片预览，仅在 listType='picture-card' 时生效。(`v2.41.0`)
   * @en Enable built-in image preview, only works when listType='picture-card'. (`v2.41.0`)
   */
  imagePreview?: boolean;
  /**
   * @zh
   * 是否展示上传文件列表。预览图标，删除图标，文件图标，重新上传图标，取消上传图标。
   * @en
   * Whether to show upload list.It can be an object to customize the `previewIcon`, `removeIcon`,
   * `fileIcon`, `reuploadIcon`, `cancelIcon`, `startIcon`, `errorIcon` and `fileName`
   * @defaultValue true
   */
  showUploadList?: boolean | CustomIconType;
  /**
   * @zh 是否选中文件后自动上传
   * @en Whether to automatically upload files after selecting them
   * @defaultValue true
   */
  autoUpload?: boolean;
  /**
   * @zh 上传接口地址
   * @en Uploading URL
   */
  action?: string;
  /**
   * @zh 上传请求的 http method
   * @en The http method of upload request
   * @defaultValue post
   * @version 2.55.0
   */
  method?: string;
  /**
   * @zh 限制上传数量。默认超出后会隐藏上传节点。对象类型在 `2.28.0` 支持
   * @en maximum number of uploads allowed. Object type is supported in `2.28.0`
   */
  limit?: number | { maxCount: number; hideOnExceedLimit?: boolean };
  /**
   * @zh 禁用
   * @en Whether to disable
   */
  disabled?: boolean;
  /**
   * @zh 是否拖拽上传
   * @en Whether to enable drag and drop upload
   */
  drag?: boolean;
  /**
   * @zh 文件多选
   * @en Whether to allow multiple files to be selected
   */
  multiple?: boolean;
  /**
   * @zh 提示文字，listType 不同，展示会有区别
   * @en The tip text
   */
  tip?: string | React.ReactNode;
  /**
   * @zh 上传时使用的 headers
   * @en Set request headers
   */
  headers?: object;
  /**
   * @zh 上传时的 Body 参数
   * @en additions params of request
   */
  data?: object | ((any: any) => object);
  /**
   * @zh 发请求时文件内容的参数名
   * @en The key name of uploading file
   */
  name?: string | ((any: any) => string);
  /**
   * @zh 上传请求是否携带 cookie
   * @en Whether to carry cookies when uploading requests
   */
  withCredentials?: boolean;
  /**
   * @zh 进度条属性，接收所有进度条的 props。
   * @en The props of [Progress component](/react/en-US/components/progress).
   */
  progressProps?: Partial<ProgressProps>;
  /**
   * @zh 自定义上传列表项
   * @en Custom item of uploadList
   */
  renderUploadItem?: (originNode: ReactNode, file: UploadItem, fileList: UploadItem[]) => ReactNode;
  /**
   * @zh 自定义展示上传文件列表
   * @en Custom uploadList
   */
  renderUploadList?: (fileList: UploadItem[], uploadListProps: UploadListProps) => ReactNode;
  /**
   * @zh 上传文件改变时的回调。文件开始上传，失败，成功时会触发。注意：如果需要实时获取文件的上传进度，请在 `onProgress` 中处理。
   * @en Callback when uploading state is changing
   */
  onChange?: (fileList: UploadItem[], file: UploadItem) => void;
  /**
   * @zh 点击预览时候的回调
   * @en Callback when the preview icon is clicked
   */
  onPreview?: (file: UploadItem) => void;
  /**
   * @zh 点击删除文件时的回调。返回 `false` 或者 `Promise.reject` 的时候不会执行删除。
   * @en Callback when the remove icon is clicked.Remove actions will be aborted when the return value is false or a Promise which resolve(false) or reject.
   */
  onRemove?: (file: UploadItem, fileList: UploadItem[]) => void | boolean | Promise<void | boolean>;
  /**
   * @zh 文件上传进度的回调
   * @en Callback when uploading progress is changing
   */
  onProgress?: (file: UploadItem, e?: ProgressEvent) => void;
  /**
   * @zh 文件重新上传时触发的回调
   * @en Callback when the re-upload icon is clicked
   */
  onReupload?: (file: UploadItem) => void;
  /**
   * @zh 超出上传数量限制时触发
   * @en Callback when limit is exceeded
   */
  onExceedLimit?: (files: File[], fileList: UploadItem[]) => void;
  /**
   * @zh 上传文件之前的回调。返回 false 或者 promise抛出异常的时候会取消上传。
   * @en Callback before uploading. Uploading will be aborted when the return value is false or a Promise which resolve(false) or reject.
   * @defaultValue () => true
   */
  beforeUpload?: (file: File, filesList: File[]) => boolean | Promise<any>;
  /**
   * @zh 拖拽上传文件时执行的回调
   * @en Callback after drag file to the upload area and drop.
   * @version 2.37.0
   */
  onDrop?: (e: React.DragEvent) => void;
  /**
   * @zh 拖拽上传文件进入拖拽区时的回调
   * @en Callback when drag and drop uploaded file into the drag area
   * @version 2.41.0
   */
  onDragOver?: (e: React.DragEvent) => void;
  /**
   * @zh 拖拽上传文件离开拖拽区时的回调
   * @en Callback when drag and drop uploaded file leaves the drag area
   * @version 2.41.0
   */
  onDragLeave?: (e: React.DragEvent) => void;
}

/**
 * @title UploadListProps
 * @zh 文件上传列表展示
 * @en File upload list display
 */
export interface UploadListProps {
  imagePreview?: boolean;
  listType?: string;
  fileList?: UploadItem[];
  showUploadList?: boolean | CustomIconType;
  progressProps?: Partial<ProgressProps>;
  onUpload?: (file: UploadItem) => void;
  /**
   * @zh 中止文件上传的回调
   * @en Callback when the cancel icon is clicked
   */
  onAbort?: (file: UploadItem) => void;
  /**
   * @zh 点击删除文件时的回调。返回 false 或者 Promise.reject 的时候不会执行删除
   * @en Callback when the remove icon is clicked.Remove actions will be aborted when the return value is false or a Promise which resolve(false) or reject
   */
  onRemove?: (file: UploadItem) => void | boolean | Promise<void | boolean>;
  /**
   * @zh 重新上传的回调
   * @en Callback when the re-upload icon is clicked
   */
  onReupload?: (file: UploadItem) => void;
  /**
   * @zh 点击预览时候的回调。
   * @en Callback when the preview icon is clicked
   */
  onPreview?: (file: UploadItem) => void;
  /**
   * @zh 禁用
   * @en Whether to disable
   */
  disabled?: boolean;
  renderUploadItem?: (originNode: ReactNode, file: UploadItem, fileList: UploadItem[]) => ReactNode;
  renderUploadList?: (
    fileList: UploadItem[],
    uploadListProps: Omit<UploadListProps, 'renderUploadList'>
  ) => ReactNode;
  prefixCls?: string;
}

/**
 * @title UploadItem
 */
export type UploadItem = {
  /**
   * @zh 当前上传文件的唯一标示
   * @en Unique identifier
   */
  uid: string;
  /**
   * @zh 当前上传文件的状态
   * @en Uploading status
   */
  status?: UploadStatus;
  /**
   * @zh 文件对象
   * @en File Object
   */
  originFile?: File;
  /**
   * @zh 上传进度百分比
   * @en Upload progress percentage
   */
  percent?: number;
  /**
   * @zh 当前文件上传请求返回的响应
   * @en Response of upload request
   */
  response?: object;
  /**
   * @zh 文件 url
   * @en File url
   */
  url?: string;
  /**
   * @zh 文件名
   * @en File name
   */
  name?: string;
  children?: ReactNode;
};

export interface UploaderProps extends UploadProps {
  prefixCls?: string;
  limit?: number;
  hide?: boolean;
  onFileStatusChange?: (fileList: UploadItem[], file: UploadItem) => void;
}

export type TriggerProps = {
  tip?: string | React.ReactNode;
  multiple?: boolean;
  accept?: UploadProps['accept'];
  disabled?: boolean;
  directory?: boolean;
  drag?: boolean;
  listType?: 'text' | 'picture-list' | 'picture-card';
  onClick: () => void;
  onDrop?: (e: React.DragEvent) => void;
  onDragLeave?: (e: React.DragEvent) => void;
  onDragOver?: (e: React.DragEvent) => void;
  onDragFiles: (files: File[]) => void;
  prefixCls?: string;
};

export type UploadInstance = {
  /** 手动上传时，调用该方法，开始上传。不传参数时，会默认上传全部init状态的文件 */
  submit: (file?: UploadItem) => void;
  /** 中止文件上传 */
  abort: (file: UploadItem) => void;
  /** 重新上传文件 */
  reupload: (file: UploadItem) => void;
};
