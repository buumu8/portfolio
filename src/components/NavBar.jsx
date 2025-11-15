import { useState } from "react";
import { Link } from "react-router-dom";

function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="fixed top-0 left-0 w-full z-50 bg-gray-900 text-gray-100 shadow-md p-4 md:mb-0 mb-20">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                {/* Logo */}
                <Link to="/" className="text-xl font-light mb-2 md:mb-0">
                    <span className="font-bold">Jettapol Tuetrakul | </span>Portfolio
                </Link>

                {/* Hamburger */}
                <div className="md:hidden self-end mb-2">
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="focus:outline-none"
                    >
                        {isOpen ? (
                            <svg
                                className="w-6 h-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        ) : (
                            <svg
                                className="w-6 h-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                            </svg>
                        )}
                    </button>
                </div>

                {/* Menu Links */}
                <div
                    className={`flex flex-col md:flex-row md:items-center w-full md:w-auto overflow-hidden transition-all duration-300 ${isOpen ? "max-h-64" : "max-h-0 md:max-h-full"
                        }`}
                >
                    <Link to="/" className="py-2 md:py-0 md:mx-2 hover:text-gray-300" onClick={() => setIsOpen(false)}>About me</Link>
                    <Link to="/projects" className="py-2 md:py-0 md:mx-2 hover:text-gray-300" onClick={() => setIsOpen(false)}>Projects</Link>
                    <Link to="/certifications" className="py-2 md:py-0 md:mx-2 hover:text-gray-300" onClick={() => setIsOpen(false)}>Certifications & Badges</Link>
                    <Link to="/resume" className="py-2 md:py-0 md:mx-2 hover:text-gray-300" onClick={() => setIsOpen(false)}>Resume</Link>
                    <Link to="/blog" className="py-2 md:py-0 md:mx-2 hover:text-gray-300" onClick={() => setIsOpen(false)}>Blogs</Link>
                    <Link to="/contact" className="py-2 md:py-0 md:mx-2 hover:text-gray-300" onClick={() => setIsOpen(false)}>Contact</Link>
                </div>
            </div>
        </nav>


    );
}

export default Navbar;
