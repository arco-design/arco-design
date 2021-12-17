import React, {
  useState,
  useEffect,
  useRef,
  useContext,
  forwardRef,
  useImperativeHandle,
} from 'react';
import { SplitGroupProps, CollapsedConfig } from './interface';
import { ConfigContext } from '../ConfigProvider';
import cs from '../_util/classNames';
import { isFunction, isNumber, isUndefined, isObject } from '../_util/is';
import ResizeTrigger from './resize-trigger';
import { on, off } from '../_util/dom';

const DIRECTION_HORIZONTAL = 'horizontal';
const DIRECTION_VERTICAL = 'vertical';

function SplitGroup(props: SplitGroupProps, ref) {
  const { panes, style, className, component = 'div', direction = 'horizontal', icon } = props;
  const { getPrefixCls } = useContext(ConfigContext);
  const defaultOffset = 1 / panes.length;

  const wrapperRef = useRef<HTMLElement>();
  const recordRef = useRef<Array<{ moving: boolean; startOffset: number; startPosition: number }>>(
    new Array(panes.length).fill({
      moving: false,
      startOffset: 0,
      startPosition: 0,
    })
  );
  const paneContainers = useRef<HTMLElement[]>([]);
  const movingIndex = useRef<number>(0);
  const prevOffsets = useRef<number[]>([]);

  const [offsets, setOffsets] = useState<number[]>(new Array(panes.length).fill(defaultOffset));
  const [isMoving, setIsMoving] = useState(false);
  const [triggerSize, setTriggerSize] = useState<number[]>(new Array(panes.length).fill(0));
  const [collapsedStatus, setCollapsedStatus] = useState<{ prev: boolean; next: boolean }[]>(
    new Array(Math.max(panes.length - 1, 0)).fill({ prev: false, next: false })
  );

  const prefixCls = getPrefixCls('resizebox-split-group');
  const isHorizontal = direction === DIRECTION_HORIZONTAL;
  const isTriggerHorizontal = !isHorizontal;

  const classNames = cs(
    prefixCls,
    `${prefixCls}-${isHorizontal ? DIRECTION_HORIZONTAL : DIRECTION_VERTICAL}`,
    { [`${prefixCls}-moving`]: isMoving },
    className
  );
  const Tag = component as any;

  // 获取初始的 offset, 将传入的size 都转为像素值。
  const getInitialOffsets = () => {
    const totalPx = isHorizontal ? wrapperRef.current.offsetWidth : wrapperRef.current.offsetHeight;
    let newOffsets = [];
    panes.forEach((pane) => {
      const { size } = pane;
      if (!isUndefined(size)) {
        newOffsets.push(formatSize(size));
      } else {
        newOffsets.push(undefined);
      }
    });
    // 剩余的空间均分给没有设置 size 的面板
    const noSizeArr = newOffsets.filter((size) => !size);
    const remainPx =
      totalPx -
      newOffsets.reduce((a, b) => {
        const formatA = a || 0;
        const formatB = b || 0;
        return formatA + formatB;
      }, 0);

    const averagePx = remainPx / noSizeArr.length;
    newOffsets = newOffsets.map((size) => {
      if (!isUndefined(size)) {
        return size;
      }
      return averagePx;
    });
    return newOffsets;
  };

  // 计算每一个面板的占位像素，需要减去前面跟当前伸缩杆的宽度
  const getPaneSize = (index) => {
    const prevTriggerSize = triggerSize[index - 1] || 0;
    const currentTriggerSize = triggerSize[index];
    return `calc(${offsets[index]}px - ${(prevTriggerSize + currentTriggerSize) / 2}px)`;
  };

  // 入参 百分比/像素值 => 全部转化为像素值。
  function formatSize(size?: number | string) {
    const totalPX = isHorizontal ? wrapperRef.current.offsetWidth : wrapperRef.current.offsetHeight;
    if (!size || (isNumber(size) && size < 0)) {
      return 0;
    }

    if (isNumber(size)) {
      return Math.min(totalPX * size, totalPX);
    }
    return parseFloat(size);
  }

  // 计算阈值，因为伸缩杆会影响到当前面板 跟 下一个面板。所以同时计算两个阈值。
  const getMinAndMax = (index: number) => {
    const next = Math.min(index + 1, panes.length - 1);
    const totalOffset = offsets[index] + offsets[next];

    const currentMin = formatSize(panes[index].min) || 0;
    let currentMax = formatSize(panes[index].max) || totalOffset;
    const nextMin = formatSize(panes[next].min) || 0;
    let nextMax = formatSize(panes[next].max) || totalOffset;

    //  min 的优先级高于 max
    currentMax = Math.min(totalOffset - nextMin, currentMax);
    nextMax = Math.min(totalOffset - currentMin, nextMax);
    return {
      currentMin,
      currentMax,
      nextMin,
      nextMax,
    };
  };

  // 拖拽时，获取新的占位距离。影响当前面板跟下一个面板的占位值。
  const getNewOffsets = (startOffset, startPosition, currentPosition) => {
    const current = movingIndex.current;
    const next = current + 1;

    const newOffsets = [...offsets];

    const currentPx = offsets[current];
    const nextPx = offsets[next];
    const totalOffset = currentPx + nextPx;
    const { currentMin: minOffset, currentMax: maxOffset } = getMinAndMax(current);
    let moveOffset = startOffset + (currentPosition - startPosition);
    moveOffset = Math.max(minOffset, moveOffset);
    moveOffset = Math.min(maxOffset, moveOffset);
    newOffsets[current] = moveOffset;
    // 保证 totalOffset = nextOffset + currentOffset  不变。
    newOffsets[next] = totalOffset - moveOffset;
    return newOffsets;
  };

  function onTriggerResize(e, index) {
    const { contentRect } = e[0];
    const currentSize = contentRect[isTriggerHorizontal ? 'height' : 'width'];
    const newTriggerSize = [...triggerSize];
    newTriggerSize[index] = currentSize;
    setTriggerSize(newTriggerSize);
  }

  // 判断快速收缩按钮是否展示
  const getCollapsedConfig = (index: number) => {
    let collapsible = panes[index].collapsible;

    if (!isObject(collapsible)) {
      collapsible = !collapsible ? {} : { prev: true, next: true };
    }

    const { prev, next } = collapsible;

    if (!prev && !next) {
      return {};
    }
    if (!collapsedStatus[index]) {
      return {};
    }
    // 传入了prev的配置，或者 没有传入 prev 的配置，但是已经处于向下收缩完毕状态
    const hasPrev = !!prev || (!prev && collapsedStatus[index].next);

    // 传入了next的配置，或者 没有传入 next 的配置，但是已经处于向上收缩完毕状态
    const hasNext = !!next || (!next && collapsedStatus[index].prev);
    return { hasPrev, hasNext };
  };

  // 移动开始，记录初始值，绑定移动事件
  function onTriggerMouseDown(e, index) {
    props.onMovingStart && props.onMovingStart(index);
    movingIndex.current = index;
    const currentRecord = recordRef.current[index];
    currentRecord.moving = true;
    currentRecord.startOffset = offsets[index];
    currentRecord.startPosition = isHorizontal ? e.pageX : e.pageY;
    setIsMoving(true);
    on(window, 'mousemove', moving);
    on(window, 'touchmove', moving);
    on(window, 'mouseup', moveEnd);
    on(window, 'touchend', moveEnd);
    on(window, 'contextmenu', moveEnd);

    document.body.style.cursor = isTriggerHorizontal ? 'row-resize' : 'col-resize';
  }

  // 移动中，更新 当前面板跟下一个面板 占位大小
  function moving(e) {
    const index = movingIndex.current;
    const currentRecord = recordRef.current[index];
    if (currentRecord.moving) {
      const newOffsets = getNewOffsets(
        currentRecord.startOffset,
        currentRecord.startPosition,
        isHorizontal ? e.pageX : e.pageY
      );

      setOffsets(newOffsets);
      prevOffsets.current = newOffsets;
      props.onMoving &&
        props.onMoving(
          e,
          newOffsets.map((value) => `${value}px`),
          index
        );
    }
  }

  // 移动结束，解除事件绑定
  function moveEnd() {
    const index = movingIndex.current;
    recordRef.current[index].moving = false;
    setIsMoving(false);
    off(window, 'mousemove', moving);
    off(window, 'touchmove', moving);
    off(window, 'mouseup', moveEnd);
    off(window, 'touchend', moveEnd);
    off(window, 'contextmenu', moveEnd);
    document.body.style.cursor = 'default';
    props.onMovingEnd && props.onMovingEnd(index);
  }

  // 点击快速收缩按钮的回调。
  function handleCollapsed(e, index, status: 'prev' | 'next', callback) {
    const next = index + 1;
    const newOffset = [...offsets];
    const currentOffset = offsets[index];
    const nextOffset = offsets[next];
    const totalOffset = currentOffset + nextOffset;

    const { currentMin, nextMin } = getMinAndMax(index);

    // 取消收缩时，应该重置为上一个状态。所以从preOffsets里拿值
    let newCurrentOffset = prevOffsets.current[index];
    let newNextOffset = prevOffsets.current[next];

    // 当前面板的收缩状态。
    let collapsed = collapsedStatus[index][status];

    // 点击向上收缩按钮。收缩态是：currentPane = currentMin;
    if (status === 'prev') {
      // 如果下一个面板不是在收缩状态 或者 下一个面板被手动拖拽到收缩状态
      if (nextOffset !== nextMin || newNextOffset === nextMin) {
        // 当前面板收缩。
        newCurrentOffset = currentMin;
        newNextOffset = totalOffset - currentMin;
        collapsed = true;
      }

      // 点击向下收缩按钮
    } else if (currentOffset !== currentMin || newCurrentOffset === currentMin) {
      newCurrentOffset = totalOffset - nextMin;
      newNextOffset = nextMin;
      collapsed = true;
    }
    newOffset[index] = newCurrentOffset;
    newOffset[next] = newNextOffset;

    props.onMoving &&
      props.onMoving(
        e,
        newOffset.map((value) => `${value}px`),
        index
      );
    props.onMovingEnd && props.onMovingEnd(index);
    setOffsets(newOffset);

    if (isFunction(callback)) {
      callback(e, index, status, collapsed);
    }
  }

  useEffect(() => {
    const offsets = getInitialOffsets();
    setOffsets(offsets);
    prevOffsets.current = offsets;
  }, [JSON.stringify(panes.map((item) => item.size))]);

  useImperativeHandle(ref, () => wrapperRef.current, []);

  useEffect(() => {
    const newCollapsedStatus = [];
    offsets.forEach((offset, index) => {
      const currentCollapsedStatus = { prev: false, next: false };
      const next = index + 1;
      const { currentMin, nextMin } = getMinAndMax(index);
      // 当 offsets 变化时，更新各个面板的 collapsed 状态
      if (offset === currentMin) {
        currentCollapsedStatus.prev = true;
      } else if (offsets[next] === nextMin) {
        currentCollapsedStatus.next = true;
      }
      newCollapsedStatus.push(currentCollapsedStatus);
    });
    setCollapsedStatus(newCollapsedStatus);
  }, [offsets]);

  return (
    <Tag style={style} className={classNames} ref={wrapperRef}>
      {panes.map((pane, index) => {
        const { content, disabled, trigger, resizable = true, collapsible = {} } = pane;
        const { hasPrev, hasNext } = getCollapsedConfig(index);
        const prevConfig: CollapsedConfig =
          isObject(collapsible) && isObject(collapsible.prev) ? collapsible.prev : {};
        const nextConfig: CollapsedConfig =
          isObject(collapsible) && isObject(collapsible.next) ? collapsible.next : {};
        return (
          <React.Fragment key={index}>
            <div
              className={`${prefixCls}-pane`}
              style={{ flexBasis: getPaneSize(index) }}
              ref={(el) => (paneContainers.current[index] = el)}
            >
              {content}
            </div>

            {!disabled && index !== panes.length - 1 && (
              <ResizeTrigger
                className={`${prefixCls}-trigger`}
                direction={isTriggerHorizontal ? DIRECTION_HORIZONTAL : DIRECTION_VERTICAL}
                icon={icon}
                onResize={(e) => onTriggerResize(e, index)}
                onMouseDown={(e) => onTriggerMouseDown(e, index)}
                collapsible={{
                  prev: hasPrev
                    ? {
                        onClick: (e) => handleCollapsed(e, index, 'prev', prevConfig.onClick),
                        icon: prevConfig.icon,
                        collapsed: collapsedStatus[index].prev,
                      }
                    : undefined,
                  next: hasNext
                    ? {
                        onClick: (e) => handleCollapsed(e, index, 'next', nextConfig.onClick),
                        icon: nextConfig.icon,
                        collapsed: collapsedStatus[index].next,
                      }
                    : undefined,
                }}
                resizable={resizable}
                renderChildren={trigger}
              />
            )}
          </React.Fragment>
        );
      })}
    </Tag>
  );
}

const SplitGroupComponent = forwardRef<unknown, SplitGroupProps>(SplitGroup);

SplitGroupComponent.displayName = 'ResizeBoxSplitGroup';

export default SplitGroupComponent;
