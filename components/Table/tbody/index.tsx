import React, { CSSProperties, forwardRef } from 'react';
import { TbodyProps } from '../interface';
import { isArray } from '../../_util/is';
import cs from '../../_util/classNames';
import useComponent from '../hooks/useComponent';
import VirtualList from '../../_class/VirtualList';
import Tr from './tr';
import { getOriginData } from '../utils';

type TBodyDataRecord = TbodyProps['data'][number];

const DataRecordRenderer = forwardRef(function (
  {
    record,
    index,
    virtualized,
    tbodyProps,
  }: {
    record: TBodyDataRecord;
    index: number;
    virtualized: boolean;
    tbodyProps: TbodyProps;
  },
  ref: any
) {
  const {
    prefixCls,
    columns,
    indentSize = 16,
    childrenColumnName = 'children',
    expandProps = {},
    rowSelection,
    hasFixedColumn,
    tableViewWidth,
    getRowKey,
    expandedRowKeys,
    expandedRowRender,
  } = tbodyProps;

  let type: 'radio' | 'checkbox';
  if (rowSelection && 'type' in rowSelection) {
    type = rowSelection.type;
  } else if (rowSelection && !('type' in rowSelection)) {
    type = 'checkbox';
  }

  const er = expandedRowRender
    ? (r, i) => expandedRowRender(getOriginData(r), i)
    : expandedRowRender;

  const isChildrenNotEmpty = (record: TBodyDataRecord) => {
    return isArray(record[childrenColumnName]) && record[childrenColumnName].length;
  };

  const shouldRowExpand = (record: TBodyDataRecord, index: number) => {
    if ('rowExpandable' in expandProps && typeof expandProps.rowExpandable === 'function') {
      return expandProps.rowExpandable(record);
    }
    return er && er(record, index) !== null;
  };

  const renderTreeTrs = (record: TBodyDataRecord, index: number) => {
    const trList: any[] = [];
    const trProps = {
      ...tbodyProps,
      type,
      shouldRowExpand,
    };

    // 存在 record.children 时，仅使用第一个元素作为 ref 返回，此时虚拟列表获得元素高度可能不太准确，但大致可用
    trList.push(
      <Tr<typeof record>
        ref={ref}
        key={getRowKey(record)}
        {...trProps}
        record={record}
        level={0}
        index={index}
      />
    );

    const travel = (children: TbodyProps['data'], rowKey: string, level = 0) => {
      if (isArray(children) && children.length) {
        children.forEach((child, i) => {
          if (expandedRowKeys.indexOf(rowKey) !== -1) {
            trList.push(
              <Tr<TBodyDataRecord>
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
  };

  const rowK = getRowKey(record);
  const shouldRenderExpandIcon =
    shouldRowExpand(record, index) && expandedRowKeys.indexOf(rowK) !== -1;
  const TRTagName = virtualized ? 'div' : 'tr';
  const TDTagName = virtualized ? 'div' : 'td';
  return (
    <React.Fragment key={rowK}>
      {renderTreeTrs(record, index)}
      {shouldRenderExpandIcon && (
        <TRTagName
          key={`${rowK}-expanded`}
          className={cs(`${prefixCls}-tr`, `${prefixCls}-expand-content`)}
        >
          <TDTagName
            className={cs(`${prefixCls}-td`)}
            style={{ paddingLeft: indentSize }}
            colSpan={columns.length}
          >
            {hasFixedColumn ? (
              <div className={`${prefixCls}-expand-fixed-row`} style={{ width: tableViewWidth }}>
                {er?.(record, index)}
              </div>
            ) : (
              er?.(record, index)
            )}
          </TDTagName>
        </TRTagName>
      )}
    </React.Fragment>
  );
});

function TBody<T>(props: TbodyProps<T>) {
  const {
    data,
    columns,
    prefixCls,
    components,
    noDataElement,
    scroll,
    tableViewWidth,
    virtualized,
    virtualListProps,
    getRowKey,
    saveVirtualListRef,
  } = props;

  const { ComponentTbody } = useComponent(components);

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

  const renderDataRecord = (record: TBodyDataRecord, index: number) => (
    <DataRecordRenderer
      record={record}
      index={index}
      virtualized={virtualized}
      tbodyProps={props}
    />
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
        {renderDataRecord}
      </VirtualList>
    ) : (
      <div className={`${prefixCls}-body`}>
        <table>
          <tbody>{noDataTr}</tbody>
        </table>
      </div>
    );
  }

  return <ComponentTbody>{data.length > 0 ? data.map(renderDataRecord) : noDataTr}</ComponentTbody>;
}

export default TBody;
