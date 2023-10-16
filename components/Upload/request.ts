import { RequestOptions, UploadRequest } from './interface';
import { NOOP } from '../_util/constant';

function getBody(xhr: XMLHttpRequest) {
  const text = xhr.responseText || xhr.response;
  if (!text) {
    return text;
  }

  try {
    return JSON.parse(text);
  } catch (e) {
    return text;
  }
}

const uploadRequest: UploadRequest = function (options: RequestOptions) {
  const {
    onProgress = NOOP,
    onError = NOOP,
    onSuccess = NOOP,
    action,
    method,
    headers = {},
    name: originName,
    file,
    data: originData = {},
    withCredentials = false,
  } = options;
  function getValue(value) {
    if (typeof value === 'function') {
      return value(file);
    }
    return value;
  }
  const name = getValue(originName) as string;
  const data = getValue(originData) as object;
  const xhr = new XMLHttpRequest();
  if (onProgress && xhr.upload) {
    xhr.upload.onprogress = function (event: ProgressEvent) {
      let percent;
      if (event.total > 0) {
        percent = (event.loaded / event.total) * 100;
      }
      onProgress(parseInt(percent, 10), event);
    };
  }
  xhr.onerror = function error(e) {
    onError(e);
  };
  xhr.onload = function onload() {
    if (xhr.status < 200 || xhr.status >= 300) {
      return onError(getBody(xhr));
    }

    onSuccess(getBody(xhr));
  };
  const formData = new FormData();
  if (data) {
    Object.keys(data).map((key) => formData.append(key, data[key]));
  }
  formData.append(name || 'file', file);

  xhr.open(method, action, true);
  if (withCredentials && 'withCredentials' in xhr) {
    xhr.withCredentials = true;
  }
  for (const h in headers) {
    if (headers.hasOwnProperty(h) && headers[h] !== null) {
      xhr.setRequestHeader(h, headers[h]);
    }
  }
  xhr.send(formData);
  return {
    abort() {
      xhr.abort();
    },
  };
};

export default uploadRequest;
