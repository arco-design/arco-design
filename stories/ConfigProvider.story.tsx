/* eslint-disable no-console */
import React, { useState } from 'react';
import {
  ConfigProvider,
  Radio,
  Pagination,
  DatePicker,
  TimePicker,
  Popconfirm,
  Button,
  Modal,
} from '@self';

// @ts-ignore
import zhCN from '@self/locale/zh-CN';
// @ts-ignore
import enUS from '@self/locale/en-US';
// @ts-ignore
import jaJP from '@self/locale/ja-JP';
// @ts-ignore
import koKR from '@self/locale/ko-KR';
// @ts-ignore
import idID from '@self/locale/id-ID';
// @ts-ignore
import thTH from '@self/locale/th-TH';
// @ts-ignore
import zhHK from '@self/locale/zh-HK';
// @ts-ignore
import frFR from '@self/locale/fr-FR';
// @ts-ignore
import esES from '@self/locale/es-ES';
// @ts-ignore
import deDE from '@self/locale/de-DE';
// @ts-ignore
import itIT from '@self/locale/it-IT';
// @ts-ignore
import viVN from '@self/locale/vi-VN';
// @ts-ignore
import ruRU from '@self/locale/ru-RU';

function DemoI18n() {
  const [locale, setLocale] = useState('zh-CN');

  function getLocale() {
    switch (locale) {
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
      case 'de-DE':
        return deDE;
      case 'it-IT':
        return itIT;
      case 'vi-VN':
        return viVN;
      case 'ru-RU':
        return ruRU;
      default:
        return zhCN;
    }
  }

  return (
    <ConfigProvider locale={getLocale()}>
      <Radio.Group
        value={locale}
        options={[
          'zh-CN',
          'en-US',
          'zh-HK',
          'ja-JP',
          'ko-KR',
          'id-ID',
          'th-TH',
          'fr-FR',
          'es-ES',
          'de-DE',
          'it-IT',
          'vi-VN',
          'ru-RU',
        ]}
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
      <Button onClick={() => Modal.confirm({ title: 'Title', content: 'Content' })}>
        Modal confirm
      </Button>
    </ConfigProvider>
  );
}

export default {
  title: 'ConfigProvider',
};

export const i18n = () => <DemoI18n />;
