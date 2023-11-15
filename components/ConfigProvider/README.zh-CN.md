`````
组件 / 其他

# 全局配置 ConfigProvider

在应用的最外层进行配置，一次设置，全局生效。一般用于设置国际化语言等功能。
`````

%%Content%%

## API

### ConfigProvider

|参数名|描述|类型|默认值|版本|
|---|---|---|---|---|
|autoInsertSpaceInButton|当按钮中是两个汉字时，自动在两个汉字中添加一个空格。|boolean |`-`|2.3.0|
|effectGlobalNotice|是否全局设置所有 `Message` 和 `Notification` 的配置。如果用了 `useMessage` 的 hook 局部设置请设置为 false|boolean |`true`|2.40.0|
|rtl|视图的表现形式是从右开始向左结束。|boolean |`-`|2.36.0|
|prefixCls|全局组件类名前缀|string |`arco`|-|
|size|配置组件的默认尺寸，只会对支持`size`属性的组件生效。|'mini' \| 'small' \| 'default' \| 'large' |`default`|-|
|loadingElement|全局的加载中图标，作用于所有组件。|ReactNode |`-`|-|
|componentConfig|用于全局配置所有组件的默认参数|[ComponentConfig](#componentconfig) |`-`|2.23.0|
|focusLock|全局配置弹出框的 `focusLock`，作用于 `Modal` `Drawer` 组件。|{modal?: boolean \| { autoFocus?: boolean };drawer?: boolean \| { autoFocus?: boolean };} |`{ modal: { autoFocus: true }, drawer: { autoFocus: true }}`|2.13.0|
|locale|设置语言包|[Locale](#locale) |`-`|-|
|tablePagination|Table 全局的分页配置。|[PaginationProps](pagination#pagination) |`-`|2.6.0|
|theme|主题配置|[ThemeConfig](#themeconfig) |`-`|-|
|getPopupContainer|全局弹出框挂载的父级节点。|(node: HTMLElement) => Element |`() => document.body`|-|
|renderEmpty|全局配置组件内的空组件。|(componentName?: string) => ReactNode |`-`|2.10.0|

### ComponentConfig

```js
export type ComponentConfig = {
  Affix?: AffixProps;
  Alert?: AlertProps;
  AutoComplete?: AutoCompleteProps;
  Avatar?: AvatarProps;
  "Avatar.Group"?: AvatarGroupProps;
  Anchor?: AnchorProps;
  "Anchor.Link"?: AnchorLinkProps;
  BackTop?: BackTopProps;
  Badge?: BadgeProps;
  Breadcrumb?: BreadcrumbProps;
  Button?: ButtonProps;
  Calendar?: CalendarProps;
  Card?: CardProps;
  Carousel?: CarouselProps;
  Cascader?: CascaderProps;
  Checkbox?: CheckboxProps;
  Collapse?: CollapseProps;
  Comment?: CommentProps;
  DatePicker?: Omit<
    DatePickerCommonProps,
    | "placeholder"
    | "onChange"
    | "onSelect"
    | "onOk"
    | "defaultPickerValue"
    | "pickerValue"
    | "onPickerValueChange"
  >;
  Descriptions?: DescriptionsProps;
  Divider?: DividerProps;
  Drawer?: DrawerProps;
  Dropdown?: DropdownProps;
  "Dropdown.Button"?: DropdownButtonProps;
  Empty?: EmptyProps;
  Form?: FormProps;
  "Grid.Row"?: RowProps;
  "Grid.Col"?: ColProps;
  Grid?: GridProps;
  "Grid.GridItem"?: GridItemProps;
  Image?: ImageProps;
  Input?: InputProps;
  InputNumber?: InputNumberProps;
  VerificationCode?: VerificationCodeProps;
  Watermark?: WatermarkProps;
  InputTag?: InputTagProps;
  Layout?: LayoutProps;
  Link?: LinkProps;
  List?: ListProps;
  "List.Item"?: ListItemProps;
  Mentions?: MentionsProps;
  Menu?: MenuProps;
  Modal?: ModalProps;
  PageHeader?: PageHeaderProps;
  Pagination?: PaginationProps;
  Popconfirm?: PopconfirmProps;
  Popover?: PopoverProps;
  Progress?: ProgressProps;
  Radio?: RadioProps;
  "Radio.Group"?: RadioGroupProps;
  Rate?: RateProps;
  ResizeBox?: ResizeBoxProps;
  Result?: ResultProps;
  Select?: SelectProps;
  Skeleton?: SkeletonProps;
  Slider?: SliderProps;
  Space?: SpaceProps;
  Spin?: SpinProps;
  Statistic?: StatisticProps;
  Steps?: StepsProps;
  Switch?: SwitchProps;
  Table?: TableProps;
  Tabs?: TabsProps;
  TreeProps?: TreeProps;
  TriggerProps?: TriggerProps;
  Tag?: TagProps;
  Timeline?: TimelineProps;
  "Timeline.Item"?: TimelineItemProps;
  TimePicker?: TimePickerCommonProps;
  Tooltip?: TooltipProps;
  Transfer?: TransferProps;
  Tree?: TreeProps;
  TreeSelect?: TreeSelectProps;
  Trigger?: TriggerProps;
  Upload?: UploadProps;
};
```

### Locale

```js
export interface Locale {
  locale: string;
  dayjsLocale?: string;
  Calendar: CalendarType;
  DatePicker: {
    Calendar: CalendarType;
    [key: string]: any;
  };
  Drawer: Record<string, any>;
  Empty: Record<string, any>;
  Modal: Record<string, any>;
  Pagination: Record<string, any>;
  Popconfirm: Record<string, any>;
  Table: Record<string, any>;
  TimePicker: Record<string, any>;
  Upload: Record<string, any>;
  Progress: Record<string, any>;
  Typography: Record<string, any>;
  Transfer: Record<string, any>;
  ImagePreview: Record<string, any>;
  Form?: Record<string, any>;
}
```

### CalendarType

```js
type CalendarType = {
  today: string;
  view: Record<string, any>;
  month: {
    short: Record<string, any>;
    long: Record<string, any>;
  };
  week: {
    short: Record<string, any>;
    long: Record<string, any>;
  };
  formatYear?: string;
  formatMonth?: string;
  monthBeforeYear?: boolean;
};
```

### ThemeConfig

```js
export type ThemeConfig = Record<string, any>;
```
