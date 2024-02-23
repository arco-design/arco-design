import React, {
  CSSProperties,
  forwardRef,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { TypographyEllipsisProps } from './interface';
import { ConfigContext } from '../ConfigProvider';
import cs from '../_util/classNames';
import { Tooltip } from '../index';
import ResizeObserver from '../_util/resizeObserver';
import throttleByRaf from '../_util/throttleByRaf';
import useMergeProps from '../_util/hooks/useMergeProps';
import { isObject } from '../_util/is';
import useMergeValue from '../_util/hooks/useMergeValue';

const defaultProps: TypographyEllipsisProps = {
  rows: 1,
  expandable: true,
  defaultExpanded: false,
};

const EllipsisComponent: React.ForwardRefRenderFunction<
  unknown,
  React.PropsWithChildren<TypographyEllipsisProps>
> = (baseProps, _) => {
  const ctx = useContext(ConfigContext);
  const props = useMergeProps(
    baseProps,
    defaultProps,
    ctx.componentConfig?.['Typography.Ellipsis']
  );
  const {
    className,
    style,
    rows,
    disabled,
    showTooltip,
    children,
    expandable,
    expandRender,
    onExpand,
    onEllipsis,
  } = props;
  const { locale } = ctx;

  const wrapperRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const [text, setText] = useState('');
  const [visible, setVisible] = useState(false);

  const mirrorContentRef = useRef<HTMLDivElement>(null);
  const mirrorTextRef = useRef<HTMLDivElement>(null);
  const [expanded, setExpanded] = useMergeValue(false, {
    defaultValue: props.defaultExpanded,
    value: props.expanded,
  });
  const [overflow, setOverflow] = useState(false);

  const tooltipData = useMemo(() => {
    if (isObject(showTooltip)) {
      return {
        tooltip: true,
        tooltipProps: showTooltip,
      };
    }
    return {
      tooltip: Boolean(showTooltip),
      tooltipProps: showTooltip,
    };
  }, [showTooltip]);

  useEffect(() => {
    if (textRef.current) {
      const content = textRef.current.textContent;
      if (content) {
        setText(content);
      }
    }
  }, [children, textRef]);

  const prefix = ctx.getPrefixCls('ellipsis');

  const computedStyle = useMemo<CSSProperties>(() => {
    if (!expanded) {
      return {
        WebkitBoxOrient: 'vertical',
        MozBoxOrient: 'vertical',
        WebkitLineClamp: rows,
      };
    }
    return null;
  }, [expanded]);

  const renderActionContent = () => {
    if (expandRender) {
      return expandRender(expanded);
    }
    return (
      <span className={`${prefix}-action-text`}>
        {expanded ? locale.Typography.fold : locale.Typography.unfold}
      </span>
    );
  };

  const renderAction = () => {
    if (expandable && overflow) {
      return (
        <div
          className={cs(`${prefix}-action`, {
            [`${prefix}-action-collapsed`]: !expanded,
          })}
          onClick={(ev) => {
            if (expanded) {
              setExpanded(false);
              // @ts-ignore
              onExpand?.(false, ev);
            } else {
              setExpanded(true);
              setVisible(false);
              // @ts-ignore
              onExpand?.(true, ev);
            }
          }}
        >
          {renderActionContent()}
        </div>
      );
    }
    return null;
  };

  const onResize = useCallback(
    throttleByRaf(() => {
      if (mirrorTextRef.current && mirrorContentRef.current) {
        if (mirrorTextRef.current.offsetHeight > mirrorContentRef.current.offsetHeight) {
          if (overflow === false) {
            setOverflow(true);
            onEllipsis?.(true);
          }
        } else if (overflow === true) {
          setOverflow(false);
          onEllipsis?.(false);
        }
      }
    }),
    [overflow]
  );

  const renderMirror = () => {
    if (disabled) {
      return null;
    }

    return (
      <ResizeObserver onResize={onResize}>
        <div
          className={`${prefix}-content-mirror`}
          style={{
            WebkitBoxOrient: 'vertical',
            MozBoxOrient: 'vertical',
            WebkitLineClamp: rows,
          }}
          ref={mirrorContentRef}
        >
          <ResizeObserver onResize={onResize}>
            <span ref={mirrorTextRef} className={`${prefix}-text`}>
              {children}
            </span>
          </ResizeObserver>
        </div>
      </ResizeObserver>
    );
  };

  const renderContent = () => {
    if (disabled) {
      return (
        <div className={`${prefix}-content`}>
          <span ref={textRef} className={`${prefix}-text`}>
            {children}
          </span>
        </div>
      );
    }

    const content = (
      <div
        className={cs(`${prefix}-content`, {
          [`${prefix}-collapsed`]: !expanded,
        })}
        style={computedStyle}
        title={!tooltipData.tooltip && overflow && !expanded ? text : undefined}
      >
        {!expanded && renderAction()}
        <span ref={textRef} className={`${prefix}-text`}>
          {children}
        </span>
        {expanded && renderAction()}
      </div>
    );

    if (tooltipData.tooltip) {
      return (
        <Tooltip
          content={text}
          popupVisible={visible}
          disabled={!overflow || expanded}
          triggerProps={{
            mouseEnterDelay: 100,
          }}
          onVisibleChange={(visible) => {
            if (visible) {
              if (overflow && !expanded) {
                setVisible(true);
              }
            } else {
              setVisible(false);
            }
          }}
          {...tooltipData.tooltipProps}
        >
          {content}
        </Tooltip>
      );
    }

    return content;
  };

  return (
    <div ref={wrapperRef} className={cs(prefix, className)} style={style}>
      {renderMirror()}
      {renderContent()}
    </div>
  );
};

const Ellipsis = forwardRef(EllipsisComponent);
export default Ellipsis;
