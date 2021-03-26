if ('serviceWorker' in navigator) {
	navigator.serviceWorker.register('/js/sw.js', { scope: '/js/' })
		.then((reg) => {
			// registration worked
			console.log('Registration succeeded. Scope is ' + reg.scope)
		}).catch((error) => {
			// registration failed
			console.log('Registration failed with ' + error)
		})
}

self.addEventListener('install', (event) => {
	event.waitUntil(
		caches.open('v1').then((cache) => {
			return cache.addAll([
				'/js/',
				'/css/styles.css',
				'/images/icons/icon-192x192.png',
				'/images/icons/icon-256x256.png',
				'/images/icons/icon-384x384.png',
				'/images/icons/icon-512x512.png'
			])
		})
	)
})