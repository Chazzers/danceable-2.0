const getData = require('./getData.js')
const { mergeNestedArray } = require('../helpers/cleanData')
const recursiveFetch = require('./recursiveFetch.js')
const pushToArray = require('../helpers/pushToArray')

function getAllPlaylists(url, accessToken) {
	return getData(url, accessToken).then(data => {
		const dataArray = []
		pushToArray(dataArray, data.items)
		return recursiveFetch({ 
			url: data.next,
			array: dataArray,
			accessToken: accessToken
		})
	}).then(data => mergeNestedArray(data))
}

module.exports = getAllPlaylists