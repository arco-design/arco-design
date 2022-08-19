import React, { useContext } from 'react';
import Footer from '@arco-materials/site-footer';
import Banner from './sections/Banner';
import Customers from './sections/Customers';
import { GlobalContext } from '../../context';
import './index.less';

export default function () {
  const { lang } = useContext(GlobalContext);

  return (
    <div id="customer">
      <Banner />
      <Customers />
      <Footer lang={lang} larkGroup />
    </div>
  );
}
