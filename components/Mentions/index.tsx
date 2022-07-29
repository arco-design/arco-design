import React, { useContext, useEffect, useRef, useState } from 'react';
import cs from '../_util/classNames';
import { ConfigContext } from '../ConfigProvider';
import Input from '../Input';
import Select from '../Select';
import { MentionsProps } from './interface';
import { ArrowDown, ArrowUp, Enter, Esc } from '../_util/keycode';
import { getBeforeSelectionText, getLastMeasureIndex, isValidSearch } from './utils';
import useMergeValue from '../_util/hooks/useMergeValue';
import useMergeProps from '../_util/hooks/useMergeProps';

const TextArea = Input.TextArea;

const FunctionalKeyCodeList = [Esc.code, Enter.code, ArrowUp.code, ArrowDown.code];

const defaultProps: MentionsProps = {
  prefix: '@',
  split: ' ',
  rows: 1,
  position: 'bl',
  alignTextarea: true,
};

function Mentions(baseProps: MentionsProps, ref) {
  const { getPrefixCls, componentConfig, rtl } = useContext(ConfigContext);
  const props = useMergeProps<MentionsProps>(baseProps, defaultProps, componentConfig?.Mentions);
  const {
    style,
    className,
    options,
    prefix,
    split,
    position,
    alignTextarea,
    filterOption,
    triggerProps,
    getPopupContainer,
    onChange,
    onSearch,
    notFoundContent,
    ...rest
  } = props;

  const prefixCls = getPrefixCls('mentions');

  const refSelect = useRef(null);
  const refMeasure = useRef(null);
  const refTextarea = useRef(null);

  const [value, setValue] = useMergeValue('', {
    value: props.value,
    defaultValue: props.defaultValue,
  });
  const [measureInfo, setMeasureInfo] = useState({
    measuring: false,
    location: 0,
    text: '',
    prefix: '',
  });

  useEffect(() => {
    if (refTextarea.current && refMeasure.current) {
      refMeasure.current.scrollTop = refTextarea.current.dom.scrollTop;
    }
  });

  const stopMeasure = () => {
    setMeasureInfo({
      ...measureInfo,
      measuring: false,
      location: 0,
      text: '',
    });
  };

  const handleOptionSelect = (optionValue) => {
    const measureStart = measureInfo.location;
    const measureEnd = measureInfo.location + measureInfo.text.length;
    let head = value.slice(0, measureStart);
    let tail = value.slice(measureEnd + 1);
    head += !head || head.endsWith(split) || head.endsWith('\n') ? '' : split;
    tail = (!tail || tail.startsWith(split) || tail.startsWith('\n') ? '' : split) + tail;
    // If the content already exists before or after the matched content, add a split character
    const match = `${measureInfo.prefix}${optionValue}`;
    const nextValue = `${head}${match}${tail}`;

    setValue(nextValue);
    stopMeasure();
    onChange && onChange(nextValue);
  };

  const textAreaEventHandlers = {
    onChange: (value) => {
      setValue(value);
      onChange && onChange(value);
    },
    onKeyDown: (event) => {
      const keyCode = event.keyCode || event.which;

      if (keyCode === Esc.code) {
        refTextarea.current && refTextarea.current.blur();
      }

      if (refSelect.current) {
        refSelect.current.hotkeyHandler(event);

        if (keyCode === Enter.code || keyCode === ArrowUp.code || keyCode === ArrowDown.code) {
          event.preventDefault();
        }
      }
    },
    onKeyUp: (event) => {
      const { key, which: keyCode, target } = event;

      // return immediately when hit any one of the function keys
      if (~FunctionalKeyCodeList.indexOf(keyCode)) {
        return;
      }

      const textBeforeSelection = getBeforeSelectionText(target);
      const { location: measureIndex, prefix: measurePrefix } = getLastMeasureIndex(
        textBeforeSelection,
        prefix
      );
      const measureText = textBeforeSelection.slice(measureIndex + measurePrefix.length);

      if (measureIndex > -1 && isValidSearch(measureText, props)) {
        if (key === measurePrefix || measureInfo.measuring || measureText !== measureInfo.text) {
          setMeasureInfo({
            measuring: true,
            text: measureText,
            prefix: measurePrefix,
            location: measureIndex,
          });
        }

        onSearch && onSearch(measureText, measurePrefix);
      } else if (measureInfo.measuring) {
        stopMeasure();
      }
    },
    onBlur: stopMeasure,
  };

  // Pass [value: undefined] to Select, make sure onChange callback will always be triggered
  // Only parameter of Select.onChange is needed, Select.value is not important cause Select is hidden
  return (
    <div
      ref={ref}
      style={style}
      className={cs(
        `${prefixCls}`,
        { [`${prefixCls}-align-textarea`]: alignTextarea, [`${prefixCls}-rtl`]: rtl },
        className
      )}
    >
      <TextArea
        ref={refTextarea}
        className={`${prefixCls}-textarea`}
        value={value}
        {...textAreaEventHandlers}
        {...rest}
      />
      <div ref={refMeasure} className={`${prefixCls}-measure`}>
        {value.slice(0, measureInfo.location)}
        <Select
          ref={refSelect}
          options={options}
          inputValue={measureInfo.text}
          notFoundContent={notFoundContent}
          triggerElement={
            <span className={`${prefixCls}-measure-trigger`}>{measureInfo.prefix}</span>
          }
          triggerProps={{
            popupVisible: measureInfo.measuring,
            autoAlignPopupWidth: alignTextarea,
            position,
            ...triggerProps,
          }}
          filterOption={filterOption}
          getPopupContainer={getPopupContainer}
          value={undefined}
          onChange={handleOptionSelect}
        />
        {value.slice(measureInfo.location + measureInfo.prefix.length)}
      </div>
    </div>
  );
}

const MentionsComponent = React.forwardRef<unknown, MentionsProps>(Mentions);

MentionsComponent.displayName = 'Mentions';

export default MentionsComponent;

export { MentionsProps };
