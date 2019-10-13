import newsApi from "./newsApi";
import { either, getOrElse } from "fp-ts/lib/Either";
import { Article } from "../models/article";
import { Source } from "../models/source";

const orArticlesArray = getOrElse(() => [] as Article[]);
const orSourcesArray = getOrElse(() => [] as Source[]);

test('top categories', async () => {
  const result = await newsApi.topHeadlines({
    source: { _type: 'country', value: 'us' }
  })

  either.mapLeft(result, console.log);

  const articles = orArticlesArray(
    either.map(result, data => data.articles)
  );

  console.log('article count', articles.length);
});

test('sources', async () => {
  const result = await newsApi.sources({
    country: 'us'
  });

  either.mapLeft(result, console.log);

  const sources = orSourcesArray(
    either.map(result, data => data.sources)
  );

  console.log('sources count', sources.length);
})
