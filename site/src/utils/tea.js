import { isProduction } from './env';

export default function tea({ name }) {
  window.collectEvent('init', {
    app_id: 4374,
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
