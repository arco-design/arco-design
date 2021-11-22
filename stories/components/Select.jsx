import React, { useState } from 'react';
import { Select, Spin, Tag } from '@self';

const generateOptions = (size) => {
  return new Array(size).fill(1).map((_, index) => {
    return {
      label: `${new Array(~~(index / 2)).join('-')} ${index}`,
      value: index,
    };
  });
};

export default function() {
  const [options, setOptions] = useState(generateOptions(50));
  const [loading, setLoading] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const loadMore = async () => {
    await new Promise((resolve) => {
      setTimeout(resolve, 2000);
    });
    setOptions(generateOptions(options.length + 50));
    setLoading(false);
  };

  function tagRender(props, index, total) {
    if (total > 3) {
      return index === 0 ? (
        <span style={{ marginLeft: 8 }}>{`你已经选择了 ${total} 项`}</span>
      ) : null;
    }

    const { closable, onClose, label, value } = props;
    return (
      <Tag color={value} closable={closable} onClose={onClose} style={{ margin: '2px 6px 2px 0' }}>
        {label}
      </Tag>
    );
  }

  const _options = [
    'red',
    'orangered',
    'orange',
    'gold',
    'lime',
    'green',
    'cyan',
    'blue',
    'arcoblue',
    'purple',
    'magenta',
  ];

  return (
    <form onSubmit={() => alert('submit')}>
      <Select
        style={{ width: 300 }}
        options={options}
        placeholder="Please Select"
        triggerProps={{
          autoAlignPopupWidth: false,
        }}
        dropdownRender={(menu) => {
          return (
            <Spin loading={loading} style={{ width: '100%' }}>
              {menu}
              <div onClick={loadMore}>加载更多...</div>
            </Spin>
          );
        }}
      >
        <Select.OptGroup label="Group 1">
          <Select.Option value="G1_V1">G1 V1</Select.Option>
          <Select.Option value="G1_V2">G1 V2</Select.Option>
          <Select.OptGroup label="Group 2">
            <Select.Option value="G2_V1">G2 V1</Select.Option>
            <Select.Option value="G2_V2">G2 V1</Select.Option>
          </Select.OptGroup>
        </Select.OptGroup>
      </Select>
      <Select
        style={{ width: 300 }}
        showSearch
        options={options}
        placeholder="Please Select"
        onFocus={() => console.log('onFocus 2')}
        onBlur={() => console.log('onBlur 2')}
      />
      <Select
        style={{ width: 300 }}
        mode="multiple"
        allowClear
        allowCreate
        tokenSeparators={[',', '\n', '\t']}
        options={options}
        placeholder="Please Select"
        onFocus={() => console.log('onFocus 3')}
        onBlur={() => console.log('onBlur 3')}
        inputValue={inputValue}
        onInputValueChange={(value) => setInputValue(value.slice(0, 10))}
      />
      <Select
        dragToSort
        style={{ maxWidth: 350, marginRight: 20 }}
        allowClear
        placeholder="Please Select"
        mode={'multiple'}
        defaultValue={_options.slice(0, 2)}
        options={_options}
        animation={false}
      />
      <button type="submit">Submit</button>
    </form>
  );
}
