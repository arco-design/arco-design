import { MentionsProps } from './interface';

interface MeasureIndex {
  location: number;
  prefix: string;
}

export function isValidSearch(text: string, { split }: MentionsProps): boolean {
  return !split || text.indexOf(split) === -1;
}

export function getBeforeSelectionText({ value, selectionStart }: HTMLTextAreaElement) {
  return value.slice(0, selectionStart);
}

export function getLastMeasureIndex(text: string, prefix: string | string[] = ''): MeasureIndex {
  const prefixList: string[] = Array.isArray(prefix) ? prefix : [prefix];
  return prefixList.reduce(
    (lastMatch: MeasureIndex, prefixStr): MeasureIndex => {
      const lastIndex = text.lastIndexOf(prefixStr);
      return lastIndex > lastMatch.location
        ? {
            location: lastIndex,
            prefix: prefixStr,
          }
        : lastMatch;
    },
    { location: -1, prefix: '' }
  );
}
