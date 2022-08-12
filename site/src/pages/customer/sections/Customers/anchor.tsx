import React, { CSSProperties, useEffect, useState } from 'react';
import { Anchor } from '@arco-design/web-react';
import { ShowCaseCardProps } from '../../../../hooks/useShowCase';
import styles from './styles/anchor.module.less';

const AnchorLink = Anchor.Link;

export default function (props: { list: ShowCaseCardProps[] }) {
  const { list = [] } = props;
  const [anchorStyle, setAnchorStyle] = useState<CSSProperties>({});

  const removeStyle = () => {
    setAnchorStyle({});
  };

  const addStyle = () => {
    setAnchorStyle({ position: 'fixed', top: '140px', width: '160px' });
  };

  const handleScroll = () => {
    const scrollTop = document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight;
    if (scrollTop < 580) {
      removeStyle();
    } else if (scrollTop > 580 && scrollTop < scrollHeight - 1200) {
      addStyle();
    } else {
      removeStyle();
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  return (
    <div className={styles['anchor-wrapper']}>
      <div style={anchorStyle}>
        <Anchor lineless boundary={100} affix={false} act>
          {list.map((item, index) => (
            <AnchorLink href={`#${item.title}`} title={item.title} key={index} />
          ))}
        </Anchor>
      </div>
    </div>
  );
}
