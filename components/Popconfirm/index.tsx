import React, { useState, forwardRef, PropsWithChildren, useContext, useEffect } from 'react';
import FocusLock from 'react-focus-lock';
import cs from '../_util/classNames';
import Tooltip from '../Tooltip';
import Button from '../Button';
import IconExclamationCircleFill from '../../icon/react-icon/IconExclamationCircleFill';
import { ConfigContext } from '../ConfigProvider';
import useMergeValue from '../_util/hooks/useMergeValue';
import { PopconfirmProps } from './interface';
import useMergeProps from '../_util/hooks/useMergeProps';
import { isNullOrUndefined } from '../_util/is';

const defaultProps: PopconfirmProps = {
  position: 'top',
  okType: 'primary',
  icon: <IconExclamationCircleFill />,
  blurToHide: true,
  unmountOnExit: true,
  trigger: 'click',
  escToClose: true,
};

function Popconfirm(baseProps: PropsWithChildren<PopconfirmProps>, ref) {
  const { getPrefixCls, locale, componentConfig, rtl } = useContext(ConfigContext);
  const props = useMergeProps<PropsWithChildren<PopconfirmProps>>(
    baseProps,
    defaultProps,
    componentConfig?.Popconfirm
  );
  const {
    style,
    className,
    children,
    position,
    getPopupContainer,
    blurToHide,
    unmountOnExit,
    trigger,
    escToClose,
    onVisibleChange,
    triggerProps,
    title,
    icon,
    okText,
    cancelText,
    okType,
    okButtonProps,
    cancelButtonProps,
    autoFocus,
    focusLock,
    content,
    ...rest
  } = props;

  const [popupVisible, setPopupVisible] = useMergeValue(false, {
    defaultValue: props.defaultPopupVisible,
    value: props.popupVisible,
  });
  const [buttonLoading, setLoading] = useState(false);
  const prefixCls = getPrefixCls('popconfirm');
  const hasContent = !isNullOrUndefined(content);

  const handleVisibleChange = (visible: boolean) => {
    if (!('popupVisible' in props)) {
      setPopupVisible(visible);
    }
    if (triggerProps && triggerProps.onVisibleChange) {
      triggerProps.onVisibleChange(visible);
    }
    onVisibleChange && onVisibleChange(visible);
  };

  const closePopconfirm = () => {
    handleVisibleChange(false);
  };

  const onCancelPopconfirm = (e) => {
    closePopconfirm();
    props.onCancel && props.onCancel(e);
  };

  const onConfirmPopconfirm = (e) => {
    const _onConfirm = props.onOk || props.onConfirm;

    let ret;
    if (_onConfirm) {
      ret = _onConfirm(e);
    }
    if (ret && ret.then) {
      setLoading(true);
      ret.then(
        () => {
          closePopconfirm();
        },
        (e: Error) => {
          setLoading(false);
          console.error(e);
        }
      );
    }
    if (!ret) {
      closePopconfirm();
    }
  };

  const renderPopconfirmContent = () => {
    const element = (
      <>
        <Button onClick={onCancelPopconfirm} size="mini" {...cancelButtonProps}>
          {cancelText || locale!.Popconfirm.cancelText}
        </Button>
        <Button
          loading={buttonLoading}
          onClick={onConfirmPopconfirm}
          size="mini"
          type={okType}
          {...okButtonProps}
        >
          {okText || locale!.Popconfirm.okText}
        </Button>
      </>
    );
    return (
      <div className={`${prefixCls}-wrapper`}>
        <div className={`${prefixCls}-title`}>
          {icon && <span className={`${prefixCls}-title-icon`}>{icon}</span>}
          <div className={`${prefixCls}-title-text`}>{title}</div>
        </div>
        {hasContent && <div className={`${prefixCls}-inner-content`}>{content}</div>}

        {focusLock ? (
          <FocusLock
            returnFocus
            as="div"
            className={`${prefixCls}-btn`}
            crossFrame={false}
            disabled={!popupVisible}
            autoFocus={!!autoFocus}
          >
            {element}
          </FocusLock>
        ) : (
          <div className={`${prefixCls}-btn`}>{element}</div>
        )}
      </div>
    );
  };

  useEffect(() => {
    if (!popupVisible && buttonLoading) {
      setLoading(false);
    }
    return () => {
      setLoading(false);
    };
  }, [popupVisible]);

  return (
    <Tooltip
      {...rest}
      ref={ref}
      style={{
        maxWidth: 350,
        ...style,
      }}
      className={cs(className, {
        [`${prefixCls}-rtl`]: rtl,
        [`${prefixCls}-has-content`]: hasContent,
      })}
      prefixCls={prefixCls}
      getPopupContainer={getPopupContainer}
      position={position}
      trigger={trigger}
      escToClose={escToClose}
      popupVisible={popupVisible}
      content={renderPopconfirmContent()}
      unmountOnExit={unmountOnExit}
      blurToHide={blurToHide}
      popupHoverStay
      triggerProps={triggerProps}
      onVisibleChange={handleVisibleChange}
      childrenPrefix={prefixCls}
    >
      {typeof children === 'string' ? <span>{children}</span> : children}
    </Tooltip>
  );
}

const PopconfirmComponent = forwardRef<unknown, PropsWithChildren<PopconfirmProps>>(Popconfirm);

PopconfirmComponent.displayName = 'Popconfirm';

export default PopconfirmComponent;

export { PopconfirmProps };
