import * as t from 'io-ts';
import { optionFromNullable } from 'io-ts-types/lib/optionFromNullable';
import { NonEmptyString } from 'io-ts-types/lib/NonEmptyString';

export const ArticleType = t.type({
  title: t.string,
  url: t.string,
  author: optionFromNullable(t.string),
  content: optionFromNullable(t.string)
});

export type Article = t.TypeOf<typeof ArticleType>;

