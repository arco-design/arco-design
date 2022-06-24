import { createContext } from 'react';
import { MenuProps } from './interface';

export type HotkeyInfo = {
  update: boolean;
  activeKeyPath: string[];
  type: 'sibling' | 'generation' | 'enter';
};

export type ResetHotkeyInfo = (activeKey?: string) => void;

const MenuContext = createContext<
  Pick<
    MenuProps,
    | 'mode'
    | 'theme'
    | 'collapse'
    | 'levelIndent'
    | 'inDropdown'
    | 'selectedKeys'
    | 'openKeys'
    | 'icons'
    | 'triggerProps'
    | 'tooltipProps'
    | 'autoScrollIntoView'
    | 'scrollConfig'
  > & {
    id?: string;
    prefixCls?: string;
    onClickMenuItem?: (key: string, event) => void;
    onClickSubMenu?: (key: string, level: number, type: 'pop' | 'inline') => void;
    collectInlineMenuKeys?: (key: string, unmount?: boolean) => void;
  }
>({});

export default MenuContext;
