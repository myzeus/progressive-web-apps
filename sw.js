const CACHE_NAME = "firstpwa-v3";
importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js');

if (workbox)
    console.log(`Workbox berhasil dimuat`);
else
    console.log(`Workbox gagal dimuat`);



workbox.precaching.precacheAndRoute([
    { url: '/', revision: '1' },
    { url: '/index.html', revision: '1' },
    { url: '/standings.html', revision: '1' },
    { url: '/nav.html', revision: '1' },
    { url: '/pages/home.html', revision: '1' },
    { url: '/pages/about.html', revision: '1' },
    { url: '/pages/subscribe.html', revision: '1' },
    { url: '/pages/saved.html', revision: '1' },
    //css
    { url: '/css/style.css', revision: '1' },
    { url: '/css/materialize.min.css', revision: '1' },
    //js
    { url: '/js/materialize.min.js', revision: '1' },
    { url: '/js/nav.js', revision: '1' },
    { url: '/js/nav.js', revision: '1' },
    { url: '/js/api.js', revision: '1' },
    { url: '/js/db.js', revision: '1' },
    { url: '/js/idb.js', revision: '1' },
    { url: '/js/jquery.js', revision: '1' },
    { url: '/js/main.js', revision: '1' },
    { url: '/js/load.js', revision: '1' },
    { url: '/js/load-index.js', revision: '1' },
    { url: '/js/push.js', revision: '1' },
    { url: '/sw.js', revision: '1' },
    //more
    { url: '/img/icon1.png', revision: '1' },
    { url: '/img/icon2.png', revision: '1' },
    { url: '/img/bpy.png', revision: '1' },
    { url: '/manifest.json', revision: '1' },
], {
    igroneURLParametersMatching: [/.*/]
});

// page
workbox.routing.registerRoute(
    new RegExp('pages/'),
    workbox.strategies.staleWhileRevalidate({
        cacheName: 'pages',
    }),
);


//api cache
workbox.routing.registerRoute(
    /^https:\/\/api\.football-data\.org\/v2/,
    workbox.strategies.staleWhileRevalidate({
        cacheName: 'API',
    }),
);

// image
workbox.routing.registerRoute(
    /\.(?:png|gif|jpg|jpeg|svg)$/,
    workbox.strategies.cacheFirst({
        cacheName: 'images',
        plugins: [
            new workbox.expiration.Plugin({
                maxEntries: 60,
                maxAgeSeconds: 30 * 24 * 60 * 60, // 30 hari
            }),
        ],
    }),
);

workbox.routing.registerRoute(
    new RegExp('standings.html'),
    workbox.strategies.staleWhileRevalidate({
        cacheName: 'standings',
    }),
);

self.addEventListener('push', function(event) {
    let body;
    if (event.data) {
        body = event.data.text();
    } else {
        body = 'Push message no payload';
    }
    let options = {
        body: body,
        icon: 'img/icon1.png',
        vibrate: [100, 50, 100],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: 1
        }
    };
    event.waitUntil(
        self.registration.showNotification('Push Notification', options)
    );
});


// self.addEventListener("install", function(event) {
//     console.log("Service worker: Menginstall...");
//     event.waitUntil(
//         caches.open(CACHE_NAME).then(function(cache) {
//             console.log("Service worker: Membuka cache")
//             return cache.addAll(urlsToCache);
//         })
//     );
// });

// self.addEventListener("fetch", function(event) {
//     let base_url = "https://api.football-data.org/v2/competitions/2021/standings";

//     if (event.request.url.indexOf(base_url) > -1) {
//         event.respondWith(
//             caches.open(CACHE_NAME).then(function(cache) {
//                 return fetch(event.request).then(function(response) {
//                     cache.put(event.request.url, response.clone());
//                     return response;
//                 })
//             })
//         );
//     } else {
//         event.respondWith(
//             caches.match(event.request, { ignoreSearch: true }).then(function(response) {
//                 return response || fetch(event.request);
//             })
//         )
//     }
// });

// self.addEventListener("activate", function(event) {
//     event.waitUntil(
//         caches.keys().then(function(cacheNames) {
//             return Promise.all(
//                 cacheNames.map(function(cacheName) {
//                     if (cacheName != CACHE_NAME) {
//                         console.log("ServiceWorker: cache " + cacheName + " dihapus");
//                         return caches.delete(cacheName);
//                     }
//                 })
//             );
//         })
//     );
// });



// const urlsToCache = [
//     //page
//     "/",
//     "/nav.html",
//     "/index.html",
//     "/article.html",
//     "/pages/home.html",
//     "/pages/about.html",
//     "/pages/subscribe.html",
//     "/pages/saved.html",
//     //css
//     "/css/style.css",
//     "/css/materialize.min.css",
//     //js
//     "/js/materialize.min.js",
//     "/js/nav.js",
//     "/js/api.js",
//     "/js/db.js",
//     "/js/idb.js",
//     "/js/jquery.js",
//     "/js/main.js",
//     "/js/load.js",
//     "/js/load-index.js",
//     "/js/push.js",
//     //more file
//     "/img/icon1.png",
//     "/img/icon2.png",
//     "/manifest.json",
//     "/img/work.png",
//     "/img/boy.png"
// ];