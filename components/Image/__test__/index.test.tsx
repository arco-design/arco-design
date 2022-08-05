import React from 'react';
import { act } from 'react-dom/test-utils';
import { fireEvent, render } from '../../../tests/util';
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

  const updateImg = (wrapper, method = 'load') => {
    if (wrapper.find('img')[0] && fireEvent[method]) {
      fireEvent[method](wrapper.find('img')[0]);
      jest.runAllTimers();
    }
  };

  it('render image with error src', () => {
    const mockError = jest.fn();
    const mockLoad = jest.fn();
    const wrapper = render(<Image src="error" onError={mockError} onLoad={mockLoad} />);
    act(() => {
      updateImg(wrapper, 'error');
    });
    expect(wrapper.find('.arco-image-error')).toHaveLength(1);
    act(() => {
      wrapper.find('img')[0].setAttribute('src', imgSrc);
      updateImg(wrapper);
    });
    expect(wrapper.find('.arco-image-error')).toHaveLength(0);
  });

  it('render basic instance correctly', () => {
    const mockClick = jest.fn();
    const mockVisibleChange = jest.fn();
    const wrapper = render(
      <Image
        src={imgSrc}
        width={200}
        onClick={mockClick}
        previewProps={{ onVisibleChange: mockVisibleChange }}
      />
    );
    act(() => {
      updateImg(wrapper, 'click');
    });

    expect(mockClick).toHaveBeenCalledTimes(1);
    expect(mockVisibleChange).toHaveBeenCalledTimes(1);
  });

  it('render extra options correctly', () => {
    const mockClick = jest.fn();
    const wrapper = render(
      <Image
        src={imgSrc}
        width={200}
        actions={[
          <Button key={1} onClick={mockClick} className="extra-btn">
            extra
          </Button>,
        ]}
      />
    );
    act(() => {
      updateImg(wrapper);
    });
    expect(wrapper.find('.arco-image-actions-list .arco-image-actions-item')).toHaveLength(1);
    act(() => {
      fireEvent.click(wrapper.find('.extra-btn')[0]);
    });
    expect(mockClick).toHaveBeenCalledTimes(1);
  });

  it('The image common property behaves normally', () => {
    const mockLoad = jest.fn();
    const mockMouseEnter = jest.fn();
    const title = 'image_title';
    const wrapper = render(
      <Image
        src={imgSrc}
        width={200}
        onLoad={mockLoad}
        onMouseEnter={mockMouseEnter}
        title={title}
      />
    );
    act(() => {
      updateImg(wrapper);
    });
    expect(mockLoad).toHaveBeenCalledTimes(1);
    expect(wrapper.find(`img[title=${title}]`)).toHaveLength(1);

    act(() => {
      updateImg(wrapper, 'mouseEnter');
    });
    expect(mockMouseEnter).toHaveBeenCalledTimes(1);
  });
});
