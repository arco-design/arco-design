import path from 'path';
import glob from 'glob';
import { render } from './util';
import './mockDate';
import ReactDOM from 'react-dom';
import React from 'react';

const getNodeList = (baseElement) => {
  const nodeList = Array.prototype.slice.call(baseElement.children);

  return nodeList.length > 1 ? nodeList : nodeList[0];
};

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

      console.log(Demo, '_____');

      const { asFragment } = render(React.createElement(Demo));
      expect(getNodeList(asFragment())).toMatchSnapshot();
    });
  });
}

export default demoTest;
