import React from 'react';
import { act } from 'react-dom/test-utils';
import { fireEvent } from '@testing-library/dom';
import Image from '..';
import { render } from '../../../tests/util';
// import Space from '../../Space';

const srcList = [
  '//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/dae45672685c4be6a297acc7848eab56~tplv-uwbnlip3yd-image.image',
  '//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/a5eb077f42834139ad7ac17563056664~tplv-uwbnlip3yd-image.image',
  '//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/5c030fe27c0e467a9a7d62c36ae4805b~tplv-uwbnlip3yd-image.image',
  '//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/04b379e20b6c42f78d17cac99fcf4fd7~tplv-uwbnlip3yd-image.image',
];

describe('mount and unmount', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  const updateImg = (wrapper, method = 'load', index = 0) => {
    const imgElem = wrapper.find('img')[index];
    if (imgElem) {
      fireEvent[method](imgElem);
      jest.runAllTimers();
    }
  };

  it('render basic group correctly', () => {
    const wrapper = render(
      <Image.PreviewGroup>
        <Image src={srcList[0]} />
        <Image src={srcList[1]} />
      </Image.PreviewGroup>
    );

    act(() => {
      updateImg(wrapper, 'click');
      updateImg(wrapper);
    });

    expect(wrapper.find('.arco-image-preview')[0]).toBeTruthy();

    expect(() => {
      wrapper.unmount();
    }).not.toThrow();
  });

  it('handle arrow click correctly', () => {
    const mockChange = jest.fn();

    const wrapper = render(
      <Image.PreviewGroup defaultVisible srcList={srcList} onChange={mockChange} />
    );
    jest.runAllTimers();

    const disabledArrowClass = 'arco-image-preview-arrow-disabled';

    expect(
      wrapper.find('.arco-image-preview-arrow-left')[0].classList.contains(disabledArrowClass)
    ).toBeTruthy();

    act(() => {
      fireEvent.click(wrapper.find('.arco-image-preview-arrow-right')[0]);
    });
    expect(
      wrapper.find('.arco-image-preview-arrow-left')[0].classList.contains(disabledArrowClass)
    ).toBeFalsy();

    expect(mockChange.mock.calls).toHaveLength(1);
    expect(mockChange.mock.calls[0]).toEqual([1]);
  });

  it('should trigger change event correctly', () => {
    const mockChange = jest.fn();

    const wrapper = render(
      <Image.PreviewGroup onChange={mockChange}>
        {srcList.map((src, index) => (
          <Image key={index} src={src} />
        ))}
      </Image.PreviewGroup>
    );

    act(() => {
      fireEvent.click(wrapper.find('.arco-image-img')[1]);
      jest.runAllTimers();
    });

    act(() => {
      fireEvent.click(wrapper.find('.arco-image-preview-arrow-right')[0]);
      jest.runAllTimers();
    });

    act(() => {
      fireEvent.click(wrapper.find('.arco-image-preview-arrow-left')[0]);
      jest.runAllTimers();
    });

    expect(mockChange.mock.calls).toHaveLength(3);
    expect(mockChange.mock.calls[0]).toEqual([1]);
    expect(mockChange.mock.calls[1]).toEqual([2]);
    expect(mockChange.mock.calls[2]).toEqual([1]);
  });

  it('handle group onVisibleChange correctly', () => {
    const mockOnVisibleChange = jest.fn();
    const wrapper = render(
      <Image.PreviewGroup defaultVisible srcList={srcList} onVisibleChange={mockOnVisibleChange} />
    );

    jest.runAllTimers();

    act(() => {
      fireEvent.click(wrapper.find('.arco-image-preview-close-btn')[0]);
    });
    expect(mockOnVisibleChange.mock.calls[0]).toEqual([false, true]);
    expect(wrapper.find('img')).toHaveLength(0);
  });

  it('with index controlled', () => {
    const wrapper = render(<Image.PreviewGroup defaultVisible srcList={srcList} />);
    jest.runAllTimers();
    expect(wrapper.find('img')[0].getAttribute('src')).toEqual(srcList[0]);
    wrapper.unmount();

    const wrapper1 = render(<Image.PreviewGroup defaultVisible srcList={srcList} current={2} />);
    jest.runAllTimers();
    expect(wrapper1.find('img')[0].getAttribute('src')).toEqual(srcList[2]);
  });

  it('transparent transmission of previewProps', () => {
    const mockLoad = jest.fn();
    const mockError = jest.fn();
    const wrapper = render(
      <Image.PreviewGroup>
        <Image
          src={srcList[0]}
          previewProps={{ className: 'preview-0', imgAttributes: { onLoad: mockLoad } }}
        />
        <Image
          src="error-url"
          previewProps={{ className: 'preview-1', imgAttributes: { onError: mockError } }}
        />
      </Image.PreviewGroup>
    );

    // 检查是否透传至第一个Preview。
    act(() => {
      updateImg(wrapper, 'click');
    });
    expect(wrapper.find('.arco-image-preview')[0].classList).toContain('preview-0');

    act(() => {
      fireEvent.load(wrapper.find('.arco-image-preview img')[0]);
      jest.runAllTimers();
    });
    expect(mockLoad).toBeCalledTimes(1);

    act(() => {
      fireEvent.click(wrapper.find('.arco-image-preview-close-btn')[0]);
      jest.runAllTimers();
    });

    // 检查是否透传至第二个Preview。
    act(() => {
      updateImg(wrapper, 'click', 1);
    });
    expect(wrapper.find('.arco-image-preview')[0].classList).toContain('preview-1');
    act(() => {
      fireEvent.error(wrapper.find('.arco-image-preview img')[0]);
      jest.runAllTimers();
    });
    expect(mockError).toBeCalledTimes(1);
  });
});
