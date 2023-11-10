import React, {
  useContext,
  PropsWithChildren,
  forwardRef,
  useImperativeHandle,
  useState,
  useRef,
} from 'react';
import omit from '../_util/omit';
import cs from '../_util/classNames';
import { ConfigContext } from '../ConfigProvider';
import { on, off } from '../_util/dom';
import ResizeTrigger from './resize-trigger';
import Split from './split';
import useMergeValue from '../_util/hooks/useMergeValue';
import { isNumber } from '../_util/is';
import { ResizeBoxProps } from './interface';
import useMergeProps from '../_util/hooks/useMergeProps';
import SplitGroup from './split-group';

const DIRECTION_LEFT = 'left';
const DIRECTION_RIGHT = 'right';
const DIRECTION_TOP = 'top';
const DIRECTION_BOTTOM = 'bottom';

export type DirectionType = 'left' | 'right' | 'top' | 'bottom';

const allDirections: DirectionType[] = [
  DIRECTION_LEFT,
  DIRECTION_RIGHT,
  DIRECTION_TOP,
  DIRECTION_BOTTOM,
];

const defaultProps: ResizeBoxProps = {
  component: 'div',
  directions: ['right'],
  resizeIcons: {},
  resizeTriggers: {},
};

const getOppositeDirection = (direction: DirectionType) => {
  switch (direction) {
    case 'left':
      return 'right';
    case 'right':
      return 'left';
    default:
      return direction;
  }
};

