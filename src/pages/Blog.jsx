// src/pages/Blog.jsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import fm from "front-matter";

export default function Blog() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const blogFiles = import.meta.glob("../blogs/*.md", { query: '?raw', import: 'default' });

        const fallbackImages = Array.from(
            { length: 10 },
            (_, i) => `/portfolio/images/fallback_${i + 1}.jpg`
        );

        const hashString = (str) => {
            let hash = 0;
            for (let i = 0; i < str.length; i++) {
                hash = (hash << 5) - hash + str.charCodeAt(i);
                hash |= 0;
            }
            return Math.abs(hash);
        };

        const loadPosts = async () => {
            let postEntries = await Promise.all(
                Object.entries(blogFiles).map(async ([path, resolver]) => {
                    const raw = await resolver();
                    const { attributes, body } = fm(raw);

                    const slug = path.split("/").pop().replace(".md", "");
                    const image = attributes.image
                        ? `/portfolio/images/${attributes.image.replace(/^.*[\\/]/, "")}`
                        : fallbackImages[hashString(slug) % fallbackImages.length];

                    return {
                        slug,
                        metadata: { ...attributes, image },
                        content: body
                    };
                })
            );

            // Optional: sort by date descending
            postEntries.sort(
                (a, b) => new Date(b.metadata.date) - new Date(a.metadata.date)
            );

            postEntries = postEntries.filter(post => {
                console.log(post.metadata.hide)
                return !post.metadata.hide
            })

            setPosts(postEntries);
        };

        loadPosts();
    }, []);

    const getFirstParagraphPreview = (mdContent) => {
        // Split Markdown by double newlines (paragraphs)
        const paragraphs = mdContent.split(/\r?\n\r?\n/);
        // Take the first non-empty paragraph
        const firstParagraph = paragraphs.find(p => p.trim().length > 0) || "";
        return firstParagraph;
    };

    const markdownToPlainText = (text) => {
        return text
            .replace(/!\[.*?\]\(.*?\)/g, "")        // remove images
            .replace(/\[([^\]]+)\]\([^\)]+\)/g, "$1") // links -> just text
            .replace(/[#_*~`>+-]/g, "")              // headings, bold, italic, etc.
            .replace(/\n/g, " ")                      // flatten newlines
            .trim();
    };

    // Group posts by year
    const postsByYear = posts.reduce((acc, post) => {
        const year = new Date(post.metadata.date).getFullYear();
        if (!acc[year]) acc[year] = [];
        acc[year].push(post);
        return acc;
    }, {});




    if (posts.length === 0) return <div className="p-6">Loading posts...</div>;

    return (
        <section className="max-w-6xl mx-auto px-4 py-16 flex flex-col lg:flex-row gap-8">
            {/* Sidebar */}
            <aside className="lg:w-64 w-full shrink-0">
                <h2 className="text-3xl font-bold mb-4">Blogs</h2>
                <div className="space-y-4 border rounded-md p-4 bg-white shadow-sm">
                    {Object.keys(postsByYear)
                        .sort((a, b) => b - a) // newest year first
                        .map((year) => (
                            <details key={year} className="group">
                                <summary className="cursor-pointer font-medium text-gray-800 mb-2 list-none">
                                    {year}
                                </summary>
                                <ul className="mt-2 space-y-2 pl-2">
                                    {postsByYear[year].slice(0, 5).map((post) => (
                                        <li key={post.slug}>
                                            <Link
                                                to={`/blog/${post.slug}`}
                                                className="block text-gray-700 hover:text-blue-600 transition truncate text-sm"
                                            >
                                                <span className="text-sm text-gray-400">{post.metadata.date}</span>
                                                <span className="block">{post.metadata.title}</span>
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </details>
                        ))}
                </div>
            </aside>


            {/* Main Content */}
            <main className="flex-1 grid sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {posts.map((post) => (
                    <Link
                        key={post.slug}
                        to={`/blog/${post.slug}`}
                        className="border rounded-lg shadow hover:shadow-lg transition bg-white flex flex-col overflow-hidden"
                    >
                        <div className="aspect-video w-full overflow-hidden">
                            <img
                                src={post.metadata.image}
                                alt={post.metadata.title}
                                className="w-full h-full object-cover"
                                loading="lazy"
                            />
                        </div>
                        <div className="p-4 flex flex-col grow">
                            <p className="text-sm text-gray-400 mb-1">{post.metadata.date}</p>
                            <h2 className="font-semibold text-lg mb-2 line-clamp-2">{post.metadata.title}</h2>
                            <p className="text-gray-700 text-sm grow line-clamp-3">
                                {markdownToPlainText(getFirstParagraphPreview(post.content))}...
                            </p>
                            {post.metadata.tags && (
                                <div className="flex flex-wrap gap-2 mt-3">
                                    {post.metadata.tags.map((t) => (
                                        <span
                                            key={t}
                                            className="text-xs bg-gray-200 px-2 py-0.5 rounded"
                                        >
                                            {t}
                                        </span>
                                    ))}
                                </div>
                            )}
                        </div>
                    </Link>
                ))}
            </main>
        </section>


    );
}
