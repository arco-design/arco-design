const target = global.window || global;

const _RealDate = target.Date;

function mockDate(expectedDate) {
  function Date(...args) {
    const dateArgs = args.length === 0 ? [expectedDate] : args;
    const instance = new _RealDate(...dateArgs);
    Object.setPrototypeOf(instance, Object.getPrototypeOf(this));
    return instance;
  }
  Date.prototype = Object.create(_RealDate.prototype);
  Object.setPrototypeOf(Date, _RealDate);

  Date.now = () => {
    return new _RealDate(expectedDate).getTime();
  };

  Date.__OriginalDate__ = _RealDate;

  Date.current = () => _RealDate.now();

  target.Date = Date;

  return () => {
    target.Date = _RealDate;
  };
}

let restoreDate;

beforeAll(() => {
  restoreDate = mockDate(new _RealDate('Sun Apr 10 2020 20:32:59 GMT+0800'));
});

afterAll(() => {
  restoreDate();
});
