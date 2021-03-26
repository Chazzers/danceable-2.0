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
const port = process.env.PORT || 5500

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