import React from 'react';
import Async from 'react-async';
import { Either, fold } from 'fp-ts/lib/Either';
import { NewsErrorResponse } from '../client/types';
import jsErrorToResponse from '../client/util/jsErrorToResponse';

const ApiErrorComponent = (error: NewsErrorResponse) => (
  <div>
    <h1>Api Error</h1>
    <p>{error.message} ({error.code})</p>
  </div>
);

const defaultLoading: React.FC = () => (
  <p>Loading...</p>
);

interface ApiLoaderProps<T> {
  apiCall: () => Promise<Either<NewsErrorResponse, T>>;
  render: (data: T) => any;
  loadingRender?: React.FC;
}

const ApiLoader = function<T>({
  apiCall,
  render,
  loadingRender
}: ApiLoaderProps<T>) {
  return (
    <Async promiseFn={apiCall}>
      <Async.Pending>
        {(loadingRender || defaultLoading)({})}
      </Async.Pending>
      <Async.Fulfilled>
        {fold(ApiErrorComponent, render)}
      </Async.Fulfilled>
      <Async.Rejected>
        {error => ApiErrorComponent(jsErrorToResponse(error))}
      </Async.Rejected>
    </Async>
  );
}

export default ApiLoader;
