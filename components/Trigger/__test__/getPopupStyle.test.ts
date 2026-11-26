import getPopupStyle from '../getPopupStyle';
import { TriggerProps } from '../interface';

const rect = (left: number, top: number, width: number, height: number) => ({
  left,
  top,
  width,
  height,
  right: left + width,
  bottom: top + height,
  x: left,
  y: top,
  toJSON: () => ({}),
});

const allSides = { left: 12, right: 12, top: 12, bottom: 12 };

function positionPopup(
  props: TriggerProps,
  left: number,
  top: number,
  { popupWidth = 200, popupHeight = 80, containerLeft = 0, containerTop = 0 } = {}
) {
  const anchor = document.createElement('button');
  anchor.getBoundingClientRect = () => rect(left, top, 40, 32);
  const container = document.createElement('div');
  container.getBoundingClientRect = () => rect(containerLeft, containerTop, 1000, 0);
  const popup = document.createElement('span');
  Object.defineProperties(popup, {
    offsetWidth: { value: popupWidth },
    offsetHeight: { value: popupHeight },
    clientHeight: { value: popupHeight },
  });
  return getPopupStyle(
    { position: 'top', autoFitPosition: true, showArrow: true, ...props },
    popup,
    anchor,
    container,
    { clientX: left, clientY: top }
  );
}

describe('Trigger viewport boundary distances', () => {
  const originalWidth = Object.getOwnPropertyDescriptor(window, 'innerWidth');
  const originalHeight = Object.getOwnPropertyDescriptor(window, 'innerHeight');

  beforeAll(() => {
    Object.defineProperties(window, { innerWidth: { value: 1000 }, innerHeight: { value: 800 } });
  });

  afterAll(() => {
    Object.defineProperties(window, { innerWidth: originalWidth, innerHeight: originalHeight });
  });

  it('preserves legacy positioning and arrow coordinates with the switch omitted or off', () => {
    const props: TriggerProps = { boundaryDistance: allSides, popupAlign: { top: [20, 12] } };
    const expected = {
      style: { left: 820, top: 308 },
      arrowStyle: { left: 156 },
      realPosition: 'top',
    };

    expect(positionPopup(props, 956, 400)).toEqual(expected);
    expect(positionPopup({ ...props, isUseAllBoundaryDistances: false }, 956, 400)).toEqual(
      expected
    );
  });

  it('limits the popup after popupAlign and calculates the arrow from the final position', () => {
    const props: TriggerProps = {
      isUseAllBoundaryDistances: true,
      boundaryDistance: allSides,
      popupAlign: { top: [20, 12] },
    };

    expect(positionPopup(props, 956, 400)).toEqual({
      style: { left: 788, top: 308 },
      arrowStyle: { left: 188 },
      realPosition: 'top',
    });
  });

  it('only adds a final limit for configured sides and treats zero as an explicit limit', () => {
    const props: TriggerProps = {
      isUseAllBoundaryDistances: true,
      boundaryDistance: { left: 12 },
      popupAlign: { top: [20, 12] },
    };

    expect(positionPopup(props, 956, 400).style.left).toBe(820);
    expect(
      positionPopup({ ...props, boundaryDistance: { left: 12, right: 0 } }, 956, 400).style.left
    ).toBe(800);
  });

  it('uses the configured top and bottom limits to flip the popup near the corners', () => {
    const props: TriggerProps = { isUseAllBoundaryDistances: true, boundaryDistance: allSides };

    expect(positionPopup(props, 4, 100)).toMatchObject({
      style: { left: 12, top: 144 },
      realPosition: 'bottom',
    });
    expect(positionPopup({ ...props, position: 'bottom' }, 956, 672)).toMatchObject({
      style: { left: 788, top: 580 },
      realPosition: 'top',
    });
  });

  it('uses the configured left and right limits to flip horizontal placements', () => {
    const props: TriggerProps = { isUseAllBoundaryDistances: true, boundaryDistance: allSides };

    expect(positionPopup({ ...props, position: 'lt' }, 218, 4)).toMatchObject({
      style: { left: 270, top: 12 },
      realPosition: 'rt',
    });
    expect(positionPopup({ ...props, position: 'rb' }, 742, 764)).toMatchObject({
      style: { left: 530, top: 708 },
      realPosition: 'lb',
    });
  });

  it('keeps the start-side limits when the popup is larger than the padded viewport', () => {
    const props: TriggerProps = { isUseAllBoundaryDistances: true, boundaryDistance: allSides };

    expect(positionPopup(props, 480, 384, { popupWidth: 990, popupHeight: 790 }).style).toEqual({
      left: 12,
      top: 12,
    });
  });

  it('converts viewport boundaries to the coordinates of an offset popup container', () => {
    const props: TriggerProps = {
      isUseAllBoundaryDistances: true,
      boundaryDistance: { top: 12, right: 12 },
      popupAlign: { top: [20, 12] },
    };

    expect(positionPopup(props, 956, 100, { containerLeft: -60, containerTop: -70 })).toMatchObject(
      {
        style: { left: 848, top: 214 },
        realPosition: 'bottom',
      }
    );
  });

  it.each([{ autoFitPosition: false }, { alignPoint: true }, { boundaryDistance: {} }])(
    'preserves legacy positioning when the new rules are inactive (%j)',
    (overrides) => {
      const props: TriggerProps = { boundaryDistance: allSides, ...overrides };

      expect(positionPopup({ ...props, isUseAllBoundaryDistances: true }, 956, 400)).toEqual(
        positionPopup(props, 956, 400)
      );
    }
  );
});
