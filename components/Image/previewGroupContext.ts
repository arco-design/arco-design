import { createContext } from 'react';

export interface PreviewUrl {
  url: string;
  preview: boolean;
}

export type PreviewUrlMap = Map<number, PreviewUrl>;

export type UnRegisterPreviewUrl = (id: number) => void;

export type RegisterPreviewUrl = (
  id: number,
  url: string,
  preview: boolean
) => UnRegisterPreviewUrl;

export interface PreviewGroupContextProps {
  previewGroup: boolean;
  previewUrlMap: Map<number, string>;
  infinite?: boolean;
  currentIndex: number;
  setCurrentIndex: (current: number) => void;
  setPreviewUrlMap: (map: PreviewUrlMap) => void;
  registerPreviewUrl: RegisterPreviewUrl;
  visible: boolean;
  handleVisibleChange: (visible: boolean, preVisible?: boolean) => void;
}

export const PreviewGroupContext = createContext<PreviewGroupContextProps>({
  previewGroup: false,
  previewUrlMap: new Map(),
  infinite: true,
  currentIndex: 0,
  setCurrentIndex: () => null,
  setPreviewUrlMap: () => null,
  registerPreviewUrl: () => null,
  visible: false,
  handleVisibleChange: () => null,
});
