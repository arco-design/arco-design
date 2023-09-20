import { version, dependencies } from '../../package.json';
let arcoVersion = dependencies['@arco-design/web-react'] || version;
arcoVersion = arcoVersion.replace('^', '');

export default {
  joinChats: [
    {
      name: 'ArcoDesign 用户群',
      id: '6659915789467910412',
    },
    {
      name: 'ArcoDesign 设计群',
      id: '6908243256979488771',
    },
  ],
  versions: [
    { version: '1.x', link: `https://${window.arcoConfig?.internalHostName}/react/1.x/docs/start` },
    { version: arcoVersion, link: 'https://arco.design' },
  ],
  defaultVersion: version,
  loginHref: `/common/login?redirectUrl=${location.href}`,
};
