import React, { useState, useEffect, useContext, useRef, Fragment } from 'react';
import cs from '../_util/classNames';
import { ConfigContext } from '../ConfigProvider';
import ResponsiveObserve, { Breakpoint, responsiveArray } from '../_util/responsiveObserve';
import { isObject, isArray, isNumber } from '../_util/is';
import { DataType, DescriptionsProps } from './interface';
import useMergeProps from '../_util/hooks/useMergeProps';

const getLength = (arr?: DataType) => {
  return isArray(arr) ? arr.reduce((p, n) => p + (n.span || 1), 0) : 0;
};

const defaultProps: DescriptionsProps = {
  layout: 'horizontal',
  column: 3,
  tableLayout: 'auto',
};

function Descriptions(baseProps: DescriptionsProps) {
  const { getPrefixCls, componentConfig, rtl } = useContext(ConfigContext);
  const props = useMergeProps<DescriptionsProps>(
    baseProps,
    defaultProps,
    componentConfig?.Descriptions
  );
  const {
    style,
    className,
    column,
    title,
    data,
    border,
    labelStyle,
    valueStyle,
    colon,
    layout,
    size,
    tableLayout,
  } = props;

  const prefixCls = getPrefixCls('descriptions');

  const [screen, setScreen] = useState<Breakpoint>();

  const responsiveToken = useRef(null);

  useEffect(() => {
    responsiveToken.current = ResponsiveObserve.subscribe((screens) => {
      for (let i = 0; i < responsiveArray.length; i++) {
        const breakpoint: Breakpoint = responsiveArray[i];
        if (screens[breakpoint]) {
          setScreen(breakpoint);
          break;
        }
      }
    });

    return () => {
      ResponsiveObserve.unsubscribe(responsiveToken.current);
    };
  }, []);

  // get current column number
  let currentColumn = 3;
  if (isObject(column)) {
    currentColumn = column[screen] || 3;
  }
  if (isNumber(column) && column > 0) {
    currentColumn = column;
  }

  const renderData = [];
  if (isArray(data) && data.length > 0 && currentColumn) {
    data.forEach((d) => {
      const lastOne = renderData[renderData.length - 1];
      const length = getLength(lastOne);
      if (length === 0) {
        renderData.push([
          { ...d, span: d.span ? (d.span > currentColumn ? currentColumn : d.span) : 1 },
        ]);
      } else if (length === currentColumn) {
        renderData.push([
          {
            ...d,
            span: d.span ? (d.span > currentColumn ? currentColumn : d.span) : 1,
          },
        ]);
      } else {
        lastOne.push({
          ...d,
          span: d.span ? (d.span + length > currentColumn ? currentColumn - length : d.span) : 1,
        });
      }
    });
    const lastOne = renderData[renderData.length - 1];
    const lastLength = getLength(lastOne);
    if (lastLength < currentColumn) {
      lastOne[lastOne.length - 1].span =
        lastOne[lastOne.length - 1].span + currentColumn - lastLength;
    }
  }

  function renderVerticalItems(d, i) {
    return (
      <Fragment key={i}>
        <tr className={`${prefixCls}-row`}>
          {d.map((_d, _i) => {
            const colSpanProps = _d.span > 1 ? { colSpan: _d.span } : {};
            return (
              <td
                key={`${_d.key || _i}_label`}
                className={`${prefixCls}-item-label`}
                {...colSpanProps}
                style={labelStyle}
              >
                {_d.label}
                {colon}
              </td>
            );
          })}
        </tr>
        <tr className={`${prefixCls}-row`}>
          {d.map((_d, _i) => {
            const colSpanProps = _d.span > 1 ? { colSpan: _d.span } : {};
            return (
              <td
                key={`${_d.key || _i}_value`}
                className={`${prefixCls}-item-value`}
                {...colSpanProps}
                style={valueStyle}
              >
                {_d.value}
              </td>
            );
          })}
        </tr>
      </Fragment>
    );
  }

  function renderHorizontalItems(d, i) {
    return (
      <tr key={i} className={`${prefixCls}-row`}>
        {d.map((_d, _i) => {
          const colSpanProps = _d.span > 1 ? { colSpan: _d.span * 2 - 1 } : {};
          return (
            <Fragment key={_d.key || _i}>
              <td className={`${prefixCls}-item-label`} style={labelStyle}>
                {_d.label}
                {colon}
              </td>
              <td className={`${prefixCls}-item-value`} {...colSpanProps} style={valueStyle}>
                {_d.value}
              </td>
            </Fragment>
          );
        })}
      </tr>
    );
  }

  function renderInlineItems(d, i) {
    return (
      <tr key={i} className={`${prefixCls}-row`}>
        {d.map((_d, _i) => {
          const colSpanProps = _d.span > 1 ? { colSpan: _d.span } : {};
          return (
            <td key={_d.key || _i} {...colSpanProps} className={`${prefixCls}-item`}>
              <div className={`${prefixCls}-item-label-inline`} style={labelStyle}>
                {_d.label}
                {colon}
              </div>
              <div className={`${prefixCls}-item-value-inline`} style={valueStyle}>
                {_d.value}
              </div>
            </td>
          );
        })}
      </tr>
    );
  }

  function renderItems(d, i) {
    if (layout === 'inline-vertical' || layout === 'inline-horizontal') {
      return renderInlineItems(d, i);
    }
    return layout === 'vertical' ? renderVerticalItems(d, i) : renderHorizontalItems(d, i);
  }

  const classNames = cs(
    prefixCls,
    {
      [`${prefixCls}-border`]: border,
      [`${prefixCls}-layout-${layout}`]: layout,
      [`${prefixCls}-size-${size}`]: size,
      [`${prefixCls}-table-layout-fixed`]: tableLayout === 'fixed',
      [`${prefixCls}-rtl`]: rtl,
    },
    className
  );

  return (
    <div className={classNames} style={style}>
      {title && <div className={`${prefixCls}-title`}>{title}</div>}
      <div className={`${prefixCls}-body`}>
        <table className={`${prefixCls}-table`} cellPadding={0} cellSpacing={0}>
          <tbody>{renderData.map((d, i) => renderItems(d, i))}</tbody>
        </table>
      </div>
    </div>
  );
}

Descriptions.displayName = 'Descriptions';

export default Descriptions;

export { DescriptionsProps };
