import React from 'react';
import { teaLog } from '@arco-design/arco-site-utils';
import cs from '../../utils/classNames';
import CodeCopy from '../../components/CodeCopy';
import LogoWrapper from '../../components/LogoWrapper';
import styles from './style/index.module.less';
import IconDesign from '../../assets/ic_design.svg';
import IconDarkDesign from '../../assets/ic_dark_design.svg';
import IconCode from '../../assets/ic_code.svg';
import IconDarkCode from '../../assets/ic_dark_code.svg';
import LogoFigma from '../../assets/logo_Figma.svg';
import LogoFigmaW from '../../assets/logo_Figma_w.svg';
import useTheme from '../../hooks/useTheme';
import useLocale from '../../hooks/useLocale';
import { linkFigmaArcoComponent } from '../../constant/links';
import Section from '../../components/Section';
import { EventMap } from '../../utils/eventMap';

export default function QuickStart() {
  const { realTheme } = useTheme();
  const locale = useLocale();

  const renderDesignContent = () => {
    return (
      <div
        className={styles['design-terminal']}
        onClick={() => {
          window.open(linkFigmaArcoComponent);
          teaLog(EventMap.clickQuickStartBtn, {
            link: linkFigmaArcoComponent,
            name: `Figma ${locale['quickStart.block.design.componentResource.title']}`,
            target: '_blank',
          });
        }}
      >
        <div className={styles['design-figma-logo']}>
          {realTheme === 'dark' ? <LogoFigmaW /> : <LogoFigma />}
          <span className={styles['design-figma-logo-text']}>Figma</span>
        </div>
        <span className={styles['design-terminal-content']}>
          {locale['quickStart.block.design.componentResource.title']}
        </span>
      </div>
    );
  };

  const renderCodeContent = () => {
    return (
      <CodeCopy
        code={'npm i <span class="token-package">@arco-design/web-react</span>'}
        copyText="npm i @arco-design/web-react"
      />
    );
  };

  const data = [
    {
      title: locale['quickStart.block.design.title'],
      description: locale['quickStart.block.design.desc'],
      icon: realTheme === 'dark' ? <IconDarkDesign /> : <IconDesign />,
      content: renderDesignContent(),
    },
    {
      title: locale['quickStart.block.code.title'],
      description: locale['quickStart.block.code.desc'],
      icon: realTheme === 'dark' ? <IconDarkCode /> : <IconCode />,
      content: renderCodeContent(),
      isCardDark: true,
    },
  ];

  return (
    <Section
      headerProps={{
        title: locale['quickStart.title'],
        subTitle: 'Arco Design',
      }}
      addTracker
    >
      <div className={styles.wrapper} data-aos="scale-fade-in">
        {data.map(({ title, description, icon, content, isCardDark }) => (
          <div
            className={cs(styles.card, {
              [styles['card-dark']]: isCardDark,
            })}
            key={title}
          >
            <LogoWrapper className={styles['card-icon']} icon={icon} size="medium" theme />
            <div className={styles['card-title']}>{title}</div>
            <div className={styles['card-desc']}>{description}</div>
            <div className={styles['card-content']}>{content}</div>
          </div>
        ))}
      </div>
    </Section>
  );
}
