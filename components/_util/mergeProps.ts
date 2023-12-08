export default function mergeProps<PropsType>(
  _componentProps: PropsType,
  _defaultProps: Partial<PropsType>,
  _globalComponentConfig: PropsType,
  propsNameList?: string[]
): Partial<PropsType> {
  const defaultProps = _defaultProps || {};
  const globalComponentConfig = _globalComponentConfig || {};
  const componentProps = _componentProps || {};

  const propNameSet = propsNameList
    ? new Set(propsNameList)
    : new Set(
        Object.keys(componentProps)
          .concat(Object.keys(defaultProps))
          .concat(Object.keys(globalComponentConfig))
      );
  const props: Partial<PropsType> = {};

  propNameSet.forEach((propName) => {
    if (componentProps[propName] !== undefined) {
      props[propName] = componentProps[propName];
    } else if (propName in globalComponentConfig) {
      props[propName] = globalComponentConfig[propName];
    } else if (propName in defaultProps) {
      props[propName] = defaultProps[propName];
    }
  });

  return props;
}
