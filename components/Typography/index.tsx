import OriginTypography from './typography';
import Title from './title';
import Text from './text';
import Paragraph from './paragraph';
import Ellipsis from './ellipsis';

const Typography = OriginTypography as typeof OriginTypography & {
  Title: typeof Title;
  Text: typeof Text;
  Paragraph: typeof Paragraph;
  Ellipsis: typeof Ellipsis;
};

Typography.Title = Title;
Typography.Text = Text;
Typography.Paragraph = Paragraph;
Typography.Ellipsis = Ellipsis;

export default Typography;

export {
  TypographyProps,
  TypographyTitleProps,
  TypographyParagraphProps,
  TypographyTextProps,
  TypographyEllipsisProps,
  EllipsisConfig,
} from './interface';
