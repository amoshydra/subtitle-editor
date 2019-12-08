<template>
  <div id="app">
    <EditorContainer />
  </div>
</template>

<script lang="ts">
import EditorContainer from './components/EditorContainer.vue'
import { createComponent } from '@vue/composition-api'

export default createComponent({
  components: {
    EditorContainer
  }
})
</script>

<style lang="scss">
body {
  margin: 0;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
