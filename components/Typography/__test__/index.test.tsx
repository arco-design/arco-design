import React from 'react';
import { mount } from 'enzyme';
import { act } from 'react-test-renderer';
import Typography from '..';
import IconCopy from '../../../icon/react-icon/IconCopy';
import { sleep } from '../../../tests/util';
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
    const wrapper = mount(<Text bold mark code underline delete />);
    expect(wrapper.find('.arco-typography')).toHaveLength(1);
    expect(wrapper.find('b')).toHaveLength(1);
    expect(wrapper.find('mark')).toHaveLength(1);
    expect(wrapper.find('code')).toHaveLength(1);
    expect(wrapper.find('u')).toHaveLength(1);
    expect(wrapper.find('del')).toHaveLength(1);
  });

  it('basic title Render', () => {
    const wrapper = mount(<Title heading={1}>Basic Title</Title>);
    expect(wrapper.find('h1')).toHaveLength(1);

    act(() => {
      wrapper.setProps({ heading: 3 });
      wrapper.update();
    });

    expect(wrapper.find('h3')).toHaveLength(1);
  });

  it('specal Paragraph render', () => {
    const wrapper = mount(
      <Paragraph className="paragraph-test" spacing="close">
        Paragraph with customize className
      </Paragraph>
    );

    expect(wrapper.find('Base').hasClass('paragraph-test')).toBeTruthy();
    expect(wrapper.find('Base').hasClass('arco-typography-spacing-close')).toBeTruthy();
  });

  it('support copyable', async () => {
    const onCopy = jest.fn();
    const wrapper = mount(<Text copyable={{ onCopy, icon: <IconCopy /> }}>copyable test</Text>);
    expect(wrapper.find('IconCopy')).toHaveLength(1);

    act(() => {
      wrapper.find('.arco-typography-operation-copy').simulate('click');
      wrapper.update();
    });

    expect(copy).toHaveBeenCalled();
    expect(onCopy).toHaveBeenCalled();

    await act(async () => {
      sleep(3000);
    });

    expect(wrapper.find('IconCopy')).toHaveLength(0);
    expect(wrapper.find('IconCheckCircleFill')).toHaveLength(1);
  });

  it('support editable correctly', () => {
    const beforeText = 'editable text';
    const afterText = 'after-edited text';

    const onStart = jest.fn();
    const onEnd = jest.fn();
    const onChange = jest.fn();
    const wrapper = mount(
      <Paragraph editable={{ onChange, onStart, onEnd }}>{beforeText}</Paragraph>
    );
    act(() => {
      wrapper.find('.arco-typography-operation-edit').simulate('click');
      wrapper.update();
    });

    expect(onStart).toHaveBeenCalledTimes(1);
    expect(wrapper.find('TextArea')).toHaveLength(1);

    act(() => {
      wrapper.find('TextArea').simulate('change', {
        target: {
          value: afterText,
        },
      });
      wrapper.update();
    });

    expect(onChange.mock.calls[0][0]).toEqual(afterText);
    act(() => {
      wrapper.find('TextArea').simulate('blur');
      wrapper.setProps({
        children: afterText,
      });
    });
    expect(onEnd).toHaveBeenCalledTimes(1);
    expect(wrapper.text()).toEqual(afterText);
  });
});
