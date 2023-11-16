import * as React from 'react';

interface FillerProps {
  /** Total height of list */
  height: number;
  /** offset value of the first element of the viewport */
  offset?: number;
  outerStyle?: React.CSSProperties;
  innerStyle?: React.CSSProperties;
  children: React.ReactNode;
}

/**
 * Create visual height for content
 */
const Filler: React.FC<FillerProps> = ({
  height,
  offset,
  children,
  outerStyle: propsOuterStyle,
  innerStyle: propsInnerStyle,
}): React.ReactElement => {
  let outerStyle: React.CSSProperties = {};

  let innerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
  };

  if (offset !== undefined) {
    outerStyle = {
      height,
      position: 'relative',
      overflow: 'hidden',
      zIndex: 0,
      ...propsOuterStyle,
    };

    innerStyle = {
      ...innerStyle,
      transform: `translateY(${offset}px)`,
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      ...propsInnerStyle,
    };
  }

  return (
    <div style={outerStyle}>
      <div style={innerStyle}>{children}</div>
    </div>
  );
};

export default Filler;
