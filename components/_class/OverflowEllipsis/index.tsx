import React, { ReactNode, useLayoutEffect, useState, useContext, ReactElement } from 'react';
import ResizeObserver from '../../_util/resizeObserver';
import OverflowItem from './OverflowItem';
import cs from '../../_util/classNames';
import { ConfigContext } from '../../ConfigProvider';

interface OverflowEllipsisProps {
  className?: string | string[];
  items: (ReactElement | ReactNode)[];
  suffixItems: (ReactElement | ReactNode)[];
  ellipsisNode?: (info: { ellipsisCount: number }) => ReactNode;
}

export default function OverflowEllipsis(props: OverflowEllipsisProps) {
  const { getPrefixCls } = useContext(ConfigContext);
  const prefixCls = getPrefixCls('overflow');

  const { items, suffixItems } = props;
  const ellipsisNode = props.ellipsisNode || (({ ellipsisCount }) => `+${ellipsisCount}`);

  const [containerWidth, setContainerWidth] = useState<number>();
  const [maxCount, setMaxCount] = useState<number>();

  const [overflowItems, setOverflowItems] = useState<{
    [key: string]: {
      node: HTMLDivElement;
      width: number;
    };
  }>({});

  const [suffixOverflowItems, setSuffixOverflowItems] = useState<{
    [key: string]: {
      node: HTMLDivElement;
      width: number;
    };
  }>({});

  const ellipsisCount = items.length - maxCount;

  const maxTag = ellipsisCount > 0 ? ellipsisNode({ ellipsisCount }) : null;

  useLayoutEffect(() => {
    const total = Object.values(overflowItems).length;

    let totalWidth = Object.values(suffixOverflowItems).reduce((t, n) => {
      return t + (n?.width || 0);
    }, 0);

    let newMaxCount = total;

    Object.keys(overflowItems).some((key, index) => {
      const target = overflowItems[key];

      if (target && totalWidth + target.width > containerWidth) {
        newMaxCount = index;
        return true;
      }
      totalWidth += target?.width || 0;
    });

    setMaxCount(Math.max(newMaxCount, 0));
  }, [overflowItems, containerWidth, suffixOverflowItems]);

  return (
    <ResizeObserver
      onResize={(entry) => {
        setContainerWidth(entry?.[0]?.target.clientWidth || 0);
      }}
    >
      <div className={cs(prefixCls, props.className)}>
        {items.map((item, index) => {
          const key = `${(item as ReactElement)?.key || index}_overflow_item`;
          return (
            <OverflowItem
              key={key}
              onResize={(node) => {
                setOverflowItems((overflowItems) => {
                  overflowItems[key] = { node, width: node.clientWidth };
                  return overflowItems;
                });
              }}
              unregister={() => {
                setOverflowItems((overflowItems) => {
                  delete overflowItems[key];
                  return overflowItems;
                });
              }}
              hidden={maxCount < index + 1}
            >
              {item}
            </OverflowItem>
          );
        })}
        {[maxTag, ...suffixItems].map((item: JSX.Element, index) => {
          if (!item) {
            return null;
          }
          const key = `${item?.key || index}_overflow_suffix_item`;
          return (
            <OverflowItem
              key={key}
              className={`${prefixCls}-suffix-item`}
              onResize={(node) => {
                setSuffixOverflowItems((suffixOverflowItems) => {
                  return {
                    ...suffixOverflowItems,
                    [`${key}`]: { node, width: node.clientWidth },
                  };
                });
              }}
              unregister={() => {
                setSuffixOverflowItems((suffixOverflowItems) => {
                  delete suffixOverflowItems[key];
                  return {
                    ...suffixOverflowItems,
                  };
                });
              }}
            >
              {item}
            </OverflowItem>
          );
        })}
      </div>
    </ResizeObserver>
  );
}
