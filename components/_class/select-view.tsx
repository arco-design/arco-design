import React, {
  ReactNode,
  CSSProperties,
  useContext,
  useState,
  useImperativeHandle,
  useRef,
  useEffect,
} from 'react';
import { isUndefined, isObject } from '../_util/is';
import cs from '../_util/classNames';
import { ConfigContext } from '../ConfigProvider';
import IconDown from '../../icon/react-icon/IconDown';
import IconLoading from '../../icon/react-icon/IconLoading';
import IconClose from '../../icon/react-icon/IconClose';
import IconExpand from '../../icon/react-icon/IconExpand';
import IconSearch from '../../icon/react-icon/IconSearch';
import InputTag, { InputTagProps } from '../InputTag';
import InputComponent from '../Input/input-element';
import { ObjectValueType } from '../InputTag/interface';
import { InputComponentProps } from '../Input/interface';
import include from '../_util/include';
import useForceUpdate from '../_util/hooks/useForceUpdate';
import IconHover from './icon-hover';
import { Enter } from '../_util/keycode';

export interface SelectViewCommonProps
  extends Pick<InputTagProps<unknown>, 'animation' | 'renderTag' | 'dragToSort'> {
  style?: CSSProperties;
  className?: string | string[];
  children?: ReactNode;
  inputValue?: string;
  /**
   * @zh 选择框默认文字。
   * @en Placeholder of element
   */
  placeholder?: string;
  /**
   * @zh 是否需要边框
   * @en Whether to render border
   * @defaultValue true
   */
  bordered?: boolean;
  /**
   * @zh
   * 使单选模式可搜索，传入 `{ retainInputValue: true }` 在搜索框聚焦时保留现有内容
   * 传入 `{ retainInputValueWhileSelect: true }` 在多选选择时保留输入框内容。
   * @en
   * Whether single mode Select is searchable. `{ retainInputValue: true }` to retain the existing content when the search box is focused,
   * `{ retainInputValueWhileSelect: true }` to retain the existing content when multiple selection is selected.
   */
  showSearch?: boolean | { retainInputValue?: boolean; retainInputValueWhileSelect?: boolean };
  /**
   * @zh 分别不同尺寸的选择器。对应 `24px`, `28px`, `32px`, `36px`
   * @en Height of element, `24px` `28px` `32px` `36px`
   */
  size?: 'mini' | 'small' | 'default' | 'large';
  /**
   * @zh 是否为禁用状态。
   * @en Whether is disabled
   */
  disabled?: boolean;
  /**
   * @zh 是否为错误状态。
   * @en Error Style
   */
  error?: boolean;
  /**
   * @zh 是否为加载状态。
   * @en Whether is in loading
   */
  loading?: boolean;
  /**
   * @zh 允许清除值。
   * @en Whether allow to clear selected options
   */
  allowClear?: boolean;
  /**
   * @zh 是否允许通过输入创建新的选项。
   * @en Whether to allow new options to be created by input.
   * @version 2.13.0
   */
  allowCreate?: boolean;
  /**
   * @zh 最多显示多少个 `tag`，仅在多选或标签模式有效。
   * @en The maximum number of `tags` is displayed, only valid in `multiple` and `label` mode.
   */
  maxTagCount?: number;
  /**
   * @zh 前缀。
   * @en Customize select suffix
   * @version 2.11.0
   */
  prefix?: ReactNode;
  /**
   * @zh 自定义选择框后缀图标。
   * @en Customize select suffix icon
   */
  suffixIcon?: ReactNode;
  /**
   * @zh 自定义箭头图标，设置为 `null` 不显示箭头图标。
   * @en Customize select arrow icon.
   */
  arrowIcon?: ReactNode | null;
  /**
   * @zh 多选时配置选中项的删除图标。当传入`null`，不显示删除图标。
   * @en Customize the delete icon of tags selected in `multiple` and `label` mode.
   */
  removeIcon?: ReactNode | null;
  /**
   * @zh `allowClear` 时配置清除按钮的图标。
   * @en Configure the icon of the clear button when `allowClear`.
   * @version 2.26.0
   */
  clearIcon?: ReactNode;
  /**
   * @zh 鼠标点击下拉框时的回调
   * @en Callback when the mouse clicks on the drop-down box
   */
  onClick?: (e) => void;
}

