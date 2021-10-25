import React, { useEffect, useRef } from 'react';
import ClipboardJS from 'clipboard';
import { Message, Tag } from '@arco-design/web-react';
import { Helmet } from 'react-helmet';
import IconDemo from '../../../../icon/demo';
import FooterEN from './md/footer.en-US.md';
import FooterZH from './md/footer.zh-CN.md';
import ACCard from '../../widget/Card';
import './style.less';

const locale = {
  'zh-CN': {
    copiedSuccess: '复制成功！',
    title: '图标 Icon',
    description: '这里有 Arco Design 内置的大量图标。',
    component: '组件',
    general: '通用',
    card_title: 'IconBox 图标平台',
    card_description: '你可以在 IconBox 平台上传和选用更多图标。',
    card_goto: '立即使用',
  },
  'en-US': {
    copiedSuccess: 'Copied Success!',
    title: 'Icon',
    description: 'There are a lot of icons built into Arco Design.',
    component: 'Component',
    general: 'General',
    card_title: 'IconBox',
    card_description: 'You can upload and choose more icons on the IconBox platform.',
    card_goto: 'Goto',
  },
};

function PageIcon({ lang = 'zh-CN' }) {
  const t = locale[lang];
  const clipboard = useRef(
    new ClipboardJS('.icon-cell', {
      text(trigger) {
        const IconName = trigger.getAttribute('aria-label');
        return `<${IconName} />`;
      },
    })
  );

  useEffect(() => {
    clipboard.current.on('success', (e) => {
      e.clearSelection();
      Message.success({
        content: (
          <span>
            {t.copiedSuccess}
            <Tag>{e.text}</Tag>
          </span>
        ),
      });
    });

    return () => {
      clipboard.current.destroy();
    };
  }, []);

  const title = t.title;
  const description = t.description;

  return (
    <span>
      <Helmet>
        <title>{title} | ArcoDesign</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
      </Helmet>
      <div className="markdown-body">
        <div className="ac-nav-intro">
          <p>
            {t.component} <span className="separator">/</span> <strong>{t.general}</strong>
          </p>
          <h1>{title}</h1>
          <p>{description}</p>
        </div>
      </div>
      <ACCard
        title={t.card_title}
        description={t.card_description}
        link="/iconbox"
        icon="IconBox"
        buttonText={t.card_goto}
      />
      <IconDemo lang={lang} />
      {lang === 'zh-CN' ? <FooterZH /> : <FooterEN />}
    </span>
  );
}

export default PageIcon;
