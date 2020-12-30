const { argv } = require('yargs')
const { defaults } = require('jest-config')

module.exports = {
	verbose: true,
	preset: argv.testNamePattern.includes('Visual:') ? "jest-puppeteer" : defaults.preset,
	transform: {
		'^.*\\.vue$': "vue-jest",
		'^.+\\.js$': "<rootDir>/node_modules/babel-jest",
	}
}
