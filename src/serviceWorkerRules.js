importScripts(
    'https://storage.googleapis.com/workbox-cdn/releases/3.5.0/workbox-sw.js'
);
/* global workbox */
if (workbox) {
    console.log('Workbox is loaded');

  self.addEventListener('install', event => {
    self.skipWaiting();
  });

    /* injection point for manifest files.  */
    workbox.precaching.precacheAndRoute([]);

/* custom cache rules*/
workbox.routing.registerNavigationRoute('/index.html', {
    blacklist: [/^\/_/, /\/[^\/]+\.[^\/]+$/],
    });

workbox.routing.registerRoute(
    /\.(?:png|gif|jpg|jpeg|svg)$/,
    workbox.strategies.cacheFirst({
        cacheName: 'images',
        plugins: [
            new workbox.expiration.Plugin({
                maxEntries: 60,
                maxAgeSeconds: 5 * 24 * 60 * 60, // 5 Days
            }),
        ],
    }),
);
}