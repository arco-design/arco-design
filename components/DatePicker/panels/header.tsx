import React, { ReactNode } from 'react';
import { Dayjs } from 'dayjs';
import IconLeft from '../../../icon/react-icon/IconLeft';
import IconRight from '../../../icon/react-icon/IconRight';
import IconDoubleLeft from '../../../icon/react-icon/IconDoubleLeft';
import IconDoubleRight from '../../../icon/react-icon/IconDoubleRight';
import cs from '../../_util/classNames';
import { ModeType, IconsType } from '../interface';
import { Locale } from '../../locale/interface';

export interface HeaderProps {
  prefixCls?: string;
  title?: ReactNode;
  onPrev?: () => void;
  onNext?: () => void;
  onSuperPrev?: () => void;
  onSuperNext?: () => void;
  mode?: ModeType;
  value?: Dayjs;
  onChangePanel?: (mode?: ModeType) => void;
  icons?: IconsType;
  rtl?: boolean;
  DATEPICKER_LOCALE?: Locale['DatePicker'];
}

function Header(props: HeaderProps) {
  const {
    prefixCls,
    title,
    onPrev,
    onNext,
    onSuperPrev,
    onSuperNext,
    mode,
    value,
    onChangePanel,
    icons = {},
    rtl,
    DATEPICKER_LOCALE,
  } = props;

  const showPrev = typeof onPrev === 'function';
  const showSuperPrev = typeof onSuperPrev === 'function';
  const showNext = typeof onNext === 'function';
  const showSuperNext = typeof onSuperNext === 'function';

  const getIconClassName = (isShow) => {
    return cs(`${prefixCls}-header-icon`, { [`${prefixCls}-header-icon-hidden`]: !isShow });
  };

  function renderHeaderLabel() {
    if (title) {
      return title;
    }

    if (mode === 'date' || mode === 'week') {
      const { monthBeforeYear } = DATEPICKER_LOCALE?.Calendar || {};

      const yearNode = (
        <span className={`${prefixCls}-header-label`} onClick={() => onChangePanel('year')}>
          {value.format('YYYY')}
        </span>
      );

      const monthNode = (
        <span className={`${prefixCls}-header-label`} onClick={() => onChangePanel('month')}>
          {value.format('MM')}
        </span>
      );

      return monthBeforeYear ? (
        <>
          {monthNode}/{yearNode}
        </>
      ) : (
        <>
          {yearNode}-{monthNode}
        </>
      );
    }
    if (mode === 'month' || mode === 'quarter') {
      return (
        <span className={`${prefixCls}-header-label`} onClick={() => onChangePanel('year')}>
          {value.format('YYYY')}
        </span>
      );
    }
  }

  const prevDoubleNull = icons.prevDouble === null;
  const prevNull = icons.prev === null;
  const nextNull = icons.next === null;
  const nextDoubleNull = icons.nextDouble === null;

  return (
    <div className={`${prefixCls}-header`}>
      {!prevDoubleNull && (
        <div className={getIconClassName(showSuperPrev)} onClick={onSuperPrev}>
          {showSuperPrev &&
            (prevDoubleNull
              ? null
              : icons.prevDouble || (rtl ? <IconDoubleRight /> : <IconDoubleLeft />))}
        </div>
      )}
      {!prevNull && (
        <div className={getIconClassName(showPrev)} onClick={onPrev}>
          {showPrev && (prevNull ? null : icons.prev || (rtl ? <IconRight /> : <IconLeft />))}
        </div>
      )}
      <div className={`${prefixCls}-header-value`}>{renderHeaderLabel()}</div>
      {!nextNull && (
        <div className={getIconClassName(showNext)} onClick={onNext}>
          {showNext && (nextNull ? null : icons.next || (rtl ? <IconLeft /> : <IconRight />))}
        </div>
      )}
      {!nextDoubleNull && (
        <div className={getIconClassName(showSuperNext)} onClick={onSuperNext}>
          {showSuperNext &&
            (nextDoubleNull
              ? null
              : icons.nextDouble || (rtl ? <IconDoubleLeft /> : <IconDoubleRight />))}
        </div>
      )}
    </div>
  );
}

export default Header;
