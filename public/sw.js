const STATIC_CACHE = 'sw-v13';

const STATIC_ASSETS = [
    '/',
    '/index.html',
    '/favicon.ico',
    '/static/js/bundle.js',
    '/static/js/1.chunk.js',
    '/static/js/main.chunk.js',
];

async function install() {
    console.log(`${STATIC_CACHE} installing…`);
    const cache = await caches.open(STATIC_CACHE);
    cache.addAll(STATIC_ASSETS);

    console.log(`${STATIC_CACHE} installation complete`);
}

async function response(request) {
    // Network first, falling back to cache
    try  {
        const response = await fetch(request.url);
        const cache = await caches.open(STATIC_CACHE);
        await cache.put(request, response.clone());

        return response;

    } catch (err) {
        return caches.match(request);
    }
}

async function deleteOldCaches() {
    const keyList = await caches.keys();
    const toBeDeleted = keyList.map(key => {
        if (key !== STATIC_CACHE) {
            return caches.delete(key);
        }
    });

    return Promise.all(toBeDeleted);
}

self.addEventListener('install', event => {
    event.waitUntil(install())
});

self.addEventListener('activate', event => {
    console.log(`${STATIC_CACHE} now ready to handle fetches!`);
    event.waitUntil(deleteOldCaches());
});

self.addEventListener('fetch', event => {
    const url = new URL(event.request.url);

    // Prevent caching when not HTTP GET
    const notGetMethod = event.request.method !== 'GET';
    if (notGetMethod) {
        console.log('notGetMethod')
        return;
    }

    event.respondWith(response(event.request))
});


self.addEventListener('error', e => {
    console.log(e.filename, e.lineno, e.colno, e.message);
});