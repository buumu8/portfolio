// src/pages/Blog.jsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import fm from "front-matter";

export default function Blog() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const blogFiles = import.meta.glob("../blogs/*.md", { as: "raw" });

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
            const postEntries = await Promise.all(
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
                        content: body,
                    };
                })
            );

            // Optional: sort by date descending
            postEntries.sort(
                (a, b) => new Date(b.metadata.date) - new Date(a.metadata.date)
            );

            setPosts(postEntries);
        };

        loadPosts();
    }, []);

    if (posts.length === 0) return <div className="p-6">Loading posts...</div>;

    return (
        <section className="max-w-6xl mx-auto px-4 py-16 mt-5">
            <h1 className="text-3xl font-bold mb-6">Blog</h1>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {posts.map((post) => (
                    <Link
                        key={post.slug}
                        to={`/blog/${post.slug}`}
                        className="border rounded-md shadow-md hover:shadow-lg transition bg-white flex flex-col overflow-hidden"
                    >
                        <div className="aspect-video w-full overflow-hidden">
                            <img
                                src={post.metadata.image}
                                alt={post.metadata.title}
                                className="w-full h-full object-cover"
                                loading="lazy"
                            />
                        </div>
                        <div className="p-4 flex flex-col flex-grow">
                            <h2 className="font-semibold text-lg mb-2">{post.metadata.title}</h2>
                            <p className="text-sm text-gray-500 mb-2">{post.metadata.date}</p>
                            <p className="text-sm text-gray-700 flex-grow">
                                {post.content.slice(0, 120)}...
                            </p>
                            {post.metadata.tags && (
                                <div className="flex flex-wrap gap-2 mt-3">
                                    {post.metadata.tags.map((t) => (
                                        <span
                                            key={t}
                                            className="text-xs bg-gray-300 px-2 py-0.5 rounded"
                                        >
                                            {t}
                                        </span>
                                    ))}
                                </div>
                            )}
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    );
}
