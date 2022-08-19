import React, { CSSProperties, ReactNode, useEffect, useRef, useState } from 'react';
import cs from '../../utils/classNames';
import styles from './style/index.module.less';

interface EditorSkinProps {
  style?: CSSProperties;
  className?: string | string[];
  lineNumberStart?: number;
  lineNumberEnd?: number;
  lineNumber?: number;
  tabs?: boolean;
  bodyStyle?: CSSProperties;
  defaultTab?: number;
  activeTab?: number;
  onChange?: (number) => void;
  showHeader?: boolean;
  children: ReactNode;
  animation?: boolean;
}

export default function EditorSkin(props: EditorSkinProps) {
  const { className, style, bodyStyle } = props;
  const classNames = cs(styles['editor-skin'], className);
  const [tabIndex, setTabIndex] = useState(props.defaultTab ?? 0);
  const contentRef = useRef<HTMLDivElement>(null);

  const showTabs = props.tabs ?? true;
  const showHeader = props.showHeader ?? true;
  const activeTab = props.activeTab ?? tabIndex;

  const tabs = [];
  const lineNumbers = [];
  const children = [].concat(props.children);

  const hideContent = () => {
    const lines = Array.from(contentRef.current.querySelectorAll('p'));
    for (const item of lines) {
      item.setAttribute('style', 'visibility:hidden');
    }
  };

  const showNextLine = () => {
    const line = contentRef.current.querySelector('p[style="visibility:hidden"]');
    if (line) {
      line.setAttribute('style', 'visibility:visible');
      window.setTimeout(showNextLine, 300);
    } else {
      const lastLine = contentRef.current.querySelector('p[style="visibility:visible"]:last-child');
      if (lastLine) {
        const lastElement = lastLine.lastElementChild;
        if (lastElement) {
          const cls = lastElement.getAttribute('class');
          window.setTimeout(() => {
            lastElement.setAttribute('class', `${cls} editor-skin-typing`);
            window.setTimeout(() => {
              lastElement.setAttribute('class', cls);
            }, 2000);
          }, 200);
        }
      }
    }
  };

  useEffect(() => {
    if (props.animation) {
      hideContent();
      document.addEventListener('aos:in:skin-content', showNextLine);
      return () => document.removeEventListener('aos:in:skin-content', showNextLine);
    }
  }, []);

  for (const child of children) {
    tabs.push((child.props as EditorPanelProps).title);
    lineNumbers.push({
      lineNumberStart: (child.props as EditorPanelProps).lineNumberStart,
      lineNumberEnd: (child.props as EditorPanelProps).lineNumberEnd,
      lineNumber: (child.props as EditorPanelProps).lineNumber,
    });
  }

  const renderLineNumber = () => {
    const list = [];
    const start = props.lineNumberStart ?? lineNumbers[activeTab].lineNumberStart ?? 1;
    const end =
      props.lineNumberEnd ??
      lineNumbers[activeTab].lineNumberEnd ??
      start + (props.lineNumber ?? lineNumbers[activeTab].lineNumber) - 1;

    for (let i = start; i <= end; i++) {
      list.push(
        <li className={styles['editor-skin-line-number']} key={i}>
          {i}
        </li>
      );
    }
    return list;
  };

  const handleClick = (index: number) => {
    setTabIndex(index);

    if (typeof props.onChange === 'function') {
      props.onChange(index);
    }
  };

  return (
    <div className={classNames} style={style}>
      {showHeader && (
        <div className={styles['editor-skin-header']}>
          <div className={styles['editor-skin-header-btn-group']}>
            <span className={`${styles['editor-skin-header-btn']} ${styles.red}`} />
            <span className={`${styles['editor-skin-header-btn']} ${styles.yellow}`} />
            <span className={`${styles['editor-skin-header-btn']} ${styles.green}`} />
          </div>
          {showTabs && (
            <div className={styles['editor-skin-tab']}>
              {tabs?.map((item, index) => (
                <span
                  className={cs(styles['editor-skin-tab-name'], {
                    [styles['editor-skin-tab-active']]: index === activeTab,
                  })}
                  key={index}
                  onClick={() => handleClick(index)}
                >
                  {item}
                </span>
              ))}
            </div>
          )}
        </div>
      )}
      <div className={styles['editor-skin-body']} style={bodyStyle}>
        <ul className={styles['editor-skin-line-numbers']}>{renderLineNumber()}</ul>
        <div
          className={styles['editor-skin-content']}
          ref={contentRef}
          data-aos="skin-content"
          data-aos-id="skin-content"
        >
          {children[activeTab]}
        </div>
      </div>
    </div>
  );
}

interface EditorPanelProps {
  // eslint-disable-next-line react/no-unused-prop-types
  title?: string;
  language?: string;
  children: ReactNode;
  // eslint-disable-next-line react/no-unused-prop-types
  lineNumberStart?: number;
  // eslint-disable-next-line react/no-unused-prop-types
  lineNumberEnd?: number;
  // eslint-disable-next-line react/no-unused-prop-types
  lineNumber?: number;
}

export function EditorPanel(props: EditorPanelProps) {
  const { language = 'language-javascript' } = props;

  return <div className={language}>{props.children}</div>;
}
