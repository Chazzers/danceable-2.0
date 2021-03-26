// render playlists
function renderPlaylists(res, playlists) {
	res.render('playlists', {
		playlists: playlists
	})
}

module.exports = renderPlaylists