import React from 'react';
import { mount } from 'enzyme';
import IconEdit from '../../../icon/react-icon/IconEdit';
import mountTest from '../../../tests/mountTest';
import componentConfigTest from '../../../tests/componentConfigTest';
import Layout from '..';

const { Sider, Content, Footer, Header } = Layout;

mountTest(Layout);
componentConfigTest(Layout, 'Layout');

describe('Layout', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

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

  it('sider with controlled', async () => {
    const wrapper = mount(
      <Sider width={200} collapsed collapsedWidth={60} collapsible>
        Sider
      </Sider>
    );

    expect(wrapper.find('.arco-layout-sider').at(0).prop('style').width).toEqual("60px");
    wrapper.setProps({
      collapsed: false,
      width: 300,
    });
    jest.advanceTimersByTime(1000);
    wrapper.update();
    expect(wrapper.find('.arco-layout-sider').at(0).prop('style').width).toEqual("300px");
  });

  it('has Resize Sider', () => {
    const wrapper = mount(
      <Sider
        width={200}
        resizeBoxProps={{
          directions: ['right'],
          resizeIcons: {
            right: <IconEdit />,
          },
        }}
      />
    );
    expect(wrapper.find('.arco-resizebox')).toHaveLength(1);
    expect(wrapper.find('IconEdit')).toHaveLength(1);
  });
});
