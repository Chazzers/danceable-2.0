const getData = require('./getData.js')
const { mergeNestedArray } = require('../helpers/cleanData')
const recursiveFetch = require('./recursiveFetch.js')
const pushToArray = require

function getAllPlaylists(url) {
	return getData(url).then(data => {
		const dataArray = []
		pushToArray(dataArray, data.items)
		return recursiveFetch({ 
			url: data.next,
			array: dataArray
		})
	}).then(data => mergeNestedArray(data))
}

module.exports = getAllPlaylists