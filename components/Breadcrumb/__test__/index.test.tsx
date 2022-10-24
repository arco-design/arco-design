import React from 'react';
import { act } from 'react-test-renderer';
import { fireEvent, render } from '../../../tests/util';
import mountTest from '../../../tests/mountTest';
import componentConfigTest from '../../../tests/componentConfigTest';
import Breadcrumb from '..';
import { DropdownProps } from '../../Dropdown';
import Button from '../../Button';

const BreadcrumbItem = Breadcrumb.Item;

mountTest(Breadcrumb);
componentConfigTest(Breadcrumb, 'Breadcrumb');

describe('Breadcrumb', () => {
  it('breadcrumb separator correctly', () => {
    const wrapper = render(
      <Breadcrumb separator="=>">
        <BreadcrumbItem>Home</BreadcrumbItem>
        <BreadcrumbItem>Article</BreadcrumbItem>
        <BreadcrumbItem>Technology</BreadcrumbItem>
      </Breadcrumb>
    );
    expect(wrapper.find('.arco-breadcrumb-item-separator').item(0).innerHTML).toBe('=&gt;');
  });

  it('breadcrumb render empty children correctly', () => {
    const wrapper = render(<Breadcrumb />);
    expect(wrapper.find('.arco-breadcrumb')).toHaveLength(1);
    expect(wrapper.find('.arco-breadcrumb-item')).toHaveLength(0);
  });

  it('supprt droplist correctly', () => {
    const arr = new Array(3).fill(1);
    const dropdownProps: DropdownProps = { trigger: 'click', position: 'bl' };
    const wrapper = render(
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
    expect(wrapper.find('.arco-breadcrumb-item-with-dropdown')).toHaveLength(1);
    fireEvent.click(wrapper.getAllByRole('listitem')[1]);
    expect(wrapper.find('.arco-dropdown')).toHaveLength(1);
    expect(wrapper.find('.arco-dropdown')[0].className).toContain('arco-trigger-position-bl');
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

    const wrapper = render(<Breadcrumb routes={routes} />);
    expect(wrapper.find('.arco-breadcrumb-item-with-dropdown')).toHaveLength(3);
    expect(wrapper.find('.arco-breadcrumb-item a').item(2).innerHTML).toEqual(`name-2`);

    expect(wrapper.find<HTMLAnchorElement>('.arco-breadcrumb-item a').item(2).hash).toEqual(
      '#/0/1/2'
    );
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

    render(<Breadcrumb routes={routes} itemRender={mockItemRender} />);
    const allLength = 5 + 3 * 3;
    expect(mockItemRender).toHaveBeenCalledTimes(allLength);
  });

  it('support maxCount correctly', () => {
    const routes = new Array(10).fill(1).map((_, index) => ({
      path: `/${index}`,
      breadcrumbName: `name-${index}`,
    }));

    let maxCount = 3;
    const wrapper = render(<Breadcrumb maxCount={maxCount} routes={routes} />);
    expect(wrapper.find('.arco-breadcrumb-item')).toHaveLength(3);
    expect(wrapper.find('.arco-breadcrumb-item-ellipses')).toHaveLength(1);

    maxCount = 5;
    const delta = routes.length - maxCount;
    wrapper.rerender(<Breadcrumb maxCount={maxCount} routes={routes} />);
    expect(wrapper.find('.arco-breadcrumb-item')).toHaveLength(5);
    expect(
      (wrapper.find('.arco-breadcrumb-item').item(3).firstChild! as HTMLAnchorElement).innerHTML
    ).toEqual(`name-${delta + 3}`);
  });

  it('support href correctly', () => {
    const wrapper = render(
      <Breadcrumb separator="=>">
        <BreadcrumbItem href="https://arco.design">Home</BreadcrumbItem>
        <BreadcrumbItem>Article</BreadcrumbItem>
        <BreadcrumbItem>Technology</BreadcrumbItem>
      </Breadcrumb>
    );
    expect(wrapper.find("a[href='https://arco.design']")).toHaveLength(1);
  });

  it('support custom Tag correctly', () => {
    const mockClick = jest.fn();
    const wrapper = render(
      <Breadcrumb separator="=>">
        <BreadcrumbItem onClick={mockClick} tagName={Button}>
          Home
        </BreadcrumbItem>
        <BreadcrumbItem>Article</BreadcrumbItem>
        <BreadcrumbItem>Technology</BreadcrumbItem>
      </Breadcrumb>
    );

    expect(wrapper.find('.arco-btn')).toHaveLength(1);
    act(() => {
      fireEvent.click(wrapper.find('.arco-btn')[0]);
    });
    expect(mockClick).toHaveBeenCalledTimes(1);
  });
});
