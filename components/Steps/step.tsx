import React, { forwardRef } from 'react';
import cs from '../_util/classNames';
import IconCheck from '../../icon/react-icon/IconCheck';
import IconClose from '../../icon/react-icon/IconClose';
import { StepProps } from './interface';

function Step(props: StepProps, ref) {
  const {
    style,
    className,
    prefixCls,
    index = 1,
    current = 1,
    status,
    title,
    description,
    icon,
    nextStepError,
    type,
    customDot,
    labelPlacement,
    disabled,
    onClick,
    onChange,
    direction,
    id,
    lineless,
  } = props;

  function renderIconNode(currentStatus) {
    if (type === 'dot') {
      return null;
    }

    let content: any = index;

    if (icon) {
      content = icon;
    } else if (currentStatus === 'finish') {
      content = <IconCheck />;
    } else if (currentStatus === 'error') {
      content = <IconClose />;
    }

    return <div className={`${prefixCls}-icon`}>{content}</div>;
  }

  function onClickStep(e) {
    if (!disabled) {
      // Step.onChange
      onChange && current !== index && onChange(index, id);
      // props.onClick
      onClick && onClick(index, id, e);
    }
  }

  let currentStatus;

  if (status) {
    currentStatus = status;
  } else {
    if (current < index) {
      currentStatus = 'wait';
    }
    if (current === index) {
      currentStatus = 'process';
    }
    if (current > index) {
      currentStatus = 'finish';
    }
  }

  const classNames = cs(
    `${prefixCls}-item`,
    `${prefixCls}-item-${currentStatus}`,
    {
      [`${prefixCls}-item-custom`]: !!icon,
      [`${prefixCls}-item-next-error`]: nextStepError,
      [`${prefixCls}-item-disabled`]: disabled,
      [`${prefixCls}-item-active`]: index === current,
    },
    className
  );
  const iconNode = renderIconNode(currentStatus);
  const iconNodeWrapped = <div className={`${prefixCls}-item-icon`}>{iconNode}</div>;
  const customDotElement = customDot
    ? customDot(iconNodeWrapped, {
        index,
        status: currentStatus,
        title,
        description,
      })
    : iconNodeWrapped;

  return (
    <div ref={ref} className={classNames} style={style} onClick={onClickStep}>
      {!lineless && (labelPlacement === 'vertical' || direction === 'vertical') && (
        <div className={`${prefixCls}-item-tail`} />
      )}
      {type !== 'arrow' && customDotElement}
      <div className={`${prefixCls}-item-content`}>
        <div className={`${prefixCls}-item-title`}>{title}</div>
        {description && <div className={`${prefixCls}-item-description`}>{description}</div>}
      </div>
    </div>
  );
}

const StepComponent = forwardRef<unknown, StepProps>(Step);

StepComponent.displayName = 'Step';

export default StepComponent;

export { StepProps };
