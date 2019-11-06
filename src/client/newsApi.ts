import * as t from 'io-ts';
import axios from 'axios';
import Url from './util/Url';
import { Params } from './params';
import { Either } from 'fp-ts/lib/Either';
import decodeResult from './decodeResult';
import jsErrorToResponse from './util/jsErrorToResponse';
import errorsToResponse from './util/errorsToResponse';

import {
  TopHeadlineParams,
  NewsErrorResponse,
  NewsArticleResponse,
  NewsArticleResponseType,
  NewsErrorResponseType,
  SourcesParams,
  NewsSourceResponse,
  NewsSourceResponseType
} from './types';

const API_KEY = require('../env.json').NEWS_API_KEY || '<api key>';
const API_VERSION = 'v2';
const BASE_URL = Url.concat('https://newsapi.org', API_VERSION);
const DEFAULT_PARAMS: Params = { apiKey: API_KEY };

const urlSource = (source: TopHeadlineParams['source']): Params => {
  switch (source._type) {
    case 'sources':
      return { sources: source.value.join(',') };
    default:
      return { [source._type]: source.value };
  }
};

const topHeadlines = async ({
  source,
  ...otherParams
}: TopHeadlineParams): Promise<
  Either<NewsErrorResponse, NewsArticleResponse>
> => {
  const url = Url.concat(BASE_URL, '/top-headlines');

  const { data } = await axios.get(url, {
    params: {
      ...DEFAULT_PARAMS,
      ...urlSource(source),
      ...otherParams
    }
  }).catch(error => ({ data: jsErrorToResponse(error) }));

  return decodeResult(
    NewsArticleResponseType,
    NewsErrorResponseType,
    errorsToResponse,
    data
  );
};

const sources = async (params: SourcesParams): Promise<
  Either<NewsErrorResponse, NewsSourceResponse>
> => {
  const url = Url.concat(BASE_URL, '/sources');

  const { data } = await axios.get(url, {
    params: {
      ...DEFAULT_PARAMS,
      ...params
    }
  }).catch(error => ({ data: jsErrorToResponse(error) }));

  return decodeResult(
    NewsSourceResponseType,
    NewsErrorResponseType,
    errorsToResponse,
    data
  );
}

const newsApi = {
  topHeadlines,
  sources
};

export default newsApi;

