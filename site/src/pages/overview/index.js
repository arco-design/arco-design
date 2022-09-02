import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Helmet from 'react-helmet';
import { Typography, Grid } from '@arco-design/web-react';
import { IconRight } from '@arco-design/web-react/icon';
import getMeta from './meta';
import { underscored } from '../../utils/case';
import lazyLoad from '../../utils/lazyload';
import { GlobalContext } from '../../context';
import './style.less';

const { Title } = Typography;
const { Row, Col } = Grid;

const prefixCls = 'ac-overview';

const locale = {
  'zh-CN': {
    overview: '组件索引',
    description: 'ArcoDesign 提供了丰富的组件，在这里你可以非常直观的找到它们。',
    component: '组件',
    general: '通用',
  },
  'en-US': {
    overview: 'Overview',
    description:
      'ArcoDesign provides a wealth of components, where you can find them very intuitively.',
    component: 'Component',
    general: 'General',
  },
};

function Overview({ lang = 'zh-CN' }) {
  const t = locale[lang];
  const title = t.overview;
  const description = t.description;
  const { theme } = useContext(GlobalContext);
  const history = useHistory();

  const meta = getMeta(lang);

  function renderList(list, theme) {
    return list.map((l) => {
      const Icon = lazyLoad(() =>
        import(`../../assets/overview/${l.key}${theme === 'dark' ? '-dark' : ''}.svg`)
      );
      return (
        <Col key={l.key} className={`${prefixCls}-list-item`} span={6}>
          <div
            className={`${prefixCls}-list-item-inner`}
            onClick={() => {
              history.push(`/react/components/${underscored(l.key)}`);
            }}
          >
            <div className={`${prefixCls}-list-item-logo`}>
              <Icon />
            </div>
            <div className={`${prefixCls}-list-item-link`}>
              {l.name}
              <IconRight />
            </div>
          </div>
        </Col>
      );
    });
  }

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
      <div className={prefixCls}>
        {meta.map((m, index) => (
          <React.Fragment key={index}>
            <Title heading={5}>{m.name}</Title>
            <Row className={`${prefixCls}-list`} gutter={36}>
              {renderList(m.list, theme)}
            </Row>
          </React.Fragment>
        ))}
      </div>
    </span>
  );
}

export default Overview;
