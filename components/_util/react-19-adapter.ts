//  react 19 的 index.js 不会再导出 createRoot，必须从 react-dom/client 导入 createRoot
// @ts-ignore-next-line
import { createRoot } from 'react-dom/client';
import { setCreateRoot } from './react-dom';

setCreateRoot(createRoot);
