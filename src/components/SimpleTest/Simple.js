import Hooks from 'schemahandler/hooks/hooks'
import { reactive, ref,
  onBeforeMount,
  onMounted,
  onBeforeUnmount,
  onUnmounted,
  onBeforeUpdate,
  onUpdated
} from 'vue'

const simpleFac = () => {
  const hooks = new Hooks();

  const fn = () => ({
    name: 'Simple',
    setup() {
      // hooks allow to customize initial state, ref
      let _initState = {}
      let _initRef = {}
      hooks.emit('init', { _initState, _initRef }, e => eval(e))
      const state = reactive(_initState)
      const someRef = ref(_initRef)

      let _onCreated = () => {}
      let _mounted = () => {}
      let _beforeUnmount = () => {}
      let _unmounted = () => {}
      let _beforeUpdate = () => {}
      let _updated = () => {}

      // hooks allow to customer vue life cycle
      hooks.emit('lifeCycle', {
        _onCreated, _mounted, _beforeUnmount, _unmounted
      }, e => eval(e))
      onMounted(_mounted)
      onBeforeMount(_beforeUnmount)
      onBeforeUnmount(_beforeUnmount)
      onUnmounted(_unmounted)
      onBeforeUpdate(_beforeUpdate)
      onUpdated(_updated)

      // run onCreated
      _onCreated()

      // hooks to customer render function
      let simpleComponentRenderFn = () => <div>Hello there</div>;
      hooks.emit('render', { state, someRef }, { simpleComponentRenderFn }, e => eval(e));

      return simpleComponentRenderFn;
    }
  });

  return { hooks, fn }
};


export default simpleFac
