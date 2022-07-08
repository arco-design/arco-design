`````
Component / Feedback

# Skeleton

Use gray blocks to occupy the loading data.
`````

%%Content%%

## API

### Skeleton

|Property|Description|Type|DefaultValue|
|---|---|---|---|
|animation|Whether to show animation|boolean |`-`|
|loading|Whether to show subcomponents. Set `true` to show placeholder|boolean |`true`|
|className|Additional css class|string \| string[] |`-`|
|image|Whether to show the picture placeholder|[SkeletonImageProps](#skeletonimageprops) \| boolean |`-`|
|style|Additional style|CSSProperties |`-`|
|text|Whether to show text placeholder|[SkeletonTextProps](#skeletontextprops) \| boolean |`true`|

### SkeletonImageProps

```js
export interface SkeletonImageProps {
  style?: CSSProperties;
  className?: string;
  /** 图片形状 */
  shape?: "circle" | "square";
  /** 图片尺寸 */
  size?: "small" | "default" | "large";
  /** 图片位置 */
  position?: "left" | "right";
  prefixCls?: string;
}
```

### SkeletonTextProps

```js
export interface SkeletonTextProps {
  style?: CSSProperties;
  className?: string;
  /** 文本行数 */
  rows?: number;
  /** 文本行宽度 */
  width?: number | string | (string | number)[];
  prefixCls?: string;
}
```
