// calc the final score
function calcScore(array, averageProperty) {
	const average = calcAverage(array, averageProperty)
	const decimalScore = average + calcStandardDeviationInfluence(array, 'danceability') + calcStandardDeviationInfluence(array, 'tempo')
	return Math.round(decimalScore * 100)
}
// calc the influence of the standard deviation of an array of values
function calcStandardDeviationInfluence(array, property) {
	const average = calcAverage(array, property)
	const standardDeviation = calcStandardDeviation(array, property)
	const percentageOfAverage = (standardDeviation / average)
	const reversePercentage = 1 - percentageOfAverage
	const scale = 0.5
	const reversePercentageMinusScale = reversePercentage - scale
	const finalScore = reversePercentageMinusScale / 10
	return finalScore
}
// calc average of array of values
function calcAverage(array, property) {
	return array.reduce((a, b) => a + b[property], 0) / array.length
}

// calc the standardDeviation of an array of values
function calcStandardDeviation(array, property) {
	const average = calcAverage(array, property)
	return Math.sqrt(array.map(x => Math.pow(x[property] - average, 2)).reduce((a, b) => a + b) / array.length)
}


export default calcScore