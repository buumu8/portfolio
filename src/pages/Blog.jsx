import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import fm from "front-matter";

function BlogPage() {
    const [posts, setPosts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage, setPostsPerPage] = useState(5);
    const [selectedTag, setSelectedTag] = useState("All");
    const [allTags, setAllTags] = useState([]);

    // Fallback images
    const fallbackImages = Array.from(
        { length: 10 },
        (_, i) => `/portfolio/images/fallback_${i + 1}.jpg`
    );

    // Simple hash function
    function hashString(str) {
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            hash = (hash << 5) - hash + str.charCodeAt(i);
            hash |= 0;
        }
        return Math.abs(hash);
    }

    useEffect(() => {
        const blogFiles = import.meta.glob("../blogs/*.md", { as: "raw" });

        const postsArray = Object.keys(blogFiles).map((path) => ({
            path,
            importFn: blogFiles[path],
        }));

        Promise.all(
            postsArray.map(async (post) => {
                const rawContent = await post.importFn();
                const { attributes, body } = fm(rawContent);

                const slug = post.path.split("/").pop().replace(".md", "");

                const imagePath = attributes.image
                    ? `/portfolio/images/${attributes.image.replace(/^.*[\\/]/, "")}`
                    : fallbackImages[hashString(slug) % fallbackImages.length];

                return {
                    slug,
                    metadata: {
                        ...attributes,
                        image: imagePath,
                    },
                    preview: body.split("\n").slice(0, 3).join(" "),
                    fullContent: body,
                };
            })
        ).then((loadedPosts) => {
            loadedPosts.sort((a, b) =>
                a.metadata.date && b.metadata.date
                    ? new Date(b.metadata.date) - new Date(a.metadata.date)
                    : 0
            );
            setPosts(loadedPosts);

            const tagsSet = new Set();
            loadedPosts.forEach((p) => {
                if (p.metadata.tags) p.metadata.tags.forEach((tag) => tagsSet.add(tag));
            });
            setAllTags(["All", ...Array.from(tagsSet)]);
        });
    }, []);

    const filteredPosts =
        selectedTag === "All"
            ? posts
            : posts.filter((post) => post.metadata.tags?.includes(selectedTag));

    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);
    const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

    return (
        <section className="max-w-5xl mx-auto px-4 py-16 mt-5">
            <h1 className="text-3xl font-bold mb-4">Blog</h1>

            {/* Tags Filter */}
            <div className="flex flex-wrap gap-2 mb-4">
                {allTags.map((tag) => (
                    <button
                        key={tag}
                        onClick={() => {
                            setSelectedTag(tag);
                            setCurrentPage(1);
                        }}
                        className={`px-3 py-1 rounded ${selectedTag === tag
                            ? "bg-blue-600 text-white"
                            : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                            }`}
                    >
                        {tag}
                    </button>
                ))}
            </div>

            {/* Blog list */}
            <div className="flex flex-col space-y-6">
                {currentPosts.map((post, idx) => (
                    <Link
                        to={`/blog/${post.slug}`}
                        key={idx}
                        className="flex flex-col md:flex-row border rounded-md hover:shadow-lg cursor-pointer bg-gray-50 dark:bg-gray-800 overflow-hidden min-h-[200px]"
                    >
                        {post.metadata.image && (
                            <div className="w-full md:w-48 aspect-square overflow-hidden flex-shrink-0">
                                <img
                                    src={post.metadata.image}
                                    alt={post.metadata.title}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        )}

                        <div className="p-4 flex-1 flex flex-col justify-between">
                            <div>
                                <h2 className="font-bold text-xl">{post.metadata.title}</h2>
                                <p className="text-sm text-gray-500">{post.metadata.date}</p>
                                {post.metadata.tags && (
                                    <div className="flex flex-wrap gap-2 mt-1">
                                        {post.metadata.tags.map((t) => (
                                            <span
                                                key={t}
                                                className="text-xs bg-gray-300 dark:bg-gray-600 px-2 py-0.5 rounded"
                                            >
                                                {t}
                                            </span>
                                        ))}
                                    </div>
                                )}
                                <div className="mt-2 text-gray-700 dark:text-gray-300 text-sm prose dark:prose-invert">
                                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                        {post.preview + "..."}
                                    </ReactMarkdown>
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between mt-6">
                <label className="flex items-center gap-2">
                    Posts per page:{" "}
                    <select
                        value={postsPerPage}
                        onChange={(e) => {
                            setPostsPerPage(Number(e.target.value));
                            setCurrentPage(1);
                        }}
                        className="border rounded px-2 py-1 bg-white dark:bg-gray-700 text-black dark:text-white"
                    >
                        <option value={5}>5</option>
                        <option value={10}>10</option>
                    </select>
                </label>

                <div className="flex items-center gap-2">
                    <button
                        onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                        disabled={currentPage === 1}
                        className="px-3 py-1 border rounded disabled:opacity-50"
                        aria-label="Previous page"
                    >
                        &#8592;
                    </button>

                    <span>
                        {currentPage} / {totalPages}
                    </span>

                    <button
                        onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                        disabled={currentPage === totalPages}
                        className="px-3 py-1 border rounded disabled:opacity-50"
                        aria-label="Next page"
                    >
                        &#8594;
                    </button>
                </div>
            </div>
        </section>
    );
}

export default BlogPage;
