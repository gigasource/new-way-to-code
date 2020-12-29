import Hooks from 'schemahandler/hooks/hooks'
import logicFactory from './PrintButtonLogic'
import { ref, watchEffect } from 'vue'

const printButtonFactory = () => {
	const hooks = new Hooks()
	const fn = () => ({
		name: 'PrintButton',
		setup({ msg }) {
			const { order, payBtnLabel, payBtnClickable } = logicFactory()

			const _ref = ref("");
			watchEffect(() => {
				_ref.value = msg + " extend";
			});

			let payPrintBtnFn = () => {
				return (
					<p style={{ opacity: payBtnClickable ? 1 : 0.5 }}>
						{payBtnLabel.value}
					</p>
				);
			}

			hooks.emit("r:payPrintBtnFn", payPrintBtnFn, payBtnLabel, payBtnClickable, e => eval(e))

			return () => (
				<>
					{payPrintBtnFn()}
					<p></p>
				</>
			);
		}
	})
	return {
		hooks,
		fn
	}
}

export default printButtonFactory
