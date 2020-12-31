import printButtonFactory from './components/PrintButton'
import TestView from './components/TestView/TestView';

const { hooks, fn } = printButtonFactory()

hooks.on('r:payPrintBtnFn', function (payPrintBtnFn, payBtnLabel, payBtnClickable) {
  // override render fn
  this.update("payPrintBtnFn", () => (
    <button class={{ "btn-blur": !payBtnClickable.value }}>
      {payBtnLabel.value}
    </button>
  ))
})

export default {
  name: 'App',
  components: {
    PrintButton: fn(),
  },
  render() {
    return <TestView/>
  }
}
