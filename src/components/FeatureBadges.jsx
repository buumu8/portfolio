import { useRef, useState } from "react";

export default function FeaturedBadges({ badges }) {
    const scrollRef = useRef(null);
    const [loaded, setLoaded] = useState({}); // Track which badges are loaded

    const scroll = (direction) => {
        if (scrollRef.current) {
            const { clientWidth } = scrollRef.current;
            scrollRef.current.scrollBy({
                left: direction === "left" ? -clientWidth : clientWidth,
                behavior: "smooth",
            });
        }
    };

    const priorityBadges = badges.filter((b) => b.priority);

    return (
        <section className="w-full px-4 py-16">
            <h2 className="text-3xl font-bold mb-8 text-gray-900 text-center scrollbar-hide">
                Featured Badges
            </h2>

            <div className="relative">
                {/* Left Arrow */}
                <button
                    onClick={() => scroll("left")}
                    className="absolute left-0 top-1/2 -translate-y-1/2 bg-white  text-gray-700 p-2 rounded-full shadow-md hover:bg-gray-100 z-10"
                >
                    &#8592;
                </button>

                {/* Right Arrow */}
                <button
                    onClick={() => scroll("right")}
                    className="absolute right-0 top-1/2 -translate-y-1/2 bg-white  text-gray-700  p-2 rounded-full shadow-md hover:bg-gray-100  z-10"
                >
                    &#8594;
                </button>

                {/* Badge Scroll Container */}
                <div
                    ref={scrollRef}
                    className="flex gap-6 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 scroll-smooth px-10"
                >
                    {priorityBadges.map((badge, i) => (
                        <a
                            key={i}
                            href={badge.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="grow min-w-[150px] max-w-[220px] relative p-4 border rounded-lg bg-white shadow-md 
                         hover:shadow-lg hover:bg-gray-100 transition-all duration-300 flex flex-col items-center"
                        >
                            {/* Badge Image */}
                            <div className="w-full h-24 mb-2 flex items-center justify-center relative">
                                {!loaded[badge.name] && (
                                    <div className="absolute inset-0 flex items-center justify-center bg-gray-200 animate-pulse rounded">
                                        {/* Placeholder loader */}
                                    </div>
                                )}
                                <img
                                    src={badge.image}
                                    alt={badge.name}
                                    className={`object-contain w-full h-full transition-transform duration-300 ${loaded[badge.name] ? "opacity-100" : "opacity-0"
                                        }`}
                                    onLoad={() =>
                                        setLoaded((prev) => ({ ...prev, [badge.name]: true }))
                                    }
                                />
                            </div>

                            <span className="text-center text-sm font-medium text-gray-700 block">
                                {badge.name}
                            </span>
                        </a>
                    ))}
                </div>
            </div>
        </section>
    );
}
