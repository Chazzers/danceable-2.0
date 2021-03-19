const responseType = 'code'
const stateKey = 'spotify_auth_state'
const redirectUri = `http://localhost:5500/playlists/`
const scope = 'user-read-private user-read-email playlist-read-private'
const urlAuthorize = 'https://accounts.spotify.com/authorize'

module.exports = {
	responseType,
	redirectUri,
	scope,
	urlAuthorize,
	stateKey
}