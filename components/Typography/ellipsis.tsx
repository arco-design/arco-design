import React, {
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
import { isServerRendering } from '../_util/dom';

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
  const isSafari = isServerRendering
    ? false
    : /^((?!chrome|android).)*safari/i.test(navigator?.userAgent ?? '');
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

  const single = useMemo(() => {
    if (isObject(expandable)) {
      return !expandable.single && rows === 1;
    }
    return rows === 1;
  }, [rows, expandable]);

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

  const getTextStyle = () => {
    if (!textRef.current) {
      return;
    }
    return window.getComputedStyle(textRef.current, null);
  };

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
        <>
          <span
            className={`${prefix}-action-before`}
            style={{
              float: 'right',
              height: '100%',
              marginBottom: `-${getTextStyle()?.lineHeight ?? `21px`}`,
            }}
          />
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
        </>
      );
    }
    return null;
  };

  const onResize = useCallback(
    throttleByRaf(() => {
      if (mirrorTextRef.current && mirrorContentRef.current) {
        const isOverflow = single
          ? mirrorTextRef.current.offsetWidth > mirrorContentRef.current.offsetWidth
          : mirrorTextRef.current.offsetHeight > mirrorContentRef.current.offsetHeight;
        if (isOverflow) {
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
    [overflow, single]
  );

  const renderMirror = () => {
    if (disabled) {
      return null;
    }

    return (
      <ResizeObserver onResize={onResize}>
        <div
          className={
            single
              ? cs(`${prefix}-content-mirror`, `${prefix}-single`)
              : cs(`${prefix}-content-mirror`, `${prefix}-multiple`, `${prefix}-collapsed`)
          }
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
    if (single) {
      return (
        <div className={cs(`${prefix}-content`, `${prefix}-single`)}>
          <span ref={textRef} className={`${prefix}-text`}>
            {children}
          </span>
        </div>
      );
    }
    if (isSafari) {
      return (
        <div
          className={cs(`${prefix}-content`, `${prefix}-multiple`)}
          title={!tooltipData.tooltip && overflow && !expanded ? text : undefined}
        >
          {!expanded && renderAction()}
          <span
            ref={textRef}
            className={cs(`${prefix}-text`, {
              [`${prefix}-collapsed`]: !expanded,
            })}
            style={{
              WebkitBoxOrient: 'vertical',
              MozBoxOrient: 'vertical',
              WebkitLineClamp: rows,
            }}
          >
            {children}
          </span>
          {expanded && renderAction()}
        </div>
      );
    }

    return (
      <div
        className={cs(`${prefix}-content`, `${prefix}-multiple`, {
          [`${prefix}-collapsed`]: !expanded,
        })}
        style={{
          WebkitBoxOrient: 'vertical',
          MozBoxOrient: 'vertical',
          WebkitLineClamp: rows,
        }}
        title={!tooltipData.tooltip && overflow && !expanded ? text : undefined}
      >
        {!expanded && renderAction()}
        <span ref={textRef} className={`${prefix}-text`}>
          {children}
        </span>
        {expanded && renderAction()}
      </div>
    );
  };

  const renderWrapper = () => {
    if (disabled) {
      return (
        <div className={`${prefix}-content`}>
          <span ref={textRef} className={`${prefix}-text`}>
            {children}
          </span>
        </div>
      );
    }

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
          {renderContent()}
        </Tooltip>
      );
    }

    return renderContent();
  };

  return (
    <div ref={wrapperRef} className={cs(prefix, className)} style={style}>
      {renderMirror()}
      {renderWrapper()}
    </div>
  );
};

const Ellipsis = forwardRef(EllipsisComponent);
export default Ellipsis;
