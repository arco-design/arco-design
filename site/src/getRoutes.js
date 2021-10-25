import routes from './r';
import lazyLoad from './utils/lazyload';
import { toPascalCase } from './utils/case';

function isArray(obj) {
  return Object.prototype.toString.call(obj) === '[object Array]';
}

function getRoutes(lang = 'zh', t) {
  const suffix = lang === 'zh-CN' ? '.zh-CN' : '.en-US';

  const newRoutes = [];

  routes.forEach((route, i) => {
    newRoutes[i] = {};
    newRoutes[i].key = route.name;
    newRoutes[i].name = t[`routes.${route.name}`];
    newRoutes[i].module = route.module;
    newRoutes[i].children = [];
    if (route.children) {
      route.children.forEach((rc, ii) => {
        if (typeof rc === 'string') {
          const importComponent = import(
            route.map && route.map[rc] ? `${route.map[rc]}` : `${route.dir}/${rc}${suffix}.md`
          );
          newRoutes[i].children[ii] = {
            name: t[`routes.${rc}`],
            path: `${route.type}/${rc}`,
            component: lazyLoad(() => importComponent),
          };
        } else {
          if (!newRoutes[i].children[ii]) {
            newRoutes[i].children[ii] = {};
          }
          newRoutes[i].children[ii].key = rc.name;
          newRoutes[i].children[ii].name = t[`routes.${rc.name}`];
          if (isArray(rc.items)) {
            rc.items.forEach((rci, iii) => {
              if (typeof rci === 'string') {
                const componentPath =
                  rc.map && rc.map[rci]
                    ? rc.map[rci]
                    : `${rc.dir}/${
                        route.type === 'components' ? `${toPascalCase(rci)}/README` : rci
                      }${suffix}.md`;

                if (!newRoutes[i].children[ii].items) {
                  newRoutes[i].children[ii].items = [];
                }
                newRoutes[i].children[ii].items[iii] = {
                  name: t[`routes.${rci}`],
                  path: `${route.type}/${rci}`,
                  component: lazyLoad(() => import(componentPath)),
                };
              }
            });
          }
        }
      });
    }
  });

  return newRoutes;
}

export default getRoutes;
