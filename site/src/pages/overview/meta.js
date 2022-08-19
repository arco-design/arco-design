import zhCN from '../../locale/zh';
import enUS from '../../locale/en';

const locale = {
  'zh-CN': zhCN,
  'en-US': enUS,
};

export default (lang) => {
  const t = locale[lang];
  return [
    {
      name: t['routes.general'],
      list: [
        {
          name: t['routes.icon'],
          key: 'Icon',
        },
        {
          name: t['routes.button'],
          key: 'Button',
        },
        {
          name: t['routes.link'],
          key: 'Link',
        },
        {
          name: t['routes.typography'],
          key: 'Typography',
        },
      ],
    },
    {
      name: t['routes._layout'],
      list: [
        {
          name: t['routes.grid'],
          key: 'Grid',
        },
        {
          name: t['routes.divider'],
          key: 'Divider',
        },
        {
          name: t['routes.layout'],
          key: 'Layout',
        },
        {
          name: t['routes.space'],
          key: 'Space',
        },
      ],
    },
    {
      name: t['routes.data-show'],
      list: [
        {
          name: t['routes.avatar'],
          key: 'Avatar',
        },
        {
          name: t['routes.badge'],
          key: 'Badge',
        },
        {
          name: t['routes.calendar'],
          key: 'Calendar',
        },
        {
          name: t['routes.card'],
          key: 'Card',
        },
        {
          name: t['routes.collapse'],
          key: 'Collapse',
        },
        {
          name: t['routes.comment'],
          key: 'Comment',
        },
        {
          name: t['routes.descriptions'],
          key: 'Descriptions',
        },
        {
          name: t['routes.empty'],
          key: 'Empty',
        },
        {
          name: t['routes.list'],
          key: 'List',
        },
        {
          name: t['routes.statistic'],
          key: 'Statistic',
        },
        {
          name: t['routes.tabs'],
          key: 'Tabs',
        },
        {
          name: t['routes.table'],
          key: 'Table',
        },
        {
          name: t['routes.tag'],
          key: 'Tag',
        },
        {
          name: t['routes.timeline'],
          key: 'Timeline',
        },
        {
          name: t['routes.tooltip'],
          key: 'Tooltip',
        },
        {
          name: t['routes.popover'],
          key: 'Popover',
        },
        {
          name: t['routes.carousel'],
          key: 'Carousel',
        },
        {
          name: t['routes.tree'],
          key: 'Tree',
        },
        {
          name: t['routes.image'],
          key: 'Image',
        },
      ],
    },
    {
      name: t['routes.data-input'],
      list: [
        {
          name: t['routes.date-picker'],
          key: 'DatePicker',
        },
        {
          name: t['routes.time-picker'],
          key: 'TimePicker',
        },
        {
          name: t['routes.input'],
          key: 'Input',
        },
        {
          name: t['routes.input-number'],
          key: 'InputNumber',
        },
        {
          name: t['routes.auto-complete'],
          key: 'AutoComplete',
        },
        {
          name: t['routes.checkbox'],
          key: 'Checkbox',
        },
        {
          name: t['routes.radio'],
          key: 'Radio',
        },
        {
          name: t['routes.rate'],
          key: 'Rate',
        },
        {
          name: t['routes.switch'],
          key: 'Switch',
        },
        {
          name: t['routes.select'],
          key: 'Select',
        },
        {
          name: t['routes.tree-select'],
          key: 'TreeSelect',
        },
        {
          name: t['routes.cascader'],
          key: 'Cascader',
        },
        {
          name: t['routes.slider'],
          key: 'Slider',
        },
        {
          name: t['routes.form'],
          key: 'Form',
        },
        {
          name: t['routes.upload'],
          key: 'Upload',
        },
        {
          name: t['routes.transfer'],
          key: 'Transfer',
        },
        {
          name: t['routes.mentions'],
          key: 'Mentions',
        },
      ],
    },
    {
      name: t['routes.feedback'],
      list: [
        {
          name: t['routes.alert'],
          key: 'Alert',
        },
        {
          name: t['routes.drawer'],
          key: 'Drawer',
        },
        {
          name: t['routes.message'],
          key: 'Message',
        },
        {
          name: t['routes.notification'],
          key: 'Notification',
        },
        {
          name: t['routes.popconfirm'],
          key: 'Popconfirm',
        },
        {
          name: t['routes.progress'],
          key: 'Progress',
        },
        {
          name: t['routes.result'],
          key: 'Result',
        },
        {
          name: t['routes.spin'],
          key: 'Spin',
        },
        {
          name: t['routes.modal'],
          key: 'Modal',
        },
        {
          name: t['routes.skeleton'],
          key: 'Skeleton',
        },
      ],
    },
    {
      name: t['routes.nav'],
      list: [
        {
          name: t['routes.breadcrumb'],
          key: 'Breadcrumb',
        },
        {
          name: t['routes.dropdown'],
          key: 'Dropdown',
        },
        {
          name: t['routes.menu'],
          key: 'Menu',
        },
        {
          name: t['routes.page-header'],
          key: 'PageHeader',
        },
        {
          name: t['routes.pagination'],
          key: 'Pagination',
        },
        {
          name: t['routes.steps'],
          key: 'Steps',
        },
      ],
    },
    {
      name: t['routes.other'],
      list: [
        {
          name: t['routes.config-provider'],
          key: 'ConfigProvider',
        },
        {
          name: t['routes.affix'],
          key: 'Affix',
        },
        {
          name: t['routes.anchor'],
          key: 'Anchor',
        },
        {
          name: t['routes.back-top'],
          key: 'BackTop',
        },
        {
          name: t['routes.trigger'],
          key: 'Trigger',
        },
        {
          name: t['routes.resize-box'],
          key: 'ResizeBox',
        },
      ],
    },
  ];
};
