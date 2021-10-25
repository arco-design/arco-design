import React from 'react';
import { mount } from 'enzyme';

// 此处Component的类型存在疑问，待完善
export default function mountTest(Component: React.ComponentType<any> | React.ComponentType) {
  describe(`mount and unmount`, () => {
    it(`component could be updated and unmounted without errors`, () => {
      const wrapper = mount(<Component />);
      expect(() => {
        wrapper.setProps({});
        wrapper.unmount();
      }).not.toThrow();
    });
  });
}
