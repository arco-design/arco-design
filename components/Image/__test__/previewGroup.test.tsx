import React from 'react';
import { mount } from 'enzyme';
import { act } from 'react-dom/test-utils';
import Image from '..';
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
    wrapper.find('img').at(index).simulate(method);
    jest.runAllTimers();
    wrapper.update();
  };
  it('render basic group correctly', () => {
    const wrapper = mount(
      <Image.PreviewGroup>
        <Image src={srcList[0]} />
        <Image src={srcList[1]} />
      </Image.PreviewGroup>
    );

    act(() => {
      updateImg(wrapper, 'click');
      updateImg(wrapper);
    });

    expect(wrapper.find('.arco-image-preview').get(0)).toBeTruthy();

    expect(() => {
      wrapper.unmount();
    }).not.toThrow();
  });

  it('handle arrow click correctly', () => {
    const mockChange = jest.fn();

    const wrapper = mount(
      <Image.PreviewGroup defaultVisible srcList={srcList} onChange={mockChange} />
    );
    jest.runAllTimers();
    wrapper.update();

    const disabledArrowClass = 'arco-image-preview-arrow-disabled';

    expect(
      wrapper.find('.arco-image-preview-arrow-left').hasClass(disabledArrowClass)
    ).toBeTruthy();

    wrapper.find('.arco-image-preview-arrow-right').simulate('click');
    expect(wrapper.find('.arco-image-preview-arrow-left').hasClass(disabledArrowClass)).toBeFalsy();

    expect(mockChange.mock.calls).toHaveLength(1);
    expect(mockChange.mock.calls[0]).toEqual([1]);
  });

  it('should trigger change event correctly', () => {
    const mockChange = jest.fn();

    const wrapper = mount(
      <Image.PreviewGroup onChange={mockChange}>
        {srcList.map((src, index) => (
          <Image key={index} src={src} />
        ))}
      </Image.PreviewGroup>
    );

    wrapper.find('.arco-image-img').at(1).simulate('click');

    wrapper.find('.arco-image-preview-arrow-right').simulate('click');
    wrapper.find('.arco-image-preview-arrow-left').simulate('click');

    expect(mockChange.mock.calls).toHaveLength(3);
    expect(mockChange.mock.calls[0]).toEqual([1]);
    expect(mockChange.mock.calls[1]).toEqual([2]);
    expect(mockChange.mock.calls[2]).toEqual([1]);
  });

  it('handle group onVisibleChange correctly', () => {
    const mockOnVisibleChange = jest.fn();
    const wrapper = mount(
      <Image.PreviewGroup defaultVisible srcList={srcList} onVisibleChange={mockOnVisibleChange} />
    );

    jest.runAllTimers();
    wrapper.update();

    wrapper.find('.arco-image-preview-close-btn').simulate('click');
    expect(mockOnVisibleChange.mock.calls[0]).toEqual([false, true]);
    expect(wrapper.find('img')).toHaveLength(0);
  });

  it('with index controlled', () => {
    const wrapper = mount(<Image.PreviewGroup defaultVisible srcList={srcList} />);

    jest.runAllTimers();
    wrapper.update();

    expect(wrapper.find('img').prop('src')).toEqual(srcList[0]);

    const _index = srcList.length - 1;
    act(() => {
      wrapper.setProps({
        current: _index,
      });
      jest.runAllTimers();
      wrapper.update();
    });

    expect(wrapper.find('img').prop('src')).toEqual(srcList[_index]);
  });
});
