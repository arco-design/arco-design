import React from 'react';
import { Breadcrumb } from '@self';

const BreadcrumbItem = Breadcrumb.Item;

const routes = [
  {
    path: '/',
    breadcrumbName: 'Home',
  },
  {
    path: '/data',
    breadcrumbName: 'Data',
    children: [
      {
        path: '/users',
        breadcrumbName: 'Users',
      },
      {
        path: '/permission',
        breadcrumbName: 'Permission',
      },
    ],
  },
  {
    path: '/list',
    breadcrumbName: 'List',
  },
  {
    path: '/detail',
    breadcrumbName: 'Details',
  },
];

export default {
  title: 'Breadcrumb',
};

export const Demo = () => (
  <div>
    <Breadcrumb routes={routes} maxCount={2} style={{ marginTop: 20 }} />
    <br />
    <Breadcrumb maxCount={2}>
      <BreadcrumbItem>Home</BreadcrumbItem>
      <BreadcrumbItem>
        <a>Management</a>
      </BreadcrumbItem>
      <BreadcrumbItem>Data List</BreadcrumbItem>
      <BreadcrumbItem>Date Detail</BreadcrumbItem>
    </Breadcrumb>
  </div>
);
