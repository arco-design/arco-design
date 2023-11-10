import React, { CSSProperties } from 'react';
import { TbodyProps } from '../interface';
import { isArray } from '../../_util/is';
import cs from '../../_util/classNames';
import useComponent from '../hooks/useComponent';
import VirtualList from '../../_class/VirtualList';
import Tr from './tr';
import { getOriginData } from '../utils';

function TBody<T>(props: TbodyProps<T>) {
  const {
    childrenColumnName = 'children',
    expandProps = {},
    expandedRowRender,
    expandedRowKeys,
    data,
    columns,
    prefixCls,
    components,
    rowSelection,
    noDataElement,
    scroll,
    indentSize = 16,
    hasFixedColumn,
    tableViewWidth,
    virtualized,
    virtualListProps,
    getRowKey,
    saveVirtualListRef,
  } = props;

  const er = expandedRowRender
    ? (r, i) => expandedRowRender(getOriginData(r), i)
    : expandedRowRender;

  const { ComponentTbody } = useComponent(components);

  let type: 'radio' | 'checkbox';
  if (rowSelection && 'type' in rowSelection) {
    type = rowSelection.type;
  } else if (rowSelection && !('type' in rowSelection)) {
    type = 'checkbox';
  }

  function isChildrenNotEmpty(record) {
    return isArray(record[childrenColumnName]) && record[childrenColumnName].length;
  }

  function shouldRowExpand(record, index) {
    if ('rowExpandable' in expandProps && typeof expandProps.rowExpandable === 'function') {
      return expandProps.rowExpandable(record);
    }
    return er && er(record, index) !== null;
  }

  const trProps = {
    ...props,
    type,
    shouldRowExpand,
  };

  function renderTreeTrs(record: T, index: number) {
    const trList: any[] = [];
    trList.push(
      <Tr<T> key={getRowKey(record)} {...trProps} record={record} level={0} index={index} />
    );

    const travel = (children, rowKey, level = 0) => {
      if (isArray(children) && children.length) {
        children.forEach((child, i) => {
          if (expandedRowKeys.indexOf(rowKey) !== -1) {
            trList.push(
              <Tr<T>
                {...trProps}
                key={getRowKey(child)}
                record={child}
                level={level + 1}
                index={i}
              />
            );
            if (isChildrenNotEmpty(child)) {
              travel(child[childrenColumnName], getRowKey(child), level + 1);
            }
          }
        });
      }
    };
    if (!er) {
      travel(record[childrenColumnName], getRowKey(record));
    }

    return trList;
  }

  let scrollStyleX: CSSProperties = {};
  let scrollStyleY: CSSProperties = {};
  if (scroll) {
    if (scroll.x && (typeof scroll.x === 'number' || typeof scroll.x === 'string')) {
      scrollStyleX = {
        width: scroll.x,
      };
    }
    if (scroll.y && (typeof scroll.y === 'number' || typeof scroll.y === 'string')) {
      scrollStyleY = {
        maxHeight: scroll.y,
      };
    }
  }

  const noElementProps: { className?: string; style?: CSSProperties } = {
    className: `${prefixCls}-no-data`,
  };
  if (tableViewWidth) {
    noElementProps.className = `${prefixCls}-no-data ${prefixCls}-expand-fixed-row`;
    noElementProps.style = { width: tableViewWidth };
  }

  const noDataTr = (
    <tr className={cs(`${prefixCls}-tr`, `${prefixCls}-empty-row`)}>
      <td className={`${prefixCls}-td`} colSpan={columns.length}>
        <div {...noElementProps}>{noDataElement}</div>
      </td>
    </tr>
  );

  // https://github.com/arco-design/arco-design/issues/644
  // except the real scroll container, all parent nodes should not have a overflow style.
  if (virtualized) {
    return data.length > 0 ? (
      <VirtualList
        data={data}
        height={scrollStyleY.maxHeight}
        isStaticItemHeight={false}
        // position sticky works
        outerStyle={{ ...scrollStyleX, minWidth: '100%', overflow: 'visible' }}
        innerStyle={{ right: 'auto', minWidth: '100%' }}
        className={`${prefixCls}-body`}
        ref={(ref) => saveVirtualListRef(ref)}
        itemKey={getRowKey}
        {...virtualListProps}
      >
        {(child, index) => (
          <Tr<T> {...trProps} key={getRowKey(child)} record={child} index={index} level={0} />
        )}
      </VirtualList>
    ) : (
      <div className={`${prefixCls}-body`}>
        <table>
          <tbody>{noDataTr}</tbody>
        </table>
      </div>
    );
  }

  return (
    <ComponentTbody>
      {data.length > 0
        ? data.map((record, index) => {
            const rowK = getRowKey(record);
            const shouldRenderExpandIcon =
              shouldRowExpand(record, index) && expandedRowKeys.indexOf(rowK) !== -1;
            return (
              <React.Fragment key={rowK}>
                {renderTreeTrs(record, index)}
                {shouldRenderExpandIcon && (
                  <tr
                    className={cs(`${prefixCls}-tr`, `${prefixCls}-expand-content`)}
                    key={`${rowK}-expanded`}
                  >
                    <td
                      className={`${prefixCls}-td`}
                      colSpan={columns.length}
                      style={{ paddingLeft: indentSize }}
                    >
                      {hasFixedColumn ? (
                        <div
                          className={`${prefixCls}-expand-fixed-row`}
                          style={{ width: tableViewWidth }}
                        >
                          {er && er(record, index)}
                        </div>
                      ) : (
                        er && er(record, index)
                      )}
                    </td>
                  </tr>
                )}
              </React.Fragment>
            );
          })
        : noDataTr}
    </ComponentTbody>
  );
}

export default TBody;
