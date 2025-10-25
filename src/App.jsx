import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import Certifications from "./pages/Certifications";
import Resume from "./pages/Resume";
import Blog from "./pages/Blog";
import Contact from "./pages/Contact";
import './index.css'

import ThemeToggle from "./components/ThemeToggle";

function Navbar() {
  return (
    <nav className="flex justify-between items-center p-4 shadow-md bg-lightBg dark:bg-darkBg text-gray-800 dark:text-gray-100">
      <Link to="/" className="text-xl font-semibold">MyPortfolio</Link>
      <div className="flex items-center space-x-4">
        <Link to="/projects">Projects</Link>
        <Link to="/certifications">Certifications</Link>
        <Link to="/resume">Resume</Link>
        <Link to="/blog">Blog</Link>
        <Link to="/contact">Contact</Link>
        <ThemeToggle />
      </div>
    </nav>
  );
}


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
        <main className="flex-grow container mx-auto px-4 py-8">
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
