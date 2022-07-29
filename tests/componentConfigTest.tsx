import React from 'react';
import { render } from 'enzyme';
import ConfigProvider from '../components/ConfigProvider';

// make sure ConfigProvider componentConfig work correctly
export default function componentConfigTest(Component, componentName: string, componentProps = {}) {
  describe(`ConfigProvider componentConfig.${componentName}`, () => {
    it(`default`, () => {
      const component = render(<Component {...componentProps} />);
      expect(component).toMatchSnapshot();
    });

    it(`set className globally`, () => {
      const component = render(
        <ConfigProvider
          componentConfig={{ [componentName]: { className: 'global-default-class' } }}
        >
          <Component {...componentProps} />
        </ConfigProvider>
      );
      expect(component).toMatchSnapshot();
    });

    it(`set className globally and component set className itself.`, () => {
      const component = render(
        <ConfigProvider
          componentConfig={{ [componentName]: { className: 'global-default-class' } }}
        >
          <Component {...componentProps} className="component-class" />
        </ConfigProvider>
      );
      expect(component).toMatchSnapshot();
    });

    it(`set data-* property`, () => {
      const component = render(<Component data-test-name={componentName} />);
      expect(component).toMatchSnapshot();
    });
  });
}
