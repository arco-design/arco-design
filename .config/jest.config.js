// Custom Jest config

const BASE_JEST_CONFIG = {
  // Find component demos' dependencies from /site/node_modules
  modulePaths: ['<rootDir>/site/node_modules'],
  moduleNameMapper: {
    '^@arco-design/web-react/(.+)$': '<rootDir>/$1',
    '^@arco-design/web-react$': '<rootDir>',
  },
};

exports.node = (config) => {
  Object.assign(config, BASE_JEST_CONFIG);
};

exports.client = (config) => {
  Object.assign(config, BASE_JEST_CONFIG);

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
};
