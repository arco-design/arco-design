import React, {
  useState,
  useEffect,
  useContext,
  forwardRef,
  useRef,
  useImperativeHandle,
  useMemo,
} from 'react';
import BTween from 'b-tween';
import dayjs, { Dayjs } from 'dayjs';
import cs from '../_util/classNames';
import Countdown from './countdown';
import { isNumber } from '../_util/is';
import { ConfigContext } from '../ConfigProvider';
import Skeleton from '../Skeleton';
import { StatisticProps } from './interface';
import useMergeProps from '../_util/hooks/useMergeProps';

type StatisticHandle = {
  countUp: () => void;
};

const defaultProps: StatisticProps = {
  countFrom: 0,
  countDuration: 2000,
};

function Statistic(baseProps: StatisticProps, ref) {
  const { getPrefixCls, componentConfig } = useContext(ConfigContext);
  const props = useMergeProps<StatisticProps>(baseProps, defaultProps, componentConfig?.Statistic);
  const {
    className,
    style,
    title,
    extra,
    groupSeparator,
    precision,
    prefix,
    suffix,
    format,
    styleValue,
    loading,
  } = props;

  const tween = useRef<BTween>();
  const [value, setValue] = useState<string | number | Dayjs>(
    'value' in props ? props.value : undefined
  );

  const prefixCls = getPrefixCls('statistic');

  const countUp = (from = props.countFrom, to = props.value) => {
    const { countDuration } = props;
    if (from !== to) {
      tween.current = new BTween({
        from: {
          value: from,
        },
        to: {
          value: to,
        },
        duration: countDuration,
        easing: 'quartOut',
        onUpdate: (keys) => {
          setValue(keys.value.toFixed(precision));
        },
        onFinish: () => {
          setValue(to);
        },
      });
      tween.current.start();
    }
  };

  useEffect(() => {
    if (props.countUp) {
      if (tween.current) {
        tween.current.stop();
      }
      if (value !== props.value) {
        countUp(Number(value), props.value);
      } else {
        countUp();
      }
    } else {
      setValue(props.value);
    }

    return () => {
      tween.current && tween.current.stop();
      tween.current = null;
    };
  }, [props.value]);

  useImperativeHandle<any, StatisticHandle>(ref, () => ({
    countUp,
  }));

  const { int, decimal } = useMemo(() => {
    let _value = value;
    if (format) {
      _value = dayjs(value).format(format);
    }
    if (isNumber(precision) && precision >= 0) {
      _value = Number(value).toFixed(precision);
    }
    let int = String(_value).split('.')[0];
    const decimal = String(_value).split('.')[1];
    if (groupSeparator && isNumber(Number(value))) {
      int = Number(int).toLocaleString('en-US');
    }
    return {
      int,
      decimal,
    };
  }, [format, groupSeparator, precision, value]);

  return (
    <div className={cs(`${prefixCls}`, className)} style={style}>
      {title && <div className={`${prefixCls}-title`}>{title}</div>}
      <div className={`${prefixCls}-content`}>
        <Skeleton animation loading={!!loading} text={{ rows: 1, width: '100%' }}>
          <div className={`${prefixCls}-value`} style={styleValue}>
            {!isNumber(Number(value)) ? (
              value
            ) : (
              <span className={`${prefixCls}-value-int`}>
                <span className={`${prefixCls}-value-prefix`}>{prefix}</span> {int}
              </span>
            )}

            {decimal !== undefined || suffix ? (
              <span className={`${prefixCls}-value-decimal`}>
                {isNumber(Number(value)) && decimal !== undefined && `.${decimal}`}{' '}
                {suffix && <span className={`${prefixCls}-value-suffix`}>{suffix}</span>}
              </span>
            ) : null}
          </div>
        </Skeleton>
        {extra && <div className={`${prefixCls}-extra`}>{extra}</div>}
      </div>
    </div>
  );
}

const ForwardRefStatistic = forwardRef(Statistic);

const StatisticComponent = ForwardRefStatistic as typeof ForwardRefStatistic & {
  Countdown: typeof Countdown;
};

StatisticComponent.displayName = 'Statistic';

StatisticComponent.Countdown = Countdown;

export default StatisticComponent;

export { StatisticProps };
