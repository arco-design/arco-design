import React from 'react';
import { mount } from 'enzyme';
import mountTest from '../../../tests/mountTest';
import componentConfigTest from '../../../tests/componentConfigTest';
import Grid from '..';

const Row = Grid.Row;
const Col = Grid.Col;

mountTest(Row);
mountTest(Col);
componentConfigTest(Grid.Row, 'Grid.Row');
componentConfigTest(Grid.Col, 'Grid.Col');

it('render text and gutter correctly', () => {
  const grid = mount(
    <Row gutter={12}>
      <Col span={12}>
        <div>Col-span-12 gutter-12</div>
      </Col>
      <Col span={12}>
        <div>Col-span-12 gutter-12</div>
      </Col>
    </Row>
  );

  grid.find('.arco-col > div').forEach((node) => {
    expect(node.text()).toBe('Col-span-12 gutter-12');
  });

  expect(grid.prop('gutter')).toBe(12);
});
