import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Article from "@/components/Article";
import { BlogAside } from "@/components/BlogAside";
import type { ArticleData, ArticleKey } from '@/model/article-models';
import { articles } from '@/data/articles';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      when: "beforeChildren"
    }
  }
};

const articleVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: "easeOut"
    }
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.3,
      ease: "easeIn"
    }
  }
};

const asideVariants = {
  hidden: { opacity: 0, x: 20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      delay: 0.2,
      ease: "easeOut"
    }
  }
};

export default function BlogPage() {
  const [currentArticle, setCurrentArticle] = useState<ArticleData>(articles.post1);

  const handlePostClick = (postId: ArticleKey) => {
    setCurrentArticle(articles[postId]);
  };

  return (
    <motion.section 
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-8"
    >
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-2/3">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentArticle.title}
              variants={articleVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <Article articleData={currentArticle} />
            </motion.div>
          </AnimatePresence>
        </div>
        
        <motion.div 
          variants={asideVariants}
          className="lg:w-1/3"
        >
          <BlogAside onPostClick={handlePostClick} />
        </motion.div>
      </div>
    </motion.section>
  );
}