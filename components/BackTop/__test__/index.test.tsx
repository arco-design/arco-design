import React from 'react';
import { mount } from 'enzyme';
import mountTest from '../../../tests/mountTest';
import componentConfigTest from '../../../tests/componentConfigTest';
import { sleep } from '../../../tests/util';
import BackTop, { BackTopProps } from '..';

mountTest(BackTop);
componentConfigTest(BackTop, 'BackTop');

function mountBackTop(component: React.ReactElement) {
  return mount<typeof BackTop, React.PropsWithChildren<BackTopProps>>(component);
}

describe('BackTop', () => {
  it('click button scroll to top', async () => {
    const onClick = jest.fn();

    const window = {
      scrollTop: 400,
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
    };

    const component = mountBackTop(<BackTop onClick={onClick} target={() => window as any} />);

    component.find('.arco-backtop').simulate('click');
    await sleep(500);
    expect(window.scrollTop).toBe(0);
    expect(onClick).toHaveBeenCalled();
    component.unmount();
    expect(window.removeEventListener).toHaveBeenCalled();
  });
});
