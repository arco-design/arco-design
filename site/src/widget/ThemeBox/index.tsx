import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Badge,
  Button,
  Modal,
  Grid,
  Card,
  Pagination,
  Skeleton,
  Notification,
  Message,
  Tag,
  Typography,
  Input,
  Empty,
  Link,
} from '@arco-design/web-react';
import { IconSkin, IconLink, IconClose } from '@arco-design/web-react/icon';
import debounce from 'lodash.debounce';
import locale from './locale';
import { apiBasename } from '../../utils/config';

const { Row, Col } = Grid;
const { Meta } = Card;

const loadingArray = [1, 1, 1, 1, 1, 1];

function ThemeBox({ lang = 'zh-CN' }) {
  const [list, setList] = useState([]);
  const [total, setTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [visible, setVisible] = useState(false);
  const [hover, setHover] = useState(false);
  const [keyword, setKeyWord] = useState('');

  const t = locale[lang];

  const themeObj = JSON.parse(localStorage.getItem('arco-components-theme'));
  const hasCustomTheme = themeObj && themeObj.packageName;

  useEffect(() => {
    if (visible) {
      fetchThemeList();
    }
  }, [visible]);

  useEffect(() => {
    if (hasCustomTheme) {
      createCss(getCssLink(themeObj.packageName, themeObj.unpkgHost));
      Message.info(`${t.autoUseTheme}: ${themeObj.themeName}`);
    }
  }, []);

  async function fetchThemeList(current = currentPage, searchValue = keyword) {
    setLoading(true);
    const data = await axios.get(
      `${apiBasename}/themes/api/open/themes/list?pageSize=6&currentPage=${current}&depLibrary=@arco-design/web-react&keyword=${searchValue}`
    );
    setLoading(false);
    setList(data.data.list);
    setTotal(data.data.total);
  }

  const searchFetch = debounce((inputValue) => {
    setCurrentPage(1);
    setKeyWord(inputValue);
    fetchThemeList(1, inputValue);
  }, 200);

  function onOk() {
    setVisible(false);
  }

  function onCancel() {
    setVisible(false);
  }

  function onChangePagination(current) {
    setCurrentPage(current);
    fetchThemeList(current);
  }

  function getCssLink(name: string, prefix: string) {
    return `${prefix}${name}/css/arco.css`;
  }

  function createCss(url: string) {
    const link = document.createElement('link');
    link.id = 'arco-custom-theme';
    link.href = url;
    link.type = 'text/css';
    link.rel = 'stylesheet';
    document.body.appendChild(link);
  }

  function onUseTheme(themeObj) {
    resetTheme();
    const url = getCssLink(themeObj.packageName, themeObj.unpkgHost);
    Notification.info({
      id: 'theme',
      title: t.installTheme,
      content: t.installingTheme,
      duration: 0,
    });
    createCss(url);

    axios
      .get(url)
      .then(() => {
        Notification.success({
          id: 'theme',
          title: t.installTheme,
          content: t.installThemeSuccess,
          duration: 2000,
        });
        localStorage.setItem(
          'arco-components-theme',
          JSON.stringify({
            packageName: themeObj.packageName,
            themeName: themeObj.themeName,
            unpkgHost: themeObj.unpkgHost,
          })
        );
        setList([]);
      })
      .catch(() => {
        Notification.error({
          id: 'theme',
          title: t.installTheme,
          content: t.installThemeError,
          duration: 2000,
        });
      });
  }

  function resetTheme() {
    const customLink = document.getElementById('arco-custom-theme');
    if (customLink) {
      document.body.removeChild(customLink);
    }
    localStorage.setItem('arco-components-theme', '{}');
    setVisible(false);
  }

  function renderLoading() {
    return (
      <Row gutter={[20, 20]}>
        {loadingArray.map((_, i) => (
          <Col span={8} key={i}>
            <Card
              style={{ height: 261 }}
              cover={
                <Skeleton
                  loading={loading}
                  animation
                  text={false}
                  image={{ style: { width: 272, height: 160 } }}
                />
              }
            >
              <Meta title={<Skeleton animation loading={loading} text={{ rows: 1 }} />} />
              <Skeleton
                animation
                loading={loading}
                text={false}
                image={{ position: 'right', style: { marginTop: 20, width: 100, height: 24 } }}
              />
            </Card>
          </Col>
        ))}
      </Row>
    );
  }

  return (
    <div>
      <Modal
        style={{ width: 900 }}
        title={
          <div className="tb-header">
            <span>{t.installTheme}</span>
            <div style={{ marginRight: '30px' }}>
              <Input.Search
                placeholder={t.search}
                style={{ width: 300 }}
                loading={loading}
                allowClear
                onChange={(value) => {
                  searchFetch(value.trim());
                }}
              />
            </div>
          </div>
        }
        focusLock={false}
        visible={visible}
        onOk={onOk}
        onCancel={onCancel}
        footer={
          hasCustomTheme ? (
            <div className="tb-theme-footer">
              <Typography.Text bold>
                {t.currentTheme}：{themeObj.themeName}
              </Typography.Text>
              <Button
                type="primary"
                status="danger"
                size="small"
                onClick={() => {
                  resetTheme();
                  Notification.success({ content: t.resetThemeSuccess });
                }}
              >
                <IconClose />
                {t.resetTheme}
              </Button>
            </div>
          ) : null
        }
      >
        {loading ? (
          renderLoading()
        ) : (
          <Row gutter={[20, 20]}>
            {list.length ? (
              list.map((l) => (
                <Col span={8} key={l.themeId}>
                  <Card
                    className="tb-card"
                    cover={<img src={l.cover} style={{ height: 160 }} />}
                    actions={[
                      <Button
                        key="1"
                        className="tb-link"
                        type="text"
                        icon={<IconLink />}
                        size="mini"
                        href={`${apiBasename}/themes/design/${l.themeId}`}
                        target="_blank"
                      >
                        {t.openInDesignLab}
                      </Button>,
                      ...(() => {
                        if (themeObj && themeObj.packageName === l.packageName) {
                          return [
                            <Tag color="arcoblue" key="2">
                              当前使用
                            </Tag>,
                          ];
                        }
                        return [
                          <Button key="2" type="primary" size="mini" onClick={() => onUseTheme(l)}>
                            {t.install}
                          </Button>,
                        ];
                      })(),
                    ]}
                  >
                    <Meta title={l.themeName} />
                  </Card>
                </Col>
              ))
            ) : (
              <Empty
                style={{ margin: '200px 0' }}
                description={
                  <span>
                    {t.noResult}
                    <Link href={`${apiBasename}/themes`}>{t.createTheme}</Link>
                  </span>
                }
              />
            )}
          </Row>
        )}
        <div className="tb-pagination">
          <Pagination
            total={total}
            pageSize={6}
            current={currentPage}
            onChange={onChangePagination}
          />
        </div>
      </Modal>
      <Badge className="tb-badge" count={hasCustomTheme ? 1 : 0} dot>
        <Button
          shape={hover ? 'round' : 'circle'}
          size="large"
          className="ac-backtop-btn"
          onClick={() => setVisible(true)}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          aria-label="button to open theme box"
        >
          <IconSkin />
          {hover && t.installTheme}
        </Button>
      </Badge>
    </div>
  );
}

export default ThemeBox;
