<script>
  import printButtonFactory from './PrintButton'

  const { hooks, fn } = printButtonFactory()

  hooks.on("r:payPrintBtnFn", function(
      payPrintBtnFn,
      payBtnLabel,
      payBtnClickable
  ) {
    this.update("payPrintBtnFn", () => (
        <button class={{ "btn-blur": !payBtnClickable.value }}>
          {payBtnLabel.value}
        </button>
    ));
  });

  export default fn()
</script>

<style>
  .btn-blur {
    opacity: 0.5;
  }
</style>
