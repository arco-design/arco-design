import React from 'react';
import mountTest from '../../../tests/mountTest';
import componentConfigTest from '../../../tests/componentConfigTest';
import Pagination from '..';
import { render, fireEvent } from '../../../tests/util';
import { Enter } from '../../_util/keycode';

mountTest(Pagination);
componentConfigTest(Pagination, 'Pagination');

const changePageSize = (component, index: number) => {
  const pageSizeChanger = component.find('.arco-select-single')[0];
  fireEvent.click(pageSizeChanger);
  const pageSizeChangeOptions = document.getElementsByClassName('arco-select-option');
  if (index < 0) {
    fireEvent.click(pageSizeChangeOptions[pageSizeChangeOptions.length + index]);
  } else {
    fireEvent.click(pageSizeChangeOptions[index]);
  }
};

describe('Pagination', () => {
  it('pagination should be update correctly', () => {
    const component = render(<Pagination total={100} />);
    const liList = component.find<HTMLLIElement>('.arco-pagination-item');
    expect(liList.item(liList.length - 2).innerHTML).toBe('10');
  });

  it('pagination should be unmount correctly', () => {
    const component = render(<Pagination />);
    expect(() => {
      component.unmount();
    }).not.toThrow();
  });

  it('pagination should jump correctly pages', () => {
    const component = render(<Pagination total={200} showJumper />);
    expect(component.find('.arco-pagination-item-active').item(0).innerHTML).toBe('1');
    const PageJumperInput = component.querySelector<HTMLInputElement>(
      '.arco-pagination-jumper-input'
    );
    fireEvent.change(PageJumperInput!, { target: { value: 30 } });
    fireEvent.keyDown(PageJumperInput!, { keyCode: Enter.code });
    expect(component.querySelector('.arco-pagination-item-active')!.innerHTML).toBe('20');
  });

  it('should change pageSize correctly', () => {
    const component = render(<Pagination total={200} showTotal sizeCanChange />);
    component.rerender(<Pagination total={200} showTotal sizeCanChange pageSize={30} />);
    expect(component.find('.arco-pagination-item')).toHaveLength(Math.ceil(200 / 30) + 2);
    component.rerender(<Pagination total={0} showTotal sizeCanChange pageSize={10} />);
    component.rerender(<Pagination total={0} showTotal sizeCanChange pageSize={30} />);
    expect(component.find('.arco-pagination-item')).toHaveLength(2);
    expect(component.find('.arco-pagination-item-disabled')).toHaveLength(2);
  });

  it('trigger onPageSizeChange correctly', () => {
    const mockPageSizeChange = jest.fn();
    const mockChange = jest.fn();
    const component = render(
      <Pagination
        total={200}
        onChange={mockChange}
        onPageSizeChange={mockPageSizeChange}
        sizeCanChange
        sizeOptions={[10, 20, 50]}
        pageSizeChangeResetCurrent={false}
      />
    );
    changePageSize(component, -1);
    expect(mockChange.mock.calls[0]).toEqual([1, 50]);
    expect(mockPageSizeChange.mock.calls[0]).toEqual([50, 1]);
  });

  it('should pageSizeChangeResetCurrent work', () => {
    const component = render(
      <Pagination total={200} sizeCanChange sizeOptions={[10, 20, 50]} pageSizeChangeResetCurrent />
    );
    const changeCurrentPageItems: Array<HTMLLIElement> = Array.apply(
      null,
      component.find('.arco-pagination-item')
    );
    changeCurrentPageItems.pop();
    changeCurrentPageItems.shift();
    fireEvent.click(changeCurrentPageItems[2]);
    expect(component.find('.arco-pagination-item-active')[0].innerHTML).toBe('3');
    changePageSize(component, 1);
    expect(component.find('.arco-pagination-item-active')[0].innerHTML).toBe('1');
  });

  it('fold page correctly when set bufferSize', () => {
    const component = render(<Pagination total={100} current={5} bufferSize={1} />);
    expect(component.find('.arco-pagination-item-jumper')).toHaveLength(2);
    // < + begin + ...  + bufferSize + current + bufferSize + ... + end + > = 9
    expect(component.find('.arco-pagination-item')).toHaveLength(9);

    component.rerender(<Pagination total={100} current={2} bufferSize={1} />);
    expect(component.find('.arco-pagination-item-jumper')).toHaveLength(1);
  });

  it('show jumper correctly in simple mode', () => {
    const component = render(<Pagination simple total={100} current={5} />);
    expect(component.find<HTMLInputElement>('.arco-pagination-jumper-input')[0].value).toEqual('5');
    component.rerender(<Pagination simple total={100} current={5} showJumper={false} />);
    expect(component.find('.arco-pagination-jumper-input')).toHaveLength(0);
  });
});
