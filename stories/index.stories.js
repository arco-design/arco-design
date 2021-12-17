import React from 'react';
import { storiesOf } from '@storybook/react';

import './index.less';
import '../dist/css/index.less';

import DemoTypography from './components/Typography';
import DemoAlert from './components/Alert';
import DemoAvatar from './components/Avatar';
import DemoModal from './components/Modal';
import DemoSpin from './components/Spin';
import DemoTable from './components/Table';
import DemoCheckbox from './components/Checkbox';
import DemoMenu from './components/Menu';
import DemoTab from './components/Tab';
import DemoBadge from './components/Badge';
import DemoDivider from './components/Divider';
import DemoButton from './components/Button';
import DemoBreadcrumb from './components/Breadcrumb';
import DemoSelect from './components/Select';
import DemoCascader from './components/Cascader';
import DemoNotification from './components/Notification';
import DemoMessage from './components/Message';
import DemoInput from './components/Input';
import DemoInputTag from './components/InputTag';
import DemoSwitch from './components/Switch';
import DemoTooltip from './components/Tooltip';
import DemoRadio from './components/Radio';
import DemoGrid from './components/Grid';
import DemoForm from './components/Form';
import DemoPopover from './components/Popover';
import DemoPopconfirm from './components/Popconfirm';
import DemoSteps from './components/Steps';
import DemoBackTop from './components/BackTop';
import DemoStatistic from './components/Statistic';
import DemoTag from './components/Tag';
import DemoAffix from './components/Affix';
import DemoAutoComplete from './components/AutoComplete';
import DemoCard from './components/Card';
import DemoPagination from './components/Pagination';
import DemoInputNumber from './components/InputNumber';
import DemoTransfer from './components/Transfer';
import DemoList from './components/List';
import DemoTree from './components/Tree';
import DemoSkeleton from './components/Skeleton';
import DemoCollapse from './components/Collapse';
import DemoProgress from './components/Progress';
import DemoDatePicker from './components/DatePicker';
import DemoTimePicker from './components/TimePicker';
import DemoCarousel from './components/Carousel';
import DemoSlider from './components/Slider';
import DemoTimeline from './components/Timeline';
import DemoDropdown from './components/Dropdown';
// import DemoUpload from './components/Upload';
import DemoAnchor from './components/Anchor';
import DemoLayout from './components/Layout';
import DemoRate from './components/Rate';
import DemoVirtualList from './components/VirtualList';
import DemoDrawer from './components/Drawer';
import DemoMentions from './components/Mentions';
import DemoImage from './components/Image';
import DemoSpace from './components/Space';
import DemoDraggable from './components/Draggable';
import DemoResizeBox from './components/Resizebox';

const components = storiesOf('Components', module);
const componentsMap = {
  Typography: () => <DemoTypography />,
  Layout: () => <DemoLayout />,
  DropDown: () => <DemoDropdown />,
  Menu: () => <DemoMenu />,
  Carousel: () => <DemoCarousel />,
  Button: () => <DemoButton />,
  Breadcrumb: () => <DemoBreadcrumb />,
  Steps: () => <DemoSteps />,
  Select: () => <DemoSelect />,
  Cascader: () => <DemoCascader />,
  Notification: () => <DemoNotification />,
  Message: () => <DemoMessage />,
  Modal: () => <DemoModal />,
  Input: () => <DemoInput />,
  AutoComplete: () => <DemoAutoComplete />,
  Switch: () => <DemoSwitch />,
  Table: () => <DemoTable />,
  Tooltip: () => <DemoTooltip />,
  Alert: () => <DemoAlert />,
  Popover: () => <DemoPopover />,
  Popconfirm: () => <DemoPopconfirm />,
  Radio: () => <DemoRadio />,
  Checkbox: () => <DemoCheckbox />,
  Grid: () => <DemoGrid />,
  Spin: () => <DemoSpin />,
  Tab: () => <DemoTab />,
  Badge: () => <DemoBadge />,
  Divider: () => <DemoDivider />,
  Form: () => <DemoForm />,
  BackTop: () => <DemoBackTop />,
  Statistic: () => <DemoStatistic />,
  Tag: () => <DemoTag />,
  Affix: () => <DemoAffix />,
  Card: () => <DemoCard />,
  Pagination: () => <DemoPagination />,
  InputNumber: () => <DemoInputNumber />,
  InputTag: () => <DemoInputTag />,
  Transfer: () => <DemoTransfer />,
  Skeleton: () => <DemoSkeleton />,
  List: () => <DemoList />,
  Collapse: () => <DemoCollapse />,
  Progress: () => <DemoProgress />,
  DatePicker: () => <DemoDatePicker />,
  TimePicker: () => <DemoTimePicker />,
  Slider: () => <DemoSlider />,
  Tree: () => <DemoTree />,
  Timeline: () => <DemoTimeline />,
  Anchor: () => <DemoAnchor />,
  Rate: () => <DemoRate />,
  VirtualList: () => <DemoVirtualList />,
  Avatar: () => <DemoAvatar />,
  Drawer: () => <DemoDrawer />,
  Mentions: () => <DemoMentions />,
  Image: () => <DemoImage />,
  Space: () => <DemoSpace />,
  Draggable: () => <DemoDraggable />,
  ResizeBox: () => <DemoResizeBox />,
};

Object.keys(componentsMap)
  .sort((a, b) => (a > b ? 1 : -1))
  .forEach((componentsName) => {
    components.add(componentsName, componentsMap[componentsName]);
  });
