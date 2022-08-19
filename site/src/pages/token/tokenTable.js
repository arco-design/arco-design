import React from 'react';
import { Table } from '@arco-design/web-react';
import ValueCopy from './valueCopy';

const locale = {
  'zh-CN': {
    varName: '变量名',
    varValue: '变量值',
    cssVar: 'CSS变量',
    desc: '描述',
  },
  'en-US': {
    varName: 'Token',
    varValue: 'Value',
    cssVar: 'Css Var',
    desc: 'Description',
  },
};

export default function TokenTable({ lang, type, data, isDark }) {
  const t = locale[lang];

  const columns = [
    {
      title: t.varName,
      dataIndex: 'name',
      width: 200,
      render: (_, item) => {
        return (
          <div className="token-content">
            {type === 'color' ? (
              <div
                className="token-sample"
                style={{
                  backgroundColor: isDark ? item.darkValue ?? item.value : item.value,
                }}
              />
            ) : null}
            <div>{type === 'color' && isDark ? `dark-${item.name}` : item.name}</div>
          </div>
        );
      },
    },
    {
      title: t.varValue,
      dataIndex: 'value',
      width: 250,
      render: (_, item) => {
        const varValue = isDark ? item.darkValue ?? item.value : item.value;
        return <ValueCopy text={varValue} />;
      },
    },
    {
      title: t.cssVar,
      dataIndex: 'cssvar',
      width: 200,
      render: (_, item) => {
        return item.cssvar ? `--${item.name}` : '-';
      },
    },
    {
      title: t.desc,
      dataIndex: lang === 'en-US' ? 'descEN' : 'desc',
    },
  ];

  return <Table columns={columns} data={data} pagination={false} rowKey="name" />;
}
