const getData = require('../fetch/getData.js')
const getTracks = require('../fetch/getTracks.js')
const { cleanData } = require('../helpers/cleanData.js')
const calcScore = require('../helpers/calcScore.js')

async function initTracks(req, res, app) {
	try {
		const playlistId = req.params.id
		const accessToken = req.params.access_token
		
		const playlist = await getData(`https://api.spotify.com/v1/playlists/${playlistId}`, accessToken)

		const tracks = await getTracks(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, accessToken)

		const cleanTracks = cleanData(tracks.trackData, tracks.audioFeaturesData)
		
		const score = calcScore(cleanTracks, 'danceability')
	} catch(error) {
		console.log(error)
	}
}

module.exports = initTracks