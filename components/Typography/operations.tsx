import React, { useState, useRef, useEffect, PropsWithChildren } from 'react';
import useKeyboardEvent from '../_util/hooks/useKeyboardEvent';
import Tooltip from '../Tooltip';
import { isObject, isArray } from '../_util/is';
import copy from '../_util/clipboard';
import IconCopy from '../../icon/react-icon/IconCopy';
import IconCheckCircleFill from '../../icon/react-icon/IconCheckCircleFill';
import IconEdit from '../../icon/react-icon/IconEdit';
import { OperationsProps } from './interface';
import mergedToString from '../_util/mergedToString';

export default function Operations(props: PropsWithChildren<OperationsProps>) {
  const {
    children,
    copyable,
    editable,
    ellipsis,
    expanding,
    setEditing,
    onClickExpand,
    forceShowExpand,
    isEllipsis,
    currentContext = {},
  } = props;

  const getEventListeners = useKeyboardEvent();

  const { getPrefixCls, locale } = currentContext;

  const prefixCls = getPrefixCls('typography');

  const [isCopied, setCopied] = useState(false);
  const copyTimer = useRef(null);

  const copyConfig = isObject(copyable) ? copyable : {};
  const ellipsisConfig = isObject(ellipsis) ? ellipsis : {};
  const editableConfig = isObject(editable) ? editable : {};

  const expandNodes = isArray(ellipsisConfig.expandNodes)
    ? ellipsisConfig.expandNodes
    : [locale.Typography.fold, locale.Typography.unfold];

  useEffect(() => {
    return () => {
      clearTimeout(copyTimer.current);
      copyTimer.current = null;
    };
  }, []);

  function onClickCopy(e) {
    if (isCopied) return;
    const text = copyConfig.text !== undefined ? copyConfig.text : mergedToString(children);
    copy(text);
    setCopied(true);
    copyConfig.onCopy && copyConfig.onCopy(text, e);

    copyTimer.current = setTimeout(() => {
      setCopied(false);
    }, 3000);
  }

  const onClickEdit = (e) => {
    editableConfig.onStart && editableConfig.onStart(mergedToString(children), e);
    setEditing(true);
  };

  const tooltips = copyConfig.tooltips || [locale.Typography.copy, locale.Typography.copied];
  const copyElement = copyable && (
    <Tooltip content={isCopied ? tooltips[1] : tooltips[0]} {...copyConfig.tooltipProps}>
      <span
        className={isCopied ? `${prefixCls}-operation-copied` : `${prefixCls}-operation-copy`}
        onClick={onClickCopy}
        role="button"
        aria-label={tooltips[0]}
        tabIndex={0}
        {...getEventListeners({
          onPressEnter: onClickCopy,
        })}
      >
        {isCopied ? <IconCheckCircleFill /> : copyConfig.icon || <IconCopy />}
      </span>
    </Tooltip>
  );

  const editElement = editable && (
    <Tooltip content={locale.Typography.edit} {...editableConfig.tooltipProps}>
      <span
        tabIndex={0}
        aria-label={locale.Typography.edit}
        role="button"
        className={`${prefixCls}-operation-edit`}
        onClick={onClickEdit}
        {...getEventListeners({
          onPressEnter: onClickEdit,
        })}
      >
        <IconEdit />
      </span>
    </Tooltip>
  );

  const ellipsisElement =
    forceShowExpand || (ellipsisConfig.expandable && isEllipsis) ? (
      <a
        className={`${prefixCls}-operation-expand`}
        onClick={onClickExpand}
        role="button"
        tabIndex={0}
        aria-label={locale.Typography.unfold}
        {...getEventListeners({
          onPressEnter: onClickExpand,
        })}
      >
        {expanding ? expandNodes[0] : expandNodes[1]}
      </a>
    ) : null;

  return (
    <>
      {ellipsisElement}
      {editElement}
      {copyElement}
    </>
  );
}
