// // router
// const Router = require('./router/Router.js')

// // fetch
// const getTracks = require('./fetch/getTracks.js')
// const getData = require('./fetch/getData.js')

// config
const { url } = require('./js/config/api.js')



// render
// const renderPlaylists = require('./render/renderPlaylists.js')
// const renderHome = require('./render/renderHome.js')
// const renderLoading = require('./render/renderLoading.js')
// const renderScore = require('./render/renderScore.js')

// helper
const login = require('./js/helpers/login.js')
// const createBtnEventListeners = require('./helpers/createBtnEventListeners.js')
// const btnEvent = require('./helpers/btnEvent.js')
// const { cleanData, mergeNestedArray } = require('./helpers/cleanData.js')
// const calcScore = require('./helpers/calcScore.js')
// const recursiveFetch = require('./fetch/recursiveFetch.js')
// const pushToArray = require('./helpers/pushToArray.js')
// const accessIsThere = require('./helpers/accessIsThere.js')
// const setAccessToken = require('./helpers/setAccessToken.js')
// const { setLocalStorageItem, removeLocalStorageItem, getLocalStorageItem } = require('./helpers/localStorage.js')

// init
const initPlaylists = require('./js/init/initPlaylists.js')
const initCallback = require('./js/init/initCallback.js')


const express = require('express')
const cookieParser = require('cookie-parser')
const cors = require('cors')

const app = new express()
const port = 5500

require('dotenv').config()

app.set('view engine', 'ejs')
	.set('views', './views')

	.use(express.static('assets'))
	.use(cors())
	.use(cookieParser())

	.get('/', (req,res) => res.render('index'))
	.get('/login', login)
	.get('/callback', initCallback)
	.get('/playlists', initPlaylists)


	.listen(port, () => {
		console.log(`Example app listening at http://localhost:${port}`)
	})


// function init() {
// 	// initialize router
// 	const router = new Router({
// 		mode: 'hash', 
// 		root: '/'
// 	})

// 	// check if access is there ie if there is an access token in the url
// 	if(accessIsThere) {
// 		setAccessToken()
// 		router.navigate('/playlists')
// 	}

// 	router
// 		.add(/login/, () => {
// 			// replace the url with the api url for logging in
// 			window.location.replace(url)
// 		})
// 		.add(/playlists/, async() => {
// 			// get playlists
// 			const playlists = await getData('https://api.spotify.com/v1/me/playlists').then(data => {
// 				const dataArray = []
// 				pushToArray(dataArray, data.items)
// 				return recursiveFetch({ 
// 					url: data.next,
// 					array: dataArray
// 				})
// 			}).then(data => mergeNestedArray(data))

// 			removeLocalStorageItem('href')
// 			removeLocalStorageItem('img')
// 			removeLocalStorageItem('name')
// 			removeLocalStorageItem('danceability_score')

// 			// render the playlists
// 			renderPlaylists(playlists)

// 			// create eventlisteners for the playlists
// 			createBtnEventListeners({
// 				eventFunction: btnEvent,
// 				selector: 'a'
// 			})
// 		})
// 		.add(/loading/, async() => {
// 			// render loading page
// 			renderLoading()
			
// 			// get tracks
// 			const tracks = await getTracks(`${getLocalStorageItem('href')}/tracks?offset=0&limit=100`)

// 			// clean the track data
// 			const cleanTracks = cleanData(tracks.trackData, tracks.audioFeaturesData)

// 			// calc the score from cleaned data
// 			const score = calcScore(cleanTracks, 'danceability')

// 			// save score in local storage
// 			setLocalStorageItem('danceability_score', score)

// 			// navigate to /score
// 			router.navigate('/score')
// 		})
// 		.add(/score/, () => {
// 			// render the result
// 			renderScore()
// 		})
// 		.add('', () => {
// 			// if no path is present, renderhome
// 			renderHome()
// 		})
// }

// init()