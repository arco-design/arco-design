import React, { useState, useContext, PropsWithChildren, useRef } from 'react';
import { ConfigContext } from '../ConfigProvider';
import ResizeObserverComponent from '../_util/resizeObserver';
import {
  TypographyParagraphProps,
  TypographyTitleProps,
  TypographyTextProps,
  EllipsisConfig,
} from './interface';
import Operations from './operations';
import cs from '../_util/classNames';
import EditContent from './edit-content';
import { isObject, isUndefined } from '../_util/is';
import Tooltip from '../Tooltip';
import Popover from '../Popover';
import omit from '../_util/omit';
import useUpdateEffect from '../_util/hooks/useUpdate';
import mergedToString from '../_util/mergedToString';
import useMergeValue from '../_util/hooks/useMergeValue';
import useEllipsis, { MEASURE_STATUS } from './useEllipsis';
import useCssEllipsis from './useCssEllipsis';

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
    ...rest
  } = props;
  const configContext = useContext(ConfigContext);
  const { getPrefixCls, rtl } = configContext;
  const prefixCls = getPrefixCls('typography');

  const { component, className: componentClassName } = getClassNameAndComponentName(
    props,
    prefixCls
  );

  const [editing, setEditing] = useState<boolean>(false);
  const [width, setWidth] = useState(0);
  const resizeTime = useRef(0);
  const editableConfig = isObject(editable) ? editable : {};
  const mergedEditing = 'editing' in editableConfig ? editableConfig.editing : editing;

  const ellipsisConfig: EllipsisConfig = ellipsis
    ? { rows: 1, ellipsisStr: '...', cssEllipsis: false, ...(isObject(ellipsis) ? ellipsis : {}) }
    : {};

  const EllipsisWrapperTag = ellipsisConfig.wrapper || React.Fragment;
  const [expanding, setExpanding] = useMergeValue<boolean>(false, {
    defaultValue: ellipsisConfig.defaultExpanded,
    value: ellipsisConfig.expanded,
  });

  const { simpleEllipsis, ellipsisStyle } = useCssEllipsis(ellipsisConfig);
  const renderMeasureContent = (node, isEllipsis) => {
    const ellipsisStr = !isUndefined(ellipsisConfig.ellipsisStr)
      ? ellipsisConfig.ellipsisStr
      : '...';
    const suffix = !isUndefined(ellipsisConfig.suffix) && ellipsisConfig.suffix;
    return (
      <EllipsisWrapperTag>
        {node}
        {isEllipsis && !expanding && !simpleEllipsis ? ellipsisStr : ''}
        {suffix}
        {renderOperations(isEllipsis)}
      </EllipsisWrapperTag>
    );
  };

  const { ellipsisNode, isEllipsis, measureStatus } = useEllipsis({
    ...ellipsisConfig,
    children,
    expanding,
    width,
    renderMeasureContent,
    simpleEllipsis: simpleEllipsis || expanding,
  });

  const handleResize = (entry) => {
    const { contentRect } = entry?.[0];
    const currentTime = +new Date();
    const diffTime = currentTime - resizeTime.current;
    if (contentRect) {
      const currentWidth = component.includes('code') ? contentRect.width - 18 : contentRect.width;

      const resizeStatus = [MEASURE_STATUS.NO_NEED_ELLIPSIS, MEASURE_STATUS.MEASURE_END];
      // 在 table 中，使用了 cssEllipsis 因为 white-space: "nowrap"，宽度会突然变很大
      // 导致再次触发 resize 计算，进入循环。
      // diffTime 应对短时间内多次触发
      if (resizeStatus.includes(measureStatus) && diffTime > 100) {
        resizeTime.current = currentTime;
        setWidth(currentWidth);
      }
    }
  };

  function renderOperations(isEllipsis?: boolean) {
    return (
      <>
        <Operations
          {...props}
          setEditing={setEditing}
          onClickExpand={onClickExpand}
          expanding={expanding}
          isEllipsis={isEllipsis}
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

  useUpdateEffect(() => {
    ellipsisConfig.onEllipsis && ellipsisConfig.onEllipsis(isEllipsis);
  }, [isEllipsis]);

  function wrap(content, component, props, innerProps = {}) {
    let currentContent = content;
    component.forEach((c, _index) => {
      const _innerProps = _index === 0 ? innerProps : {};
      const _props =
        isObject(props.mark) && props.mark.color
          ? { style: { backgroundColor: props.mark.color }, ..._innerProps }
          : { ..._innerProps };
      currentContent = React.createElement(c, { ..._props }, currentContent);
    });
    return currentContent;
  }

  let TextComponent;
  if (componentType === 'Paragraph') {
    TextComponent = blockquote ? 'blockquote' : 'div';
  } else if (componentType === 'Title') {
    TextComponent = `h${heading}`;
  } else if (componentType === 'Text') {
    TextComponent = ellipsis ? 'div' : 'span';
  }

  function renderContent() {
    const fullText = mergedToString(React.Children.toArray(children));
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
      style,
      ...titleProps,
    };

    const addTooltip = isEllipsis && showTooltip && !expanding;

    const node = (
      <ResizeObserverComponent onResize={handleResize}>
        <TextComponent
          className={cs(prefixCls, componentClassName, { [`${prefixCls}-rtl`]: rtl }, className)}
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
          {/* MEASURE_STATUS.INIT stage is to judge whether the current space is enough */}
          {/* So this stage has to render everything */}
          {simpleEllipsis && measureStatus !== MEASURE_STATUS.INIT && !expanding && isEllipsis
            ? wrap(
                // CSS folding style, need to wrap the text separately.
                renderMeasureContent(<span style={ellipsisStyle}>{children}</span>, isEllipsis),
                component.length ? component : ['span'],
                props,
                // The simple-ellipsis class ensures that the ReactNode after the text is displayed correctly (no line breaks)
                // Need to act on the immediate parent node of the text
                { className: `${prefixCls}-simple-ellipsis` }
              )
            : wrap(ellipsisNode, component, props)}
        </TextComponent>
      </ResizeObserverComponent>
    );

    if (addTooltip) {
      return (
        <TooltipComponent content={fullText} {...tooltipProps}>
          <span>{node}</span>
        </TooltipComponent>
      );
    }

    return node;
  }

  return mergedEditing ? (
    <EditContent
      {...props}
      className={cs(
        prefixCls,
        componentClassName,
        { [`${prefixCls}-rtl`]: rtl },
        `${prefixCls}-${TextComponent}`,
        className
      )}
      prefixCls={prefixCls}
      setEditing={setEditing}
      editableConfig={editableConfig}
    />
  ) : (
    renderContent()
  );
}

export default Base;
