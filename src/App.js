import printButtonFactory from './components/PrintButton'

const { hooks, fn } = printButtonFactory()

hooks.on('r:payPrintBtnFn', function (payPrintBtnFn, payBtnLabel, payBtnClickable) {
  this.update("payPrintBtnFn", () => (
    <button class={{ "btn-blur": !payBtnClickable.value }}>
      {payBtnLabel.value}
    </button>
  ))
})

export default {
  name: 'App',
  components: {
    PrintButton: fn()
  },
  render() {
    return <PrintButton/>
  }
}
