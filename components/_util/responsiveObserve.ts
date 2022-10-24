// https://github.com/ant-design/ant-design/blob/master/components/_util/responsiveObserve.ts

export type Breakpoint = 'xxxl' | 'xxl' | 'xl' | 'lg' | 'md' | 'sm' | 'xs';
export type BreakpointMap = Partial<Record<Breakpoint, string>>;
export type ScreenMap = Partial<Record<Breakpoint, boolean>>;

export const responsiveArray: Breakpoint[] = ['xxxl', 'xxl', 'xl', 'lg', 'md', 'sm', 'xs'];

export const responsiveMap: BreakpointMap = {
  xs: '(max-width: 575px)',
  sm: '(min-width: 576px)',
  md: '(min-width: 768px)',
  lg: '(min-width: 992px)',
  xl: '(min-width: 1200px)',
  xxl: '(min-width: 1600px)',
  xxxl: '(min-width: 2000px)',
};

type SubscribeFunc = (screens: ScreenMap, breakpointChecked: Breakpoint) => void;

let subscribers: Array<{
  token: string;
  func: SubscribeFunc;
}> = [];
let subUid = -1;
let screens = {};

const responsiveObserve = {
  matchHandlers: {},
  dispatch(pointMap: ScreenMap, breakpointChecked: Breakpoint) {
    screens = pointMap;
    if (subscribers.length < 1) {
      return false;
    }

    subscribers.forEach((item) => {
      item.func(screens, breakpointChecked);
    });

    return true;
  },
  subscribe(func: SubscribeFunc) {
    if (subscribers.length === 0) {
      this.register();
    }
    const token = (++subUid).toString();
    subscribers.push({
      token,
      func,
    });
    func(screens, null);
    return token;
  },
  unsubscribe(token: string) {
    subscribers = subscribers.filter((item) => item.token !== token);
    if (subscribers.length === 0) {
      this.unregister();
    }
  },
  unregister() {
    Object.keys(responsiveMap).forEach((screen: Breakpoint) => {
      const matchMediaQuery = responsiveMap[screen];
      const handler = this.matchHandlers[matchMediaQuery];
      if (handler && handler.mql && handler.listener) {
        handler.mql.removeListener(handler.listener);
      }
    });
  },
  register() {
    Object.keys(responsiveMap).forEach((screen: Breakpoint) => {
      const matchMediaQuery = responsiveMap[screen];
      const listener = ({ matches }: { matches: boolean }) => {
        this.dispatch(
          {
            ...screens,
            [screen]: matches,
          },
          screen
        );
      };
      const mql = window.matchMedia(matchMediaQuery);
      mql.addListener(listener);
      this.matchHandlers[matchMediaQuery] = {
        mql,
        listener,
      };

      listener(mql);
    });
  },
};

export default responsiveObserve;
