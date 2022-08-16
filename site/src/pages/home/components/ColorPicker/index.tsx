import React, { useEffect, useRef, useState } from 'react';
import { Trigger } from '@arco-design/web-react';
import { SketchPicker } from 'react-color';
import { generate, getRgbStr } from '@arco-design/color';
import styles from './style/index.module.less';
import useTheme from '../../hooks/useTheme';

interface Props {
  color?: string;
  onChange?: (color: string) => void;
  getPropertyWrapper?: () => HTMLDivElement;
}

export default function ColorPicker(props: Props) {
  const { getPropertyWrapper = () => document.body, color: propColor, onChange } = props;
  const { realTheme } = useTheme();
  const [color, setColor] = useState(propColor);
  const colorRef = useRef(color);

  function onColorChange(newColor) {
    const propertyWrapper = getPropertyWrapper();
    if (!propertyWrapper) return;
    const newList = generate(newColor, { list: true, dark: realTheme === 'dark' });
    newList.forEach((l, index) => {
      const rgbStr = getRgbStr(l);
      propertyWrapper.style.setProperty(`--primary-${index + 1}`, rgbStr);
    });
  }

  useEffect(() => {
    onColorChange(colorRef.current);
  }, [realTheme]);

  return (
    <Trigger
      trigger="click"
      position="bl"
      popup={() => (
        <SketchPicker
          color={color}
          onChangeComplete={({ hex }) => {
            onColorChange(hex);
            colorRef.current = hex;
            setColor(hex);
            onChange(hex);
          }}
        />
      )}
    >
      <div className={styles.color} style={{ background: color }} />
    </Trigger>
  );
}
