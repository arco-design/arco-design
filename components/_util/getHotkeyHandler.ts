export interface Key {
  /** Keyboard key code */
  code: number;
  /** Ctrl / ⌃ */
  ctrl?: boolean;
  /** Shift key */
  shift?: boolean;
  /** Alt / ⌥ */
  alt?: boolean;
  /** meta ⌘ / ⊞ */
  meta?: boolean;
}

const stringifyHotkey = (k: Key) => {
  return JSON.stringify({
    code: k.code,
    ctrl: !!k.ctrl,
    shift: !!k.shift,
    alt: !!k.alt,
    meta: !!k.meta,
  });
};

/**
 * @param hotkeyMap - 快捷键描述对象
 */
export default function getHotkeyHandler(
  hotkeyMap: Map<Key | number, Function>
): (event: KeyboardEvent) => void {
  const map = {};
  hotkeyMap.forEach((callback, hotkey) => {
    hotkey = typeof hotkey === 'number' ? { code: hotkey } : hotkey;
    map[stringifyHotkey(hotkey)] = callback;
  });

  return (event: KeyboardEvent): void => {
    const key = stringifyHotkey({
      code: event.keyCode || event.which,
      ctrl: !!event.ctrlKey,
      shift: !!event.shiftKey,
      alt: !!event.altKey,
      meta: !!event.metaKey,
    });
    const callback = map[key];

    if (callback) {
      event.stopPropagation();
      if (callback(event) === false) {
        event.preventDefault();
      }
    }
  };
}
