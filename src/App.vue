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
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
