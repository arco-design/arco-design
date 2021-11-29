import React from 'react';
import { mount } from 'enzyme';
import mountTest from '../../../tests/mountTest';
import componentConfigTest from '../../../tests/componentConfigTest';
import Layout from '..';

const { Sider, Content, Footer, Header } = Layout;

mountTest(Layout);
componentConfigTest(Layout, 'Layout');

describe('Layout', () => {
  it('detect the sider as children', async () => {
    const wrapper = mount(
      <Layout>
        <Sider>Sider</Sider>
        <Content>Content</Content>
      </Layout>
    );
    expect(wrapper.find('.arco-layout').hasClass('arco-layout-has-sider')).toBe(true);
  });

  it('detect the sider-light when set light theme', async () => {
    const wrapper = mount(
      <Layout>
        <Sider theme="light">Sider</Sider>
        <Content>Content</Content>
      </Layout>
    );
    expect(wrapper.find('.arco-layout-sider').hasClass('arco-layout-sider-light')).toBe(true);
  });

  it('detect the sider width 50%', async () => {
    const wrapper = mount(
      <Layout style={{ height: '400px' }}>
        <Header>Header</Header>
        <Layout>
          <Sider style={{ width: '50%' }}>Sider</Sider>
          <Content>Content</Content>
        </Layout>
        <Footer>Footer</Footer>
      </Layout>
    );
    expect(wrapper.find('.arco-layout-sider').at(0).prop('style').width).toBe('50%');
  });
});
