import { CSSProperties } from 'react';

/**
 * @title WatermarkOptions
 */
export interface WatermarkOptions {
  /**
   * @zh zIndex
   * @en zIndex
   */
  zIndex?: CSSProperties['zIndex'];

  /**
   * @zh 单个水印的宽度。`image` 时默认为 100，content 时默认为文本宽度
   * @en The width of a single watermark. The default is 100 for `image` and the text width for content.
   */
  width?: number | string;
  /**
   * @zh 单个水印的高度
   * @en The height of a single watermark
   */
  height?: number | string;
  /**
   * @zh 单个水印旋转角度
   * @en Single watermark rotation angle
   * @defaultValue -20
   */
  rotate?: number;
  /**
   * @zh 水印图片源，优先级比文字内容高
   * @en Watermark image source has higher priority than text content
   */
  image?: string;
  /**
   * @zh 水印的文字内容
   * @en The text content of the watermark
   */
  content?: string | string[];

  /**
   * @zh 水印文字样式
   * @en Watermark text style
   * @defaultValue {color:`rgba(0, 0, 0, 0.12)`, fontFamily: `sans-serif`, fontSize: `14px`, fontWeight: `normal` }
   */
  fontStyle?: {
    color?: string;
    fontFamily?: string;
    fontSize?: number | string;
    fontWeight?: number | string;
  };
  /**
   * @zh 水印间的间距
   * @en spacing between watermarks
   * @defaultValue [100, 100]
   */
  gap?: [number, number];
  /**
   * @zh 水印相对于 `container` 容器的偏移量。
   * @en The offset of the watermark relative to the `container` container.
   * @defaultValue [`gaps[0] / 2`, `gaps[1] / 2`]
   */
  offset?: [number, number];

  /**
   * @zh 添加水印的容器 `wrapper`，会把水印 `dom` 作为 `container` 的第一个子节点展示
   * @en The container `wrapper` that adds a watermark will display the watermark `dom` as the first child node of the `container`.
   */
  getContainer?: () => HTMLElement;
}

/**
 * WatermarkReturnType
 */
export type WatermarkReturnType = {
  /**
   *
   * @zh 销毁水印
   * @en destroy watermark
   */
  destroy: () => void;
  /**
   * @zh 显示/更新水印
   * @en show/set Watermark
   */
  setWatermark: (options: WatermarkOptions) => void;
};
