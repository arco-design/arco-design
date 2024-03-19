import React, { useEffect, useRef, forwardRef } from 'react';
import cs from '../_util/classNames';
import { EditContentProps } from './interface';
import Input from '../Input';
import mergedToString from '../_util/mergedToString';

function EditContent(props: EditContentProps, ref) {
  const { prefixCls, children, setEditing, editableConfig, style } = props;
  const className = cs(`${prefixCls}-typography`, `${prefixCls}-edit-content`, props.className);

  const str = mergedToString(children);

  const input = useRef(null);

  useEffect(() => {
    input.current && input.current.focus && input.current.focus();
    if (input.current && input.current.dom) {
      const { length } = input.current.dom.value;
      input.current.dom.setSelectionRange(length, length);
    }
  }, []);

  function onEnd() {
    setEditing(false);
    editableConfig.onEnd && editableConfig.onEnd(str);
  }

  function onChange(value) {
    editableConfig.onChange && editableConfig.onChange(value);
  }

  function onBlur() {
    onEnd();
  }

  return (
    <div className={className} style={style} ref={ref}>
      <Input.TextArea
        className={`${prefixCls}-edit-content-textarea`}
        onBlur={onBlur}
        ref={input}
        value={str}
        autoSize
        onChange={onChange}
        onPressEnter={onEnd}
      />
    </div>
  );
}

export default forwardRef<HTMLDivElement, EditContentProps>(EditContent);
