import * as t from 'io-ts';

export const SourceType = t.type({
  id: t.string,
  name: t.string,
  description: t.string,
  url: t.string,
  category: t.string,
  language: t.string,
  country: t.string
});

export type Source = t.TypeOf<typeof SourceType>;
