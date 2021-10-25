import React from 'react';
import { render, mount } from 'enzyme';
import mountTest from '../../../tests/mountTest';
import componentConfigTest from '../../../tests/componentConfigTest';
import Transfer from '..';
import { TransferProps } from '../interface';
import TransferList from '../list';

mountTest(Transfer);
componentConfigTest(Transfer, 'Transfer');

const listCommonProps: TransferProps = {
  dataSource: [
    {
      key: 'a',
      value: 'a',
    },
    {
      key: 'b',
      value: 'b',
    },
    {
      key: 'c',
      value: 'c',
      disabled: true,
    },
  ],
  defaultSelectedKeys: ['a'],
  defaultTargetKeys: ['b'],
};

const listDisabledProps: TransferProps = {
  dataSource: [
    {
      key: 'a',
      value: 'a',
      disabled: true,
    },
    {
      key: 'b',
      value: 'b',
    },
  ],
  defaultSelectedKeys: ['a', 'b'],
};

const sortedTargetKeyProps: TransferProps = {
  dataSource: [
    {
      key: 'a',
      value: 'a',
    },
    {
      key: 'b',
      value: 'b',
    },
    {
      key: 'c',
      value: 'c',
    },
  ],
  defaultTargetKeys: ['c'],
  defaultSelectedKeys: ['c'],
  showFooter: true,
};

function mountTransfer(component: React.ReactElement) {
  return mount(component);
}