export interface SelectViewProps extends SelectViewCommonProps {
  // state ⬇️
  value?: any;
  popupVisible?: boolean;
  // other ⬇️
  isEmptyValue: boolean;
  isMultiple?: boolean;
  prefixCls: string;
  renderText: (value) => { text; disabled };
  onSort?: (value) => void;
  onRemoveCheckedItem?: (item, index: number, e) => void;
  onChangeInputValue?: InputComponentProps['onValueChange'];
  onKeyDown?: (e) => void;
  onPaste?: (e) => void;
  onClear?: (e) => void;
  onFocus?: (e) => void;
  onBlur?: (e) => void;
}

const SearchStatus = {
  BEFORE: 0,
  EDITING: 1,
  NONE: 2,
};

export type SelectViewHandle = {
  dom: HTMLDivElement;
  focus: () => void;
  blur: () => void;
  getWidth: () => number;
};

export const SelectView = (props: SelectViewProps, ref) => {
  const {
    style,
    className,
    size,
    bordered,
    allowClear,
    allowCreate,
    error,
    loading,
    disabled,
    animation,
    prefixCls,
    suffixIcon,
    arrowIcon,
    removeIcon,
    clearIcon,
    placeholder,
    renderText,
    value,
    inputValue,
    popupVisible,
    maxTagCount,
    isMultiple,
    isEmptyValue,
    prefix,
    renderTag,
    dragToSort,
    onKeyDown,
    onChangeInputValue,
    onPaste,
    onClear,
    onFocus,
    onBlur,
    onRemoveCheckedItem,
    onSort,
    ...rest
  } = props;

  // refs
  const refInput = useRef(null);
  const refWrapper = useRef(null);

  // state
  const { size: ctxSize, getPrefixCls } = useContext(ConfigContext);
  const [searchStatus, setSearchStatus] = useState(SearchStatus.NONE);
  const [focused, setFocused] = useState(false);

  const forceUpdate = useForceUpdate();

  // TODO：Will the search be completely controlled by showSearch? Next major version needs to be considered
  const showSearch = 'showSearch' in props ? props.showSearch : isMultiple;
  const canFocusInput = showSearch || allowCreate;
  const mergedSize = size || ctxSize;
  const mergedFocused = focused || popupVisible;
  const isRetainInputValueSearch = isObject(showSearch) && showSearch.retainInputValue;
  // the formatted text of value.
  const renderedValue = !isMultiple && value !== undefined ? renderText(value).text : '';

  // Avoid losing focus caused by clicking certain icons
  const keepFocus = (event) => {
    event && event.preventDefault();
  };

  const handleFocus = (action: 'focus' | 'blur') => {
    const element = canFocusInput ? refInput.current : refWrapper.current;
    if (element) {
      action === 'focus' ? element.focus() : element.blur();
    }
  };

  const tryTriggerFocusChange = (action: 'focus' | 'blur', event) => {
    // The focus event at this time should be triggered by the input element
    if (canFocusInput && event.target === refWrapper.current) {
      return;
    }
    if (action === 'focus') {
      setFocused(true);
      onFocus && onFocus(event);
    } else {
      setFocused(false);
      onBlur && onBlur(event);
    }
  };

  const tryTriggerKeyDown = (event) => {
    // The keyboard event at this time should be triggered by the input element, ignoring the bubbling up keyboard event
    if (canFocusInput && event.currentTarget === refWrapper.current) {
      return;
    }

    // Prevent the default behavior of the browser when pressing Enter, to avoid submit event in <form>
    const keyCode = event.keyCode || event.which;
    if (keyCode === Enter.code) {
      event.preventDefault();
    }

    onKeyDown && onKeyDown(event);
  };

  useEffect(() => {
    handleFocus(popupVisible ? 'focus' : 'blur');
    if (canFocusInput) {
      setSearchStatus(popupVisible ? SearchStatus.BEFORE : SearchStatus.NONE);
    }
  }, [popupVisible]);

  useImperativeHandle<any, SelectViewHandle>(ref, () => ({
    dom: refWrapper.current,
    focus: handleFocus.bind(null, 'focus'),
    blur: handleFocus.bind(null, 'blur'),
    getWidth: () => refWrapper.current && refWrapper.current.clientWidth,
  }));

  const mergedArrowIcon =
    'arrowIcon' in props ? (
      arrowIcon === null ? null : (
        <div className={`${prefixCls}-arrow-icon`}>{arrowIcon}</div>
      )
    ) : canFocusInput ? (
      <div className={`${prefixCls}-expand-icon`}>
        <IconExpand style={{ transform: 'rotate(-45deg)' }} />
      </div>
    ) : (
      <div className={`${prefixCls}-arrow-icon`}>
        <IconDown />
      </div>
    );

  const mergedSuffixIcon = loading ? (
    <span className={`${prefixCls}-loading-icon`}>
      <IconLoading />
    </span>
  ) : suffixIcon ? (
    <span className={`${prefixCls}-suffix-icon`}>{suffixIcon}</span>
  ) : props.showSearch && popupVisible ? (
    <div className={`${prefixCls}-search-icon`}>
      <IconSearch />
    </div>
  ) : (
    mergedArrowIcon
  );

  // event handling of input box
  const inputEventHandlers = {
    paste: onPaste,
    keyDown: tryTriggerKeyDown,
    focus: (event) => {
      event.stopPropagation();
      tryTriggerFocusChange('focus', event);
    },
    blur: (event) => {
      event.stopPropagation();
      tryTriggerFocusChange('blur', event);
    },
    change: (newValue, event) => {
      setSearchStatus(SearchStatus.EDITING);
      onChangeInputValue && onChangeInputValue(newValue, event);
    },
  };

  const renderSingle = () => {
    let _inputValue: string;

    switch (searchStatus) {
      case SearchStatus.BEFORE:
        _inputValue = inputValue || (isRetainInputValueSearch ? renderedValue : '');
        break;
      case SearchStatus.EDITING:
        _inputValue = inputValue || '';
        break;
      default:
        _inputValue = renderedValue;
        break;
    }

    const inputProps: InputComponentProps = {
      style: { width: '100%' },
      // _inputValue after renderText(value) may be rich text, but the value of <input> cannot be object
      value: typeof _inputValue !== 'object' ? _inputValue : '',
      // Allow placeholder to display the selected value first when searching
      placeholder:
        canFocusInput && renderedValue && typeof renderedValue !== 'object'
          ? renderedValue
          : placeholder,
    };

    if (canFocusInput) {
      inputProps.onPaste = inputEventHandlers.paste;
      inputProps.onKeyDown = inputEventHandlers.keyDown;
      inputProps.onFocus = inputEventHandlers.focus;
      inputProps.onBlur = inputEventHandlers.blur;
      inputProps.onValueChange = inputEventHandlers.change;
    } else {
      // Avoid input getting focus by Tab
      // Do NOT pass [disabled] to <input>, otherwise the click event will not be triggered
      // https://stackoverflow.com/questions/7833854/jquery-detect-click-on-disabled-submit-button
      inputProps.tabIndex = -1;
      inputProps.style.pointerEvents = 'none';
    }

    // <input> is used to input and display placeholder, in other cases use <span> to display value to support displaying rich text
    const needShowInput = (mergedFocused && canFocusInput) || isEmptyValue;

    return (
      <>
        <InputComponent
          ref={refInput}
          disabled={disabled}
          className={cs(`${prefixCls}-view-input`, {
            [`${prefixCls}-hidden`]: !needShowInput,
          })}
          {...inputProps}
        />
        <span className={cs(`${prefixCls}-view-value`, { [`${prefixCls}-hidden`]: needShowInput })}>
          {_inputValue}
        </span>
      </>
    );
  };

  const renderMultiple = () => {
    const usedValue = isUndefined(value) ? [] : [].concat(value as []);
    const usedMaxTagCount =
      typeof maxTagCount === 'number' ? Math.max(maxTagCount, 0) : usedValue.length;
    const tagsToShow: ObjectValueType[] = usedValue.slice(0, usedMaxTagCount).map((v) => {
      const result = renderText(v);
      return {
        value: v,
        label: result.text,
        closable: !result.disabled,
      };
    });
    const invisibleTagCount = usedValue.length - usedMaxTagCount;

    if (invisibleTagCount > 0) {
      tagsToShow.push({
        label: `+${invisibleTagCount}...`,
        closable: false,
        // InputTag needs to extract value as key
        value: '__arco_value_tag_placeholder',
      });
    }

    const eventHandlers = {
      onPaste: inputEventHandlers.paste,
      onKeyDown: inputEventHandlers.keyDown,
      onFocus: inputEventHandlers.focus,
      onBlur: inputEventHandlers.blur,
      onInputChange: inputEventHandlers.change,
      onRemove: (value, index, event) => {
        // If there is a limit on the maximum number of tags, the parameters passed into InputTag need to be recalculated
        maxTagCount && forceUpdate();
        onRemoveCheckedItem && onRemoveCheckedItem(value, index, event);
      },
    };

    return (
      <InputTag
        // Avoid when clicking outside the browser window, InputTag out of focus
        className={mergedFocused ? `${getPrefixCls('input-tag')}-focus` : ''}
        ref={refInput}
        disabled={disabled}
        dragToSort={dragToSort}
        disableInput={!showSearch}
        animation={animation}
        placeholder={placeholder}
        value={tagsToShow}
        inputValue={inputValue}
        size={mergedSize}
        tagClassName={`${prefixCls}-tag`}
        renderTag={renderTag}
        icon={{ removeIcon }}
        onChange={(value, reason) => {
          if (onSort && reason === 'sort') {
            onSort(value);
          }
        }}
        {...eventHandlers}
      />
    );
  };

  const classNames = cs(
    prefixCls,
    `${prefixCls}-${isMultiple ? 'multiple' : 'single'}`,
    {
      [`${prefixCls}-show-search`]: showSearch,
      [`${prefixCls}-open`]: popupVisible,
      [`${prefixCls}-size-${mergedSize}`]: mergedSize,
      [`${prefixCls}-focused`]: mergedFocused,
      [`${prefixCls}-error`]: error,
      [`${prefixCls}-disabled`]: disabled,
      [`${prefixCls}-no-border`]: !bordered,
    },
    className
  );

  const mergedClearIcon =
    !disabled && !isEmptyValue && allowClear ? (
      <IconHover
        size={mergedSize}
        key="clearIcon"
        className={`${prefixCls}-clear-icon`}
        onClick={onClear}
        onMouseDown={keepFocus}
      >
        {clearIcon !== undefined && clearIcon !== null ? clearIcon : <IconClose />}
      </IconHover>
    ) : null;

  return (
    <div
      {...include(rest, ['onClick', 'onMouseEnter', 'onMouseLeave'])}
      ref={refWrapper}
      tabIndex={disabled ? -1 : 0}
      style={style}
      className={classNames}
      // When there is an input box, the keyboard events are handled inside the input box to avoid triggering redundant events in the Chinese input method
      onKeyDown={tryTriggerKeyDown}
      onFocus={(event) => {
        if (!disabled && !dragToSort) {
          // Focus on the input, otherwise you need to press the Tab key twice to focus on the input box
          if (canFocusInput) {
            refInput.current && refInput.current.focus();
          } else {
            tryTriggerFocusChange('focus', event);
          }
        }
      }}
      onBlur={(event) => tryTriggerFocusChange('blur', event)}
    >
      <div
        title={typeof renderedValue === 'string' ? renderedValue : undefined}
        className={cs(`${prefixCls}-view`, {
          [`${prefixCls}-view-with-prefix`]: prefix,
        })}
        onClick={(e) => popupVisible && canFocusInput && e.stopPropagation()}
      >
        {prefix && (
          <div
            className={cs(`${prefixCls}-prefix`)}
            onMouseDown={(event) => focused && keepFocus(event)}
          >
            {prefix}
          </div>
        )}

        {isMultiple ? renderMultiple() : renderSingle()}

        <div className={`${prefixCls}-suffix`} onMouseDown={(event) => focused && keepFocus(event)}>
          {mergedClearIcon}
          {mergedSuffixIcon}
        </div>
      </div>
    </div>
  );
};

const SelectViewComponent = React.forwardRef<SelectViewHandle, SelectViewProps>(SelectView);

SelectViewComponent.displayName = 'SelectView';

export default SelectViewComponent;
