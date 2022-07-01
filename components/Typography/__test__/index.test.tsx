import React from 'react';
import { act } from 'react-test-renderer';
import Typography from '..';
import IconCopy from '../../../icon/react-icon/IconCopy';
import { sleep, render, fireEvent } from '../../../tests/util';
import copy from '../../_util/clipboard';

const { Title, Text, Paragraph } = Typography;

jest.mock('../../_util/clipboard', () => {
  const originalModule = jest.requireActual('../../_util/clipboard');

  return {
    __esModule: true,
    ...originalModule,
    default: jest.fn(),
  };
});

describe('Typography', () => {
  it('basic bold', () => {
    const wrapper = render(<Text bold mark code underline delete />);
    expect(wrapper.find('.arco-typography')).toHaveLength(1);
    expect(wrapper.find('b')).toHaveLength(1);
    expect(wrapper.find('mark')).toHaveLength(1);
    expect(wrapper.find('code')).toHaveLength(1);
    expect(wrapper.find('u')).toHaveLength(1);
    expect(wrapper.find('del')).toHaveLength(1);
  });

  it('basic title Render', () => {
    const wrapper = render(<Title heading={1}>Basic Title</Title>);
    expect(wrapper.find('h1')).toHaveLength(1);

    act(() => {
      wrapper.rerender(<Title heading={3}>Basic Title</Title>);
    });

    expect(wrapper.find('h3')).toHaveLength(1);
  });

  it('specal Paragraph render', () => {
    const wrapper = render(
      <Paragraph className="paragraph-test" spacing="close">
        Paragraph with customize className
      </Paragraph>
    );

    expect(wrapper.find('.arco-typography')[0].classList.contains('paragraph-test')).toBeTruthy();
    expect(
      wrapper.find('.arco-typography')[0].classList.contains('arco-typography-spacing-close')
    ).toBeTruthy();
  });

  it('support copyable', async () => {
    const onCopy = jest.fn();
    const wrapper = render(<Text copyable={{ onCopy, icon: <IconCopy /> }}>copyable test</Text>);
    expect(wrapper.find('.arco-icon-copy')).toHaveLength(1);

    act(() => {
      fireEvent.click(wrapper.find('.arco-typography-operation-copy')[0]);
    });

    expect(copy).toHaveBeenCalled();
    expect(onCopy).toHaveBeenCalled();

    await act(async () => {
      sleep(3000);
    });

    expect(wrapper.find('.arco-icon-copy')).toHaveLength(0);
    expect(wrapper.find('.arco-icon-check-circle-fill')).toHaveLength(1);
  });

  it('support editable correctly', () => {
    const beforeText = 'editable text';
    const afterText = 'after-edited text';

    const onStart = jest.fn();
    const onEnd = jest.fn();
    const onChange = jest.fn();
    const wrapper = render(
      <Paragraph editable={{ onChange, onStart, onEnd }}>{beforeText}</Paragraph>
    );
    act(() => {
      fireEvent.click(wrapper.find('.arco-typography-operation-edit')[0]);
    });

    expect(onStart).toHaveBeenCalledTimes(1);
    expect(wrapper.find('.arco-textarea')).toHaveLength(1);

    act(() => {
      fireEvent.change(wrapper.find('.arco-textarea')[0], { target: { value: afterText } });
    });
    expect(onChange.mock.calls[0][0]).toEqual(afterText);
    act(() => {
      fireEvent.blur(wrapper.find('.arco-textarea')[0]);
      wrapper.rerender(<Paragraph editable={{ onChange, onStart, onEnd }}>{afterText}</Paragraph>);
    });
    expect(onEnd).toHaveBeenCalledTimes(1);
    expect(wrapper.find('.arco-typography')[0]).toHaveTextContent(afterText);
  });
});
