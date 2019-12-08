export enum LineEnding {
  CRLF = 'CRLF',
  LF = 'LF',
  Mixed = 'Mixed',
}

export const getLineEnding = (subtitle: string) => {
  const crCount = subtitle.split('\r').length
  const lfCount = subtitle.split('\n').length
  if (crCount === lfCount) return LineEnding.CRLF
  if (crCount === 0) return LineEnding.LF
  return LineEnding.Mixed
}
