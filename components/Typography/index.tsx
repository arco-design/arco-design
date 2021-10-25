import OriginTypography from './typography';
import Title from './title';
import Text from './text';
import Paragraph from './paragraph';

const Typography = OriginTypography as typeof OriginTypography & {
  Title: typeof Title;
  Text: typeof Text;
  Paragraph: typeof Paragraph;
};

Typography.Title = Title;
Typography.Text = Text;
Typography.Paragraph = Paragraph;

export default Typography;

export {
  TypographyProps,
  TypographyTitleProps,
  TypographyParagraphProps,
  TypographyTextProps,
  EllipsisConfig,
} from './interface';
