---
order: 7
title:
  zh-CN: 表格属性
  en-US: Attributes
---

## zh-CN

在这里，你可以方便的打开或关闭表格的属性，来看一下吧。

## en-US

You can easily open or close the properties of the table.

```js
import { Table, Grid, Switch, Form, Radio } from '@arco-design/web-react';

const FormItem = Form.Item;
const { Row, Col } = Grid;

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
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

const defaultData = [{
  key: '1',
  name: 'Jane Doe',
  salary: 23000,
  address: '32 Park Road, London',
  email: 'jane.doe@example.com'
}, {
  key: '2',
  name: 'Alisa Ross',
  salary: 25000,
  address: '35 Park Road, London',
  email: 'alisa.ross@example.com'
}, {
  key: '3',
  name: 'Kevin Sandra',
  salary: 22000,
  address: '31 Park Road, London',
  email: 'kevin.sandra@example.com'
}, {
  key: '4',
  name: 'Ed Hellen',
  salary: 17000,
  address: '42 Park Road, London',
  email: 'ed.hellen@example.com'
}, {
  key: '5',
  name: 'William Smith',
  salary: 27000,
  address: '62 Park Road, London',
  email: 'william.smith@example.com'
}];

let data = defaultData;

class Demo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checkbox: true,
      checkAll: true,
      border: true,
      borderCell: false,
      hover: true,
      stripe: false,
      loading: false,
      showHeader: true,
      fixedHeader: false,
      no_data: false,
      size: 'default',
      pagePosition: 'br'
    };
  }

  onChange = (type, checked) => {
    if (type === 'no_data') {
      data = checked ? [] : defaultData;
    }
    this.setState({
      [type]: checked,
    });
  };

  render() {
    const {
      checkbox,
      borderCell,
      checkAll,
      border,
      hover,
      stripe,
      loading,
      showHeader,
      fixedHeader,
      no_data,
      size,
      pagePosition,
    } = this.state;

    return (
      <div>
        <div>
          <Form layout="inline">
            <FormItem label="Border" colon={false}>
              <Switch size="small" onChange={this.onChange.bind(this, 'border')} checked={border} />
            </FormItem>
            <FormItem label="Border Cell" colon={false}>
              <Switch
                size="small"
                onChange={this.onChange.bind(this, 'borderCell')}
                checked={borderCell}
              />
            </FormItem>
            <FormItem label="Hover" colon={false}>
              <Switch size="small" onChange={this.onChange.bind(this, 'hover')} checked={hover} />
            </FormItem>
            <FormItem label="Stripe" colon={false}>
              <Switch size="small" onChange={this.onChange.bind(this, 'stripe')} checked={stripe} />
            </FormItem>
            <FormItem label="Checkbox" colon={false}>
              <Switch
                size="small"
                onChange={this.onChange.bind(this, 'checkbox')}
                checked={checkbox}
              />
            </FormItem>
            <FormItem label="Check All" colon={false}>
              <Switch
                size="small"
                onChange={this.onChange.bind(this, 'checkAll')}
                checked={checkAll}
              />
            </FormItem>
            <FormItem label="Loading" colon={false}>
              <Switch
                size="small"
                onChange={this.onChange.bind(this, 'loading')}
                checked={loading}
              />
            </FormItem>
            <FormItem label="Table Header" colon={false}>
              <Switch
                size="small"
                onChange={this.onChange.bind(this, 'showHeader')}
                checked={showHeader}
              />
            </FormItem>
            <FormItem label="Header fixed" colon={false}>
              <Switch
                size="small"
                onChange={this.onChange.bind(this, 'fixedHeader')}
                checked={fixedHeader}
              />
            </FormItem>
            <FormItem label="No data" colon={false}>
              <Switch size="small" onChange={this.onChange.bind(this, 'no_data')} checked={no_data} />
            </FormItem>
            <FormItem label="Size" colon={false}>
              <Radio.Group
                type='button'
                options={['default', 'middle', 'small', 'mini']}
                value={size}
                onChange={this.onChange.bind(this, 'size')}
              />
            </FormItem>
            <FormItem label="Pagination position" colon={false}>
              <Radio.Group
                type='button'
                options={[
                  {label: 'BottomRight', value: 'br'},
                  {label: 'BottomLeft', value: 'bl'},
                  {label: 'TopRight', value: 'tr'},
                  {label: 'TopLeft', value: 'tl'},
                  {label: 'TopCenter', value: 'topCenter'},
                  {label: 'BottomCenter', value: 'bottomCenter'},
                ]}
                value={pagePosition}
                onChange={this.onChange.bind(this, 'pagePosition')}
              />
            </FormItem>
          </Form>
        </div>
        <div>
          <Table
            columns={columns}
            data={data}
            {...this.state}
            rowSelection={checkbox && {
              type: 'checkbox',
              checkAll: checkAll
            }}
            scroll={fixedHeader ? { y: 120 } : {}}
            style={{ marginTop: 10 }}
            pagination={{ pageSize: 5 }}
          />
        </div>
      </div>
    );
  }
}

ReactDOM.render(<Demo />, CONTAINER);
```
