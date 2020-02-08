var CACHE_NAME = 'website 1.0';
var urlsToCache = [
    '.',
    'index.html',
    'css/materialize.min.css',
    'css/raghu.css',

];
self.addEventListener('install', function (event) {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(function (cache) {
                return cache.addAll(urlsToCache);
            })
    );
});

self.addEventListener('fetch', function (event) {
    event.respondWith(
        caches.match(event.request)
            .then(function (response) {
                return response || fetchAndCache(event.request);
            })
    );
});

function fetchAndCache(url) {
    return fetch(url)
        .then(function (response) {
            // Check if we received a valid response
            if (!response.ok) {
                throw Error(response.statusText);
            }
            return caches.open(CACHE_NAME)
                .then(function (cache) {
                    cache.put(url, response.clone());
                    return response;
                });
        })
        .catch(function (error) {
            console.log('Request failed:', error);
            // You could return a custom offline 404 page here
        });
}

//notifications
self.addEventListener('notificationclose', function (e) {
    var notification = e.notification;
    var primaryKey = notification.data.primaryKey;

    console.log('Closed notification: ' + primaryKey);
});

self.addEventListener('notificationclick', function (e) {
    var notification = e.notification;
    var primaryKey = notification.data.primaryKey;
    var action = e.action;

    if (action === 'close') {
        notification.close();
    } else {
        clients.openWindow('http://google.com');
        notification.close();
    }
});

self.addEventListener('push', function (e) {
    var body;

    if (e.data) {
        body = e.data.text();
    } else {
        body = 'Push message no payload';
    }

    var options = {
        body: body,
        //   icon: 'images/notification-flat.png',
        vibrate: [100, 50, 100],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: 1
        },
        actions: [
            { action: 'explore', title: 'Explore this new world',
        //   icon: 'images/checkmark.png'},
        {
                action: 'close', title: 'I don\'t want any of this',
                // icon: 'images/xmark.png'
            },
        ]
    };
    e.waitUntil(
        self.registration.showNotification('Push Notification', options)
    );
});