import { useMemo } from 'react';
import { ComponentsProps } from '../interface';
import { isObject } from '../../_util/is';

const defaultComponents: ComponentsProps = {
  table: 'table',
  header: {
    operations: ({ selectionNode, expandNode }) => [
      {
        name: 'expandNode',
        node: expandNode,
      },
      {
        name: 'selectionNode',
        node: selectionNode,
      },
    ],
    wrapper: 'div',
    thead: 'thead',
    row: 'tr',
    th: 'th',
    cell: 'div',
  },
  body: {
    operations: ({ selectionNode, expandNode }) => [
      {
        name: 'expandNode',
        node: expandNode,
      },
      {
        name: 'selectionNode',
        node: selectionNode,
      },
    ],
    wrapper: 'div',
    tbody: 'tbody',
    row: 'tr',
    td: 'td',
    cell: 'span',
  },
};

export default function useComponent(components: ComponentsProps) {
  const _components = useMemo(
    () => {
      if(!isObject(components)) {
        return defaultComponents
      }
      const _components = Object.assign({}, components, defaultComponents)
      _components.header = Object.assign({}, defaultComponents.header, components.header)
      _components.body = Object.assign({}, defaultComponents.body, components.body)
      return _components
    },
    [components]
  );

  return {
    getHeaderComponentOperations: _components.header.operations,
    getBodyComponentOperations: _components.body.operations,
    ComponentTable: _components.table,
    ComponentHeaderWrapper: _components.header.wrapper,
    ComponentThead: _components.header.thead,
    ComponentHeaderRow: _components.header.row,
    ComponentTh: _components.header.th,
    ComponentHeaderCell: _components.header.cell,
    ComponentBodyWrapper: _components.body.wrapper,
    ComponentTbody: _components.body.tbody,
    ComponentBodyRow: _components.body.row,
    ComponentTd: _components.body.td,
    ComponentBodyCell: _components.body.cell,
  };
}
