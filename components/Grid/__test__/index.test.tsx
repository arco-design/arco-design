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

  grid.find('.arco-col').forEach((node) => {
    expect(node.prop('style')).toEqual({ paddingLeft: 6, paddingRight: 6 });
  });
});

it('gutter correct when row children is custom component', () => {
  function CustomCol(props) {
    const { children, ...rest } = props;
    return (
      <Col {...rest}>
        <div>{children}</div>
      </Col>
    );
  }

  const grid = mount(
    <Row gutter={12}>
      <CustomCol span={12}>
        <div>Col-span-12 gutter-12</div>
      </CustomCol>
      <CustomCol span={12}>
        <div>Col-span-12 gutter-12</div>
      </CustomCol>
    </Row>
  );

  grid.find('.arco-col').forEach((node) => {
    expect(node.prop('style')).toEqual({ paddingLeft: 6, paddingRight: 6 });
  });
});

it('flex', () => {
  const grid = mount(
    <Row>
      <Col flex="100px">100px</Col>
      <Col flex="auto">auto</Col>
      <Col flex="1 1 auto">1 1 auto</Col>
    </Row>
  );

  expect(grid.find('.arco-col').at(0).prop('style')).toEqual({ flex: '0 0 100px' });
  expect(grid.find('.arco-col').at(1).prop('style')).toEqual({ flex: 'auto' });
  expect(grid.find('.arco-col').at(2).prop('style')).toEqual({ flex: '1 1 auto' });
});
