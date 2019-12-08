import * as monaco from 'monaco-editor'
import { provideQuickFix } from './validators-quick-fix'

export const LanguageName = 'srt-subtitle'

export const registerProvider = () => {
  monaco.languages.register({ id: LanguageName })

  monaco.languages.registerCodeActionProvider(LanguageName, {
    provideCodeActions (model, range, context, token) {
      const getQuickFixAction = provideQuickFix(model)

      const codeActions: monaco.languages.CodeAction[] = []
      for (const marker of context.markers) {
        const quickFixAction = getQuickFixAction(marker)
        if (quickFixAction) {
          codeActions.push(quickFixAction)
        }
      }
      return { actions: codeActions, dispose () {} }
    }
  })

  // Register a tokens provider for the language
  monaco.languages.setMonarchTokensProvider(LanguageName, {
    tokenizer: {
      root: [
        [/^(\d{2}:\d{2}:\d{2},\d{3})/, 'timeline-start'],
        [/ (-->) /, 'timeline-arrow'],
        [/(\d{2}:\d{2}:\d{2},\d{3})$/, 'timeline-end'],
        [/^(\d+)$/, 'number']
      ]
    }
  })

  // Define a new theme that contains only rules that match this language
  monaco.editor.defineTheme(LanguageName, {
    colors: {},
    base: 'vs-dark',
    inherit: true,
    rules: [
      { token: 'timeline-start', foreground: 'e29bff', fontStyle: 'bold' },
      { token: 'timeline-arrow', foreground: '625582' },
      { token: 'timeline-end', foreground: 'ff9b9b', fontStyle: 'bold' },
      { token: 'number', foreground: 'AAAAF0' }
    ]
  })
}
