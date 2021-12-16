import { createContext, DragEvent } from 'react';

import { AvailableVirtualListProps } from '../_class/VirtualList';
import type { NodeProps, TreeDataType, TreeState } from './interface';

export const TreeContext = createContext<{
  icons?: NodeProps['icons'];
  loadMore?: (node: NodeProps) => void;
  renderExtra?: (node: NodeProps) => void;
  renderTitle?: (node: NodeProps) => void;
  virtualListProps?: AvailableVirtualListProps;
  onSelect?: (_key: string, e) => void;
  onCheck?: (checked: boolean, _key: string, e) => void;
  onExpand?: (expanded: boolean, _key: string) => void;
  onNodeDrop?: (
    e: DragEvent<HTMLSpanElement>,
    nodeProps: NodeProps,
    dragPosition: 0 | 1 | -1
  ) => void;
  key2nodeProps?: { [key: string]: NodeProps };
  getNodeProps?: (node: NodeProps, expandedKeysSet: Set<string>) => NodeProps;
  getTreeState?: () => TreeState;
  onExpandEnd?: (key: string) => void;
  onNodeDragStart?: (e: DragEvent<HTMLSpanElement>, nodeProps: NodeProps) => void;
  onNodeDragEnd?: (e: DragEvent<HTMLSpanElement>, nodeProps: NodeProps) => void;
  onNodeDragOver?: (e: DragEvent<HTMLSpanElement>, nodeProps: NodeProps, position) => void;
  onNodeDragLeave?: (e: DragEvent<HTMLSpanElement>, nodeProps: NodeProps) => void;
  allowDrop?: (nodeProps: NodeProps, dragPosition: 0 | 1 | -1) => boolean;
  getFieldInfo?: (nodeProps: NodeProps) => TreeDataType;
}>({});
