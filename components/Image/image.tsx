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
import { isObject, isNumber, isUndefined } from '../_util/is';
import { PreviewGroupContext } from './previewGroupContext';
import useMergeProps from '../_util/hooks/useMergeProps';
import useKeyboardEvent from '../_util/hooks/useKeyboardEvent';
import useInView from '../_util/hooks/useInView';

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
    previewProps: _propsPreviewProps,
    alt,
    onClick,
    index,
    _index,
    onError,
    onLoad,
    lazyload,
    ...restProps
  } = props;

  const getKeyboardEvents = useKeyboardEvent();

  const {
    previewGroup,
    handleVisibleChange: handleGroupVisibleChange,
    registerPreviewUrl,
    registerPreviewProps,
    setCurrentIndex,
  } = useContext(PreviewGroupContext);

  const previewProps = useMemo(() => {
    return isObject(_propsPreviewProps) ? _propsPreviewProps : ({} as ImagePreviewProps);
  }, [_propsPreviewProps]);

  const intersectionInitOptions = useMemo(() => {
    return isObject(lazyload) ? lazyload : {};
  }, [lazyload]);

  const id = useMemo(() => {
    if (isNumber(index) || isNumber(_index)) {
      uuid = isNumber(index) ? index : _index;
      return uuid;
    }
    return uuid++;
  }, []);

  const previewSrc = previewProps.src || src;
  const [showFooter] = useShowFooter({ title, description, actions });
  const { isLoading, isError, isLoaded, isLazyLoad, isBeforeLoad, setStatus } =
    useImageStatus('beforeLoad');
  const [previewVisible, setPreviewVisible] = useMergeValue(false, {
    defaultValue: previewProps.defaultVisible,
    value: previewProps.visible,
  });

  // Props passed directly into Preview component
  const availablePreviewProps = useMemo(() => {
    return omit(previewProps, ['visible', 'defaultVisible', 'src', 'onVisibleChange']);
  }, [previewProps]);

  const prefixCls = getPrefixCls('image');
  const isControlled = !isUndefined(previewProps.visible);
  const classNames = cs(
    prefixCls,
    {
      [`${prefixCls}-rtl`]: rtl,
      [`${prefixCls}-simple`]: simple,
      [`${prefixCls}-before-load`]: isBeforeLoad,
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

  const { inView } = useInView({
    target: refImg.current,
    defaultInView: !lazyload,
    ...intersectionInitOptions,
  });

  useEffect(() => {
    if (refImg.current) {
      if (inView) {
        // avoid set img.src to undefined when its doesn't have [src] attribute
        if ((refImg.current.src || src) && refImg.current.src !== src) {
          refImg.current.src = src;
          setStatus('loading');
        }
      } else {
        setStatus('lazyload');
      }
    }
  }, [src, inView]);

  useEffect(() => {
    if (!previewGroup) return;
    const unRegister = registerPreviewProps(id, availablePreviewProps);
    return () => unRegister(id);
  }, [id, previewGroup, availablePreviewProps]);

  useEffect(() => {
    if (!previewGroup) return;
    const unRegister = registerPreviewUrl(id, previewSrc, preview);
    return () => unRegister(id);
  }, [id, previewGroup, previewSrc, preview]);

  const defaultError = (
    <div className={`${prefixCls}-error`}>
      <div className={`${prefixCls}-error-icon`}>
        <IconImageClose />
      </div>
      {alt && <div className={`${prefixCls}-error-alt`}>{alt}</div>}
    </div>
  );

  const defaultLoader = (
    <div className={cs(`${prefixCls}-loader`, loaderClassName)}>
      <div className={`${prefixCls}-loader-spin`}>
        <IconLoading />
        <div className={`${prefixCls}-loader-spin-text`}>Loading</div>
      </div>
    </div>
  );

  const renderLoader = () => {
    if (loader === true) return defaultLoader;
    const loadElem: React.ReactNode = loader || defaultLoader;
    // 懒加载展示占位。
    if (lazyload || loader) {
      return loadElem;
    }
    return null;
  };

  return (
    <div className={classNames} style={Object.assign({ width, height }, style)} ref={ref}>
      <img
        ref={refImg}
        className={`${prefixCls}-img`}
        tabIndex={0}
        {...getKeyboardEvents({
          onPressEnter: onImgClick,
        })}
        {...restProps}
        {...(lazyload || src === undefined ? {} : { src })}
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
          {(isLoading || isLazyLoad) && renderLoader()}
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
