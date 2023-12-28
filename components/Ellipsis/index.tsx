import React, {
  CSSProperties,
  forwardRef,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { EllipsisProps } from './interface';
import { ConfigContext } from '../ConfigProvider';
import cs from '../_util/classNames';
import { Tooltip } from '../index';
import ResizeObserver from '../_util/resizeObserver';
import throttleByRaf from '../_util/throttleByRaf';
import useMergeProps from '../_util/hooks/useMergeProps';

const defaultProps: EllipsisProps = {
  rows: 1,
  action: true,
};

const EllipsisComponent: React.ForwardRefRenderFunction<
  unknown,
  React.PropsWithChildren<EllipsisProps>
> = (baseProps, _) => {
  const ctx = useContext(ConfigContext);
  const props = useMergeProps(baseProps, defaultProps, ctx.componentConfig?.Ellipsis);
  const { className, style, rows, tooltip, children, action, actionRender } = props;

  const wrapperRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const [text, setText] = useState('');
  const [visible, setVisible] = useState(false);

  const mirrorContentRef = useRef<HTMLDivElement>(null);
  const mirrorTextRef = useRef<HTMLDivElement>(null);

  const [expanded, setExpanded] = useState(false);
  const [overflow, setOverflow] = useState(false);
  const showTooltip = useMemo(() => {
    return overflow && !expanded && visible;
  }, [overflow, expanded, visible]);

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
    if (actionRender) {
      return actionRender(expanded);
    }
    return <span className={`${prefix}-action-text`}>{expanded ? '折叠' : '展开'}</span>;
  };

  const renderAction = () => {
    if (action && overflow) {
      return (
        <div
          className={cs(`${prefix}-action`, {
            [`${prefix}-action-collapsed`]: !expanded,
          })}
          onClick={() => {
            if (expanded) {
              setExpanded(false);
            } else {
              setExpanded(true);
              setVisible(false);
            }
          }}
        >
          {renderActionContent()}
        </div>
      );
    }
    return null;
  };

  const onResize = throttleByRaf(() => {
    if (mirrorTextRef.current && mirrorContentRef.current) {
      if (mirrorTextRef.current.offsetHeight > mirrorContentRef.current.offsetHeight) {
        setOverflow(true);
      } else {
        setOverflow(false);
      }
    }
  });

  const renderMirror = () => {
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
    const content = (
      <div
        className={cs(`${prefix}-content`, {
          [`${prefix}-collapsed`]: !expanded,
        })}
        style={computedStyle}
      >
        {!expanded && renderAction()}
        <span ref={textRef} className={`${prefix}-text`}>
          {children}
        </span>
        {expanded && renderAction()}
      </div>
    );

    if (tooltip) {
      return (
        <Tooltip
          content={text}
          popupVisible={showTooltip}
          disabled={!overflow || expanded}
          onVisibleChange={(visible) => setVisible(visible)}
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
export type { EllipsisProps };
