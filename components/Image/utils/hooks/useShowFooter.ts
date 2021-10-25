import { ImageProps } from '../../interface';

interface ShowFooterProps {
  title: ImageProps['title'];
  description: ImageProps['description'];
  actions: ImageProps['actions'];
}

export default function useShowFooter(props: ShowFooterProps) {
  const { title, description, actions } = props;
  const showCaption = title || description;
  const showActions = actions && actions.length;
  const showFooter = showCaption || showActions;
  return [showFooter, showCaption, showActions];
}
