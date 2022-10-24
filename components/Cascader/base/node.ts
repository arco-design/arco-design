import { OptionProps } from '../interface';
import { ConfigType } from './store';
import { DefaultFieldNames } from '../cascader';

export interface NodeProps<T> extends OptionProps {
  value: string;
  label: string;
  isLeaf?: boolean;
  /** 是否选中 */
  _checked: boolean;
  /** 层级 */
  _level?: number;
  /** 是否半选 */
  _halfChecked: boolean;
  /** 当前选项节点的父节点 */
  parent: NodeProps<T> | null;
  /** 当前选项节点路径的所有节点的值 */
  pathValue: string[];
  /** 下一级选项 */
  children?: NodeProps<T>[];
  /** 是否在加载中 */
  loading?: boolean;
  /** 是否加载完成 */
  loaded?: boolean;
  pathLabel: string[];
}

class Node<T> {
  value: string;

  label: string;

  // 是否禁用
  disabled?: boolean;

  _level?: number;

  _index?: number;

  isLeaf?: boolean;

  disableCheckbox?: boolean;

  // 是否选中
  _checked: boolean;

  /** 是否半选 */
  _halfChecked: boolean;

  /** 当前选项节点的父节点 */
  parent: Node<T> | null;

  /** 当前选项节点路径的所有节点的值 */
  pathValue: string[] = [];

  pathLabel: string[] = [];

  /** 下一级选项 */
  children?: Node<T>[];

  /** 是否在加载中 */
  loading?: boolean;

  /** 是否加载完成 */
  loaded?: boolean;

  config: ConfigType<T> = {};

  // 保存暴露给外部的属性
  _data?: NodeProps<T>;

  constructor(data: T, config?: ConfigType<T>, parent?: Node<T>) {
    this.config = config || {};
    this._initNode(data, parent || null);
  }

  private _initNode = (option: T | NodeProps<T>, parent: Node<T> = null) => {
    const { showEmptyChildren, lazyload } = this.config;

    const fieldNames = { ...DefaultFieldNames, ...this.config.fieldNames };

    const children = option[fieldNames.children];

    let isLeaf = Array.isArray(children)
      ? showEmptyChildren
        ? false
        : children.length === 0
      : true;

    if (lazyload) {
      if (fieldNames.isLeaf in option) {
        isLeaf = !!option[fieldNames.isLeaf];
      } else {
        isLeaf = false;
      }
    }

    const nodeValue = option[fieldNames.value];
    const nodeLabel = option[fieldNames.label];

    const newOption: NodeProps<T> = {
      ...option,
      value: nodeValue,
      label: nodeLabel,
      isLeaf,
      loading: false,
      loaded: false,
      disabled: (parent && parent.disabled) || option[fieldNames.disabled],
      parent,
      pathValue: parent ? [...parent.pathValue, nodeValue] : [nodeValue],
      pathLabel: parent ? [...parent.pathLabel, nodeLabel] : [nodeLabel],
      _level: parent ? parent._level + 1 : 0,
      _checked: false,
      _halfChecked: false,
    };

    this._data = {
      ...newOption,
      parent: newOption.parent && newOption.parent._data,
    };

    Object.keys(newOption).forEach((key) => {
      this[key] = newOption[key];
    });
    if (children && children.length) {
      this.children = children.map((data, index) => {
        return new Node({ ...data, _index: index }, this.config, this);
      });
      this._data.children = this.children.map((node) => node._data);
    }
  };

  /**
   * 根据this.children 计算是否当前node半选状态
   * 假设半选是 0.5，全选是1，不选是0。
   * 那么只有当前节点的所有children加起来等于children.length，才是全选，否则和大于0，就是半选。
   */
  private _isHalfChecked = () => {
    const checkedLen = this.children.reduce((total, prev) => {
      const num = prev._halfChecked ? 0.5 : prev._checked ? 1 : 0;
      return total + num;
    }, 0);
    return checkedLen !== this.children.length && checkedLen > 0;
  };

  /**
   *
   * @param checked 选中状态
   * @param ignoreDisabled 是否忽略节点禁用设置选中状态，一般在初始化设置选中状态时传参为true
   */
  private _setNodeChildrenChecked = (checked: boolean, ignoreDisabled?: boolean) => {
    if (!ignoreDisabled && this.disabled) {
      return;
    }

    if (this.children && this.children.length) {
      this.children.forEach((item) => {
        if (item.disabled) {
          if (ignoreDisabled) {
            item.setCheckedStateIgnoreDisabled(checked);
          }
        } else {
          item.setCheckedState(checked);
        }
      });
      this.updateHalfState(checked);
    }
  };

  public getSelfChildrenValue = () => {
    const result = [];
    const join = (pathValue, nodes) => {
      if (!nodes || !nodes.length) {
        result.push(pathValue);
        return;
      }
      (nodes || []).forEach((node) => {
        join(node.pathValue, node.children);
      });
    };
    join(this.pathValue, this.children);
    return result;
  };

  public updateHalfState = (checked: boolean) => {
    this._halfChecked = this._isHalfChecked();
    this._checked = this._halfChecked ? false : checked;
  };

  // 直接设置选中状态
  public setCheckedProperty = (checked: boolean) => {
    this._checked = checked;
    this._halfChecked = false;
  };

  // 设置当前节点选中状态
  public setCheckedState = (checked: boolean) => {
    const noNeedToUpdate = checked ? this._checked : !this._checked && !this._halfChecked;

    if (this.disabled || noNeedToUpdate) {
      return;
    }

    this.setCheckedProperty(checked);

    // 父子节点关联
    if (!this.config.changeOnSelect) {
      this._setNodeChildrenChecked(checked);

      let parent = this.parent;
      while (parent && !parent.disabled) {
        // 当半选状态时，设置_checked为false。保证点击半选状态的节点时，执行选中操作。
        parent.updateHalfState(checked);

        parent = parent.parent;
      }
    }
  };

  // 忽略禁用设置选中状态
  public setCheckedStateIgnoreDisabled = (checked: boolean) => {
    if (checked === Boolean(this._checked)) {
      return;
    }
    this.setCheckedProperty(checked);

    if (!this.config.changeOnSelect) {
      this._setNodeChildrenChecked(checked, true);

      let parent = this.parent;
      while (parent) {
        // 当半选状态时，设置_checked为false。保证点击半选状态的节点时，执行选中操作。
        parent.updateHalfState(checked);

        parent = parent.parent;
      }
    }
  };

  /**
   * 遍历节点的parent，获取当前节点的路径节点。
   * node: { label: '1-1-1', parent: { label: '1-1', parent: { label: '1' }, ... }, ...}
   * @return [node.parent.parent, node.parent, node]
   * @memberof Store
   */
  public getPathNodes = (): Node<T>[] => {
    const nodes: Node<T>[] = [this];
    let parent = this.parent;
    while (parent) {
      nodes.unshift(parent);
      parent = parent.parent;
    }
    return nodes;
  };

  public getChildren = (): Node<T>[] => {
    return this.children;
  };

  public setLoading = (loading?: boolean) => {
    this.loading = loading;

    if (loading || loading === undefined) {
      this.loaded = false;
    }
    if (loading === false) {
      this.loaded = true;
    }
  };
}

export default Node;
