import React from 'react';
import { mount } from 'enzyme';
import { act } from 'react-test-renderer';
import { IconFileAudio, IconClose, IconFaceFrownFill, IconUpload } from '../../../icon';
import { STATUS, UploadProps } from '../interface';
import mountTest from '../../../tests/mountTest';
import Upload from '..';

mountTest(Upload);

const defaultFileList = [
  {
    uid: '-2',
    name: '20200717-103937.png',
    url: 'https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/701131f3576449d483d0650a525b57ee~tplv-uwbnlip3yd-image.image',
  },
  {
    uid: '-1',
    name: 'hahhahahahaha.png',
    url: 'https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/52f4a7d98ce8411c9a347cfc98d93bfb~tplv-uwbnlip3yd-image.image',
  },
];

describe('Upload list', function () {
  it('renderUploadList', async function () {
    const mockFn = jest.fn();
    const wrapper = mount<UploadProps>(
      <Upload
        defaultFileList={defaultFileList}
        action="/sss"
        renderUploadList={() => {
          mockFn();
          return <div id="test">123</div>;
        }}
      />
    );

    expect(mockFn.mock.calls.length).toBe(1);
    expect(wrapper.find('#test')).toHaveLength(1);
  });

  it('showUploadList', async function () {
    const onRemoveFn = jest.fn();
    const wrapper = mount<UploadProps>(
      <Upload
        fileList={[defaultFileList[0], { ...defaultFileList[1], status: 'error' }]}
        action="/sss"
        onRemove={onRemoveFn}
        showUploadList={{
          reuploadIcon: <IconUpload />,
          cancelIcon: <IconClose />,
          fileIcon: <IconFileAudio />,
          removeIcon: <IconClose />,
          previewIcon: null,
          errorIcon: <IconFaceFrownFill />,
          fileName: (file) => {
            return <a id="test">{file.name}</a>;
          },
        }}
      />
    );

    expect(wrapper.find('#test')).toHaveLength(2);
    expect(wrapper.find('.arco-upload-list-remove-icon .arco-icon-close')).toHaveLength(2);

    await act(() => {
      wrapper.find('.arco-upload-list-remove-icon .arco-icon-close').at(0).simulate('click');
    });

    expect(onRemoveFn.mock.calls.length).toBe(1);

    expect(wrapper.find('.arco-upload-list-reupload-icon .arco-icon-upload')).toHaveLength(1);
    expect(wrapper.find('.arco-upload-list-error-icon .arco-icon-face-frown-fill')).toHaveLength(1);

    let changeFile;
    wrapper.setProps({
      listType: 'picture-card',
      onChange: (_, file) => {
        changeFile = file;
      },
    });

    expect(wrapper.find('.arco-upload-list-preview-icon')).toHaveLength(0);
    expect(wrapper.find('.arco-upload-list-reupload-icon')).toHaveLength(1);

    await act(() => {
      wrapper.find('.arco-upload-list-reupload-icon').simulate('click');
    });

    expect(changeFile.status).toBe(STATUS.uploading);
  });
});
