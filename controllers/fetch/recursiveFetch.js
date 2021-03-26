const pushToArray = require('../helpers/pushToArray.js')
const getData = require('../fetch/getData.js')

// loop over the fetches if data.next is not null
async function recursiveFetch({ url, array, accessToken }) {
	if(url) {
		const tracks = await getData(url, accessToken)
			.then(data => {
				pushToArray(array, data.items)
				if(data.next) {
					return recursiveFetch({ url: data.next, array: array, accessToken: accessToken })
				}
				return array
			})
		return tracks
	}
	return array
}
module.exports = recursiveFetch