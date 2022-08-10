import React from 'react';
import { render } from '@testing-library/react';

// 此处Component的类型存在疑问，待完善
export default function mountTest(Component: React.ComponentType<any> | React.ComponentType) {
  describe(`mount and unmount`, () => {
    it(`component could be updated and unmounted without errors`, () => {
      const wrapper = render(<Component />);
      expect(() => {
        wrapper.rerender(<Component />);
        wrapper.unmount();
      }).not.toThrow();
    });
  });
}
