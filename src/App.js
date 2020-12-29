import printButtonFactory from './components/PrintButton'

export default {
  name: 'App',
  components: {
    PrintButton: printButtonFactory().fn()
  },
  render() {
    return <PrintButton/>
  }
}
