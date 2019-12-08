<template>
  <div>
    <template v-if="validations.length">
      <ValidatorViewItem
        v-for="(validation, index) in validations"
        :key="index"
        :validation="validation"
      />
    </template>
    <template v-else>
      👍 all is good
    </template>
  </div>
</template>

<script lang="ts">
import { createComponent, ref, computed } from '@vue/composition-api'
import { ValidatorError } from '../lib/subtitle-validator'
import ValidatorViewItem from './ValidatorViewItem.vue'

export default createComponent<{ validations: ValidatorError[] }>({
  components: {
    ValidatorViewItem
  },
  props: {
    validations: {
      type: Array,
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
