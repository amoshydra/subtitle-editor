<template>
  <div :class="$style.columns">
    <MonacoEditor
      :class="$style.column"
      v-model="subtitleString"
      @error="errors => validations = errors"
    />
    <div
      :class="$style.column"
      style="overflow: auto; padding: 1em;"
    >
      <SubtitleInfoView
        :subtitle="subtitleString"
        :validations="validations"
      />
      <ValidatorView
        v-if="subtitleString"
        :validations="validations"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { createComponent, ref, computed } from '@vue/composition-api'
import { parseSrt } from '@/lib/subtitle-parser'
import { ValidatorError } from '../lib/subtitle-validator'
import MonacoEditor from './MonacoEditor.vue'
import ValidatorView from './ValidatorView.vue'
import SubtitleInfoView from './SubtitleInfoView.vue'

export default createComponent({
  components: {
    MonacoEditor,
    ValidatorView,
    SubtitleInfoView
  },
  setup () {
    const subtitleString = ref<string>('')
    const validations = ref <ValidatorError[]>([])

    return {
      subtitleString,
      validations
    }
  }
})
</script>

<style lang="scss" module>
.columns {
  display: flex;
  height: 100vh;
  overflow: hidden;
  background-color: #1e1e1e;
  color: #d4d4d4;
}
.column {
  width: 100%;
  height: 100%;
  box-shadow: 1px 1px 8px 1px rgba(0, 0, 0, 0.5);
}

.full {
  width: 100%;
  height: 100%;
}
</style>
