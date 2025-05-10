import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarDays, Clock, User } from "lucide-react";

export default function Article() {
    const articleData = {
        title: "Mengapa Menghemat Energi itu Penting?",
        category: "Sustainability",
        author: "EnergyMate Team",
        date: "May 10, 2024",
        readTime: "4 min read",
        content: [
            {
                type: "paragraph",
                text: "Penghematan energi merupakan langkah krusial dalam menghadapi tantangan perubahan iklim dan keterbatasan sumber daya alam. Energi yang kita gunakan sehari-hari, seperti listrik dan bahan bakar fosil, sebagian besar masih berasal dari sumber yang tidak terbarukan. Konsumsi energi yang tinggi tidak hanya meningkatkan biaya hidup, tetapi juga mempercepat emisi gas rumah kaca yang memicu pemanasan global."
            },
            {
                type: "paragraph",
                text: "Menurut Laporan Efisiensi Energi 2022 dari International Energy Agency (IEA), efisiensi energi berkontribusi terhadap 40% dari pengurangan emisi karbon yang diperlukan hingga tahun 2040. Artinya, tindakan sederhana seperti mematikan lampu yang tidak digunakan atau menggunakan peralatan hemat energi dapat memberikan dampak signifikan terhadap lingkungan.",
                source: {
                    url: "https://www.iea.org/reports/energy-efficiency-2022",
                    text: "Laporan Efisiensi Energi 2022"
                }
            },
            {
                type: "paragraph",
                text: "Sebuah studi oleh Lawrence Berkeley National Laboratory juga menunjukkan bahwa penerapan strategi efisiensi energi secara masif dapat mengurangi permintaan energi global hingga 30% tanpa mengorbankan kenyamanan hidup.",
                source: {
                    url: "https://eta-publications.lbl.gov/sites/default/files/lbnl-1006983.pdf",
                    text: "LBNL Report, 2017"
                }
            },
            {
                type: "paragraph",
                text: "Lebih dari sekadar penghematan biaya, kebiasaan hemat energi juga membantu menciptakan masa depan yang lebih berkelanjutan bagi generasi mendatang. Dalam skala rumah tangga maupun industri, upaya penghematan energi adalah investasi jangka panjang terhadap ketahanan energi nasional dan kesejahteraan global."
            },
            {
                type: "quote",
                text: "Efisiensi energi adalah bahan bakar pertama yang tidak pernah habis.",
                author: "Fatih Birol, Direktur Eksekutif IEA"
            }
        ]
    };

    return (
        <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12 py-8">
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
                                src="/save-bulb.jpg"
                                alt="Save energy by switching bulbs"
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
        </div>
    );
}