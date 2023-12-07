import lazyLoad from './utils/lazyload';

const DarkMode = lazyLoad(() => import('./pages/dark'));
const Palette = lazyLoad(() => import('./pages/palette'));
const Version = lazyLoad(() => import('./pages/changelog/v2'));
const Icon = lazyLoad(() => import('./pages/icon'));
const OverView = lazyLoad(() => import('./pages/overview'));
const Token = lazyLoad(() => import('./pages/token'));

export default function getRoutes(lang = 'zh', t) {
  const suffix = lang === 'zh-CN' ? '.zh-CN' : '.en-US';

  return [
    {
      name: t['routes.development-guide'],
      key: 'guide',
      module: 'react',
      children: [
        {
          name: t['routes.start'],
          path: 'docs/start',
          component: lazyLoad(() => import(`../docs/start${suffix}.md`)),
        },
        {
          name: t['routes.dark'],
          path: 'docs/dark',
          component: DarkMode,
        },
        {
          name: t['routes.palette'],
          path: 'docs/palette',
          component: Palette,
        },
        {
          name: t['routes.token'],
          path: 'docs/token',
          component: Token,
        },
        {
          name: t['routes.i18n'],
          path: 'docs/i18n',
          component: lazyLoad(() => import(`../docs/i18n${suffix}.md`)),
        },
        {
          name: t['routes.theme'],
          path: 'docs/theme',
          component: lazyLoad(() => import(`../docs/theme${suffix}.md`)),
        },
        {
          name: t['routes.question'],
          path: 'docs/question',
          component: lazyLoad(() => import(`../docs/question${suffix}.md`)),
        },
        {
          name: t['routes.changelog'],
          path: 'docs/changelog',
          component: Version,
        },
        {
          name: t['routes.migrate_to_v2'],
          path: 'docs/migrate_to_v2',
          component: lazyLoad(() => import(`../docs/migrate_to_v2${suffix}.md`)),
          hide: true,
        },
        {
          name: t['routes.overview'],
          path: 'docs/overview',
          component: OverView,
        },
      ],
    },
    {
      name: t['routes.components'],
      key: 'components',
      module: 'react',
      children: [
        {
          name: t['routes.general'],
          key: 'general',
          items: [
            {
              name: t['routes.button'],
              path: 'components/button',
              component: lazyLoad(() => import(`../../components/Button/README${suffix}.md`)),
            },
            {
              name: t['routes.icon'],
              path: 'components/icon',
              component: Icon,
            },
            {
              name: t['routes.link'],
              path: 'components/link',
              component: lazyLoad(() => import(`../../components/Link/README${suffix}.md`)),
            },
            {
              name: t['routes.typography'],
              path: 'components/typography',
              component: lazyLoad(() => import(`../../components/Typography/README${suffix}.md`)),
            },
          ],
        },
        {
          name: t['routes._layout'],
          key: 'layout',
          items: [
            {
              name: t['routes.divider'],
              path: 'components/divider',
              component: lazyLoad(() => import(`../../components/Divider/README${suffix}.md`)),
            },
            {
              name: t['routes.grid'],
              path: 'components/grid',
              component: lazyLoad(() => import(`../../components/Grid/README${suffix}.md`)),
            },
            {
              name: t['routes.layout'],
              path: 'components/layout',
              component: lazyLoad(() => import(`../../components/Layout/README${suffix}.md`)),
            },
            {
              name: t['routes.space'],
              path: 'components/space',
              component: lazyLoad(() => import(`../../components/Space/README${suffix}.md`)),
            },
          ],
        },
        {
          name: t['routes.data-show'],
          key: 'data-show',
          items: [
            {
              name: t['routes.avatar'],
              path: 'components/avatar',
              component: lazyLoad(() => import(`../../components/Avatar/README${suffix}.md`)),
            },
            {
              name: t['routes.badge'],
              path: 'components/badge',
              component: lazyLoad(() => import(`../../components/Badge/README${suffix}.md`)),
            },
            {
              name: t['routes.calendar'],
              path: 'components/calendar',
              component: lazyLoad(() => import(`../../components/Calendar/README${suffix}.md`)),
            },
            {
              name: t['routes.card'],
              path: 'components/card',
              component: lazyLoad(() => import(`../../components/Card/README${suffix}.md`)),
            },
            {
              name: t['routes.carousel'],
              path: 'components/carousel',
              component: lazyLoad(() => import(`../../components/Carousel/README${suffix}.md`)),
            },
            {
              name: t['routes.collapse'],
              path: 'components/collapse',
              component: lazyLoad(() => import(`../../components/Collapse/README${suffix}.md`)),
            },
            {
              name: t['routes.comment'],
              path: 'components/comment',
              component: lazyLoad(() => import(`../../components/Comment/README${suffix}.md`)),
            },
            {
              name: t['routes.descriptions'],
              path: 'components/descriptions',
              component: lazyLoad(() => import(`../../components/Descriptions/README${suffix}.md`)),
            },
            {
              name: t['routes.empty'],
              path: 'components/empty',
              component: lazyLoad(() => import(`../../components/Empty/README${suffix}.md`)),
            },
            {
              name: t['routes.image'],
              path: 'components/image',
              component: lazyLoad(() => import(`../../components/Image/README${suffix}.md`)),
            },
            {
              name: t['routes.list'],
              path: 'components/list',
              component: lazyLoad(() => import(`../../components/List/README${suffix}.md`)),
            },
            {
              name: t['routes.popover'],
              path: 'components/popover',
              component: lazyLoad(() => import(`../../components/Popover/README${suffix}.md`)),
            },
            {
              name: t['routes.statistic'],
              path: 'components/statistic',
              component: lazyLoad(() => import(`../../components/Statistic/README${suffix}.md`)),
            },
            {
              name: t['routes.table'],
              path: 'components/table',
              component: lazyLoad(() => import(`../../components/Table/README${suffix}.md`)),
            },
            {
              name: t['routes.tabs'],
              path: 'components/tabs',
              component: lazyLoad(() => import(`../../components/Tabs/README${suffix}.md`)),
            },
            {
              name: t['routes.tag'],
              path: 'components/tag',
              component: lazyLoad(() => import(`../../components/Tag/README${suffix}.md`)),
            },
            {
              name: t['routes.timeline'],
              path: 'components/timeline',
              component: lazyLoad(() => import(`../../components/Timeline/README${suffix}.md`)),
            },
            {
              name: t['routes.tooltip'],
              path: 'components/tooltip',
              component: lazyLoad(() => import(`../../components/Tooltip/README${suffix}.md`)),
            },
            {
              name: t['routes.tree'],
              path: 'components/tree',
              component: lazyLoad(() => import(`../../components/Tree/README${suffix}.md`)),
            },
          ],
        },
        {
          name: t['routes.data-input'],
          key: 'data-input',
          items: [
            {
              name: t['routes.auto-complete'],
              path: 'components/auto-complete',
              component: lazyLoad(() => import(`../../components/AutoComplete/README${suffix}.md`)),
            },
            {
              name: t['routes.cascader'],
              path: 'components/cascader',
              component: lazyLoad(() => import(`../../components/Cascader/README${suffix}.md`)),
            },
            {
              name: t['routes.checkbox'],
              path: 'components/checkbox',
              component: lazyLoad(() => import(`../../components/Checkbox/README${suffix}.md`)),
            },
            {
              name: t['routes.color-picker'],
              path: 'components/color-picker',
              component: lazyLoad(() => import(`../../components/ColorPicker/README${suffix}.md`)),
              new: true,
            },
            {
              name: t['routes.date-picker'],
              path: 'components/date-picker',
              component: lazyLoad(() => import(`../../components/DatePicker/README${suffix}.md`)),
            },
            {
              name: t['routes.form'],
              path: 'components/form',
              component: lazyLoad(() => import(`../../components/Form/README${suffix}.md`)),
            },
            {
              name: t['routes.input'],
              path: 'components/input',
              component: lazyLoad(() => import(`../../components/Input/README${suffix}.md`)),
            },
            {
              name: t['routes.input-tag'],
              path: 'components/input-tag',
              component: lazyLoad(() => import(`../../components/InputTag/README${suffix}.md`)),
            },
            {
              name: t['routes.input-number'],
              path: 'components/input-number',
              component: lazyLoad(() => import(`../../components/InputNumber/README${suffix}.md`)),
            },
            {
              name: t['routes.verification-code'],
              path: 'components/verification-code',
              component: lazyLoad(() =>
                import(`../../components/VerificationCode/README${suffix}.md`)
              ),
              new: true,
            },
            {
              name: t['routes.mentions'],
              path: 'components/mentions',
              component: lazyLoad(() => import(`../../components/Mentions/README${suffix}.md`)),
            },
            {
              name: t['routes.radio'],
              path: 'components/radio',
              component: lazyLoad(() => import(`../../components/Radio/README${suffix}.md`)),
            },
            {
              name: t['routes.rate'],
              path: 'components/rate',
              component: lazyLoad(() => import(`../../components/Rate/README${suffix}.md`)),
            },
            {
              name: t['routes.select'],
              path: 'components/select',
              component: lazyLoad(() => import(`../../components/Select/README${suffix}.md`)),
            },
            {
              name: t['routes.slider'],
              path: 'components/slider',
              component: lazyLoad(() => import(`../../components/Slider/README${suffix}.md`)),
            },
            {
              name: t['routes.switch'],
              path: 'components/switch',
              component: lazyLoad(() => import(`../../components/Switch/README${suffix}.md`)),
            },
            {
              name: t['routes.time-picker'],
              path: 'components/time-picker',
              component: lazyLoad(() => import(`../../components/TimePicker/README${suffix}.md`)),
            },
            {
              name: t['routes.transfer'],
              path: 'components/transfer',
              component: lazyLoad(() => import(`../../components/Transfer/README${suffix}.md`)),
            },
            {
              name: t['routes.tree-select'],
              path: 'components/tree-select',
              component: lazyLoad(() => import(`../../components/TreeSelect/README${suffix}.md`)),
            },
            {
              name: t['routes.upload'],
              path: 'components/upload',
              component: lazyLoad(() => import(`../../components/Upload/README${suffix}.md`)),
            },
          ],
        },
        {
          name: t['routes.feedback'],
          key: 'feedback',
          items: [
            {
              name: t['routes.alert'],
              path: 'components/alert',
              component: lazyLoad(() => import(`../../components/Alert/README${suffix}.md`)),
            },
            {
              name: t['routes.drawer'],
              path: 'components/drawer',
              component: lazyLoad(() => import(`../../components/Drawer/README${suffix}.md`)),
            },
            {
              name: t['routes.message'],
              path: 'components/message',
              component: lazyLoad(() => import(`../../components/Message/README${suffix}.md`)),
            },
            {
              name: t['routes.modal'],
              path: 'components/modal',
              component: lazyLoad(() => import(`../../components/Modal/README${suffix}.md`)),
            },
            {
              name: t['routes.notification'],
              path: 'components/notification',
              component: lazyLoad(() => import(`../../components/Notification/README${suffix}.md`)),
            },
            {
              name: t['routes.popconfirm'],
              path: 'components/popconfirm',
              component: lazyLoad(() => import(`../../components/Popconfirm/README${suffix}.md`)),
            },
            {
              name: t['routes.progress'],
              path: 'components/progress',
              component: lazyLoad(() => import(`../../components/Progress/README${suffix}.md`)),
            },
            {
              name: t['routes.result'],
              path: 'components/result',
              component: lazyLoad(() => import(`../../components/Result/README${suffix}.md`)),
            },
            {
              name: t['routes.spin'],
              path: 'components/spin',
              component: lazyLoad(() => import(`../../components/Spin/README${suffix}.md`)),
            },
            {
              name: t['routes.skeleton'],
              path: 'components/skeleton',
              component: lazyLoad(() => import(`../../components/Skeleton/README${suffix}.md`)),
            },
            {
              name: t['routes.watermark'],
              path: 'components/watermark',
              component: lazyLoad(() => import(`../../components/Watermark/README${suffix}.md`)),
              new: true,
            },
          ],
        },
        {
          name: t['routes.nav'],
          key: 'nav',
          items: [
            {
              name: t['routes.breadcrumb'],
              path: 'components/breadcrumb',
              component: lazyLoad(() => import(`../../components/Breadcrumb/README${suffix}.md`)),
            },
            {
              name: t['routes.dropdown'],
              path: 'components/dropdown',
              component: lazyLoad(() => import(`../../components/Dropdown/README${suffix}.md`)),
            },
            {
              name: t['routes.menu'],
              path: 'components/menu',
              component: lazyLoad(() => import(`../../components/Menu/README${suffix}.md`)),
            },
            {
              name: t['routes.page-header'],
              path: 'components/page-header',
              component: lazyLoad(() => import(`../../components/PageHeader/README${suffix}.md`)),
            },
            {
              name: t['routes.pagination'],
              path: 'components/pagination',
              component: lazyLoad(() => import(`../../components/Pagination/README${suffix}.md`)),
            },
            {
              name: t['routes.steps'],
              path: 'components/steps',
              component: lazyLoad(() => import(`../../components/Steps/README${suffix}.md`)),
            },
          ],
        },
        {
          name: t['routes.other'],
          key: 'other',
          items: [
            {
              name: t['routes.affix'],
              path: 'components/affix',
              component: lazyLoad(() => import(`../../components/Affix/README${suffix}.md`)),
            },
            {
              name: t['routes.anchor'],
              path: 'components/anchor',
              component: lazyLoad(() => import(`../../components/Anchor/README${suffix}.md`)),
            },
            {
              name: t['routes.config-provider'],
              path: 'components/config-provider',
              component: lazyLoad(() =>
                import(`../../components/ConfigProvider/README${suffix}.md`)
              ),
            },
            {
              name: t['routes.back-top'],
              path: 'components/back-top',
              component: lazyLoad(() => import(`../../components/BackTop/README${suffix}.md`)),
            },
            {
              name: t['routes.resize-box'],
              path: 'components/resize-box',
              component: lazyLoad(() => import(`../../components/ResizeBox/README${suffix}.md`)),
            },
            {
              name: t['routes.trigger'],
              path: 'components/trigger',
              component: lazyLoad(() => import(`../../components/Trigger/README${suffix}.md`)),
            },
          ],
        },
      ],
    },
    {
      name: t['routes.hooks'],
      key: 'hooks',
      module: 'react',
      hide: true,
      children: [
        {
          name: 'useVerificationCode',
          path: 'hooks/useVerificationCode',
          component: lazyLoad(() =>
            import(`../../components/_hooks/useVerificationCode/README${suffix}.md`)
          ),
        },
        {
          name: 'useWatermark',
          path: 'hooks/useWatermark',
          component: lazyLoad(() =>
            import(`../../components/_hooks/useWatermark/README${suffix}.md`)
          ),
        },
      ],
    },
    {
      name: t['routes.design-language'],
      key: 'design-language',
      module: 'docs',
      children: [
        {
          name: t['routes.introduce'],
          path: 'spec/introduce',
          component: lazyLoad(() => import(`../docs_spec/introduce${suffix}.md`)),
        },
        {
          name: t['routes.design-values'],
          path: 'spec/values-of-arcodesign',
          component: lazyLoad(() => import(`../docs_spec/values-of-arcodesign${suffix}.md`)),
        },
        {
          name: t['routes.design-philosophy'],
          path: 'spec/philosophy',
          component: lazyLoad(() => import(`../docs_spec/philosophy${suffix}.md`)),
        },
        {
          name: t['routes.style-guideline'],
          path: 'spec/style-guideline',
          component: lazyLoad(() => import(`../docs_spec/style-guideline${suffix}.md`)),
        },
      ],
    },
    {
      name: t['routes.component-usage'],
      key: 'component-usage',
      module: 'docs',
      children: [
        {
          name: t['routes.general'],
          key: 'general',
          items: [
            {
              name: t['routes.link'],
              path: 'spec/link',
              component: lazyLoad(() => import(`../docs_spec/components/link${suffix}.md`)),
            },
            {
              name: t['routes.typography'],
              path: 'spec/typography',
              component: lazyLoad(() => import(`../docs_spec/components/typography${suffix}.md`)),
            },
          ],
        },
        {
          name: t['routes._layout'],
          key: 'layout',
          items: [
            {
              name: t['routes.grid'],
              path: 'spec/grid',
              component: lazyLoad(() => import(`../docs_spec/components/grid${suffix}.md`)),
            },
            {
              name: t['routes.layout'],
              path: 'spec/layout',
              component: lazyLoad(() => import(`../docs_spec/components/layout${suffix}.md`)),
            },
            {
              name: t['routes.space'],
              path: 'spec/space',
              component: lazyLoad(() => import(`../docs_spec/components/space${suffix}.md`)),
            },
          ],
        },
        {
          name: t['routes.data-show'],
          key: 'data-show',
          items: [
            {
              name: t['routes.avatar'],
              path: 'spec/avatar',
              component: lazyLoad(() => import(`../docs_spec/components/avatar${suffix}.md`)),
            },
            {
              name: t['routes.badge'],
              path: 'spec/badge',
              component: lazyLoad(() => import(`../docs_spec/components/badge${suffix}.md`)),
            },
            {
              name: t['routes.comment'],
              path: 'spec/comment',
              component: lazyLoad(() => import(`../docs_spec/components/comment${suffix}.md`)),
            },
            {
              name: t['routes.descriptions'],
              path: 'spec/descriptions',
              component: lazyLoad(() => import(`../docs_spec/components/descriptions${suffix}.md`)),
            },
            {
              name: t['routes.empty'],
              path: 'spec/empty',
              component: lazyLoad(() => import(`../docs_spec/components/empty${suffix}.md`)),
            },
            {
              name: t['routes.list'],
              path: 'spec/list',
              component: lazyLoad(() => import(`../docs_spec/components/list${suffix}.md`)),
            },
            {
              name: t['routes.popover'],
              path: 'spec/popover',
              component: lazyLoad(() => import(`../docs_spec/components/popover${suffix}.md`)),
            },
            {
              name: t['routes.table'],
              path: 'spec/table',
              component: lazyLoad(() => import(`../docs_spec/components/table${suffix}.md`)),
            },
            {
              name: t['routes.tabs'],
              path: 'spec/tabs',
              component: lazyLoad(() => import(`../docs_spec/components/tabs${suffix}.md`)),
            },
            {
              name: t['routes.tooltip'],
              path: 'spec/tooltip',
              component: lazyLoad(() => import(`../docs_spec/components/tooltip${suffix}.md`)),
            },
          ],
        },
        {
          name: t['routes.data-input'],
          key: 'data-input',
          items: [
            {
              name: t['routes.cascader'],
              path: 'spec/cascader',
              component: lazyLoad(() => import(`../docs_spec/components/cascader${suffix}.md`)),
            },
            {
              name: t['routes.checkbox'],
              path: 'spec/checkbox',
              component: lazyLoad(() => import(`../docs_spec/components/checkbox${suffix}.md`)),
            },
            {
              name: t['routes.input'],
              path: 'spec/input',
              component: lazyLoad(() => import(`../docs_spec/components/input${suffix}.md`)),
            },
            {
              name: t['routes.radio'],
              path: 'spec/radio',
              component: lazyLoad(() => import(`../docs_spec/components/radio${suffix}.md`)),
            },
            {
              name: t['routes.select'],
              path: 'spec/select',
              component: lazyLoad(() => import(`../docs_spec/components/select${suffix}.md`)),
            },
            {
              name: t['routes.transfer'],
              path: 'spec/transfer',
              component: lazyLoad(() => import(`../docs_spec/components/transfer${suffix}.md`)),
            },
            {
              name: t['routes.upload'],
              path: 'spec/upload',
              component: lazyLoad(() => import(`../docs_spec/components/upload${suffix}.md`)),
            },
          ],
        },
        {
          name: t['routes.feedback'],
          key: 'feedback',
          items: [
            {
              name: t['routes.alert'],
              path: 'spec/alert',
              component: lazyLoad(() => import(`../docs_spec/components/alert${suffix}.md`)),
            },
            {
              name: t['routes.drawer'],
              path: 'spec/drawer',
              component: lazyLoad(() => import(`../docs_spec/components/drawer${suffix}.md`)),
            },
            {
              name: t['routes.message'],
              path: 'spec/message',
              component: lazyLoad(() => import(`../docs_spec/components/message${suffix}.md`)),
            },
            {
              name: t['routes.modal'],
              path: 'spec/modal',
              component: lazyLoad(() => import(`../docs_spec/components/modal${suffix}.md`)),
            },
            {
              name: t['routes.notification'],
              path: 'spec/notification',
              component: lazyLoad(() => import(`../docs_spec/components/notification${suffix}.md`)),
            },
            {
              name: t['routes.popconfirm'],
              path: 'spec/popconfirm',
              component: lazyLoad(() => import(`../docs_spec/components/popconfirm${suffix}.md`)),
            },
            {
              name: t['routes.progress'],
              path: 'spec/progress',
              component: lazyLoad(() => import(`../docs_spec/components/progress${suffix}.md`)),
            },
            {
              name: t['routes.skeleton'],
              path: 'spec/skeleton',
              component: lazyLoad(() => import(`../docs_spec/components/skeleton${suffix}.md`)),
            },
          ],
        },
        {
          name: t['routes.nav'],
          key: 'nav',
          items: [
            {
              name: t['routes.breadcrumb'],
              path: 'spec/breadcrumb',
              component: lazyLoad(() => import(`../docs_spec/components/breadcrumb${suffix}.md`)),
            },
            {
              name: t['routes.dropdown'],
              path: 'spec/dropdown',
              component: lazyLoad(() => import(`../docs_spec/components/dropdown${suffix}.md`)),
            },
            {
              name: t['routes.menu'],
              path: 'spec/menu',
              component: lazyLoad(() => import(`../docs_spec/components/menu${suffix}.md`)),
            },
          ],
        },
        {
          name: t['routes.other'],
          key: 'other',
          items: [
            {
              name: t['routes.config-provider'],
              path: 'spec/config-provider',
              component: lazyLoad(() =>
                import(`../docs_spec/components/config-provider${suffix}.md`)
              ),
            },
          ],
        },
      ],
    },
    {
      name: t['routes.designlab'],
      key: 'designlab',
      module: 'docs',
      children: [
        {
          name: t['routes.designlab-guideline'],
          path: 'designlab/guideline',
          component: lazyLoad(() => import(`../docs/designlab/guideline${suffix}.md`)),
        },
        {
          name: t['routes.partial-dark'],
          path: 'designlab/partial-dark',
          component: lazyLoad(() => import(`../docs/designlab/partial-dark${suffix}.md`)),
        },
        {
          name: t['routes.use-theme-package'],
          path: 'designlab/use-theme-package',
          component: lazyLoad(() => import(`../docs/designlab/use-theme-package${suffix}.md`)),
        },
        {
          name: t['routes.use-config-provider'],
          path: 'designlab/use-config-provider',
          component: lazyLoad(() => import(`../docs/designlab/use-config-provider${suffix}.md`)),
        },
      ],
    },
    {
      name: t['routes.arco-pro'],
      key: 'arco-pro',
      module: 'docs',
      children: [
        {
          name: t['routes.start'],
          path: 'pro/start',
          component: lazyLoad(() => import(`../docs/pro/start${suffix}.md`)),
        },
        {
          name: t['routes.directory'],
          path: 'pro/directory',
          component: lazyLoad(() => import(`../docs/pro/directory${suffix}.md`)),
        },
        {
          name: t['routes.routes-and-menu'],
          path: 'pro/routes-and-menu',
          component: lazyLoad(() => import(`../docs/pro/routes-and-menu${suffix}.md`)),
        },
        {
          name: t['routes.i18n'],
          path: 'pro/i18n',
          component: lazyLoad(() => import(`../docs/pro/i18n${suffix}.md`)),
        },
        {
          name: t['routes.mock'],
          path: 'pro/mock',
          component: lazyLoad(() => import(`../docs/pro/mock${suffix}.md`)),
        },
        {
          name: t['routes.permission'],
          path: 'pro/permission',
          component: lazyLoad(() => import(`../docs/pro/permission${suffix}.md`)),
        },
      ],
    },
    {
      name: t['routes.material'],
      key: 'material',
      module: 'docs',
      children: [
        {
          name: t['routes.material.start'],
          key: 'material.start',
          items: [
            {
              name: t['routes.material.guide'],
              path: 'material/guide',
              component: lazyLoad(() => import(`../docs/material/start.guide${suffix}.md`)),
            },
            {
              name: t['routes.material.qa'],
              path: 'material/qa',
              component: lazyLoad(() => import(`../docs/material/start.qa${suffix}.md`)),
            },
            {
              name: t['routes.material.spec'],
              path: 'material/spec',
              component: lazyLoad(() => import(`../docs/material/start.spec${suffix}.md`)),
            },
          ],
        },
        {
          name: t['routes.material.create-project'],
          key: 'material.create-project',
          items: [
            {
              name: t['routes.material.project-template'],
              path: 'material/project-template',
              component: lazyLoad(() => import(`../docs/material/init.template${suffix}.md`)),
            },
            {
              name: t['routes.material.project-config'],
              path: 'material/project-config',
              component: lazyLoad(() => import(`../docs/material/init.config${suffix}.md`)),
            },
          ],
        },
        {
          name: t['routes.material.develop'],
          key: 'material.develop',
          items: [
            {
              name: t['routes.material.build'],
              path: 'material/build',
              component: lazyLoad(() => import(`../docs/material/develop.build${suffix}.md`)),
            },
            {
              name: t['routes.material.test'],
              path: 'material/test',
              component: lazyLoad(() => import(`../docs/material/develop.test${suffix}.md`)),
            },
            {
              name: t['routes.material.docgen'],
              path: 'material/docgen',
              component: lazyLoad(() => import(`../docs/material/develop.docgen${suffix}.md`)),
            },
            {
              name: t['routes.material.publish'],
              path: 'material/publish',
              component: lazyLoad(() => import(`../docs/material/develop.publish${suffix}.md`)),
            },
          ],
        },
        {
          name: t['routes.material.advanced'],
          key: 'material.advanced',
          items: [
            {
              name: t['routes.material.team-site'],
              path: 'material/team-site',
              component: lazyLoad(() => import(`../docs/material/advanced.team-site${suffix}.md`)),
            },
            {
              name: t['routes.material.command'],
              path: 'material/command',
              component: lazyLoad(() => import(`../docs/material/advanced.command${suffix}.md`)),
            },
            {
              name: t['routes.material.develop-template'],
              path: 'material/develop-template',
              component: lazyLoad(() =>
                import(`../docs/material/advanced.template-develop${suffix}.md`)
              ),
            },
          ],
        },
        {
          name: t['routes.material.api'],
          key: 'matieral.api',
          items: [
            {
              name: t['routes.material.api-material'],
              path: 'material/api-material',
              component: lazyLoad(() => import(`../docs/material/api.material${suffix}.md`)),
            },
            {
              name: t['routes.material.api-group'],
              path: 'material/api-group',
              component: lazyLoad(() => import(`../docs/material/api.group${suffix}.md`)),
            },
          ],
        },
      ],
    },
  ];
}
