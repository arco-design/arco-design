---
order: 0
title:
  zh-CN: 基础用法
  en-US: Basic
---

## zh-CN

设置国际化语言的基础用法。

## en-US

Set the basic usage of internationalized languages.

```js
import { useState } from 'react';
import {
  ConfigProvider,
  Radio,
  Pagination,
  DatePicker,
  TimePicker,
  Popconfirm,
  Button,
  Modal
} from '@arco-design/web-react';
import zhCN from '@arco-design/web-react/es/locale/zh-CN';
import enUS from '@arco-design/web-react/es/locale/en-US';
import jaJP from '@arco-design/web-react/es/locale/ja-JP';
import koKR from '@arco-design/web-react/es/locale/ko-KR';
import idID from '@arco-design/web-react/es/locale/id-ID';
import thTH from '@arco-design/web-react/es/locale/th-TH';
import zhHK from '@arco-design/web-react/es/locale/zh-HK';
<<<<<<< HEAD
=======
import frFR from '@arco-design/web-react/es/locale/fr-FR';
import esES from '@arco-design/web-react/es/locale/es-ES';
>>>>>>> 0d7271e32... feat: add es & fr language

function Demo() {
  const [locale, setLocale] = useState('zh-CN');

  function getLocale() {
    switch(locale) {
      case 'zh-CN':
        return zhCN;
      case 'en-US':
        return enUS;
      case 'ja-JP':
        return jaJP;
      case 'ko-KR':
        return koKR;
      case 'id-ID':
        return idID;
      case 'th-TH':
        return thTH;
      case 'zh-HK':
        return zhHK;
      case 'fr-FR':
        return frFR;
      case 'es-ES':
        return esES;
      default:
        return zhCN;
    }
  }

  return (
    <ConfigProvider locale={getLocale()}>
      <Radio.Group
        value={locale}
        options={['zh-CN', 'en-US', 'zh-HK', 'ja-JP', 'ko-KR', 'id-ID', 'th-TH', 'fr-FR', 'es-ES']}
        name="locale"
        type="button"
        mode="fill"
        onChange={setLocale}
        style={{ marginBottom: 40 }}
      />
      <br />
      <Pagination
        total={200}
        showTotal
        sizeCanChange
        style={{ marginBottom: 20, marginRight: 40, minWidth: 550 }}
      />
      <DatePicker.RangePicker style={{ marginBottom: 20, marginRight: 40, width: 300 }} />
      <TimePicker.RangePicker style={{ marginBottom: 20, marginRight: 40, width: 300 }} />
      <Popconfirm title="Click to confirm!">
        <Button style={{ marginBottom: 20, marginRight: 20 }} type="primary">
          Popconfirm
        </Button>
      </Popconfirm>
      <Button onClick={() => Modal.confirm({title: 'Title', content: 'Content'})}>Modal confirm</Button>
    </ConfigProvider>
  );
}

ReactDOM.render(<Demo />, CONTAINER);
```
