import React from 'react';
import { Radio } from '@arco-design/web-react';

function MenuHeader(props) {
  const { style } = props;

  function onChange(value) {
    if (value === 'Vue') {
      window.location = '/vue';
    }
  }

  return (
    <div className="ac-site-menu-header" style={style}>
      <Radio.Group
        onChange={onChange}
        size="large"
        value="React"
        type="button"
        options={['React', 'Vue']}
      />
    </div>
  );
}

export default MenuHeader;
