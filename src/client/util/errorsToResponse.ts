import * as t from 'io-ts';
import { NewsErrorResponse } from '../types';

const errorsToResponse = (errors: t.Errors): NewsErrorResponse => {
  console.warn(JSON.stringify(errors));
  return {
    status: 'error',
    code: 'parseError',
    message: `${errors.length} parsing error(s) encountered.`
  }
};

export default errorsToResponse;
