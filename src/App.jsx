import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Projects from "./pages/ProjectsPage";
import Certifications from "./pages/Certifications";
import Resume from "./pages/Resume";
import Blog from "./pages/Blog";
import Contact from "./pages/Contact";
import Navbar from "./components/NavBar";
import PostDetail from "./pages/PostDetail";
import "./index.css";

function Footer() {
  return (
    <footer className="text-center py-4 border-t text-sm text-gray-500">
      © {new Date().getFullYear()} Jettapol Tuetrakul. All rights reserved.
    </footer>
  );
}

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen app-wrapper">
        <Navbar />
        <main className="grow container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/certifications" element={<Certifications />} />
            <Route path="/resume" element={<Resume />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<PostDetail />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
