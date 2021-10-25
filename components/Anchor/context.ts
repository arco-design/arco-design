import { createContext } from 'react';

interface AnchorContext {
  currentLink: string;
  onLinkClick: (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, href: string) => void;
  addLink: (href: string, node: HTMLElement) => void;
  removeLink: (href: string) => void;
}

export default createContext<AnchorContext>({
  currentLink: '',
  onLinkClick: () => {},
  addLink: () => {},
  removeLink: () => {},
});
