import React from 'react';
import { Notification, Button } from '@arco-design/web-react';

let refreshing;

function invokeServiceWorkerUpdateFlow(config, registration) {
  const id = 'notification';
  // there is a new service worker available, show the notification
  Notification.info({
    id,
    closable: true,
    duration: 0,
    content: config.content,
    btn: (
      <span>
        <Button
          type="secondary"
          size="small"
          onClick={() => Notification.remove(id)}
          style={{ marginRight: 12 }}
        >
          {config.cancelText}
        </Button>
        <Button
          type="primary"
          size="small"
          onClick={() => {
            if (registration.waiting) {
              registration.waiting.postMessage({ type: 'SKIP_WAITING' });
              Notification.remove(id);
            }
          }}
        >
          {config.okText}
        </Button>
      </span>
    ),
    position: 'bottomRight',
  });
}

export function registerServiceWorker(config) {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', async () => {
      const swUrl = '/serviceWorker.js';
      navigator.serviceWorker
        .register(swUrl)
        .then((registration) => {
          if (registration.waiting) {
            invokeServiceWorkerUpdateFlow(config, registration);
          }

          registration.addEventListener('updatefound', () => {
            const installingWorker = registration.installing;
            if (installingWorker == null) {
              return;
            }
            installingWorker.addEventListener('statechange', () => {
              if (registration.waiting) {
                // if there's an existing controller (previous Service Worker), show the prompt
                if (navigator.serviceWorker.controller) {
                  invokeServiceWorkerUpdateFlow(config, registration);
                }
              }
            });
          });
        })
        .catch((error) => {
          console.error('Error during service worker registration:', error);
        });

      // avoid reload on first time
      const oldSw = (await navigator.serviceWorker.getRegistration())?.active?.state;
      navigator.serviceWorker.addEventListener('controllerchange', async () => {
        if (refreshing) return;
        const newSw = (await navigator.serviceWorker.getRegistration())?.active?.state;
        if (oldSw === 'activated' && newSw === 'activating') {
          // reload on controller change
          window.location.reload();
          refreshing = true;
        }
      });
    });
  }
}

export function unregisterServiceWorker() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready
      .then((registration) => {
        registration.unregister();
      })
      .catch((error) => {
        console.error(error.message);
      });
  }
}
