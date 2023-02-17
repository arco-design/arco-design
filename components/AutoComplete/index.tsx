import React, { useContext, useRef, isValidElement, useState, useImperativeHandle } from 'react';
import cs from '../_util/classNames';
import Input from '../Input';
import { ConfigContext } from '../ConfigProvider';
import useMergeValue from '../_util/hooks/useMergeValue';
import Select, { SelectHandle } from '../Select/select';
import { OptionInfo, SelectProps } from '../Select/interface';
import { isSelectOption, isSelectOptGroup } from '../Select/utils';
import { Enter, Esc } from '../_util/keycode';
import omit from '../_util/omit';
import { pickDataAttributes } from '../_util/pick';
import { RefInputType } from '../Input/interface';
import IconLoading from '../../icon/react-icon/IconLoading';
import { AutoCompleteProps } from './interface';
import useMergeProps from '../_util/hooks/useMergeProps';

const IMPOSSIBLE_VALUE = `Autocomplete_${Math.random()}`;

const { Option } = Select;

const defaultProps: AutoCompleteProps = {
  defaultActiveFirstOption: true,
  triggerElement: <Input />,
};

function AutoComplete(baseProps: AutoCompleteProps, ref) {
  const { getPrefixCls, componentConfig } = useContext(ConfigContext);
  const props = useMergeProps<AutoCompleteProps>(
    baseProps,
    defaultProps,
    componentConfig?.AutoComplete
  );
  const {
    style,
    className,
    children,
    data,
    defaultValue,
    value: propValue,
    placeholder,
    error,
    disabled,
    strict,
    allowClear,
    loading,
    defaultActiveFirstOption,
    triggerElement,
    getPopupContainer,
    dropdownRender,
    virtualListProps,
    onFocus,
    onBlur,
    onChange,
    onSearch,
    onSelect,
    onPressEnter,
    inputProps,
  } = props;

  const [value, setValue] = useMergeValue('', {
    defaultValue,
    value: propValue,
  });
  const [isFocused, setIsFocused] = useState(false);

  const refInput = useRef(null);
  const refSelect = useRef<SelectHandle>(null);

  const prefixCls = getPrefixCls('autocomplete');
  const filterOption =
    'filterOption' in props
      ? props.filterOption
      : (inputValue, option) => {
          if (strict) {
            return option.props.value.indexOf(inputValue) > -1;
          }
          return option.props.value.toLowerCase().indexOf(inputValue.toLowerCase()) > -1;
        };

  const childNodes = React.Children.toArray(children);
  let selectChildren = null;

  if (childNodes.length && (isSelectOption(childNodes[0]) || isSelectOptGroup(childNodes[0]))) {
    selectChildren = children;
  } else if (data && data.length) {
    selectChildren = data.map((item, index) => {
      if (isValidElement(item)) {
        return item;
      }
      if (typeof item === 'string') {
        return (
          <Option key={index} value={item}>
            {item}
          </Option>
        );
      }
      if (typeof item === 'object') {
        const { value, name } = item as any;
        return (
          <Option key={index} value={value} extra={omit(item, ['value', 'name'])}>
            {name}
          </Option>
        );
      }
      return null;
    });
  }

  useImperativeHandle(ref, () => refInput.current);

  const usedTriggerElement =
    typeof triggerElement === 'function' ? triggerElement({ value }) : triggerElement;
  const TriggerElement = React.cloneElement(usedTriggerElement, {
    ref: (node) => {
      refInput.current = node;

      const { ref: originRef } = usedTriggerElement as any;
      if (typeof originRef === 'function') {
        originRef(node);
      }
    },
    className: cs(`${prefixCls}`, inputProps && inputProps.className, className),
    style,
    value,
    placeholder,
    error,
    status: props.status,
    disabled,
    allowClear,
    ...inputProps,
    ...pickDataAttributes(props),
    // Empty tag to ensure the consistency of the dom structure of input, such that input won't accidentally lose focus due to structure change on input.
    suffix: loading ? <IconLoading /> : inputProps?.suffix || <i />,
    onFocus: (event) => {
      setIsFocused(true);
      onFocus?.(event);
      inputProps?.onFocus?.(event);
    },
    onBlur: (event) => {
      setIsFocused(false);
      onBlur?.(event);
      inputProps?.onBlur?.(event);
    },
    onKeyDown: (event) => {
      const keyCode = event.keyCode || event.which;
      refSelect.current?.hotkeyHandler?.(event);

      if (keyCode === Enter.code && onPressEnter) {
        let activeOption;
        if (refSelect.current) {
          activeOption = refSelect.current.getOptionInfoByValue(
            refSelect.current.activeOptionValue
          );
        }
        onPressEnter(event, activeOption);
      }

      if (keyCode === Esc.code) {
        refInput.current?.blur?.();
      }

      inputProps?.onKeyDown?.(event);
    },
    onChange: (value, event) => {
      setValue(value);
      onSearch?.(value);
      onChange?.(value);
      inputProps?.onChange?.(value, event);
    },
  });

  const triggerProps: SelectProps['triggerProps'] = {
    popupVisible: !!(isFocused && (data?.length || React.Children.count(children))),
    ...props.triggerProps,
    // Other trigger types are not supported yet
    trigger: 'focus',
    className: [`${prefixCls}-popup`].concat(props.triggerProps && props.triggerProps.className),
  };

  const selectProps: Partial<SelectProps> = {
    triggerElement: TriggerElement,
    // Guarantee that onChange can always be triggered
    value: IMPOSSIBLE_VALUE,
    inputValue: value,
    defaultActiveFirstOption,
    triggerProps,
    getPopupContainer,
    dropdownRender,
    filterOption,
    virtualListProps,
    notFoundContent: null,
    onChange: (value: string, option) => {
      setValue(value);
      onChange?.(value, option as OptionInfo);
      value && onSelect?.(value, option as OptionInfo);
      // Blur the input on option change
      refInput.current?.blur?.();
    },
  };

  return (
    <Select ref={refSelect} {...selectProps}>
      {selectChildren}
    </Select>
  );
}

const ForwardRefAutoComplete = React.forwardRef<RefInputType, AutoCompleteProps>(AutoComplete);

const AutoCompleteComponent = ForwardRefAutoComplete as typeof ForwardRefAutoComplete & {
  Option: typeof Select.Option;
  OptGroup: typeof Select.OptGroup;
};

AutoCompleteComponent.displayName = 'AutoComplete';

AutoCompleteComponent.Option = Select.Option;
AutoCompleteComponent.OptGroup = Select.OptGroup;

export default AutoCompleteComponent;

export { AutoCompleteProps };
