import React from 'react';
import { cleanup, fireEvent, render, screen } from '../../../tests/util';
import mountTest from '../../../tests/mountTest';
import componentConfigTest from '../../../tests/componentConfigTest';
import Switch from '..';
import Popconfirm from '../../Popconfirm';
import IconCheck from '../../../icon/react-icon/IconCheck';
import IconClose from '../../../icon/react-icon/IconClose';

mountTest(Switch);
componentConfigTest(Switch, 'Switch');

describe('Switch', () => {
  it('onChange listener correctly', () => {
    const onChange = jest.fn();
    const component = render(<Switch defaultChecked onChange={onChange} />);

    expect(component.find('.arco-switch')[0].className).toContain('arco-switch-checked');
    fireEvent.click(component.container.firstChild!);

    expect(component.find('.arco-switch')[0].className).not.toContain('arco-switch-checked');
    expect(onChange.mock.calls[0][0]).toBe(false);
  });

  it('different size correctly', () => {
    const component = render(<Switch size="small" defaultChecked />);

    expect(component.find('.arco-switch')[0].className).toContain('arco-switch-small');
  });

  it('different type correctly', () => {
    const component = render(<Switch type="round" defaultChecked />);
    expect(component.find('.arco-switch')[0].className).toContain('arco-switch-type-round');
    cleanup();
    const component2 = render(<Switch type="line" defaultChecked />);
    expect(component2.find('.arco-switch')[0].className).toContain('arco-switch-type-line');
  });

  it('checked and unchecked correctly', () => {
    const component = render(<Switch defaultChecked checkedText="ON" uncheckedText="OFF" />);
    expect(component.find('.arco-switch')[0].className).toContain('arco-switch-checked');

    fireEvent.click(component.container.firstChild!);

    expect(component.find('.arco-switch')[0].className).not.toContain('arco-switch-checked');
  });

  it('loading', () => {
    const component = render(<Switch defaultChecked loading />);
    expect(component.find('.arco-switch')[0].className).toContain('arco-switch-checked');
    expect(
      component
        .find<SVGElement>('.arco-switch-dot .arco-switch-dot-icon svg')[0]
        .classList.contains('arco-icon-loading')
    ).toBe(true);

    fireEvent.click(component.container.firstChild!);

    expect(component.find('.arco-switch')[0].className).toContain('arco-switch-checked');
  });

  it('dot icon', () => {
    jest.useFakeTimers();
    const component = render(<Switch checkedIcon={<IconCheck />} uncheckedIcon={<IconClose />} />);

    expect(
      component
        .find<SVGElement>('.arco-switch-dot .arco-switch-dot-icon svg')[0]
        .classList.contains('arco-icon-close')
    ).toBe(true);

    fireEvent.click(screen.getByRole('switch'));
    jest.runAllTimers();
    expect(
      component
        .find<SVGElement>('.arco-switch-dot .arco-switch-dot-icon svg')[0]
        .classList.contains('arco-icon-check')
    ).toBe(true);
  });

  it('showTriger ', () => {
    const component = render(
      <Popconfirm title="xxx">
        <Switch />
      </Popconfirm>
    );

    fireEvent.click(component.container.firstChild!);

    expect(component.find('.arco-popconfirm')).toHaveLength(1);
  });
});
