const render = require('./render.js')
const { getLocalStorageItem } = require('../helpers/localStorage.js')
// get playlist and show it
function renderLoading() {
	const playlist = {
		name: getLocalStorageItem('name'),
		img: getLocalStorageItem('img'),
	}
	render(`
		<main class="loading">
			<a class="playlist">
				<article>
					<h3>${playlist.name}</h3>
					<img src="${playlist.img}" alt="">
				</article>
			</a>
			<div class="loading-animation">
				<h1>Loading...</h1>
				<div class="loading-music">
					<div></div>
					<div></div>
					<div></div>
					<div></div>
				</div>
			</div>
		</main>
	`)
}

module.exports = renderLoading