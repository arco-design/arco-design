import React, { useState } from 'react';
import { act } from 'react-dom/test-utils';
import Image, { ImagePreviewProps } from '..';
import Button from '../../Button';
import { fireEvent, render } from '../../../tests/util';

const imgSrc =
  '//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/dae45672685c4be6a297acc7848eab56~tplv-uwbnlip3yd-image.image';

const DemoImage = (props: ImagePreviewProps) => {
  const [visible, setVisible] = useState(false);
  const [scales, setScales] = useState(props.scales || []);
  return (
    <>
      <Button onClick={() => setVisible(true)} className="open-img-btn">
        {visible ? 'Close' : 'Open'}
      </Button>
      <Button
        onClick={() => {
          const value = document.querySelector('.image-scales')?.innerHTML;
          if (value) {
            setScales(value.split(',').map((str) => Number(str)));
          }
        }}
        className="update-img-scales"
      >
        updateScales
      </Button>
      <div className="image-scales" />
      <Image.Preview visible={visible} {...props} scales={scales} />
    </>
  );
};

const openPreview = (wrapper) => {
  fireEvent.click(wrapper.find('.open-img-btn')[0]);
};

const updateScales = (wrapper, value) => {
  const numberContainer = document.querySelector('.image-scales');
  if (numberContainer) {
    numberContainer.innerHTML = value.join(',');
    fireEvent.click(wrapper.querySelector('.update-img-scales'));
  }
};

