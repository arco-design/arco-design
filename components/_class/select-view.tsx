import React, {
  ReactNode,
  CSSProperties,
  useContext,
  useState,
  useImperativeHandle,
  useRef,
  useEffect,
  ReactElement,
} from 'react';
import { pickDataAttributes } from '../_util/pick';
import { isUndefined, isObject, isFunction } from '../_util/is';
import cs from '../_util/classNames';
import { ConfigContext } from '../ConfigProvider';
import IconDown from '../../icon/react-icon/IconDown';
import IconLoading from '../../icon/react-icon/IconLoading';
import IconClose from '../../icon/react-icon/IconClose';
import IconSearch from '../../icon/react-icon/IconSearch';
import InputTag, { InputTagProps } from '../InputTag';
import InputComponent from '../Input/input-element';
import { ObjectValueType } from '../InputTag/interface';
import { InputComponentProps } from '../Input/interface';
import include from '../_util/include';
import useForceUpdate from '../_util/hooks/useForceUpdate';
import IconHover from './icon-hover';
import { Backspace, Enter } from '../_util/keycode';
import fillNBSP from '../_util/fillNBSP';

export interface SelectViewCommonProps
  extends Pick<InputTagProps<unknown>, 'animation' | 'renderTag' | 'dragToSort'> {
  id?: string;
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
   * @zh 是否是错误状态。(废弃，下个大版本移除，使用 status='error' 替代)
   * @en Whether the textarea is error.(Deprecated, removed in the next major version, use status='error' instead)
   * @deprecated
   */
  error?: boolean;
  /**
   * @zh 状态
   * @en Status
   * @version 2.45.0
   */
  status?: 'error' | 'warning';
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
   * @version Object type in 2.37.0
   */
  maxTagCount?:
    | number
    | {
        count: number;
        render?: (invisibleTagCount: number) => ReactNode;
      };
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
   * @zh 选择框前添加元素
   * @en The label text displayed before (on the left side of) the select field
   * @version 2.41.0
   */
  addBefore?: ReactNode;
  // /**
  //  * @zh 选择框后添加元素
  //  * @en The label text displayed after (on the right side of) the select field
  //  * @version 2.41.0
  //  */
  // addAfter?: ReactNode;
  /**
   * @zh 鼠标点击下拉框时的回调
   * @en Callback when the mouse clicks on the drop-down box
   */
  onClick?: (e) => void;
  /**
   * @zh 键盘输入时的回调
   * @en Callback when keyboard pressed
   * @version 2.40.0
   */
  onKeyDown?: (e) => void;
}

