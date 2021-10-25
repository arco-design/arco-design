import React from 'react';
// import dayjs from 'dayjs';
import { DatePicker } from '@self';

const { MonthPicker } = DatePicker;

class Demo extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <DatePicker placeholder="请选择日期" />
        <hr />
        <MonthPicker placeholder="请选择月份" />
      </div>
    );
  }
}

export default Demo;
