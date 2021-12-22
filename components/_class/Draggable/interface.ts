import { CSSProperties, ReactNode } from 'react';

export type DragStatus = 'none' | 'dragged' | 'dragging';

export type DragPosition = 'left' | 'right' | 'top' | 'bottom';

export interface DraggableItemProps extends Pick<DraggableProps, 'direction'> {
  style?: CSSProperties;
  prefixCls: string;
  children?: ReactNode;
  /** Weather allow to drag  */
  disabled?: boolean;
  /** Weather allow to drop on it */
  droppable?: boolean;
  onDragStart?: (event) => void;
  onDragEnd?: (event) => void;
  onDragLeave?: (event) => void;
  onDragOver?: (event) => void;
  onDrop?: (event, dropPosition: DragPosition) => void;
}

export interface DraggableProps {
  children?: ReactNode;
  direction?: 'horizontal' | 'vertical';
  className?: string | string[];
  itemWrapperStyle?: CSSProperties;
  onIndexChange?: (index: number, prevIndex: number) => void;
}
