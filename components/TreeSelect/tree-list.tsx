import React, { useRef, useCallback, useMemo, useImperativeHandle, forwardRef } from 'react';
import Tree from '../Tree';
import { isFunction, isString } from '../_util/is';
import { TreeSelectProps, LabelValue } from './interface';
import { TreeProps } from '../Tree/interface';

interface TreeListProps extends TreeSelectProps {
  value: LabelValue[];
  multiple: boolean;
  filterNode: TreeProps['filterNode'];
  inputValue?: string;
  prefixCls?: string;
}

function TreeList(props: TreeListProps, ref) {
  const {
    value,
    multiple,
    loadMore,
    treeCheckedStrategy,
    treeCheckStrictly,
    treeData,
    treeProps,
    prefixCls,
    treeCheckable,
  } = props;
  const propsRenderTitle = treeProps && treeProps.renderTitle;
  const treeRef = useRef<Tree>();

  const handleCheck = useCallback(
    (keys, { checkedNodes, checked, node }) => {
      const newValue = keys.map((key) => {
        const item = checkedNodes.find((x) => x && x.props._key === key);
        if (!item) {
          const tmp = value.find((x) => x.value === key);
          return (
            tmp || {
              label: key,
              value: key,
            }
          );
        }
        return {
          label: item.props.title,
          value: item.props._key,
          disabled: item.props.disabled,
        };
      });
      props.onChange(newValue, {
        checked,
        trigger: node?.props,
      });
    },
    [props.onChange, value]
  );

  const handleChange = useCallback(
    (_, { node, selected }) => {
      let newValue = [
        {
          value: node.props._key,
          label: node.props.title,
        },
      ];
      if (multiple) {
        newValue = [...value];
        const index = newValue.findIndex((x) => x.value === node.props._key);
        if (index > -1) {
          newValue.splice(index, 1);
        } else {
          newValue.push({
            value: node.props._key,
            label: node.props.title,
          });
        }
      }
      props.onChange(newValue, { trigger: node?.props, selected });
    },
    [props.onChange, value, multiple]
  );

  const handleCheckableSelect = useCallback((_, { node, e }) => {
    const { checked, checkable, disabled, disableCheckbox } = node.props;

    if (treeRef.current && !disableCheckbox && !disabled && checkable !== false) {
      treeRef.current.handleCheck && treeRef.current.handleCheck(!checked, node.props._key, e);
    }
  }, []);

  const handleLoadMore = useCallback(
    (treeNode) => {
      if (isFunction(loadMore)) {
        const dataRef = treeNode.props.dataRef;
        return loadMore(treeNode, dataRef);
      }
      return [];
    },
    [loadMore]
  );

  const renderTitle = useCallback(
    (nodeProps) => {
      if (propsRenderTitle) {
        return propsRenderTitle(nodeProps);
      }

      const inputValue = props.inputValue;
      const { title } = nodeProps;
      if (inputValue && isString(title)) {
        const index = title.toLowerCase().indexOf(inputValue.toLowerCase());
        if (index === -1) {
          return title;
        }
        const prefix = title.substr(0, index);
        const suffix = title.substr(index + inputValue.length);

        return (
          <span>
            {prefix}
            <span className={`${prefixCls}-highlight`}>
              {title.substr(index, inputValue.length)}
            </span>
            {suffix}
          </span>
        );
      }
      return title;
    },
    [prefixCls, props.inputValue, propsRenderTitle]
  );

  const extraProps = useMemo(() => {
    return props.treeCheckable
      ? {
          onCheck: handleCheck,
          checkedKeys: value.map((x) => x.value),
        }
      : {};
  }, [handleCheck, value, props.treeCheckable]);

  const selectedKeys = useMemo(() => {
    return props.treeCheckable ? [] : value.map((x) => x.value);
  }, [props.treeCheckable, value]);

  const onSelect = useCallback(
    (_, extra) => {
      props.treeCheckable ? handleCheckableSelect(_, extra) : handleChange(_, extra);
    },
    [props.treeCheckable, handleCheckableSelect, handleChange]
  );

  useImperativeHandle(
    ref,
    () => {
      return treeRef.current;
    },
    []
  );

  return (
    <Tree
      ref={treeRef}
      size={props.size}
      blockNode
      filterNode={props.filterNode}
      {...treeProps}
      checkable={treeCheckable}
      multiple={multiple}
      loadMore={props.loadMore ? handleLoadMore : undefined}
      checkedStrategy={treeCheckedStrategy}
      checkStrictly={treeCheckStrictly}
      onMouseDown={(e) => {
        e.preventDefault();
      }}
      {...extraProps}
      treeData={treeData}
      fieldNames={props.fieldNames}
      renderTitle={renderTitle}
      onSelect={onSelect}
      selectedKeys={selectedKeys}
    />
  );
}

export default forwardRef(TreeList);
