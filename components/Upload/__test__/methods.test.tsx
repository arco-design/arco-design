import React from 'react';
import { useFakeXMLHttpRequest } from 'sinon';
import { act } from 'react-test-renderer';
import { UploadItem, STATUS, UploadInstance } from '../interface';
import mountTest from '../../../tests/mountTest';
import Upload from '..';
import { sleep, render, fireEvent } from '../../../tests/util';

mountTest(Upload);

function getFile(name = 'file1') {
  return new File([new Blob(['aaa'], { type: 'text/txt' })], `${name}.txt`, {
    type: 'text/txt',
  });
}

describe('Upload Methods', function () {
  let requests: any[] = [];
  let xhr;
  beforeEach(function () {
    requests = [];
    xhr = useFakeXMLHttpRequest();
    xhr.onCreate = function (xhr) {
      requests.push(xhr);
    };
  });

  afterEach(function () {
    xhr.restore();
  });

  it('submit method', async function () {
    let fileList: UploadItem[] = [];
    let uploadRef: UploadInstance = null as any;
    const wrapper = render(
      <Upload
        ref={(node: UploadInstance) => (uploadRef = node)}
        action="/sss"
        autoUpload={false}
        onChange={(files) => {
          fileList = files;
        }}
      />
    );
    const input = wrapper.find('input');
    expect(input).toHaveLength(1);

    await act(() => {
      fireEvent.change(input.item(0), {
        target: {
          files: [getFile('file1'), getFile('file2')],
        },
      });
    });

    expect(fileList.length).toEqual(2);
    expect(fileList.every((x) => x.status === STATUS.init)).toBe(true);

    uploadRef.submit(fileList[0]);

    await sleep(100);

    requests[0].respond(200, {}, JSON.stringify({}));
    expect(fileList[0].status).toBe(STATUS.success);
    expect(fileList[1].status).toBe(STATUS.init);

    uploadRef.submit(fileList[1]);

    await sleep(100);
    requests[1].respond(200, {}, JSON.stringify({}));

    expect(fileList[1].status).toBe(STATUS.success);
  });

  it('submit all ', async function () {
    let fileList: UploadItem[] = [];
    let uploadRef: UploadInstance = null as any;
    const wrapper = render(
      <Upload
        ref={(node: UploadInstance) => (uploadRef = node)}
        action="/sss"
        autoUpload={false}
        onChange={(files) => {
          fileList = files;
        }}
      />
    );
    const input = wrapper.find('input');

    await act(() => {
      fireEvent.change(input.item(0), {
        target: {
          files: [getFile('file1'), getFile('file2')],
        },
      });
    });

    uploadRef.submit();

    await sleep(200);

    requests[1].respond(200, {}, JSON.stringify({}));
    requests[0].respond(200, {}, JSON.stringify({}));

    expect(fileList[0].status).toBe(STATUS.success);
    expect(fileList[1].status).toBe(STATUS.success);
  });
});
