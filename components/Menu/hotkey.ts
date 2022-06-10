import { useContext, useEffect, useState } from 'react';
import MenuContext, { HotkeyInfo } from './context';
import useIsFirstRender from '../_util/hooks/useIsFirstRender';
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUp, Enter, Esc } from '../_util/keycode';
import { MenuInfo } from './util';
import { MenuProps } from './interface';

const INITIAL_HOTKEY_INFO: HotkeyInfo = {
  type: null,
  update: false,
  activeKeyPath: [],
};

export const useHotkeyListener = ({
  menuInfoMap,
  openKeys,
  selectedKeys,
  needPause,
}: {
  menuInfoMap: { [key: string]: MenuInfo };
  needPause?: () => boolean;
} & Pick<MenuProps, 'openKeys' | 'selectedKeys'>) => {
  const [hotkeyInfo, setHokeyInfo] = useState<HotkeyInfo>(INITIAL_HOTKEY_INFO);

  return {
    reset: (activeKey?: string) => {
      const keyPath = activeKey && menuInfoMap[activeKey]?.keyPath;
      setHokeyInfo({ ...INITIAL_HOTKEY_INFO, activeKeyPath: keyPath || [] });
    },
    hotkeyInfo,
    listener: (event) => {
      if (typeof needPause === 'function' && needPause()) {
        return;
      }

      const keyCode = event.keyCode || event.which;
      const activeKey = hotkeyInfo.activeKeyPath[0] || (selectedKeys && selectedKeys[0]);

      // 快捷键操作时，阻止页面滚动
      if (keyCode === ArrowUp.code || keyCode === ArrowDown.code) {
        event.preventDefault();
      }

      // 没有 active 状态的菜单项时返回
      if (!menuInfoMap[activeKey]) {
        if ([ArrowUp.code, ArrowDown.code, ArrowLeft.code, ArrowRight.code].indexOf(keyCode) > -1) {
          const activeKey = Object.keys(menuInfoMap)[0];
          setHokeyInfo({
            ...hotkeyInfo,
            update: false,
            activeKeyPath: menuInfoMap[activeKey].keyPath,
          });
        }

        return;
      }

      const walkSiblings = (reverse?: boolean) => {
        const getKeyNext = (base: string) => {
          const { firstChild, next, keyPath } = menuInfoMap[base];

          const getParentNext = (keyPath) => {
            const parent = keyPath[1] && menuInfoMap[keyPath[1]];
            if (parent) {
              return parent.next || getParentNext(parent.keyPath);
            }
          };

          return firstChild && openKeys.indexOf(base) > -1
            ? firstChild
            : next || getParentNext(keyPath);
        };

        const getKeyPrev = (base: string) => {
          let result = null;
          const { prev, keyPath } = menuInfoMap[base];

          if (prev) {
            result = prev;
            let info = menuInfoMap[prev];
            while (info.lastChild && openKeys.indexOf(result) > -1) {
              result = info.lastChild;
              info = menuInfoMap[info.lastChild];
            }
          } else {
            result = keyPath[1];
          }

          return result;
        };

        const getNewActiveKey = reverse ? getKeyPrev : getKeyNext;

        let newActiveKey = getNewActiveKey(activeKey);
        let newActiveItemInfo = menuInfoMap[newActiveKey];
        while (newActiveItemInfo && newActiveItemInfo.disabled) {
          newActiveKey = getNewActiveKey(newActiveKey);
          newActiveItemInfo = menuInfoMap[newActiveKey];
        }

        if (newActiveItemInfo) {
          setHokeyInfo({
            type: 'sibling',
            update: false,
            activeKeyPath: newActiveItemInfo.keyPath,
          });
        }
      };

      const walkGenerations = (reverse?: boolean) => {
        const activeItemInfo = menuInfoMap[activeKey];
        if (activeItemInfo) {
          const newActiveKey = reverse ? activeItemInfo.keyPath[1] : activeItemInfo.firstChild;
          const newActiveItemInfo = menuInfoMap[newActiveKey];

          if (newActiveItemInfo) {
            setHokeyInfo({
              type: 'generation',
              update: true,
              activeKeyPath: newActiveItemInfo.keyPath,
            });
          }
        }
      };

      switch (keyCode) {
        case ArrowUp.code:
          walkSiblings(true);
          break;
        case ArrowDown.code:
          walkSiblings();
          break;
        case ArrowLeft.code:
          walkGenerations(true);
          break;
        case ArrowRight.code:
          walkGenerations();
          break;
        case Enter.code:
          setHokeyInfo({
            ...hotkeyInfo,
            type: 'enter',
            update: true,
          });
          break;
        case Esc.code:
          setHokeyInfo(INITIAL_HOTKEY_INFO);
          break;
        default:
      }
    },
  };
};

export const useHotkeyHandler = (
  key: string,
  handler: (isActive: boolean, type: HotkeyInfo['type']) => void
): boolean => {
  const { hotkeyInfo } = useContext(MenuContext);
  const isFirstRender = useIsFirstRender();
  const isActive = key && key === hotkeyInfo.activeKeyPath[0];

  useEffect(() => {
    if (!isFirstRender && hotkeyInfo.update) {
      handler(isActive, hotkeyInfo.type);
    }
  }, [hotkeyInfo]);

  return isActive;
};
