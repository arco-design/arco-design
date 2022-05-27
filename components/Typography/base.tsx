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
import useMergeValue from '../_util/hooks/useMergeValue';

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
  const [ellipsisText, setEllipsisText] = useState<string>('');
  const [measuring, setMeasuring] = useState(false);

  const componentRef = useRef(null);
  const textWrapperRef = useRef(null);

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
  const [expanding, setExpanding] = useMergeValue<boolean>(false, {
    defaultValue: ellipsisConfig.defaultExpanded,
    value: ellipsisConfig.expanded,
  });

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

  function onClickExpand(e) {
    setExpanding(!expanding);
    props.onClickExpand && props.onClickExpand(e);
    ellipsisConfig.onExpand && ellipsisConfig.onExpand(!expanding, e);
  }

  const resizeOnNextFrame = () => {
    caf(rafId.current);
    rafId.current = raf(() => {
      calcEllipsis();
    });
  };

  const { cor, dor } = useResizeObserver(resizeOnNextFrame);

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
    editing,
    ellipsisConfig.suffix,
    ellipsisConfig.ellipsisStr,
    ellipsisConfig.expandable,
    ellipsisConfig.expandNodes,
    ellipsisConfig.rows,
    ellipsisConfig.cssEllipsis,
  ]);

  function calcEllipsis() {
    if (editing) {
      return;
    }
    if (ellipsisConfig.rows) {
      setMeasuring(true);
      const { ellipsis, text } = measure(
        textWrapperRef.current || componentRef.current,
        ellipsisConfig,
        renderOperations(!!ellipsisConfig.expandable),
        children,
        // expanding 情况下只需要判断原空间是否足够，不用计算折叠临界值，
        simpleEllipsis || expanding
      );
      setMeasuring(false);
      if (ellipsis && text) {
        setEllipsisText(text);
      }
      setEllipsis(ellipsis);
    } else {
      const isEllipsis = !!ellipsisConfig.rows;
      setEllipsis(isEllipsis);
    }
  }

  function wrap(content, component, props) {
    let currentContent = content;
    // 折叠计算前把行内元素改为块级元素。
    const ellipsisStyle = ellipsisConfig.rows && !simpleEllipsis ? { display: 'block' } : {};
    component.forEach((c, index) => {
      const _props =
        isObject(props.mark) && props.mark.color
          ? { style: { backgroundColor: props.mark.color, ...ellipsisStyle } }
          : { style: ellipsisStyle };
      // The parent node of the text will affect the style of the mirror dom
      const _ref = index === 0 ? { ref: textWrapperRef } : {};
      currentContent = React.createElement(c, { ..._props, ..._ref }, currentContent);
    });
    return currentContent;
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

      if (ellipsisConfig.rows && !simpleEllipsis && component.length) {
        const node = (
          <>
            {addTooltip ? <span>{text}</span> : text}
            {measuring || (isEllipsis && !expanding && !simpleEllipsis) ? ellipsisStr : null}
            {suffix}
            {renderOperations(measuring ? !!ellipsisConfig.expandable : undefined)}
          </>
        );
        return wrap(node, component, props);
      }

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
          { [`${prefixCls}-simple-ellipsis`]: simpleEllipsis && !expanding },
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
