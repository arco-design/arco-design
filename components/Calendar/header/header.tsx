import React, { useMemo } from 'react';
import useKeyboardEvent from '../../_util/hooks/useKeyboardEvent';
import Select from '../../Select';
import Button from '../../Button';
import Radio from '../../Radio';
import IconLeft from '../../../icon/react-icon/IconLeft';
import IconRight from '../../../icon/react-icon/IconRight';
import { getNow } from '../../_util/dayjs';
import { isArray } from '../../_util/is';

function getPopupContainer(node: HTMLElement): Element {
  return node.parentElement;
}

function Header(props) {
  const {
    prefixCls,
    changePageShowDate,
    headerValueFormat,
    mergedPageShowDate,
    CALENDAR_LOCALE,
    move,
    innerMode,
    changeMode,
    headerType,
    onChangeYear,
    onChangeMonth,
    modes,
  } = props;
  const getKeyboardEvents = useKeyboardEvent();

  const modesOptions = isArray(modes)
    ? modes.map((m) => ({
        label: CALENDAR_LOCALE.view[m],
        value: m,
      }))
    : [];

  const isSelectHeaderType = headerType === 'select';

  const pageShowDateYear = mergedPageShowDate.year();
  const pageShowDateMonth = mergedPageShowDate.month() + 1;
  const optionsYear = useMemo(() => {
    const options = [pageShowDateYear];
    for (let i = 1; i <= 10; i++) {
      options.unshift(pageShowDateYear - i);
    }
    for (let i = 1; i < 10; i++) {
      options.push(pageShowDateYear + i);
    }
    return options;
  }, [pageShowDateYear]);
  const optionsMonth = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

  return (
    <div className={`${prefixCls}-header`}>
      <div className={`${prefixCls}-header-left`}>
        {isSelectHeaderType ? (
          <>
            <Select
              size="small"
              className={`${prefixCls}-header-value-year`}
              value={pageShowDateYear}
              options={optionsYear}
              onChange={onChangeYear}
              getPopupContainer={getPopupContainer}
            />
            {innerMode === 'month' && (
              <Select
                size="small"
                className={`${prefixCls}-header-value-month`}
                value={pageShowDateMonth}
                options={optionsMonth}
                onChange={onChangeMonth}
                getPopupContainer={getPopupContainer}
              />
            )}
          </>
        ) : (
          <>
            <div
              className={`${prefixCls}-header-icon`}
              role="button"
              tabIndex={0}
              onClick={() => changePageShowDate('prev', innerMode)}
              {...getKeyboardEvents({
                onPressEnter: () => changePageShowDate('prev', innerMode),
              })}
            >
              <IconLeft />
            </div>
            <div className={`${prefixCls}-header-value`}>
              {mergedPageShowDate.format(headerValueFormat)}
            </div>
            <div
              role="button"
              tabIndex={0}
              className={`${prefixCls}-header-icon`}
              onClick={() => changePageShowDate('next', innerMode)}
              {...getKeyboardEvents({
                onPressEnter: () => changePageShowDate('next', innerMode),
              })}
            >
              <IconRight />
            </div>
          </>
        )}
        <Button size="small" onClick={() => move(getNow())}>
          {CALENDAR_LOCALE.today}
        </Button>
      </div>
      <div className={`${prefixCls}-header-right`}>
        <Radio.Group
          size="small"
          type="button"
          options={modesOptions}
          onChange={changeMode}
          value={innerMode}
        />
      </div>
    </div>
  );
}

export default Header;
