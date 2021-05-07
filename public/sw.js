const cacheItems = [
	'/manifest.json',
	'/sw.js',
	'/js/client.js',
	'/images/music-icon.png',
	'/images/icons/icon-192x192.png',
	'/images/icons/icon-256x256.png',
	'/images/icons/icon-384x384.png',
	'/images/icons/icon-512x512.png',
	'/fonts/Poppins-Black.woff',
	'/fonts/Poppins-Black.woff2',
	'/fonts/Poppins-Bold.woff',
	'/fonts/Poppins-Bold.woff2',
	'/fonts/Poppins-Light.woff',
	'/fonts/Poppins-Light.woff2',
	'/fonts/Poppins-Medium.woff',
	'/fonts/Poppins-Medium.woff2',
	'/fonts/Poppins-Regular.woff',
	'/fonts/Poppins-Regular.woff2',
	'/css/styles.css',
	'/playlists'
]

self.addEventListener('install', (event) => {
	event.waitUntil(
		caches.open('caches')
			.then(cache => cache.addAll(cacheItems))
			.then(() => self.skipWaiting())
	)
})

self.addEventListener('fetch', (event) => {
	event.respondWith(
		caches.match(event.request)
			.then((response) => {
				if(response) {
					return response
				}
				return fetch(event.request)
					.then(res => res)
					.catch(() => caches.open('caches')
						.then(cache => {
							return cache.match('/playlists')
						})
					)}))
})

self.addEventListener('activate', (event) => {
	event.waitUntil(clients.claim())
})