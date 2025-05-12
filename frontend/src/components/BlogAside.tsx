import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Clock } from "lucide-react";

export function BlogAside() {
    const popularPosts = [
        {
            id: 1,
            title: "Cara Mudah Menghemat Listrik di Rumah",
            category: "Tips",
            readTime: "3 min read",
            date: "April 28, 2024"
        },
        {
            id: 2,
            title: "Memahami Tagihan Listrik Anda",
            category: "Guide",
            readTime: "5 min read",
            date: "April 15, 2024"
        },
        {
            id: 3,
            title: "Energi Terbarukan di Indonesia",
            category: "Sustainability",
            readTime: "4 min read",
            date: "March 30, 2024"
        },
        {
            id: 4,
            title: "Memilih Peralatan Hemat Energi",
            category: "Review",
            readTime: "6 min read",
            date: "March 22, 2024"
        },
        {
            id: 5,
            title: "Dampak Perubahan Iklim pada Energi",
            category: "Research",
            readTime: "7 min read",
            date: "March 10, 2024"
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
                            <a href="#" className="block">
                                <h3 className="font-medium text-gray-900 group-hover:text-green-600 transition-colors">
                                    {post.title}
                                </h3>
                                <div className="flex items-center mt-1 text-xs text-gray-500">
                                    <span className="text-green-600">{post.category}</span>
                                    <span className="mx-2">•</span>
                                    <Clock className="w-3 h-3 mr-1" />
                                    {post.readTime}
                                </div>
                            </a>
                        </div>
                    ))}
                </CardContent>
            </Card>

            <Card className="shadow-sm border border-gray-100">
                <CardHeader>
                    <CardTitle className="text-lg font-semibold">Newsletter</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-sm text-gray-600 mb-4">
                        Dapatkan update terbaru tentang energi dan keberlanjutan langsung ke email Anda.
                    </p>
                    <form className="space-y-3">
                        <input
                            type="email"
                            placeholder="Your email address"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                            required
                        />
                        <button
                            type="submit"
                            className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-md transition-colors"
                        >
                            Subscribe
                        </button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}