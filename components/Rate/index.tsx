import React, { useState, useContext } from 'react';
import NP from 'number-precision';
import cs from '../_util/classNames';
import IconStarFill from '../../icon/react-icon/IconStarFill';
import IconFaceMehFill from '../../icon/react-icon/IconFaceMehFill';
import IconFaceSmileFill from '../../icon/react-icon/IconFaceSmileFill';
import IconFaceFrownFill from '../../icon/react-icon/IconFaceFrownFill';
import { ConfigContext } from '../ConfigProvider';
import Tooltip from '../Tooltip';
import omit from '../_util/omit';
import { RateProps } from './interface';
import useMergeProps from '../_util/hooks/useMergeProps';

NP.enableBoundaryChecking(false);

const defaultProps: RateProps = {
  character: <IconStarFill />,
  count: 5,
};

function Rate(baseProps: RateProps, ref) {
  const { getPrefixCls, componentConfig, rtl } = useContext(ConfigContext);
  const props = useMergeProps<RateProps>(baseProps, defaultProps, componentConfig?.Rate);
  const {
    style = {},
    className,
    defaultValue,
    character,
    count,
    value: propValue,
    tooltips,
    allowHalf,
    allowClear,
    readonly,
    disabled,
    grading,
    onChange,
    onHoverChange,
    ...restProps
  } = props;

  const [value, setValue] = useState<number>(defaultValue || propValue || 0);
  const [hoverIndex, setHoverIndex] = useState<number>(0);
  const [animation, setAnimation] = useState<boolean>();

  const prefixCls = getPrefixCls('rate');
  const classNames = cs(
    prefixCls,
    {
      [`${prefixCls}-readonly`]: readonly,
      [`${prefixCls}-disabled`]: disabled,
      [`${prefixCls}-rtl`]: rtl,
    },
    className
  );
  const mergedValue = 'value' in props ? propValue : value;

  const resetHoverIndex = () => {
    if (hoverIndex) {
      setHoverIndex(0);
      onHoverChange && onHoverChange(0);
    }
  };

  const onMouseEnter = (index, isHalf) => {
    const newHoverIndex = isHalf && allowHalf ? index + 0.5 : index + 1;
    if (newHoverIndex !== hoverIndex) {
      setHoverIndex(newHoverIndex);
      onHoverChange && onHoverChange(newHoverIndex);
    }
  };

  const onClick = (index, isHalf) => {
    const newValue = isHalf && allowHalf ? index + 0.5 : index + 1;
    setAnimation(true);
    if (newValue !== mergedValue) {
      setValue(newValue);
      onChange && onChange(newValue);
    } else if (allowClear) {
      setValue(0);
      onChange && onChange(0);
      resetHoverIndex();
    }
  };

  const renderCharacter = (index: number) => {
    // fix number like 3.7
    const fixedValue = allowHalf
      ? NP.times(+NP.divide(mergedValue || 0, 0.5).toFixed(0), 0.5)
      : Math.round(mergedValue);
    const _usedIndex = hoverIndex || fixedValue;
    let _usedCharacter = typeof character === 'function' ? character(index) : character;
    if (grading) {
      if (_usedIndex <= 2) {
        _usedCharacter = <IconFaceFrownFill />;
      } else if (_usedIndex <= 3) {
        _usedCharacter = <IconFaceMehFill />;
      } else {
        _usedCharacter = <IconFaceSmileFill />;
      }
      if (_usedIndex <= index) {
        _usedCharacter = <IconFaceMehFill />;
      }
    }
    const classNames = cs(`${prefixCls}-character`, {
      [`${prefixCls}-character-half`]: allowHalf && index + 0.5 === _usedIndex,
      [`${prefixCls}-character-full`]: index + 1 <= _usedIndex,
      [`${prefixCls}-character-scale`]: animation && index + 1 < mergedValue,
    });
    const leftProps =
      readonly || disabled
        ? {}
        : {
            onMouseEnter: onMouseEnter.bind(this, index, true),
            onClick: onClick.bind(this, index, true),
          };
    const rightProps =
      readonly || disabled
        ? {}
        : {
            onMouseEnter: onMouseEnter.bind(this, index, false),
            onClick: onClick.bind(this, index, false),
          };
    const tooltip = tooltips && tooltips[index];
    const CharacterWrapper = tooltip ? Tooltip : React.Fragment;
    const tooltipProps = tooltip ? { content: tooltip } : {};

    function getAriaProps(isHalf?: boolean) {
      return {
        role: 'radio',
        'aria-checked': index + (isHalf ? 0.5 : 1) <= _usedIndex,
        'aria-setsize': count,
        'aria-posinset': index + (isHalf ? 0.5 : 1),
      };
    }

    return (
      <CharacterWrapper key={index} {...tooltipProps}>
        <div
          className={classNames}
          style={animation ? { animationDelay: `${50 * index}ms` } : {}}
          onAnimationEnd={() => {
            if (animation && index + 1 >= mergedValue - 1) {
              setAnimation(false);
            }
          }}
          {...(!allowHalf ? getAriaProps() : {})}
        >
          <div
            className={`${prefixCls}-character-left`}
            {...leftProps}
            {...(allowHalf ? getAriaProps(true) : {})}
          >
            {_usedCharacter}
          </div>
          <div
            className={`${prefixCls}-character-right`}
            {...rightProps}
            {...(allowHalf ? getAriaProps() : {})}
          >
            {_usedCharacter}
          </div>
        </div>
      </CharacterWrapper>
    );
  };

  return (
    <div
      ref={ref}
      {...omit(restProps, ['error'])}
      style={style}
      className={classNames}
      onMouseLeave={resetHoverIndex}
    >
      <div className={`${prefixCls}-inner`}>
        {Array.apply(null, Array(grading ? 5 : count)).map((_, index) => renderCharacter(index))}
      </div>
    </div>
  );
}

const RateComponent = React.forwardRef<unknown, RateProps>(Rate);

RateComponent.displayName = 'Rate';

export default RateComponent;

export { RateProps };
