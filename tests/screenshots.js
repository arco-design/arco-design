const playwright = require('playwright');
const Arco = require('../lib');

// const components = Object.keys(Arco).filter((key) => typeof Arco[key] === 'object');

const _domain = process.argv?.[2] || 'http://127.0.0.1/'; // --domain=https://a.b.com

const baseurl = _domain.replace('--domain=', '');

(async () => {
  const baseURL = `${baseurl}/react`;
  const browser = await playwright.chromium.launch({});
  const componentNames = Object.keys(Arco).filter((key) => typeof Arco[key] === 'object');

  const page = await browser.newPage({
    viewport: {
      width: 1440,
      height: 1340,
    },
  });

  const genComponentScreenshots = async (componentName) => {
    // eslint-disable-next-line
    console.log('gen screenshots________', componentName);
    const name = componentName
      .replace(/([A-Z])/g, '-$1')
      .toLowerCase()
      .replace('-', '');
    await page.goto(`${baseURL}/components/${name}`);
    const demos = page.locator('.codebox-wrapper');
    const totalElements = await demos.count();

    await Promise.all(
      [...Array(totalElements)].map(async (_, index) => {
        const demo = demos.nth(index);
        const id = await demo.getAttribute('id');
        await demo.locator('.demo').screenshot({
          path: `${__dirname}/__screenshots__/${componentName}/${id}.png`,
          type: 'png',
        });
      })
    );
    // eslint-disable-next-line
    console.log('success gen screenshots________', componentName);
    if (componentNames.length) {
      genComponentScreenshots(componentNames.pop());
    } else {
      // eslint-disable-next-line
      console.log('end________');
      await browser.close();
      process.exit(0);
    }
  };

  genComponentScreenshots(componentNames.pop());

  // await browser.close();

  // process.exit(0);
})();
