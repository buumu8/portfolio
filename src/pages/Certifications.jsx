import { useState, useEffect } from "react";
import { badges } from "../data/badges";

export default function Certifications() {
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [loading, setLoading] = useState(true); // ✅ Loading state
    const [filteredBadges, setFilteredBadges] = useState([]);
    const [allCategories, setAllCategories] = useState([]);

    useEffect(() => {
        // Get all unique categories
        const categories = ["All", ...new Set(badges.flatMap((b) => b.categories))];
        setAllCategories(categories);

        // Simulate async loading
        setLoading(true);
        setTimeout(() => {
            setFilteredBadges(
                badges
                    .filter((b) => selectedCategory === "All" || b.categories.includes(selectedCategory))
                    .sort((a, b) => Number(b.priority) - Number(a.priority))
            );
            setLoading(false);
        }, 300); // 300ms delay for loader effect
    }, [selectedCategory]);

    return (
        <section className="max-w-5xl mx-auto px-4 py-16 mt-5">
            <h1 className="text-3xl font-bold mb-4">
                Certifications & Badges
            </h1>

            {/* Category Filter Buttons */}
            <div className="flex justify-center flex-wrap gap-3 mb-12">
                {allCategories.map((cat) => (
                    <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={`px-4 py-2 rounded-full font-medium transition-colors duration-200 ${selectedCategory === cat
                            ? "bg-blue-600 text-white shadow-md"
                            : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                            }`}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            {loading ? (
                // ✅ Loader while badges load
                <div className="flex justify-center items-center min-h-[200px]">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500 border-opacity-60"></div>
                </div>
            ) : (
                <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    {filteredBadges.map((badge, i) => (
                        <a
                            key={i}
                            href={badge.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex flex-col justify-between h-56 p-4 border rounded-lg bg-white shadow-md hover:shadow-lg hover:bg-gray-100  transition-all duration-300 relative"
                        >
                            {/* Priority Ribbon */}
                            {badge.priority && (
                                <span className="absolute top-2 right-2 bg-yellow-400 text-xs font-bold text-gray-900 px-2 py-0.5 rounded">
                                    Featured
                                </span>
                            )}

                            {/* Top Content: Badge Image + Name */}
                            <div className="flex flex-col items-center">
                                <div className="w-full h-24 mb-2 flex items-center justify-center">
                                    <img
                                        src={badge.image}
                                        alt={badge.name}
                                        className="object-contain w-full h-full"
                                    />
                                </div>
                                <h3 className="text-center text-sm font-medium text-gray-700  mb-1">
                                    {badge.name}
                                </h3>
                            </div>

                            {/* Issuer at Bottom */}
                            <p className="text-center text-xs text-gray-500  mt-2">
                                Issued by {badge.issuer}
                            </p>
                        </a>
                    ))}
                </div>
            )}
        </section>
    );
}
