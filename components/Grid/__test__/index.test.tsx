import React from 'react';
import { render } from '../../../tests/util';
import mountTest from '../../../tests/mountTest';
import componentConfigTest from '../../../tests/componentConfigTest';
import Grid from '..';

const Row = Grid.Row;
const Col = Grid.Col;

mountTest(Row);
mountTest(Col);
componentConfigTest(Grid.Row, 'Grid.Row');
componentConfigTest(Grid.Col, 'Grid.Col');

describe('Grid', () => {
  it('render text and gutter correctly', () => {
    render(
      <Row gutter={12}>
        <Col span={12}>
          <div>Col-span-12 gutter-12</div>
        </Col>
        <Col span={12}>
          <div>Col-span-12 gutter-12</div>
        </Col>
      </Row>
    );

    document.querySelectorAll('.arco-col').forEach((node) => {
      const style = getComputedStyle(node);
      expect(style.paddingLeft).toBe('6px');
      expect(style.paddingRight).toBe('6px');
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

    render(
      <Row gutter={12}>
        <CustomCol span={12}>
          <div>Col-span-12 gutter-12</div>
        </CustomCol>
        <CustomCol span={12}>
          <div>Col-span-12 gutter-12</div>
        </CustomCol>
      </Row>
    );

    document.querySelectorAll('.arco-col').forEach((node) => {
      const style = getComputedStyle(node);
      expect(style.paddingLeft).toBe('6px');
      expect(style.paddingRight).toBe('6px');
    });
  });

  it('flex', () => {
    render(
      <Row>
        <Col flex="100px">100px</Col>
        <Col flex="auto">auto</Col>
        <Col flex="1 1 auto">1 1 auto</Col>
      </Row>
    );

    const cols = document.querySelectorAll('.arco-col');

    expect(getComputedStyle(cols[0]).flex).toBe('0 0 100px');
    expect(getComputedStyle(cols[1]).flex).toBe('auto');
    expect(getComputedStyle(cols[2]).flex).toBe('1 1 auto');
  });
});
