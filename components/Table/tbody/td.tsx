import React, {
  CSSProperties,
  ReactNode,
  memo,
  useContext,
  useMemo,
  useRef,
  useEffect,
} from 'react';
import get from 'lodash/get';
import pick from '../../_util/pick';
import { isObject, isString } from '../../_util/is';
import cs from '../../_util/classNames';
import useComponent from '../hooks/useComponent';
import { getOriginData } from '../utils';
import { ConfigContext } from '../../ConfigProvider';
import { ComponentsProps, InternalColumnProps, SorterInfo } from '../interface';

type TdType = {
  prefixCls?: string;
  virtualized?: boolean;
  stickyClassName?: string;
  stickyOffset?: number;
  components?: ComponentsProps;
  InnerComponentTd?: any;
  column?: InternalColumnProps;
  columnIndex?: number;
  currentSorter?: SorterInfo;
  placeholder?: ReactNode;
  indentSize?: number;
  record?: any;
  trIndex?: number;
  level?: number;
  haveTreeData?: boolean;
  recordHaveChildren?: boolean;
  rowKey?: string;
  renderExpandIcon?: (record, rowKey: string) => ReactNode;
  setColumnWidths: React.Dispatch<React.SetStateAction<number[]>>;
  columnWidths: number[];
  hasRowSelection?: boolean;
  scroll?: { x?: number | string | boolean; y?: number | string | boolean };
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
    setColumnWidths,
    columnWidths,
    hasRowSelection,
    scroll,
  } = props;
  const { rtl } = useContext(ConfigContext);
  const { ComponentBodyCell } = useComponent(components);

  const tdRef = useRef<HTMLElement>();
  const cellContentRef = useRef<HTMLElement>();

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
    styleTd[rtl ? 'right' : 'left'] = stickyOffset;
  }

  if (column.fixed === 'right') {
    styleTd[rtl ? 'left' : 'right'] = stickyOffset;
  }

  if (isObject(column.cellStyle)) {
    styleTd = {
      ...styleTd,
      ...column.cellStyle,
    };
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

  // 开启虚拟滚动时，没有使用 Colgroup 组件，此时如果没有配置 column width, 需要在这里计算 column width，将其同步到表头上
  const shouldSyncColumnWidth = !column.width && scroll?.x === 'max-content' && virtualized;

  let cellValueStyle: CSSProperties = {};

  if (shouldSyncColumnWidth) {
    const mainColumnIndex = hasRowSelection ? columnIndex - 1 : columnIndex;

    if (columnWidths[mainColumnIndex]) {
      styleTd.width = columnWidths[mainColumnIndex];
      styleTd.minWidth = columnWidths[mainColumnIndex];
      styleTd.maxWidth = columnWidths[mainColumnIndex];
    }

    cellValueStyle = {
      display: 'inline-block',
      width: 'max-content',
    };
  }

  const { onHandleSave, ...cellProps } = column.onCell
    ? column.onCell(record, trIndex)
    : { onHandleSave: () => {} };

  let renderElement = useMemo(
    () =>
      column.render && column.render(get(record, column.dataIndex), getOriginData(record), trIndex),
    [record, column, trIndex]
  );

  if (isInvalidRenderElement(renderElement)) {
    tdProps = renderElement.props;
    rowSpan = tdProps.rowSpan;
    colSpan = tdProps.colSpan;
    renderElement = renderElement.children;
  }

  useEffect(() => {
    if (tdRef.current && cellContentRef.current && shouldSyncColumnWidth) {
      const { width: cellContentWidth } = cellContentRef.current.getBoundingClientRect();

      const mainColumnIndex = hasRowSelection ? columnIndex - 1 : columnIndex;

      const { paddingLeft, paddingRight } = getComputedStyle(tdRef.current);

      const tdPaddingWidth = parseInt(paddingLeft) + parseInt(paddingRight);

      const currentColumnWidth = Math.ceil(cellContentWidth) + tdPaddingWidth;

      setColumnWidths((prev: number[]) => {
        const width = Math.max(currentColumnWidth, prev[mainColumnIndex] || 0);
        prev[mainColumnIndex] = width;
        return prev.slice();
      });
    }
  }, []);

  if (rowSpan === 0 || colSpan === 0) {
    return null;
  }

  const v = get(record, column.dataIndex);

  const cellChildren = column.render
    ? renderElement
    : v === undefined || (typeof v === 'string' && v.trim() === '') || v === null
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
        <ComponentBodyCell
          className={`${prefixCls}-cell-wrap-value`}
          style={cellValueStyle}
          ref={cellContentRef}
        >
          {cellChildren}
        </ComponentBodyCell>
      ) : (
        <ComponentBodyCell
          ref={cellContentRef}
          rowData={getOriginData(record)}
          className={`${prefixCls}-cell-wrap-value`}
          column={column}
          onHandleSave={onHandleSave}
          {...cellProps}
          style={cellValueStyle}
        >
          {cellChildren}
        </ComponentBodyCell>
      )}
    </>
  );

  return (
    <InnerComponentTd
      ref={tdRef}
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
