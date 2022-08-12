import { isProduction } from './env';
import { isExternal } from './config';

export default function tea({ name }) {
  window.collectEvent('init', {
    app_id: isExternal ? 4374 : 263440,
    channel: 'cn',
    auto_profile: true,
    log: true,
    autotrack: true,
  });

  window.collectEvent('config', {
    _staging_flag: isProduction ? 0 : 1, // 是否发到测试库
    evtParams: {
      site: name || 'ArcoDesign',
    },
  });

  window.collectEvent('start');
}
