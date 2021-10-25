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
  currentId: number;
  setCurrentId: (current: number) => void;
  setPreviewUrlMap: (map: PreviewUrlMap) => void;
  registerPreviewUrl: RegisterPreviewUrl;
  visible: boolean;
  setVisible: (visible: boolean) => void;
}

export const PreviewGroupContext = createContext<PreviewGroupContextProps>({
  previewGroup: false,
  previewUrlMap: new Map(),
  infinite: true,
  currentId: 0,
  setCurrentId: () => null,
  setPreviewUrlMap: () => null,
  registerPreviewUrl: () => null,
  visible: false,
  setVisible: () => null,
});
