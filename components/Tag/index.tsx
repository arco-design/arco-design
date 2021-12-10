import React, { useState, useContext, forwardRef, CSSProperties } from 'react';
import cs from '../_util/classNames';
import IconClose from '../../icon/react-icon/IconClose';
import IconLoading from '../../icon/react-icon/IconLoading';
import omit from '../_util/omit';
import { ConfigContext } from '../ConfigProvider';
import IconHover from '../_class/icon-hover';
import { TagProps } from './interface';
import useMergeProps from '../_util/hooks/useMergeProps';

// 色板里的 12 个颜色
const COLORS = [
  'red',
  'orangered',
  'orange',
  'gold',
  'lime',
  'green',
  'cyan',
  'blue',
  'arcoblue',
  'purple',
  'pinkpurple',
  'magenta',
  'gray',
];

const defaultProps: TagProps = {
  size: 'default',
};

function Tag(baseProps: TagProps, ref) {
  const { getPrefixCls, componentConfig } = useContext(ConfigContext);
  const props = useMergeProps<TagProps>(baseProps, defaultProps, componentConfig?.Tag);
  const {
    className,
    style,
    children,
    color,
    closable,
    checkable,
    defaultChecked,
    size,
    onClose,
    onCheck,
    icon,
    closeIcon,
    bordered,
    ...rest
  } = props;

  const prefixCls = getPrefixCls('tag');

  const [visible, setVisible] = useState<boolean>('visible' in props ? props.visible : true);
  const [checked, setChecked] = useState<boolean>(
    'checked' in props ? props.checked : defaultChecked
  );
  const [loading, setLoading] = useState<boolean>();

  // controlled
  const mergedChecked = 'checked' in props ? props.checked : checked;
  const mergedVisible = 'visible' in props ? props.visible : visible;

  function onHandleClose(e) {
    const ret = onClose && onClose(e);
    if (ret && ret.then) {
      setLoading(true);
      ret
        .then(() => {
          setLoading(false);
          setVisible(false);
        })
        .catch(() => {
          setLoading(false);
        });
    } else {
      setVisible(false);
    }
  }

  function onHandleCheck() {
    const newChecked = !mergedChecked;
    if (!('checked' in props)) {
      setChecked(newChecked);
    }
    onCheck && onCheck(newChecked);
  }

  const _color: string = color ? (COLORS.indexOf(color) !== -1 ? color : '') : '';
  const _checked = checkable ? mergedChecked : true;

  const classNames = cs(
    prefixCls,
    {
      [`${prefixCls}-loading`]: loading,
      [`${prefixCls}-hide`]: !mergedVisible,
      [`${prefixCls}-${_color}`]: _color,
      [`${prefixCls}-checkable`]: checkable,
      [`${prefixCls}-checked`]: _checked,
      [`${prefixCls}-size-${size}`]: size,
      [`${prefixCls}-bordered`]: bordered,
      [`${prefixCls}-custom-color`]: _checked && color && !_color,
    },
    className
  );

  const colorStyle: CSSProperties = {
    ...style,
  };

  if (color && !_color && _checked) {
    colorStyle.backgroundColor = color;
    colorStyle.borderColor = color;
  }

  const otherProps = omit(rest, ['visible']);

  if (checkable) {
    otherProps.onClick = onHandleCheck;
  }

  return (
    <div ref={ref} style={colorStyle} className={classNames} {...otherProps}>
      {icon && <span className={`${prefixCls}-icon`}>{icon}</span>}
      {children}
      {closable && !loading && closeIcon !== null && (
        <IconHover prefix={prefixCls} className={`${prefixCls}-close-btn`} onClick={onHandleClose}>
          {closeIcon !== undefined ? closeIcon : <IconClose />}
        </IconHover>
      )}
      {loading && (
        <span className={`${prefixCls}-loading-icon`}>
          <IconLoading />
        </span>
      )}
    </div>
  );
}

const TagComponent = forwardRef<unknown, TagProps>(Tag);

TagComponent.displayName = 'Tag';

export default TagComponent;

export { TagProps };
