import srtValidator, { SRTValidatorError, ErrorCode, Validator } from 'srt-validator'
import * as monaco from 'monaco-editor'
import { validateSubtitleBlock } from './language-providers/srt/validators'

export interface ValidatorError extends SRTValidatorError {
  severity?: monaco.MarkerSeverity
  code?: string
  source?: string
  startColumn?: number
  endColumn?: number
}

interface Meow {
  errors: ValidatorError[],
  assembled?: string
}

export const validateSubtitle = (subtitle = ''): ValidatorError[] => {
  if (subtitle === '') return []

  const srtValidatorErrors = srtValidator(subtitle)

  const results = subtitle
    .replace(/\r/g, '')
    .replace(/\n$/g, '')
    .split(/\n\n/)
    .reduce((acc, text) => {
      acc.errors = [
        ...acc.errors,
        ...validateSubtitleBlock(text, acc.assembled)
      ]
      acc.assembled = acc.assembled != null ? [acc.assembled, text].join('\n\n') : text
      return acc
    }, {
      errors: srtValidatorErrors,
      assembled: undefined
    } as Meow)

  return [...results.errors].sort((a, b) => a.lineNumber - b.lineNumber)
}

export const toMarker = (error: ValidatorError): monaco.editor.IMarkerData => ({
  message: error.message,
  severity: error.severity || 8,
  code: error.errorCode,
  source: error.source,
  startLineNumber: error.lineNumber,
  endLineNumber: error.lineNumber,
  startColumn: error.startColumn || 0,
  endColumn: error.endColumn != null ? error.endColumn : Infinity
})
