import { clientsClaim } from 'workbox-core';
import { precacheAndRoute, createHandlerBoundToURL } from 'workbox-precaching';
import { registerRoute } from 'workbox-routing';

clientsClaim();

const manifest = self.__WB_MANIFEST;

const _manifest = manifest.map((item) => {
  const { revision, url } = item;
  // html won't be served through cdn, stripe out publicPath
  if (url && /.html$/.test(url)) {
    const paths = url.split('/');
    return {
      revision,
      url: `/${paths[paths.length - 1]}`,
    };
  }
  return item;
});

precacheAndRoute(_manifest);

// fallback for history routes
const handlers = [
  {
    regexp: /^(\/(react|docs|showcase))\/en-US/,
    dest: '/react-en.html',
  },
  {
    regexp: /^(\/(react|docs|showcase))(?!\/(en\-US|1.x))/,
    dest: '/index.html',
  },
];

const fileExtensionRegexp = new RegExp('/[^/?]+\\.[^/]+$');

handlers.forEach((handler) => {
  const { regexp, dest } = handler;
  registerRoute(({ request, url }) => {
    if (request.mode !== 'navigate') {
      return false;
    }
    const pathname = url.pathname;

    if (pathname.match(fileExtensionRegexp)) {
      return false;
    }

    return regexp.test(pathname);
  }, createHandlerBoundToURL(dest));
});

// trigger skipWaiting via message
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
