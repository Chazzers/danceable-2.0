function createBtnEventListeners({ eventFunction, selector }) {
	const buttons = document.querySelectorAll(selector)
	return buttons.forEach(btn => btn.addEventListener('click', (event) => eventFunction(event)))
}

function btnEvent(event) {
	const name = event.currentTarget.dataset.name
	const img = event.currentTarget.dataset.img
	const href = event.currentTarget.dataset.href

	const data = {
		name: name,
		img: img,
		href: href
	}
}

if(window.location.pathname === '/playlists'){
	createBtnEventListeners({ 
		eventFunction: btnEvent, 
		selector: 'button'
	})
}