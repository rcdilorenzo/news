import React from 'react';
import newsApi from '../client/newsApi';
import { NewsArticleResponse } from '../client/types';
import { Article } from '../models/article';
import { getOrElse, map } from 'fp-ts/lib/Either';
import { pipe } from 'fp-ts/lib/pipeable';

const apiCall = () => newsApi.topHeadlines({
  source: { _type: 'country', value: 'us' }
}).then(response => pipe(
  response,
  map(data => data.articles),
  getOrElse(() => [] as Article[])
));

interface AbstractListState<T> {
  items: T[];
}

export class AbstractList<T>
  extends React.Component<{}, AbstractListState<T>>  {

  loadData: () => Promise<T[]>;

  constructor(props: any) {
    super(props);
    this.state = { items: [] };
    this.loadData = () => Promise.resolve([]);
  }

  componentDidMount() {
    this.loadData().then(items => this.setState({ items }));
  }

  renderItem(item: T, index: number) {
    // Abstract template method
    console.error('TODO: Implement render', item);
    return (<span>TBD</span>);
  }

  render() {
    return (
      <div>
        {this.state.items.map((item, index) =>
          this.renderItem(item, index)
        )}
      </div>
    );
  }
}

export class ArticleList extends AbstractList<Article> {
  constructor(props: any) {
    super(props);
    this.loadData = apiCall;
  }

  renderItem(article: Article, index: number) {
    return (
      <article className="m-3 p-3">
        <a className="font-medium text-lg" href={article.url}>
          {article.title}
        </a>
      </article>
    );
  }
}
