import * as t from 'io-ts';
import axios from 'axios';
import { UrlCT } from '../category/Monoid';
import { Params, Param } from './params';
import { Either } from 'fp-ts/lib/Either';
import decodeResult from './decodeResult';
import { ArticleType } from '../models/article';
import { SourceType } from '../models/source';

const env = require('../env.json');

const API_KEY = env.NEWS_API_KEY || '<api key>';
const API_VERSION = 'v2';
const baseUrl = UrlCT.mappend('https://newsapi.org', API_VERSION);
const defaultParams: Params = { apiKey: API_KEY };

const NewsErrorResponse = t.type({
  status: t.literal('error'),
  code: t.string,
  message: t.string
});

export type NewsErrorResponse = t.TypeOf<typeof NewsErrorResponse>;

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

const errorsToResponse = (errors: t.Errors): NewsErrorResponse => {
  console.warn(JSON.stringify(errors));
  return {
    status: 'error',
    code: 'parseError',
    message: `${errors.length} parsing error(s) encountered.`
  }
};

const NewsArticleResponseType = t.type({
  status: t.literal('ok'),
  articles: t.array(t.exact(ArticleType))
});

const NewsSourceResponseType = t.type({
  status: t.literal('ok'),
  sources: t.array(t.exact(SourceType))
});

type NewsArticleResponse = t.TypeOf<typeof NewsArticleResponseType>;
type NewsSourceResponse = t.TypeOf<typeof NewsSourceResponseType>;

type CountryParam = Param<'country', string>;
type CategoryParam = Param<'category', string>;
type SourcesParam = Param<'sources', string[]>;

interface TopHeadlineParams {
  source: CountryParam | CategoryParam | SourcesParam;
  q?: string;
}

interface SourcesParams {
  category?: string;
  language?: string;
  country?: string;
}

const urlSource = (source: TopHeadlineParams['source']): Params => {
  switch (source._type) {
    case 'sources':
      return { sources: source.value.join(',') };
    default:
      return { [source._type]: source.value };
  }
};

interface EverythingParams {
  source: CountryParam | CategoryParam | SourcesParam;
  q?: string;
  qInTitle?: string;
  from?: string;
  to?: string
}

const topHeadlines = async ({
  source,
  ...otherParams
}: TopHeadlineParams): Promise<
  Either<NewsErrorResponse, NewsArticleResponse>
> => {
  const url = UrlCT.mappend(baseUrl, '/top-headlines');

  const { data } = await axios.get(url, {
    params: {
      ...defaultParams,
      ...urlSource(source),
      ...otherParams
    }
  }).catch(error => ({ data: jsErrorToResponse(error) }));

  return decodeResult(
    NewsArticleResponseType,
    NewsErrorResponse,
    errorsToResponse,
    data
  );
};

const everything = async ({
  source,
  ...otherParams
}: EverythingParams): Promise<Either<NewsErrorResponse, NewsArticleResponse>> => {
  const url = UrlCT.mappend(baseUrl, '/everything');

  const { data } = await axios.get(url, {
    params: {
      ...defaultParams,
      ...urlSource(source),
      ...otherParams
    }
  }).catch(error => ({ data: jsErrorToResponse(error) }));

  return decodeResult(
    NewsArticleResponseType,
    NewsErrorResponse,
    errorsToResponse,
    data
  );
}

const sources = async (params: SourcesParams): Promise<
  Either<NewsErrorResponse, NewsSourceResponse>
> => {
  const url = UrlCT.mappend(baseUrl, '/sources');

  const { data } = await axios.get(url, {
    params: {
      ...defaultParams,
      ...params
    }
  }).catch(error => ({ data: jsErrorToResponse(error) }));

  return decodeResult(
    NewsSourceResponseType,
    NewsErrorResponse,
    errorsToResponse,
    data
  );
}

const newsApi = {
  topHeadlines,
  everything,
  sources
};

export default newsApi;

