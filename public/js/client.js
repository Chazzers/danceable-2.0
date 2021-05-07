const favouriteBtn = document.getElementById('favourite-btn')
const allPlaylists = document.querySelectorAll('.playlist')


if ('serviceWorker' in navigator) {
	navigator.serviceWorker.register('/sw.js')
		.then((reg) => {
			// registration worked
			console.log('Registration succeeded. Scope is ' + reg.scope)
		}).catch((error) => {
			// registration failed
			console.log('Registration failed with ' + error)
		})
}

if(favouriteBtn) {
	const { id, name } = favouriteBtn.dataset
	favouriteBtn.addEventListener('click', (event) => {
		event.preventDefault()
		
		const cacheItems = [
			'/manifest.json',
			'/sw.js',
			'/js/client.js',
			'/css/styles.css',
			`/playlists/${id}`
		]

		caches.open(`${id}`)
			.then((cache) => {
				cache.addAll(cacheItems)
			})
		favouriteBtn.style.backgroundColor = '#6D6C6C'
		favouriteBtn.innerHTML = 'Saved for offline'
		
	})
	caches.keys()
		.then(cache => {
			console.log(cache.includes(id))
			if(cache.includes(id)) {
				favouriteBtn.style.backgroundColor = '#6D6C6C'
				favouriteBtn.innerHTML = 'Saved for offline'
			}
		})
}

if(allPlaylists && !window.navigator.onLine) {
	const playlistArray = [...allPlaylists]
	caches.keys().then(cache => {
		const notSavedPlaylists = playlistArray.filter(item => !cache.includes(item.dataset.id))
		notSavedPlaylists.forEach(item => item.style.display = 'none')
	})
}

if(!window.navigator.onLine && window.location.pathname === '/') {
	console.log(window.location)
	window.location = `${window.location.href}playlists`
}