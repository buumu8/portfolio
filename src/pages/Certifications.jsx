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
            ? badges
            : badges.filter((b) => b.categories.includes(selectedCategory));

    // ✅ Sort so priority badges appear first
    const sortedBadges = [...filteredBadges].sort(
        (a, b) => (b.priority ? 1 : 0) - (a.priority ? 1 : 0)
    );

    return (
        <section className="max-w-6xl mx-auto px-4 py-16">
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
                {sortedBadges.map((badge, i) => (
                    <a
                        key={i}
                        href={badge.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`relative flex flex-col items-center p-4 border rounded-lg transition transform hover:shadow-lg ${badge.priority
                                ? "scale-105 border-blue-500"
                                : "border-gray-200 dark:border-gray-700"
                            }`}
                    >
                        {/* Ribbon for priority badges */}
                        {badge.priority && (
                            <span className="absolute top-2 right-2 bg-yellow-400 text-xs font-bold text-gray-900 px-2 py-0.5 rounded">
                                Featured
                            </span>
                        )}

                        <img
                            src={badge.image}
                            alt={badge.name}
                            className="w-24 h-24 object-contain mb-2"
                        />
                        <span className="text-center text-sm font-medium text-gray-700 dark:text-gray-300">
                            {badge.name}
                        </span>
                    </a>
                ))}
            </div>
        </section>
    );
}
