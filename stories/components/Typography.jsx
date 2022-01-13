import React from 'react';
import { Typography, Table, Popover } from '@self';
const { Text } = Typography;

// 空间不足时，省略文本的内容，中间用…（省略号）来省略
// 并且可以选择使用 popover 来展示完整文案
// 比如 some-long-string 可省略为 some-long… 或者 some…string
const EllipsisText = (props) => {
  const { content: str, options } = props;
  const {
    auto = true, // 全自动模式，仅支持在字符串尾部省略
    max = 10, // 短于这个长度的 string，不省略，展示全部
    head = 8, // 省略的 string 头部展示的 characters 的数量
    tail = 0, // 省略的 string 尾部展示的 characters 的数量
    ellipsisConfig, // ellipsis 配置
    className, // 文字的 classes
    style = { margin: 'auto' }, // 文字的 style
  } = options ?? {};

  const DEFAULT_ELLIPSIS_CONFIG = {
    rows: 1,
    expandable: false,
    ellipsisStr: '…',
    showTooltip: {
      type: 'popover',
    },
  };

  const finalEllipsisConfig = {
    ...DEFAULT_ELLIPSIS_CONFIG,
    ...(ellipsisConfig ?? {}),
  };

  if (auto) {
    return (
      <Text ellipsis={finalEllipsisConfig} className={className} style={style}>
        {str}
      </Text>
    );
  }

  // 自定义省略字符，可以把'…'放在字符串开头、中间或尾部
  const len = str.length;
  const shouldNotEllipsify = head + tail >= max || len <= max;

  // 根据规则省略文本，返回一个新的 string
  const getEllipsifiedText = () => str.substring(0, head) + '…' + str.substring(len - tail, len);

  return (
    <Popover content={str} disabled={shouldNotEllipsify}>
      <Text className={className} style={style}>
        {shouldNotEllipsify ? str : getEllipsifiedText()}
      </Text>
    </Popover>
  );
};

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    render(x) {
      return <EllipsisText content={x} />;
    },
  },
  {
    title: 'Salary',
    dataIndex: 'salary',
  },
  {
    title: 'Address',
    dataIndex: 'address',
  },
  {
    title: 'Email',
    dataIndex: 'email',
  },
];

const data = [
  {
    key: '1',
    name: 'Jane DoeJane DoeJane',
    salary: 23000,
    address: '32 Park Road, London',
    email: 'jane.doe@example.com',
  },
  {
    key: '5',
    name: 'William Smith',
    salary: 27000,
    address: '62 Park Road, London',
    email: 'william.smith@example.com',
  },
];

function App() {
  return <Table columns={columns} data={data} />;
}

export default App;
