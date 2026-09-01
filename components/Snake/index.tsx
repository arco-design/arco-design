import React, { useState, useEffect, useRef, useContext, useCallback } from 'react';
import cs from '../_util/classNames';
import { ConfigContext } from '../ConfigProvider';
import { SnakeProps } from './interface';
import useMergeProps from '../_util/hooks/useMergeProps';

type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';
type Position = { x: number; y: number };
type GameStatus = 'idle' | 'running' | 'paused' | 'gameover';

interface GameState {
  snake: Position[];
  food: Position;
  direction: Direction;
  status: GameStatus;
  score: number;
}

const defaultProps: Partial<SnakeProps> = {
  width: 20,
  height: 20,
  cellSize: 20,
  speed: 200,
};

const OPPOSITE: Record<Direction, Direction> = {
  UP: 'DOWN',
  DOWN: 'UP',
  LEFT: 'RIGHT',
  RIGHT: 'LEFT',
};

const KEY_TO_DIR: Record<string, Direction> = {
  ArrowUp: 'UP',
  ArrowDown: 'DOWN',
  ArrowLeft: 'LEFT',
  ArrowRight: 'RIGHT',
};

function generateFood(cols: number, rows: number, snake: Position[]): Position {
  let food: Position;
  do {
    food = {
      x: Math.floor(Math.random() * cols),
      y: Math.floor(Math.random() * rows),
    };
  } while (snake.some((s) => s.x === food.x && s.y === food.y));
  return food;
}

function createInitialState(cols: number, rows: number): GameState {
  const snake: Position[] = [{ x: Math.floor(cols / 2), y: Math.floor(rows / 2) }];
  return {
    snake,
    food: generateFood(cols, rows, snake),
    direction: 'RIGHT',
    status: 'idle',
    score: 0,
  };
}

function moveHead(head: Position, dir: Direction): Position {
  switch (dir) {
    case 'UP':
      return { x: head.x, y: head.y - 1 };
    case 'DOWN':
      return { x: head.x, y: head.y + 1 };
    case 'LEFT':
      return { x: head.x - 1, y: head.y };
    case 'RIGHT':
      return { x: head.x + 1, y: head.y };
    default:
      return head;
  }
}

