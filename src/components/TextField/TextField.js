import Hooks from 'schemahandler/hooks/hooks'
import logicFactory from './TextFieldLogic';

const textFieldFactory = () => {
  const hooks = new Hooks()

  const fn = () => ({
    name: 'TextField',
    setup() {
      const { label, text, isValidText } = logicFactory()

      hooks.emit('label', label, e => eval(e))
      hooks.emit('text', text, e => eval(e))

      let textFieldRenderFn = () => {
        return (
          <>
            <label>{label}</label>
            <input value={text} onInput={e => text.value = e} />
          </>
        )
      }

      hooks.emit('r:textField', label, text, isValidText, textFieldRenderFn, e => eval(e))

      return () => (
        <>
          { textFieldRenderFn() }
        </>
      )
    }
  })

  return { hooks, fn }
}

export default textFieldFactory
