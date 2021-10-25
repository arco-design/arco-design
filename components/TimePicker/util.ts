import BTween from 'b-tween';

export function getColumnsFromFormat(format) {
  const units = ['H', 'h', 'm', 's', 'a', 'A'];
  const list: string[] = [];
  let use12Hours = false;
  units.forEach((unit) => {
    if (format.indexOf(unit) !== -1) {
      list.push(unit);
      if (unit === 'a' || unit === 'A') {
        use12Hours = true;
      }
    }
  });
  return {
    list,
    use12Hours,
  };
}

const scrollIds = new Map<HTMLElement, number>();

export function scrollTo(element: HTMLElement, to: number, duration: number) {
  if (scrollIds.get(element)) {
    cancelAnimationFrame(scrollIds.get(element));
  }

  if (duration <= 0) {
    element.scrollTop = to;
  }

  scrollIds.set(
    element,
    requestAnimationFrame(() => {
      const tween = new BTween({
        from: { scrollTop: element.scrollTop },
        to: { scrollTop: to },
        duration,
        onUpdate: (keys) => {
          element.scrollTop = keys.scrollTop;
        },
        easing: 'quartInOut',
      });
      tween.start();
    })
  );
}
