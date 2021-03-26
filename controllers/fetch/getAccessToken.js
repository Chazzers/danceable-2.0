const fetch = require('node-fetch')

async function getAccessToken(req) {
	try {
		const formData = new URLSearchParams()
		const refreshToken = req.cookies.refresh_token
		const data = {
			grant_type: 'refresh_token',
			refresh_token: refreshToken
		}
	
		formData.append('refresh_token', data.refresh_token)
		formData.append('grant_type', data.grant_type)
	
		return await postData('https://accounts.spotify.com/api/token', {
			data: formData, 
			clientId: process.env.CLIENT_ID, 
			clientSecret: process.env.CLIENT_SECRET
		})
			.then(response => response.access_token)
	} catch(error) {
		console.log(error)
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

module.exports = getAccessToken