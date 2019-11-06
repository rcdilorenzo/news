import React from 'react';
import ArticleList from './ArticleList';
/* import { ArticleList } from './oo'; */

const App: React.FC = () => {

  return (
    <div className="flex justify-center max-w-lg mx-auto">
      <div>
        <h1 className="text-3xl text-center pt-3 pb-1 font-medium">
          Top News in US
        </h1>
        <ArticleList />
      </div>
    </div>
  );
}

export default App;
