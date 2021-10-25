import React from 'react';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { TimePicker } from '@self';

dayjs.extend(customParseFormat);

class Demo extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <TimePicker placeholder="请选择时间" defaultValue={dayjs('18:24:23', 'HH:mm:ss')} />
      </div>
    );
  }
}

export default Demo;
