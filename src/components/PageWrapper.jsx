import { useState, useEffect } from "react";

export default function PageWrapper({ children }) {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulate short load time for smoother UX
        const timer = setTimeout(() => setLoading(false), 400);
        return () => clearTimeout(timer);
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500 border-opacity-60"></div>
            </div>
        );
    }

    return <>{children}</>;
}
