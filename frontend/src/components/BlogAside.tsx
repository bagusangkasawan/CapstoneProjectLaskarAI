import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import type { ArticleKey, PopularPost } from "@/model/article-models";
import { Clock } from "lucide-react";

export function BlogAside({ onPostClick }: {onPostClick: (postId: ArticleKey) => void;}) {
    const popularPosts: PopularPost[] = [
        {
            id: "post1",
            title: "Cara Mudah Menghemat Listrik di Rumah",
            category: "Tips",
            readTime: "5 min read",
            date: "28 April, 2025"
        },
        {
            id: "post2",
            title: "Memahami Tagihan Listrik Anda",
            category: "Guide",
            readTime: "7 min read",
            date: "15 April, 2025"
        },
        {
            id: "post3",
            title: "Energi Terbarukan di Indonesia",
            category: "Sustainability",
            readTime: "6 min read",
            date: "30 April, 2025"
        }
    ];

    return (
        <div className="space-y-6">
            <Card className="shadow-sm border border-gray-100">
                <CardHeader>
                    <CardTitle className="text-lg font-semibold">Popular Posts</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    {popularPosts.map(post => (
                        <div key={post.id} className="group">
                            <button 
                                onClick={() => onPostClick(post.id)}
                                className="block w-full text-left hover:bg-gray-50 p-2 -m-2 rounded transition-colors cursor-pointer"
                            >
                                <h3 className="font-medium text-gray-900 group-hover:text-green-600 transition-colors">
                                    {post.title}
                                </h3>
                                <div className="flex items-center mt-1 text-xs text-gray-500">
                                    <span className="text-green-600">{post.category}</span>
                                    <span className="mx-2">•</span>
                                    <Clock className="w-3 h-3 mr-1" />
                                    {post.readTime}
                                </div>
                            </button>
                        </div>
                    ))}
                </CardContent>
            </Card>
        </div>
    );
}