/* eslint-disable no-console,react/no-this-in-sfc */
import React, { useState } from 'react';
import { Tree } from '@self';

const getAllDataDemo = (options?: { instanceNum?: number; dbNum?: number; tableNum?: number }) => {
  const { instanceNum = 5, dbNum = 5, tableNum = 1000 } = options || {};
  const instanceList = [];
  for (let i = 0; i < instanceNum; i++) {
    const dbList = [];
    for (let d = 0; d < dbNum; d++) {
      const table = [];
      for (let f = 0; f < tableNum; f++) {
        table.push({
          type: 'table',
          name: `Table${f}-DB${d}-instance${i}`,
          title: `Table${f}-DB${d}-instance${i}`,
          key: `Table${f}-DB${d}-instance${i}`,
          isLeaf: true,
        });
      }
      const dbs = {
        type: 'db',
        name: `DB${d}-instance${i}`,
        title: `DB${d}-instance${i}`,
        key: `DB${d}-instance${i}`,
        tables: table,
        children: table,
      };
      dbList.push(dbs);
    }
    const item = {
      instanceId: `实例${i}`,
      instanceName: `实例${i}`,
      name: `实例${i}`,
      title: `实例${i}`,
      key: `实例${i}`,
      dbs: dbList,
      children: dbList,
      type: 'instance',
    };
    instanceList.push(item);
  }
  return instanceList;
};

export const Demo = () => {
  const [treeData] = useState(getAllDataDemo());

  const [checkedKeys, setCheckedKeys] = useState<string[]>([]);

  const handleCheck = (keys: string[], extra: any) => {
    setCheckedKeys(keys);
    console.log(extra.checkedNodes);
  };

  return (
    <Tree
      onCheck={handleCheck}
      checkedKeys={checkedKeys}
      size="small"
      treeData={treeData}
      showLine
      checkable
      autoExpandParent={false}
      virtualListProps={{
        height: 394,
      }}
      // __ArcoAdapterMode__
    />
  );
};

export default {
  title: 'Tree',
};
