if ('serviceWorker' in navigator) {
	navigator.serviceWorker.register('/js/sw.js')
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
			])
		})
	)
})