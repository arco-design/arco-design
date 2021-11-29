import React from 'react';
import { mount } from 'enzyme';
import mountTest from '../../../tests/mountTest';
import componentConfigTest from '../../../tests/componentConfigTest';
import Breadcrumb from '..';
import { DropdownProps } from '../../Dropdown';

const BreadcrumbItem = Breadcrumb.Item;

mountTest(Breadcrumb);
componentConfigTest(Breadcrumb, 'Breadcrumb');

describe('Breadcrumb', () => {
  it('breadcrumb separator correctly', () => {
    const wrapper = mount(
      <Breadcrumb separator="=>">
        <BreadcrumbItem>Home</BreadcrumbItem>
        <BreadcrumbItem>Article</BreadcrumbItem>
        <BreadcrumbItem>Technology</BreadcrumbItem>
      </Breadcrumb>
    );
    expect(wrapper.find('.arco-breadcrumb-item-separator').at(0).text()).toBe('=>');
  });

  it('breadcrumb render empty children correctly', () => {
    const wrapper = mount(<Breadcrumb />);
    expect(wrapper.find('.arco-breadcrumb')).toHaveLength(1);
    expect(wrapper.find('.arco-breadcrumb-item')).toHaveLength(0);
  });

  it('supprt droplist correctly', () => {
    const arr = new Array(3).fill(1);
    const dropdownProps: DropdownProps = { trigger: 'click', position: 'bl' };
    const wrapper = mount(
      <Breadcrumb>
        {arr.map((_, index) => {
          if (index === 1) {
            return (
              <BreadcrumbItem
                droplist={<div>droplist-{index}</div>}
                key={index}
                dropdownProps={dropdownProps}
              >
                {index}
              </BreadcrumbItem>
            );
          }
          return <BreadcrumbItem key={index}>{index}</BreadcrumbItem>;
        })}
      </Breadcrumb>
    );
    expect(wrapper.find('IconDown')).toHaveLength(1);

    const DropdownElemProps = wrapper.find('Dropdown').props();
    Object.keys(dropdownProps).forEach((key) => {
      expect(DropdownElemProps[key]).toEqual(dropdownProps[key]);
    });
  });

  it('support routes correctly', () => {
    const routes = new Array(5).fill(1).map((_, index) => {
      if (index % 2 === 0) {
        return {
          path: `/${index}`,
          breadcrumbName: `name-${index}`,
          children: new Array(3).fill(2).map((_, index) => ({
            path: `/${index}`,
            breadcrumbName: `children-${index}`,
          })),
        };
      }
      return {
        path: `/${index}`,
        breadcrumbName: `name-${index}`,
      };
    });

    const wrapper = mount(<Breadcrumb routes={routes} />);
    expect(wrapper.find('Dropdown')).toHaveLength(3);
    expect(wrapper.find('.arco-breadcrumb-item a').at(2).text()).toEqual(`name-2`);

    expect(wrapper.find('.arco-breadcrumb-item a').at(2).prop('href')).toEqual('#/0/1/2');
  });

  it('support itemrender correctly', () => {
    const mockItemRender = jest.fn();
    const routes = new Array(5).fill(1).map((_, index) => {
      if (index % 2 === 0) {
        return {
          path: `/${index}`,
          breadcrumbName: `name-${index}`,
          children: new Array(3).fill(2).map((_, index) => ({
            path: `/${index}`,
            breadcrumbName: `children-${index}`,
          })),
        };
      }
      return {
        path: `/${index}`,
        breadcrumbName: `name-${index}`,
      };
    });

    mount(<Breadcrumb routes={routes} itemRender={mockItemRender} />);
    const allLength = 5 + 3 * 3;
    expect(mockItemRender).toHaveBeenCalledTimes(allLength);
  });

  it('support maxCount correctly', () => {
    const routes = new Array(10).fill(1).map((_, index) => ({
      path: `/${index}`,
      breadcrumbName: `name-${index}`,
    }));

    let maxCount = 3;
    const wrapper = mount(<Breadcrumb maxCount={maxCount} routes={routes} />);
    expect(wrapper.find('.arco-breadcrumb-item')).toHaveLength(3);
    expect(wrapper.find('.arco-breadcrumb-item-ellipses')).toHaveLength(1);

    maxCount = 5;
    const delta = routes.length - maxCount;
    wrapper.setProps({ maxCount });
    expect(wrapper.find('.arco-breadcrumb-item')).toHaveLength(5);
    expect(wrapper.find('.arco-breadcrumb-item').at(3).text()).toEqual(`name-${delta + 3}`);
  });
});
