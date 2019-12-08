<template>
  <div>
    <template v-if="!subtitle">
      👈 Paste your subtitle on the left
    </template>
    <template v-else>
      <pre>{{ info }}</pre>
    </template>
  </div>
</template>

<script lang="ts">
import { createComponent, ref, computed } from '@vue/composition-api'
import { ValidatorError } from '@/lib/subtitle-validator'
import { getLineEnding } from '@/lib/line-ending-detector'

export default createComponent<{ subtitle: string, validations: ValidatorError }>({
  components: {
  },
  props: {
    subtitle: {
      type: String,
      default: ''
    },
    validations: {
      type: Array,
      required: true
    }
  },
  setup (props) {
    const info = computed(() => {
      return JSON.stringify({
        lineEnding: getLineEnding(props.subtitle),
        type: props.subtitle.startsWith('WEBVTT') ? 'VTT' : 'SRT'
      }, null, 2)
    })
    return {
      info
    }
  }
})
</script>

<style lang="scss" module>

</style>
