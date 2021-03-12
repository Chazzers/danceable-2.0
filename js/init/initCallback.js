const fetch = require('node-fetch')
const { 
	stateKey, 
	redirectUri,
	clientId,
	clientSecret
} = require('../config/api.js')

async function initCallback(req, res) {
	const code = req.query.code
	const state = req.query.state
	const storedState = req.cookies[stateKey]

	console.log(code)
	res.clearCookie(stateKey)

	const data = {
		code: code,
		redirect_uri: redirectUri,
		grant_type: 'authorization_code'
	}

	postData('https://accounts.spotify.com/api/token', { data: data, redirectUri: redirectUri, clientId: clientId, clientSecret: clientSecret })
		.then((err, res, body) => {
			if(!err && res.statusCode === 200) {
				const accessToken = body.access_token
				const refreshToken = body.refresh_token

				const url = 'https://api.spotify.com/v1/me/playlists'
				const headers = { 
					'Authorization': 'Bearer ' + accessToken 
				}

				fetch(url, {
					headers: headers
				}).then(data => console.log(data))
			}
		})

	
}

async function postData(url = '', { 
	data = {}, code, redirectUri, clientId, clientSecret 
}) {
	// Default options are marked with *
	const response = await fetch(url, {
		method: 'POST', // *GET, POST, PUT, DELETE, etc.
		form: {
			code: code,
			redirectUri: redirectUri,
			grant_type: 'authorization_code'
		},
		headers: {
			'Authorization': 'Basic ' + (Buffer(clientId + ':' + clientSecret).toString('base64'))
		},
		body: JSON.stringify(data) 
	})
	return response.json()
}

module.exports = initCallback