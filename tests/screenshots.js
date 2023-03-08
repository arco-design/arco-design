const playwright = require('playwright');
const Arco = require('../lib');

// const components = Object.keys(Arco).filter((key) => typeof Arco[key] === 'object');

const _domain = process.argv?.[2] || 'http://localhost:9000'; // --domain=https://a.b.com

const baseurl = _domain.replace('--domain=', '');

const mockRoute = async (page) => {
  await page.route('https://randomuser.me/api/?results=10', async (route) => {
    const json = {
      results: [...new Array(10)].map((_, index) => ({
        name: {
          title: `Mrs${index}`,
          first: `Miriã${index}`,
          last: `Farias${index}`,
        },
        email: `miria.farias${index}@example.com`,
        picture: {
          large: 'https://randomuser.me/api/portraits/women/41.jpg',
          medium: 'https://randomuser.me/api/portraits/med/women/41.jpg',
          thumbnail: 'https://randomuser.me/api/portraits/thumb/women/41.jpg',
        },
      })),
    };
    await route.fulfill({
      status: 200,
      body: JSON.stringify(json),
    });
  });
};

const mockInterfaces = async (page) => {
  await page.addInitScript(() => {
    window.setInterval = () => {};
    if (location.pathname.split('/').pop() === 'statistic') {
      window.requestAnimationFrame = () => {}; // statistic using it
    }
  });
};

(async () => {
  const baseURL = `${baseurl}/react`;
  const browser = await playwright.chromium.launch({
    args: ['--font-render-hinting=none'],
    // headless: false,
  });
  const componentNames = Object.keys(Arco).filter((key) => typeof Arco[key] === 'object');

  let total = 0;
  const componentCount = componentNames.length;
  const page = await browser.newPage({
    viewport: {
      width: 1440,
      height: 1340,
    },
  });

  await mockRoute(page);
  await mockInterfaces(page);

  const genComponentScreenshots = async (componentName) => {
    // eslint-disable-next-line
    const name = componentName
      .replace(/([A-Z])/g, '-$1')
      .toLowerCase()
      .replace('-', '');

    await page.goto(`${baseURL}/components/${name}`);

    const demos = page.locator('.codebox-wrapper');
    const totalElements = await demos.count();

    total += totalElements;

    await Promise.all(
      [...Array(totalElements)].map(async (_, index) => {
        const demo = demos.nth(index);
        const id = await demo.getAttribute('id');
        await demo.locator('.demo').screenshot({
          animations: 'disabled',
          path: `${__dirname}/__screenshots__/${componentName}/${id}.png`,
          type: 'png',
        });
      })
    );
    // eslint-disable-next-line
    console.log(
      `[${
        componentCount - componentNames.length
      }/${componentCount}]: ${componentName} (${totalElements})`
    );
    if (componentNames.length) {
      genComponentScreenshots(componentNames.pop());
    } else {
      // eslint-disable-next-line
      console.log('end________', total);
      await browser.close();
      process.exit(0);
    }
  };

  genComponentScreenshots(componentNames.pop());

  // await browser.close();

  // process.exit(0);
})();
