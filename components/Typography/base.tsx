import React, { useState, useContext, useRef, useLayoutEffect, PropsWithChildren } from 'react';
import { ConfigContext } from '../ConfigProvider';
import {
  TypographyParagraphProps,
  TypographyTitleProps,
  TypographyTextProps,
  EllipsisConfig,
} from './interface';
import Operations from './operations';
import cs from '../_util/classNames';
import EditContent from './edit-content';
import { isObject } from '../_util/is';
import ResizeObserver from '../_util/resizeObserver';
import { measure } from './utils';
import Tooltip from '../Tooltip';
import Popover from '../Popover';
import { raf, caf } from '../_util/raf';
import omit from '../_util/omit';
import useUpdateEffect from '../_util/hooks/useUpdate';
import mergedToString from '../_util/mergedToString';

type BaseProps = PropsWithChildren<
  TypographyParagraphProps & TypographyTitleProps & TypographyTextProps
> & {
  componentType: 'Title' | 'Paragraph' | 'Text';
};

type CalcEllipsisRef = {
  ellipsisConfig?: EllipsisConfig;
  expanding?: boolean;
  ellipsis?: boolean;
  editing?: boolean;
};

function getClassNameAndComponentName(props: BaseProps, prefixCls: string) {
  const { type, bold, disabled, mark, underline, delete: propDelete, code } = props;

  const component = [];
  const className = [];

  if (type) {
    className.push(`${prefixCls}-${type}`);
  }
  if (disabled) {
    className.push(`${prefixCls}-disabled`);
  }

  if (bold) {
    component.push('b');
  }
  if (underline) {
    component.push('u');
  }
  if (propDelete) {
    component.push('del');
  }
  if (code) {
    component.push('code');
  }
  if (mark) {
    component.push('mark');
  }

  return {
    component,
    className,
  };
}

function wrap(content, component, props) {
  let currentContent = content;

  component.forEach((c) => {
    const _props =
      isObject(props.mark) && props.mark.color
        ? { style: { backgroundColor: props.mark.color } }
        : {};
    currentContent = React.createElement(c, _props, currentContent);
  });
  return currentContent;
}

