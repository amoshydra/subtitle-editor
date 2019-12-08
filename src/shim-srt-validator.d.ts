declare module 'srt-validator' {
  export enum ErrorCode {
    PARSER_ERROR_MISSING_TEXT = 'parserErrorMissingText',
    PARSER_ERROR_MISSING_SEQUENCE_NUMBER = 'parserErrorMissingSequenceNumber',
    PARSER_ERROR_INVALID_SEQUENCE_NUMBER = 'parserErrorInvalidSequenceNumber',
    PARSER_ERROR_MISSING_TIME_SPAN = 'parserErrorMissingTimeSpan',
    PARSER_ERROR_INVALID_TIME_SPAN = 'parserErrorInvalidTimeSpan',
    PARSER_ERROR_INVALID_TIME_STAMP = 'parserErrorInvalidTimeStamp',
    VALIDATOR_ERROR_START_TIME = 'validatorErrorStartTime',
    VALIDATOR_ERROR_END_TIME = 'validatorErrorEndTime',
    VALIDATOR_ERROR_SEQUENCE_NUMBER_START = 'validatorErrorSequenceNumberStart',
    VALIDATOR_ERROR_SEQUENCE_NUMBER_INCREMENT = 'validatorErrorSequenceNumberIncrement',
  }

  export enum Validator {
    LineNumberValidator = 'LineNumberValidator',
    CaptionTimeSpanValidator = 'CaptionTimeSpanValidator',
  }

  export interface SRTValidatorError {
    errorCode: ErrorCode | string,
    lineNumber: number,
    message: string,
    validator: Validator | string,
  }
  function srtValidator(strString: string): Array<SRTValidatorError>;
  export default srtValidator
}
