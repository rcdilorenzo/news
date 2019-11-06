import * as t from 'io-ts';
import { map, fromNullable, Option, some, chain, option } from 'fp-ts/lib/Option';
import * as A from 'fp-ts/lib/Array';
import { optionFromNullable } from 'io-ts-types/lib/optionFromNullable';
import { DateFromISOString } from 'io-ts-types/lib/DateFromISOString';
import { pipe } from 'fp-ts/lib/pipeable';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime'

import fromEmptyNullable from '../util/fromEmptyNullable';
import { getCompactableComposition } from 'fp-ts/lib/Compactable';
import { intercalate } from 'fp-ts/lib/Foldable';
import { monoidString } from 'fp-ts/lib/Monoid';

dayjs.extend(relativeTime);

export const ArticleType = t.type({
  title: t.string,
  url: t.string,
  author: optionFromNullable(t.string),
  content: optionFromNullable(t.string),
  publishedAt: DateFromISOString
});

export type Article = t.TypeOf<typeof ArticleType>;

export const articlePublishedAt = (article: Article): string => {
  return dayjs(article.publishedAt).fromNow();
};

export const articleDomainName = (article: Article): Option<string> => {
  const matches = article.url.match(/https?:\/\/w?w?w?\.?([\w\.]+)[\/$]{1}/) || [];

  return fromNullable(matches[1]);
};

export const articleContent = (article: Article) => {
  return map(
    (content: string) => content.replace(/\s?\[\+\d+ chars\]/, '')
  )(article.content);
}

const join = (sep: string) => (items: string[]) =>
  intercalate(monoidString, A.array)(sep, items);

export const articleSubtitle = (article: Article) => {
  const elements = [
    article.author,
    articleDomainName(article),
    some(articlePublishedAt(article))
  ];

  return pipe(
    elements,
    A.map(chain(fromEmptyNullable)),
    A.compact,
    join(' • '),
    fromEmptyNullable
  );
};
