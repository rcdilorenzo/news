import axios from 'axios';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime'

const env = require('../env.json');
const API_KEY = env.NEWS_API_KEY || '<api key>';

dayjs.extend(relativeTime);

interface Article {
  title: string;
  url: string;
  author: string,
  content: string,
  publishedAt: string;
}


const loadTopHeadlines = async (): Promise<Article[]> => {
  const response = await axios.get(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`);

  return response.data.articles as Article[];
};

const subtitles = (articles: Article[]) => {
  return articles.map(article => {
    const domain = article.url.match(/https?:\/\/w?w?w?\.?([\w\.]+)[\/$]{1}/)![1];
    const relativeTime = dayjs(new Date(article.publishedAt)).fromNow();

    return [article.author, domain, relativeTime].join(' • ');
  });
};

(async () => {
  const articles = await loadTopHeadlines();
  console.log(subtitles(articles));
})();
