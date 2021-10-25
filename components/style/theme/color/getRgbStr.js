const { getRgbStr } = require('@arco-design/color');

module.exports = {
  install(_, __, functions) {
    functions.add('getRgbStr', (color) => {
      return getRgbStr(color.value);
    });

    functions.add('getVarStr', (color) => {
      if (color.value.indexOf('rgb') === 0) {
        return color.value.replace(/rgb\((.*)\)/, '$1');
      }
      return getRgbStr(color.value);
    });
  },
};
