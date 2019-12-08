import { ValidatorError } from './subtitle-validator'
import { MarkerSeverity } from 'monaco-editor'

const VALIDATOR_NAME = 'amoshydra'

export enum ErrorCode {
  UnexpectedNewline = 'unexpectedNewline',
  ExcessiveSpaces = 'excessiveSpaces',
  TrailingSpace = 'trailingSpace'
}

export const validateSubtitleBlock = (subtitleBlock: string, previousSection?: string) => {
  const startLine = previousSection == null ? 0 : previousSection.split('\n').length + 1
  const errors: ValidatorError[] = []

  console.log({ subtitleBlock })
  if (subtitleBlock === '') {
    errors.push({
      errorCode: ErrorCode.UnexpectedNewline,
      lineNumber: startLine,
      message: 'Unexpected newline',
      validator: VALIDATOR_NAME
    })
  }
  if (subtitleBlock.match(/^[\n\r]+/)) {
    errors.push({
      errorCode: ErrorCode.UnexpectedNewline,
      lineNumber: startLine,
      message: 'Unexpected newline',
      validator: VALIDATOR_NAME
    })
  }
  if (subtitleBlock.match(/[\n\r]+$/)) {
    errors.push({
      errorCode: ErrorCode.UnexpectedNewline,
      lineNumber: startLine + subtitleBlock.split('\n').length,
      message: 'Unexpected newline',
      validator: VALIDATOR_NAME
    })
  }

  subtitleBlock.replace(/[ ]+$/gm, (match: string, where: number, fullmatch: string) => {
    const front = fullmatch.slice(0, where)
    const target = fullmatch.slice(where, where + match.length)
    const back = fullmatch.slice(where + match.length)
    const frontLines = front.split('\n')
    const beforeTarget = frontLines.slice(-1)[0]

    errors.push({
      errorCode: ErrorCode.TrailingSpace,
      message: 'Unexpected trailing space',
      lineNumber: startLine + frontLines.length,
      startColumn: beforeTarget.length + 1,
      endColumn: beforeTarget.length + target.length + 1,
      validator: VALIDATOR_NAME,
      severity: MarkerSeverity.Warning
    })

    return ''
  })
  subtitleBlock.replace(/[ ]{2,}/g, (match: string, where: number, fullmatch: string) => {
    const front = fullmatch.slice(0, where)
    const target = fullmatch.slice(where, where + match.length)
    const back = fullmatch.slice(where + match.length)
    const frontLines = front.split('\n')
    const beforeTarget = frontLines.slice(-1)[0]

    if (back === '' || back[0] === '\n') {

    } else {
      errors.push({
        errorCode: ErrorCode.ExcessiveSpaces,
        message: 'Multiple spaces',
        lineNumber: startLine + frontLines.length,
        startColumn: beforeTarget.length + 1,
        endColumn: beforeTarget.length + target.length + 1,
        validator: VALIDATOR_NAME,
        severity: MarkerSeverity.Warning
      })
    }

    return ''
  })

  return errors
}
