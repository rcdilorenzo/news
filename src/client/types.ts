import * as t from 'io-ts';
import { ArticleType } from '../models/article';
import { SourceType } from '../models/source';
import { Param } from './params';

export const NewsErrorResponseType = t.type({
  status: t.literal('error'),
  code: t.string,
  message: t.string
});

export type NewsErrorResponse = t.TypeOf<typeof NewsErrorResponseType>;

export const NewsArticleResponseType = t.type({
  status: t.literal('ok'),
  articles: t.array(t.exact(ArticleType))
});

export const NewsSourceResponseType = t.type({
  status: t.literal('ok'),
  sources: t.array(t.exact(SourceType))
});

export type NewsArticleResponse = t.TypeOf<typeof NewsArticleResponseType>;
export type NewsSourceResponse = t.TypeOf<typeof NewsSourceResponseType>;

export type CountryParam = Param<'country', string>;
export type CategoryParam = Param<'category', string>;
export type SourcesParam = Param<'sources', string[]>;

export interface TopHeadlineParams {
  source: CountryParam | CategoryParam | SourcesParam;
  q?: string;
}

export interface SourcesParams {
  category?: string;
  language?: string;
  country?: string;
}

