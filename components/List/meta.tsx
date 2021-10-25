import React, { useContext } from 'react';
import cs from '../_util/classNames';
import { ConfigContext } from '../ConfigProvider';
import { ListItemMetaProps } from './interface';

function Meta(props: ListItemMetaProps, ref) {
  const { getPrefixCls } = useContext(ConfigContext);
  const { className, avatar, title, description, ...others } = props;
  const prefixCls = getPrefixCls('list');
  const baseClassName = `${prefixCls}-item-meta`;
  const hasAvatar = !!avatar;
  const hasContent = !!(title || description);

  return (
    <div ref={ref} {...others} className={cs(baseClassName, className)}>
      {hasAvatar && <div className={`${baseClassName}-avatar`}>{avatar}</div>}
      {hasContent && (
        <div className={`${baseClassName}-content`}>
          {title && <div className={`${baseClassName}-title`}>{title}</div>}
          {description && <div className={`${baseClassName}-description`}>{description}</div>}
        </div>
      )}
    </div>
  );
}

const MetaComponent = React.forwardRef<HTMLDivElement, ListItemMetaProps>(Meta);

MetaComponent.displayName = 'ListItemMeta';

export default MetaComponent;
