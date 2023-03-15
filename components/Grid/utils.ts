import { GridItemData } from './interface';

export function resolveItemData(
  cols: number,
  { span, offset, suffix }: GridItemData
): GridItemData {
  const originSpan = span ?? 1;
  const originOffset = offset ?? 0;
  const minOffset = Math.min(originOffset, cols);
  const minSpan = Math.min(minOffset > 0 ? originSpan + originOffset : originSpan, cols);
  return {
    span: minSpan,
    offset: minOffset,
    suffix,
  };
}

export function setItemVisible({
  cols,
  collapsed,
  collapsedRows,
  itemDataList,
}: {
  cols: number;
  collapsed: boolean;
  collapsedRows: number;
  itemDataList: GridItemData[];
}) {
  let overflow = false;
  let displayIndexList: number[] = [];
  function isOverflow(span: number) {
    return Math.ceil(span / cols) > collapsedRows;
  }

  if (collapsed) {
    let spanSum = 0;
    for (let i = 0; i < itemDataList.length; i++) {
      if (itemDataList[i].suffix) {
        spanSum += itemDataList[i].span;
        displayIndexList.push(i);
      }
    }

    if (!isOverflow(spanSum)) {
      let current = 0;
      while (current < itemDataList.length) {
        const item = itemDataList[current];

        if (!item.suffix) {
          spanSum += item.span;

          if (isOverflow(spanSum)) {
            break;
          }

          displayIndexList.push(current);
        }

        current++;
      }
    }

    overflow = itemDataList.some(
      (item, index) => !item.suffix && !displayIndexList.includes(index)
    );
  } else {
    displayIndexList = itemDataList.map((_, index) => index);
  }

  return {
    overflow,
    displayIndexList,
  };
}
