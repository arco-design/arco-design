import React, { forwardRef } from 'react';
import { ShortcutsProps, ShortcutType } from '../interface';
import Button from '../../Button';
import { isArray } from '../../_util/is';

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
  } = props;

  function onMouseEnter(shortcut) {
    onMouseEnterShortcut && onMouseEnterShortcut(shortcut);
  }

  function onMouseLeave(shortcut) {
    onMouseLeaveShortcut && onMouseLeaveShortcut(shortcut);
  }

  function onClick(shortcut: ShortcutType, e) {
    const { onSelectShortcut } = props;
    onSelectShortcut && onSelectShortcut(shortcut, e);
  }

  const hasShortcuts = isArray(shortcuts) && shortcuts.length > 0;
  const shouldShowNowBtn = showNowBtn && showTime && !hasShortcuts;

  return (
    <div ref={ref} className={`${prefixCls}-shortcuts`}>
      {shouldShowNowBtn && (
        <Button size="mini" onClick={onSelectNow}>
          {nowText}
        </Button>
      )}
      {hasShortcuts &&
        shortcuts.map((shortcut, index) => {
          return (
            <Button
              key={index}
              size="mini"
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
