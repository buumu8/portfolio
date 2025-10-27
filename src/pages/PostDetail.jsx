// src/pages/PostDetail.jsx
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import fm from "front-matter";

export default function PostDetail() {
    const { slug } = useParams();
    const [post, setPost] = useState(null);

    useEffect(() => {
        const blogFiles = import.meta.glob("../blogs/*.md", { as: "raw" });
        const postPath = Object.keys(blogFiles).find((path) =>
            path.includes(`${slug}.md`)
        );

        if (!postPath) return <NotFoundPage />;

        blogFiles[postPath]().then((raw) => {
            const { attributes, body } = fm(raw);

            // fallback images array
            const fallbackImages = Array.from(
                { length: 10 },
                (_, i) => `/portfolio/images/fallback_${i + 1}.jpg`
            );

            // hash function to select fallback deterministically
            const hashString = (str) => {
                let hash = 0;
                for (let i = 0; i < str.length; i++) {
                    hash = (hash << 5) - hash + str.charCodeAt(i);
                    hash |= 0;
                }
                return Math.abs(hash);
            };

            const imagePath = attributes.image
                ? `/portfolio/images/${attributes.image.replace(/^.*[\\/]/, "")}`
                : fallbackImages[hashString(slug) % fallbackImages.length];

            setPost({
                metadata: { ...attributes, image: imagePath },
                content: body,
            });
        });
    }, [slug]);

    if (!post) return <div className="p-6">Loading post...</div>;

    return (
        <section className="max-w-5xl mx-auto px-4 py-16 mt-5">
            <Link to="/blog" className="text-blue-500 hover:underline">
                &larr; Back to Blog
            </Link>

            <h1 className="text-3xl font-bold">{post.metadata.title}</h1>
            <p className="text-sm text-gray-500">{post.metadata.date}</p>
            {post.metadata.tags && (
                <div className="flex flex-wrap gap-2 mt-1">
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
            {post.metadata.image && (
                <div className="w-full h-80 overflow-hidden mt-4">
                    <img
                        src={post.metadata.image}
                        alt={post.metadata.title}
                        className="w-full h-full object-cover rounded-md"
                    />
                </div>
            )}

            <div className="prose mt-4">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {post.content}
                </ReactMarkdown>
            </div>
        </section>
    );
}
