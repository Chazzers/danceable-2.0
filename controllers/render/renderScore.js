// get playlist and show it
function renderScore(req, res, score, playlist) {
	res.render('score', {
		score: score,
		playlist: playlist,
		id: req.params.id
	})
}

module.exports = renderScore