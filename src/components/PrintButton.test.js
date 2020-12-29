import printButtonFactory from './PrintButton'
import { mount } from "@vue/test-utils";

describe('PrintButton test', function () {
	it('test render', async function () {
		const { fn, hooks } = printButtonFactory()
		hooks.on('r:payPrintBtnFn', function (payPrintBtnFn, payBtnLabel, payBtnClickable) {
			this.update("payPrintBtnFn", () => (
				<button class={{ "btn-blur": !payBtnClickable.value }}>
					{payBtnLabel.value}
				</button>
			))
		})

		const component = fn()
		const wrapper = mount(component, {
			props: {
				msg: 'Hello World'
			}
		})

		expect(wrapper.html()).toMatchInlineSnapshot(
			`"<button class=\\"btn-blur\\">print</button><p></p>"`
		)
	}, 80000)
})
