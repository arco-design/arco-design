import path from 'path';
import glob from 'glob';
import { render } from 'enzyme';
import './mockDate';
import ReactDOM from 'react-dom';
import React from 'react';

beforeAll(() => {
  ReactDOM.createPortal = jest.fn(() => {
    return null;
  }) as typeof ReactDOM.createPortal;
});

afterAll(() => {
  (ReactDOM.createPortal as any).mockClear();
});

function demoTest(component: string) {
  const files = glob.sync(path.resolve(__dirname, `../components/${component}/__demo__/*.md`));

  files.forEach((file) => {
    const splits = file.split('/');
    const length = splits.length;
    const fileName = splits[length - 1];
    it(`renders ${component}/demo/${fileName} correctly`, () => {
      const Demo = require(file).default;
      const wrapper = render(React.createElement(Demo));
      expect(wrapper).toMatchSnapshot();
    });
  });
}

export default demoTest;
