import React from 'react';
import { render } from '@testing-library/react';
import mountTest from '../../../tests/mountTest';
import componentConfigTest from '../../../tests/componentConfigTest';
import Log from '..';

mountTest(Log);
componentConfigTest(Log, 'Log');

describe('Log', () => {
  it('renders basic log', () => {
    const { container } = render(<Log content="Test log message" />);
    expect(container.querySelector('.arco-log')).toBeInTheDocument();
    expect(container.textContent).toBe('Test log message');
  });

  it('renders different types', () => {
    const types = ['default', 'info', 'success', 'warning', 'error'] as const;
    types.forEach((type) => {
      const { container } = render(<Log content="Test" type={type} />);
      expect(container.querySelector(`.arco-log-${type}`)).toBeInTheDocument();
    });
  });

  it('renders with icon', () => {
    const { container } = render(<Log content="Test" type="info" showIcon />);
    expect(container.querySelector('.arco-log-icon-wrapper')).toBeInTheDocument();
  });

  it('renders without icon', () => {
    const { container } = render(<Log content="Test" type="info" showIcon={false} />);
    expect(container.querySelector('.arco-log-icon-wrapper')).not.toBeInTheDocument();
  });

  it('renders with timestamp', () => {
    const { container } = render(<Log content="Test" showTimestamp />);
    expect(container.querySelector('.arco-log-timestamp')).toBeInTheDocument();
  });

  it('renders without timestamp', () => {
    const { container } = render(<Log content="Test" showTimestamp={false} />);
    expect(container.querySelector('.arco-log-timestamp')).not.toBeInTheDocument();
  });

  it('renders with custom timestamp', () => {
    const { container } = render(<Log content="Test" showTimestamp timestamp="12:34:56" />);
    const timestamp = container.querySelector('.arco-log-timestamp');
    expect(timestamp).toBeInTheDocument();
    expect(timestamp?.textContent).toBe('12:34:56');
  });

  it('renders with children instead of content', () => {
    const { container } = render(<Log>Child content</Log>);
    expect(container.textContent).toContain('Child content');
  });

  it('applies custom className', () => {
    const { container } = render(<Log content="Test" className="custom-class" />);
    expect(container.querySelector('.custom-class')).toBeInTheDocument();
  });

  it('applies custom style', () => {
    const { container } = render(<Log content="Test" style={{ color: 'red' }} />);
    const log = container.querySelector('.arco-log') as HTMLElement;
    expect(log.style.color).toBe('red');
  });
});
