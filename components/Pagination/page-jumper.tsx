import React, { useRef, useState, useEffect, useContext } from 'react';
import Input from '../Input';
import { isFunction, isUndefined } from '../_util/is';
import { ConfigContext } from '../ConfigProvider';
import { RefInputType } from '../Input/interface';

export interface PageJumperProps {
  disabled?: boolean;
  rootPrefixCls?: string;
  totalPages: number;
  current: number;
  simple?: boolean;
  onPageChange?: (value) => void;
  size?: 'mini' | 'small' | 'default' | 'large';
}

function PageJumper(props: PageJumperProps) {
  const defaultInputText = props.simple ? props.current : undefined;
  const { locale } = useContext(ConfigContext);
  const [inputText, setInputText] = useState<number>(defaultInputText);
  const [current, setCurrent] = useState<number>(defaultInputText);
  const inputRef = useRef<RefInputType>();

  useEffect(() => {
    if (props.current !== current && props.simple) {
      setInputText(props.current);
      setCurrent(props.current);
    }
  }, [props.current, props.simple, current]);

  const handleChange = (val) => {
    const value = parseInt(val, 10);
    setInputText(isNaN(value) ? undefined : value);
  };

  const handleJump = () => {
    const { onPageChange, totalPages, current, simple } = props;

    if (isUndefined(inputText)) {
      return;
    }

    if (inputText === current && !simple) {
      setInputText(undefined);
      return;
    }

    let page = isNaN(Number(inputText)) ? current : Number(inputText);
    if (page < 1) {
      page = 1;
    } else if (page > totalPages) {
      page = totalPages;
    }

    setInputText(simple ? page : undefined);
    isFunction(onPageChange) && (onPageChange as Function)(page);
  };

  const onFocus = () => {
    const input = inputRef.current.dom;
    if (String(inputText) && input) {
      input.setSelectionRange(0, String(inputText).length);
    }
  };

  const { rootPrefixCls, simple, totalPages, size, disabled } = props;
  const prefixCls = `${rootPrefixCls}-jumper`;

  return (
    <div className={`${prefixCls}`}>
      {!simple && <span className={`${prefixCls}-text-goto`}>{locale.Pagination.goto}</span>}
      <Input
        ref={(ref) => (inputRef.current = ref)}
        className={`${prefixCls}-input`}
        value={!isUndefined(inputText) ? inputText.toString() : undefined}
        size={size}
        disabled={disabled || !totalPages}
        onChange={handleChange}
        onPressEnter={handleJump}
        onFocus={onFocus}
        onBlur={handleJump}
      />
      {simple && (
        <>
          <span className={`${prefixCls}-separator`}>/</span>
          <span>{totalPages}</span>
        </>
      )}
    </div>
  );
}

export default PageJumper;
