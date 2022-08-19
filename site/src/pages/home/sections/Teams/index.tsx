import React, { useEffect, useState, CSSProperties } from 'react';
import { Divider, Button, Carousel, Space } from '@arco-design/web-react';
import { IconClose } from '@arco-design/web-react/icon';
import { teaLog } from '@arco-materials/site-utils';
import LogoArco from '../../assets/logo_ArcoDesign.svg';
import LogoDarkArco from '../../assets/logo_dark_ArcoDesign.svg';
import logoList from '../../assets/products';
import styles from './style/index.module.less';
import useTheme from '../../hooks/useTheme';
import useLocale from '../../hooks/useLocale';
import useIsMobile from '../../utils/useIsMobile';
import StartBtn from '../../components/StartBtn';
import { linkShowCase } from '../../constant/links';
import { EventMap } from '../../utils/eventMap';

const reviews = [
  {
    name: 'YangYu',
    position: '前端开发',
    content: 'Arco 的`文档`写得挺清晰的，还有问题响应速度和 API 会让我用的比较舒服。',
  },
  {
    name: 'MuXin',
    position: '设计师',
    content:
      '更贴近我们使用，`Oncall`比较及时，除了一些特殊需求的话，基本上能满足我们 90% 以上的需求。',
  },
  {
    name: 'XiaoJi',
    position: '前端开发',
    content: '大部分`API接口`就是用着挺舒服的，满足了 95% 的业务需求。',
  },
  {
    name: 'QingFeng',
    position: '产品经理',
    content:
      'Arco 会给我`更年轻`的那种感觉，优点的话，我感觉就要比其他的方便一些。就公司内部来说吧，就是`响应会更及时`，然后提出一些问题解决的也会比较快。',
  },
  {
    name: 'Richie Xu',
    position: '前端开发',
    content:
      '的确节省一些`开发时间`，不用去关心那个组件本身的逻辑，直接去写业务方面逻辑就可以了，这方面还是挺方便的。',
  },
  {
    name: 'ChuYi',
    position: '前端开发',
    content: '`反馈渠道`蛮好的，跟 Arco 开发同学直接反馈，修复也比较快。',
  },
  {
    name: 'JiaAn',
    position: '产品经理',
    content: '和设计师`沟通更顺畅`，避免了很多视觉细节需要去频繁的跟设计师去讨论。',
  },
  {
    name: 'WenTong',
    position: '前端开发',
    content: '风格和更贴近字节的网页风格，更加`简洁克制`。',
  },

  {
    name: 'YangYu',
    position: '前端开发',
    content: 'Arco 的`文档`写得挺清晰的，还有问题响应速度和 API 会让我用的比较舒服。',
  },
  {
    name: 'MuXin',
    position: '设计师',
    content:
      '更贴近我们使用，`Oncall`比较及时，除了一些特殊需求的话，基本上能满足我们 90% 以上的需求。',
  },
  {
    name: 'XiaoJi',
    position: '前端开发',
    content: '大部分`API接口`就是用着挺舒服的，满足了 95% 的业务需求。',
  },
  {
    name: 'QingFeng',
    position: '产品经理',
    content:
      'Arco 会给我`更年轻`的那种感觉，优点的话，我感觉就要比其他的方便一些。就公司内部来说吧，就是`响应会更及时`，然后提出一些问题解决的也会比较快。',
  },
];
export default function Teams() {
  const locale = useLocale();
  const { realTheme } = useTheme();
  const [logoOffset, setLogoOffset] = useState(0);
  const [isAnimate, setIsAnimate] = useState(true);
  const length = logoList.length;
  const isMobile = useIsMobile();

  useEffect(() => {
    const timer = window.setTimeout(() => {
      if (!isAnimate) {
        setIsAnimate(true);
      }
      setLogoOffset(logoOffset - 32);
    }, 3000);
    return () => {
      window.clearTimeout(timer);
    };
  }, [logoOffset]);

  const handleTransitionEnd = () => {
    if (logoOffset <= -(32 * length)) {
      setIsAnimate(false);
      setLogoOffset(0);
    }
  };

  const reportTea = (params) => {
    teaLog(EventMap.clickTeamsBtn, params);
  };

  const renderReviewBox = (data, key?, style?: CSSProperties) => {
    return (
      <div className={styles['teams-review-box']} key={key} style={style}>
        <div
          className={styles['teams-review-box-content']}
          dangerouslySetInnerHTML={{
            __html: data.content.replace(
              /`(.+?)`/g,
              `<span class="${styles['text-marked']}">$1</span>`
            ),
          }}
        />
        <div className={styles['teams-review-box-info']}>
          <span className={styles['teams-review-box-name']}>@{data.name}</span>
          <span className={styles['teams-review-box-position']}>{data.position}</span>
        </div>
      </div>
    );
  };

  const renderReviewList = () => {
    if (isMobile) {
      return (
        <Carousel
          indicatorPosition="outer"
          style={{
            width: '100%',
            height: 184,
          }}
        >
          {reviews.map((item, index) => (
            <div key={index}>{renderReviewBox(item, index, { width: '80%' })}</div>
          ))}
        </Carousel>
      );
    }

    return (
      <ul className={styles['teams-review-list']}>
        {reviews.map((item, index) => (
          <li className={styles['teams-review-item']} key={index}>
            {renderReviewBox(item)}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className={styles['section-wrapper']} data-tracker-name={locale['teams.slogan']}>
      <div className={styles['section-content']}>
        <div className={styles['teams-body-left']}>
          <div className={styles['teams-logo']}>
            {realTheme === 'dark' ? <LogoDarkArco /> : <LogoArco />}
            <IconClose className={styles['teams-logo-close']} />
            <div className={styles['teams-logo-teams']}>
              <ul
                className={styles['teams-logo-list']}
                style={{
                  top: logoOffset,
                  transition: isAnimate ? 'top ease-out 300ms' : 'none',
                }}
                onTransitionEnd={handleTransitionEnd}
              >
                {logoList.concat(logoList[0]).map((item, index) => {
                  const Icon = realTheme === 'dark' ? item.dark : item.color;
                  return (
                    <li className={styles['teams-logo-item']} key={index}>
                      <Icon className={styles['teams-logo-item-logo']} />
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
          <div className={styles['teams-title']}>{locale['teams.slogan']}</div>
          <div className={styles['teams-count']}>
            <div className={styles['teams-count-item']}>
              <div className={styles['teams-count-number']}>4,000+</div>
              <div className={styles['teams-count-name']}>{locale['teams.projects']}</div>
            </div>
            <Divider type="vertical" className={styles['teams-count-divider']} />
            <div className={styles['teams-count-item']}>
              <div className={styles['teams-count-number']}>210 W+</div>
              <div className={styles['teams-count-name']}>{locale['teams.download']}</div>
            </div>
          </div>
          <Space className={styles['teams-bottom']} size={12}>
            <StartBtn className={styles['teams-bottom-btn']} reportTea={reportTea} />
            <Button
              className={`home-btn ${styles['teams-bottom-btn']}`}
              type="secondary"
              href={linkShowCase}
              onClick={() => {
                reportTea({
                  name: locale['banner.showcase'],
                  link: linkShowCase,
                  target: '_self',
                });
              }}
            >
              {locale['teams.showcase']}
            </Button>
          </Space>
        </div>
        <div className={styles['teams-body-right']}>{renderReviewList()}</div>
      </div>
    </div>
  );
}
