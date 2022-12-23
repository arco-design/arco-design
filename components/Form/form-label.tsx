import React, { isValidElement, ReactElement, ReactNode } from 'react';
import IconQuestionCircle from '../../icon/react-icon/IconQuestionCircle';
import { isArray, isObject } from '../_util/is';
import { ID_SUFFIX } from './utils';
import { FormItemProps } from './interface';
import Tooltip, { TooltipProps } from '../Tooltip';
import cs from '../_util/classNames';

interface FormItemLabelProps
  extends Pick<FormItemProps, 'tooltip' | 'label' | 'requiredSymbol' | 'required' | 'rules'> {
  showColon: boolean | ReactNode;
  prefix: string;
  htmlFor?: string;
}

// 标签
const FormItemLabel: React.FC<FormItemLabelProps> = ({
  htmlFor,
  showColon,
  label,
  requiredSymbol,
  required,
  rules,
  prefix,
  tooltip,
}) => {
  const isRequiredRule = isArray(rules) && rules.some((rule) => rule && rule.required);
  const symbolPosition = isObject(requiredSymbol) ? requiredSymbol.position : 'start';

  const symbolNode = (required || isRequiredRule) && !!requiredSymbol && (
    <strong className={`${prefix}-form-item-symbol`}>
      <svg fill="currentColor" viewBox="0 0 1024 1024" width="1em" height="1em">
        <path d="M583.338667 17.066667c18.773333 0 34.133333 15.36 34.133333 34.133333v349.013333l313.344-101.888a34.133333 34.133333 0 0 1 43.008 22.016l42.154667 129.706667a34.133333 34.133333 0 0 1-21.845334 43.178667l-315.733333 102.4 208.896 287.744a34.133333 34.133333 0 0 1-7.509333 47.786666l-110.421334 80.213334a34.133333 34.133333 0 0 1-47.786666-7.509334L505.685333 706.218667 288.426667 1005.226667a34.133333 34.133333 0 0 1-47.786667 7.509333l-110.421333-80.213333a34.133333 34.133333 0 0 1-7.509334-47.786667l214.186667-295.253333L29.013333 489.813333a34.133333 34.133333 0 0 1-22.016-43.008l42.154667-129.877333a34.133333 34.133333 0 0 1 43.008-22.016l320.512 104.106667L412.672 51.2c0-18.773333 15.36-34.133333 34.133333-34.133333h136.533334z" />
      </svg>
    </strong>
  );

  const renderTooltip = () => {
    if (!tooltip) {
      return null;
    }
    const tooltipIconClassName = `${prefix}-form-item-tooltip`;
    let tooltipProps: TooltipProps = {};
    let tooltipIcon = <IconQuestionCircle className={tooltipIconClassName} />;
    if (!isObject(tooltip) || isValidElement(tooltip)) {
      tooltipProps = {
        content: tooltip,
      };
    } else {
      const { icon, ...rest } = tooltip as TooltipProps & { icon?: ReactElement };
      tooltipProps = rest;
      if (icon) {
        tooltipIcon = isValidElement(icon)
          ? React.cloneElement(icon as ReactElement, {
              className: cs(tooltipIconClassName, (icon as ReactElement).props.className),
            })
          : icon;
      }
    }
    return <Tooltip {...tooltipProps}>{tooltipIcon}</Tooltip>;
  };

  return label ? (
    <label htmlFor={htmlFor && `${htmlFor}${ID_SUFFIX}`}>
      {symbolPosition !== 'end' && symbolNode} {label}
      {renderTooltip()}
      {symbolPosition === 'end' && <> {symbolNode}</>}
      {showColon ? (showColon === true ? ':' : showColon) : ''}
    </label>
  ) : null;
};

export default FormItemLabel;
