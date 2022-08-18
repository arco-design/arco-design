import React, { useEffect, useRef } from 'react';
import {
  Chart as G2Chart,
  registerEngine,
  registerGeometry,
  registerComponentController,
  registerAction,
  registerInteraction,
} from '@antv/g2/lib/core';
import * as CanvasEngine from '@antv/g-canvas';
import Line from '@antv/g2/lib/geometry/line';
import Interval from '@antv/g2/lib/geometry/interval';
import Tooltip from '@antv/g2/lib/chart/controller/tooltip';
import TooltipAction from '@antv/g2/lib/interaction/action/component/tooltip/geometry';
import ActiveRegion from '@antv/g2/lib/interaction/action/active-region';
import { Card, Statistic, Typography } from '@arco-design/web-react';
import { IconArrowRise } from '@arco-design/web-react/icon';
import ResizeObserver from '../../utils/resizeObserver';
import { debounce } from '../../utils/debounce';
import { ChartDataType } from './chartData';
import styles from './style/chart.module.less';
import useLocale from '../../hooks/useLocale';

type ChartType = 'line' | 'bar';

interface ChartProps {
  title: string;
  type: ChartType;
  data: ChartDataType;
}

registerEngine('canvas', CanvasEngine);
registerGeometry('line', Line);
registerGeometry('interval', Interval);
registerComponentController('tooltip', Tooltip);
registerAction('tooltip', TooltipAction);
registerAction('active-region', ActiveRegion);
// 注册 tooltip 的 interaction
registerInteraction('tooltip', {
  start: [
    {
      trigger: 'plot:mousemove',
      action: 'tooltip:show',
      throttle: { wait: 50, leading: true, trailing: false },
    },
    {
      trigger: 'plot:touchmove',
      action: 'tooltip:show',
      throttle: { wait: 50, leading: true, trailing: false },
    },
  ],
  end: [
    { trigger: 'plot:mouseleave', action: 'tooltip:hide' },
    { trigger: 'plot:leave', action: 'tooltip:hide' },
    { trigger: 'plot:touchend', action: 'tooltip:hide' },
  ],
}); // 出现背景框
registerInteraction('active-region', {
  start: [{ trigger: 'plot:mousemove', action: 'active-region:show' }],
  end: [{ trigger: 'plot:mouseleave', action: 'active-region:hide' }],
});

function Chart(props: ChartProps) {
  const locale = useLocale();
  const chartElRef = useRef();
  const chartInstanceRef = useRef<G2Chart>();
  const { title, data, type } = props;

  const forceFitChart = debounce(() => {
    chartInstanceRef.current && chartInstanceRef.current.forceFit();
  }, 100);

  useEffect(() => {
    const chart: any = new G2Chart({
      container: chartElRef.current,
      autoFit: true,
      height: 80,
    });
    chartInstanceRef.current = chart;

    chart.data(data.chartData);
    chart.tooltip({
      showMarkers: false,
      shared: true,
      containerTpl: `<div class="g2-tooltip">
          <div class="g2-tooltip-title"></div>
          <table class="g2-tooltip-list"></table>
        </div>`,
      itemTpl: `<tr class="g2-tooltip-list-item">
          <td>
            <span style="background-color:{color};width:8px;height:8px;border-radius:50%;display:inline-block;margin-right:8px;" />
          </td>
          <td style="padding-right:10px;">{name}:</td>
          <td>{value}</td>
        </tr>`,
      position: 'top',
    });

    if (type === 'bar') {
      chart
        .interval()
        .position('x*y')
        .color('name', ['#4080FF', '#86DF6C'])
        .adjust([
          {
            type: 'dodge',
            marginRatio: 0,
          },
        ]);
    } else {
      chart.line().position('x*y').color('name', ['#4080FF']).shape('smooth');
    }

    chart.interaction('active-region');
    chart.render();

    return () => {
      chart.destroy();
    };
  }, []);

  return (
    <Card bordered={false}>
      <div className={styles.content}>
        <Statistic
          title={title}
          value={data.value}
          groupSeparator
          suffix={
            <Typography.Text type="secondary" className={styles.unit}>
              {locale['content.pro.chart.unit']}
            </Typography.Text>
          }
        />
        <div>
          <Typography.Text type="secondary" className={styles.label}>
            {locale['content.pro.chart.lastMonth']}
          </Typography.Text>
          <Typography.Text type="success">
            {data.growth}
            <IconArrowRise />
          </Typography.Text>
        </div>
      </div>
      <ResizeObserver
        onResize={() => {
          forceFitChart();
        }}
      >
        <div className={styles.chart} ref={chartElRef} />
      </ResizeObserver>
    </Card>
  );
}

export default Chart;
