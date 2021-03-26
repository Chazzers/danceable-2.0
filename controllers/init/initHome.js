const renderHome = require('../render/renderHome.js')

function initHome(req, res) {
	renderHome(res)
}

module.exports = initHome