function Base(props: BaseProps) {
  const {
    componentType,
    style,
    className,
    children,
    editable,
    ellipsis,
    heading,
    blockquote,
    ...rest
  } = props;
  const { getPrefixCls } = useContext(ConfigContext);
  const prefixCls = getPrefixCls('typography');

  const rafId = useRef();

  const { component, className: componentClassName } = getClassNameAndComponentName(
    props,
    prefixCls
  );

  const [editing, setEditing] = useState<boolean>(false);
  const [isEllipsis, setEllipsis] = useState<boolean>(false);
  const [expanding, setExpanding] = useState<boolean>(false);
  const [ellipsisText, setEllipsisText] = useState<string>('');
  const [measuring, setMeasuring] = useState(false);

  const componentRef = useRef(null);
  // Use the current attribute of useRef to obtain the latest children
  const childrenRef = useRef(null);
  childrenRef.current = children;

  const editableConfig = isObject(editable) ? editable : {};
  const mergedEditing = 'editing' in editableConfig ? editableConfig.editing : editing;
  const calcEllipsisRef = useRef<CalcEllipsisRef>({
    expanding,
    ellipsis: isEllipsis,
    editing: mergedEditing,
  });

  const ellipsisConfig: EllipsisConfig = ellipsis
    ? { rows: 1, ellipsisStr: '...', ...(isObject(ellipsis) ? ellipsis : {}) }
    : {};
  updateCalcRef({ ellipsisConfig });

  function updateCalcRef(updater: Partial<CalcEllipsisRef>) {
    calcEllipsisRef.current = {
      ...calcEllipsisRef.current,
      ...updater,
    };
  }

  function renderOperations(forceShowExpand?: boolean) {
    return (
      <>
        <Operations
          {...props}
          setEditing={setEditing}
          onClickExpand={onClickExpand}
          expanding={expanding}
          isEllipsis={isEllipsis}
          forceShowExpand={forceShowExpand}
        />
      </>
    );
  }

  function onClickExpand() {
    setExpanding(!expanding);
    updateCalcRef({ expanding: !expanding });
    ellipsisConfig.onExpand && ellipsisConfig.onExpand(!expanding);
  }

  useLayoutEffect(() => {
    if (mergedEditing !== calcEllipsisRef.current.editing) {
      calcEllipsisRef.current.editing = mergedEditing;
    }
    resizeOnNextFrame();
    return () => {
      caf(rafId.current);
    };
  }, [children, ellipsisConfig.rows, mergedEditing]);

  useUpdateEffect(() => {
    ellipsisConfig.onEllipsis && ellipsisConfig.onEllipsis(isEllipsis);
    updateCalcRef({ ellipsis: isEllipsis });
  }, [isEllipsis]);

  function resizeOnNextFrame() {
    caf(rafId.current);
    rafId.current = raf(() => {
      calcEllipsis();
    });
  }

  function calcEllipsis() {
    const calcConfig = calcEllipsisRef.current;
    const {
      ellipsis: currentEllipsis,
      expanding: currentExpanding,
      ellipsisConfig,
      editing,
    } = calcConfig;

    if (editing) {
      return;
    }
    // Called in onResize, props and state will not be updated, so use ref to record variables.
    if (ellipsisConfig.rows) {
      // In ellipsis mode, if the user manually expands, there is no need to calculate ellipsis and ellipsisText;
      if (currentExpanding) {
        return;
      }
      setMeasuring(true);
      const { ellipsis, text } = measure(
        componentRef.current,
        ellipsisConfig,
        renderOperations(!!ellipsisConfig.expandable),
        childrenRef.current
      );
      setMeasuring(false);
      if (ellipsis && text) {
        setEllipsisText(text);
      }
      if (ellipsis !== currentEllipsis) {
        setEllipsis(ellipsis);
      }
    } else {
      const isEllipsis = !!ellipsisConfig.rows;
      if (isEllipsis !== currentEllipsis) {
        setEllipsis(isEllipsis);
      }
    }
  }

  function renderContent() {
    const fullText = mergedToString(React.Children.toArray(children));
    const ellipsisStr =
      ellipsisConfig.ellipsisStr !== undefined ? ellipsisConfig.ellipsisStr : '...';
    const suffix = ellipsisConfig.suffix !== undefined && ellipsisConfig.suffix;
    const showTooltip = ellipsisConfig.showTooltip;
    const tooltipType = isObject(ellipsisConfig.showTooltip)
      ? ellipsisConfig.showTooltip.type === 'popover'
        ? 'popover'
        : 'tooltip'
      : 'tooltip';
    const tooltipProps = isObject(ellipsisConfig.showTooltip)
      ? ellipsisConfig.showTooltip.props || {}
      : {};
    const TooltipComponent = (tooltipType === 'popover' ? Popover : Tooltip) as any;

    const titleProps = isEllipsis && !showTooltip && !expanding ? { title: fullText } : {};

    const baseProps = {
      ref: componentRef,
      style,
      ...titleProps,
    };

    function renderInnerContent() {
      const text = isEllipsis && !expanding ? ellipsisText : children;
      const innerText = component.length ? wrap(text, component, props) : text;
      return (
        <>
          {isEllipsis && showTooltip && !expanding ? (
            <TooltipComponent content={fullText} {...tooltipProps}>
              {innerText}
            </TooltipComponent>
          ) : (
            innerText
          )}
          {measuring || (isEllipsis && !expanding) ? ellipsisStr : null}
          {suffix}
          {renderOperations(measuring ? !!ellipsisConfig.expandable : undefined)}
        </>
      );
    }

    let TextComponent;
    if (componentType === 'Paragraph') {
      TextComponent = blockquote ? 'blockquote' : 'div';
    } else if (componentType === 'Title') {
      TextComponent = `h${heading}`;
    } else if (componentType === 'Text') {
      TextComponent = ellipsis ? 'div' : 'span';
    }

    return (
      <TextComponent
        className={cs(prefixCls, componentClassName, className)}
        {...baseProps}
        {...omit(rest, [
          'spacing',
          'type',
          'close',
          'bold',
          'disabled',
          'mark',
          'underline',
          'delete',
          'code',
          'copyable',
          'isEllipsis',
          'expanding',
          'onClickExpand',
          'setEditing',
          'forceShowExpand',
        ])}
      >
        {renderInnerContent()}
      </TextComponent>
    );
  }

  return (
    <ResizeObserver onResize={resizeOnNextFrame}>
      {mergedEditing ? (
        <EditContent
          {...props}
          prefixCls={prefixCls}
          setEditing={setEditing}
          editableConfig={editableConfig}
        />
      ) : (
        renderContent()
      )}
    </ResizeObserver>
  );
}

export default Base;
