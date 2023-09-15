import React from 'react';
import { Tree, Button, TreeSelect, Select } from '@self';

function loop(path = '0', level = 4) {
  const list = [];

  for (let i = 0; i < 10; i += 1) {
    const key = `${path}-${i}`;
    const treeNode = {
      title: key,
      key,
    };

    if (level > 0) {
      treeNode.children = loop(key, level - 1);
    }

    list.push(treeNode);
  }

  return list;
}

const treeData = loop();

export const App = () => {
  const treeRef = React.useRef();
  return (
    <div>
      <TreeSelect
        treeData={treeData}
        treeCheckable
        treeProps={{
          height: 200,
          __ArcoAdapterMode__: true,
          // renderTitle: (props) => {
          //   return <span style={{ whiteSpace: 'nowrap' }}>{props.title}</span>;
          // },
        }}
      />
      {/* <Tree treeData={treeData} height={200} __ArcoAdapterMode__ /> */}
    </div>
  );
};

export default {
  title: 'TreeSelect',
};
