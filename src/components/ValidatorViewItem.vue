<template>
  <div
  >
    <code>
      Line: {{ validation.lineNumber }}
      <template v-if="validation.endColumn">
        [{{ validation.startColumn }}, {{ validation.endColumn }}]
      </template>
    </code>
    <br>
    <blockquote
      style=""
    ><small>{{ validation.message }}</small></blockquote>
  </div>
</template>

<script lang="ts">
import { createComponent, ref, computed } from '@vue/composition-api'
import { ValidatorError } from '../lib/subtitle-validator'

export default createComponent<{ validation: ValidatorError }>({
  props: {
    validation: {
      type: Object,
      required: true
    }
  },
  setup () {
    return {
    }
  }
})
</script>

<style lang="scss" module>

</style>
