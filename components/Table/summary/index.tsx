import { ReactElement } from 'react';
import { SummaryProps } from '../interface';
import Row from './row';
import Cell from './cell';

function Summary(props: SummaryProps) {
  return props.children as ReactElement;
}

Summary.Row = Row;
Summary.Cell = Cell;

export default Summary;
