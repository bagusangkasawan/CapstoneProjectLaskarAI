import Article from "@/components/Article";
import { BlogAside } from "@/components/BlogAside";

export default function BlogPage() {
    return (
        <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-8">
            <div className="flex flex-col lg:flex-row gap-8">

                <div className="lg:w-2/3">
                    <Article />
                </div>
                
                <div className="lg:w-1/3">
                    <BlogAside />
                </div>
            </div>
        </section>
    );
}