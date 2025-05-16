import { Route, Routes } from "react-router";
import Footer from "./components/Footer";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import ChatbotLauncher from "./components/ChatbotLauncher";
import AboutPage from "./pages/AboutPage";
import BlogPage from "./pages/BlogPage";
import ContactPage from "./pages/ContactPage";
import FeaturePage from "./pages/FeaturePage";

export default function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header/>
      <main className="flex-1 bg-gray-100 overflow-y-auto">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/feature" element={<FeaturePage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
        <ChatbotLauncher />
      </main>
      <Footer />
    </div>
  )
}