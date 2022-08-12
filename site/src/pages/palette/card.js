import React from 'react';
import Color from 'color';
import { getColorString } from './utils';

function ColorCard({ colors, name, format, theme, title }) {
  return (
    <div>
      <h3 style={{ textAlign: 'center', color: theme === 'light' ? '#333' : '#fff' }}>{title}</h3>
      <div className="color-palette-wrapper">
        {colors.map((c, index) => {
          const color = Color(c);
          const whiteContrast = color.contrast(Color('#fff'));
          const blackContrast = color.contrast(Color('#000'));
          const fontColor = whiteContrast >= blackContrast ? '#fff' : '#000';
          // const contrast =
          //   whiteContrast >= blackContrast ? whiteContrast.toFixed(2) : blackContrast.toFixed(2);
          const colorString = getColorString(color, format);
          // const contrastLevel = color.level(Color(fontColor));
          return (
            <div
              key={index}
              className="color-palette-item"
              style={{
                backgroundColor: color.hex(),
                color: fontColor,
                fontWeight: index === 5 ? 'bold' : 400,
              }}
              aria-label={colorString}
            >
              <div className="color-palette-item-left">
                <div className="color-name">{`${name}-${index + 1}`}</div>
                {/* <div className="color-contrast">
                  色彩对比度: {contrast} ({contrastLevel})
                </div> */}
              </div>
              <span className="color-palette-value">{colorString}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ColorCard;
