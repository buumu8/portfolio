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
import PageWrapper from "./components/PageWrapper";

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
            <Route path="/" element={<PageWrapper><Home /></PageWrapper>} />
            <Route path="/projects" element={<PageWrapper><Projects /></PageWrapper>} />
            <Route path="/certifications" element={<PageWrapper><Certifications /></PageWrapper>} />
            <Route path="/resume" element={<PageWrapper><Resume /></PageWrapper>} />
            <Route path="/blog" element={<PageWrapper><Blog /></PageWrapper>} />
            <Route path="/blog/:slug" element={<PageWrapper><PostDetail /></PageWrapper>} />
            <Route path="/contact" element={<PageWrapper><Contact /></PageWrapper>} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
