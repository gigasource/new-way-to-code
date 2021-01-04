<script>
  import Simple from './Simple'
  const { hooks, fn } = Simple();
  
  hooks.on('init', function() {
    this.update('_initialState', {
      count: 100
    })
    this.update('_initRef', 5)
  })
  
  hooks.on('lifeCycle', function() {
    this.update('_beforeCreated', () => {
    
    })
  })
  
  hooks.on('render', function (state, someRef) {
    this.update('simpleComponentRenderFn', () => {
      return <div>{state.count}</div>
    })
  })
  
  export default fn()
</script>
