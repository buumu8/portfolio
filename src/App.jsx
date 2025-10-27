import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import Certifications from "./pages/Certifications";
import Resume from "./pages/Resume";
import Blog from "./pages/Blog";
import Contact from "./pages/Contact";
import './index.css'
import Navbar from "./components/NavBar";

function Footer() {
  return (
    <footer className="text-center py-4 border-t text-sm text-gray-500">
      © {new Date().getFullYear()} Jettapol Tuetrakul. All rights reserved.
    </footer>
  );
}

function App() {
  return (
    <Router basename="/portfolio">
      <div className="flex flex-col min-h-screen app-wrapper">
        <Navbar />
        <main className="grow container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/certifications" element={<Certifications />} />
            <Route path="/resume" element={<Resume />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
