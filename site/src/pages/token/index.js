import React, { useState } from 'react';
import { Radio, Typography } from '@arco-design/web-react';
import { IconSunFill, IconMoonFill } from '@arco-design/web-react/icon';
import TokenTable from './tokenTable';
import { tokens as tokenGroups } from './tokens';
import lazyLoad from '../../utils/lazyload';
import './index.less';

const RadioGroup = Radio.Group;

export default function Token({ lang = 'zh-CN' }) {
  const MdHeader = lazyLoad(() => import(`./md/header.${lang}.md`));
  const [mode, setMode] = useState('light');

  const dumpGroup = (group) => {
    const { tokens, type, nameEN, name } = group;
    return (
      <div style={{ marginBottom: 40 }} key={name}>
        <Typography.Title heading="2">{lang === 'en-US' ? nameEN : name}</Typography.Title>
        <TokenTable data={tokens} type={type} isDark={mode === 'dark'} lang={lang} />
      </div>
    );
  };

  return (
    <div className="page-token">
      <MdHeader />
      <div className="markdown-body">
        <div style={{ display: 'flex', padding: '20px 0', justifyContent: 'flex-end' }}>
          <RadioGroup value={mode} onChange={setMode} type="button">
            <Radio value="light">
              <IconSunFill />
              Light
            </Radio>
            <Radio value="dark">
              <IconMoonFill />
              Dark
            </Radio>
          </RadioGroup>
        </div>
        <div>{tokenGroups.map(dumpGroup)}</div>
      </div>
    </div>
  );
}
