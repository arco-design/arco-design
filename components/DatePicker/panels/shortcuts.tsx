import React, { forwardRef } from 'react';
import { ShortcutsProps, ShortcutType } from '../interface';
import Button from '../../Button';
import { isArray, isDayjs } from '../../_util/is';
import { isDisabledDate } from '../util';

function Shortcuts(props: ShortcutsProps, ref) {
  const {
    prefixCls,
    shortcuts = [],
    onSelectNow,
    nowText,
    showNowBtn,
    showTime,
    onMouseEnterShortcut,
    onMouseLeaveShortcut,
    nowDisabled,
    disabledDate,
    mode = 'date',
  } = props;

  function onMouseEnter(shortcut) {
    onMouseEnterShortcut && onMouseEnterShortcut(shortcut);
  }

  function onMouseLeave(shortcut) {
    onMouseLeaveShortcut && onMouseLeaveShortcut(shortcut);
  }

  function onClick(shortcut: ShortcutType, e) {
    const { onSelectShortcut } = props;
    if (getShortcutDisabled(shortcut)) {
      return;
    }
    onSelectShortcut && onSelectShortcut(shortcut, e);
  }

  function getShortcutDisabled(shortcut: ShortcutType) {
    const shortcutValue = typeof shortcut.value === 'function' && shortcut.value();

    if (isDayjs(shortcutValue)) {
      return isDisabledDate(shortcutValue, disabledDate, mode);
    }

    if (isArray(shortcutValue)) {
      return shortcutValue.some(
        (item) => isDayjs(item) && isDisabledDate(item, disabledDate, mode)
      );
    }

    return false;
  }

  const hasShortcuts = isArray(shortcuts) && shortcuts.length > 0;
  const shouldShowNowBtn = showNowBtn && showTime && !hasShortcuts;

  return (
    <div ref={ref} className={`${prefixCls}-shortcuts`}>
      {shouldShowNowBtn && (
        <Button size="mini" disabled={nowDisabled} onClick={onSelectNow}>
          {nowText}
        </Button>
      )}
      {hasShortcuts &&
        shortcuts.map((shortcut, index) => {
          const disabled = getShortcutDisabled(shortcut);
          return (
            <Button
              key={index}
              size="mini"
              disabled={disabled}
              onMouseEnter={() => onMouseEnter(shortcut)}
              onMouseLeave={() => onMouseLeave(shortcut)}
              onClick={(e) => onClick(shortcut, e)}
            >
              {shortcut.text}
            </Button>
          );
        })}
    </div>
  );
}

export default forwardRef(Shortcuts);
