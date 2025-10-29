import { useRef, useState, useEffect } from "react";
import './AutoScrollBadges.css'

export default function FeaturedBadges({ badges }) {
    const scrollRef = useRef(null);
    const [loaded, setLoaded] = useState({}); // Track loaded badges

    // Filter priority badges
    const priorityBadges = badges.filter((b) => b.priority);

    // Auto-scroll state
    const scrollSpeed = 0.5; // pixels per frame, slower
    const requestRef = useRef();
    const scrollPosition = useRef(0);

    useEffect(() => {
        const container = scrollRef.current;
        if (!container) return;

        const totalScrollWidth = container.scrollWidth / 2; // because we duplicate badges

        const animate = () => {
            scrollPosition.current += scrollSpeed;
            if (scrollPosition.current >= totalScrollWidth) {
                scrollPosition.current = 0; // loop
            }
            container.scrollLeft = scrollPosition.current;
            requestRef.current = requestAnimationFrame(animate);
        };

        requestRef.current = requestAnimationFrame(animate);

        return () => cancelAnimationFrame(requestRef.current);
    }, [priorityBadges]);

    const handleArrowClick = (direction) => {
        const container = scrollRef.current;
        if (!container) return;
        const scrollAmount = container.clientWidth / 2; // adjust as needed
        if (direction === "left") {
            scrollPosition.current = Math.max(0, scrollPosition.current - scrollAmount);
        } else {
            scrollPosition.current += scrollAmount;
        }
        container.scrollLeft = scrollPosition.current;
    };

    return (
        <section className="w-full px-4 py-16">
            <h2 className="text-3xl font-bold mb-8 text-center">
                Featured Badges
            </h2>
            <div className="relative">
                {/* Left Arrow */}
                <button
                    onClick={() => handleArrowClick("left")}
                    className="transition duration-50 m-2 opacity-30 hover:opacity-100 absolute left-0 top-1/2 -translate-y-1/2 bg-gray-800 hover:bg-gray-700 text-white p-2 rounded-full shadow-md z-10"
                >
                    &#8592;
                </button>

                {/* Right Arrow */}
                <button
                    onClick={() => handleArrowClick("right")}
                    className="transition duration-50 m-2 opacity-30 hover:opacity-100 absolute right-0 top-1/2 -translate-y-1/2 bg-gray-800 hover:bg-gray-700 text-white p-2 rounded-full shadow-md z-10"
                >
                    &#8594;
                </button>

                {/* Badge Scroll Container */}
                <div className="relative  bg-neutral-200 text-white">
                    {/* Left/Right arrows hidden if auto-scroll */}
                    {/* Badge Scroll Container */}
                    <div
                        ref={scrollRef}
                        className="flex gap-6 overflow-x-hidden px-10"
                    >
                        {/* Duplicate badges to create infinite loop effect */}
                        {[...priorityBadges, ...priorityBadges].map((badge, i) => (
                            <a
                                key={i}
                                href={badge.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="grow min-w-[150px] max-w-[220px] relative p-3 border rounded-lg m-8 bg-white text-black shadow-md hover:border-2 hover:shadow-2xl transition-all duration-300 flex flex-col items-center"
                            >
                                {/* Badge Image */}
                                <div className="w-full h-24 mb-2 flex items-center justify-center relative">
                                    {!loaded[badge.name] && (
                                        <div className="absolute inset-0 flex items-center  justify-centeranimate-pulse rounded" />
                                    )}
                                    <img
                                        src={badge.image}
                                        alt={badge.name}
                                        className={`object-contain w-full h-full transition-opacity duration-300 ${loaded[badge.name] ? "opacity-100" : "opacity-0"
                                            }`}
                                        onLoad={() =>
                                            setLoaded((prev) => ({ ...prev, [badge.name]: true }))
                                        }
                                    />
                                </div>

                                {/* Badge Name */}
                                <span className="text-center text-sm font-medium break-words whitespace-normal">
                                    {badge.name}
                                </span>
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
