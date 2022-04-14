import React, { useEffect, useRef } from 'react';
import anime from 'animejs';

export default () => {
  const refBall1 = useRef<SVGCircleElement>();
  const refBall2 = useRef<SVGCircleElement>();
  const refPath1 = useRef<SVGPathElement>();
  const refPath2 = useRef<SVGPathElement>();

  function removeInitialPosition(ball: SVGCircleElement) {
    ball.removeAttribute('cx');
    ball.removeAttribute('cy');
  }

  useEffect(() => {
    if (!refBall1.current || !refBall2.current || !refPath1.current || !refPath2.current) return;
    const path1 = anime.path(refPath1.current);
    const path2 = anime.path(refPath2.current);
    removeInitialPosition(refBall1.current);
    removeInitialPosition(refBall2.current);

    anime({
      targets: refBall2.current,
      translateX: path2('x'),
      translateY: path2('y'),
      easing: 'linear',
      duration: 10000,
      loop: 100,
    });
    anime({
      targets: refBall1.current,
      translateX: path1('x'),
      translateY: path1('y'),
      easing: 'linear',
      duration: 6000,
      loop: 100,
    });
  }, []);

  return (
    <svg
      width="125"
      height="117"
      viewBox="0 0 125 117"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M83.8395 58.1957C83.8395 74.1393 81.3312 88.5106 77.3239 98.8453C75.3185 104.017 72.9647 108.108 70.4216 110.882C67.8795 113.655 65.2548 115.006 62.6594 115.006C60.0641 115.006 57.4393 113.655 54.8972 110.882C52.3542 108.108 50.0004 104.017 47.995 98.8453C43.9876 88.5106 41.4794 74.1393 41.4794 58.1957C41.4794 42.2521 43.9876 27.8808 47.995 17.5461C50.0004 12.3742 52.3542 8.28359 54.8972 5.50965C57.4393 2.73668 60.0641 1.38561 62.6594 1.38561C65.2548 1.38561 67.8795 2.73668 70.4216 5.50965C72.9647 8.28359 75.3185 12.3742 77.3239 17.5461C81.3312 27.8808 83.8395 42.2521 83.8395 58.1957Z"
        stroke="white"
        strokeWidth="2.77122"
      />
      <path
        d="M52.068 76.5376C38.2605 68.5658 27.0687 59.2079 20.1222 50.5701C16.646 46.2474 14.2803 42.1636 13.1495 38.5743C12.0191 34.9863 12.1614 32.0377 13.4591 29.79C14.7568 27.5424 17.2392 25.9449 20.9117 25.1298C24.5855 24.3144 29.305 24.3213 34.7867 25.1705C45.7405 26.8674 59.4406 31.8808 73.2481 39.8526C87.0556 47.8244 98.2474 57.1823 105.194 65.8201C108.67 70.1428 111.036 74.2265 112.167 77.8158C113.297 81.4039 113.155 84.3525 111.857 86.6001C110.559 88.8478 108.077 90.4453 104.404 91.2604C100.731 92.0757 96.0111 92.0689 90.5294 91.2197C79.5756 89.5228 65.8755 84.5093 52.068 76.5376Z"
        stroke="white"
        strokeWidth="2.77122"
        ref={refPath2}
      />
      <path
        d="M73.2503 76.5376C87.0579 68.5658 98.2497 59.2079 105.196 50.5701C108.672 46.2474 111.038 42.1636 112.169 38.5743C113.299 34.9863 113.157 32.0377 111.859 29.79C110.562 27.5424 108.079 25.9449 104.407 25.1298C100.733 24.3144 96.0133 24.3213 90.5317 25.1705C79.5779 26.8674 65.8778 31.8808 52.0703 39.8526C38.2627 47.8244 27.0709 57.1823 20.1245 65.8201C16.6482 70.1428 14.2825 74.2265 13.1517 77.8158C12.0214 81.4039 12.1636 84.3525 13.4613 86.6001C14.759 88.8478 17.2414 90.4453 20.914 91.2604C24.5878 92.0757 29.3073 92.0689 34.7889 91.2197C45.7427 89.5228 59.4428 84.5093 73.2503 76.5376Z"
        stroke="white"
        strokeWidth="2.77122"
        ref={refPath1}
      />
      <circle cx="62.2718" cy="58.1951" r="6.92806" fill="white" />
      <circle cx="109.082" cy="45.3638" r="4.90386" fill="white" ref={refBall1} />
      <circle cx="34.9039" cy="24.9039" r="4.90386" fill="white" ref={refBall2} />
    </svg>
  );
};
