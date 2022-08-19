import React from 'react';
import { Card, Link } from '@arco-design/web-react';
import { IconFile } from '@arco-design/web-react/icon';
import styles from './style/recent-projects.module.less';
import useLocale from '../../hooks/useLocale';

export default function RecentProjects() {
  const locale = useLocale();
  const data = [
    {
      title: locale['content.pro.recentProjects.title.1'],
      content: locale['content.pro.recentProjects.content.1'],
    },
    {
      title: locale['content.pro.recentProjects.title.2'],
      content: locale['content.pro.recentProjects.content.2'],
    },
    {
      title: locale['content.pro.recentProjects.title.3'],
      content: locale['content.pro.recentProjects.content.3'],
    },
    {
      title: locale['content.pro.recentProjects.title.4'],
      content: locale['content.pro.recentProjects.content.4'],
    },
  ];
  return (
    <Card
      title={locale['content.pro.recentProjects.title']}
      hoverable
      bordered={false}
      className={styles.panel}
      extra={<Link>{locale['content.pro.recentProjects.all']}</Link>}
    >
      <Card bordered={false}>
        {data.map(({ title, content }, index) => {
          return (
            <Card.Grid
              key={index}
              hoverable
              className={styles['card-grid']}
              style={{ width: '50%' }}
            >
              <Card
                title={
                  <div className={styles['card-grid-title']}>
                    <IconFile />
                    <span>{title}</span>
                  </div>
                }
                bordered={false}
              >
                {content}
              </Card>
            </Card.Grid>
          );
        })}
      </Card>
    </Card>
  );
}
