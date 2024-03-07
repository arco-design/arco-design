import path from 'path';
import glob from 'glob';
import './mockDate';
import ReactDOM from 'react-dom';
import React from 'react';
import { render } from './util';

const getNodeList = (baseElement) => {
  const nodeList = Array.prototype.slice.call(baseElement.children);

  return nodeList.length > 1 ? nodeList : nodeList[0];
};

let _originFetch;

beforeAll(() => {
  if (typeof window !== 'undefined') {
    _originFetch = window.fetch;
    window.fetch = jest.fn().mockImplementation(() =>
      Promise.resolve({
        ok: true,
        json: () => {},
      })
    );
  }

  ReactDOM.createPortal = jest.fn(() => {
    return null;
  }) as typeof ReactDOM.createPortal;
});

afterAll(() => {
  (ReactDOM.createPortal as any).mockClear();

  if (typeof window !== 'undefined' && _originFetch) {
    window.fetch = _originFetch;
  }
});

function demoTest(component: string) {
  const files = glob.sync(path.resolve(__dirname, `../components/${component}/__demo__/*.md`));

  files.forEach((file) => {
    const splits = file.split('/');
    const length = splits.length;
    const fileName = splits[length - 1];
    it(`renders ${component}/demo/${fileName} correctly`, () => {
      const Demo = require(file).default;

      const { asFragment } = render(React.createElement(Demo));
      expect(getNodeList(asFragment())).toMatchSnapshot();
    });
  });
}

export default demoTest;
