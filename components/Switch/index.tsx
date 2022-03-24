import React, { useState, useContext, forwardRef, ReactElement } from 'react';
import { SwitchTransition, CSSTransition } from 'react-transition-group';
import cs from '../_util/classNames';
import { isArray, isObject } from '../_util/is';
import omit from '../_util/omit';
import { ConfigContext } from '../ConfigProvider';
import IconLoading from '../../icon/react-icon/IconLoading';
import { SwitchProps } from './interface';
import useMergeProps from '../_util/hooks/useMergeProps';

export interface SwitchState {
  checked: boolean;
}

const defaultProps: SwitchProps = {
  type: 'circle',
};

function Switch(baseProps: SwitchProps, ref) {
  const { getPrefixCls, size: ctxSize, componentConfig } = useContext(ConfigContext);
  const props = useMergeProps<SwitchProps>(baseProps, defaultProps, componentConfig?.Switch);
  const {
    className,
    children,
    style = {},
    disabled,
    size: propSize,
    loading,
    onChange,
    type,
    checkedText,
    uncheckedText,
    checkedIcon,
    uncheckedIcon,
    ...rest
  } = props;

  const prefixCls = getPrefixCls('switch');

  const size = propSize || ctxSize;
  const [checked, setChecked] = useState<boolean>(props.defaultChecked);

  const mergedChecked = 'checked' in props ? props.checked : checked;

  const onHandleClick: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    if (loading) {
      return;
    }
    if (!('checked' in props)) {
      setChecked(!mergedChecked);
    }
    onChange && onChange(!mergedChecked, event);
  };

  const classNames = cs(
    prefixCls,
    size === 'small' ? `${prefixCls}-${size}` : undefined,
    {
      [`${prefixCls}-type-${type}`]: type,
      [`${prefixCls}-checked`]: mergedChecked,
      [`${prefixCls}-loading`]: loading,
    },
    className
  );
  let checkedElement = checkedText;
  let unCheckedElement = uncheckedText;

  // 支持通过 children 传入 checkedText 和 uncheckedText，不过建议直接使用参数 checkedText 和 uncheckedText
  if (children && isArray(children)) {
    checkedElement = children.find((child: ReactElement) => child.key === 'open');
    unCheckedElement = children.find((child: ReactElement) => child.key === 'close');
  } else if (children && isObject(children)) {
    if ((children as ReactElement).key === 'open') {
      checkedElement = children;
    } else if ((children as ReactElement).key === 'close') {
      unCheckedElement = children;
    }
  }
  const extraProps = omit(rest, ['onChange', 'checked', 'error']);

  return (
    <button
      ref={ref}
      role="switch"
      aria-checked={!!mergedChecked}
      {...extraProps}
      style={style}
      className={classNames}
      disabled={disabled}
      onClick={onHandleClick}
      type="button"
    >
      <div className={`${prefixCls}-dot`}>
        {!loading && (checkedIcon || uncheckedIcon) && (
          <SwitchTransition>
            <CSSTransition
              key={mergedChecked ? 'checked' : 'unchecked'}
              classNames="fadeIn"
              timeout={200}
            >
              <span className={`${prefixCls}-dot-icon`}>
                {mergedChecked ? checkedIcon : uncheckedIcon}
              </span>
            </CSSTransition>
          </SwitchTransition>
        )}

        {loading && (
          <span className={`${prefixCls}-dot-icon`}>
            <IconLoading />
          </span>
        )}
      </div>
      {size !== 'small' && type !== 'line' && (checkedElement || unCheckedElement) && (
        <>
          <div className={`${prefixCls}-text-holder`}>
            {checkedElement && mergedChecked && checkedElement}
            {unCheckedElement && !mergedChecked && unCheckedElement}
          </div>
          <CSSTransition in={mergedChecked} classNames="switchSlideText" timeout={200}>
            <div className={`${prefixCls}-text`}>
              {checkedElement && mergedChecked && checkedElement}
              {unCheckedElement && !mergedChecked && unCheckedElement}
            </div>
          </CSSTransition>
        </>
      )}
    </button>
  );
}

const ForwardRefSwitch = forwardRef<unknown, SwitchProps>(Switch);

const SwitchComponent = ForwardRefSwitch as typeof ForwardRefSwitch & {
  __BYTE_SWITCH: boolean;
};

SwitchComponent.__BYTE_SWITCH = true;

SwitchComponent.displayName = 'Switch';

export default SwitchComponent;

export { SwitchProps };
