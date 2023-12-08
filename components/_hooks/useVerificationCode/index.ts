import { useMemo, ClipboardEvent, useEffect } from 'react';
import isEqualWith from 'lodash/isEqualWith';
import { isExist } from '../../_util/is';
import { Backspace } from '../../_util/keycode';
import useMergeValue from '../../_util/hooks/useMergeValue';
import { VerificationCodeReturnType, VerificationCodeOptions } from './interface';

// 默认长度
const defaultLength = 6;

export default function useVerificationCode(
  props: VerificationCodeOptions
): VerificationCodeReturnType {
  const [value, setValue] = useMergeValue('', props);

  const length = +props.length > 0 ? +props.length : defaultLength;

  const filledValue: string[] = useMemo(() => {
    const newVal = value ? String(value).split('') : [];
    return new Array(length).fill('').map((_, index) => {
      return isExist(newVal[index]) ? String(newVal[index]) : '';
    }) as string[];
  }, [value, length]);

  const focusFirstEmptyInput = () => {
    const nodeList = props.getInputRefList?.() || [];

    if (nodeList?.indexOf(document.activeElement as any) === -1) {
      return;
    }

    const index = filledValue.findIndex((x) => !x);

    if (index > -1) {
      const realIndex = Math.min(index, nodeList.length - 1);

      nodeList[realIndex]?.focus?.();
    }
  };

  useEffect(() => {
    focusFirstEmptyInput();
  }, [JSON.stringify(filledValue)]);

  const tryUpdateValue = (newVal: string) => {
    if (!isEqualWith(newVal, value)) {
      setValue(newVal);

      props.onChange?.(newVal);

      if (newVal.length === length) {
        props.onFinish?.(newVal);
      }
    }
  };

  const handlePaste = (e: ClipboardEvent, index) => {
    e.preventDefault();
    const clipboardData = e.clipboardData;
    const text = clipboardData.getData('text');
    if (text) {
      tryUpdateValue(filledValue.slice(0, index).concat(text.split('')).join(''));
    }
  };

  return {
    value,
    filledValue,
    setValue: tryUpdateValue,
    getInputProps: (index) => {
      const indexVal = String(filledValue[index]);
      return {
        key: index,
        value: indexVal,
        onClick: (e) => {
          e.preventDefault();
          if (!filledValue[index]) {
            focusFirstEmptyInput();
          }
        },
        onKeyDown: (e) => {
          const keyCode = e.keyCode || e.which;
          if (keyCode === Backspace.code) {
            if (filledValue[index + 1]) {
              e.preventDefault();
              // 避免后面的数移位
              return;
            }
            let _index = index;
            if (!filledValue[index]) {
              _index -= 1;
            }
            const newVal = [...filledValue];
            newVal[_index] = '';
            tryUpdateValue(newVal.join(''));
          }
        },
        onChange: (v) => {
          const char = v?.trim() || '';
          const newVal = [...filledValue];
          newVal[index] = char.replace(indexVal, '').split('').pop() || '';

          tryUpdateValue(newVal.join(''));
        },
        onPaste: (e: ClipboardEvent) => {
          handlePaste(e, index);
        },
      };
    },
  };
}
