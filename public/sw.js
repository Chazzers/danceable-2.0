const cacheItems = [
	'/manifest.json',
	'/sw.js',
	'/dist/js/client.js',
	'/images/music-icon.png',
	'/images/icons/icon-192x192.png',
	'/images/icons/icon-256x256.png',
	'/images/icons/icon-384x384.png',
	'/images/icons/icon-512x512.png',
	'/dist/fonts/Poppins-Black.woff',
	'/dist/fonts/Poppins-Black.woff2',
	'/dist/fonts/Poppins-Bold.woff',
	'/dist/fonts/Poppins-Bold.woff2',
	'/dist/fonts/Poppins-Light.woff',
	'/dist/fonts/Poppins-Light.woff2',
	'/dist/fonts/Poppins-Medium.woff',
	'/dist/fonts/Poppins-Medium.woff2',
	'/dist/fonts/Poppins-Regular.woff',
	'/dist/fonts/Poppins-Regular.woff2',
	'/dist/css/styles.css',
	'/playlists'
]

self.addEventListener('install', (event) => {
	return event.waitUntil(
		caches.open('caches')
			.then(cache => cache.addAll(cacheItems))
	)
})

self.addEventListener('fetch', (event) => {
	return event.respondWith(
		caches.open('caches')
			.then(cache => cache.match(event.request)
				.then(() => fetch(event.request)
					.catch(() => caches.match(event.request)
						.catch(() => caches.match('/playlists'))
					)
				)
			)
	)
})

self.addEventListener('activate', (event) => {
	const cacheAllowlist = ['caches']
	event.waitUntil(
		caches.keys().then((cacheNames) => {
			return Promise.all(
				cacheNames.map((cacheName) => {
					if (cacheAllowlist.indexOf(cacheName) === -1) {
						return caches.delete(cacheName)
					}
				})
			)
		})
	)
})