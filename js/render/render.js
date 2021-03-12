const fs = require('fs')
const ejs = require('ejs')

//https://www.smashingmagazine.com/2020/09/stack-custom-made-static-site-generator/

// render html function
function render(filename, data) {
	const source = fs.readFileSync(filename, 'utf8').toString()
	const template = ejs.compile(source)
	const output = template(data)
	
	return output
}

module.exports = render