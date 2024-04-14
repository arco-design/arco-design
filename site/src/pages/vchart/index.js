import React from 'react';
import { initVChartArcoTheme } from '@visactor/vchart-arco-theme';

import Chart from './chart';
import lazyLoad from '../../utils/lazyload';
import './style.less';

initVChartArcoTheme();

function ChartPage({ lang = 'zh-CN' }) {
  const MdHeader = lazyLoad(() => import(`./md/header.${lang}.md`));
  const MdContent = lazyLoad(() => import(`./md/doc.${lang}.md`));

  return (
    <div>
      <MdHeader />
      <div>
        <Chart />
      </div>
      <br />
      <MdContent />
    </div>
  );
}

export default ChartPage;
