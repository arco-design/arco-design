import React from 'react';
import { mount } from 'enzyme';
import { useFakeXMLHttpRequest } from 'sinon';
import { act } from 'react-test-renderer';
import { UploadItem, UploadProps } from '../interface';
import mountTest from '../../../tests/mountTest';
import { sleep } from '../../../tests/util';
import Upload from '..';

function getFile(name = 'file1') {
  return new File([new Blob(['aaa'], { type: 'text/txt' })], `${name}.txt`, {
    type: 'text/txt',
  });
}

mountTest(Upload);

const getWrapper = async (props: UploadProps) => {
  const wrapper = mount<UploadProps>(<Upload action="/sss" {...props} />);
  const input = wrapper.find('input');
  const files = [getFile()];
  await act(() => {
    input.simulate('change', {
      target: {
        files,
      },
    });
  });
  return wrapper;
};

describe('Upload api callbacks', function() {
  const requests = [];
  let xhr;
  beforeEach(function() {
    xhr = useFakeXMLHttpRequest();

    xhr.onCreate = function(xhr) {
      requests.push(xhr);
    };
  });

  afterEach(function() {
    xhr.restore();
  });

  it('onChange and onProgress should be fired', async function() {
    const mockFn = jest.fn();
    const progressFn = jest.fn();

    await getWrapper({
      onChange: mockFn,
      onProgress: progressFn,
    });

    expect(mockFn.mock.calls.length).toBe(1); // init status

    await sleep(100);
    expect(mockFn.mock.calls.length).toBe(2); // uploading status

    requests[0].respond(200, {}, JSON.stringify({}));
    await sleep(100);
    expect(mockFn.mock.calls.length).toBe(3); // done status
    expect(progressFn.mock.calls.length).toBe(1);
  });

  it('onPreview should be fired', async function() {
    const mockFn = jest.fn();
    const wrapper = mount<UploadProps>(
      <Upload
        action="/sss"
        listType="picture-card"
        onPreview={mockFn}
        defaultFileList={[
          {
            url: 'xx',
            uid: '1',
            name: 'x.jpg',
          },
        ]}
      />
    );

    expect(wrapper.find('.arco-upload-list-preview-icon')).toHaveLength(1);
    await act(() => {
      wrapper
        .find('.arco-upload-list-preview-icon')
        .at(0)
        .simulate('click');
    });

    expect(mockFn.mock.calls.length).toBe(1);
  });

  describe('onRemove upload', () => {
    const defaultFileList: UploadItem[] = [
      {
        name: '1',
        uid: '1',
        status: 'done',
      },
      {
        name: '2',
        uid: '2',
        status: 'done',
      },
    ];
    it('should delete', async () => {
      let fileList = defaultFileList;

      const wrapper = mount<UploadProps>(
        <Upload
          action="/sss"
          fileList={fileList}
          onChange={(files) => {
            fileList = files;
            wrapper.setProps({ fileList });
          }}
        />
      );

      // onRemove 不设置，直接删除
      const items = wrapper.find('FileList').find('.arco-upload-list-item');
      expect(items).toHaveLength(2);

      await act(() => {
        wrapper
          .find('.arco-upload-list-remove-icon')
          .at(0)
          .simulate('click');
      });
      expect(fileList).toEqual([{ ...defaultFileList[1], percent: 100 }]);
      expect(fileList).toHaveLength(1);
    });

    it('onRemove return false', async () => {
      let fileList = defaultFileList;
      // onRemove 返回false，不执行删除操作
      const wrapper = mount<UploadProps>(
        <Upload
          action="/sss"
          onRemove={() => false}
          fileList={fileList}
          onChange={(files) => (fileList = files)}
        />
      );
      await act(() => {
        wrapper
          .find('.arco-upload-list-remove-icon')
          .at(0)
          .simulate('click');
      });

      expect(fileList).toEqual(defaultFileList);
      expect(fileList).toHaveLength(2);
    });

    it('onRemove return reject', async () => {
      let fileList = defaultFileList;
      // onRemove 返回reject promise，不执行删除操作
      const wrapper = mount<UploadProps>(
        <Upload
          action="/sss"
          onRemove={() =>
            new Promise((_, reject) => {
              setTimeout(() => {
                reject('error');
              }, 10);
            })
          }
          fileList={fileList}
          onChange={(files) => (fileList = files)}
        />
      );

      await act(() => {
        wrapper
          .find('.arco-upload-list-remove-icon')
          .at(0)
          .simulate('click');
      });
      await sleep(20);
      expect(fileList).toEqual(defaultFileList);
      expect(fileList).toHaveLength(2);
    });
    it('onRemove return resolve promise', async function() {
      // onRemove 返回resolve promise，执行删除操作
      let fileList;
      const wrapper = mount<UploadProps>(
        <Upload
          action="/sss"
          onRemove={() =>
            new Promise((resolve) => {
              setTimeout(() => {
                resolve(null);
              }, 10);
            })
          }
          defaultFileList={defaultFileList}
          onChange={(files) => {
            fileList = files;
          }}
        />
      );

      await act(() => {
        wrapper
          .find('FileList')
          .find('.arco-upload-list-remove-icon')
          .at(0)
          .simulate('click');
      });

      await sleep(20);

      expect(fileList).toEqual([{ ...defaultFileList[1], percent: 100 }]);
    });
  });
});
