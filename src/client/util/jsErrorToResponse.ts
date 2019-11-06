import { NewsErrorResponse } from "../types";

export const jsErrorToResponse = (error: any): NewsErrorResponse => {
  console.error(error);

  if (error.response && error.response.data) {
    return error.response.data;
  } else if (error.message) {
    return { status: 'error', code: 'client-code-error', message: error.message };
  } else {
    return {
      status: 'error',
      code: 'unknown',
      message: 'An unexpected error occurred. Please try again later.'
    };
  }
};

export default jsErrorToResponse;
