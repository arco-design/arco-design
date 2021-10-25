import pick from './pick';

export const NOOP = () => {};

export function newArray(length: number) {
  return Array.apply(null, Array(length));
}

export function pickTriggerPropsFromRest(rest) {
  return pick(rest, [
    'onMouseEnter',
    'onMouseLeave',
    'onMouseMove',
    'onContextMenu',
    'onClick',
    'onFocus',
    'onBlur',
    'tabIndex',
  ]);
}
