import React, { CSSProperties } from 'react';
import cs from '../_util/classNames';
import { ImageProps } from './interface';
import useShowFooter from './utils/hooks/useShowFooter';
import IconMore from '../../icon/react-icon/IconMore';
import { TriggerForToolbar } from './trigger-for-toolbar';

interface ImageFooterProps {
  style?: CSSProperties;
  className?: string | string[];
  title?: ImageProps['title'];
  description?: ImageProps['description'];
  actions?: ImageProps['actions'];
  prefixCls: string;
  simple?: boolean;
}

export const ImageFooter = (props: ImageFooterProps) => {
  const { style, className, title, description, actions, prefixCls, simple } = props;

  const [showFooter, showCaption, showActions] = useShowFooter({ title, description, actions });

  if (!showFooter) return null;

  const footerPrefixCls = `${prefixCls}-footer`;
  const classNames = cs(footerPrefixCls, className, {
    [`${footerPrefixCls}-with-actions`]: showActions,
  });

  const renderActionList = () => {
    const actionsList = (
      <div className={`${prefixCls}-actions-list`}>
        {actions.map((item, index) => {
          return (
            <div className={`${prefixCls}-actions-item`} key={`${index}`}>
              {item}
            </div>
          );
        })}
      </div>
    );
    if (simple) {
      return (
        <div className={`${prefixCls}-actions-list`}>
          <TriggerForToolbar prefixCls={prefixCls} popup={() => actionsList}>
            <div className={cs(`${prefixCls}-actions-item`, `${prefixCls}-actions-item-trigger`)}>
              <span>
                <IconMore />
              </span>
            </div>
          </TriggerForToolbar>
        </div>
      );
    }
    return actionsList;
  };

  return (
    <div className={classNames} style={style}>
      {showCaption && (
        <div className={cs(`${footerPrefixCls}-block`, `${prefixCls}-caption`)}>
          {title && (
            <div className={`${prefixCls}-caption-title`} title={title}>
              {title}
            </div>
          )}
          {description && !simple && (
            <div className={`${prefixCls}-caption-description`} title={description}>
              {description}
            </div>
          )}
        </div>
      )}
      {showActions && (
        <div className={cs(`${footerPrefixCls}-block`, `${prefixCls}-actions`)}>
          {renderActionList()}
        </div>
      )}
    </div>
  );
};
