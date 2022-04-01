import React, { useContext, useMemo } from 'react';
import { ConfigContext } from '../ConfigProvider';
import { TransferProps, TransferListProps, TransferItem, TransferListType } from './interface';
import cs from '../_util/classNames';
import Button from '../Button';
import TransferList from './list';
import IconLeft from '../../icon/react-icon/IconLeft';
import IconRight from '../../icon/react-icon/IconRight';
import useMergeValue from '../_util/hooks/useMergeValue';
import { isObject } from '../_util/is';
import useMergeProps from '../_util/hooks/useMergeProps';

const defaultProps: TransferProps = {
  titleTexts: ['Source', 'Target'],
  defaultSelectedKeys: [],
  defaultTargetKeys: [],
  dataSource: [],
  filterOption: (inputValue, item) => {
    return typeof item?.value === 'string' && item.value.indexOf(inputValue) !== -1;
  },
};

function Transfer(baseProps: TransferProps, ref) {
  const { getPrefixCls, componentConfig } = useContext(ConfigContext);
  const props = useMergeProps<TransferProps>(baseProps, defaultProps, componentConfig?.Transfer);
  const {
    prefixCls: transferPrefixCls,
    style,
    className,
    children,
    listStyle,
    dataSource,
    defaultTargetKeys,
    defaultSelectedKeys,
    targetKeys: propTargetKeys,
    selectedKeys: propSelectedKeys,
    oneWay,
    simple,
    disabled,
    titleTexts,
    operationTexts,
    operationStyle,
    onSearch,
    onChange,
    onSelectChange,
    ...restProps
  } = props;

  const prefixCls = transferPrefixCls || getPrefixCls('transfer');
  const mergedOneWay = !!(simple || oneWay);

  const [targetKeys, setTargetKeys] = useMergeValue([], {
    value: propTargetKeys,
    defaultValue: simple ? defaultTargetKeys.concat(defaultSelectedKeys) : defaultTargetKeys,
  });
  const [selectedKeys, setSelectedKeys] = useMergeValue([], {
    value: propSelectedKeys,
    defaultValue: simple ? [] : defaultSelectedKeys,
  });

  // 严格控制 TransferList 的 dataSource 的引用地址改变
  const [sourceListDataSource, targetListDataSource] = useMemo(
    () => [[], []],
    [dataSource, targetKeys]
  );

  const [sourceInfo, targetInfo] = useMemo(() => {
    type ListInfo = { selectedValidKeys: TransferItem['key'][] } & Pick<
      TransferListProps,
      'dataSource' | 'selectedKeys' | 'validKeys' | 'selectedDisabledKeys'
    >;
    // 每次重新计算时，清空数组
    sourceListDataSource.length = 0;
    targetListDataSource.length = 0;

    // 空间换取时间，尽量减少数组遍历的次数
    const sourceInfo: ListInfo = {
      dataSource: sourceListDataSource,
      selectedKeys: [],
      validKeys: [],
      selectedValidKeys: [],
      selectedDisabledKeys: [],
    };
    const targetInfo: ListInfo = {
      dataSource: targetListDataSource,
      selectedKeys: [],
      validKeys: [],
      selectedValidKeys: [],
      selectedDisabledKeys: [],
    };

    dataSource.forEach((item) => {
      const info = targetKeys.indexOf(item.key) > -1 ? targetInfo : sourceInfo;

      if (!item.disabled) {
        info.validKeys.push(item.key);
      }

      if (selectedKeys.indexOf(item.key) > -1) {
        info.selectedKeys.push(item.key);
        if (item.disabled) {
          info.selectedDisabledKeys.push(item.key);
        } else {
          info.selectedValidKeys.push(item.key);
        }
      }

      info.dataSource.push(item);
    });

    // 简单模式下，在左侧列表保留被选中的项目
    if (isObject(simple) && simple.retainSelectedItems) {
      Object.entries(sourceInfo).forEach(([key, value]) => {
        if (Array.isArray(value)) {
          sourceInfo[key] = (value as []).concat(targetInfo[key]);
        }
      });
      sourceInfo.dataSource = dataSource.slice();
      sourceInfo.selectedKeys = targetKeys.slice();
    }

    return [sourceInfo, targetInfo];
  }, [dataSource, targetKeys, selectedKeys, simple]);

  // 移动选项
  const moveTo = (to: TransferListType, moveKeys: TransferItem['key'][] = null) => {
    if (Array.isArray(moveKeys) && moveKeys.length === 0) {
      return;
    }

    // 只移动未被禁用的选中项目
    moveKeys =
      moveKeys || (to === 'target' ? sourceInfo.selectedValidKeys : targetInfo.selectedValidKeys);
    const newTargetKeys =
      to === 'target'
        ? targetKeys.concat(moveKeys)
        : targetKeys.filter((key) => moveKeys.indexOf(key) === -1);
    // 移动之后取消所有非禁用选项的选中状态
    setSelectedKeys(sourceInfo.selectedDisabledKeys.concat(targetInfo.selectedDisabledKeys));
    setTargetKeys(newTargetKeys);
    onChange && onChange(newTargetKeys, to, moveKeys);
  };

  // 单选 或者 全选
  const handleSelect = (keys: string[], listType: TransferListType) => {
    if (listType === 'source') {
      // 简单模式在选中之后直接移动
      if (simple) {
        const keysAdded = keys.filter((k) => sourceInfo.selectedKeys.indexOf(k) === -1);
        const keysRemoved = sourceInfo.selectedKeys.filter((k) => keys.indexOf(k) === -1);
        moveTo('target', keysAdded);
        moveTo('source', keysRemoved);
      } else {
        setSelectedKeys(keys.concat(targetInfo.selectedKeys));
        onSelectChange && onSelectChange(keys, targetInfo.selectedKeys);
      }
    } else {
      setSelectedKeys(sourceInfo.selectedKeys.concat(keys));
      onSelectChange && onSelectChange(sourceInfo.selectedKeys, keys);
    }
  };

  const renderOperations = () => {
    const leftActive = targetInfo.selectedKeys.length > 0;
    const rightActive = sourceInfo.selectedKeys.length > 0;
    const buttons = mergedOneWay ? ['target'] : ['target', 'source'];

    return simple ? null : (
      <div
        style={operationStyle}
        className={cs(`${prefixCls}-operations`, {
          [`${prefixCls}-operations-words`]: operationTexts,
        })}
      >
        {buttons.map((to: TransferListType, index) => {
          let Icon;
          let _disabled;

          if (to === 'source') {
            Icon = IconLeft;
            _disabled = disabled || !leftActive;
          } else {
            Icon = IconRight;
            _disabled = disabled || !rightActive;
          }

          return (
            <Button
              key={index}
              tabIndex={-1}
              aria-label={`move selected ${to === 'target' ? 'right' : 'left'}`}
              type="secondary"
              size="small"
              shape="round"
              disabled={_disabled}
              onClick={() => moveTo(to)}
              icon={<Icon />}
            >
              {operationTexts && operationTexts[index]}
            </Button>
          );
        })}
      </div>
    );
  };

  const renderList = (listType: TransferListType) => {
    const info = listType === 'source' ? sourceInfo : targetInfo;
    const isTarget = listType === 'target';
    return (
      <TransferList
        {...info}
        {...restProps}
        style={listStyle}
        prefixCls={prefixCls}
        className={`${prefixCls}-view-${listType}`}
        listType={listType}
        title={titleTexts[isTarget ? 1 : 0]}
        disabled={disabled}
        allowClear={isTarget && mergedOneWay}
        renderList={children}
        handleSelect={(newSelectKeys) => handleSelect(newSelectKeys, listType)}
        handleRemove={(removeKeys) => moveTo(isTarget ? 'source' : 'target', removeKeys)}
        onSearch={(value) => onSearch && onSearch(value, listType)}
      />
    );
  };

  return (
    <div
      ref={ref}
      className={cs(
        prefixCls,
        {
          [`${prefixCls}-simple`]: simple,
          [`${prefixCls}-disabled`]: disabled,
        },
        className
      )}
      style={style}
    >
      {renderList('source')}
      {renderOperations()}
      {renderList('target')}
    </div>
  );
}

const TransferComponent = React.forwardRef<unknown, TransferProps>(Transfer);

TransferComponent.displayName = 'Transfer';

export default TransferComponent;

export { TransferProps };
