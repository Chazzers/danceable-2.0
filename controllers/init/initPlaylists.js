const getAccessToken = require('../fetch/getAccessToken.js')
const getAllPlaylists = require('../fetch/getAllPlaylists.js')
const renderPlaylists = require('../render/renderPlaylists.js')

async function initPlaylists(req, res) {
	if(req.cookies.refresh_token) {
		const accessToken = await getAccessToken(req)

		const playlists = await getAllPlaylists('https://api.spotify.com/v1/me/playlists', accessToken)
	
		renderPlaylists(res, playlists)
	}
	else {
		res.redirect('/')
	}	
}

module.exports = initPlaylists