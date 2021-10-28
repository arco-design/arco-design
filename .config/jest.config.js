// 自定义 Jest 配置
exports.node = (config) => {
  config.moduleNameMapper = {
    '^@arco-design/web-react/(.+)$': '<rootDir>/$1',
    '^@arco-design/web-react$': '<rootDir>',
  };
};
exports.client = (config) => {
  config.collectCoverageFrom = [
    'components/**/*.{ts,tsx}',
    '!components/**/style/*',
    '!components/**/api/*',
  ];
  config.coveragePathIgnorePatterns = [
    '/node_modules/',
    '/lib/',
    '/es/',
    '/dist/',
    '/icon/',
    '/components/index.tsx',
    '/components/locale/',
  ];
  config.moduleNameMapper = {
    '^@arco-design/web-react/(.+)$': '<rootDir>/$1',
    '^@arco-design/web-react$': '<rootDir>',
  };
  config.transform['^.+\\.tsx?$'] = '@swc-node/jest';
};
