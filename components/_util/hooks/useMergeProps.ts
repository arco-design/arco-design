import { useMemo } from 'react';

export default function useMergeProps<PropsType>(
  componentProps: PropsType,
  defaultProps: Partial<PropsType>,
  globalComponentConfig: Partial<PropsType>
): PropsType {
  const _defaultProps = useMemo(() => {
    return { ...defaultProps, ...globalComponentConfig };
  }, [defaultProps, globalComponentConfig]);

  const props = useMemo(() => {
    const mProps = { ...componentProps };

    // https://github.com/facebook/react/blob/cae635054e17a6f107a39d328649137b83f25972/packages/react/src/ReactElement.js#L312
    for (const propName in _defaultProps) {
      if (mProps[propName] === undefined) {
        mProps[propName] = _defaultProps[propName];
      }
    }

    return mProps;
  }, [componentProps, _defaultProps]);

  return props;
}
