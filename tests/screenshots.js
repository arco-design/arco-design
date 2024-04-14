const playwright = require('playwright');
const Arco = require('../lib');
const ArcoHooks = require('../hooks/lib');

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
  const list = Object.keys(Arco)
    .filter((key) => typeof Arco[key] === 'object')
    .map((name) => ({
      name: name
        .replace(/([A-Z])/g, '-$1')
        .toLowerCase()
        .replace('-', ''),
      pagePath: '/components',
    }))
    .concat(Object.keys(ArcoHooks).map((name) => ({ name, pagePath: '/hooks' })));

  let total = 0;
  const totalItems = list.length;
  const page = await browser.newPage({
    viewport: {
      width: 1440,
      height: 1340,
    },
  });

  await mockRoute(page);
  await mockInterfaces(page);

  const genComponentScreenshots = async ({ name, pagePath }) => {
    // eslint-disable-next-line

    await page.goto(`${baseURL}${pagePath}/${name}`);
    await page.evaluate(() => {
      // 隐藏下悬浮按钮，避免截图干扰
      document.querySelector('.arco-page + div').style.display = 'none';
    });

    const demos = page.locator('.codebox-wrapper');
    const totalElements = await demos.count();

    total += totalElements;

    await Promise.all(
      [...Array(totalElements)].map(async (_, index) => {
        const demo = demos.nth(index);
        const id = await demo.getAttribute('id');
        await demo.locator('.demo').screenshot({
          animations: 'disabled',
          path: `${__dirname}/__screenshots__/${name}/${id}.png`,
          type: 'png',
        });
      })
    );
    // eslint-disable-next-line
    console.log(`[${totalItems - list.length}/${totalItems}]: ${name} (${totalElements})`);
    if (list.length) {
      genComponentScreenshots(list.pop());
    } else {
      // eslint-disable-next-line
      console.log('end________', total);
      await browser.close();
      process.exit(0);
    }
  };

  genComponentScreenshots(list.pop());

  // await browser.close();

  // process.exit(0);
})();
