import React, { useState } from 'react';
import { AutoComplete } from '@self';
import { IconSearch } from '@self/icon';

function Demo() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = (inputValue) => {
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

export default Demo;
