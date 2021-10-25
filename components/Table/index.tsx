import Table from './table';
import Summary from './summary/index';

const TableComponent = Table as typeof Table & { Summary: typeof Summary };

TableComponent.Summary = Summary;

export default TableComponent;

export { TableProps, ColumnProps, RowSelectionProps, ExpandProps } from './interface';
