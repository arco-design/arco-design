import React, {
  forwardRef,
  useContext,
  useRef,
  useState,
  PropsWithChildren,
  useCallback,
} from 'react';
import Checkbox from '../Checkbox';
import cs from '../_util/classNames';
import { isFunction } from '../_util/is';
import IconCaretDown from '../../icon/react-icon/IconCaretDown';
import IconDragDotVertical from '../../icon/react-icon/IconDragDotVertical';
import IconLoading from '../../icon/react-icon/IconLoading';
import IconFile from '../../icon/react-icon/IconFile';
import { ConfigContext } from '../ConfigProvider';
import IconHover from '../_class/icon-hover';
import { NodeProps } from './interface';
import { TreeContext } from './context';
import AnimationNode from './animation';
import throttleByRaf from '../_util/throttleByRaf';

export interface NodeState {
  isDragOver?: boolean;
  dragPosition: 0 | -1 | 1;
  // 当前节点是否正在被拖拽
  isDragging?: boolean;
  // 当前节点是否允许拖放
  isAllowDrop?: boolean;
}

function TreeNode(props: PropsWithChildren<NodeProps>, ref) {
  const treeContext = useContext(TreeContext);
  const { getPrefixCls } = useContext(ConfigContext);
  // const prevProps: NodeProps = usePrevious(props) || {};

  const nodeTitleRef = useRef<HTMLSpanElement>();

  const [state, setState] = useState<NodeState>({
    isAllowDrop: true,
    isDragOver: false,
    dragPosition: 0,
    isDragging: false,
  });
  const {
    _key = '',
    title,
    icon,
    checkable,
    selected,
    disabled,
    disableCheckbox,
    isLeaf,
    draggable,
    expanded,
    showLine,
    loading,
    selectable = true,
  } = props;

  const prefixCls = getPrefixCls('tree-node');
  const classNames = cs(
    prefixCls,
    {
      [`${prefixCls}-selected`]: selected,
      [`${prefixCls}-is-leaf`]: isLeaf,
      [`${prefixCls}-expanded`]: expanded,
      [`${prefixCls}-disabled-selectable`]: !selectable,
      [`${prefixCls}-disabled`]: disabled,
      [`${prefixCls}-draggable`]: draggable,
    },
    props.className
  );

  const icons = (() => {
    const treeIcons = isFunction(treeContext.icons) ? treeContext.icons(props) : treeContext.icons;
    const propsIcons = isFunction(props.icons) ? props.icons(props) : props.icons;

    return { ...treeIcons, ...propsIcons };
  })();

  const setExpand = useCallback(
    (newExpand: boolean) => {
      if (newExpand === expanded) {
        return;
      }
      treeContext.onExpand && treeContext.onExpand(newExpand, _key);
    },
    [expanded, treeContext.onExpand]
  );

  const switchExpandStatus = useCallback(async () => {
    const { isLeaf, expanded } = props;
    if (isLeaf) {
      return;
    }
    if (!props.childrenData?.length && isFunction(treeContext.loadMore) && !expanded) {
      await treeContext.loadMore(props);
    } else {
      setExpand(!expanded);
    }
  }, [props, setExpand, treeContext.loadMore]);

  const getPrefixIcon = () => {
    if (loading) {
      return 'loadingIcon' in icons ? icons.loadingIcon : <IconLoading />;
    }
    let icon = null;
    let needIconHover = false;
    if (!isLeaf) {
      const defaultIcon = showLine ? (
        <span className={`${prefixCls}-${expanded ? 'minus' : 'plus'}-icon`} />
      ) : (
        <IconCaretDown />
      );

      icon = 'switcherIcon' in icons ? icons.switcherIcon : defaultIcon;
      needIconHover = !showLine;
    } else if (showLine) {
      icon = 'switcherIcon' in icons ? icons.switcherIcon : <IconFile />;
      needIconHover = true;
    }

    if (icon) {
      icon = (
        <span
          className={`${prefixCls}-switcher-icon`}
          aria-label={expanded ? 'fold button' : 'expand button'}
          role="button"
          tabIndex={0}
          onClick={switchExpandStatus}
        >
          {icon}
        </span>
      );
      return needIconHover ? <IconHover prefix={prefixCls}>{icon}</IconHover> : icon;
    }
  };

  const updateDragOverState = useCallback(
    throttleByRaf((e) => {
      const dom = nodeTitleRef.current;
      if (!dom) return;
      const rect = dom.getBoundingClientRect();
      const offsetY = window.pageYOffset + rect.top;
      const pageY = e.pageY;
      const gapHeight = rect.height / 4;
      const diff = pageY - offsetY;
      const position = diff < gapHeight ? -1 : diff < rect.height - gapHeight ? 0 : 1;
      const isAllowDrop = treeContext.allowDrop(props, position);

      setState({
        ...state,
        isAllowDrop,
        isDragOver: true,
        dragPosition: position,
      });
      treeContext.onNodeDragOver && treeContext.onNodeDragOver(e, props, position);
    }),
    [treeContext.onNodeDragOver]
  );

  const handleCheck = (checked, e) => {
    const { disableCheckbox, disabled } = props;
    if (disableCheckbox || disabled) {
      return;
    }
    treeContext.onCheck && treeContext.onCheck(checked, _key, e);
  };

  return (
    <>
      <div
        style={props.style}
        className={classNames}
        ref={ref}
        role="treeitem"
        aria-disabled={disabled}
        aria-expanded={expanded}
      >
        <span className={`${prefixCls}-indent`} aria-hidden>
          {[...Array(props._level)].map((_, i) => (
            <span
              className={cs(`${prefixCls}-indent-block`, {
                [`${prefixCls}-indent-block-lineless`]: props._lineless && props._lineless[i],
              })}
              key={i}
            />
          ))}
        </span>
        <span
          className={cs(`${prefixCls}-switcher`, {
            [`${prefixCls}-switcher-expanded`]: expanded,
          })}
        >
          {getPrefixIcon()}
        </span>
        {checkable ? (
          <Checkbox
            disabled={disableCheckbox || disabled}
            value={_key}
            indeterminate={props.indeterminated}
            checked={props.checked}
            onChange={handleCheck}
          />
        ) : null}
        <span
          aria-grabbed={state.isDragging}
          ref={nodeTitleRef}
          className={cs(`${prefixCls}-title`, {
            [`${prefixCls}-title-draggable`]: draggable,
            [`${prefixCls}-title-gap-top`]:
              state.isDragOver && state.isAllowDrop && state.dragPosition < 0,
            [`${prefixCls}-title-gap-bottom`]:
              state.isDragOver && state.isAllowDrop && state.dragPosition > 0,
            [`${prefixCls}-title-highlight`]:
              !state.isDragging &&
              state.isDragOver &&
              state.isAllowDrop &&
              state.dragPosition === 0,
            [`${prefixCls}-title-dragging`]: state.isDragging,
            [`${prefixCls}-title-block`]: props.blockNode,
          })}
          onClick={(e) => {
            const { onSelect, actionOnClick } = treeContext;
            if (!props.disabled) {
              const actions = [].concat(actionOnClick);
              if (selectable && actions.indexOf('select') > -1) {
                onSelect && onSelect(_key, e);
              }
              if (actions.indexOf('expand') > -1) {
                switchExpandStatus();
              }
              if (checkable && actions.indexOf('check') > -1) {
                handleCheck(!props.checked, e);
              }
            }
          }}
          draggable={draggable}
          onDrop={(e) => {
            e.stopPropagation();
            e.preventDefault();
            treeContext.onNodeDrop && treeContext.onNodeDrop(e, props, state.dragPosition);
            updateDragOverState.cancel();
            setState({
              ...state,
              isDragOver: false,
              dragPosition: 0,
            });
          }}
          onDragStart={(e) => {
            if (!draggable) return;

            e.stopPropagation();
            // 当前节点正在被拖拽
            setState({ ...state, isDragging: true });

            treeContext.onNodeDragStart && treeContext.onNodeDragStart(e, props);
            try {
              // ie throw error
              // firefox-need-it
              e.dataTransfer.setData('text/plain', '');
            } catch (error) {
              // empty
            }
          }}
          onDragEnd={(e) => {
            if (!draggable) return;
            e.stopPropagation();
            updateDragOverState.cancel();
            setState({ ...state, isDragOver: false, isDragging: false });
            treeContext.onNodeDragEnd && treeContext.onNodeDragEnd(e, props);
          }}
          onDragOver={(e) => {
            e.preventDefault();
            e.stopPropagation();
            e.persist();
            updateDragOverState(e);
          }}
          onDragLeave={(e) => {
            if (!draggable) return;
            e.stopPropagation();
            updateDragOverState.cancel();
            setState({ ...state, isDragOver: false });
            treeContext.onNodeDragLeave && treeContext.onNodeDragLeave(e, props);
          }}
        >
          {icon && <span className={`${prefixCls}-icon ${prefixCls}-custom-icon`}>{icon}</span>}
          <span className={`${prefixCls}-title-text`}>
            {isFunction(treeContext.renderTitle) ? treeContext.renderTitle(props) : title}
          </span>

          {draggable && (
            <span className={`${prefixCls}-icon ${prefixCls}-drag-icon`}>
              {'dragIcon' in icons ? icons.dragIcon : <IconDragDotVertical />}
            </span>
          )}
        </span>
        {isFunction(treeContext.renderExtra) && treeContext.renderExtra(props)}
      </div>
      <AnimationNode {...props} />
    </>
  );
}

const TreeNodeComponent = forwardRef<HTMLDivElement, PropsWithChildren<NodeProps>>(TreeNode);

TreeNodeComponent.displayName = 'TreeNode';

export default React.memo(TreeNodeComponent);
