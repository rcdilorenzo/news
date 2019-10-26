import React from 'react';
import { Article, articleSubtitle, articleContent } from '../models/article';
import ApiLoader from './ApiLoader';
import newsApi from '../client/newsApi';
import renderOptional from '../util/renderOptional';

interface ArticleListProps {
  articles: Article[];
}

interface ArticleItemProps {
  article: Article;
}

const apiCall = () => newsApi.topHeadlines({
  source: { _type: 'country', value: 'us' }
});

const ArticleItem: React.FC<ArticleItemProps> = ({ article }) => (
  <article className="m-3 p-3">
    <a className="font-medium text-lg" href={article.url}>
      {article.title}
    </a>

    {renderOptional(articleSubtitle(article), subtitle => (
      <a href={article.url} className="text-xs text-gray-600 py-1 block">
        {subtitle}
      </a>
    ))}

    {renderOptional(articleContent(article), content => (
      <p>{content}</p>
    ))}
  </article>
);

const ArticleListLoaded: React.FC<ArticleListProps> = ({ articles }) => (
  <div>
    {articles.map((article, i) => <ArticleItem article={article} key={i} />)}
  </div>
);

const ArticleListLoading: React.FC = () => (
  <p>Loading articles...</p>
);

const ArticleList: React.FC = () => (
  <ApiLoader
    apiCall={apiCall}
    render={result => (<ArticleListLoaded articles={result.articles} />)}
    loadingRender={ArticleListLoading} />
)

export default ArticleList;
