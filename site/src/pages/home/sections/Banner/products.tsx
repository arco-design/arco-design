import React, { CSSProperties, useRef, useState, useEffect } from 'react';
import shuffle from 'lodash.shuffle';
import useTheme from '../../hooks/useTheme';
import cs from '../../utils/classNames';
import logoList from '../../assets/products';
import styles from './style/products.module.less';
import useLocale from '../../hooks/useLocale';
import AnimationIcon from './animationIcon';

interface ProductsProps {
  style?: CSSProperties;
  className?: string | string[];
}

const allList = logoList.map((_, index) => index);
// 获得一个打乱的位置数组
function getReplaceOrderList(len: number) {
  const array = new Array(len).fill(null).map((_, index) => index);
  return shuffle(array);
}

// 获取一个候补替换数组，与当前元素数组完全互异，但是长度相同。
function getNotCurrentList(allList: number[], currentList: number[]) {
  const notItemList = allList.filter((icon) => !currentList.includes(icon));
  const result = new Array(allList.length).fill(null);
  result.forEach((_, index) => {
    result[index] = notItemList[index % notItemList.length];
  });
  return result;
}

export default function BannerProducts(props: ProductsProps) {
  const { style, className } = props;
  const classNames = cs(styles.products, className);
  const locale = useLocale();
  const { realTheme } = useTheme();
  const [displayList, setDisplayList] = useState([]);
  const wrapperRef = useRef<HTMLDivElement>();
  const recordRef = useRef<{
    indexOfAll: number;
    indexOfReplace: number;
    replaceOrderList: number[];
    animationIcon: number;
    inAnimation: boolean;
  }>({
    indexOfAll: 0,
    indexOfReplace: 0,
    replaceOrderList: [],
    animationIcon: null,
    inAnimation: false,
  });

  function onAnimationComplete() {
    const { indexOfAll, indexOfReplace, replaceOrderList } = recordRef.current;

    const notCurrentList = getNotCurrentList(allList, displayList);
    const replaceIndex = replaceOrderList[indexOfReplace];
    const replaceIcon = notCurrentList[indexOfAll];

    recordRef.current.animationIcon = replaceIcon;

    setDisplayList((pre) => {
      pre[replaceIndex] = replaceIcon;
      return [...pre];
    });

    const nextIndexOfAll = (indexOfAll + 1) % notCurrentList.length;
    const nextIndexOfReplace = (indexOfReplace + 1) % replaceOrderList.length;

    recordRef.current.indexOfAll = nextIndexOfAll;
    recordRef.current.indexOfReplace = nextIndexOfReplace;

    if (indexOfReplace === 0) {
      const nextReplaceOrderList = getReplaceOrderList(replaceOrderList.length);
      if (replaceIndex === nextReplaceOrderList[nextIndexOfReplace]) {
        [nextReplaceOrderList[0], nextReplaceOrderList[1]] = [
          nextReplaceOrderList[1],
          nextReplaceOrderList[0],
        ];
      }
      recordRef.current.replaceOrderList = nextReplaceOrderList;
    }
  }

  useEffect(() => {
    let count = 8;
    if (wrapperRef.current) {
      const { width } = wrapperRef.current.getBoundingClientRect();
      count = Math.min(Math.floor(width / 111), 8);
    }

    const displayList = allList.slice(0, count);
    recordRef.current.indexOfAll = count;
    recordRef.current.replaceOrderList = getReplaceOrderList(count);
    setDisplayList(displayList);

    setTimeout(() => {
      onAnimationComplete();
    }, 800);
  }, []);

  return (
    <div className={classNames} style={style} ref={wrapperRef}>
      <p className={styles['products-text']}>{locale['banner.product.desc']}</p>
      <ul className={styles['products-logo-wall']} style={{ marginTop: 24 }}>
        {displayList.map((icon, index) => {
          const logo = logoList[icon];
          const isDark = realTheme === 'dark';
          // const Logo: any = isDark ? logo.dark : logo.color;
          const LogoNormalDisplay: any = isDark ? logo.dark : logo.color;
          const animation =
            !recordRef.current.inAnimation && recordRef.current.animationIcon === icon;
          return (
            <li className={styles['products-logo-wall-item']} key={index}>
              {/* <div className={styles['products-logo-wall-item-logo']}>
                <Logo />
              </div> */}
              <AnimationIcon
                icon={<LogoNormalDisplay />}
                animation={animation}
                className={styles['products-logo-wall-item-logo']}
                onStart={() => {
                  if (icon !== recordRef.current.animationIcon) return;
                  recordRef.current.inAnimation = true;
                }}
                onComplete={() => {
                  if (icon !== recordRef.current.animationIcon) return;
                  recordRef.current.inAnimation = false;
                  onAnimationComplete();
                }}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
}
