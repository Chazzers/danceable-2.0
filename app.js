// helper
const login = require('./controllers/helpers/login.js')

// init
const initPlaylists = require('./controllers/init/initPlaylists.js')
const initCallback = require('./controllers/init/initCallback.js')
const initScore = require('./controllers/init/initScore.js')
const initHome = require('./controllers/init/initHome.js')


const express = require('express')
const cookieParser = require('cookie-parser')
const cors = require('cors')

const app = new express()
const port = process.env.NODE_ENV || 5500

require('dotenv').config()

app.set('view engine', 'ejs')
	.set('views', './views')

	.use(express.static('public'))
	.use(cors())
	.use(cookieParser())
	.use(express.json())
	.use(express.urlencoded({
		extended: true
	}))
	
	.get('/', initHome)
	.get('/login', login)
	.get('/callback', initCallback)
	.get('/playlists', initPlaylists)
	.get('/playlists/:id', initScore)
	.get('/playlists/:id/score', initScore)

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