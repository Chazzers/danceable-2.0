import render from './render.js'
// render playlists
function renderPlaylists(playlists) {
	render(`
		<h1>Select a playlist</h1>
		<h2>
			Measure the danceability of your playlist!
		</h2>
		<main>
		<div>
		${playlists.map(playlist => 
		`<a class="playlist" href="${window.location.pathname}#/loading" data-href="${playlist.href}" data-name="${playlist.name}" data-img="${playlist.images[0] ? playlist.images[0].url : ''}">
				<article>
					<h3>${playlist.name}</h3>
					<img src="${playlist.images[0] ? playlist.images[0].url : './assets/images/music-icon.png'}" alt="">
				</article>
			</a>`
	).join('')}
		</div>
		</main>
	`)
}

export default renderPlaylists