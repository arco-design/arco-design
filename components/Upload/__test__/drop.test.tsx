import React from 'react';
import { useFakeXMLHttpRequest } from 'sinon';
import { act } from 'react-test-renderer';
import { UploadItem } from '../interface';
import mountTest from '../../../tests/mountTest';
import { sleep, render, fireEvent } from '../../../tests/util';
import Upload from '..';

function getFile(name, type = 'txt') {
  return new File([new Blob(['aaa'], { type: `text/${type}` })], `${name}.${type}`, {
    type: `text/${type}`,
  });
}

const mockDirectoryItems = () => {
  let flag = false;
  const getItem = ({ isDirectory, name, children }) => {
    return {
      fullPath: name,
      isDirectory,
      isFile: !isDirectory,
      file: (callback) => {
        setTimeout(() => {
          callback({ name });
        }, 10);
      },
      createReader: () => {
        return {
          readEntries(callback) {
            setTimeout(() => {
              let items = [];
              if (!flag) {
                items = (children || []).map((x) => getItem(x));
                flag = true;
              }
              callback(items);
            }, 10);
          },
        };
      },
    };
  };
  return [
    {
      webkitGetAsEntry: () => getItem({ isDirectory: false, name: 'a', children: null }),
    },
    {
      webkitGetAsEntry: () =>
        getItem({ isDirectory: true, name: 'b', children: [{ name: 'b-1', isDirectory: false }] }),
    },
  ];
};

mountTest(Upload);

describe('Upload drop', function () {
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

  it('drop upload', async function () {
    let fileList: UploadItem[] = [];
    const wrapper = render(<Upload action="/sss" onChange={(files) => (fileList = files)} />);
    const triggerNode = wrapper.find('.arco-btn');
    expect(triggerNode).toHaveLength(1);
    const files = [getFile('file1')];

    await act(() => {
      fireEvent.drop(triggerNode.item(0), {
        dataTransfer: {
          files,
        },
      });
    });
    expect(fileList.every((x) => x.status === 'init')).toBe(true);

    await sleep(100);
    expect(fileList.every((x) => x.status === 'uploading')).toBe(true);
    expect(fileList.map((x) => x.originFile)).toEqual(files);

    requests[0].respond(200, {}, JSON.stringify(files.map((x) => x.name)));

    expect(fileList.every((x) => x.status === 'done')).toBe(true);
  });

  it('accept .*', async function () {
    const mockFn = jest.fn();
    const wrapper = render(<Upload accept=".png" action="/sss" onChange={mockFn} />);
    const triggerNode = wrapper.find('.arco-btn');
    expect(triggerNode).toHaveLength(1);
    const files = [getFile('file1')];

    await act(() => {
      fireEvent.drop(triggerNode.item(0), {
        dataTransfer: {
          files,
        },
      });
    });

    expect(mockFn.mock.calls.length).toBe(0);

    await act(() => {
      fireEvent.drop(triggerNode.item(0), {
        dataTransfer: {
          files: [getFile('file2', 'png')],
        },
      });
    });
    expect(mockFn.mock.calls.length).toBe(1);
  });

  it('accept excel', async function () {
    const mockFn = jest.fn();
    const wrapper = render(
      <Upload accept="application/vnd.ms-excel" action="/sss" onChange={mockFn} />
    );
    const triggerNode = wrapper.find('.arco-btn');
    expect(triggerNode).toHaveLength(1);
    const files = [
      new File([new Blob(['aaa'], { type: 'application/vnd.ms-excel' })], 'file.xsl', {
        type: 'application/vnd.ms-excel',
      }),
    ];

    await act(() => {
      fireEvent.drop(triggerNode.item(0), {
        dataTransfer: {
          files,
        },
      });
    });

    expect(mockFn.mock.calls.length).toBe(1);
  });

  it('accept xxx/*', async function () {
    const mockFn = jest.fn();
    const wrapper = render(<Upload multiple accept="image/*" action="/sss" onChange={mockFn} />);
    const triggerNode = wrapper.find('.arco-btn');
    expect(triggerNode).toHaveLength(1);
    const files = [
      new File([new Blob(['aaa'], { type: 'image/png' })], 'a.png', {
        type: 'image/png',
      }),
      new File([new Blob(['bbb'], { type: 'image/jpeg' })], 'bbb.jpg', {
        type: 'image/jpeg',
      }),
    ];

    await act(() => {
      fireEvent.drop(triggerNode.item(0), {
        dataTransfer: {
          files,
        },
      });
    });
    await sleep(100);

    expect(wrapper.find('.arco-upload-list-item')).toHaveLength(2);
  });

  it('directory ', async function () {
    const wrapper = render(<Upload directory action="/sss" />);
    const triggerNode = wrapper.find('.arco-btn');
    expect(triggerNode).toHaveLength(1);

    await act(() => {
      fireEvent.drop(triggerNode.item(0), {
        dataTransfer: {
          items: mockDirectoryItems(),
        },
      });
    });

    await sleep(100);

    expect(wrapper.find('.arco-upload-list-item')).toHaveLength(2);
  });

  it('directory false should filter out directory', async function () {
    const wrapper = render(<Upload action="/sss" multiple />);
    const triggerNode = wrapper.find('.arco-btn');
    expect(triggerNode).toHaveLength(1);

    await act(() => {
      fireEvent.drop(triggerNode.item(0), {
        dataTransfer: {
          items: mockDirectoryItems(),
          files: [getFile('a'), new File([new Blob(['b'], { type: '' })], 'b')],
        },
      });
    });

    await sleep(100);

    expect(wrapper.find('.arco-upload-list-item')).toHaveLength(1);
  });
});
