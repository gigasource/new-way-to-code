<script>
  import textFieldFactory from './TextField';
  import Portal from 'portal-vue/src/components/portal'

  const { hooks, fn } = textFieldFactory()

  hooks.on('r:textField', function (label, text, isValidText, textFieldRenderFn) {
    this.update('textFieldRenderFn', () => {
      return (
          <Portal to="text-field">
            <>
              <div style="color: blue">{label.value}</div>
              <input
                  style={{ color: isValidText.value ? '#000' : 'red' }}
                  value={text} onInput={e => text.value = e}/>
            </>
          </Portal>
      )
    })
  })

  export default fn()
</script>

<style scoped>

</style>
