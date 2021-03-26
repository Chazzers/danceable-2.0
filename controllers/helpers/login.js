const generateRandomString = require('../helpers/generateRandomString.js')
const queryString = require('query-string')

function login(req, res) {
	const responseType = 'code'
	const stateKey = 'spotify_auth_state'
	const scope = 'user-read-private user-read-email playlist-read-private'
	const urlAuthorize = 'https://accounts.spotify.com/authorize'
	const state = generateRandomString(16)

	res.cookie(stateKey, state)

	return res.redirect(`${urlAuthorize}?${queryString.stringify({
		response_type: responseType,
		client_id: process.env.CLIENT_ID,
		scope: scope,
		redirect_uri: process.env.REDIRECT_URI,
		state: state
	})}`)
}

module.exports = login