import { createContext } from 'react';
import { AnchorProps } from '..';

interface AnchorContext {
  currentLink: string;
  onLinkClick: (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, href: string) => void;
  addLink: (href: string, node: HTMLElement) => void;
  removeLink: (href: string) => void;
  direction: AnchorProps['direction'];
}

export default createContext<AnchorContext>({
  direction: 'vertical',
  currentLink: '',
  onLinkClick: () => {},
  addLink: () => {},
  removeLink: () => {},
});
