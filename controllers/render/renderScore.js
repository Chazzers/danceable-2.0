// get playlist and show it
function renderScore(res, score, playlist) {
	res.render('score', {
		score: score,
		playlist: playlist
	})
}

module.exports = renderScore