'use strict';

const path = require('path');
const fs = require('fs');
const { execSync } = require('child_process');

const components = fs
  .readdirSync(path.resolve(__dirname, '../components'), { withFileTypes: true })
  .filter((dirent) => dirent.isDirectory())
  .map((dirent) => dirent.name.replace(/^_/, ''));

// precomputed scope
const scopeComplete = execSync('git status --porcelain || true')
  .toString()
  .trim()
  .split('\n')
  .find((r) => ~r.indexOf('M  '))
  ?.replace(/(\/)/g, '%%')
  ?.match(/components%%((\w|-)*)/)?.[1]
  ?.replace(/^_/g, '');

// eslint-disable-next-line tsdoc/syntax
/** @type {import('cz-git').CommitizenGitOptions} */
module.exports = {
  scopes: ['site', 'story', 'script', 'config', ...components],
  customScopesAlign: !scopeComplete ? 'top' : 'bottom',
  defaultScope: scopeComplete,
  maxHeaderLength: 100,
  allowEmptyIssuePrefixs: false,
  allowCustomIssuePrefixs: false,
};
