<template>
  <portal-target name="text-field"/>
  <portal-target name="print-btn"/>
</template>

<script>
  import TextFieldUI from '../TextField/TextFieldUI';
  import PortalTarget from 'portal-vue/src/components/portal-target'

  export default {
    name: 'TestView',
    components: { TextFieldUI, PortalTarget },
}
</script>

<style scoped>

</style>
