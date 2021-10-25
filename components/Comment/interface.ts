import { CSSProperties, ReactNode } from 'react';

/**
 * @title Comment
 */
export interface CommentProps {
  style?: CSSProperties;
  className?: string | string[];
  /**
   * @zh 操作列表
   * @en List of action items rendered below the comment content
   */
  actions?: ReactNode;
  /**
   * @zh 作者名
   * @en Display as the comment author
   */
  author?: ReactNode;
  /**
   * @zh 头像
   * @en Display as the comment avatar
   */
  avatar?: ReactNode;
  /**
   * @zh 评论内容
   * @en The content of the comment
   */
  content?: ReactNode;
  /**
   * @zh 时间描述
   * @en Display as the comment datetime
   */
  datetime?: ReactNode;
  /**
   * @zh 靠左/靠右 展示 datetime 和 actions
   * @en Alignment of `datetime` and `actions`|`"left" \| "right" \| { datetime?: "left" \| "right"; actions?: "left" \| "right"; }`
   */
  align?:
    | 'left'
    | 'right'
    | {
        datetime?: 'left' | 'right';
        actions?: 'left' | 'right';
      };
}
