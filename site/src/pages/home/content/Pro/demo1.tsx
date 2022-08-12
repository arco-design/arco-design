import React, { forwardRef, useState } from 'react';
import { Grid } from '@arco-design/web-react';
import ResizeObserver from '../../utils/resizeObserver';
import Chart from './chart';
import * as chartData from './chartData';
import RecentProjects from './recentProjects';
import styles from './style/index.module.less';
import useLocale from '../../hooks/useLocale';

function Demo1(_, ref) {
  const locale = useLocale();
  const [isMultiCol, setIsMultiCol] = useState(true);
  const gutter = 20;
  const span = isMultiCol ? 12 : 24;

  return (
    <ResizeObserver
      onResize={([target]) => {
        const { width } = target.contentRect;
        setIsMultiCol(width > 425);
      }}
    >
      <div className={`${styles.demo} ${styles.demo1}`} ref={ref}>
        <Grid.Row gutter={isMultiCol ? gutter : 0} style={{ marginBottom: 20 }}>
          <Grid.Col span={span}>
            <Chart
              title={locale['content.pro.chart.title.visitor']}
              type="line"
              data={chartData.visit}
            />
          </Grid.Col>
          <Grid.Col span={span} style={{ marginTop: isMultiCol ? 0 : gutter }}>
            <Chart
              title={locale['content.pro.chart.title.downloads']}
              type="bar"
              data={chartData.download}
            />
          </Grid.Col>
        </Grid.Row>
        <RecentProjects />
      </div>
    </ResizeObserver>
  );
}

export default forwardRef<HTMLDivElement, {}>(Demo1);
