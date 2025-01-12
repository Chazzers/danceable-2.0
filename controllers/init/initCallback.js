const fetch = require('node-fetch')
const queryString = require('query-string')

async function initCallback(req, res) {
	const code = req.query.code || null
	const state = req.query.state || null
	const stateKey = 'spotify_auth_state'
	const storedState = req.cookies ? req.cookies[stateKey] : null
	const clientId = process.env.CLIENT_ID
	const clientSecret = process.env.CLIENT_SECRET
	const redirectUri = process.env.REDIRECT_URI

	if(state === null || state !== storedState) {
		res.redirect('/#' + queryString.stringify({
			error: 'state_mismatch'
		}))
	} else {
		res.clearCookie(stateKey)

		const data = {
			code: code,
			redirect_uri: redirectUri,
			grant_type: 'authorization_code'
		}

		const formData = new URLSearchParams()

		formData.append('code', data.code)
		formData.append('redirect_uri', data.redirect_uri)
		formData.append('grant_type', data.grant_type)

		postData('https://accounts.spotify.com/api/token', { data: formData, redirectUri: redirectUri, clientId: clientId, clientSecret: clientSecret })
			.then(response => {
				const refreshToken = response.refresh_token

				const cookieConfig = {
					httpOnly: true, // to disable accessing cookie via client side js
					//secure: true, // to force https (if you use it)
					maxAge: 1000000, // ttl in seconds (remove this option and cookie will die when browser is closed)
				}

				res.cookie('refresh_token', refreshToken, cookieConfig)

				res.redirect('/playlists')
			})
	}
}



async function postData(url = '', { data = {}, clientId, clientSecret }) {
	const response = await fetch(url, {
		method: 'POST', 
		headers: {
			'Authorization': 'Basic ' + (Buffer.from(clientId + ':' + clientSecret, 'utf8').toString('base64'))
		},
		body: data
	})
	return response.json()
}

module.exports = initCallback