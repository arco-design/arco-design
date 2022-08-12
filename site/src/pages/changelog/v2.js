import React from 'react';
import { Helmet } from 'react-helmet';
import lazyLoad from '../../utils/lazyload';

const locale = {
  'zh-CN': {
    changelog: '更新日志',
    description: '这里会有详细的发版记录，版本号严格遵循 Semver 规范。',
    guide: '开发指南',
  },
  'en-US': {
    changelog: 'Changelog',
    description:
      'There will be a detailed release record, and the version number strictly follows the Semver specification.',
    guide: 'Development Guide',
  },
};

function VersionV2({ lang = 'zh-CN' }) {
  const t = locale[lang];
  const title = t.changelog;
  const description = t.description;
  const VersionContent = lazyLoad(() => import(`../../../docs/version_v2.${lang}.md`));
  return (
    <div className="markdown-body">
      <Helmet>
        <title>{title} | ArcoDesign</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
      </Helmet>
      <div className="ac-nav-intro">
        <p>{t.guide}</p>
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
      <VersionContent />
    </div>
  );
}

export default VersionV2;
