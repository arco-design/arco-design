import React, {
  forwardRef,
  PropsWithChildren,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';
import useIsFirstRender from '../_util/hooks/useIsFirstRender';
import useMergeValue from '../_util/hooks/useMergeValue';
import ImagePreview, { ImagePreviewHandle } from './image-preview';
import { ImagePreviewGroupProps } from './interface';
import { PreviewGroupContext, PreviewUrlMap } from './previewGroupContext';

export { ImagePreviewGroupProps };

export interface ImagePreviewGroupHandle {
  reset: () => void;
}

function PreviewGroup(props: PropsWithChildren<ImagePreviewGroupProps>, ref) {
  const {
    children,
    srcList,
    infinite,
    current: propCurrentIndex,
    defaultCurrent,
    onChange,
    visible: propVisible,
    defaultVisible,
    onVisibleChange,
    ...restProps
  } = props;

  const [visible, setVisible] = useMergeValue(false, {
    value: propVisible,
    defaultValue: defaultVisible,
  });

  const propPreviewUrlMap: PreviewUrlMap | null = useMemo(
    () => (srcList ? new Map(srcList.map((url, index) => [index, { url, preview: true }])) : null),
    [srcList]
  );

  const isFirstRender = useIsFirstRender();
  const getPreviewUrlMap = () => (propPreviewUrlMap ? new Map(propPreviewUrlMap) : new Map());
  const [previewUrlMap, setPreviewUrlMap] = useState<PreviewUrlMap>(getPreviewUrlMap());
  useEffect(() => {
    if (isFirstRender) return;
    setPreviewUrlMap(getPreviewUrlMap());
  }, [propPreviewUrlMap]);

  const canPreviewUrlMap = new Map(
    Array.from(previewUrlMap)
      .filter(([, { preview }]) => preview)
      .map(([id, { url }]) => [id, url])
  );

  const [currentIndex, setCurrentIndex] = useMergeValue(0, {
    value: propCurrentIndex,
    defaultValue: defaultCurrent,
  });

  useEffect(() => {
    if (isFirstRender) return;
    onChange && onChange(currentIndex);
  }, [currentIndex]);

  function registerPreviewUrl(id: number, url: string, preview: boolean) {
    if (!propPreviewUrlMap) {
      setPreviewUrlMap((pre) =>
        new Map(pre).set(id, {
          url,
          preview,
        })
      );
    }
    return function unRegisterPreviewUrl() {
      if (!propPreviewUrlMap) {
        setPreviewUrlMap((pre) => {
          const cloneMap = new Map(pre);
          const hasDelete = cloneMap.delete(id);
          return hasDelete ? cloneMap : pre;
        });
      }
    };
  }

  const refPreview = useRef<ImagePreviewHandle>();

  useImperativeHandle<any, ImagePreviewGroupHandle>(ref, () => ({
    reset: () => {
      refPreview.current && refPreview.current.reset();
    },
  }));

  const handleVisibleChange = (visible, preVisible) => {
    setVisible(visible);
    onVisibleChange && onVisibleChange(visible, preVisible);
  };

  const loopImageIndex = (children) => {
    let index = 0;

    const loop = (children) => {
      return React.Children.map(children, (child) => {
        if (child && child.props && child.type) {
          const displayName = child.type.displayName;
          if (displayName === 'Image') {
            return React.cloneElement(child, { _index: index++ });
          }
        }

        if (child && child.props && child.props.children) {
          return React.cloneElement(child, {
            children: loop(child.props.children),
          });
        }

        return child;
      });
    };

    return loop(children);
  };

  return (
    <PreviewGroupContext.Provider
      value={{
        previewGroup: true,
        previewUrlMap: canPreviewUrlMap,
        infinite,
        currentIndex,
        setCurrentIndex,
        setPreviewUrlMap,
        registerPreviewUrl,
        visible,
        setVisible,
      }}
    >
      {loopImageIndex(children)}
      <ImagePreview
        ref={refPreview}
        src=""
        visible={visible}
        onVisibleChange={handleVisibleChange}
        {...restProps}
      />
    </PreviewGroupContext.Provider>
  );
}

const PreviewGroupComponent = forwardRef<
  ImagePreviewGroupHandle,
  PropsWithChildren<ImagePreviewGroupProps>
>(PreviewGroup);

PreviewGroupComponent.displayName = 'ImagePreviewGroup';

export default PreviewGroupComponent;
