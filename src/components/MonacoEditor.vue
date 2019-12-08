<template>
  <div
    ref="root"
    class="$style.editor"
  />
</template>

<script lang='ts'>
import * as monaco from 'monaco-editor'
import { createComponent, onMounted, ref, onBeforeUnmount, watch } from '@vue/composition-api'
import { validateSubtitle, toMarker } from '@/lib/subtitle-validator'
import { registerProvider, LanguageName } from '@/lib/language-providers/srt/index'

registerProvider()

const createEditor = (element: HTMLElement, initialValue = '', options?: monaco.editor.IEditorConstructionOptions) => {
  return monaco.editor.create(element, {
    renderControlCharacters: true,
    renderWhitespace: 'all',

    minimap: {
      enabled: false
    },
    theme: LanguageName,
    value: initialValue,
    language: LanguageName,
    ...options
  })
}

export default createComponent<{ value: string }>({
  props: {
    value: {
      type: String,
      default: ''
    }
  },
  setup (props, context) {
    const root = ref<HTMLElement>()
    let editor: monaco.editor.IStandaloneCodeEditor

    onMounted(() => {
      if (!root.value) return
      editor = createEditor(root.value, props.value)
      const model = editor.getModel()

      editor.onDidChangeModelContent((event) => {
        const content = editor.getValue({
          preserveBOM: true,
          lineEnding: 'LF'
        })

        const validationResults = validateSubtitle(content)
        context.emit('error', validationResults)
        if (model) {
          monaco.editor.setModelMarkers(model, 'srt-validator', validationResults.map(toMarker))
        }

        context.emit('input', content)
      })
    })

    onBeforeUnmount(() => {
      if (!editor) return
      editor.dispose()
    })

    return {
      root
    }
  }
})
</script>

<style module>
.editor {
  height: 100%;
  width: 100%;
}
</style>