export interface SelectViewProps extends SelectViewCommonProps {
  // state ⬇️
  value?: any;
  popupVisible?: boolean;
  // other ⬇️
  isEmptyValue: boolean;
  isMultiple?: boolean;
  prefixCls: string;
  rtl?: boolean;
  ariaControls?: string;
  renderText: (value) => { text; disabled };
  renderView?: (eleView: ReactElement) => ReactElement;
  onSort?: (value) => void;
  onRemoveCheckedItem?: (item, index: number, e) => void;
  onChangeInputValue?: InputComponentProps['onChange'];
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

const MAX_TAG_COUNT_VALUE_PLACEHOLDER = '__arco_value_tag_placeholder';

export type SelectViewHandle = {
  dom: HTMLDivElement;
  focus: () => void;
  blur: () => void;
  getWidth: () => number;
};

const CoreSelectView = React.forwardRef(
  (props: SelectViewProps & { htmlDataAttributes: Record<string, string> }, ref) => {
    const {
      id,
      style,
      className,
      size,
      bordered,
      allowClear,
      allowCreate,
      status,
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
      ariaControls,
      renderTag,
      dragToSort,
      rtl,
      htmlDataAttributes,
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

      // <input> is used to input and display placeholder, in other cases use <span> to display value to support displaying rich text
      const needShowInput = !!((mergedFocused && canFocusInput) || isEmptyValue);
      const inputProps: InputComponentProps = {
        style: { width: '100%' },
        // _inputValue after renderText(value) may be rich text, but the value of <input> cannot be object
        value: needShowInput && typeof _inputValue !== 'object' ? _inputValue : '',
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
        inputProps.onChange = inputEventHandlers.change;
      } else {
        // Avoid input getting focus by Tab
        // Do NOT pass [disabled] to <input>, otherwise the click event will not be triggered
        // https://stackoverflow.com/questions/7833854/jquery-detect-click-on-disabled-submit-button
        inputProps.tabIndex = -1;
        inputProps.style.pointerEvents = 'none';
      }

      return (
        <span className={`${prefixCls}-view-selector`}>
          <InputComponent
            aria-hidden={!needShowInput || undefined}
            ref={refInput}
            disabled={disabled}
            className={cs(`${prefixCls}-view-input`, {
              [`${prefixCls}-hidden`]: !needShowInput,
            })}
            autoComplete="off"
            {...inputProps}
          />

          <span
            className={cs(`${prefixCls}-view-value`, {
              [`${prefixCls}-view-value-mirror`]: needShowInput,
            })}
          >
            {fillNBSP(isEmptyValue ? inputProps.placeholder : _inputValue)}
          </span>
        </span>
      );
    };

    const renderMultiple = () => {
      const usedValue = isUndefined(value) ? [] : [].concat(value as []);
      const maxTagCountNumber = isObject(maxTagCount) ? maxTagCount.count : maxTagCount;

      const maxTagCountRender =
        isObject(maxTagCount) && isFunction(maxTagCount.render)
          ? maxTagCount.render
          : (invisibleCount) => `+${invisibleCount}...`;

      const usedMaxTagCount =
        typeof maxTagCountNumber === 'number' ? Math.max(maxTagCountNumber, 0) : usedValue.length;
      const tagsToShow: ObjectValueType[] = [];
      let lastClosableTagIndex = -1;

      for (let i = usedValue.length - 1; i >= 0; i--) {
        const v = usedValue[i];
        const result = renderText(v);
        if (i < usedMaxTagCount) {
          tagsToShow.unshift({
            value: v,
            label: result.text,
            closable: !result.disabled,
          });
        }
        if (!result.disabled && lastClosableTagIndex === -1) {
          lastClosableTagIndex = i;
        }
      }

      const invisibleTagCount = usedValue.length - usedMaxTagCount;
      if (invisibleTagCount > 0) {
        tagsToShow.push({
          label: maxTagCountRender(invisibleTagCount),
          closable: false,
          // InputTag needs to extract value as key
          value: MAX_TAG_COUNT_VALUE_PLACEHOLDER,
        });
      }

      const eventHandlers = {
        onPaste: inputEventHandlers.paste,
        onKeyDown: inputEventHandlers.keyDown,
        onFocus: inputEventHandlers.focus,
        onBlur: inputEventHandlers.blur,
        onInputChange: inputEventHandlers.change,
        onRemove: (value, index, event) => {
          // Should always delete the last option value when press Backspace
          const keyCode = event.keyCode || event.which;
          if (keyCode === Backspace.code && lastClosableTagIndex > -1) {
            value = usedValue[lastClosableTagIndex];
            index = lastClosableTagIndex;
          }

          // If there is a limit on the maximum number of tags, the parameters passed into InputTag need to be recalculated
          maxTagCount && forceUpdate();
          onRemoveCheckedItem && onRemoveCheckedItem(value, index, event);
        },
      };

      // Avoid properties from configProvider affecting here
      const inputPropsOverrideConfigProvider: Partial<InputTagProps> = {
        suffix: null,
        prefix: null,
        addBefore: null,
        addAfter: null,
        allowClear: false,
        labelInValue: false,
      };

      return (
        <InputTag
          {...inputPropsOverrideConfigProvider}
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
          onChange={(newValue, reason) => {
            if (onSort && reason === 'sort') {
              const indexOfMaxTagCount = newValue.indexOf(MAX_TAG_COUNT_VALUE_PLACEHOLDER);
              // inject the invisible values tags to middle after dragging the "+x" tag
              if (indexOfMaxTagCount > -1) {
                const headArr = newValue.slice(0, indexOfMaxTagCount);
                const tailArr = newValue.slice(indexOfMaxTagCount + 1);
                const midArr = usedValue.slice(-invisibleTagCount);
                onSort(headArr.concat(midArr, tailArr));
              } else {
                onSort(newValue);
              }
            }
          }}
          {...eventHandlers}
        />
      );
    };

    const selectStatus = status || (props.error ? 'error' : undefined);

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
    const classNameStr = cs(
      prefixCls,
      `${prefixCls}-${isMultiple ? 'multiple' : 'single'}`,
      {
        [`${prefixCls}-show-search`]: showSearch,
        [`${prefixCls}-open`]: popupVisible,
        [`${prefixCls}-size-${mergedSize}`]: mergedSize,
        [`${prefixCls}-focused`]: mergedFocused,
        [`${prefixCls}-${selectStatus}`]: selectStatus,
        [`${prefixCls}-disabled`]: disabled,
        [`${prefixCls}-no-border`]: !bordered,
        [`${prefixCls}-rtl`]: rtl,
      },
      className
    );

    return (
      <div
        role="combobox"
        aria-haspopup="listbox"
        aria-autocomplete="list"
        aria-expanded={popupVisible}
        aria-disabled={disabled}
        aria-controls={ariaControls}
        {...include(rest, ['onClick', 'onMouseEnter', 'onMouseLeave'])}
        {...htmlDataAttributes}
        ref={refWrapper}
        tabIndex={disabled ? -1 : 0}
        id={id}
        style={style}
        className={classNameStr}
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
              aria-hidden="true"
              className={cs(`${prefixCls}-prefix`)}
              onMouseDown={(event) => focused && keepFocus(event)}
            >
              {prefix}
            </div>
          )}

          {isMultiple ? renderMultiple() : renderSingle()}

          <div
            aria-hidden="true"
            className={`${prefixCls}-suffix`}
            onMouseDown={(event) => focused && keepFocus(event)}
          >
            {mergedClearIcon}
            {mergedSuffixIcon}
          </div>
        </div>
      </div>
    );
  }
);

