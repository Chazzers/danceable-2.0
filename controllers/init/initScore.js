const getAccessToken = require('../fetch/getAccessToken.js')
const getData = require('../fetch/getData.js')
const getTracks = require('../fetch/getTracks.js')
const { cleanData } = require('../helpers/cleanData.js')
const calcScore = require('../helpers/calcScore.js')
const renderScore = require('../render/renderScore.js')


async function initScore(req, res) {
	try {
		const playlistId = req.params.id
		const accessToken = await getAccessToken(req)

		const playlist = await getData(`https://api.spotify.com/v1/playlists/${playlistId}`, accessToken)

		const tracks = await getTracks(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, accessToken)

		const cleanTracks = cleanData(tracks.trackData, tracks.audioFeaturesData)
		
		const score = calcScore(cleanTracks, 'danceability')
		renderScore(req, res, score, playlist)
	} catch(error) {
		console.log(error)
	}
}

module.exports = initScore