function Snake(baseProps: SnakeProps, ref: React.Ref<unknown>) {
  const { getPrefixCls, componentConfig } = useContext(ConfigContext);
  const props = useMergeProps<SnakeProps>(baseProps, defaultProps, componentConfig?.Snake);
  const {
    style,
    className,
    width: cols,
    height: rows,
    cellSize,
    speed,
    onGameOver,
    onScoreChange,
  } = props;

  const prefixCls = getPrefixCls('snake');

  const [gameState, setGameState] = useState<GameState>(() => createInitialState(cols!, rows!));

  const gameStateRef = useRef<GameState>(gameState);
  gameStateRef.current = gameState;

  const pendingDirRef = useRef<Direction>('RIGHT');

  // Keyboard handler
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      const { status, direction } = gameStateRef.current;
      if (e.key in KEY_TO_DIR) {
        e.preventDefault();
        const newDir = KEY_TO_DIR[e.key];
        if (OPPOSITE[newDir] !== direction) {
          pendingDirRef.current = newDir;
        }
      } else if (e.key === ' ') {
        e.preventDefault();
        if (status === 'running') {
          setGameState((prev) => ({ ...prev, status: 'paused' }));
        } else if (status === 'paused') {
          setGameState((prev) => ({ ...prev, status: 'running' }));
        }
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  // Game tick
  useEffect(() => {
    if (gameState.status !== 'running') return;

    const timer = setInterval(() => {
      const { snake, food, score } = gameStateRef.current;
      const dir = pendingDirRef.current;
      const newHead = moveHead(snake[0], dir);

      // Wall collision
      if (newHead.x < 0 || newHead.x >= cols! || newHead.y < 0 || newHead.y >= rows!) {
        setGameState((prev) => ({ ...prev, status: 'gameover' }));
        onGameOver?.(score);
        return;
      }

      // Self collision
      if (snake.some((s) => s.x === newHead.x && s.y === newHead.y)) {
        setGameState((prev) => ({ ...prev, status: 'gameover' }));
        onGameOver?.(score);
        return;
      }

      const ateFood = newHead.x === food.x && newHead.y === food.y;

      if (ateFood) {
        const newSnake = [newHead, ...snake];
        const newFood = generateFood(cols!, rows!, newSnake);
        const newScore = score + 10;
        onScoreChange?.(newScore);
        setGameState((prev) => ({
          ...prev,
          snake: newSnake,
          food: newFood,
          direction: dir,
          score: newScore,
        }));
      } else {
        const newSnake = [newHead, ...snake.slice(0, -1)];
        setGameState((prev) => ({
          ...prev,
          snake: newSnake,
          direction: dir,
        }));
      }
    }, speed!);

    return () => clearInterval(timer);
  }, [gameState.status, speed, cols, rows, onGameOver, onScoreChange]);

  const handleStart = useCallback(() => {
    const newState = createInitialState(cols!, rows!);
    pendingDirRef.current = 'RIGHT';
    setGameState({ ...newState, status: 'running' });
  }, [cols, rows]);

  const handlePauseResume = useCallback(() => {
    setGameState((prev) => ({
      ...prev,
      status: prev.status === 'running' ? 'paused' : 'running',
    }));
  }, []);

  const { snake, food, status, score } = gameState;

  const boardStyle: React.CSSProperties = {
    width: cols! * cellSize!,
    height: rows! * cellSize!,
  };

  const getCellStyle = (x: number, y: number): React.CSSProperties => ({
    left: x * cellSize!,
    top: y * cellSize!,
    width: cellSize!,
    height: cellSize!,
  });

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className={cs(prefixCls, className)}
      style={style}
    >
      <div className={`${prefixCls}-header`}>
        <span className={`${prefixCls}-score`}>
          Score: <strong>{score}</strong>
        </span>
        <div className={`${prefixCls}-actions`}>
          {(status === 'running' || status === 'paused') && (
            <button className={`${prefixCls}-btn`} onClick={handlePauseResume}>
              {status === 'running' ? 'Pause' : 'Resume'}
            </button>
          )}
        </div>
      </div>
      <div className={`${prefixCls}-board`} style={boardStyle}>
        {snake.map((seg, i) => (
          <div
            key={`s${i}`}
            className={cs(`${prefixCls}-cell`, {
              [`${prefixCls}-cell-head`]: i === 0,
              [`${prefixCls}-cell-body`]: i > 0,
            })}
            style={getCellStyle(seg.x, seg.y)}
          />
        ))}
        <div
          className={`${prefixCls}-cell ${prefixCls}-cell-food`}
          style={getCellStyle(food.x, food.y)}
        />
        {status !== 'running' && (
          <div className={`${prefixCls}-overlay`}>
            <p className={`${prefixCls}-overlay-title`}>
              {status === 'gameover' ? 'Game Over' : status === 'paused' ? 'Paused' : 'Snake'}
            </p>
            {status === 'gameover' && (
              <p className={`${prefixCls}-overlay-score`}>Score: {score}</p>
            )}
            <button
              className={`${prefixCls}-btn`}
              onClick={status === 'paused' ? handlePauseResume : handleStart}
            >
              {status === 'gameover' ? 'Restart' : status === 'paused' ? 'Resume' : 'Start'}
            </button>
            <p className={`${prefixCls}-overlay-hint`}>Use arrow keys to move, Space to pause</p>
          </div>
        )}
      </div>
    </div>
  );
}

const SnakeComponent = React.forwardRef<unknown, SnakeProps>(Snake);

SnakeComponent.displayName = 'Snake';

export default SnakeComponent;

export { SnakeProps };
