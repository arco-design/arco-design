import React from 'react';
import { mount } from 'enzyme';
import { act } from 'react-dom/test-utils';
// import mountTest from '../../../tests/mountTest';
import componentConfigTest from '../../../tests/componentConfigTest';
import Image from '..';
import Button from '../../Button';

// mountTest(Image);
componentConfigTest(Image, 'Image');

const imgSrc =
  '//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/dae45672685c4be6a297acc7848eab56~tplv-uwbnlip3yd-image.image';

describe('Image', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    document.body.innerHTML = '';
  });
  afterEach(() => {
    jest.runAllTimers();
  });

  const updateImg = (wrapper, method = 'load', params = {}) => {
    wrapper.find('img').simulate(method, params);
    jest.runAllTimers();
    wrapper.update();
  };

  it('render image with error src', () => {
    const wrapper = mount(<Image src="error" />);
    updateImg(wrapper, 'error');
    expect(wrapper.find('.arco-image-error')).toHaveLength(1);
    act(() => {
      wrapper.setProps({
        src: imgSrc,
      });
      updateImg(wrapper);
    });
    expect(wrapper.find('.arco-image-error')).toHaveLength(0);
  });

  it('render basic instance correctly', () => {
    const mockClick = jest.fn();
    const mockVisibleChange = jest.fn();
    const wrapper = mount(
      <Image
        src={imgSrc}
        width={200}
        onClick={mockClick}
        previewProps={{ onVisibleChange: mockVisibleChange }}
      />
    );
    const imgInstance = wrapper.find('img');
    imgInstance.simulate('click');
    expect(mockClick).toHaveBeenCalledTimes(1);
    expect(mockVisibleChange).toHaveBeenCalledTimes(1);
  });

  it('render extra options correctly', () => {
    const mockClick = jest.fn();
    const wrapper = mount(
      <Image
        src={imgSrc}
        width={200}
        actions={[
          <Button key={1} onClick={mockClick}>
            extra
          </Button>,
        ]}
      />
    );
    act(() => {
      updateImg(wrapper);
    });
    expect(wrapper.find('.arco-image-actions-list').find('.arco-image-actions-item')).toHaveLength(
      1
    );
    wrapper.find('Button').simulate('click');
    expect(mockClick).toHaveBeenCalledTimes(1);
  });
});
