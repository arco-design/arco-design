import { useMemo } from 'react';
import { isUndefined } from '../_util/is';
import { EllipsisConfig } from './interface';

const supportCss = (key, value) => {
  if (typeof window !== 'undefined' && window.CSS && window.CSS.supports) {
    if (!isUndefined(value)) {
      return window.CSS.supports(key, value);
    }
    return window.CSS.supports(key);
  }
  if (typeof document !== 'undefined' && document.createElement) {
    const elem = document.createElement('div');
    elem.setAttribute(`style`, `${key}:${value};`);
    return typeof elem.style[key] !== 'undefined';
  }
  return false;
};

const mutiEllipsisAttr = {
  display: ' -webkit-box',
  '-webkit-line-clamp': 2,
};

const isSupportMuti = () =>
  Object.entries(mutiEllipsisAttr).every(([key, value]) => supportCss(key, value));

function useCssEllipsis(props: EllipsisConfig) {
  const { cssEllipsis, ellipsisStr = '...', suffix, rows } = props;

  const simpleEllipsis = useMemo(() => {
    if (!cssEllipsis || (rows > 1 && !isSupportMuti())) {
      return false;
    }
    return ellipsisStr === '...' && !suffix;
  }, [ellipsisStr, cssEllipsis, rows, suffix]);

  const singleRowStyle = {
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
  };

  const mutiRowsStyle = {
    textOverflow: 'ellipsis',
    whiteSpace: 'normal',
    overflow: 'hidden',
    WebkitLineClamp: `${props.rows}`,
    WebkitBoxOrient: 'vertical',
    display: '-webkit-box',
  };

  return {
    simpleEllipsis,
    ellipsisStyle: simpleEllipsis ? (props.rows > 1 ? mutiRowsStyle : singleRowStyle) : {},
  };
}

export default useCssEllipsis;
