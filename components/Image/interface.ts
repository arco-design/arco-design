import { CSSProperties, ReactNode, HTMLAttributes, ImgHTMLAttributes } from 'react';

/**
 * @title Image
 */
export interface ImageProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'className'> {
  style?: CSSProperties;
  className?: string | string[];
  /**
   * @zh 图片获取地址
   * @en Image path
   */
  src?: string;
  /**
   * @zh 图片显示宽度
   * @en Image width
   */
  width?: string | number;
  /**
   * @zh 图片显示高度
   * @en Image height
   */
  height?: string | number;
  /**
   * @zh 标题
   * @en Image title
   */
  title?: string;
  /**
   * @zh 描述
   * @en Image description
   */
  description?: string;
  /**
   * @zh 额外操作
   * @en Extra operations
   */
  actions?: ReactNode[];
  /**
   * @zh 底部显示的位置
   * @en The position of footer
   * @defaultValue inner
   */
  footerPosition?: 'inner' | 'outer';
  /**
   * @zh 是否开启简洁模式
   * @en Whether to enable simple mode
   */
  simple?: boolean;
  /**
   * @zh 加载过渡效果，为 true 显示默认加载效果
   * @en Load transition effect, set `true` to show the default loading effect
   */
  loader?: boolean | ReactNode;
  /**
   * @zh loader 的样式，将覆盖默认过渡效果
   * @en The style of the loader, will override the default transition effect
   */
  loaderClassName?: string | string[];
  /**
   * @zh error 状态下显示的内容
   * @en Content displayed in error state
   */
  error?: ReactNode;
  /**
   * @zh 是否开启预览
   * @en Whether to enable preview
   * @defaultValue true
   */
  preview?: boolean;
  /**
   * @zh 预览的配置项 （所有选项都是可选的）[ImagePreviewProps](#imagepreview)
   * @en Preview options (all options are optional) [ImagePreviewProps](#imagepreview)
   */
  previewProps?: PartialImagePreviewProps;
  /**
   * @zh 使用 `Image.PreviewGroup`包裹时的预览索引，一般不用指定，当多图预览顺序出现问题时，可手动指定当前 `image` 的预览顺序
   * @en Use `Image.PreviewGroup` to wrap the preview index. Generally, you don't need to specify it. When there is a problem with the preview order of multiple images, you can manually specify the preview order of the current `image`
   * @version 2.23.0
   */
  index?: number;
}

/**
 * @title Image.Preview
 */
export interface ImagePreviewProps {
  style?: CSSProperties;
  className?: string | string[];
  /**
   * @zh 图片获取地址, 在 Image 中默认是 Image 的 src
   * @en Image path, The default in Image is the src of Image
   */
  src: string;
  /**
   * @zh 图片属性，透传至预览弹窗中的 `img` 标签上
   * @en Image props, passthrough to the `img` tag in the preview modal
   * @version 2.39.0
   */
  imgAttributes?: Omit<ImgHTMLAttributes<HTMLImageElement>, 'src'>;
  /**
   * @zh 是否可见，受控属性
   * @en Whether is visible
   */
  visible?: boolean;
  /**
   * @zh 默认是否可见，非受控
   * @en Whether visible by default
   */
  defaultVisible?: boolean;
  /**
   * @zh 触发 toolbar 切换为 simple 模式的宽度
   * @en The width that triggers the toolbar to switch to simple mode
   * @defaultValue 316
   */
  breakPoint?: number;
  /**
   * @zh 点击 mask 是否触发关闭
   * @en Whether click mask to close
   * @defaultValue true
   */
  maskClosable?: boolean;
  /**
   * @zh 是否显示关闭按钮
   * @en Whether display close button
   * @defaultValue true
   * @version 2.16.0
   */
  closable?: boolean;
  /**
   * @zh 额外操作，[ImagePreviewActionProps](#imagepreviewactionprops)
   * @en Extra operations, [ImagePreviewActionProps](#imagepreviewactionprops)
   */
  actions?: ImagePreviewActionProps[];
  /**
   * @zh 控制条的布局
   * @en The layout of the control bar
   * @defaultValue ['fullScreen', 'rotateRight', 'rotateLeft', 'zoomIn', 'zoomOut', 'originalSize', 'extra']
   */
  actionsLayout?: string[];
  /**
   * @zh 在预览缩放时会使用当前数组中的缩放百分比。若不包含 `100%`，则会自动添加在最相邻的位置。
   * @en The zoom percentage in the current array is used when previewing zooms. If `100%` is not included, the `100%` scale will be automatically added in the most adjacent position.
   * @defaultValue [25, 33, 50, 67, 75, 80, 90, 100, 110, 125, 150, 175, 200, 250, 300, 400, 500];
   * @version 2.30.0
   */
  scales?: number[];
  /**
   * @zh 切换可见状态触发的事件
   * @en Callback when visibility changes
   */
  onVisibleChange?: (visible: boolean, preVisible: boolean) => void;
  /**
   * @zh 弹出层挂载的节点
   * @en Get popup's parent node
   * @defaultValue () => document.body
   * @version 2.16.0
   */
  getPopupContainer?: () => HTMLElement;
  /**
   * @zh  按 `ESC` 键关闭预览
   * @en Whether to enable pressing `ESC` to close the preview.
   * @defaultValue true
   * @version 2.24.0
   */
  escToExit?: boolean;
}

export type PartialImagePreviewProps = Partial<ImagePreviewProps>;

/**
 * @title Image.PreviewGroup
 * @zh 从 `v2.14.0` 开始支持
 * @en Start from `v2.14.0`
 */
export interface ImagePreviewGroupProps extends Omit<PartialImagePreviewProps, 'src'> {
  /**
   * @zh 图片列表 （设置了本属性之后，将不再收集 Image 子组件的图片信息）
   * @en Image path list（After setting this property, the information of the `Image` sub-component will no longer be collected)
   */
  srcList?: string[];
  /**
   * @zh 当前展示的图片的下标 (受控属性)
   * @en The index of current image (controlled prop)
   */
  current?: number;
  /**
   * @zh 第一张展示的图片的下标
   * @en The default index of first image
   */
  defaultCurrent?: number;
  /**
   * @zh 是否无限循环
   * @en Whether to loop infinitely
   */
  infinite?: boolean;
  /**
   * @zh 切换图片触发的事件
   * @en Callback when image switches
   */
  onChange?: (index: number) => void;
}

/**
 * @title ImagePreviewActionProps
 * @zh `<Image.Preview>` 中类型 `ImagePreviewActionProps` 详细参数。
 * @en Detailed parameters of type `ImagePreviewActionProps` in `<Image.Preview>`.
 */
export interface ImagePreviewActionProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * @zh 唯一标识
   * @en Unique identifier
   */
  key: string;
  /**
   * @zh 内容
   * @en content
   */
  content: ReactNode;
  /**
   * @zh
   * 因为 content 只能定义内容，所以提供这个函数用于支持自定义外围元素，需要注意的是设置了 `getContainer`, 显示 `name` 的 `Tooltip` 将失效。
   * @en
   * Because content can only specify content, this function is provided to support custom peripheral elements.
   * Note that if `getContainer` is set, the `Tooltip` displaying `name` will be invalid
   */
  getContainer?: (actionElement: ReactNode) => ReactNode;
  /**
   * @zh 名称
   * @en name
   */
  name?: string;
  /**
   * @zh 是否禁用
   * @en Whether disabled
   */
  disabled?: boolean;
}
