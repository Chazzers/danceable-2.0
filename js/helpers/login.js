const { 
	clientId,
	responseType,
	redirectUri,
	scope,
	urlAuthorize,
	state,
	stateKey
} = require('../config/api.js')
const createUrl = require('../helpers/createUrl.js')

function login(req, res) {
	res.cookie(stateKey, state)
	const url = createUrl({
		baseUrl: urlAuthorize,
		responseType: responseType,
		redirectUri: redirectUri,
		clientId: clientId,
		scope: scope
	})
	
	return res.redirect(url)
}

module.exports = login