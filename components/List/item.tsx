import React, { useContext } from 'react';
import Meta from './meta';
import { ConfigContext } from '../ConfigProvider';
import cs from '../_util/classNames';
import useMergeProps from '../_util/hooks/useMergeProps';
import { ListItemProps } from './interface';

const defaultProps: Partial<ListItemProps> = {
  actionLayout: 'horizontal',
};

function Item(baseProps: ListItemProps, ref) {
  const { getPrefixCls, componentConfig } = useContext(ConfigContext);
  const props = useMergeProps<ListItemProps>(
    baseProps,
    defaultProps,
    componentConfig && componentConfig['List.Item']
  );
  const { children, className, actions, extra, actionLayout, ...rest } = props;

  const prefixCls = getPrefixCls('list');
  const baseClassName = `${prefixCls}-item`;
  const metaContent: React.ReactElement[] = [];
  const mainContent: React.ReactElement[] = [];

  React.Children.forEach(children, (element: React.ReactElement) => {
    if (element && element.type && element.type === Meta) {
      metaContent.push(element);
    } else {
      mainContent.push(element);
    }
  });

  const content = mainContent.length ? (
    <div className={`${baseClassName}-content`}>{mainContent}</div>
  ) : null;

  const extraContent = extra ? (
    <div className={`${baseClassName}-extra-content`}>{extra}</div>
  ) : null;

  const actionsContent =
    actions && actions.length ? (
      <div className={`${baseClassName}-action`}>
        {actions.map((action, i) => (
          <li key={`${baseClassName}-action-${i}`}>{action}</li>
        ))}
      </div>
    ) : null;

  return (
    <div role="listitem" ref={ref} className={cs(baseClassName, className)} {...rest}>
      <div className={`${baseClassName}-main`}>
        {metaContent}
        {content}
        {actionLayout === 'vertical' ? actionsContent : null}
      </div>
      {actionLayout === 'horizontal' ? actionsContent : null}
      {extraContent}
    </div>
  );
}

const ForwardRefItem = React.forwardRef<HTMLDivElement, ListItemProps>(Item);

const ItemComponent = ForwardRefItem as typeof ForwardRefItem & {
  Meta: typeof Meta;
};

ItemComponent.displayName = 'ListItem';

ItemComponent.Meta = Meta;

export default ItemComponent;
