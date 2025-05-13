import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { ArticleData } from "@/model/article-models";
import { CalendarDays, Clock, User } from "lucide-react";

export default function Article({ articleData }: { articleData: ArticleData }) {
    return (
        <Card className="shadow-lg border border-gray-100 overflow-hidden">
            {/* Header with category */}
            <div className="bg-green-50 px-6 py-2 border-b border-green-100">
                <span className="text-xs font-semibold text-green-700 uppercase tracking-wider">
                    {articleData.category}
                </span>
            </div>

            <CardHeader className="pb-2">
                <CardTitle className="text-3xl font-bold text-gray-900 leading-tight">
                    {articleData.title}
                </CardTitle>
                
                {/* Meta information */}
                <div className="flex flex-wrap items-center gap-4 mt-4 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                        <User className="h-4 w-4" />
                        <span>{articleData.author}</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <CalendarDays className="h-4 w-4" />
                        <span>{articleData.date}</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        <span>{articleData.readTime}</span>
                    </div>
                </div>
            </CardHeader>

            <CardContent className="px-6 pb-8">
                <div className="flex justify-center py-4 px-2">
                    <div className="w-full max-w-4xl aspect-[16/7] overflow-hidden rounded-md">
                        <img
                            src={articleData.imgSrc}
                            alt={articleData.imgAlt}
                            className="w-full h-full object-cover"
                        />
                    </div>
                </div>
                <article className="prose prose-lg max-w-none text-gray-700">
                    {articleData.content.map((section, index) => {
                        if (section.type === "paragraph") {
                            return (
                                <p key={index} className="mb-6 leading-relaxed">
                                    {section.text}
                                    {section.source && (
                                        <a 
                                            href={section.source.url} 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            className="text-green-600 hover:text-green-800 ml-1"
                                        >
                                            ({section.source.text})
                                        </a>
                                    )}
                                </p>
                            );
                        }
                        if (section.type === "quote") {
                            return (
                                <blockquote 
                                    key={index} 
                                    className="border-l-4 border-green-500 pl-4 my-6 italic text-gray-600 bg-green-50 p-4 rounded-r"
                                >
                                    <p className="text-lg">"{section.text}"</p>
                                    {section.author && (
                                        <footer className="not-italic font-medium text-green-700 mt-2">
                                            — {section.author}
                                        </footer>
                                    )}
                                </blockquote>
                            );
                        }
                        return null;
                    })}
                </article>

                {/* Tags section */}
                <div className="mt-8 pt-6 border-t border-gray-100">
                    <div className="flex flex-wrap gap-2">
                        {['Energy', 'Sustainability', 'Climate Change', 'Efficiency'].map(tag => (
                            <span 
                                key={tag} 
                                className="px-3 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}