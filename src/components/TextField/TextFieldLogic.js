import { ref, computed } from 'vue'

function logicFactory() {
  const text = ref('')
  const label = ref('label')

  const isValidText = computed(() => !!text.value && text.value.length >= 5)

  return { label, text, isValidText }
}

export default logicFactory
