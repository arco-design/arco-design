import isEqualWith from 'lodash/isEqualWith';
import { valueInSet, transformValuesToSet } from '../util';
import { isArray, isFunction, isString } from '../../_util/is';
import { FieldNamesType, CascaderProps } from '../interface';
import Node, { NodeProps } from './node';

export type ConfigType<T> = {
  // 是否关联父子节点
  changeOnSelect?: boolean;
  // 是否是懒加载模式
  lazyload?: boolean;
  // 是否在children为[]时，渲染下一级菜单。
  showEmptyChildren?: boolean;
  // 自定义搜索逻辑
  filterOption?: CascaderProps<T>['filterOption'];
  // fieldNames
  fieldNames?: FieldNamesType;
  // 回显父节点
  showParent?: boolean;
};

class Store<T> {
  private nodes: Node<T>[] = [];

  private flatNodes: Node<T>[] = [];

  private config: ConfigType<T> = {};

  constructor(options: T[], value?: string[][], config?: ConfigType<T>) {
    this.config = { ...config };

    const values = Array.isArray(value) ? value : [];

    this.nodes = this._calcNodes(options, null);

    // 根据nodes获取选中值
    this._updateFlatNodes();

    this.setNodeCheckedByValue(values);
  }

  // 初始化节点状态，附加状态信息字段： _checked,_halfChecked,parent,disabled
  private _calcNodes = (options: T[], parent: Node<T>): Node<T>[] => {
    if (!options) {
      return [];
    }
    return options.map((option, index) => {
      return new Node({ ...option, _index: index }, this.config, parent);
    });
  };

  // this.flatNodes 保存所有可能的选中项
  private _updateFlatNodes = () => {
    const leafOnly = !this.config.changeOnSelect;
    this.flatNodes = [];

    const traversal = (option: Node<T>) => {
      if (!option) return;
      if (!leafOnly || option.isLeaf) {
        this.flatNodes.push(option);
      }
      if (isArray(option.children)) {
        (option.children as Node<T>[]).forEach((x) => {
          traversal(x);
        });
      }
    };

    this.nodes.forEach((node) => {
      traversal(node);
    });
  };

  /**
   * values: 全部的选中值
   * 根据values更新节点状态。不包含在values的节点都设置为未选中状态
   * @memberof Store
   */
  public setNodeCheckedByValue = (initValues: string[][]) => {
    const valuesSet = transformValuesToSet(initValues);

    // 根据value设置节点初始选中状态
    this.flatNodes.forEach((node) => {
      let checked = false;
      if (this.config.showParent) {
        if (
          node.pathValue.some((_, index, arr) => valueInSet(valuesSet, arr.slice(0, index + 1)))
        ) {
          checked = true;
        }
      } else if (valueInSet(valuesSet, node.pathValue)) {
        checked = true;
      }
      node.setCheckedStateIgnoreDisabled(checked);
    });
  };

  /**
   * 为当前节点插入子节点。动态加载时候用到
   */
  public appendOptionChildren = (node: Node<T>, children: T[]) => {
    if (children && node) {
      // const checked = node._checked;
      // node.setCheckedProperty(false);
      const options = this._calcNodes(children, node);
      node.children = options;

      this._updateFlatNodes();
      if (this.config.changeOnSelect) {
        // node.setCheckedProperty(checked);
      } else {
        node.setCheckedState(false);
      }
    }
  };

  /**
   * 通过 value 查找对应的node节点。
   * value: 是路径节点的value组成的数组
   */
  public findNodeByValue = (value: string[]): Node<T> | null => {
    let targetNode: Node<T> = null;
    if (!value || !value.length) {
      return targetNode;
    }

    this.flatNodes.some((node) => {
      if (isEqualWith(node.pathValue, value)) {
        targetNode = node;
      }
    });
    return targetNode;
  };

  /**
   * 搜索所有label含有关键字的节点
   */
  public searchNodeByLabel = (inputStr?: string): Node<T>[] => {
    if (!inputStr) {
      return this.flatNodes;
    }
    const { filterOption } = this.config;
    const filterMethod = isFunction(filterOption)
      ? filterOption
      : (inputValue: string, node: NodeProps<T>) => {
          return isString(node.label) && node.label.indexOf(inputValue) > -1;
        };

    return this.flatNodes.filter((item) => {
      const pathNodes = item.getPathNodes();
      return pathNodes.some((node) => {
        return filterMethod(inputStr, node._data);
      });
    });
  };

  /** 获取所有节点 */
  public getOptions = (): Node<T>[] => {
    return this.nodes;
  };

  /** 获取所有选中状态的节点。 aggregation: 是否聚合节点 */
  public getCheckedNodes = (): Node<T>[] => {
    if (this.config.showParent) {
      return this.getCheckedParentNodes();
    }
    return this.flatNodes.filter((node) => {
      return node._checked;
    });
  };

  // 按照父节点纬度聚合当前所有选中节点。
  public getCheckedParentNodes = (): Node<T>[] => {
    const result: Set<Node<T>> = new Set();
    this.flatNodes.forEach((node) => {
      if (node._checked) {
        const pathnodes = node.getPathNodes();
        pathnodes.some((node) => {
          if (node._checked) {
            if (!result.has(node)) {
              result.add(node);
            }
            return true;
          }
        });
      }
    });
    return Array.from(result);
  };
}

export default Store;
