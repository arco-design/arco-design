import React from 'react';
import Button from '../../Button';
import Shortcuts from './shortcuts';
import { isArray } from '../../_util/is';
import Link from '../../Link';

export default function Footer(props) {
  const {
    showTime,
    prefixCls,
    DATEPICKER_LOCALE,
    disabled,
    onClickConfirmBtn,
    onClickSelectTimeBtn,
    isTimePanel,
    onSelectNow,
    showNowBtn,
    shortcuts,
    onMouseEnterShortcut,
    onMouseLeaveShortcut,
    onSelectShortcut,
    extra,
    mode,
    shortcutsPlacementLeft,
  } = props;

  const hasShortcuts = isArray(shortcuts) && shortcuts.length > 0;
  const shouldShowNowBtn = showNowBtn && showTime && !hasShortcuts;
  const shouldShouldShortcuts = shouldShowNowBtn || (hasShortcuts && !shortcutsPlacementLeft);

  return (
    <div className={`${prefixCls}-footer`}>
      {extra && <div className={`${prefixCls}-footer-extra-wrapper`}>{extra}</div>}
      {!showTime && showNowBtn && mode === 'date' && (
        <div className={`${prefixCls}-footer-now-wrapper`}>
          <Link onClick={onSelectNow}>{DATEPICKER_LOCALE.today}</Link>
        </div>
      )}
      {shouldShouldShortcuts || showTime ? (
        <div className={`${prefixCls}-footer-btn-wrapper`}>
          {!shortcutsPlacementLeft ? (
            <Shortcuts
              shortcuts={shortcuts}
              prefixCls={prefixCls}
              onSelectNow={onSelectNow}
              nowText={DATEPICKER_LOCALE.now}
              showNowBtn={showNowBtn}
              onMouseEnterShortcut={onMouseEnterShortcut}
              onMouseLeaveShortcut={onMouseLeaveShortcut}
              onSelectShortcut={onSelectShortcut}
              showTime={showTime}
            />
          ) : (
            <div />
          )}
          {showTime && (
            <>
              <Button
                type="text"
                size="mini"
                onClick={onClickSelectTimeBtn}
                className={
                  isTimePanel ? `${prefixCls}-btn-select-date` : `${prefixCls}-btn-select-time`
                }
              >
                {isTimePanel ? DATEPICKER_LOCALE.selectDate : DATEPICKER_LOCALE.selectTime}
              </Button>
              <Button
                className={`${prefixCls}-btn-confirm`}
                type="primary"
                size="mini"
                disabled={disabled}
                onClick={onClickConfirmBtn}
              >
                {DATEPICKER_LOCALE.ok}
              </Button>
            </>
          )}
        </div>
      ) : null}
    </div>
  );
}
