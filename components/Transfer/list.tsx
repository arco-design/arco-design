import React, { useContext, useEffect, useState } from 'react';
import cs from '../_util/classNames';
import Checkbox, { CheckboxProps } from '../Checkbox';
import Button from '../Button';
import Input from '../Input';
import List from '../List';
import Item from './item';
import { TransferItem, TransferListProps } from './interface';
import IconSearch from '../../icon/react-icon/IconSearch';
import IconDelete from '../../icon/react-icon/IconDelete';
import IconHover from '../_class/icon-hover';
import { ConfigContext } from '../ConfigProvider';
import { isObject } from '../_util/is';
import useKeyboardEvent from '../_util/hooks/useKeyboardEvent';

export const TransferList = (props: TransferListProps, ref) => {
  const getKeyboardEvents = useKeyboardEvent();
  const {
    style,
    prefixCls,
    className,
    listType,
    dataSource,
    selectedKeys = [],
    validKeys,
    selectedDisabledKeys,
    title = '',
    disabled,
    draggable,
    allowClear,
    showSearch,
    showFooter,
    searchPlaceholder,
    render,
    renderList,
    pagination,
    handleSelect,
    handleRemove,
    filterOption,
    renderHeaderUnit,
    virtualListProps,
    onSearch,
    onResetData,
    onDragStart,
    onDragEnd,
    onDragLeave,
    onDragOver,
    onDrop,
  } = props;

  const baseClassName = `${prefixCls}-view`;

  const { locale } = useContext(ConfigContext);
  const [dragItem, setDragItem] = useState(null);
  const [filterText, setFilterText] = useState('');
  const [itemsToRender, setItemsToRender] = useState(dataSource);

  useEffect(() => {
    setItemsToRender(
      filterText ? dataSource.filter((item) => filterOption(filterText, item)) : dataSource
    );
  }, [dataSource, filterText, filterOption]);

  // 处理单个条目复选框改变
  const handleItemChecked = (key: string, checked: boolean) =>
    handleSelect(checked ? selectedKeys.concat(key) : selectedKeys.filter((_key) => _key !== key));
  // 处理全选复选框改变，始终避免操作已禁用的选项
  const handleItemAllChecked = (keys: string[], checked: boolean) =>
    handleSelect(
      checked
        ? [...new Set(selectedKeys.concat(keys))]
        : selectedKeys.filter((selectedKey) => keys.indexOf(selectedKey) === -1)
    );
  const clearItems = (keys: string[]) => () => handleRemove(keys);

  const searchInput = (
    <Input
      size="small"
      disabled={disabled}
      placeholder={searchPlaceholder}
      suffix={<IconSearch />}
      {...(isObject(showSearch) ? showSearch : {})}
      onChange={(value, event) => {
        setFilterText(value);
        onSearch && onSearch(value);
        isObject(showSearch) && showSearch.onChange && showSearch.onChange(value, event);
      }}
    />
  );

  const renderHeader = () => {
    const countSelected = selectedKeys.length;
    const countRendered = itemsToRender.length;
    const keysCanBeChecked = filterText
      ? validKeys.filter((validKey) => itemsToRender.find(({ key }) => key === validKey))
      : validKeys;
    const countCheckedOfRenderedItems = keysCanBeChecked.filter(
      (key) => selectedKeys.indexOf(key) > -1
    ).length;

    const checkboxProps: Partial<CheckboxProps<any>> = {
      disabled,
      checked:
        countCheckedOfRenderedItems > 0 && countCheckedOfRenderedItems === keysCanBeChecked.length,
      indeterminate:
        countCheckedOfRenderedItems > 0 && countCheckedOfRenderedItems < keysCanBeChecked.length,
      onChange: (checked) => handleItemAllChecked(keysCanBeChecked, checked),
    };

    if (typeof title === 'function') {
      return title({
        countTotal: countRendered,
        countSelected,
        clear: clearItems(keysCanBeChecked),
        checkbox: <Checkbox {...checkboxProps} />,
        searchInput,
      });
    }

    const eleHeaderUnit = (
      <span className={`${baseClassName}-header-unit`}>
        {renderHeaderUnit(countSelected, countRendered)}
      </span>
    );

    return allowClear ? (
      <>
        <span className={`${baseClassName}-header-title`}>{title}</span>
        {eleHeaderUnit}
        {!disabled && validKeys.length ? (
          <IconHover
            className={`${baseClassName}-icon-clear`}
            onClick={clearItems(keysCanBeChecked)}
            tabIndex={0}
            role="button"
            {...getKeyboardEvents({
              onPressEnter: clearItems(keysCanBeChecked),
            })}
          >
            <IconDelete />
          </IconHover>
        ) : null}
      </>
    ) : (
      <>
        <span className={`${baseClassName}-header-title`}>
          <Checkbox {...checkboxProps}>{title}</Checkbox>
        </span>
        {eleHeaderUnit}
      </>
    );
  };

  const renderListBody = () => {
    const customList =
      renderList &&
      renderList({
        listType,
        disabled,
        selectedKeys,
        validKeys,
        selectedDisabledKeys,
        filteredItems: itemsToRender,
        onItemRemove: (key) => handleRemove([key]),
        onItemSelect: handleItemChecked,
        onItemSelectAll: (keys, checked) => {
          handleSelect(checked ? keys.concat(selectedDisabledKeys) : [...selectedDisabledKeys]);
        },
      });

    return customList ? (
      <div className={`${baseClassName}-custom-list`}>{customList}</div>
    ) : (
      <List
        bordered={false}
        paginationInFooter
        virtualListProps={virtualListProps}
        wrapperClassName={`${baseClassName}-list`}
        dataSource={itemsToRender}
        pagination={
          pagination
            ? {
                simple: true,
                size: 'mini',
                ...(typeof pagination === 'object' ? pagination : {}),
              }
            : undefined
        }
        footer={
          showFooter === true ? (
            <Button size="mini" disabled={disabled} onClick={onResetData}>
              {locale.Transfer.resetText}
            </Button>
          ) : (
            showFooter || null
          )
        }
        render={(item: TransferItem) => (
          <Item
            key={item.key}
            prefixCls={prefixCls}
            item={item}
            disabled={disabled}
            draggable={draggable}
            droppable={!!dragItem}
            allowClear={allowClear}
            render={render}
            selectedKeys={selectedKeys}
            onItemSelect={(key, selected) => handleItemChecked(key, selected)}
            onItemRemove={(key) => handleRemove([key])}
            onDragStart={(e, item) => {
              setDragItem(item);
              onDragStart && onDragStart(e, item);
            }}
            onDragEnd={(e, item) => {
              setDragItem(null);
              onDragEnd && onDragEnd(e, item);
            }}
            onDragLeave={(e, item) => onDragLeave && onDragLeave(e, item)}
            onDragOver={(e, item) => onDragOver && onDragOver(e, item)}
            onDrop={(e, dropItem, dropPosition) => {
              if (onDrop && dragItem && dragItem.key !== dropItem.key) {
                onDrop({
                  e,
                  dropItem,
                  dropPosition,
                  dragItem,
                });
              }
            }}
          />
        )}
      />
    );
  };

  return (
    <div ref={ref} className={cs(baseClassName, className)} style={style}>
      <div className={`${baseClassName}-header`}>{renderHeader()}</div>

      {showSearch && <div className={`${baseClassName}-search`}>{searchInput}</div>}

      {renderListBody()}
    </div>
  );
};

const TransferListComponent = React.forwardRef(TransferList);

export default TransferListComponent;
