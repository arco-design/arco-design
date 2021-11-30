import React from 'react';
import { mount } from 'enzyme';
import { useFakeXMLHttpRequest } from 'sinon';
import { act } from 'react-test-renderer';
import { UploadProps, UploadItem, STATUS } from '../interface';
import mountTest from '../../../tests/mountTest';
import componentConfigTest from '../../../tests/componentConfigTest';
// import { sleep } from '../../../tests/util';
import Upload from '..';
import { sleep } from '../../../tests/util';

mountTest(Upload);
componentConfigTest(Upload, 'Upload');

function getFile(name = 'file1') {
  return new File([new Blob(['aaa'], { type: 'text/txt' })], `${name}.txt`, {
    type: 'text/txt',
  });
}

describe('Upload', function () {
  const requests = [];
  let xhr;
  beforeEach(function () {
    xhr = useFakeXMLHttpRequest();
    xhr.onCreate = function (xhr) {
      requests.push(xhr);
    };
  });

  afterEach(function () {
    xhr.restore();
  });

  it('basic upload', async function () {
    let fileList: UploadItem[] = [];
    const wrapper = mount<UploadProps>(
      <Upload
        action="/sss"
        onChange={(files) => {
          fileList = files;
        }}
      />
    );
    const input = wrapper.find('input');
    expect(input).toHaveLength(1);
    const files = [getFile('file1')];

    await act(() => {
      input.simulate('change', {
        target: {
          files,
        },
      });
    });

    expect(fileList.every((x) => x.status === 'init')).toBe(true);

    expect(fileList.map((x) => x.originFile)).toEqual(files);

    await sleep(100);

    requests[0].respond(200, {}, JSON.stringify(files.map((x) => x.name)));
    expect(fileList.every((x) => x.status === 'done')).toBe(true);
  });

  it('upload error', async function () {
    let fileList: UploadItem[] = [];
    const wrapper = mount<UploadProps>(
      <Upload action="/sss" onChange={(files) => (fileList = files)} />
    );
    const input = wrapper.find('input');
    expect(input).toHaveLength(1);
    const files = [getFile()];

    await act(() => {
      input.simulate('change', {
        target: {
          files,
        },
      });
    });

    await sleep(100);
    requests[1].respond(400, {}, JSON.stringify(files.map(() => 'error: upload error')));
    expect(fileList.every((x) => x.status === 'error')).toBe(true);
  });
  it('initial fileList', async function () {
    const fileList: UploadItem[] = [
      {
        name: '1',
        url: 'xxx',
        uid: 'x',
      },
    ] as any;
    const wrapper = mount<UploadProps>(<Upload action="/sss" defaultFileList={fileList} />);
    expect(wrapper.find('FileList').find('.arco-upload-list-item')).toHaveLength(1);
    expect((wrapper.find('FileList').props() as any).fileList).toEqual([
      {
        ...fileList[0],
        status: 'done',
        percent: 100,
      },
    ]);
  });

  it('initial fileList', async function () {
    let fileList: UploadItem[] = [
      {
        status: 'done',
        name: '1',
        uid: '1',
      },
      {
        name: '2',
        uid: '2',
      },
    ];
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
    expect(wrapper.find('FileList').find('.arco-upload-list-item')).toHaveLength(2);

    const input = wrapper.find('input');
    expect(input).toHaveLength(1);
    const files = [getFile('file1')];

    await act(() => {
      input.simulate('change', {
        target: {
          files,
        },
      });
    });

    await sleep(100);

    requests[2].respond(400, {}, JSON.stringify(files.map(() => 'error: upload error')));
    expect(fileList.map((x) => x.status)).toEqual(['done', 'done', 'error']);

    wrapper.setProps({ fileList });
    const items = wrapper.find('FileList').find('.arco-upload-list-item');
    expect(items).toHaveLength(3);

    await act(() => {
      items.at(2).find('.arco-upload-list-reupload-icon').at(0).simulate('click');
    });

    expect(fileList[2].status).toBe(STATUS.uploading);
  });
});
