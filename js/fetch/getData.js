const accessToken = require('../helpers/accessToken.js')
const fetch = require('node-fetch')

// function that takes url and uses that url in fetch
async function getData(url) {
	const data = await fetch(url, {
		headers: {
			'Authorization': 'Bearer ' + accessToken
		}
	})
		.then(res => res.json())
	
	return data
}

module.exports = getData