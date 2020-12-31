const express = require('express')
const path = require('path')
const fs = require('fs')
const { createSSRApp } = require('vue')
const { renderToString } = require('@vue/server-renderer')
const printButtonFactory = require('./PrintButton').default
const Hooks = require('schemahandler/hooks/hooks')
const setupTest = require('../test-utils/setupTest')
const manifest = require('../../dist_test/ssr-manifest.json')
const puppeteer = require('puppeteer')
const { toMatchImageSnapshot } = require('jest-image-snapshot')
const printButtonUI = require('./PrintButtonUI.vue').default
expect.extend({ toMatchImageSnapshot });

const testHook = new Hooks()
const port = 3000

const server = express()
let AppFactory

jest.setTimeout(60000)

describe('Visual:printButton', function () {
	beforeAll(async function () {
		await setupTest({
			componentName: 'PrintButton',
			componentPath: path.resolve(__dirname, './PrintButtonUI.vue')
		})

		AppFactory = require('../test-utils/AppFactory').default

		let stylesheet = ''
		Object.keys(manifest).forEach(file => {
			if (file.endsWith('css')) {
				server.use(`/${manifest[file]}`, express.static(path.join(__dirname, '../../dist_test', manifest[file])))
				stylesheet += `\n<link rel="stylesheet" href=${manifest[file]} />`
			}
		})

		server.get('*', async (req, res) => {
			let AppWillBeRendered
			testHook.emit('App', AppWillBeRendered, e => eval(e))
			const app = createSSRApp(AppWillBeRendered)
			const appContent = await renderToString(app)

			const html = `
			  <html>
			    <head>
			      <title>Hello</title>
			      ${stylesheet}
			    </head>
			    <body>
			      ${appContent}
			    </body>
			  </html>
		  `;

			res.end(html);
		})

		server.listen(port, () => console.log(`Listening on: ${port}`))
	})

	it('test visual button as ssr', async function (done) {
		const printButton = printButtonFactory().fn()
		const App = AppFactory(printButton)
		testHook.on('App', function (AppWillBeRendered) {
			this.update('AppWillBeRendered', App)
		})
	}, 100000)

	it('test visual button as ssr 2', async function (done) {
		const { fn, hooks } = printButtonFactory()
		hooks.on('order', function (order) {
			order.items.push({ name: "cola", sent: true })
		})
		const printButton = fn()
		const App = AppFactory(printButton)
		testHook.on('App', function (AppWillBeRendered) {
			this.update('AppWillBeRendered', App)
		})
		let browser = await puppeteer.launch({
			headless: true
		})
		let page = await browser.newPage()
		await page.goto('http://localhost:3000')
		const image = await page.screenshot({ fullPage: true })
		expect(image).toMatchImageSnapshot()
		done()
	}, 100000)

	it('test print button inject ui', async function (done) {
		const App = AppFactory(printButtonUI)
		testHook.on('App', function (AppWillBeRendered) {
			this.update('AppWillBeRendered', App)
		})
		let browser = await puppeteer.launch({
			headless: false
		})
		let page = await browser.newPage()
		await page.goto('http://localhost:3000')
		const image = await page.screenshot({ fullPage: true })
		expect(image).toMatchImageSnapshot()
		done()
	}, 100000)
})
