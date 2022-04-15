import React from 'react';
import { mount } from 'enzyme';
import { act } from 'react-test-renderer';
import { Enter } from '../../_util/keycode';
import mountTest from '../../../tests/mountTest';
import componentConfigTest from '../../../tests/componentConfigTest';
import Pagination from '..';
import { PaginationProps, PaginationState } from '../pagination';

mountTest(Pagination);
componentConfigTest(Pagination, 'Pagination');

function mountPagination(component: React.ReactElement) {
  return mount<React.Component, React.PropsWithChildren<PaginationProps>, PaginationState>(
    component
  );
}

describe('Pagination', () => {
  it('pagination should be update correctly', () => {
    const wrapper = mountPagination(<Pagination />);
    act(() => {
      wrapper.setProps({
        total: 100,
      });
      wrapper.update();
    });
    expect(wrapper.find('.arco-pagination-list').childAt(0).prop('allPages')).toBe(10);
  });

  it('pagination should be unmount correctly', () => {
    const wrapper = mountPagination(<Pagination />);
    expect(() => {
      wrapper.unmount();
    }).not.toThrow();
  });

  it('pagination should jump correctly pages', () => {
    const wrapper = mountPagination(<Pagination total={200} showJumper />);
    expect(wrapper.find('.arco-pagination-item-active').text()).toBe('1');
    wrapper
      .find('PageJumper')
      .find('Input')
      .simulate('change', { target: { value: 30 } });
    wrapper.find('PageJumper').find('Input').simulate('keyDown', { keyCode: Enter.code });
    expect(wrapper.find('.arco-pagination-item-active').text()).toBe('20');
  });

  it('should change pageSize correctly', () => {
    const wrapper = mountPagination(<Pagination total={200} showTotal sizeCanChange />);
    wrapper.setProps({ pageSize: 30 });
    expect(wrapper.find('.arco-pagination-item')).toHaveLength(Math.ceil(200 / 30) + 2);
    wrapper.setProps({
      total: 0,
      pageSize: 10,
    });
    wrapper.setProps({ pageSize: 30 });
    expect(wrapper.find('.arco-pagination-item')).toHaveLength(2);
    expect(wrapper.find('.arco-pagination-item-disabled')).toHaveLength(2);
  });

  it('trigger onPageSizeChange correctly', () => {
    const mockPageSizeChange = jest.fn();
    const mockChange = jest.fn();
    const wrapper = mountPagination(
      <Pagination
        total={200}
        onChange={mockChange}
        onPageSizeChange={mockPageSizeChange}
        sizeCanChange
        sizeOptions={[10, 20, 50]}
        pageSizeChangeResetCurrent={false}
      />
    );
    wrapper.find('Pager').last().simulate('click');
    expect(mockChange.mock.calls[0]).toEqual([200 / 10, 10]);

    wrapper.find('PageOption').find('Select').simulate('click');
    wrapper.find('PageOption').find('.arco-select-option').last().simulate('click');
    expect(mockChange.mock.calls[1]).toEqual([200 / 50, 50]);
    expect(mockPageSizeChange.mock.calls[0]).toEqual([50, 200 / 50]);

    wrapper.setProps({
      pageSizeChangeResetCurrent: true,
    });

    wrapper.find('PageOption').find('Select').simulate('click');
    wrapper.find('PageOption').find('.arco-select-option').first().simulate('click');
    expect(mockChange.mock.calls[2]).toEqual([1, 10]);
    expect(mockPageSizeChange.mock.calls[1]).toEqual([10, 1]);
  });

  it('fold page correctly when set bufferSize', () => {
    const wrapper = mountPagination(<Pagination total={100} current={5} bufferSize={1} />);
    expect(wrapper.find('.arco-pagination-item-jumper')).toHaveLength(2);
    // < + begin + ...  + bufferSize + current + bufferSize + ... + end + > = 9
    expect(wrapper.find('.arco-pagination-item')).toHaveLength(9);

    wrapper.setProps({ current: 2 });
    wrapper.update();
    expect(wrapper.find('.arco-pagination-item-jumper')).toHaveLength(1);
  });
});
