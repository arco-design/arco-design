import { isArray } from '../_util/is';

export const isAcceptFile = (file, accept?: string | string[]): boolean => {
  if (accept && file) {
    const accepts = isArray(accept)
      ? accept
      : accept
          .split(',')
          .map((x) => x.trim())
          .filter((x) => x);
    const fileExtension = file.name.indexOf('.') > -1 ? file.name.split('.').pop() : '';
    return accepts.some((type) => {
      const text = type && type.toLowerCase();
      const fileType = (file.type || '').toLowerCase();
      if (text === fileType) {
        // 类似excel文件这种
        // 比如application/vnd.ms-excel和application/vnd.openxmlformats-officedocument.spreadsheetml.sheet
        // 本身就带有.字符的，不能走下面的.jpg等文件扩展名判断处理
        // 所以优先对比input的accept类型和文件对象的type值
        return true;
      }
      if (/\/\*/.test(text)) {
        // image/* 这种通配的形式处理
        return fileType.replace(/\/.*$/, '') === text.replace(/\/.*$/, '');
      }
      if (/\..*/.test(text)) {
        // .jpg 等后缀名
        return text === `.${fileExtension && fileExtension.toLowerCase()}`;
      }
      return false;
    });
  }
  return !!file;
};

export const getFiles = (fileList, accept) => {
  if (!fileList) {
    return;
  }
  let files = [].slice.call(fileList);
  if (accept) {
    files = files.filter((file) => {
      return isAcceptFile(file, accept);
    });
  }
  return files;
};

export const loopDirectory = (items: DataTransferItemList, accept, callback) => {
  const files = [];

  let restFileCount = 0; // 剩余上传文件的数量
  const onFinish = () => {
    !restFileCount && callback(files);
  };

  const _loopDirectory = (item) => {
    restFileCount += 1;

    if (item.isFile) {
      item.file((file) => {
        restFileCount -= 1;
        if (isAcceptFile(file, accept)) {
          Object.defineProperty(file, 'webkitRelativePath', {
            value: item.fullPath.replace(/^\//, ''),
          });
          files.push(file);
        }
        onFinish();
      });
      return;
    }
    if (item.isDirectory) {
      // item 是个文件夹
      const reader = item.createReader();
      let flag = false;
      const readEntries = () => {
        reader.readEntries((entries) => {
          if (!flag) {
            restFileCount -= 1;
            flag = true;
          }
          if (entries.length === 0) {
            onFinish();
          } else {
            readEntries(); // the maximum files read using readEntries is 100
            entries.forEach(_loopDirectory);
          }
        });
      };
      readEntries();
      return;
    }

    restFileCount -= 1;
    onFinish();
  };

  const list = [].slice.call(items);

  list.forEach((item: DataTransferItem) => {
    if (item.webkitGetAsEntry) {
      _loopDirectory(item.webkitGetAsEntry());
    }
  });
};
