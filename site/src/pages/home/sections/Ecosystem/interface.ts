import { ReactNode } from 'react';

export interface EcosystemItem {
  name: string; // 平台名
  alias?: string; // 别名
  slogan?: string; // 宣言
  desc?: string; // 描述
  logo: ReactNode; // logo
  logoPlaceholder?: ReactNode; // 占位 logo
  image?: string; // 截图
  href?: string; // 链接
}

export interface TabItem extends EcosystemItem {
  logoInActive: ReactNode;
  content: ReactNode;
  headerLess?: boolean;
}
