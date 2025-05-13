export type ArticleContent = {
    type: "paragraph" | "quote";
    text: string;
    author?: string;
    source?: {
    url: string;
    text: string;
    };
};

export type ArticleData = {
    title: string;
    category: string;
    author: string;
    date: string;
    readTime: string;
    imgSrc: string;
    imgAlt: string;
    content: ArticleContent[];
};

export type PopularPost = {
    id: ArticleKey;
    title: string;
    category: string;
    readTime: string;
    date: string;
}


export type ArticleKey = "post1" | "post2" | "post3";