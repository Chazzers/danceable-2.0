const generateRandomString = require('../helpers/generateRandomString.js')

const clientId = process.env.CLIENT_ID
const clientSecret = process.env.CLIENT_SECRET
const responseType = 'code'
const state = generateRandomString(16)
const stateKey = 'spotify_auth_state'
const redirectUri = `http://localhost:5500/playlists/`
const scope = 'user-read-private user-read-email playlist-read-private'
const urlAuthorize = 'https://accounts.spotify.com/authorize'

module.exports = {
	clientId,
	clientSecret,
	responseType,
	redirectUri,
	scope,
	urlAuthorize,
	state,
	stateKey
}