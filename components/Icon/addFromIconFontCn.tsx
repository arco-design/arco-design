import * as React from 'react';
import Icon, { IconProps } from './index';
import { isServerRendering } from '../_util/dom';

const scriptUrlCache: string[] = [];

export interface IconfontOptions {
  src?: string;
  extraProps?: { [key: string]: any };
}

export default function addFromIconFontCn(
  options: IconfontOptions = {}
): React.FC<IconProps & React.RefAttributes<unknown>> {
  const { src, extraProps = {} } = options;

  if (
    !isServerRendering &&
    typeof src === 'string' &&
    src.length &&
    scriptUrlCache.indexOf(src) === -1
  ) {
    const script = document.createElement('script');
    script.setAttribute('src', src);
    script.setAttribute('data-namespace', src);
    scriptUrlCache.push(src);
    document.body.appendChild(script);
  }

  const Iconfont: React.FC<IconProps> = React.forwardRef((props, ref) => {
    const { type, children, ...restProps } = props;
    const iconRef = React.useRef<Icon>();

    React.useImperativeHandle(ref, () => iconRef.current);

    let content;
    if (type) {
      content = <use xlinkHref={`#${type}`} />;
    }
    if (children) {
      content = children;
    }
    return (
      <Icon
        type={type}
        {...restProps}
        {...extraProps}
        ref={(node) => {
          iconRef.current = node;
        }}
      >
        {content}
      </Icon>
    );
  });

  Iconfont.displayName = 'Iconfont';

  return Iconfont;
}
