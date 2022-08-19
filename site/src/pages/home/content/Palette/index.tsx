import React, { useEffect, useRef, useState } from 'react';
import { IconMoonFill, IconSunFill } from '@arco-design/web-react/icon';
import { generate } from '@arco-design/color';
import useTheme from '../../hooks/useTheme';
import styles from './index.module.less';
import CardIntroduce from '../../components/CardIntroduce';
import useLocale from '../../hooks/useLocale';

const HANDLER_RADIUS = 125;

function hslToRgb(h, s = 1, l = 0.5) {
  let r, g, b;

  if (s === 0) {
    r = l;
    g = l;
    b = l;
  } else {
    const hueToRgb = (p, q, t) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };

    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    const t = h / 360;
    r = Math.round(hueToRgb(p, q, t + 1 / 3) * 255);
    g = Math.round(hueToRgb(p, q, t) * 255);
    b = Math.round(hueToRgb(p, q, t - 1 / 3) * 255);
  }

  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
}

function getHandlerPosition(cx, cy, r, angle) {
  const tx = cx + Math.sin((Math.PI / 180) * angle) * r;
  const ty = cy - Math.cos((Math.PI / 180) * angle) * r;

  return { x: tx, y: ty };
}

export default function Palette({ animation = true, onAnimation = () => {} }) {
  const { realTheme, onHandleTheme } = useTheme();
  const locale = useLocale();
  const hueRing = useRef(null);
  const [opacity, setOpacity] = useState(0);
  const [angle, setAngle] = useState(animation ? 280 : 215);
  const [handlerStyle, setHandlerStyle] = useState({ top: 0, left: 0 });

  function easeInOutCubic(x: number): number {
    return x < 0.5 ? 4 * x * x * x : 1 - (-2 * x + 2) ** 3 / 2;
  }

  const handleRaf = (rect, perAngle, times, total) => {
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const nextAngle = angle + perAngle * total * easeInOutCubic((total - times) / total);
    const { x, y } = getHandlerPosition(cx, cy, HANDLER_RADIUS, nextAngle);
    setAngle(nextAngle);
    setHandlerStyle({ top: y - rect.top, left: x - rect.left });
    if (times > 0) {
      window.requestAnimationFrame(() => {
        handleRaf(rect, perAngle, times - 1, total);
      });
    }
  };

  const handleTo = (rect, endAngle: number, time = 1000) => {
    const times = Math.round(time / 12);
    const perAngle = (Math.abs(angle - endAngle) / times) * (endAngle > angle ? 1 : -1);

    handleRaf(rect, perAngle, times, times);
    if (typeof onAnimation === 'function') {
      onAnimation();
    }
  };

  useEffect(() => {
    if (hueRing.current) {
      const rect = hueRing.current.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const { x, y } = getHandlerPosition(cx, cy, HANDLER_RADIUS, angle);
      setHandlerStyle({ top: y - rect.top, left: x - rect.left });

      if (animation) {
        handleTo(rect, 215);
      }
    }

    window.setTimeout(() => setOpacity(1));
  }, []);

  const handleClick = (e) => {
    if (hueRing.current) {
      const rect = hueRing.current.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const tan1 = (Math.atan2(cy - rect.top, 0) * 180) / Math.PI;
      const tan2 = (Math.atan2(cy - e.clientY, e.clientX - cx) * 180) / Math.PI;

      let angle = tan1 - tan2;
      if (angle < 0) angle = 360 + angle;
      const { x, y } = getHandlerPosition(cx, cy, HANDLER_RADIUS, angle);

      setAngle(angle);
      setHandlerStyle({ top: y - rect.top, left: x - rect.left });
    }
  };

  const handleMouseUp = () => {
    window.removeEventListener('mouseup', handleMouseUp);
    hueRing.current.removeEventListener('mousemove', handleClick);
  };

  const handleMouseDown = () => {
    hueRing.current.addEventListener('mousemove', handleClick);
    window.addEventListener('mouseup', handleMouseUp);
  };

  return (
    <div className={styles['color-body']} style={{ opacity }}>
      <ul className={styles['color-palette']}>
        {[2, 4, 6, 8, 9].map((value) => (
          <li
            className={styles['color-palette-item']}
            style={{
              backgroundColor: generate(hslToRgb(angle), {
                index: value,
                dark: realTheme === 'dark',
              }),
            }}
            key={value}
          />
        ))}
      </ul>
      <div className={styles['color-body-left']}>
        <div
          className={styles['color-picker']}
          onMouseDown={handleMouseDown}
          onClick={handleClick}
          ref={hueRing}
        >
          <div
            className={styles['color-mask']}
            onMouseDown={(e) => e.stopPropagation()}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className={styles['theme-btn']}
              onClick={() => {
                const newTheme = realTheme === 'dark' ? 'light' : 'dark';
                onHandleTheme(newTheme);
              }}
            >
              {realTheme === 'dark' ? <IconSunFill /> : <IconMoonFill />}
            </div>
          </div>
          <div
            id="color-picker-handle"
            className={styles['color-picker-handle']}
            style={handlerStyle}
          />
        </div>
      </div>
      <div className={styles['color-body-right']}>
        <CardIntroduce
          style={{ minHeight: 290, border: 'none' }}
          className={styles['color-card']}
          title={locale['content.palette.title']}
          description={
            <>
              <p>{locale['content.palette.desc.line1']}</p>
              <br />
              <p>{locale['content.palette.desc.line2']}</p>
            </>
          }
        />
      </div>
    </div>
  );
}
