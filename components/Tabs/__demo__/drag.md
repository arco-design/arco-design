---
order: 9
title:
  zh-CN: 可拖拽页签
  en-US: Draggable
---

## zh-CN

通过 `react-dnd` 可以实现页签的拖拽。

## en-US

Use `react-dnd` to realize the drag and drop of tabs.

```tsx
import React, { useRef, useState } from 'react';
import { Tabs } from '@arco-design/web-react';
import { TabPaneProps } from '@arco-design/web-react/es/Tabs';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import type { Identifier, XYCoord } from 'dnd-core';

const { TabPane } = Tabs;

interface DragItem {
    index: number;
}

interface WrapTabNodeProps {
    index: number;
    moveTabNode: (dragIndex: number, hoverIndex: number) => void;
    children: React.ReactNode;
}

const initTabs: (TabPaneProps & { key: React.Key })[] = [
    { key: 'tab 1', title: 'tab 1', children: 'Content of Tab Pane 1' },
    { key: 'tab 2', title: 'tab 2', children: 'Content of Tab Pane 2' },
    { key: 'tab 3', title: 'tab 3', children: 'Content of Tab Pane 3' }
];

const WrapTabNode = (props: WrapTabNodeProps) => {
    const { index, moveTabNode, children, ...elseProps } = props;

    const ref = useRef<HTMLDivElement>(null);

    const [{ handlerId }, drop] = useDrop<DragItem, void, { handlerId: Identifier | null }>({
        accept: 'DND_NODE',
        collect(monitor) {
            return {
                handlerId: monitor.getHandlerId()
            };
        },
        hover(item, monitor) {
            if (!ref.current) {
                return;
            }
            const dragIndex = item.index;
            const hoverIndex = index;

            if (dragIndex === hoverIndex) {
                return;
            }

            const hoverBoundingRect = ref.current?.getBoundingClientRect();
            const hoverMiddleX = (hoverBoundingRect.right - hoverBoundingRect.left) / 2;

            const clientOffset = monitor.getClientOffset();
            const hoverClientX = (clientOffset as XYCoord).x - hoverBoundingRect.left;

            if (dragIndex < hoverIndex && hoverClientX < hoverMiddleX) {
                return;
            }

            if (dragIndex > hoverIndex && hoverClientX > hoverMiddleX) {
                return;
            }

            moveTabNode(dragIndex, hoverIndex);

            item.index = hoverIndex;
        }
    });

    const [, drag] = useDrag({
        type: 'DND_NODE',
        item: () => {
            return { index };
        }
    });

    drag(drop(ref));

    return (
        <div ref={ref} data-handler-id={handlerId} {...elseProps}>
            {children}
        </div>
    );
};

const App = () => {
    const [tabs, setTabs] = useState(initTabs);

    const moveTabNode = (dragIndex: number, hoverIndex: number) =>
        setTabs(prevTabs => {
            const newCards = [...prevTabs];
            newCards.splice(hoverIndex, 0, ...newCards.splice(dragIndex, 1));

            return newCards;
        });

    return (
        <DndProvider backend={HTML5Backend}>
            <Tabs>
                {tabs.map((tabPane, index) => (
                    <TabPane
                        key={tabPane.key}
                        title={
                            <WrapTabNode key={index} index={index} moveTabNode={moveTabNode}>
                                {tabPane.title}
                            </WrapTabNode>
                        }
                    >
                        {tabPane.children}
                    </TabPane>
                ))}
            </Tabs>
        </DndProvider>
    );
};

export default App;
```
