import textFieldFactory from './TextField';
const puppeteer = require('puppeteer');
const path = require('path')
const { renderToString } = require('@vue/server-renderer')
const express = require('express')
const Hooks = require('schemahandler/hooks/hooks')
const setupTest = require('../../test-utils/setupTest')
const { toMatchImageSnapshot } = require('jest-image-snapshot')
const { createSSRApp } = require('vue')
expect.extend({ toMatchImageSnapshot });

const server = express()
const port = 3000
let AppFactory
let manifest
const testHook = new Hooks()

describe('Visual:TextField', function () {
  beforeAll(async function () {
    await setupTest({
      componentName: 'TextField',
      componentPath: path.resolve(__dirname, './TextFieldUI.vue')
    })
    manifest = require('../../../dist_test/ssr-manifest.json')
    AppFactory = require('../../test-utils/AppFactory').default

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

  it('test text field inject ui', async function (done) {
    const { hooks, fn } = textFieldFactory()

    hooks.on('label', function (label) {
      label.value = 'custom label'
    })

    hooks.on('text', function (text) {
      text.value = 'test'
    })

    hooks.on('r:textField', function (label, text, isValidText, textFieldRenderFn) {
      this.update('textFieldRenderFn', () => {
        return (
          <>
            <div style="color: blue">{label.value}</div>
            <input style={{ color: isValidText.value ? '#000' : 'red' }} v-model={text.value} />
          </>
        )
      })
    })

    const App = AppFactory(fn())

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
