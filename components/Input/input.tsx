import React, {
  useContext,
  useState,
  useRef,
  useImperativeHandle,
  ForwardRefExoticComponent,
  useMemo,
} from 'react';
import { InputProps, RefInputType } from './interface';
import cs from '../_util/classNames';
import Search from './search';
import TextArea from './textarea';
import Password from './password';
import { ConfigContext } from '../ConfigProvider';
import { isUndefined, isString, isObject } from '../_util/is';
import useMergeValue from '../_util/hooks/useMergeValue';
import InputComponent from './input-element';
import Group from './group';
import { contains } from '../_util/dom';
import useMergeProps, { MergePropsOptions } from '../_util/hooks/useMergeProps';

const keepFocus = (e) => {
  e.target.tagName !== 'INPUT' && e.preventDefault();
};

const inputAddon = (
  className: string,
  node: React.ReactNode,
  style: object = {},
  onClick?: (e) => void
): React.ReactNode | null => {
  return node ? (
    <span style={style} className={className} onClick={onClick}>
      {node}
    </span>
  ) : null;
};

export function formatValue(value, maxLength) {
  const str =
    value !== null && !isUndefined(value) && !isString(value) ? String(value) : value || '';
  if (maxLength) {
    return str.slice(0, maxLength);
  }
  return str;
}

