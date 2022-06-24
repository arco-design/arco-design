import React, { ReactNode } from 'react';
import IconClose from '../../../icon/react-icon/IconClose';
import cs from '../../_util/classNames';
import IconHover from '../../_class/icon-hover';
import { isFunction } from '../../_util/is';
import { getKeyDownEvent } from '../utils';
import { Enter } from '../../_util/keycode';

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

  const handleDeleteTab = (e) => {
    e.stopPropagation();
    if (disabled) return;
    onDeleteTab();
  };

  const handleTabClick = (e) => {
    if (disabled) return;
    onClickTab(e);
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
      role="tab"
      aria-selected={isActive}
      tabIndex={disabled ? -1 : 0}
      aria-disabled={disabled || undefined}
      id={getIdPrefix(index).tab}
      aria-controls={getIdPrefix(index).tabpane}
      onClick={handleTabClick}
      onKeyDown={(event) => {
        const keyCode = event.keyCode || event.which;
        if (keyCode === Enter.code) {
          handleTabClick(event);
        }
      }}
    >
      <span className={`${prefixCls}-header-title-text`}>{title}</span>
      {editable && (
        <span
          role="button"
          aria-label="remove tab"
          aria-disabled={disabled || undefined}
          tabIndex={disabled ? -1 : 0}
          className={`${prefixCls}-close-icon`}
          {...getKeyDownEvent({ onPressEnter: handleDeleteTab })}
          onClick={handleDeleteTab}
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
