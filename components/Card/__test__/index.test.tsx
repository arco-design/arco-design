import React from 'react';
import { cleanup, render } from '../../../tests/util';
import mountTest from '../../../tests/mountTest';
import componentConfigTest from '../../../tests/componentConfigTest';
import Card from '..';
import Avatar from '../../Avatar';

const { Meta } = Card;

mountTest(Card);
componentConfigTest(Card, 'Card');

function mountCard(component: React.ReactElement) {
  return render(component);
}

function createCard() {
  return (
    <Card title="Default Card">
      <p>Content</p>
      <p>Content</p>
      <p>Content</p>
    </Card>
  );
}

function createMeta() {
  return (
    <Card>
      <Meta
        avatar={<Avatar style={{ marginRight: 20, backgroundColor: '#5babf3' }}>Docor</Avatar>}
        title="Docor"
        description="This is Docor"
      />
    </Card>
  );
}

describe('Card', () => {
  afterEach(() => {
    cleanup();
    document.body.innerHTML = '';
  });

  it('Card display correctly', () => {
    const wrapper = mountCard(createCard());
    expect(wrapper.querySelector('.arco-card-header-title').textContent).toBe('Default Card');
  });

  it('Meta display correctly', () => {
    const wrapper = mountCard(createMeta());
    expect(wrapper.querySelector('.arco-card-meta-title').textContent).toBe('Docor');
  });
});
