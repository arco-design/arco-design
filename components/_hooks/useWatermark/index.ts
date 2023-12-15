import merge from 'lodash/merge';
import { useEffect, useRef, useState } from 'react';
import { isServerRendering } from '../../_util/dom';
import { getPixelRatio } from './utils';
import { isNumber } from '../../_util/is';
import { WatermarkOptions, WatermarkReturnType } from './interface';

const toNumber = (value: string | number, defaultValue: number) => {
  if (isNumber(value)) {
    return value;
  }
  const numberVal = parseFloat(value);
  return isNumber(numberVal) ? numberVal : defaultValue;
};

const defaultOptions = {
  width: 100,
  gap: [100, 100],
  fontStyle: {
    fontSize: '16px',
    color: 'rgba(0, 0, 0, 0.15)',
    fontFamily: 'sans-serif',
    fontWeight: 'normal',
  },
  getContainer: () => document.body,
};

// 计量文本宽度和高度。
const measureTextSize = (
  ctx,
  contents: string[],
  rotate
): { lineSize: { width: number; height: number }[] } & {
  [key in 'width' | 'height' | 'originWidth' | 'originHeight']: number;
} => {
  let width = 0;
  let height = 0;
  const lineSize = [];

  contents.forEach((content) => {
    const {
      width: textWidth,
      fontBoundingBoxAscent,
      fontBoundingBoxDescent,
    } = ctx.measureText(content);
    const textHeight = fontBoundingBoxAscent + fontBoundingBoxDescent;

    if (textWidth > width) {
      width = textWidth;
    }

    height += textHeight;
    lineSize.push({ height: textHeight, width: textWidth });
  });

  const angle = (rotate * Math.PI) / 180;

  return {
    originWidth: width,
    originHeight: height,
    width: Math.ceil(Math.abs(Math.sin(angle) * height) + Math.abs(Math.cos(angle) * width)),
    height: Math.ceil(Math.abs(Math.sin(angle) * width) + Math.abs(height * Math.cos(angle))),
    lineSize,
  };
};

// 画布绘制转为base64url
const getCanvasData = async (
  options: Pick<WatermarkOptions, 'offset' | 'rotate' | 'image' | 'content' | 'fontStyle'> & {
    width: number;
    height: number;
  }
): Promise<{ width: number; height: number; base64Url: string }> => {
  const { offset, rotate, image, content, fontStyle } = options;
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  const ratio = getPixelRatio(ctx);
  const contents = [].concat(content || '');

  const setCanvas = ({ height, width }) => {
    const canvasWidth = 2 * offset[0] + width;
    const canvasHeight = 2 * offset[1] + height;

    canvas.setAttribute('width', `${canvasWidth * ratio}px`);
    canvas.setAttribute('height', `${canvasHeight * ratio}px`);
    canvas.style.width = `${canvasWidth}px`;
    canvas.style.height = `${canvasHeight}px`;

    ctx.translate(canvasWidth, canvasHeight);
    ctx.scale(ratio, ratio);

    const RotateAngle = (rotate * Math.PI) / 180;
    ctx.rotate(RotateAngle);
  };

  // 渲染文本
  const renderContent = () => {
    const { fontSize, color, fontWeight, fontFamily } = fontStyle;
    const realFontSize = toNumber(fontSize, 0) || fontStyle.fontSize;

    // font, scale 需参与文本尺寸计量
    ctx.font = `${fontWeight} ${realFontSize}px ${fontFamily}`;
    const measureSize = measureTextSize(ctx, contents, rotate);

    const width = options.width || measureSize.width;
    const height = options.height || measureSize.height;

    setCanvas({ width, height });

    ctx.fillStyle = color;
    ctx.font = `${fontWeight} ${realFontSize}px ${fontFamily}`;
    // 如果不设置，会导致旋转后的部分文字被遮盖
    ctx.textBaseline = 'top';

    contents.forEach((content, index) => {
      const { height: lineHeight, width: lineWidth } = measureSize.lineSize[index];

      const xStartPoint = -lineWidth / 2;
      const yStartPoint = -(options.height || measureSize.originHeight) / 2 + lineHeight * index;

      ctx.fillText(
        content as string,
        xStartPoint,
        yStartPoint,
        options.width || measureSize.originWidth
      );
    });
    return { base64Url: canvas.toDataURL(), height, width };
  };

  if (image) {
    return new Promise((resolve) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.referrerPolicy = 'no-referrer';
      img.src = image;
      img.onload = () => {
        let { width, height } = options;
        if (!width || !height) {
          if (width) {
            height = (img.height / img.width) * width;
          } else {
            width = (img.width / img.height) * height;
          }
        }
        setCanvas({ width, height });

        ctx.drawImage(img, -width / 2, -height / 2, width, height);
        return resolve({ base64Url: canvas.toDataURL(), width, height });
      };
      img.onerror = () => {
        return renderContent();
      };
    });
  }

  return renderContent();
};

