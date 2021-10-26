import React from 'react';
import { Carousel } from '@arco-design/web-react';
import Section from '../../components/Section';
import styles from './style/index.module.less';
import ShowCaseCard from './components/Card';
import useLocale from '../../hooks/useLocale';
import useShowcaseData from '../../../../hooks/useShowCase';

export default function ShowCase() {
  const locale = useLocale();
  const data = useShowcaseData();
  const homeShowCase = data.filter((item) => item.homePage);
  return (
    <div className={styles.wrapper}>
      <div className={styles['back-level-1']} />
      <div className={styles['back-level-2']} />
      <Section
        headerProps={{
          title: locale['showCase.title'],
          subTitle: locale['showCase.subTitle'],
          inDark: true,
        }}
        className={styles['section-wrapper']}
      >
        <Carousel
          animation="card"
          indicatorPosition="outer"
          style={{
            height: 440,
          }}
        >
          {homeShowCase.map((item, index) => (
            <div key={index}>
              <ShowCaseCard {...item} />
            </div>
          ))}
        </Carousel>
      </Section>
    </div>
  );
}
