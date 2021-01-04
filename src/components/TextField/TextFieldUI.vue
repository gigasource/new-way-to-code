<script>
  import textFieldFactory from './TextField';
  import { Portal } from 'portal-vue/dist/portal-vue.esm'

  const { hooks, fn } = textFieldFactory()

  hooks.on('label', function (label) {
    label.value = 'custom label'
  })

  hooks.on('r:textField', function (label, text, isValidText, textFieldRenderFn) {
    this.update('textFieldRenderFn', () => {
      return (
          <Portal to="text-field">
            <>
              <div style="color: blue">{label.value}</div>
              <input style={{ color: isValidText.value ? '#000' : 'red' }} v-model={text.value} />
            </>
          </Portal>
      )
    })
  })

  export default fn()
</script>

<style scoped>

</style>
