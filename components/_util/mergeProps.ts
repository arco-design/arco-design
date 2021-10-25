export default function mergeProps<PropsType>(
  componentProps: PropsType,
  defaultProps: Partial<PropsType>,
  globalComponentConfig: PropsType
): PropsType {
  const _defaultProps = { ...defaultProps, ...globalComponentConfig };
  const props = { ...componentProps };

  // https://github.com/facebook/react/blob/cae635054e17a6f107a39d328649137b83f25972/packages/react/src/ReactElement.js#L312
  for (const propName in _defaultProps) {
    if (props[propName] === undefined) {
      props[propName] = _defaultProps[propName];
    }
  }

  return props;
}
