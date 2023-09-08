import { isArray, isObject } from '../_util/is';
import { UploadProps } from './interface';

export const isAcceptFile = (file: File, propsAccept?: UploadProps['accept']): boolean => {
  const accept = isObject(propsAccept) ? propsAccept?.type : propsAccept;
  // 显示设置 strict=false，才是非严格模式，不走过滤逻辑
  const strict = !(isObject(propsAccept) && propsAccept.strict === false);
  if (strict && accept && file) {
    const accepts = isArray(accept)
      ? accept
      : accept
          .split(',')
          .map((x) => x.trim())
          .filter((x) => x);
    const fileExtension = (
      file.name.indexOf('.') > -1 ? `.${file.name.split('.').pop()}` : ''
    ).toLowerCase();
    return accepts.some((type) => {
      const typeText = type && type.toLowerCase();
      const fileType = (file.type || '').toLowerCase();
      const baseFileType = fileType.split('/')[0]; // audio/mpeg => audio;

      // `${baseFileType}/${fileExtension}` === typeText
      // filetype is audio/mpeg, but accept is audio/mp3, should return true
      if (
        typeText === fileType ||
        `${baseFileType}${fileExtension.replace('.', '/')}` === typeText
      ) {
        // 类似excel文件这种
        // 比如application/vnd.ms-excel和application/vnd.openxmlformats-officedocument.spreadsheetml.sheet
        // 本身就带有.字符的，不能走下面的.jpg等文件扩展名判断处理
        // 所以优先对比input的accept类型和文件对象的type值
        return true;
      }
      // */*,*  之类的所有类型
      if (/^\*(\/\*)?$/.test(typeText)) {
        return true;
      }
      if (/\/\*/.test(typeText)) {
        // image/* 这种通配的形式处理
        return fileType.replace(/\/.*$/, '') === typeText.replace(/\/.*$/, '');
      }
      if (/\..*/.test(typeText)) {
        // .jpg 等后缀名
        let suffixList = [typeText];
        // accept=".jpg", jpeg后缀类型同样可以上传，反之亦然
        if (typeText === '.jpg' || typeText === '.jpeg') {
          suffixList = ['.jpg', '.jpeg'];
        }
        return suffixList.indexOf(fileExtension) > -1;
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
