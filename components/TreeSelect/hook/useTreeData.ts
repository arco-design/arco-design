import { useState } from 'react';
import { TreeSelectProps } from '../interface';
import usePrevious from '../../_util/hooks/usePrevious';
import { getTreeDataFromTreeChildren } from '../../Tree/util';
import { TreeProps } from '../../Tree/interface';
import useUpdate from '../../_util/hooks/useUpdate';

export default function useTreeData(props: TreeSelectProps): [TreeProps['treeData']] {
  const prevProps: TreeProps = usePrevious(props) || {};

  const getData = () => {
    return props.treeData || getTreeDataFromTreeChildren(props.children);
  };

  const [treeData, setTreeData] = useState<TreeProps['treeData']>(getData());

  useUpdate(() => {
    if (props.treeData !== prevProps.treeData || props.children !== prevProps.children) {
      setTreeData(getData());
    }
  }, [props]);

  return [treeData];
}
