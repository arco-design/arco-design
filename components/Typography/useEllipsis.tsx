import React, { useMemo, useRef, useState, CSSProperties } from 'react';
import useUpdate from '../_util/hooks/useUpdate';
import throttleByRaf from '../_util/throttleByRaf';
import { isNumber, isString } from '../_util/is';
import { EllipsisConfig } from './interface';
import useIsomorphicLayoutEffect from '../_util/hooks/useIsomorphicLayoutEffect';

interface IEllipsis extends EllipsisConfig {
  width: number;
  renderMeasureContent: (slicedNode, isEllipsis: boolean) => React.ReactNode;
  expanding?: boolean;
  simpleEllipsis?: boolean;
}

// line-height baseline
const MEASURE_LINE_HEIGHT_TEXT = 'hxj';

export enum MEASURE_STATUS {
  INIT = 0,
  BEFORE_MEASURE = 1,
  MEASURING = 2,
  MEASURE_END = 3,
  NO_NEED_ELLIPSIS = 4,
}

function useEllipsis(props: React.PropsWithChildren<IEllipsis>) {
  const {
    children,
    rows = 1,
    width,
    expanding,
    renderMeasureContent,
    simpleEllipsis,
    onEllipsis,
    suffix,
    expandNodes,
    expandable,
    ellipsisStr,
  } = props;
  const singleRowNode = useRef<HTMLDivElement>();
  const mirrorNode = useRef<HTMLDivElement>();
  const [binarySearchIndex, setBinarySearchIndex] = useState([0, 0, 0]);
  const [lineHeight, setLineHeight] = useState(0);
  const [status, setStatus] = useState(MEASURE_STATUS.NO_NEED_ELLIPSIS);
  const [startLoc, midLoc, endLoc] = binarySearchIndex;
  const [isEllipsis, setIsEllipsis] = useState(false);

  const nodeList = useMemo(() => React.Children.toArray(children), [children]);
  const closedLoc = useRef(0);
  useUpdate(() => {
    onEllipsis && onEllipsis(isEllipsis);
  }, [isEllipsis]);

  const isSimpleNode = (node) => {
    return isString(node) || isNumber(node);
  };

  const getTotalLen = (list: typeof nodeList) => {
    let total = 0;
    list.forEach((node) => {
      if (isSimpleNode(node)) {
        total += String(node).length;
      } else {
        total += 1;
      }
    });
    return total;
  };

  const totalLen = useMemo(() => getTotalLen(nodeList), [nodeList]);

  const updateSearchIndex = throttleByRaf((searchIndex) => setBinarySearchIndex(searchIndex));

  const getSlicedNode = (sliceLen: number) => {
    const slicedNode: React.ReactNode[] = [];
    let currentLen = 0;
    if (sliceLen >= totalLen) {
      return nodeList;
    }
    for (const index in nodeList) {
      const node = nodeList[index];
      if (currentLen >= sliceLen) {
        return slicedNode;
      }
      const currentNodeLen = isSimpleNode(node) ? String(node).length : 1;
      if (currentNodeLen > sliceLen - currentLen) {
        slicedNode.push(String(node).slice(0, sliceLen - currentLen));
        currentLen = sliceLen;
        return slicedNode;
      }
      currentLen += currentNodeLen;
      slicedNode.push(node);
    }
    return slicedNode;
  };

  const measure = () => {
    if (lineHeight) {
      if (status === MEASURE_STATUS.INIT) {
        const maxHeight = rows * lineHeight;
        const mirrorHeight = mirrorNode.current?.offsetHeight;
        const currentEllipsis = mirrorHeight > maxHeight;
        // simpleEllipsis 和 expanding 情况下: 只用判断空间是否足够，不用计算折叠零界
        if (!currentEllipsis || simpleEllipsis || expanding) {
          setStatus(MEASURE_STATUS.MEASURE_END);
          setIsEllipsis(currentEllipsis);
          setBinarySearchIndex([0, totalLen, totalLen]);
        } else {
          setIsEllipsis(true);
          setStatus(MEASURE_STATUS.BEFORE_MEASURE);
        }
      } else if (status === MEASURE_STATUS.BEFORE_MEASURE) {
        const totalWidth = singleRowNode?.current.offsetWidth;
        const closedWidth = rows * width;
        if (totalWidth > rows * width) {
          const startRatio = Math.max(closedWidth / totalWidth - 0.1, 0);
          const endRatio = Math.min(closedWidth / totalWidth + 0.1, 1);
          const closedStartLoc = Math.floor(startRatio * totalLen);
          const closedEndLoc = Math.ceil(endRatio * totalLen);
          const closedMiddleLoc = Math.floor((closedStartLoc + closedEndLoc) / 2);
          closedLoc.current = closedMiddleLoc;
        }
        setStatus(MEASURE_STATUS.MEASURING);
      } else if (status === MEASURE_STATUS.MEASURING) {
        if (startLoc !== endLoc - 1) {
          const mirrorHeight = mirrorNode.current?.offsetHeight;
          const maxHeight = rows * lineHeight;
          let nextStartLoc = startLoc;
          let nextEndLoc = endLoc;
          if (mirrorHeight <= maxHeight) {
            nextStartLoc = midLoc;
          } else {
            nextEndLoc = midLoc;
          }
          const nextMidLoc = Math.floor((nextEndLoc + nextStartLoc) / 2);
          updateSearchIndex([nextStartLoc, nextMidLoc, nextEndLoc]);
        } else {
          updateSearchIndex([startLoc, startLoc, startLoc]);
          setStatus(MEASURE_STATUS.MEASURE_END);
        }
      }
    }
  };

  useIsomorphicLayoutEffect(() => {
    if (props.rows && width) {
      setBinarySearchIndex([0, Math.floor(totalLen / 2), totalLen]);
      setStatus(MEASURE_STATUS.INIT);
    } else {
      setStatus(MEASURE_STATUS.NO_NEED_ELLIPSIS);
    }
  }, [
    totalLen,
    simpleEllipsis,
    expanding,
    width,
    suffix,
    expandNodes,
    expandable,
    ellipsisStr,
    props.rows,
  ]);

  useIsomorphicLayoutEffect(() => {
    if (singleRowNode.current && status === MEASURE_STATUS.INIT) {
      const offsetHeight = singleRowNode.current.offsetHeight;
      setLineHeight(offsetHeight);
    }
  }, [status]);

  useIsomorphicLayoutEffect(() => {
    measure();
  }, [status, midLoc, startLoc, endLoc, lineHeight]);

  const basicStyle: CSSProperties = {
    zIndex: -999,
    position: 'fixed',
    opacity: 0,
    padding: 0,
    margin: 0,
  };

  const singleRowNodeStyle: CSSProperties = {
    whiteSpace: 'nowrap',
    ...basicStyle,
  };

  // 用css省略的话，需要覆盖单行省略样式
  const mirrorNodeStyle: CSSProperties = simpleEllipsis
    ? {
        textOverflow: 'clip',
        ...basicStyle,
      }
    : basicStyle;

  let ellipsisNode;
  if (status === MEASURE_STATUS.INIT || status === MEASURE_STATUS.BEFORE_MEASURE) {
    ellipsisNode = (
      <div>
        <div ref={singleRowNode} style={singleRowNodeStyle}>
          {status === MEASURE_STATUS.INIT
            ? MEASURE_LINE_HEIGHT_TEXT
            : renderMeasureContent(children, false)}
        </div>
        <div ref={mirrorNode} style={{ width, ...mirrorNodeStyle }}>
          {renderMeasureContent(children, isEllipsis)}
        </div>
      </div>
    );
    ellipsisNode = ellipsisNode.props.children;
  } else if (status === MEASURE_STATUS.MEASURING) {
    // 计算过程中的占位展示，避免计算造成的抖动
    // 不能设置 width 否则在 table 中会再次造成 resize
    const showStyle = {
      height: lineHeight * rows,
      overflow: 'hidden',
    };
    ellipsisNode = (
      <div>
        <div ref={mirrorNode} style={{ width, ...mirrorNodeStyle }}>
          {renderMeasureContent(getSlicedNode(midLoc), isEllipsis)}
        </div>
        <div style={showStyle}>{getSlicedNode(closedLoc.current)}</div>
      </div>
    );
    ellipsisNode = ellipsisNode.props.children;
  } else if (status === MEASURE_STATUS.MEASURE_END) {
    ellipsisNode = renderMeasureContent(getSlicedNode(midLoc), isEllipsis);
  } else if (status === MEASURE_STATUS.NO_NEED_ELLIPSIS) {
    ellipsisNode = renderMeasureContent(children, false);
  }
  return { ellipsisNode, isEllipsis, measureStatus: status };
}

export default useEllipsis;
