import React, { useContext } from 'react';
import { InputPasswordProps, RefInputType } from './interface';
import cs from '../_util/classNames';
import Input from './input';
import IconEye from '../../icon/react-icon/IconEye';
import IconEyeInvisible from '../../icon/react-icon/IconEyeInvisible';
import { ConfigContext } from '../ConfigProvider';
import useMergeValue from '../_util/hooks/useMergeValue';
import omit from '../_util/omit';
import useKeyboardEvent from '../_util/hooks/useKeyboardEvent';

const Password = React.forwardRef<RefInputType, InputPasswordProps>(
  (props: InputPasswordProps, ref) => {
    const [visibility, setVisibility] = useMergeValue(false, {
      defaultValue: props.defaultVisibility,
      value: props.visibility,
    });
    const { getPrefixCls } = useContext(ConfigContext);
    const getKeyboardEvents = useKeyboardEvent();
    const { className, visibilityToggle = true, onVisibilityChange, ...rest } = props;

    const prefixCls = getPrefixCls('input-password');
    const classNames = cs(
      prefixCls,
      {
        [`${prefixCls}-visibility`]: visibilityToggle,
      },
      className
    );

    const onClickVisibility = (v: boolean) => {
      if (!('visibility' in props)) {
        setVisibility(v);
      }
      onVisibilityChange && onVisibilityChange(v);
    };

    let icon = props.suffix;

    const handleClickVisibility = () => {
      onClickVisibility(!visibility);
    };

    if (visibilityToggle) {
      const IconProps = {
        onClick: handleClickVisibility,
        // 预防focus丢失
        onMouseDown: (e) => e.preventDefault(),
        onMouseUp: (e) => e.preventDefault(),
        ...getKeyboardEvents({
          onPressEnter: handleClickVisibility,
        }),
      };

      if (props.suffix) {
        icon = <span {...IconProps}>{props.suffix}</span>;
      } else {
        const IconComponent = visibility ? IconEye : IconEyeInvisible;

        icon = (
          <IconComponent
            {...IconProps}
            {...{
              focusable: undefined,
              'aria-hidden': undefined,
              tabIndex: 0,
              className: `${prefixCls}-visibility-icon`,
            }}
          />
        );
      }
    }

    return (
      <Input
        {...omit(rest, ['visibility', 'defaultVisibility'])}
        type={visibility ? 'text' : 'password'}
        className={classNames}
        ref={ref}
        suffix={icon}
      />
    );
  }
);

Password.displayName = 'Password';

export default Password;

export { InputPasswordProps };
