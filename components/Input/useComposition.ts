import {
  ChangeEventHandler,
  CompositionEventHandler,
  KeyboardEventHandler,
  useRef,
  useState,
} from 'react';
import { InputProps, TextAreaProps } from './interface';
import { Enter } from '../_util/keycode';

// Handle input text like Chinese
export default function useComposition({
  value,
  maxLength,
  onChange,
  onKeyDown,
  onPressEnter,
  beforeTriggerValueChangeCallback,
  normalizeHandler,
}: {
  value: string;
  maxLength: number;
  onChange: InputProps['onChange'];
  onKeyDown: InputProps['onKeyDown'] | TextAreaProps['onKeyDown'];
  onPressEnter: InputProps['onPressEnter'];
  beforeTriggerValueChangeCallback?: (newValue: string) => void;
  normalizeHandler?: (type: InputProps['normalizeTrigger'][number]) => InputProps['normalize'];
}): {
  compositionValue: string;
  triggerValueChangeCallback: typeof onChange;
  compositionHandler: CompositionEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  valueChangeHandler: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  keyDownHandler: KeyboardEventHandler<HTMLInputElement | HTMLTextAreaElement>;
} {
  const refIsComposition = useRef(false);
  const [compositionValue, setCompositionValue] = useState('');

  const triggerValueChangeCallback: typeof onChange = (newValue, e) => {
    if (beforeTriggerValueChangeCallback) {
      beforeTriggerValueChangeCallback(newValue);
    }

    if (
      onChange &&
      // https://github.com/arco-design/arco-design/issues/520
      // Avoid triggering onChange repeatedly for the same value
      // Compositionend is earlier than onchange in Firefox, different with chrome
      newValue !== value &&
      (maxLength === undefined || newValue.length <= maxLength)
    ) {
      onChange(newValue, e);
    }
  };

  return {
    compositionValue,
    triggerValueChangeCallback,
    compositionHandler: (e: any) => {
      refIsComposition.current = e.type !== 'compositionend';
      if (!refIsComposition.current) {
        setCompositionValue(undefined);
        triggerValueChangeCallback(e.target.value, e);
      }
    },
    valueChangeHandler: (e: any) => {
      const newValue = e.target.value;
      if (!refIsComposition.current) {
        compositionValue && setCompositionValue(undefined);
        triggerValueChangeCallback(newValue, e);
      } else {
        // https://github.com/arco-design/arco-design/issues/397
        // compositionupdate => onchange
        refIsComposition.current = false;
        setCompositionValue(newValue);
      }
    },
    keyDownHandler: (e: any) => {
      const keyCode = e.keyCode || e.which;

      if (!refIsComposition.current) {
        onKeyDown && onKeyDown(e);
        if (keyCode === Enter.code) {
          onPressEnter && onPressEnter(e);
          const normalize = normalizeHandler?.('onPressEnter');
          normalize && triggerValueChangeCallback(normalize(e.target.value), e);
        }
      }
    },
  };
}