const SelectView = (props: SelectViewProps, ref) => {
  const { prefixCls, id, style, className, addBefore, rtl, renderView, ...rest } = props;

  const refCoreSelectView = useRef<SelectViewHandle>(null);

  const needAddBefore = addBefore !== null && addBefore !== undefined;
  // const needAddAfter = addAfter !== null && addAfter !== undefined;
  const needAddAfter = false;
  const needWrapper = needAddBefore || needAddAfter;
  const propsAppliedToRoot = { id, style, className };
  const htmlDataAttributes = pickDataAttributes(rest);

  useImperativeHandle<any, SelectViewHandle>(ref, () => refCoreSelectView.current);

  let eleCoreSelectView = (
    <CoreSelectView
      {...props}
      ref={refCoreSelectView}
      id={needWrapper ? undefined : propsAppliedToRoot.id}
      style={needWrapper ? undefined : propsAppliedToRoot.style}
      className={needWrapper ? undefined : propsAppliedToRoot.className}
      htmlDataAttributes={needWrapper ? {} : htmlDataAttributes}
    />
  );
  if (typeof renderView === 'function') {
    eleCoreSelectView = renderView(eleCoreSelectView);
  }

  if (!needWrapper) {
    return eleCoreSelectView;
  }

  return (
    <div
      {...htmlDataAttributes}
      {...propsAppliedToRoot}
      className={cs(
        `${prefixCls}-wrapper`,
        {
          [`${prefixCls}-wrapper-rtl`]: rtl,
        },
        propsAppliedToRoot.className
      )}
    >
      {needAddBefore && <div className={`${prefixCls}-addbefore`}>{addBefore}</div>}
      {eleCoreSelectView}
      {/* {needAddAfter && <div className={`${prefixCls}-addafter`}>{addAfter}</div>} */}
    </div>
  );
};

const SelectViewComponent = React.forwardRef<SelectViewHandle, SelectViewProps>(SelectView);

SelectViewComponent.displayName = 'SelectView';

export default SelectViewComponent;
