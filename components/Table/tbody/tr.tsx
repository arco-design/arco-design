import React, { forwardRef, ReactElement, useContext } from 'react';
import Checkbox from '../../Checkbox';
import Radio from '../../Radio';
import { isString, isArray } from '../../_util/is';
import { getOriginData } from '../utils';
import cs from '../../_util/classNames';
import useComponent from '../hooks/useComponent';
import IconPlus from '../../../icon/react-icon/IconPlus';
import IconMinus from '../../../icon/react-icon/IconMinus';
import { TbodyProps } from '../interface';
import { INTERNAL_EXPAND_KEY, INTERNAL_SELECTION_KEY } from '../constant';
import { ConfigContext } from '../../ConfigProvider';
import Td from './td';

type TrType<T = any> = TbodyProps<T> & {
  record?: T;
  shouldRowExpand?: (record, index) => boolean;
  index?: number;
  type?: string;
  level?: number;
};

function Tr<T>(props: TrType<T>, ref) {
  const {
    expandedRowRender,
    onClickExpandBtn,
    columns,
    components,
    onCheck,
    onCheckRadio,
    prefixCls,
    selectedRowKeys,
    indeterminateKeys,
    rowClassName,
    onRow,
    rowSelection,
    indentSize = 16,
    activeSorters,
    virtualized,
    stickyOffsets,
    stickyClassNames,
    getRowKey,
    placeholder,
    expandProps = { strictTreeData: true },
    data,
    expandedRowKeys,
    childrenColumnName,
    record,
    index,
    type,
    shouldRowExpand,
    level,
  } = props;
  const { rtl } = useContext(ConfigContext);
  const originRecord = getOriginData(record);
  const { ...rowProps } = (onRow && onRow(originRecord, index)) || {};
  const rowK = getRowKey(record);
  const usedSelectedRowKeys = type === 'radio' ? selectedRowKeys.slice(0, 1) : selectedRowKeys;
  const trKey = rowK || index;

  const checked = usedSelectedRowKeys.indexOf(rowK) > -1;
  const expanded = expandedRowKeys.indexOf(rowK) > -1;
  const indeterminate = indeterminateKeys.indexOf(rowK) > -1;

  const classNameTr = cs(
    `${prefixCls}-tr`,
    {
      [`${prefixCls}-row-checked`]: checked,
      [`${prefixCls}-row-expanded`]: expanded,
    },
    rowClassName && rowClassName(originRecord, index)
  );
  const checkboxProps =
    rowSelection && typeof rowSelection.checkboxProps === 'function'
      ? rowSelection.checkboxProps(originRecord)
      : {};
  const operationClassName = cs(`${prefixCls}-td`, `${prefixCls}-operation`);
  const getPrefixColClassName = (name) => {
    return cs(operationClassName, `${prefixCls}-${name}`, {
      [`${prefixCls}-selection-col`]: (virtualized && type === 'checkbox') || type === 'radio',
      [`${prefixCls}-expand-icon-col`]: virtualized && expandedRowRender,
    });
  };

  function isChildrenNotEmpty(record) {
    return expandProps.strictTreeData
      ? isArray(record[childrenColumnName]) && record[childrenColumnName].length
      : record[childrenColumnName] !== undefined;
  }

  // tree data
  function isDataHaveChildren() {
    return data.find((d) => isChildrenNotEmpty(d));
  }

  const shouldRenderExpandRow = shouldRowExpand(record, index);
  const recordHaveChildren = isChildrenNotEmpty(record);
  const haveTreeData = !virtualized && isDataHaveChildren() && !expandedRowRender;
  const shouldRenderTreeDataExpandRow = haveTreeData && recordHaveChildren;

  const expandRowByClick = expandProps.expandRowByClick;

  const rowClickProps =
    expandRowByClick && (shouldRenderExpandRow || shouldRenderTreeDataExpandRow)
      ? {
          onClick: (e) => {
            onClickExpandBtn(rowK);
            rowProps && rowProps.onClick && rowProps.onClick(e);
          },
        }
      : {};

  const { ComponentBodyRow, ComponentTd, getBodyComponentOperations } = useComponent(components);

  const InnerComponentBodyRow = virtualized ? 'div' : ComponentBodyRow;
  const InnerComponentTd = virtualized ? 'div' : ComponentTd;

  const baseTrProps = { className: classNameTr, key: trKey, ...rowProps, ...rowClickProps };
  const trProps = isString(ComponentBodyRow) ? baseTrProps : { ...baseTrProps, record, index };

  function renderExpandIcon(record, rowK) {
    const { icon: expandIcon } = expandProps;
    const expanded = !!~expandedRowKeys.indexOf(rowK);
    const onClickProps = {
      onClick: (e) => {
        e.stopPropagation();
        onClickExpandBtn(rowK);
      },
    };
    return typeof expandIcon === 'function' ? (
      expandIcon({ expanded, record, ...onClickProps })
    ) : (
      <button {...onClickProps} type="button">
        {expanded ? <IconMinus /> : <IconPlus />}
      </button>
    );
  }

  const expandNode = expandedRowRender && (
    <InnerComponentTd className={getPrefixColClassName('expand-icon-cell')}>
      {shouldRenderExpandRow && renderExpandIcon(record, rowK)}
    </InnerComponentTd>
  );

  const renderSelectionCell = rowSelection && rowSelection.renderCell;
  let selectionNode;

  const checkboxNode = (
    <Checkbox
      value={rowK}
      onChange={(check) => onCheck(check, record)}
      checked={checked}
      indeterminate={indeterminate}
      {...checkboxProps}
    />
  );

  const radioNode = (
    <Radio
      onChange={() => onCheckRadio(rowK, record)}
      value={rowK}
      checked={checked}
      {...checkboxProps}
    />
  );

  if (type === 'checkbox') {
    selectionNode = (
      <InnerComponentTd className={getPrefixColClassName('checkbox')}>
        {renderSelectionCell
          ? renderSelectionCell(checkboxNode, checked, originRecord)
          : checkboxNode}
      </InnerComponentTd>
    );
  }
  if (type === 'radio') {
    selectionNode = (
      <InnerComponentTd className={getPrefixColClassName('radio')}>
        {renderSelectionCell ? renderSelectionCell(radioNode, checked, originRecord) : radioNode}
      </InnerComponentTd>
    );
  }

  const bodyOperations = getBodyComponentOperations({ selectionNode, expandNode });

  return (
    <InnerComponentBodyRow {...trProps} ref={ref}>
      {columns.map((col, colIndex) => {
        const stickyOffset: number = stickyOffsets[colIndex];
        const stickyClassName: string = stickyClassNames[colIndex];

        if (col.$$isOperation) {
          let node: any = col.node;
          let isExtraOperation = true;

          if (col.title === INTERNAL_SELECTION_KEY) {
            node = bodyOperations.find((o) => o.name === 'selectionNode')?.node;
            isExtraOperation = false;
          }

          if (col.title === INTERNAL_EXPAND_KEY) {
            node = bodyOperations.find((o) => o.name === 'expandNode')?.node;
            isExtraOperation = false;
          }

          const operationNode: ReactElement = typeof node === 'function' ? node(record) : node;

          return React.cloneElement(operationNode, {
            key: col.key || colIndex,
            ...operationNode.props,
            className: cs(
              isExtraOperation ? operationClassName : '',
              operationNode?.props?.className,
              stickyClassName
            ),
            style: {
              ...operationNode?.props?.style,
              ...(col.fixed === 'left'
                ? {
                    [rtl ? 'right' : 'left']: stickyOffset,
                  }
                : {}),
              width: col.width,
              minWidth: col.width,
            },
          });
        }

        return (
          <Td
            key={colIndex}
            prefixCls={prefixCls}
            virtualized={virtualized}
            components={components}
            currentSorter={activeSorters.find((item) => item.field === col.key)}
            placeholder={placeholder}
            indentSize={indentSize}
            stickyClassName={stickyClassName}
            stickyOffset={stickyOffset}
            InnerComponentTd={InnerComponentTd}
            column={col}
            columnIndex={colIndex}
            record={record}
            trIndex={index}
            level={level}
            haveTreeData={haveTreeData}
            recordHaveChildren={recordHaveChildren}
            rowKey={rowK}
            renderExpandIcon={renderExpandIcon}
          />
        );
      })}
    </InnerComponentBodyRow>
  );
}

const ForwardRefTr = forwardRef(Tr);

interface ForwardRefTrType
  extends React.ForwardRefExoticComponent<
    React.PropsWithoutRef<TrType> & React.RefAttributes<unknown>
  > {
  <T = any>(
    props: React.PropsWithChildren<TrType<T>> & {
      ref?: React.Ref<unknown>;
    }
  ): React.ReactElement;
}

export default ForwardRefTr as ForwardRefTrType;
