---
order: 17
title:
  zh-CN: 可编辑单元格
  en-US: Editable cell
---

## zh-CN

可编辑单元格。

## en-US

Editable cell.

```tsx
import React, { useState, useRef, useEffect, useContext, useCallback } from 'react';
import { Button, Table, Input, Select, Form, FormInstance } from '@arco-design/web-react';
const FormItem = Form.Item;
const EditableContext = React.createContext<{ getForm?: () => FormInstance }>({});

function EditableRow(props) {
  const { children, record, className, ...rest } = props;
  const refForm = useRef(null);

  const getForm = () => refForm.current;

  return (
    <EditableContext.Provider
      value={{
        getForm,
      }}
    >
      <Form
        style={{ display: 'table-row' }}
        children={children}
        ref={refForm}
        wrapper="tr"
        wrapperProps={rest}
        className={`${className} editable-row`}
      />
    </EditableContext.Provider>
  );
}

function EditableCell(props) {
  const { children, className, rowData, column, onHandleSave } = props;
  const ref = useRef(null);
  const refInput = useRef(null);
  const { getForm } = useContext(EditableContext);
  const [editing, setEditing] = useState(false);
  const handleClick = useCallback(
    (e) => {
      if (
        editing &&
        column.editable &&
        ref.current &&
        !ref.current.contains(e.target) &&
        !e.target.classList.contains('js-demo-select-option')
      ) {
        cellValueChangeHandler(rowData[column.dataIndex]);
      }
    },
    [editing, rowData, column]
  );
  useEffect(() => {
    editing && refInput.current && refInput.current.focus();
  }, [editing]);
  useEffect(() => {
    document.addEventListener('click', handleClick, true);
    return () => {
      document.removeEventListener('click', handleClick, true);
    };
  }, [handleClick]);

  const cellValueChangeHandler = (value) => {
    if (column.dataIndex === 'salary') {
      const values = {
        [column.dataIndex]: value,
      };
      onHandleSave && onHandleSave({ ...rowData, ...values });
      setTimeout(() => setEditing(!editing), 300);
    } else {
      const form = getForm();
      form.validate([column.dataIndex], (errors, values) => {
        if (!errors || !errors[column.dataIndex]) {
          setEditing(!editing);
          onHandleSave && onHandleSave({ ...rowData, ...values });
        }
      });
    }
  };

  if (editing) {
    return (
      <div ref={ref}>
        {column.dataIndex === 'salary' ? (
          <Select
            onChange={cellValueChangeHandler}
            defaultValue={rowData[column.dataIndex]}
            options={[2000, 5000, 10000, 20000]}
          />
        ) : (
          <FormItem
            style={{ marginBottom: 0 }}
            labelCol={{ span: 0 }}
            wrapperCol={{ span: 24 }}
            initialValue={rowData[column.dataIndex]}
            field={column.dataIndex}
            rules={[{ required: true }]}
          >
            <Input ref={refInput} onPressEnter={cellValueChangeHandler} />
          </FormItem>
        )}
      </div>
    );
  }

  return (
    <div
      className={column.editable ? `editable-cell ${className}` : className}
      onClick={() => column.editable && setEditing(!editing)}
    >
      {children}
    </div>
  );
}

function EditableTable() {
  const [count, setCount] = useState(5);
  const [data, setData] = useState([
    {
      key: '1',
      name: 'Jane Doe',
      salary: 23000,
      address: '32 Park Road, London',
      email: 'jane.doe@example.com',
    },
    {
      key: '2',
      name: 'Alisa Ross',
      salary: 25000,
      address: '35 Park Road, London',
      email: 'alisa.ross@example.com',
    },
    {
      key: '3',
      name: 'Kevin Sandra',
      salary: 22000,
      address: '31 Park Road, London',
      email: 'kevin.sandra@example.com',
    },
    {
      key: '4',
      name: 'Ed Hellen',
      salary: 17000,
      address: '42 Park Road, London',
      email: 'ed.hellen@example.com',
    },
    {
      key: '5',
      name: 'William Smith',
      salary: 27000,
      address: '62 Park Road, London',
      email: 'william.smith@example.com',
    },
  ]);
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      editable: true,
    },
    {
      title: 'Salary',
      dataIndex: 'salary',
      editable: true,
    },
    {
      title: 'Address',
      dataIndex: 'address',
    },
    {
      title: 'Email',
      dataIndex: 'email',
    },
    {
      title: 'Operation',
      dataIndex: 'op',
      render: (_, record) => (
        <Button onClick={() => removeRow(record.key)} type="primary" status="danger">
          Delete
        </Button>
      ),
    },
  ];

  function handleSave(row) {
    const newData = [...data];
    const index = newData.findIndex((item) => row.key === item.key);
    newData.splice(index, 1, { ...newData[index], ...row });
    setData(newData);
  }

  function removeRow(key) {
    setData(data.filter((item) => item.key !== key));
  }

  function addRow() {
    setCount(count + 1);
    setData(
      data.concat({
        key: `${count + 1}`,
        name: 'Tom',
        salary: 10000,
        address: '33 Park Road, London',
        email: 'tom@example.com',
      })
    );
  }

  return (
    <>
      <Button
        style={{ marginBottom: 10, }}
        type="primary"
        onClick={addRow}
      >
        Add
      </Button>
      <Table
        data={data}
        components={{
          body: {
            row: EditableRow,
            cell: EditableCell,
          },
        }}
        columns={columns.map((column) =>
          column.editable
            ? {
                ...column,
                onCell: () => ({
                  onHandleSave: handleSave,
                }),
              }
            : column
        )}
        className="table-demo-editable-cell"
      />
    </>
  );
}

export default EditableTable;
```

```css
.table-demo-editable-cell .editable-row .editable-cell {
  display: inline-block;
  padding: 5px 11px;
}

.table-demo-editable-cell .editable-row .editable-cell:hover {
  border-radius: 4px;
  border: 1px solid var(--color-border);
  padding: 4px 10px;
}
```
