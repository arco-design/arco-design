import React, { useRef, useState } from 'react';
import { Tabs } from '@self';
import { DndProvider, DragSource, DropTarget ,createDndContext} from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';


const { TabPane } = Tabs;
class TabNode extends React.Component {
  render() {
    const { connectDragSource, connectDropTarget, children } = this.props;

    return connectDragSource(connectDropTarget(children));
  }
}

const cardTarget = {
  drop(props, monitor) {
    const dragKey = monitor.getItem().index;
    const hoverKey = props.index;

    if (dragKey === hoverKey) {
      return;
    }
    props.moveTabNode(dragKey, hoverKey);
    monitor.getItem().index = hoverKey;
  },
};

const WrapTabNode = DropTarget('DND_NODE', cardTarget, connect => ({
  connectDropTarget: connect.dropTarget(),
}))(
  DragSource('DND_NODE', {
    beginDrag(props) {
      return {
        id: props.id,
        index: props.index,
      };
    },
  }, (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
  }))(TabNode),
);

function DraggableTabs(props) {
  const [tabs, setTabs] = useState(props.children || []);
  const manager = useRef(createDndContext(HTML5Backend))

  const moveTabNode = (dragKey, hoverKey) => {
    const newTabs = [...tabs];

    let dragTab = null;

    const dragIndex = newTabs.findIndex(item => item.key === dragKey)
    const hoverIndex = newTabs.findIndex(item => item.key === hoverKey)

    newTabs.splice(dragIndex, 1)
    newTabs.splice(hoverIndex, 0, tabs[dragIndex])

    setTabs(newTabs)
  };

  const renderTabHeader = (props, DefaultTabBar) => {
    return (
      <DefaultTabBar {...props}>
        {node => {
          return (
          <WrapTabNode key={node.key} index={node.key} moveTabNode={moveTabNode}>
            {node}
          </WrapTabNode>
        )
        }}
      </DefaultTabBar>
    )
  }


  return (
    <DndProvider manager={manager.current.dragDropManager}>
      <Tabs renderTabHeader={renderTabHeader}>
        {tabs}
      </Tabs>
    </DndProvider>
  );
}


const App = ()=>{
  return (
    <DraggableTabs>
      <TabPane title="tab 1" key="1">
        Content of Tab Pane 1
      </TabPane>
      <TabPane title="tab 2" key="2">
        Content of Tab Pane 2
      </TabPane>
      <TabPane title="tab 3" key="3">
        Content of Tab Pane 3
      </TabPane>
    </DraggableTabs>
  )
}

export default App;
