import hooks from 'schemahandler/hooks/hooks'
// const hooks = require('schemahandler/hooks/hooks')

const statusButtonFactoryHook = new hooks()

console.log(statusButtonFactoryHook)

const statusButtonFactory = () => ({
	name: 'StatusButton',
	setup(props, context) {
		const genStatusButton = () =>
		<button>
			{context.slots && context.slots.default()}
		</button>
		return {
			genStatusButton
		}
	},
	render() {
		return this.genStatusButton()
	}
})

export default statusButtonFactory
