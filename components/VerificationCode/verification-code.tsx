import React, { forwardRef, useRef, useContext, Fragment } from 'react';
import cs from '../_util/classNames';
import InputComponent from '../Input/input-element';
import { ConfigContext } from '../ConfigProvider';
import useMergeProps from '../_util/hooks/useMergeProps';

import { VerificationCodeProps } from './interface';
import useVerificationCode from '../_hooks/useVerificationCode';

const defaultProps = {
  length: 6,
};

export function VerificationCodeComponent(baseProps: VerificationCodeProps, _) {
  const ctx = useContext(ConfigContext);
  const props = useMergeProps(baseProps, defaultProps, ctx.componentConfig?.VerificationCode);

  const { size, separator, status, length, masked, disabled } = props;
  const focusEleRefList = useRef([]);
  const { value, filledValue, getInputProps } = useVerificationCode({
    defaultValue: props.defaultValue,
    value: props.value,
    length,
    getInputRefList: () => focusEleRefList.current,
    onChange: props.onChange,
    onFinish: props.onFinish,
  });

  const prefix = ctx.getPrefixCls('verification-code');
  const prefixInput = ctx.getPrefixCls('input');

  return (
    <div
      className={cs(`${prefix}`, props.className, {
        [`${prefix}-rtl`]: ctx.rtl,
      })}
      style={props.style}
    >
      {filledValue.map((v, index) => {
        const { onChange, onClick, onPaste, onKeyDown, ...restInputProps } = getInputProps(index);
        return (
          <Fragment key={index}>
            <InputComponent
              disabled={props.disabled}
              readOnly={props.readOnly}
              className={cs(prefixInput, `${prefix}-input`, {
                [`${prefixInput}-size-${size}`]: size,
                [`${prefixInput}-${status}`]: status,
                [`${prefixInput}-disabled`]: disabled,
                [`${prefixInput}-rtl`]: ctx.rtl,
              })}
              ref={(node) => {
                focusEleRefList.current[index] = node?.dom;
              }}
              {...restInputProps}
              onClick={!props.readOnly ? onClick : undefined}
              onPaste={!props.readOnly ? onPaste : undefined}
              onKeyDown={!props.readOnly ? onKeyDown : undefined}
              onChange={
                !props.readOnly
                  ? (inputValue) => {
                      if (props.validate) {
                        const result = props?.validate({ inputValue, index, value });
                        if (result !== false) {
                          onChange(typeof result === 'string' ? result : inputValue);
                        }
                      } else {
                        onChange(inputValue);
                      }
                    }
                  : undefined
              }
              type={masked ? 'password' : 'text'}
            />
            {separator?.({ index, character: v })}
          </Fragment>
        );
      })}
    </div>
  );
}

const VerificationCode = forwardRef(VerificationCodeComponent);

export default VerificationCode;
