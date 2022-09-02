import { isNumber } from '../../utils/is';

const context = require.context('./', false, /\.svg$/);
const logoList = [];
const logoObj = {};

function generateIcons(copy) {
  context.keys().forEach((key) => {
    const matchResult = key.match(/logo_(.+?)_(.+?)\.svg$/);
    if (matchResult.length) {
      const logo = context(key).default;
      const category = matchResult[1];
      let name = matchResult[2];
      let index = parseInt(name);
      if (copy) {
        index += context.keys().length / 2;
        name = index;
      }
      // 填充数组
      if (isNumber(index)) {
        // 因为文件序号最小是 01，所以这边减 1
        index--;
        name = index;
        logoList[index] === undefined && (logoList[index] = {});
        logoList[index][category] = logo;
      }
      // 填充对象
      logoObj[name] === undefined && (logoObj[name] = {});
      logoObj[name][category] = logo;
    }
  });
}

generateIcons();
// generateIcons(true);

export { logoObj };

export default logoList;
