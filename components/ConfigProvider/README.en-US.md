`````
Component / Other

# ConfigProvider

Configure in the outermost layer of the application to set global params.
`````

%%Content%%

## API

### ConfigProvider

|Property|Description|Type|DefaultValue|Version|
|---|---|---|---|---|
|autoInsertSpaceInButton|When there are two Chinese characters in the button, a space is automatically added between two Chinese characters.|boolean |`-`|2.3.0|
|effectGlobalNotice|Whether to update the configuration of all `Message` and `Notification` with one click. Set to false if using the hook locale of `useMessage`|boolean |`true`|2.40.0|
|rtl|View starts from the right and ends on the left.|boolean |`-`|2.36.0|
|prefixCls|Global ClassName prefix|string |`arco`|-|
|size|Configure the default size of the component, which will only take effect for components that support the `size` property.|'mini' \| 'small' \| 'default' \| 'large' |`default`|-|
|loadingElement|Global loading icon.|ReactNode |`-`|-|
|componentConfig|Default parameters for global configuration of all components|[ComponentConfig](#componentconfig) |`-`|2.23.0|
|focusLock|global `focusLock`, affects component `Modal` `Drawer`.|{modal?: boolean \| { autoFocus?: boolean };drawer?: boolean \| { autoFocus?: boolean };} |`{ modal: { autoFocus: true }, drawer: { autoFocus: true }}`|2.13.0|
|locale|Language package setting|[Locale](#locale) |`-`|-|
|tablePagination|Table Global pagination configuration.|[PaginationProps](pagination#pagination) |`-`|2.6.0|
|theme|Theme Configuration|[ThemeConfig](#themeconfig) |`-`|-|
|getPopupContainer|The parent node of the global popup.|(node: HTMLElement) => Element |`() => document.body`|-|
|renderEmpty|Empty component in component.|(componentName?: string) => ReactNode |`-`|2.10.0|

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
