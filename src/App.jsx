import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import Navbar from "./components/NavBar";
import PageWrapper from "./components/PageWrapper";
import "./index.css";

// Simple Loader component
const Loader = () => (
  <div className="flex justify-center items-center h-full min-h-[200px]">
    <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
  </div>
);

// Lazy-loaded pages
const Home = lazy(() => import("./pages/Home"));
const Projects = lazy(() => import("./pages/ProjectsPage"));
const Certifications = lazy(() => import("./pages/Certifications"));
const Resume = lazy(() => import("./pages/Resume"));
const Blog = lazy(() => import("./pages/Blog"));
const PostDetail = lazy(() => import("./pages/PostDetail"));
const Contact = lazy(() => import("./pages/Contact"));

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
          <Suspense fallback={<Loader />}>
            <Routes>
              <Route path="/" element={<PageWrapper><Home /></PageWrapper>} />
              <Route path="/projects" element={<PageWrapper><Projects /></PageWrapper>} />
              <Route path="/certifications" element={<PageWrapper><Certifications /></PageWrapper>} />
              <Route path="/resume" element={<PageWrapper><Resume /></PageWrapper>} />
              <Route path="/blog" element={<PageWrapper><Blog /></PageWrapper>} />
              <Route path="/blog/:slug" element={<PageWrapper><PostDetail /></PageWrapper>} />
              <Route path="/contact" element={<PageWrapper><Contact /></PageWrapper>} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