const getMergeOptions = (o: Partial<WatermarkOptions>) => {
  const options = o || {};
  const _options = {
    rotate: -20,
    zIndex: 1,
    ...options,
    fontStyle: { ...defaultOptions.fontStyle, ...options.fontStyle },
    width: toNumber(options.width, options.image ? defaultOptions.width : undefined),
    height: toNumber(options.height, undefined),
    getContainer: options.getContainer,
    gap: [
      toNumber(options.gap?.[0], defaultOptions.gap[0]),
      toNumber(options.gap?.[1] || options.gap?.[0], defaultOptions.gap[1]),
    ],
  };

  _options.offset = [
    toNumber(_options.offset?.[0], _options.gap[0] / 2),
    toNumber(_options.offset?.[1] || _options.offset?.[0], _options.gap[0] / 2),
  ];
  return _options;
};

export default function useWatermark(params: WatermarkOptions): WatermarkReturnType {
  const [options, setOptions] = useState(params || {});
  const watermarkDiv = useRef<HTMLDivElement>();
  const mutationObserver = useRef<MutationObserver>();
  const mergeOptions = getMergeOptions(options);
  const { zIndex, gap } = mergeOptions;

  const container = isServerRendering
    ? null
    : options?.getContainer
    ? options.getContainer()
    : defaultOptions.getContainer();

  const setOrResetContainer = (dom: HTMLDivElement, type: 'set' | 'reset') => {
    if (!container || !dom) {
      return;
    }
    const dataKey = 'data-arco-watermark-origin-position';
    if (type === 'set') {
      container.append(dom);
      container.setAttribute(dataKey, container.style?.position || '');
      container.style.position = 'relative';
    } else {
      dom.parentNode?.removeChild(dom);
      container.style.position = container.getAttribute(dataKey);
      container.removeAttribute(dataKey);
    }
  };

  const clearMutationObserver = () => {
    if (mutationObserver.current) {
      mutationObserver.current.disconnect();
    }
    mutationObserver.current = null;
  };

  const createWatermarkElement = () => {
    if (container) {
      const div = document.createElement('div');
      watermarkDiv.current = div;
      setOrResetContainer(watermarkDiv.current, 'set');

      return div;
    }
  };

  // 清除元素和监听等
  const clearEffect = () => {
    clearMutationObserver();

    const dom = watermarkDiv.current;
    watermarkDiv.current = null;
    setOrResetContainer(dom, 'reset');
  };

  const setWaterMark = () => {
    if (!container) {
      return;
    }

    getCanvasData(mergeOptions).then(({ base64Url, width, height }) => {
      clearMutationObserver();

      const wmStyle = `
  width:100%;
  height:100%;
  position:absolute;
  top:0;
  left:0;
  bottom:0;
  right:0;
  pointer-events: none;
  z-index:${zIndex};
  background-size:${gap[0] + width}px ${gap[1] + height}px;
  background-repeat: repeat;
  background-image:url(${base64Url})`;

      if (!watermarkDiv.current) {
        createWatermarkElement();
      }

      watermarkDiv.current?.setAttribute('style', wmStyle.trim());

      if (container) {
        mutationObserver.current = new MutationObserver((mutations) => {
          const isChanged = mutations.some((record) => {
            const target = record.target;

            if (target) {
              // watermarkDiv 被删除时会触发
              if (target.isSameNode(container)) {
                const changedNodes = [].slice
                  .call(record.removedNodes)
                  .concat([].slice.call(record.addedNodes).map((x) => x.parentNode));

                return changedNodes.some((x: Node) => x === watermarkDiv.current);
              }
              if (target.isSameNode(watermarkDiv.current) && record.type === 'attributes') {
                return true;
              }
            }
          });
          if (isChanged) {
            clearEffect();
            setWaterMark();
          }
        });

        mutationObserver.current.observe(container, {
          attributes: true,
          subtree: true,
          childList: true,
        });
      }
    });
  };

  useEffect(() => {
    setWaterMark();
  }, [options]);

  useEffect(() => {
    clearEffect();
    // 销毁重建
    setWaterMark();

    return () => {
      clearEffect();
    };
  }, [container]);

  return {
    setWatermark: (newOptions: Partial<WatermarkOptions>) => {
      setOptions(merge({}, options, newOptions));
    },
    destroy: () => {
      clearEffect();
    },
  };
}