function Input(baseProps: InputProps, ref) {
  const { getPrefixCls, size: ctxSize, componentConfig, rtl } = useContext(ConfigContext);
  const props = useMergeProps<InputProps>(baseProps, {}, componentConfig?.Input);
  const {
    className,
    style: propsStyle,
    addBefore,
    addAfter,
    suffix,
    prefix,
    beforeStyle,
    afterStyle,
    height,
    disabled,
    maxLength,
    showWordLimit,
    allowClear,
    autoWidth: propsAutoWidth,
  } = props;

  const autoWidth = propsAutoWidth
    ? { minWidth: 0, maxWidth: '100%', ...(isObject(propsAutoWidth) ? propsAutoWidth : {}) }
    : null;

  const style = {
    minWidth: autoWidth?.minWidth,
    maxWidth: autoWidth?.maxWidth,
    width: autoWidth && 'auto',
    ...propsStyle,
  };

  const trueMaxLength = isObject(maxLength) ? maxLength.length : maxLength;
  const mergedMaxLength = isObject(maxLength) && maxLength.errorOnly ? undefined : trueMaxLength;

  const [focus, setFocus] = useState(false);
  const inputRef = useRef<RefInputType>();
  const inputWrapperRef = useRef();
  const [value, setValue] = useMergeValue('', {
    defaultValue:
      'defaultValue' in props ? formatValue(props.defaultValue, mergedMaxLength) : undefined,
    value: 'value' in props ? formatValue(props.value, mergedMaxLength) : undefined,
  });

  useImperativeHandle(ref, () => inputRef.current, []);

  const onChange = (value, e) => {
    if (!('value' in props)) {
      setValue(value);
    }
    props.onChange && props.onChange(value, e);
  };

  const prefixCls = getPrefixCls('input');
  const size = props.size || ctxSize;
  const isCustomHeight = 'height' in props;
  let suffixElement = suffix;
  const valueLength = value ? value.length : 0;

  const lengthError = useMemo(() => {
    if (!mergedMaxLength && trueMaxLength) {
      return valueLength > trueMaxLength;
    }
    return false;
  }, [valueLength, trueMaxLength, mergedMaxLength]);

  if (trueMaxLength && showWordLimit) {
    const [leftWord, rightWord] = rtl ? [trueMaxLength, valueLength] : [valueLength, trueMaxLength];
    suffixElement = (
      <span
        className={cs(`${prefixCls}-word-limit`, {
          [`${prefixCls}-word-limit-error`]: lengthError,
        })}
      >
        {leftWord}/{rightWord}
      </span>
    );
  }

  const classnames = cs(
    `${prefixCls}-group-wrapper`,
    `${prefixCls}-group-wrapper-${size}`,
    {
      [`${prefixCls}-custom-height`]: isCustomHeight,
      [`${prefixCls}-has-suffix`]: suffixElement,
      [`${prefixCls}-group-wrapper-disabled`]: disabled,
      [`${prefixCls}-group-wrapper-rtl`]: rtl,
      [`${prefixCls}-group-wrapper-autowidth`]: autoWidth,
    },
    className
  );
  const status = props.status || (props.error || lengthError ? 'error' : undefined);
  const needWrapper = addBefore || addAfter || suffixElement || prefix;
  const inputElement = (
    <InputComponent
      ref={inputRef}
      {...props}
      autoFitWidth={!!autoWidth}
      style={style}
      status={status}
      onFocus={(e) => {
        setFocus(true);
        props.onFocus && props.onFocus(e);
      }}
      onBlur={(e) => {
        setFocus(false);
        props.onBlur && props.onBlur(e);
      }}
      onChange={onChange}
      prefixCls={prefixCls}
      value={value}
      hasParent={!!needWrapper || allowClear}
      size={size}
    />
  );

  const innerWrapperClassnames = cs(`${prefixCls}-inner-wrapper`, {
    [`${prefixCls}-inner-wrapper-${status}`]: status,
    [`${prefixCls}-inner-wrapper-disabled`]: disabled,
    [`${prefixCls}-inner-wrapper-focus`]: focus,
    [`${prefixCls}-inner-wrapper-has-prefix`]: prefix,
    [`${prefixCls}-inner-wrapper-${size}`]: size,
    [`${prefixCls}-clear-wrapper`]: allowClear,
    [`${prefixCls}-inner-wrapper-rtl`]: rtl,
  });

  return needWrapper ? (
    <div className={classnames} style={{ ...style, ...(isCustomHeight ? { height } : {}) }}>
      <span className={`${prefixCls}-group`}>
        {inputAddon(`${prefixCls}-group-addbefore`, addBefore, beforeStyle)}
        <span
          className={innerWrapperClassnames}
          ref={inputWrapperRef}
          onMouseDown={(e) => {
            // 直接的点击input的时候，不阻止默认行为，避免无法选中输入框里的输入文本
            if ((e.target as HTMLElement).tagName !== 'INPUT') {
              // 当使用React.Portal挂载的组件（tooltip, popover等）放在prefix，suffix里是，弹层中的内容无法被选中。
              // contains 判断如果不包含在当前dom节点，则不阻止默认行为。
              if (inputWrapperRef.current && contains(inputWrapperRef.current, e.target)) {
                e.preventDefault();
              }
            }
          }}
          onClick={(e) => {
            // 当使用React.Portal挂载的组件（tooltip, popover等）放在prefix，suffix里时，弹出层被点击时，不应该focus input。
            if (inputWrapperRef.current && contains(inputWrapperRef.current, e.target)) {
              inputRef.current && inputRef.current.focus();
            }
          }}
        >
          {inputAddon(`${prefixCls}-group-prefix`, prefix)}
          {inputElement}
          {inputAddon(`${prefixCls}-group-suffix`, suffixElement)}
        </span>
        {inputAddon(`${prefixCls}-group-addafter`, addAfter, afterStyle)}
      </span>
    </div>
  ) : allowClear ? (
    <span
      className={cs(className, innerWrapperClassnames)}
      style={{ ...style, ...(isCustomHeight ? { height } : {}) }}
      onMouseDown={keepFocus}
      onClick={() => {
        inputRef.current && inputRef.current.focus();
      }}
    >
      {inputElement}
    </span>
  ) : (
    inputElement
  );
}

type InputRefType = ForwardRefExoticComponent<
  InputProps & React.RefAttributes<RefInputType> & MergePropsOptions
> & {
  Search: typeof Search;
  TextArea: typeof TextArea;
  Password: typeof Password;
  Group: typeof Group;
};

const InputElement = React.forwardRef(Input) as InputRefType;

InputElement.displayName = 'Input';

InputElement.Search = Search;

InputElement.TextArea = TextArea;

InputElement.Password = Password;

InputElement.Group = Group;

export type InputRef = InputRefType;

export default InputElement;
