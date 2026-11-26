/* eslint-disable no-console */
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import ResizeObserver from 'resize-observer-polyfill';
import { Button, Cascader, Checkbox, Radio, Space, Switch, Tooltip } from '@self';
import { TooltipHandle } from '@self/Tooltip';

const options = [
  {
    value: 'beijing',
    label: 'Beijing Municipality Very Long Option Text',
    children: [
      {
        value: 'Beijing',
        label: 'Beijing Urban Area Very Long Option Text',
        children: [
          {
            value: 'chaoyang',
            label: 'Chaoyang District Very Long Option Text',
            children: [
              {
                value: 'datunli',
                label: 'Datunli Subdistrict Very Long Option Text',
              },
            ],
          },
        ],
      },
    ],
  },
  {
    value: 'shanghai',
    label: 'Shanghai Municipality Very Long Option Text',
    children: [
      {
        value: 'shanghaishi',
        label: 'Shanghai Urban Area Very Long Option Text',
        children: [
          {
            value: 'huangpu',
            label: 'Huangpu District Very Long Option Text',
          },
        ],
      },
    ],
  },
];

const Demo1 = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
      <Cascader
        placeholder="Please select ..."
        style={{ width: 300 }}
        options={options}
        onChange={(value, option) => {
          console.log(value, option);
        }}
        allowClear
      />
    </div>
  );
};

const anchorWidth = 88;
const anchorHeight = 32;
const boundaryDistance = 12;
const directionLabels = { top: '向上', bottom: '向下', left: '向左', right: '向右' };
type Position = keyof typeof directionLabels;

function getViewportSize() {
  const { clientWidth: width, clientHeight: height } = document.documentElement;
  return { width, height };
}

function TooltipBoundaryDemo() {
  const [enabled, setEnabled] = useState(true);
  const [leftOnly, setLeftOnly] = useState(false);
  const [position, setPosition] = useState<Position>('top');
  const [actualPosition, setActualPosition] = useState<Position | null>(null);
  const [popupContent, setPopupContent] = useState<HTMLSpanElement | null>(null);
  const [viewport, setViewport] = useState(getViewportSize);
  const [anchor, setAnchor] = useState(() => ({
    left: viewport.width - anchorWidth - 4,
    top: Math.round(viewport.height * 0.6),
  }));
  const tooltip = useRef<TooltipHandle>(null);
  const dragOffset = useRef<{ left: number; top: number } | null>(null);
  const left = Math.max(0, Math.min(anchor.left, viewport.width - anchorWidth));
  const top = Math.max(0, Math.min(anchor.top, viewport.height - anchorHeight));
  const horizontalOffset = left + anchorWidth / 2 < viewport.width / 2 ? -20 : 20;
  const alignVertically = position === 'top' || position === 'bottom';

  useEffect(() => {
    const observer = new ResizeObserver(() => setViewport(getViewportSize()));
    observer.observe(document.documentElement);
    return () => observer.disconnect();
  }, []);

  useLayoutEffect(() => {
    tooltip.current?.updatePopupPosition();
  }, [left, top, position, horizontalOffset, enabled, leftOnly, viewport]);

  useEffect(() => {
    const popup = popupContent?.closest('.bugfix-boundary-tooltip');
    if (!popup) {
      return undefined;
    }
    const updatePosition = () =>
      setActualPosition(popup.getAttribute('trigger-placement') as Position | null);
    updatePosition();
    const observer = new MutationObserver(updatePosition);
    observer.observe(popup, { attributes: true, attributeFilter: ['trigger-placement'] });
    return () => observer.disconnect();
  }, [popupContent]);

  return (
    <section style={{ marginTop: 24 }}>
      <style>{'.bugfix-boundary-tooltip { pointer-events: none !important; }'}</style>
      <h2>Tooltip 视口留白</h2>
      <p>
        点击「测试左侧翻转」，观察弹层从首选向左翻到向右。点击「测试右侧留白」，观察向上的弹层如何沿
        12px 虚线平移。
      </p>
      <Space wrap>
        <Button
          size="small"
          onClick={() => {
            setPosition('left');
            setAnchor({ left: 4, top: Math.round((viewport.height - anchorHeight) / 2) });
          }}
        >
          测试左侧翻转
        </Button>
        <Button
          size="small"
          onClick={() => {
            setPosition('top');
            setAnchor({
              left: viewport.width - anchorWidth - 4,
              top: Math.round((viewport.height - anchorHeight) / 2),
            });
          }}
        >
          测试右侧留白
        </Button>
        <Switch checked={enabled} onChange={setEnabled} aria-label="启用新留白规则" />
        <span>启用新留白规则</span>
        <Checkbox checked={leftOnly} onChange={setLeftOnly}>
          只配置左侧
        </Checkbox>
      </Space>
      <div style={{ marginTop: 12 }}>
        <Space wrap>
          <span>首选方向</span>
          <Radio.Group
            aria-label="首选方向"
            type="button"
            size="small"
            value={position}
            onChange={setPosition}
            options={Object.entries(directionLabels).map(([value, label]) => ({ value, label }))}
          />
          <span role="status">
            {actualPosition
              ? `实际${directionLabels[actualPosition]}${
                  actualPosition !== position ? '（已翻转）' : ''
                }`
              : '正在计算方向'}
          </span>
        </Space>
      </div>
      <div
        aria-hidden
        style={{
          position: 'fixed',
          inset: boundaryDistance,
          border: '1px dashed rgb(var(--primary-6))',
          borderWidth: leftOnly ? '0 0 0 1px' : undefined,
          pointerEvents: 'none',
        }}
      />
      <Tooltip
        ref={tooltip}
        popupVisible
        position={position}
        content={<span ref={setPopupContent}>拖动触发点，观察 Tooltip 如何避让边缘</span>}
        style={{ width: 220 }}
        triggerProps={{
          className: 'bugfix-boundary-tooltip',
          isUseAllBoundaryDistances: enabled,
          boundaryDistance: leftOnly
            ? { left: boundaryDistance }
            : {
                left: boundaryDistance,
                right: boundaryDistance,
                top: boundaryDistance,
                bottom: boundaryDistance,
              },
          popupAlign: alignVertically ? { [position]: [horizontalOffset, 12] } : undefined,
        }}
      >
        <Button
          type="primary"
          style={{
            position: 'fixed',
            left,
            top,
            width: anchorWidth,
            height: anchorHeight,
            touchAction: 'none',
            cursor: 'grab',
            transition: 'none',
            zIndex: 1,
          }}
          onPointerDown={(event) => {
            if (event.button === 0 && event.isPrimary) {
              event.currentTarget.setPointerCapture(event.pointerId);
              dragOffset.current = { left: event.clientX - left, top: event.clientY - top };
            }
          }}
          onPointerMove={(event) => {
            if (dragOffset.current && event.currentTarget.hasPointerCapture(event.pointerId)) {
              setAnchor({
                left: event.clientX - dragOffset.current.left,
                top: event.clientY - dragOffset.current.top,
              });
            }
          }}
          onLostPointerCapture={() => {
            dragOffset.current = null;
          }}
        >
          拖动我
        </Button>
      </Tooltip>
    </section>
  );
}

export const Demo = () => (
  <>
    <Demo1 />
    <TooltipBoundaryDemo />
  </>
);
export default {
  title: 'Private Components/BugFix',
};
