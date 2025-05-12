import { Separator } from "@/components/ui/separator";
import { FaLinkedin } from "react-icons/fa";
import { Link } from "react-router";

export default function Contact() {
    return (
        <div className="max-w-5xl mx-auto px-4 py-12 space-y-10">
            <section>
                <h2 className="text-2xl font-semibold mb-4">Anggota Tim</h2>
                <Separator />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mt-8">
                    {[
                        {
                            name: "Bagus Angkasawan Sumantri Putra",
                            role: "Project Leader (Chatbot)",
                            image: "/bagus.jpeg",
                            bio: "Lorem Ipsum",
                            linkedin: "https://www.linkedin.com/in/bagus-angkasawan-sumantri-putra/"
                        },
                        {
                            name: "Muhammad Gilang Ramadhan",
                            role: "Member (ML Model Training)",
                            image: "/gilang.jpeg",
                            bio: "Lorem Ipsum",
                            linkedin: "https://www.linkedin.com/in/muhammad-gilang-ramadhan-0754a4266/"
                        },
                        {
                            name: "Bima Adityo Kurniawan",
                            role: "Member (Front-End)",
                            image: "/bima.jpeg",
                            bio: "Lorem Ipsum",
                            linkedin: "https://www.linkedin.com/in/bimaadityokurniawan/"
                        },
                        {
                            name: "Auliyya Aini",
                            role: "Member (ML Model Training)",
                            image: "/auliyya.jpeg",
                            bio: "Lorem Ipsum",
                            linkedin: "https://www.linkedin.com/in/auliyyaaini/"
                        },
                    ].map((member) => (
                        <div key={member.name} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                            <div className="p-6">
                                <div className="flex items-start gap-5">
                                    <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-gray-100">
                                        <img 
                                            src={member.image} 
                                            alt={member.name}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h3 className="text-xl font-semibold">{member.name}</h3>
                                                <p className="text-green-600 font-medium">{member.role}</p>
                                            </div>
                                            <Link
                                                to={member.linkedin} 
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-gray-500 hover:text-blue-600 transition-colors"
                                            >
                                                <FaLinkedin className="w-5 h-5"/>
                                            </Link>
                                        </div>
                                        <div className="mt-4">
                                            <p className="text-gray-600">{member.bio}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}