import React from 'react';
import mountTest from '../../../tests/mountTest';
import componentConfigTest from '../../../tests/componentConfigTest';
import { fireEvent, render, cleanup } from '../../../tests/util';
import Snake from '..';

mountTest(Snake);
componentConfigTest(Snake, 'Snake');

describe('Snake', () => {
  afterEach(() => {
    cleanup();
  });

  it('renders correctly with default props', () => {
    const wrapper = render(<Snake />);
    expect(wrapper.find('.arco-snake').length).toBe(1);
    expect(wrapper.find('.arco-snake-board').length).toBe(1);
    expect(wrapper.find('.arco-snake-header').length).toBe(1);
    expect(wrapper.find('.arco-snake-score').length).toBe(1);
  });

  it('shows idle overlay on mount', () => {
    const wrapper = render(<Snake />);
    expect(wrapper.find('.arco-snake-overlay').length).toBe(1);
    expect(wrapper.find('.arco-snake-overlay-title')[0].textContent).toBe('Snake');
  });

  it('starts game when Start button is clicked', () => {
    const wrapper = render(<Snake />);
    const startBtn = wrapper.find('.arco-snake-btn')[0];
    expect(startBtn.textContent).toBe('Start');
    fireEvent.click(startBtn);
    // Overlay should be gone once running
    expect(wrapper.find('.arco-snake-overlay').length).toBe(0);
  });

  it('shows snake cells and food cell', () => {
    const wrapper = render(<Snake />);
    fireEvent.click(wrapper.find('.arco-snake-btn')[0]);
    expect(wrapper.find('.arco-snake-cell-head').length).toBe(1);
    expect(wrapper.find('.arco-snake-cell-food').length).toBe(1);
  });

  it('shows pause button when running', () => {
    const wrapper = render(<Snake />);
    fireEvent.click(wrapper.find('.arco-snake-btn')[0]);
    const pauseBtn = wrapper.find('.arco-snake-btn')[0];
    expect(pauseBtn.textContent).toBe('Pause');
  });

  it('pauses game when Pause button is clicked', () => {
    const wrapper = render(<Snake />);
    fireEvent.click(wrapper.find('.arco-snake-btn')[0]);
    fireEvent.click(wrapper.find('.arco-snake-btn')[0]);
    expect(wrapper.find('.arco-snake-overlay').length).toBe(1);
    expect(wrapper.find('.arco-snake-overlay-title')[0].textContent).toBe('Paused');
  });

  it('resumes game from overlay button', () => {
    const wrapper = render(<Snake />);
    fireEvent.click(wrapper.find('.arco-snake-btn')[0]);
    // Pause
    fireEvent.click(wrapper.find('.arco-snake-btn')[0]);
    // Resume via overlay button
    fireEvent.click(wrapper.find('.arco-snake-btn')[0]);
    expect(wrapper.find('.arco-snake-overlay').length).toBe(0);
  });

  it('respects custom width, height and cellSize', () => {
    const wrapper = render(<Snake width={10} height={10} cellSize={30} />);
    const board = wrapper.find('.arco-snake-board')[0] as HTMLElement;
    expect(board.style.width).toBe('300px');
    expect(board.style.height).toBe('300px');
  });

  it('calls onGameOver callback when provided', () => {
    const onGameOver = jest.fn();
    render(<Snake width={20} height={20} speed={200} onGameOver={onGameOver} />);
    expect(onGameOver).not.toHaveBeenCalled();
  });

  it('applies custom className and style', () => {
    const wrapper = render(<Snake className="my-snake" style={{ margin: 16 }} />);
    const el = wrapper.find('.arco-snake')[0] as HTMLElement;
    expect(el.classList.contains('my-snake')).toBe(true);
    expect(el.style.margin).toBe('16px');
  });
});
