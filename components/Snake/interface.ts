import { CSSProperties } from 'react';

/**
 * @title Snake
 */
export interface SnakeProps {
  style?: CSSProperties;
  className?: string | string[];
  /**
   * @zh 棋盘列数
   * @en Number of columns
   * @defaultValue 20
   */
  width?: number;
  /**
   * @zh 棋盘行数
   * @en Number of rows
   * @defaultValue 20
   */
  height?: number;
  /**
   * @zh 每个格子的像素大小
   * @en Pixel size of each cell
   * @defaultValue 20
   */
  cellSize?: number;
  /**
   * @zh 蛇移动的速度（毫秒/帧）
   * @en Speed of the snake in milliseconds per tick
   * @defaultValue 200
   */
  speed?: number;
  /**
   * @zh 游戏结束时的回调
   * @en Callback when the game is over
   */
  onGameOver?: (score: number) => void;
  /**
   * @zh 分数变化时的回调
   * @en Callback when the score changes
   */
  onScoreChange?: (score: number) => void;
}
