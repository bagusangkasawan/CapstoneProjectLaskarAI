import { Separator } from "@/components/ui/separator";
import { GraduationCap } from "lucide-react";
import { FaLinkedin } from "react-icons/fa";
import { Link } from "react-router";
import { motion } from "framer-motion";

// Animation variants
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

const titleAnim = {
  hidden: { opacity: 0, y: -20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

export default function Contact() {
    return (
        <div className="max-w-5xl mx-auto px-4 pb-10">
            <motion.section
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                variants={container}
            >
                <motion.h2 
                    className="text-2xl font-semibold mb-4"
                    variants={titleAnim}
                >
                    Anggota Tim
                </motion.h2>
                <motion.div variants={item}>
                    <Separator />
                </motion.div>
                
                <motion.div 
                    className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8"
                    variants={container}
                >
                    {[
                        {
                            name: "Bagus Angkasawan Sumantri Putra",
                            role: "Project Leader (Chatbot API)",
                            university: "Universitas Pramita Indonesia",
                            image: "/bagus.jpeg",
                            bio: "Final-Year Informatics Engineering Student at Universitas Pramita Indonesia, focused on web development and machine learning.",
                            linkedin: "https://www.linkedin.com/in/bagus-angkasawan-sumantri-putra/"
                        },
                        {
                            name: "Muhammad Gilang Ramadhan",
                            role: "Member (ML Model Training)",
                            university: "Universitas Pramita Indonesia",
                            image: "/gilang.jpeg",
                            bio: "I'm Muhammad Gilang Ramadhan, a dedicated computer science student at Pramita Indonesia University. My journey into the world of programming began during my formative years at Bina Putra Mandiri Vocational School, where I discovered my passion for web development. Since then, I've been on a continuous quest to deepen my knowledge and skills in this dynamic field.",
                            linkedin: "https://www.linkedin.com/in/muhammad-gilang-ramadhan-0754a4266/"
                        },
                        {
                            name: "Bima Adityo Kurniawan",
                            role: "Member (Front-End)",
                            university: "Universitas Jenderal Soedirman",
                            image: "/bima.jpeg",
                            bio: "An adaptable software engineer specializing in full-stack web applications. Enjoys tackling challenges. Driven by a curiosity for innovation, a commitment to problem-solving, and a desire to create impactful technological solutions that enhance efficiency.",
                            linkedin: "https://www.linkedin.com/in/bimaadityokurniawan/"
                        },
                        {
                            name: "Auliyya Aini",
                            role: "Member (ML Model Training)",
                            university: "Universitas Jenderal Soedirman",
                            image: "/auliyya.jpeg",
                            bio: "Passionate about transforming data into actionable insights, I specialize in machine learning, data analytics, and AI-driven solutions. With hands-on experience in predictive modeling, statistical analysis, and computer vision, I enjoy solving complex problems and building intelligent systems that drive innovation.",
                            linkedin: "https://www.linkedin.com/in/auliyyaaini/"
                        },
                    ].map((member, index) => (
                        <motion.div 
                            key={member.name}
                            className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                            variants={item}
                            whileHover={{ y: -5, scale: 1.02 }}
                            transition={{ type: "spring", stiffness: 300 }}
                        >
                            <div className="p-6">
                                <div className="flex items-start gap-5">
                                    <motion.div 
                                        className="w-20 h-20 rounded-full overflow-hidden border-2 border-gray-100"
                                        initial={{ scale: 0.8, opacity: 0 }}
                                        whileInView={{ scale: 1, opacity: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: index * 0.1 + 0.4 }}
                                    >
                                        <img 
                                            src={member.image} 
                                            alt={member.name}
                                            className="w-full h-full object-cover"
                                        />
                                    </motion.div>
                                    <div className="flex-1">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <motion.h3 
                                                    className="text-xl font-semibold"
                                                    initial={{ opacity: 0, x: -10 }}
                                                    whileInView={{ opacity: 1, x: 0 }}
                                                    viewport={{ once: true }}
                                                    transition={{ delay: index * 0.1 + 0.5 }}
                                                >
                                                    {member.name}
                                                </motion.h3>
                                                <motion.p 
                                                    className="text-green-600 font-medium"
                                                    initial={{ opacity: 0, x: -10 }}
                                                    whileInView={{ opacity: 1, x: 0 }}
                                                    viewport={{ once: true }}
                                                    transition={{ delay: index * 0.1 + 0.6 }}
                                                >
                                                    {member.role}
                                                </motion.p>
                                                <motion.div 
                                                    className="flex items-center gap-1 text-sm text-gray-500 mt-1"
                                                    initial={{ opacity: 0, x: -10 }}
                                                    whileInView={{ opacity: 1, x: 0 }}
                                                    viewport={{ once: true }}
                                                    transition={{ delay: index * 0.1 + 0.7 }}
                                                >
                                                    <GraduationCap className="w-4 h-4" />
                                                    <span>{member.university}</span>
                                                </motion.div>
                                            </div>
                                            <motion.div
                                                initial={{ opacity: 0, scale: 0.5 }}
                                                whileInView={{ opacity: 1, scale: 1 }}
                                                viewport={{ once: true }}
                                                transition={{ delay: index * 0.1 + 0.8 }}
                                            >
                                                <Link
                                                    to={member.linkedin} 
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-gray-500 hover:text-blue-600 transition-colors"
                                                >
                                                    <FaLinkedin className="w-5 h-5"/>
                                                </Link>
                                            </motion.div>
                                        </div>
                                        <motion.div 
                                            className="mt-4"
                                            initial={{ opacity: 0 }}
                                            whileInView={{ opacity: 1 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: index * 0.1 + 0.9 }}
                                        >
                                            <p className="text-gray-600">{member.bio}</p>
                                        </motion.div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </motion.section>
        </div>
    );
}