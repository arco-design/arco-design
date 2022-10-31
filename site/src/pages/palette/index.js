import React, { useState, useContext } from 'react';
import { Layout, Grid, Radio } from '@arco-design/web-react';
import { generate, getPresetColors } from '@arco-design/color';
import Navbar from '@arco-materials/site-navbar-new';
import lazyLoad from '../../utils/lazyload';
import Card from './card';
import './style.less';

const { NavbarThemeContext } = Navbar;

const { Content } = Layout;
const { Row, Col } = Grid;

const prefixCls = 'page-dark';

const locale = {
  'zh-CN': {
    light: '亮色模式',
    dark: '暗黑模式',
    red: 'Red / 浪漫红',
    'orange-red': 'Orange Red / 晚秋红',
    orange: 'Orange / 活力橙',
    gold: 'Gold / 黄昏',
    yellow: 'Yellow / 柠檬黄',
    lime: 'Lime / 新生绿',
    green: 'Green / 仙野绿',
    cyan: 'Cyan / 碧涛青',
    blue: 'Blue / 海蔚蓝',
    'arco-blue': 'Arco Blue / 极致蓝',
    purple: 'Purple / 暗夜紫',
    'pink-purple': 'Pink Purple / 青春紫',
    magenta: 'Magenta / 品红',
    gray: 'Gray / 中性灰',
  },
  'en-US': {
    light: 'Light',
    dark: 'Dark',
    red: 'Red',
    'orange-red': 'Orange Red',
    orange: 'Orange',
    gold: 'Gold',
    yellow: 'Yellow',
    lime: 'Lime',
    green: 'Green',
    cyan: 'Cyan',
    blue: 'Blue',
    'arco-blue': 'Arco Blue',
    purple: 'Purple',
    'pink-purple': 'Pink Purple',
    magenta: 'Magenta',
    gray: 'Gray',
  },
};

const presetColors = getPresetColors();

function Index({ lang = 'zh-CN' }) {
  const MdHeader = lazyLoad(() => import(`./md/header.${lang}.md`));
  const { realTheme, onHandleTheme } = useContext(NavbarThemeContext);
  const t = locale[lang];
  const COLORS = {
    red: {
      value: '#f53f3f',
      title: t.red,
    },
    orangered: {
      value: '#F77234',
      title: t['orange-red'],
    },
    orange: {
      value: '#ff7d00',
      title: t.orange,
    },
    gold: {
      value: '#F7BA1E',
      title: t.gold,
    },
    yellow: {
      value: '#FADC19',
      title: t.yellow,
    },
    lime: {
      value: '#9FDB1D',
      title: t.lime,
    },
    green: {
      value: '#00b42a',
      title: t.green,
    },
    cyan: {
      value: '#14C9C9',
      title: t.cyan,
    },
    blue: {
      value: '#3491FA',
      title: t.blue,
    },
    arcoblue: {
      value: '#165dff',
      title: t['arco-blue'],
    },
    purple: {
      value: '#722ed1',
      title: t.purple,
    },
    pinkpurple: {
      value: '#D91AD9',
      title: t['pink-purple'],
    },
    magenta: {
      value: '#F5319D',
      title: t.magenta,
    },
  };

  const COLORS_PURE = (() => {
    const obj = {};
    Object.keys(COLORS).forEach((name) => {
      obj[name] = COLORS[name].value;
    });
    return obj;
  })();
  const colorList = COLORS_PURE;
  const [format, setFormat] = useState('hex');

  const grayColorList = realTheme === 'light' ? presetColors.gray.light : presetColors.gray.dark;

  return (
    <div className={prefixCls}>
      <MdHeader />
      <div className={`${prefixCls}-btn-wrapper`}>
        <Radio.Group
          type="button"
          value={realTheme}
          options={[
            { label: t.light, value: 'light' },
            { label: t.dark, value: 'dark' },
          ]}
          onChange={onHandleTheme}
          style={{ marginRight: 20 }}
        />
        <Radio.Group
          onChange={(value) => setFormat(value.toLowerCase())}
          type="button"
          value={format.toUpperCase()}
          options={['HEX', 'RGB', 'HSL']}
        />
      </div>
      <Content
        style={{
          marginTop: 20,
          padding: '0 10px',
          borderRadius: 6,
          background: realTheme === 'light' ? '#fff' : '#2a2a2b',
        }}
      >
        <Row gutter={20}>
          {Object.keys(COLORS).map((colorName) => {
            return (
              <Col
                key={colorName}
                sm={{ span: 24 }}
                md={{ span: 12 }}
                lg={{ span: 12 }}
                xl={{ span: 8 }}
                xxl={{ span: 6 }}
              >
                <Card
                  theme={realTheme}
                  format={format}
                  colors={generate(colorList[colorName], {
                    list: true,
                    dark: realTheme === 'dark',
                  })}
                  name={colorName}
                  title={COLORS[colorName].title}
                />
              </Col>
            );
          })}
          <Col
            sm={{ span: 24 }}
            md={{ span: 12 }}
            lg={{ span: 12 }}
            xl={{ span: 8 }}
            xxl={{ span: 6 }}
          >
            <Card
              theme={realTheme}
              format={format}
              colors={grayColorList}
              name="gray"
              title={t.gray}
            />
          </Col>
        </Row>
      </Content>
    </div>
  );
}

export default Index;
