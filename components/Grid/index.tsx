import Col from './col';
import Row from './row';
import OriginGrid from './grid';
import GridItem from './grid-item';

const Grid = OriginGrid as typeof OriginGrid & {
  Col: typeof Col;
  Row: typeof Row;
  GridItem: typeof GridItem;
};

Grid.Col = Col;
Grid.Row = Row;
Grid.GridItem = GridItem;

export default Grid;

export { RowProps, ColProps, GridProps, ResponsiveValue } from './interface';
