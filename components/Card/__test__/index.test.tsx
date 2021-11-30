import React from 'react';
import { mount } from 'enzyme';
import mountTest from '../../../tests/mountTest';
import componentConfigTest from '../../../tests/componentConfigTest';
import Card from '..';
import Avatar from '../../Avatar';

const { Meta } = Card;

mountTest(Card);
componentConfigTest(Card, 'Card');

function mountCard(component: React.ReactElement) {
  return mount(component);
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
    document.body.innerHTML = '';
  });

  it('Card display correctly', () => {
    const wrapper = mountCard(createCard());
    expect(wrapper.props().title).toBe('Default Card');
  });

  it('Meta display correctly', () => {
    const wrapper = mountCard(createMeta());
    expect(wrapper.find('.arco-card-meta-title').at(0).text()).toBe('Docor');
  });
});
