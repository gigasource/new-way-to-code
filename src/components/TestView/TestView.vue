<template>
  <portal-target name="text-field"/>
  <portal-target name="print-btn"/>
  <text-field/>
  <print-btn msg="message"/>
</template>

<script>
  import TextFieldUI from '../TextField/TextFieldUI';
  import { PortalTarget, Portal } from 'portal-vue/dist/portal-vue.esm'

  import printButtonFactory from '../PrintButton'

  const { hooks, fn } = printButtonFactory()

  hooks.on("r:payPrintBtnFn", function(
      payPrintBtnFn,
      payBtnLabel,
      payBtnClickable
  ) {
    this.update("payPrintBtnFn", () => (
        <Portal to="print-btn">
          <button>{payBtnLabel.value}</button>
        </Portal>
    ));
  });

  export default {
    name: 'TestView',
    components: { PrintBtn: fn(), TextField: TextFieldUI, PortalTarget },
}
</script>

<style scoped>

</style>