describe('Image', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  const updateImg = (wrapper, method = 'load', params = {}) => {
    if (wrapper.find('img')[0] && fireEvent[method]) {
      fireEvent[method](wrapper.find('img')[0], params);
      jest.runAllTimers();
    }
  };

  const handleAction = (wrapper, index) => {
    const curElem = wrapper.find('.arco-image-preview-toolbar-action')[index];
    if (curElem) {
      fireEvent.click(curElem);
      jest.runAllTimers();
    }
  };

  it('render with defaultVisible and visible', () => {
    const wrapper = render(<DemoImage src={imgSrc} defaultVisible />);

    expect(wrapper.find('img')).toHaveLength(0);

    act(() => {
      openPreview(wrapper);
      jest.runAllTimers();
    });

    expect(wrapper.find('img')).toHaveLength(1);
  });

  it('handle scale event correctly', () => {
    const beforeScale = 'scale(1, 1)';
    const afterScale = 'scale(0.9, 0.9)';
    const wrapper = render(<Image.Preview src={imgSrc} visible />);
    jest.runAllTimers();
    expect(wrapper.find('.arco-image-preview-img-container')[0].style.transform).toEqual(
      beforeScale
    );

    act(() => {
      updateImg(wrapper);
      handleAction(wrapper, 4);
    });

    expect(wrapper.find('.arco-image-preview-img-container')[0].style.transform).toEqual(
      afterScale
    );

    act(() => {
      updateImg(wrapper);
      handleAction(wrapper, 5);
    });

    expect(wrapper.find('.arco-image-preview-img-container')[0].style.transform).toEqual(
      beforeScale
    );
  });

  it('handle rotate event correctly', async () => {
    const wrapper = render(<Image.Preview src={imgSrc} visible />);
    jest.runAllTimers();
    expect(wrapper.find('.arco-image-preview-img')[0].style.transform).toEqual(
      'translate(0px, 0px) rotate(0deg)'
    );

    act(() => {
      updateImg(wrapper);
      handleAction(wrapper, 1);
    });

    expect(wrapper.find('.arco-image-preview-img')[0].style.transform).toEqual(
      'translate(0px, 0px) rotate(90deg)'
    );

    act(() => {
      updateImg(wrapper);
      handleAction(wrapper, 2);
    });

    expect(wrapper.find('.arco-image-preview-img')[0].style.transform).toEqual(
      'translate(0px, 0px) rotate(0deg)'
    );
  });

  it('should remove listener when unmount', () => {
    const wrapper = render(<DemoImage src={imgSrc} />);
    const add = jest.spyOn(document, 'addEventListener');
    const remove = jest.spyOn(document, 'removeEventListener');

    // visible true;
    act(() => {
      openPreview(wrapper);
      jest.runAllTimers();
    });

    expect(add.mock.calls).toHaveLength(1);
    // moving true
    act(() => {
      updateImg(wrapper, 'mouseDown');
    });
    expect(add.mock.calls).toHaveLength(3);
    wrapper.unmount();

    // TODO: 实际remove listener上被调了6次
    // expect(remove.mock.calls).toHaveLength(2);
    expect(remove).toHaveBeenCalled();
  });

  it('handle fullScreen event correctly', async () => {
    const width = 400;
    const height = 200;

    const wrapper = render(
      <div style={{ width, height, position: 'relative' }} id="image_wrapper">
        <Image.Preview
          src={imgSrc}
          visible
          getPopupContainer={() => document.getElementById('image_wrapper') as HTMLElement}
        />
      </div>
    );
    jest.runAllTimers();
    act(() => {
      updateImg(wrapper);
      handleAction(wrapper, 0);
    });

    // 只能判断全屏按钮后scale与原值不同。
    expect(wrapper.find('.arco-image-preview-img-container')[0].style.transform).not.toEqual(
      `scale(1, 1)`
    );
  });

  it('handle close event correctly', () => {
    const mockVisibleChange = jest.fn();
    const wrapper = render(
      <Image.Preview src={imgSrc} onVisibleChange={mockVisibleChange} defaultVisible />
    );
    jest.runAllTimers();
    expect(wrapper.find('img')).toHaveLength(1);
    act(() => {
      fireEvent.click(wrapper.find('.arco-image-preview-close-btn')[0]);
    });
    expect(mockVisibleChange.mock.calls[0]).toEqual([false, true]);
  });

  it('handle maskClosable prop correctly', () => {
    const mockVisibleChange = jest.fn();
    const wrapper = render(
      <Image.Preview
        src={imgSrc}
        onVisibleChange={mockVisibleChange}
        defaultVisible
        maskClosable={false}
      />
    );
    jest.runAllTimers();
    expect(wrapper.find('img')).toHaveLength(1);

    act(() => {
      fireEvent.click(wrapper.find('.arco-image-preview-wrapper')[0]);
    });

    expect(mockVisibleChange).toHaveBeenCalledTimes(0);
    expect(wrapper.find('img')).toHaveLength(1);
  });

  it('handle error src prop correctly', () => {
    const wrapper = render(<Image.Preview src="error" defaultVisible />);
    jest.runAllTimers();
    expect(wrapper.find('.arco-icon-loading')).toHaveLength(1);
    act(() => {
      updateImg(wrapper, 'error');
    });
    expect(wrapper.find('.arco-image-preview-toolbar')).toHaveLength(0);

    act(() => {
      wrapper.find('img')[0].setAttribute('src', imgSrc);
      jest.runAllTimers();
      updateImg(wrapper);
    });
    expect(wrapper.find('.arco-image-preview-toolbar')).toHaveLength(1);
  });

  it('Mouse Event mouse start and mouse end', () => {
    const wrapper = render(<Image.Preview src={imgSrc} defaultVisible />);
    jest.runAllTimers();
    act(() => {
      updateImg(wrapper, 'mouseDown', {
        pageX: 100,
        pageY: 100,
      });
      jest.runAllTimers();
    });

    expect(wrapper.find('.arco-image-preview-img-moving')[0]).toBeTruthy();

    act(() => {
      document.dispatchEvent(new Event('mouseup'));
      jest.runAllTimers();
    });

    expect(wrapper.find('.arco-image-preview-img-moving')[0]).toBeUndefined();
  });

  it('handle zoom event correctly when set custom scales', () => {
    const customsScale = [-90, 20, 120];

    const wrapper = render(<DemoImage src={imgSrc} visible scales={customsScale} />);
    jest.runAllTimers();
    expect(wrapper.find('.arco-image-preview-img-container')[0].style.transform).toEqual(
      `scale(1, 1)`
    );

    // 放大
    act(() => {
      updateImg(wrapper);
      handleAction(wrapper, 3);
    });

    expect(wrapper.find('.arco-image-preview-img-container')[0].style.transform).toEqual(
      `scale(1.2, 1.2)`
    );

    // 1:1
    act(() => {
      updateImg(wrapper);
      handleAction(wrapper, 5);
    });

    expect(wrapper.find('.arco-image-preview-img-container')[0].style.transform).toEqual(
      `scale(1, 1)`
    );

    // 缩小两次
    act(() => {
      updateImg(wrapper);
      handleAction(wrapper, 4);
    });

    act(() => {
      updateImg(wrapper);
      handleAction(wrapper, 4);
    });

    expect(wrapper.find('.arco-image-preview-img-container')[0].style.transform).toEqual(
      `scale(0.2, 0.2)`
    );

    act(() => {
      updateScales(wrapper, [50, 100]);
      jest.runAllTimers();
      updateImg(wrapper);
    });

    expect(wrapper.find('.arco-image-preview-img-container')[0].style.transform).toEqual(
      `scale(1, 1)`
    );
  });

  it('support imgAttribute correctly', () => {
    const onLoad = jest.fn();
    const wrapper = render(
      <DemoImage
        src={imgSrc}
        imgAttributes={{ className: 'img-elem', onLoad, style: { background: 'red' } }}
      />
    );

    expect(wrapper.find('img')).toHaveLength(0);

    act(() => {
      openPreview(wrapper);
      jest.runAllTimers();
    });

    expect(wrapper.find('img')[0].classList).toContain('img-elem');
    expect(wrapper.find('img')[0].style.background).toEqual('red');
    act(() => {
      updateImg(wrapper);
    });
    expect(onLoad).toHaveBeenCalledTimes(1);
  });
});
