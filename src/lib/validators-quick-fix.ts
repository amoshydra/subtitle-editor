import * as monaco from 'monaco-editor'
import { ErrorCode } from './validators'

const getRange = (marker: monaco.editor.IMarkerData, adj?: {
  startLineNumber?: number
  startColumn?: number
  endLineNumber?: number
  endColumn?: number
}) => new monaco.Range(
  marker.startLineNumber + ((adj && adj.startLineNumber) || 0),
  marker.startColumn + ((adj && adj.startColumn) || 0),
  marker.endLineNumber + ((adj && adj.endLineNumber) || 0),
  marker.endColumn + ((adj && adj.endColumn) || 0)
)

const quickFixes: Record<ErrorCode, Function | null> = {
  [ErrorCode.ExcessiveSpaces]: (marker: monaco.editor.IMarkerData) => ({
    range: getRange(marker),
    text: ' '
  }),
  [ErrorCode.TrailingSpace]: (marker: monaco.editor.IMarkerData) => ({
    range: getRange(marker),
    text: ''
  }),
  [ErrorCode.UnexpectedNewline]: (marker: monaco.editor.IMarkerData) => ({
    range: getRange(marker, {
      endLineNumber: 1
    }),
    text: ''
  })
}

export const provideQuickFix = (model: monaco.editor.ITextModel) => (marker: monaco.editor.IMarkerData) => {
  if (!marker.code) return

  const fix = quickFixes[marker.code as ErrorCode]

  if (!fix) return

  return {
    title: `Fix: ${marker.message}`,
    diagnostics: [marker],
    edit: {
      edits: [{
        edits: [
          fix(marker)
        ],
        resource: model.uri
      }]
    },
    kind: 'quickfix'
  }
}
