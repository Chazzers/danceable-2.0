// https://github.com/thecreazy/create-a-modern-javascript-router
// https://www.hackdoor.io/articles/create-modern-javascript-router-ff919b1cbb08

class Router {
	// routes: list of registered routes
	// mode: hash or history
	// root: root of the application 
	routes = []
	mode = null
	root = '/'

	constructor(options) {
		this.mode = window.history.pushState ? "history" : "hash"
		if (options.mode) this.mode = options.mode
		if (options.root) this.root = options.root
		
		this.listen()
	}
	// method for adding a route
	add = (path, callback) => {
		this.routes.push({ path, callback })
		return this
	}
	// method for removing a route
	remove = path => {
		this.routes.forEach((route, index) => {
			if(route.path === path) {
				this.routes.slice(index, 1)
				return this
			}
		})
	}
	// clear all routes
	flush = () => {
		this.routes = []
		return this
	}
	// clearslashes of path
	clearSlashes = path => 
		path
			.toString()
			.replace(/\/$/, "")
			.replace(/^\//, "")

	

	// get pathname and search
	getFragment = () => {
		let fragment = ''

		if(this.mode === 'history') {
			fragment = this.clearSlashes(decodeURI(window.location.pathname + window.location.search))
			fragment = fragment.replace(/\?(.*)$/, "")
			fragment = this.root !== "/" ? fragment.replace(this.root, "") : fragment
		} else {
			const match = window.location.href.match(/#(.*)$/)
      		fragment = match ? match[1] : ""
		}
		return this.clearSlashes(fragment)
	}

	// navigate through js
	navigate = (path = '') => {
		if(this.mode == 'history') {
			window.history.pushState(null, null, this.root + this.clearSlashes(path))
		} else {
			window.location.href = `${window.location.href.replace(/#(.*)$/, "")}#${path}`
		}
		return this
	}

	// listen to route changes
	listen = () => {
		clearInterval(this.interval)
		this.interval = setInterval(this.interval, 50)
	}

	// create an interval
	interval = () => {
		if(this.current === this.getFragment()){
			return
		}
		this.current = this.getFragment()
		this.routes.some(route => {
			const match = this.current.match(route.path)
			
			if(match) {
				match.shift()
				route.callback.apply({}, match)
				return match
			}
			return false
		})
	}
}

export default Router