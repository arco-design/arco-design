import React from 'react';
import { useFakeXMLHttpRequest } from 'sinon';
import { act } from 'react-test-renderer';
import { UploadItem, STATUS } from '../interface';
import mountTest from '../../../tests/mountTest';
import componentConfigTest from '../../../tests/componentConfigTest';
import Upload from '..';
import { sleep, render, fireEvent } from '../../../tests/util';

mountTest(Upload);
componentConfigTest(Upload, 'Upload');

function getFile(name = 'file1') {
  return new File([new Blob(['aaa'], { type: 'text/txt' })], `${name}.txt`, {
    type: 'text/txt',
  });
}

describe('Upload', function () {
  const requests: any[] = [];
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
    const wrapper = render(
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
      fireEvent.change(input.item(0), {
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
    const wrapper = render(<Upload action="/sss" onChange={(files) => (fileList = files)} />);
    const input = wrapper.find('input');
    expect(input).toHaveLength(1);
    const files = [getFile()];

    await act(() => {
      fireEvent.change(input.item(0), {
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
    const wrapper = render(<Upload action="/sss" defaultFileList={fileList} />);
    expect(wrapper.find('.arco-upload-list-item')).toHaveLength(1);
    expect(wrapper.find('.arco-upload-list-item').item(0)).toHaveClass(
      'arco-upload-list-item-done'
    );
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
    const wrapper = render(
      <Upload
        action="/sss"
        fileList={fileList}
        onChange={(files) => {
          fileList = files;
        }}
      />
    );
    expect(wrapper.find('.arco-upload-list-item')).toHaveLength(2);

    const input = wrapper.find('input');
    expect(input).toHaveLength(1);
    const files = [getFile('file1')];

    await act(() => {
      fireEvent.change(input.item(0), {
        target: {
          files,
        },
      });
    });

    await sleep(10);

    wrapper.rerender(
      <Upload
        action="/sss"
        fileList={fileList}
        onChange={(files) => {
          fileList = files;
        }}
      />
    );

    requests[2].respond(400, {}, JSON.stringify(files.map(() => 'error: upload error')));

    expect(fileList.map((x) => x.status)).toEqual(['done', 'done', 'error']);

    wrapper.rerender(
      <Upload
        action="/sss"
        fileList={fileList}
        onChange={(files) => {
          fileList = files;
        }}
      />
    );
    const items = wrapper.find('.arco-upload-list-item');
    expect(items).toHaveLength(3);

    await act(() => {
      fireEvent.click(items.item(2).querySelector('.arco-upload-list-reupload-icon') as any);
    });

    expect(fileList[2].status).toBe(STATUS.uploading);
  });

  it('custom upload method', async function () {
    const wrapper = render(<Upload action="/sss" method="put" />);
    const input = wrapper.find('input');
    const files = [getFile('file1')];

    await act(() => {
      fireEvent.change(input.item(0), {
        target: {
          files,
        },
      });
    });

    await sleep(100);
    expect(requests[4].method).toEqual('put');
  });
});
