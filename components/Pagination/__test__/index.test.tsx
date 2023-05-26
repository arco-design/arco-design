import React, { useState } from 'react';
import { act } from 'react-test-renderer';
import mountTest from '../../../tests/mountTest';
import componentConfigTest from '../../../tests/componentConfigTest';
import Pagination from '..';
import { render, fireEvent, sleep } from '../../../tests/util';
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

  it('sizeOptions changed correctly', () => {
    const total = 202;
    const defaultCurrent = 5;
    const sizeOptions1 = [12, 24, 36, 48];
    const sizeOptions2 = [16, 32, 48, 72];
    const Demo = () => {
      const [bol, setBol] = useState(true);
      function changeSize() {
        setBol(!bol);
      }
      return (
        <div>
          <button onClick={changeSize} className="btn-trigger">
            change
          </button>
          <Pagination
            defaultCurrent={defaultCurrent}
            total={total}
            sizeCanChange
            sizeOptions={bol ? sizeOptions1 : sizeOptions2}
            pageSizeChangeResetCurrent={bol}
          />
        </div>
      );
    };
    const component = render(<Demo />);
    const lastPageOptionIndex = component.find('.arco-pagination-item').length - 2;
    expect(component.find('.arco-pagination-item')[lastPageOptionIndex].innerHTML).toEqual(
      `${Math.ceil(total / sizeOptions1[0])}`
    );
    act(async () => {
      fireEvent.click(component.find('.arco-select')[0]);
      await sleep(1000);
    });

    act(() => {
      fireEvent.click(component.find('.arco-select-option')[2]);
    });

    const totalLength = Math.ceil(total / sizeOptions1[2]) + 2;
    expect(component.find('.arco-pagination-item').length).toEqual(totalLength);
    expect(component.find('.arco-pagination-item-active')[0].innerHTML).toEqual('1');

    act(() => {
      fireEvent.click(component.find('.btn-trigger')[0]);
      fireEvent.click(component.find('.arco-pagination-item')[totalLength - 3]);
    });

    const currentActive = component.find('.arco-pagination-item-active')[0].innerHTML;
    expect(
      component.find('.arco-select-view-value')[0].innerHTML.startsWith(sizeOptions2[0].toString())
    ).toBe(true);

    act(async () => {
      fireEvent.click(component.find('.arco-select')[0]);
      await sleep(1000);
    });

    act(() => {
      fireEvent.click(component.find('.arco-select-option')[1]);
    });
    expect(component.find('.arco-pagination-item-active')[0].innerHTML).toEqual(currentActive);

    act(() => {
      fireEvent.click(component.find('.arco-select-option')[3]);
    });
    expect(component.find('.arco-pagination-item-active')[0].innerHTML).toEqual(
      `${Math.ceil(total / sizeOptions2[3])}`
    );
  });

  it('sizeOptions changed correctly on defaultPageSize', () => {
    const total = 202;
    const defaultPageSize = 20;
    const sizeOptions1 = [12, 24, 36, 48];
    const sizeOptions2 = [24, 36, 48, 72];
    const Demo = () => {
      const [bol, setBol] = useState(true);
      function changeSize() {
        setBol(!bol);
      }
      return (
        <div>
          <button onClick={changeSize} className="btn-trigger">
            change
          </button>
          <Pagination
            defaultCurrent={5}
            defaultPageSize={defaultPageSize}
            total={total}
            sizeCanChange
            sizeOptions={bol ? sizeOptions1 : sizeOptions2}
            pageSizeChangeResetCurrent={bol}
          />
        </div>
      );
    };
    const component = render(<Demo />);
    const lastPageOptionIndex = component.find('.arco-pagination-item').length - 2;
    expect(component.find('.arco-pagination-item')[lastPageOptionIndex].innerHTML).toEqual(
      `${Math.ceil(total / sizeOptions1[0])}`
    );

    act(async () => {
      fireEvent.click(component.find('.arco-select')[0]);
      await sleep(1000);
    });
    act(() => {
      fireEvent.click(component.find('.arco-select-option')[2]);
    });
    const currentPageSize = sizeOptions1[2];
    const totalLength = Math.ceil(total / currentPageSize) + 2;
    expect(component.find('.arco-pagination-item').length).toEqual(totalLength);

    act(() => {
      fireEvent.click(component.find('.btn-trigger')[0]);
    });

    const nextIndex = sizeOptions2.findIndex((num) => num === currentPageSize);
    expect(
      component
        .find('.arco-select-view-value')[0]
        .innerHTML.startsWith(sizeOptions2[nextIndex].toString())
    ).toBe(true);
  });

  it('illegal props are behaving normally', () => {
    const Demo = () => {
      const [props, setProps] = useState<any>({ total: 30, pageSize: 5 });
      return (
        <div>
          <button
            onClick={() => {
              setProps({});
            }}
          >
            update
          </button>
          <Pagination {...props} />
        </div>
      );
    };
    const wrapper = render(<Demo />);
    expect(wrapper.find('.arco-pagination-item')).toHaveLength(2 + 30 / 5);
    act(() => {
      fireEvent.click(wrapper.find('button')[0]);
    });

    expect(wrapper.find('.arco-pagination-item')).toHaveLength(2);
  });
});
