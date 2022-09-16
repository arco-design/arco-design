import React, { useState, useRef, useContext, forwardRef, useEffect } from 'react';
import cs from '../_util/classNames';
import omit from '../_util/omit';
import { ConfigContext } from '../ConfigProvider';
import ResponsiveObserve, {
  Breakpoint,
  ScreenMap,
  responsiveArray,
} from '../_util/responsiveObserve';
import { GridRowGutter, RowProps } from './interface';
import useMergeProps from '../_util/hooks/useMergeProps';
import { RowContext } from './context';

const defaultProps: RowProps = {
  gutter: 0,
  align: 'start',
  justify: 'start',
};

function Row(baseProps: RowProps, ref) {
  const { getPrefixCls, componentConfig, rtl } = useContext(ConfigContext);
  const props = useMergeProps<RowProps>(baseProps, defaultProps, componentConfig?.['Grid.Row']);
  const { className, style, children, div, align, justify, gutter, ...rest } = props;
  const [screens, setScreens] = useState<ScreenMap>({
    xs: true,
    sm: true,
    md: true,
    lg: true,
    xl: true,
    xxl: true,
    xxxl: true,
  });

  const token = useRef<string>();

  useEffect(() => {
    token.current = ResponsiveObserve.subscribe((screens) => {
      // Responsive Gutter
      if (
        (!Array.isArray(gutter) && typeof gutter === 'object') ||
        (Array.isArray(gutter) && (typeof gutter[0] === 'object' || typeof gutter[1] === 'object'))
      ) {
        setScreens(screens);
      }
    });

    return () => {
      ResponsiveObserve.unsubscribe(token.current);
    };
  }, []);

  function getGutter(gutter: GridRowGutter): number {
    let result = 0;

    if (typeof gutter === 'object') {
      for (let i = 0; i < responsiveArray.length; i++) {
        const breakpoint: Breakpoint = responsiveArray[i];
        if (screens[breakpoint] && gutter[breakpoint] !== undefined) {
          result = gutter[breakpoint] as number;
          break;
        }
      }
    } else {
      result = gutter;
    }

    return result;
  }

  const prefixCls = getPrefixCls('row');
  const classNames = cs(
    {
      [`${prefixCls}`]: !div,
      [`${prefixCls}-align-${align}`]: align,
      [`${prefixCls}-justify-${justify}`]: justify,
      [`${prefixCls}-rtl`]: rtl,
    },
    className
  );
  const marginStyle: {
    marginTop?: number;
    marginBottom?: number;
    marginLeft?: number;
    marginRight?: number;
  } = {};
  const gutterHorizontal = getGutter(Array.isArray(gutter) ? gutter[0] : gutter);
  const gutterVertical = getGutter(Array.isArray(gutter) ? gutter[1] : 0);

  if ((gutterHorizontal || gutterVertical) && !div) {
    const marginHorizontal = -gutterHorizontal / 2;
    const marginVertical = -gutterVertical / 2;
    if (marginHorizontal) {
      marginStyle.marginLeft = marginHorizontal;
      marginStyle.marginRight = marginHorizontal;
    }
    if (marginVertical) {
      marginStyle.marginTop = marginVertical;
      marginStyle.marginBottom = marginVertical;
    }
  }

  return (
    <div
      ref={ref}
      {...omit(rest, ['gutter'])}
      style={{
        ...style,
        ...marginStyle,
      }}
      className={classNames}
    >
      <RowContext.Provider value={{ gutter: [gutterHorizontal, gutterVertical], div }}>
        {children}
      </RowContext.Provider>
    </div>
  );
}

const RowComponent = forwardRef(Row);

RowComponent.displayName = 'Row';

export default RowComponent;

export { RowProps };
