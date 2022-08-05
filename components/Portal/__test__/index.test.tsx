import React from 'react';
import Portal from '..';
import { $, render } from '../../../tests/util';

describe('Portal', () => {
  beforeEach(() => {
    const root = document.createElement('div');
    root.id = 'root';
    document.body.appendChild(root);
  });

  it('test default getContainer', () => {
    const wrapper = render(
      <div className="root">
        <Portal forceRender>
          <div className="content">render to document.body</div>
        </Portal>
      </div>
    );
    expect(wrapper.find('.root > .content').length).toBe(0);
    expect($('body > .content').length).toBe(1);
    wrapper.unmount();
  });

  it('test getContainer', () => {
    const wrapper = render(
      <div className="root">
        <Portal forceRender getContainer={() => document.getElementById('root')}>
          <div className="content">render to #container</div>
        </Portal>
      </div>
    );
    expect(wrapper.find('.root > .content').length).toBe(0);
    expect($('#root > .content').length).toBe(1);
  });
});
