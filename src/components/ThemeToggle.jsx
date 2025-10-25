import { useEffect, useState } from "react";

export default function ThemeToggle() {
    const [theme, setTheme] = useState(
        localStorage.theme || "light"
    );

    // Update <html> class
    useEffect(() => {
        const html = document.documentElement;
        if (theme === "dark") {
            html.classList.add("dark");
        } else {
            html.classList.remove("dark");
        }
        localStorage.theme = theme;
    }, [theme]);

    return (
        <button
            onClick={() =>
                setTheme(theme === "light" ? "dark" : "light")
            }
            className="p-2 rounded-md border text-sm hover:bg-gray-100 dark:hover:bg-gray-800 transition"
        >
            {theme === "light" ? "🌙 Dark" : "☀️ Light"}
        </button>
    );
}