function ResizeBox(baseProps: PropsWithChildren<ResizeBoxProps>, ref) {
  const { getPrefixCls, componentConfig, rtl } = useContext(ConfigContext);
  const props = useMergeProps<PropsWithChildren<ResizeBoxProps>>(
    baseProps,
    defaultProps,
    componentConfig?.ResizeBox
  );
  const {
    style,
    className,
    component,
    directions,
    resizeIcons,
    children,
    resizeTriggers,
    width: propWidth,
    height: propHeight,
    ...rest
  } = props;

  const realDirections = rtl ? directions.map((dir) => getOppositeDirection(dir)) : directions;
  const prefixCls = getPrefixCls('resizebox');
  const classNames = cs(prefixCls, { [`${prefixCls}-rtl`]: rtl }, className);
  const [paddingStyles, setPaddingStyles] = useState({});
  const [width, setWidth] = useMergeValue(undefined, { value: propWidth });
  const [height, setHeight] = useMergeValue(undefined, { value: propHeight });
  const recordRef = useRef<{
    startX: number;
    startY: number;
    startWidth: number;
    startHeight: number;
    direction: DirectionType;
    moving: boolean;
    padding: {
      top: number;
      bottom: number;
      left: number;
      right: number;
    };
  }>({
    startX: 0,
    startY: 0,
    startWidth: 0,
    startHeight: 0,
    direction: DIRECTION_RIGHT,
    moving: false,
    padding: {
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
    },
  });
  const wrapperRef = useRef<HTMLElement>();

  useImperativeHandle(ref, () => wrapperRef.current, []);

  function getIsHorizontal(direction: DirectionType) {
    return [DIRECTION_TOP, DIRECTION_BOTTOM].indexOf(direction) > -1;
  }

  function getRealSize(clientSize, padding) {
    if (clientSize === 0) return 0;

    const res = clientSize - padding;
    return res <= 0 ? 0 : res;
  }

  //
  function setOrResetBodyCursor(cursor?: string) {
    const attrKey = 'data-arco-origin-cursor';
    if (cursor) {
      // 因为只会覆盖内联样式的 cursor，所以只需要记录下原本内联的 cursor 值即可。
      document.body.setAttribute(attrKey, document.body.style.cursor);
      document.body.style.cursor = cursor;
    } else {
      // reset to origin cursor
      const originCursor = document.body.getAttribute(attrKey);
      document.body.style.cursor = originCursor || '';

      document.body.removeAttribute(attrKey);
    }
  }

  function onTriggerMouseDown(direction, e) {
    props.onMovingStart && props.onMovingStart();

    recordRef.current.moving = true;
    recordRef.current.startX = e.pageX;
    recordRef.current.startY = e.pageY;
    recordRef.current.direction = direction;

    // 因为 clientWidth 拿到的尺寸包含 padding，而 padding 不应该成为 width 计算的一部分，所以需要去掉。
    const { top, left, right, bottom } = recordRef.current.padding;
    recordRef.current.startWidth = getRealSize(wrapperRef.current?.clientWidth, left + right);
    recordRef.current.startHeight = getRealSize(wrapperRef.current?.clientHeight, top + bottom);

    on(window, 'mousemove', moving);
    on(window, 'touchmove', moving);
    on(window, 'mouseup', moveEnd);
    on(window, 'touchend', moveEnd);
    on(window, 'contextmenu', moveEnd);

    setOrResetBodyCursor(getIsHorizontal(direction) ? 'row-resize' : 'col-resize');
  }

  function moving(e: MouseEvent) {
    if (!recordRef.current.moving) return false;

    const { startX, startY, startWidth, startHeight } = recordRef.current;
    let newWidth = startWidth;
    let newHeight = startHeight;

    // 往右移动的距离
    const offsetX = e.pageX - startX;
    // 往下移动的距离
    const offsetY = e.pageY - startY;

    switch (recordRef.current.direction) {
      case DIRECTION_LEFT:
        newWidth = startWidth - offsetX;
        setWidth(newWidth);
        break;
      case DIRECTION_RIGHT:
        newWidth = startWidth + offsetX;
        setWidth(newWidth);
        break;
      case DIRECTION_TOP:
        newHeight = startHeight - offsetY;
        setHeight(newHeight);
        break;
      case DIRECTION_BOTTOM:
        newHeight = startHeight + offsetY;
        setHeight(newHeight);
        break;
      default:
        break;
    }

    props.onMoving &&
      props.onMoving(e, {
        width: newWidth,
        height: newHeight,
      });
  }

  function moveEnd() {
    recordRef.current.moving = false;
    offEvents();
    setOrResetBodyCursor();
    props.onMovingEnd && props.onMovingEnd();
  }

  function offEvents() {
    off(window, 'mousemove', moving);
    off(window, 'touchmove', moving);
    off(window, 'mouseup', moveEnd);
    off(window, 'touchend', moveEnd);
    off(window, 'contextmenu', moveEnd);
  }

  function onTriggerResize(direction, e) {
    const isHorizontal = getIsHorizontal(direction);
    const { contentRect } = e[0];
    const styleDirection = `${direction.slice(0, 1).toUpperCase()}${direction.slice(1)}`;
    const size = contentRect[isHorizontal ? 'height' : 'width'];
    // 记录 padding，用于计算 width
    recordRef.current.padding[direction] = size;
    setPaddingStyles((pre) => ({
      ...pre,
      [`padding${styleDirection}`]: size,
    }));
  }

  const wrapperStyles = {
    ...paddingStyles,
    ...(style || {}),
    ...(isNumber(width) ? { width } : {}),
    ...(isNumber(height) ? { height } : {}),
  };
  const Tag = component as any;
  return (
    <Tag
      {...omit(rest, ['onMovingStart', 'onMoving', 'onMovingEnd'])}
      style={wrapperStyles}
      className={classNames}
      ref={wrapperRef}
    >
      {children}
      {realDirections.map((direction) => {
        if (allDirections.indexOf(direction) !== -1) {
          return (
            <ResizeTrigger
              key={direction}
              className={`${prefixCls}-direction-${direction}`}
              direction={getIsHorizontal(direction) ? 'horizontal' : 'vertical'}
              icon={resizeIcons[direction]}
              onMouseDown={(e) => {
                onTriggerMouseDown(direction, e);
              }}
              onResize={(e) => {
                onTriggerResize(direction, e);
              }}
            >
              {resizeTriggers[direction]}
            </ResizeTrigger>
          );
        }
      })}
    </Tag>
  );
}

const ForwardRefResizeBox = forwardRef<unknown, PropsWithChildren<ResizeBoxProps>>(ResizeBox);

const ResizeBoxComponent = ForwardRefResizeBox as typeof ForwardRefResizeBox & {
  Split: typeof Split;
  SplitGroup: typeof SplitGroup;
};

ResizeBoxComponent.Split = Split;
ResizeBoxComponent.SplitGroup = SplitGroup;

ResizeBoxComponent.displayName = 'ResizeBox';

export default ResizeBoxComponent;

export { ResizeBoxProps };