describe('Transfer', () => {
  it('should render correctly', () => {
    const wrapper = render(<Transfer {...listCommonProps} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should move selected keys to corresponding list', () => {
    const handleChange = jest.fn();
    const wrapper = mountTransfer(<Transfer {...listCommonProps} onChange={handleChange} />);
    wrapper
      .find('.arco-transfer-operations button')
      .at(0)
      .simulate('click'); // move selected keys to target list
    expect(handleChange).toHaveBeenCalledWith(['b', 'a'], 'target', ['a']);
  });

  it('should move selected keys expected disabled to corresponding list', () => {
    const handleChange = jest.fn();
    const wrapper = mountTransfer(<Transfer {...listDisabledProps} onChange={handleChange} />);
    wrapper
      .find('.arco-transfer-operations button')
      .at(0)
      .simulate('click'); // move selected keys to target list
    expect(handleChange).toHaveBeenCalledWith(['b'], 'target', ['b']);
  });

  it('should uncheck checkbox when click on checked item', () => {
    const handleSelectChange = jest.fn();
    const wrapper = mountTransfer(
      <Transfer {...listCommonProps} onSelectChange={handleSelectChange} />
    );
    wrapper
      .find('.arco-transfer-view-item')
      .filterWhere((item) => item.key() === 'a')
      .find('input')
      .simulate('change', {
        target: {
          checked: false,
        },
      });
    expect(handleSelectChange).toHaveBeenLastCalledWith([], []);
  });

  it('should check checkbox when click on unchecked item', () => {
    const handleSelectChange = jest.fn();
    const wrapper = mountTransfer(
      <Transfer {...listCommonProps} onSelectChange={handleSelectChange} />
    );
    wrapper
      .find('.arco-transfer-view-item')
      .filterWhere((item) => item.key() === 'b')
      .find('input')
      .simulate('change', {
        target: {
          checked: true,
        },
      });
    expect(handleSelectChange).toHaveBeenLastCalledWith(['a'], ['b']);
  });

  it('should not check checkbox when click on disabled item', () => {
    const handleSelectChange = jest.fn();
    const wrapper = mountTransfer(
      <Transfer {...listCommonProps} onSelectChange={handleSelectChange} />
    );
    wrapper
      .find('.arco-transfer-view-item')
      .filterWhere((item) => item.key() === 'c')
      .simulate('click');
    expect(handleSelectChange).not.toHaveBeenCalled();
  });

  it('should check all item when click on check all', () => {
    const handleSelectChange = jest.fn();
    const wrapper = mountTransfer(
      <Transfer {...listCommonProps} onSelectChange={handleSelectChange} />
    );
    wrapper
      .find('.arco-transfer-view-header input[type="checkbox"]')
      .filterWhere((n) => !n.prop('checked'))
      .simulate('change', {
        target: {
          checked: true,
        },
      });
    expect(handleSelectChange).toHaveBeenCalledWith(['a'], ['b']);
  });

  it('should uncheck all item when click on uncheck all', () => {
    const handleSelectChange = jest.fn();
    const wrapper = mountTransfer(
      <Transfer {...listCommonProps} onSelectChange={handleSelectChange} />
    );
    wrapper
      .find('.arco-transfer-view-header input[type="checkbox"]')
      .filterWhere((n) => n.prop('checked'))
      .simulate('change', {
        target: {
          checked: false,
        },
      });
    expect(handleSelectChange).toHaveBeenCalledWith([], []);
  });

  it('should call `onSearch` when use input in search box', () => {
    const onSearch = () => {};
    const wrapper = mountTransfer(<Transfer {...listCommonProps} showSearch onSearch={onSearch} />);
    wrapper
      .find('.arco-transfer-view-search input')
      .at(0)
      .simulate('change', { target: { value: 'a' } });
    expect(
      wrapper
        .find(TransferList)
        .at(0)
        .find('.arco-transfer-view-item')
    ).toHaveLength(1);
  });

  it('should check correctly when there is a search text', () => {
    const newProps = { ...listCommonProps };
    delete newProps.defaultSelectedKeys;
    const handleSelectChange = jest.fn();
    const wrapper = mountTransfer(
      <Transfer
        {...newProps}
        showSearch
        onSelectChange={handleSelectChange}
        render={(item) => item.value}
      />
    );
    wrapper
      .find('.arco-transfer-view-item')
      .filterWhere((item) => item.key() === 'b')
      .find('input')
      .simulate('change', {
        target: {
          checked: true,
        },
      });
    expect(handleSelectChange).toHaveBeenLastCalledWith([], ['b']);
    wrapper
      .find('.arco-transfer-view-search input')
      .at(0)
      .simulate('change', { target: { value: 'a' } });
    wrapper
      .find(TransferList)
      .at(0)
      .find('.arco-transfer-view-header .arco-checkbox-mask')
      .simulate('change');
    expect(handleSelectChange).toHaveBeenLastCalledWith([], ['b']);
  });

  it('should show sorted targetkey', () => {
    const wrapper = mountTransfer(
      <Transfer {...sortedTargetKeyProps} render={(item) => item.value} />
    );
    wrapper
      .find('.arco-transfer-operations button')
      .at(1)
      .simulate('click');
    expect(
      wrapper
        .find('.arco-transfer-view-header-unit')
        .at(0)
        .first()
        .text()
    ).toEqual('0 / 3');
  });

  it('should add custom styles when their props are provided', () => {
    const style = {
      backgroundColor: 'red',
    };
    const listStyle = {
      backgroundColor: 'blue',
    };
    const operationStyle = {
      backgroundColor: 'yellow',
    };

    const component = mountTransfer(
      <Transfer
        {...listCommonProps}
        style={style}
        listStyle={listStyle}
        operationStyle={operationStyle}
      />
    );

    const wrapper = component.find('.arco-transfer');
    const listSource = component.find(TransferList).first();
    const listTarget = component.find(TransferList).last();
    const operations = component.find('.arco-transfer-operations').first();

    expect(wrapper.prop('style')).toHaveProperty('backgroundColor', 'red');
    expect(listSource.prop('style')).toHaveProperty('backgroundColor', 'blue');
    expect(listTarget.prop('style')).toHaveProperty('backgroundColor', 'blue');
    expect(operations.prop('style')).toHaveProperty('backgroundColor', 'yellow');
  });

  it('titleTexts works', () => {
    const component = mountTransfer(
      <Transfer
        {...listCommonProps}
        titleTexts={[
          'LEFT',
          ({ countTotal, countSelected }) => `RIGHT ${countSelected}-${countTotal}`,
        ]}
      />
    );
    expect(
      component
        .find('.arco-transfer-view-header')
        .at(0)
        .text()
    ).toBe('LEFT1 / 2');
    expect(
      component
        .find('.arco-transfer-view-header')
        .at(1)
        .text()
    ).toBe('RIGHT 0-1');
  });

  it('simple retainSelectedItems works', () => {
    const onChange = jest.fn();
    const component = mountTransfer(
      <Transfer {...listCommonProps} simple={{ retainSelectedItems: true }} onChange={onChange} />
    );

    expect(component.find('.arco-transfer-view-source .arco-transfer-view-item')).toHaveLength(3);
    expect(component.find('.arco-transfer-view-target .arco-transfer-view-item')).toHaveLength(2);

    // 取消选中 a
    component
      .find('.arco-transfer-view-source .arco-transfer-view-item .arco-checkbox > input')
      .at(0)
      .simulate('change', {
        target: {
          checked: false,
        },
      });
    expect(onChange).toBeCalledWith(['b'], 'source', ['a']);
  });

  it('callback of draggable item', () => {
    const onDragStart = jest.fn();
    const onDragEnd = jest.fn();
    const onDragOver = jest.fn();
    const onDragLeave = jest.fn();
    const onDrop = jest.fn();

    const component = mountTransfer(
      <Transfer
        dataSource={[
          { key: 'a', value: 'a' },
          { key: 'b', value: 'b' },
          { key: 'c', value: 'c' },
        ]}
        draggable
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
      />
    );
    const itemClassName = '.arco-transfer-view-source .arco-transfer-view-item';
    const item = component.find(itemClassName).at(0);

    item.simulate('dragstart');
    expect(onDragStart).toBeCalled();

    item.simulate('dragover');
    expect(onDragOver).toBeCalled();

    item.simulate('dragleave');
    expect(onDragLeave).toBeCalled();

    component
      .find(itemClassName)
      .at(1)
      .simulate('drop');
    expect(onDrop).toBeCalled();

    item.simulate('dragend');
    expect(onDragEnd).toBeCalled();
  });
});
