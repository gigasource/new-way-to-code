import statusButtonFactory from './components/StatusButton'

export default {
  name: 'App',
  components: {
    StatusButton: statusButtonFactory()
  },
  render() {
    return <StatusButton>Test</StatusButton>
  }
}
