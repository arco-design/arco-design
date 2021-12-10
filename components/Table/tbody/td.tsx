import React, { CSSProperties, ReactNode, memo } from 'react';
import get from 'lodash/get';
import pick from '../../_util/pick';
import { isObject, isString } from '../../_util/is';
import cs from '../../_util/classNames';
import useComponent from '../hooks/useComponent';
import { ComponentsProps, InternalColumnProps, SorterResult } from '../interface';

type TdType = {
  prefixCls?: string;
  virtualized?: boolean;
  stickyClassName?: string;
  stickyOffset?: number;
  components?: ComponentsProps;
  InnerComponentTd?: any;
  column?: InternalColumnProps;
  columnIndex?: number;
  currentSorter?: SorterResult;
  placeholder?: ReactNode;
  indentSize?: number;
  record?: any;
  trIndex?: number;
  level?: number;
  haveTreeData?: boolean;
  recordHaveChildren?: boolean;
  rowKey?: string;
  renderExpandIcon?: (record, rowKey: string) => ReactNode;
};

function isInvalidRenderElement(element) {
  return element && !React.isValidElement(element) && isObject(element);
}

function Td(props: TdType) {
  const {
    components,
    InnerComponentTd,
    column,
    columnIndex,
    prefixCls,
    stickyClassName,
    stickyOffset,
    currentSorter,
    virtualized,
    record,
    trIndex,
    level,
    placeholder,
    indentSize,
    renderExpandIcon,
    rowKey,
    recordHaveChildren,
    haveTreeData,
  } = props;
  const { ComponentBodyCell } = useComponent(components);

  const classNameTd = cs(
    `${prefixCls}-td`,
    stickyClassName,
    {
      [`${prefixCls}-col-sorted`]:
        currentSorter && currentSorter.direction && currentSorter.field === column.dataIndex,
    },
    column.className
  );
  let tdProps: {
    rowSpan?: number;
    colSpan?: number;
  } = {};
  let rowSpan;
  let colSpan;
  let styleTd: CSSProperties = {};

  if (column.fixed === 'left') {
    styleTd.left = stickyOffset;
  }

  if (column.fixed === 'right') {
    styleTd.right = stickyOffset;
  }

  if (isObject(column.bodyCellStyle)) {
    styleTd = {
      ...styleTd,
      ...column.bodyCellStyle,
    };
  }

  if (column.align) {
    styleTd.textAlign = column.align;
  }

  if (virtualized && column.width) {
    styleTd.width = column.width;
    styleTd.minWidth = column.width;
    styleTd.maxWidth = column.width;
  }

  const { onHandleSave, ...cellProps } = column.onCell
    ? column.onCell(record, trIndex)
    : { onHandleSave: () => {} };

  let renderElement =
    column.render && column.render(get(record, column.dataIndex), record, trIndex);

  if (isInvalidRenderElement(renderElement)) {
    tdProps = renderElement.props;
    rowSpan = tdProps.rowSpan;
    colSpan = tdProps.colSpan;
    renderElement = renderElement.children;
  }

  if (rowSpan === 0 || colSpan === 0) {
    return null;
  }

  const v = get(record, column.dataIndex);

  const cellChildren = column.render
    ? renderElement
    : v === undefined
    ? column.placeholder === undefined
      ? placeholder
      : column.placeholder
    : v;

  const titleProps =
    column.ellipsis && typeof cellChildren === 'string' ? { title: cellChildren } : {};

  const hasInlineExpandIcon = haveTreeData && column.$$isFirstColumn;
  const needRenderExpandIcon = hasInlineExpandIcon && recordHaveChildren;
  let paddingLeft = hasInlineExpandIcon && level > 0 ? indentSize * level : 0;

  if (hasInlineExpandIcon && !recordHaveChildren) {
    // expand icon width and margin-right
    paddingLeft += 16 + 4;
  }

  const content = (
    <>
      {needRenderExpandIcon ? (
        <span className={`${prefixCls}-cell-expand-icon`}>{renderExpandIcon(record, rowKey)}</span>
      ) : null}
      {(isString(ComponentBodyCell) as JSX.IntrinsicAttributes) ? (
        <ComponentBodyCell className={`${prefixCls}-cell-wrap-value`}>
          {cellChildren}
        </ComponentBodyCell>
      ) : (
        <ComponentBodyCell
          rowData={record}
          className={`${prefixCls}-cell-wrap-value`}
          column={column}
          onHandleSave={onHandleSave}
          {...cellProps}
        >
          {cellChildren}
        </ComponentBodyCell>
      )}
    </>
  );

  return (
    <InnerComponentTd
      className={classNameTd}
      key={column.key || column.dataIndex || columnIndex}
      style={styleTd}
      {...pick(cellProps, [
        'onClick',
        'onDoubleClick',
        'onContextMenu',
        'onMouseOver',
        'onMouseEnter',
        'onMouseLeave',
        'onMouseMove',
        'onMouseDown',
        'onMouseUp',
      ])}
      {...tdProps}
    >
      <div
        className={cs(`${prefixCls}-cell`, {
          [`${prefixCls}-cell-text-ellipsis`]: column.ellipsis,
        })}
        style={column.cellStyle}
        {...titleProps}
      >
        {paddingLeft ? (
          <span className={`${prefixCls}-cell-indent`} style={{ paddingLeft }} />
        ) : null}
        {content}
      </div>
    </InnerComponentTd>
  );
}

export default memo(Td);
