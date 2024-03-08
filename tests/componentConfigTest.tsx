import React from 'react';
import { render } from './util';
import ConfigProvider from '../components/ConfigProvider';

const getNodeList = (baseElement) => {
  const nodeList = Array.prototype.slice.call(baseElement.children);

  return nodeList.length > 1 ? nodeList : nodeList[0];
};

// make sure ConfigProvider componentConfig work correctly
export default function componentConfigTest(Component, componentName: string, componentProps = {}) {
  describe(`ConfigProvider componentConfig.${componentName}`, () => {
    it(`default`, () => {
      const { asFragment } = render(<Component {...componentProps} />);
      expect(getNodeList(asFragment())).toMatchSnapshot();
    });

    it(`set className globally`, () => {
      const { asFragment } = render(
        <ConfigProvider
          componentConfig={{ [componentName]: { className: 'global-default-class' } }}
        >
          <Component {...componentProps} />
        </ConfigProvider>
      );
      expect(getNodeList(asFragment())).toMatchSnapshot();
    });

    it(`set className globally and component set className itself.`, () => {
      const { asFragment } = render(
        <ConfigProvider
          componentConfig={{ [componentName]: { className: 'global-default-class' } }}
        >
          <Component {...componentProps} className="component-class" />
        </ConfigProvider>
      );
      expect(getNodeList(asFragment())).toMatchSnapshot();
    });

    it(`set data-* property`, () => {
      const { asFragment } = render(<Component data-test-name={componentName} />);
      expect(getNodeList(asFragment())).toMatchSnapshot();
    });
  });
}
