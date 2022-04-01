import React, { ReactNode } from 'react';
import IconClose from '../../../icon/react-icon/IconClose';
import cs from '../../_util/classNames';
import IconHover from '../../_class/icon-hover';
import { isFunction } from '../../_util/is';

const TabHeaderTitle = (
  {
    prefixCls,
    onDeleteTab,
    tabKey,
    isActive,
    onClickTab,
    disabled = false,
    title,
    editable,
    renderTitle,
    deleteIcon,
    deleteButton,
    getIdPrefix,
    index,
  },
  ref
) => {
  const render = isFunction(renderTitle)
    ? renderTitle
    : (node: ReactNode) => {
        return node;
      };
  return render(
    <div
      ref={ref}
      key={tabKey}
      className={cs(`${prefixCls}-header-title`, {
        [`${prefixCls}-header-title-active`]: isActive,
        [`${prefixCls}-header-title-editable`]: editable,
        [`${prefixCls}-header-title-disabled`]: disabled,
      })}
      onClick={(e) => {
        if (disabled) return;
        onClickTab(e);
      }}
    >
      <span
        className={`${prefixCls}-header-title-text`}
        role="tab"
        aria-selected={isActive}
        aria-disabled={disabled || undefined}
        id={getIdPrefix(index).tab}
        aria-controls={getIdPrefix(index).tabpane}
      >
        {title}
      </span>
      {editable && (
        <span
          role="button"
          aria-label="remove tab"
          aria-disabled={disabled || undefined}
          tabIndex={disabled ? -1 : 0}
          className={`${prefixCls}-close-icon`}
          onClick={(e) => {
            e.stopPropagation();
            if (disabled) return;

            onDeleteTab(e);
          }}
        >
          {deleteButton || <IconHover prefix={prefixCls}>{deleteIcon || <IconClose />}</IconHover>}
        </span>
      )}
    </div>,
    {
      key: tabKey,
      isActive,
      disabled,
      editable,
    }
  );
};

export default React.forwardRef(TabHeaderTitle);
