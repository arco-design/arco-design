import React, { useState, useContext, useRef, PropsWithChildren } from 'react';
import useIsomorphicLayoutEffect from '../_util/hooks/useIsomorphicLayoutEffect';
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
import useResizeObserver from '../_util/hooks/useResizeObserver';
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
    copyable,
    ...rest
  } = props;
  const configContext = useContext(ConfigContext);
  const { getPrefixCls } = configContext;
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

  const editableConfig = isObject(editable) ? editable : {};
  const mergedEditing = 'editing' in editableConfig ? editableConfig.editing : editing;

  const ellipsisConfig: EllipsisConfig = ellipsis
    ? { rows: 1, ellipsisStr: '...', cssEllipsis: true, ...(isObject(ellipsis) ? ellipsis : {}) }
    : {};

  function canSimpleEllipsis() {
    const { rows, ellipsisStr, suffix, onEllipsis, expandable, cssEllipsis } = ellipsisConfig;
    if (!cssEllipsis) {
      return;
    }
    if (suffix || ellipsisStr !== '...') return;
    if (onEllipsis || expandable || onEllipsis) return;
    if (editable || copyable) return;
    return rows === 1;
  }

  const simpleEllipsis = canSimpleEllipsis();

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
          // 如果是镜像dom的话，渲染在最外层，无法从context中拿到最新config
          currentContext={configContext}
        />
      </>
    );
  }

  function onClickExpand() {
    setExpanding(!expanding);
    ellipsisConfig.onExpand && ellipsisConfig.onExpand(!expanding);
  }

  const resizeOnNextFrame = () => {
    caf(rafId.current);
    rafId.current = raf(() => {
      calcEllipsis();
    });
  };

  const { cor, dor, currentOr } = useResizeObserver(resizeOnNextFrame);

  useIsomorphicLayoutEffect(() => {
    if (!currentOr) {
      resizeOnNextFrame();
    }
  }, [currentOr]);

  useUpdateEffect(() => {
    ellipsisConfig.onEllipsis && ellipsisConfig.onEllipsis(isEllipsis);
  }, [isEllipsis]);

  useIsomorphicLayoutEffect(() => {
    if (componentRef.current) {
      cor(componentRef.current);
    }
    return () => {
      dor();
      caf(rafId.current);
    };
  }, [
    children,
    expanding,
    isEllipsis,
    editing,
    ellipsisConfig.suffix,
    ellipsisConfig.ellipsisStr,
    ellipsisConfig.expandable,
    ellipsisConfig.expandNodes,
    ellipsisConfig.rows,
    ellipsisConfig.cssEllipsis,
  ]);

  function calcEllipsis() {
    const currentEllipsis = isEllipsis;
    if (editing) {
      return;
    }
    if (ellipsisConfig.rows) {
      // In ellipsis mode, if the user manually expands, there is no need to calculate ellipsis and ellipsisText;
      if (expanding) {
        return;
      }
      setMeasuring(true);
      const { ellipsis, text } = measure(
        componentRef.current,
        ellipsisConfig,
        renderOperations(!!ellipsisConfig.expandable),
        children,
        simpleEllipsis
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

    const addTooltip = isEllipsis && showTooltip && !expanding;

    function renderInnerContent() {
      const text = isEllipsis && !expanding ? ellipsisText : children;
      const innerText = component.length ? wrap(text, component, props) : text;

      return (
        <>
          {addTooltip ? <span>{innerText}</span> : innerText}
          {measuring || (isEllipsis && !expanding && !simpleEllipsis) ? ellipsisStr : null}
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

    const node = (
      <TextComponent
        className={cs(
          prefixCls,
          { [`${prefixCls}-simple-ellipsis`]: simpleEllipsis },
          componentClassName,
          className
        )}
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

    if (addTooltip) {
      return (
        <TooltipComponent content={fullText} {...tooltipProps}>
          {node}
        </TooltipComponent>
      );
    }

    return node;
  }

  return mergedEditing ? (
    <EditContent
      {...props}
      prefixCls={prefixCls}
      setEditing={setEditing}
      editableConfig={editableConfig}
    />
  ) : (
    renderContent()
  );
}

export default Base;
