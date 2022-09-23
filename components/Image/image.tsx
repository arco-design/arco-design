import React, { useContext, useEffect, useMemo, LegacyRef, useRef } from 'react';
import cs from '../_util/classNames';
import { ConfigContext } from '../ConfigProvider';
import IconLoading from '../../icon/react-icon/IconLoading';
import IconImageClose from '../../icon/react-icon/IconImageClose';
import { ImageProps, ImagePreviewProps } from './interface';
import { ImageFooter } from './image-footer';
import ImagePreview from './image-preview';
import ImagePreviewGroup from './image-preview-group';
import useShowFooter from './utils/hooks/useShowFooter';
import useImageStatus from './utils/hooks/useImageStatus';
import useMergeValue from '../_util/hooks/useMergeValue';
import omit from '../_util/omit';
import { isNumber, isUndefined } from '../_util/is';
import { PreviewGroupContext } from './previewGroupContext';
import { isServerRendering } from '../_util/dom';
import useMergeProps from '../_util/hooks/useMergeProps';

type ImagePropsType = ImageProps & { _index?: number };

let uuid = 0;

const defaultProps: ImagePropsType = {
  footerPosition: 'inner',
  preview: true,
};

function Image(baseProps: ImagePropsType, ref: LegacyRef<HTMLDivElement>) {
  const { getPrefixCls, componentConfig, rtl } = useContext(ConfigContext);
  const props = useMergeProps<ImagePropsType>(baseProps, defaultProps, componentConfig?.Image);
  const {
    style,
    className,
    src,
    width,
    height,
    title,
    description,
    actions,
    footerPosition,
    simple,
    loader,
    loaderClassName,
    error,
    preview,
    previewProps = {} as ImagePreviewProps,
    alt,
    onClick,
    index,
    _index,
    onError,
    onLoad,
    ...restProps
  } = props;

  const {
    previewGroup,
    handleVisibleChange: handleGroupVisibleChange,
    registerPreviewUrl,
    registerPreviewProps,
    setCurrentIndex,
  } = useContext(PreviewGroupContext);
  const previewSrc = previewProps.src || src;

  const id = useMemo(() => {
    if (isNumber(index) || isNumber(_index)) {
      uuid = isNumber(index) ? index : _index;
      return uuid;
    }
    return uuid++;
  }, []);

  const [showFooter] = useShowFooter({ title, description, actions });
  const { isLoading, isError, isLoaded, setStatus } = useImageStatus('beforeLoad');
  const [previewVisible, setPreviewVisible] = useMergeValue(false, {
    defaultValue: previewProps.defaultVisible,
    value: previewProps.visible,
  });

  // Props passed directly into Preview component
  const availablePreviewProps = omit(previewProps, [
    'visible',
    'defaultVisible',
    'src',
    'onVisibleChange',
  ]);

  const prefixCls = getPrefixCls('image');
  const isControlled = !isUndefined(previewProps.visible);
  const classNames = cs(
    prefixCls,
    {
      [`${prefixCls}-rtl`]: rtl,
      [`${prefixCls}-simple`]: simple,
      [`${prefixCls}-loading`]: isLoading,
      [`${prefixCls}-loading-error`]: isError,
      [`${prefixCls}-with-footer-inner`]: isLoaded && showFooter && footerPosition === 'inner',
      [`${prefixCls}-with-footer-outer`]: isLoaded && showFooter && footerPosition === 'outer',
      [`${prefixCls}-with-preview`]: isLoaded && preview && !isError && !isControlled,
    },
    className
  );

  const refImg = useRef<HTMLImageElement>();

  function onImgLoaded(e) {
    setStatus('loaded');
    onLoad && onLoad(e);
  }

  function onImgLoadError(e) {
    setStatus('error');
    onError && onError(e);
  }

  function onImgClick(e) {
    if (preview && previewGroup) {
      setCurrentIndex(id);
      handleGroupVisibleChange(true);
    } else if (preview) {
      togglePreviewVisible(true);
    }
    onClick && onClick(e);
  }

  function togglePreviewVisible(newVisible) {
    previewProps.onVisibleChange && previewProps.onVisibleChange(newVisible, previewVisible);
    setPreviewVisible(newVisible);
  }

  useEffect(() => {
    if (isServerRendering || !refImg.current) return;
    refImg.current.src = src;
    setStatus('loading');
  }, [src]);

  useEffect(() => {
    if (!previewGroup) return;
    const unRegister = registerPreviewUrl(id, previewSrc, preview);
    const unRegisterPreviewProps = registerPreviewProps(id, availablePreviewProps);
    return () => {
      unRegister(id);
      unRegisterPreviewProps(id);
    };
  }, [previewGroup]);

  useEffect(() => {
    if (!previewGroup) return;
    registerPreviewUrl(id, previewSrc, preview);
  }, [previewSrc, preview, previewGroup]);

  const defaultError = (
    <div className={`${prefixCls}-error`}>
      <div className={`${prefixCls}-error-icon`}>
        <IconImageClose />
      </div>
      {alt && <div className={`${prefixCls}-error-alt`}>{alt}</div>}
    </div>
  );

  const defaultLoader = (
    <div className={`${prefixCls}-loader`}>
      <div className={`${prefixCls}-loader-spin`}>
        <IconLoading />
        <div className={`${prefixCls}-loader-spin-text`}>Loading</div>
      </div>
    </div>
  );

  const renderLoader = () => {
    if (loader === true) return defaultLoader;
    if (loaderClassName) return <div className={cs(`${prefixCls}-loader`, loaderClassName)} />;
    return loader || null;
  };

  return (
    <div className={classNames} style={Object.assign({ width, height }, style)} ref={ref}>
      <img
        ref={refImg}
        className={`${prefixCls}-img`}
        {...restProps}
        title={title}
        width={width}
        height={height}
        onLoad={onImgLoaded}
        onError={onImgLoadError}
        onClick={onImgClick}
        alt={alt}
      />
      {!isLoaded && (
        <div className={`${prefixCls}-overlay`}>
          {isError && (error || defaultError)}
          {isLoading && renderLoader()}
        </div>
      )}
      {isLoaded && showFooter && (
        <ImageFooter
          title={title}
          description={description}
          actions={actions}
          prefixCls={prefixCls}
          simple={simple}
        />
      )}
      {isLoaded && preview && (
        <ImagePreview
          visible={previewVisible}
          src={previewSrc}
          {...availablePreviewProps}
          onVisibleChange={togglePreviewVisible}
        />
      )}
    </div>
  );
}

const RefImageComponent = React.forwardRef<HTMLDivElement, ImagePropsType>(Image);

const ImageComponent = RefImageComponent as typeof RefImageComponent & {
  Preview: typeof ImagePreview;
  PreviewGroup: typeof ImagePreviewGroup;
};

ImageComponent.Preview = ImagePreview;

ImageComponent.PreviewGroup = ImagePreviewGroup;

ImageComponent.displayName = 'Image';

export default ImageComponent;
