import React from 'react';
import { mount } from 'enzyme';
import mountTest from '../../../tests/mountTest';
import Checkbox from '..';
import Grid from '../../Grid';

const { Col, Row } = Grid;

mountTest(Checkbox);
const options = ['Option A', 'Option B', 'Option C'];
describe('Checkbox group', () => {
  it('Checkbox default options', () => {
    const wrapper = mount(<Checkbox.Group options={options} />);
    wrapper.setProps({ direction: 'vertical' });
    expect(
      wrapper.find('.arco-checkbox-group').hasClass('arco-checkbox-group-direction-vertical')
    ).toBe(true);
  });

  it('Checkbox default options object', () => {
    const options = [
      {
        label: 'Option 1',
        value: '1',
      },
      {
        label: 'Option 2',
        value: '2',
        disabled: true,
      },
      {
        label: 'Option 3',
        value: '3',
      },
      {
        label: 'Option 4',
        value: '4',
      },
    ];
    const wrapper = mount(<Checkbox.Group options={options} />);
    const values = wrapper.find('input').map((x) => {
      return x.getDOMNode().getAttribute('value');
    });
    expect(values).toEqual(options.map((x) => x.value));
    expect(
      wrapper.find('.arco-checkbox-text').map((x) => {
        return x.text();
      })
    ).toEqual(options.map((x) => x.label));
  });

  it('CheckboxGroup onChange', () => {
    const mockFn = jest.fn();
    const wrapper = mount(
      <Checkbox.Group options={options} onChange={mockFn}>
        Checkbox
      </Checkbox.Group>
    );
    wrapper
      .find('.arco-checkbox > input')
      .at(0)
      .simulate('change', {
        target: {
          checked: true,
        },
      });

    expect(mockFn.call.length).toBe(1);

    expect(
      wrapper
        .find('.arco-checkbox')
        .at(0)
        .hasClass('arco-checkbox-checked')
    ).toBe(true);
  });
});

describe('checkbox group controled', () => {
  it('defaultvalue', () => {
    const mockFn = jest.fn();

    const wrapper = mount(
      <Checkbox.Group options={options} defaultValue={[options[1]]} onChange={mockFn}>
        Checkbox
      </Checkbox.Group>
    );
    expect(
      wrapper
        .find('.arco-checkbox')
        .at(1)
        .hasClass('arco-checkbox-checked')
    ).toBe(true);
    wrapper
      .find('.arco-checkbox > input')
      .at(0)
      .simulate('change', {
        target: {
          checked: true,
        },
      });
    expect(mockFn.call.length).toBe(1);

    expect(
      wrapper
        .find('.arco-checkbox')
        .at(0)
        .hasClass('arco-checkbox-checked')
    ).toBe(true);

    expect(
      wrapper
        .find('.arco-checkbox')
        .at(1)
        .hasClass('arco-checkbox-checked')
    ).toBe(true);
  });

  it('value', () => {
    let checked = [options[0]];
    const wrapper = mount(
      <Checkbox.Group options={options} value={checked} onChange={(v) => (checked = v)} />
    );
    wrapper
      .find('.arco-checkbox > input')
      .at(1)
      .simulate('change', {
        target: {
          checked: true,
        },
      });

    expect(checked).toEqual(options.slice(0, 2));
    wrapper.setProps({ value: checked });
    expect(
      wrapper
        .find('.arco-checkbox')
        .at(1)
        .hasClass('arco-checkbox-checked')
    ).toBe(true);

    wrapper
      .find('.arco-checkbox > input')
      .at(0)
      .simulate('change', {
        target: {
          checked: false,
        },
      });
    expect(checked).toEqual([options[1]]);
    wrapper.setProps({ value: checked });
    expect(
      wrapper
        .find('.arco-checkbox')
        .at(0)
        .hasClass('arco-checkbox-checked')
    ).toBe(false);
    expect(
      wrapper
        .find('.arco-checkbox')
        .at(1)
        .hasClass('arco-checkbox-checked')
    ).toBe(true);
  });

  it('value is undefined', () => {
    const wrapper = mount(
      <Checkbox.Group options={options} value={undefined}>
        Checkbox
      </Checkbox.Group>
    );

    expect(wrapper.find('.arco-checkbox-checked')).toHaveLength(0);

    wrapper.setProps({ value: [options[0]] });
    expect(wrapper.find('.arco-checkbox-checked')).toHaveLength(1);
    wrapper.setProps({ value: undefined });
    expect(wrapper.find('.arco-checkbox-checked')).toHaveLength(0);
  });
});

describe('checkbox group children', () => {
  let checked = ['Option 1'];
  const wrapper = mount(
    <Checkbox.Group
      value={checked}
      onChange={(v) => {
        checked = v;
      }}
    >
      <Row>
        <Col span={8} style={{ marginBottom: 12 }}>
          <Checkbox value="Option 1">Option 1</Checkbox>
        </Col>
        <Col span={8} style={{ marginBottom: 12 }}>
          <Checkbox disabled value="Option 2">
            {' '}
            Option 2{' '}
          </Checkbox>
        </Col>
        <Col span={8} style={{ marginBottom: 12 }}>
          <Checkbox value="Option 3">Option 3</Checkbox>
        </Col>
        <Col span={8}>
          <Checkbox value="Option 4">Option 4</Checkbox>
        </Col>
        <Col span={8}>
          <Checkbox value="Option 5">Option 5</Checkbox>
        </Col>
      </Row>
    </Checkbox.Group>
  );

  expect(
    wrapper
      .find('.arco-checkbox')
      .at(0)
      .hasClass('arco-checkbox-checked')
  ).toBe(true);

  wrapper
    .find('.arco-checkbox > input')
    .at(1)
    .simulate('change', {
      target: {
        checked: true,
      },
    });

  expect(checked).toEqual(['Option 1', 'Option 2']);
  wrapper.setProps({ value: checked });
  expect(
    wrapper
      .find('.arco-checkbox')
      .at(1)
      .hasClass('arco-checkbox-checked')
  ).toBe(true);

  wrapper
    .find('.arco-checkbox > input')
    .at(0)
    .simulate('change', {
      target: {
        checked: false,
      },
    });
  expect(checked).toEqual(['Option 2']);
  wrapper.setProps({ value: checked });

  expect(
    wrapper
      .find('.arco-checkbox')
      .at(0)
      .hasClass('arco-checkbox-checked')
  ).toBe(false);
  expect(
    wrapper
      .find('.arco-checkbox')
      .at(1)
      .hasClass('arco-checkbox-checked')
  ).toBe(true);

  expect(wrapper.find('.arco-checkbox-checked')).toHaveLength(1);
});
