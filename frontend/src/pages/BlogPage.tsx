import { useState } from 'react';
import Article from "@/components/Article";
import { BlogAside } from "@/components/BlogAside";
import type { ArticleData, ArticleKey } from '@/model/article-models';
import { articles } from '@/data/articles';

export default function BlogPage() {
  const [currentArticle, setCurrentArticle] = useState<ArticleData>(articles.post1);

  const handlePostClick = (postId: ArticleKey) => {
    setCurrentArticle(articles[postId]);
  };

  return (
    <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-2/3">
          <Article articleData={currentArticle} />
        </div>
        
        <div className="lg:w-1/3">
          <BlogAside onPostClick={handlePostClick} />
        </div>
      </div>
    </section>
  );
}