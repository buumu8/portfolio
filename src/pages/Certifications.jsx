import { useState } from "react";

import { badges } from "../data/badges";



export default function Certifications() {

    const [selectedCategory, setSelectedCategory] = useState("All");

    // ✅ Get all unique categories
    const allCategories = [
        "All",
        ...new Set(badges.flatMap((b) => b.categories)),
    ];

    // ✅ Filter badges by category
    const filteredBadges =
        selectedCategory === "All"
            ? [...badges].sort((a, b) => Number(b.priority) - Number(a.priority))
            : badges
                .filter((b) => b.categories.includes(selectedCategory))
                .sort((a, b) => Number(b.priority) - Number(a.priority));

    return (
        <section className="max-w-6xl mx-auto px-4 py-16 mt-5">
            <h1 className="text-4xl font-bold text-center mb-12 text-gray-900 dark:text-white">
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
                            : "bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
                            }`}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            {/* Badges Grid */}
            <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {filteredBadges.map((badge, i) => (
                    <a
                        key={i}
                        href={badge.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex flex-col justify-between h-56 p-4 border rounded-lg bg-white dark:bg-gray-800 shadow-md hover:shadow-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300 relative"
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
                            <h3 className="text-center text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                {badge.name}
                            </h3>
                        </div>

                        {/* Issuer at Bottom */}
                        <p className="text-center text-xs text-gray-500 dark:text-gray-400 mt-2">
                            Issued by {badge.issuer}
                        </p>
                    </a>
                ))}
            </div>
        </section>
    );
}
