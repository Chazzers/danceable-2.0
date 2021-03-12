function createUrl({ baseUrl, clientId, responseType, redirectUri, scope, state }) {
	return `${baseUrl}?response_type=${responseType}&client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${encodeURIComponent(scope)}&state=${state}`
}

module.exports = createUrl