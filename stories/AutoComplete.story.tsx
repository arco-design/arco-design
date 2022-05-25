import React, { useState } from 'react';
import { AutoComplete, AutoCompleteProps } from '@self';
import { IconSearch } from '@self/icon';

export default {
  title: 'AutoComplete',
};

function Demo1() {
  const [data, setData] = useState<AutoCompleteProps['data']>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = (inputValue: string) => {
    if (!isLoading) {
      if (inputValue.length > 2) {
        setIsLoading(true);
        setTimeout(() => {
          setData([
            {
              name: 'option1',
              value: 'option1',
            },
            {
              name: 'option2',
              value: 'option2',
            },
          ]);
          setIsLoading(false);
        }, 1500);
      } else if (inputValue.length === 0) {
        setData([]);
      }
    }
  };

  return (
    <AutoComplete
      allowClear
      data={data}
      filterOption={false}
      loading={isLoading}
      style={{ width: 254, marginTop: 100 }}
      placeholder="请输入..."
      inputProps={{ suffix: <IconSearch /> }}
      onSearch={handleSearch}
    />
  );
}

export const Demo = () => <Demo1 />;
