import React, { Component } from 'react';
import { Breadcrumb } from '@self';

const BreadcrumbItem = Breadcrumb.Item;

class DemoBreadcrumb extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
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

    return (
      <div>
        <Breadcrumb routes={routes} maxCount={2} style={{ marginTop: 20 }}></Breadcrumb>
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
  }
}

export default DemoBreadcrumb;
