import React, { useEffect, useRef, useState } from 'react';
import { Button } from '@arco-design/web-react';
import styles from './index.module.less';
import cs from '../../../../utils/classNames';
import { EcosystemItem, TabItem } from '../../interface';
import { useInterval } from '../../../../hooks/useInterval';
import useHomeContext from '../../../../hooks/useHomeContext';

function ContentHeader({
  name,
  title,
  desc,
  href,
  handleClick,
}: {
  name: string;
  title: string;
  href?: string;
  desc?: string;
  handleClick?: () => void;
}) {
  const { lang } = useHomeContext();
  return (
    <div className={styles['content-header']}>
      <div className={styles['content-header-left']}>
        <div className={styles['content-header-name']}>{name}</div>
        <div className={styles['content-header-title']}>{title}</div>
        {desc && <div className={styles['content-header-description']}>{desc}</div>}
      </div>
      <div className={styles['content-header-right']}>
        {href && (
          <Button
            type="primary"
            href={href}
            target="_blank"
            className="home-btn"
            onClick={() => handleClick()}
          >
            {lang === 'zh-CN' ? '立即使用' : 'Goto'}
          </Button>
        )}
      </div>
    </div>
  );
}

export default function EcosystemTabList(props: {
  list: TabItem[];
  reportTea?: (params: EcosystemItem) => void;
}) {
  const { list, reportTea } = props;
  const tabRenderRecord = useRef(list.map((item) => item.name));
  const [activeTab, setActiveTab] = useState(list[0].name);
  const [parse, setParse] = useState(false);
  const contentRef = useRef<HTMLDivElement>();

  const slideToNext = () => {
    const nameList = list.map((item) => item.name);
    const currentIndex = nameList.indexOf(activeTab);
    const nextIndex = currentIndex + 1 >= nameList.length ? 0 : currentIndex + 1;
    setActiveTab(nameList[nextIndex]);
  };

  const activePlatform = list.find((item) => item.name === activeTab);

  const resetInterval = useInterval(
    () => {
      slideToNext();
    },
    !parse ? 10000 : null
  );

  const changeParse = (newValue) => {
    if (parse !== newValue) {
      setParse(newValue);
    }
  };

  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.addEventListener('mouseenter', () => changeParse(true));
      contentRef.current.addEventListener('mouseleave', () => changeParse(false));
    }
    return () => {
      contentRef.current.removeEventListener('mouseenter', () => changeParse(true));
      contentRef.current.removeEventListener('mouseleave', () => changeParse(false));
    };
  });
  return (
    <>
      <div className={styles.tabs}>
        {list.map((platform) => {
          const isActive = platform.name === activeTab;
          return (
            <div
              key={platform.name}
              className={cs(styles['tab-item'], {
                [`${styles['tab-item-active']}`]: isActive,
              })}
              onClick={() => {
                if (platform.name !== activeTab) {
                  setActiveTab(platform.name);
                  resetInterval();
                }
              }}
            >
              <div className={styles['tab-item-logo']}>
                {isActive ? platform.logo : platform.logoInActive}
              </div>
              <div className={styles['tab-item-name']}>{platform.name}</div>
              {platform.alias && <div className={styles['tab-item-title']}>{platform.alias}</div>}
            </div>
          );
        })}
      </div>
      <div className={styles['tab-content']}>
        {!activePlatform.headerLess && (
          <ContentHeader
            name={activePlatform.alias || activePlatform.name}
            title={activePlatform.slogan}
            desc={activePlatform.desc}
            href={activePlatform.href}
            handleClick={() => {
              reportTea({
                name: activePlatform.name,
                href: activePlatform.href,
                logo: undefined,
              });
            }}
          />
        )}
        <div ref={contentRef}>
          {React.cloneElement(activePlatform.content as JSX.Element, {
            isFirstRender: tabRenderRecord.current.indexOf(activeTab) > -1,
            onMounted: () => {
              tabRenderRecord.current = tabRenderRecord.current.filter((key) => key !== activeTab);
            },
          })}
        </div>
      </div>
    </>
  );
}
