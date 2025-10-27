import { useEffect, useState } from "react";

function ProjectsPage() {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true); // ✅ Loading state
    const [currentPage, setCurrentPage] = useState(1);
    const [projectsPerPage, setProjectsPerPage] = useState(6);

    const fallbackImages = Array.from(
        { length: 10 },
        (_, i) => `${import.meta.env.BASE_URL}/images/fallback_${i + 1}.jpg`
    );

    const hashStringToIndex = (str, max) => {
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            hash = (hash << 5) - hash + str.charCodeAt(i);
            hash |= 0;
        }
        return Math.abs(hash) % max;
    };

    useEffect(() => {
        setLoading(true);

        const projectData = [
            {
                id: "ble-threat-detector",
                name: "Real-Time BLE Threat Detection App",
                description:
                    "Developed a mobile app to detect and simulate BLE security threats, enhancing understanding of wireless vulnerabilities and mobile security risks.",
                image: "",
                tags: ["Mobile", "Security", "IoT"],
            },
            {
                id: "parkinsons-classifier",
                name: "Parkinson’s Disease Classification Web App",
                description:
                    "Built a Python-based ML model using the PPMI dataset to predict Parkinson’s disease from voice data, with a user-friendly web interface.",
                image: "",
                tags: ["Machine Learning", "Flask", "Python"],
            },
            {
                id: "Network-security-labs",
                name: "Network Security Labs",
                description:
                    "Completed labs on packet sniffing, ARP poisoning, and network traffic analysis using Scapy and C, exploring both attack and defense mechanisms.",
                image: `${import.meta.env.BASE_URL}/images/first-post.jpg`,
                tags: ["Network", "Python", "C"],
            },
            {
                id: "meta-fullstack-app",
                name: "Full-Stack Web Application (Meta Coursera Certification)",
                description:
                    "Developed full-stack web apps using React, Node.js, and Express, integrating secure backend APIs and authentication as part of Meta’s Developer Professional Course.",
                image: "",
                tags: ["React", "Node.js", "Express"],
            },
        ];

        // Assign fallback images if none provided
        const withImages = projectData.map((proj) => ({
            ...proj,
            image:
                proj.image ||
                fallbackImages[hashStringToIndex(proj.id, fallbackImages.length)],
        }));

        // Simulate async loading
        setTimeout(() => {
            setProjects(withImages);
            setLoading(false);
        }, 800); // you can remove timeout if fetching real data
    }, []);

    const indexOfLastProject = currentPage * projectsPerPage;
    const indexOfFirstProject = indexOfLastProject - projectsPerPage;
    const currentProjects = projects.slice(indexOfFirstProject, indexOfLastProject);
    const totalPages = Math.ceil(projects.length / projectsPerPage);

    return (
        <section className="max-w-5xl mx-auto px-4 py-16 mt-5">
            <h1 className="text-3xl font-bold mb-6">Projects</h1>

            {/* Projects Grid or Loader */}
            {loading ? (
                <div className="flex justify-center items-center min-h-[300px]">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500 border-opacity-60"></div>
                </div>
            ) : (
                <>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {currentProjects.map((project) => (
                            <div
                                key={project.id}
                                className="border rounded-md shadow-sm hover:shadow-md transition bg-gray-50 overflow-hidden flex flex-col"
                            >
                                {/* Project Image */}
                                {project.image && (
                                    <div className="aspect-square w-full overflow-hidden">
                                        <img
                                            src={project.image}
                                            alt={project.name}
                                            className="w-full h-full object-cover"
                                            loading="lazy"
                                        />
                                    </div>
                                )}

                                {/* Content */}
                                <div className="p-4 flex flex-col flex-grow">
                                    <h2 className="font-semibold text-lg mb-2">{project.name}</h2>
                                    <p className="text-sm text-gray-700 flex-grow">
                                        {project.description}
                                    </p>

                                    {/* Tags */}
                                    <div className="flex flex-wrap gap-2 mt-3">
                                        {project.tags.map((tag) => (
                                            <span
                                                key={tag}
                                                className="text-xs bg-gray-300 px-2 py-1 rounded"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Pagination */}
                    <div className="flex items-center justify-between mt-6">
                        <label className="flex items-center gap-2">
                            Projects per page:{" "}
                            <select
                                value={projectsPerPage}
                                onChange={(e) => {
                                    setProjectsPerPage(Number(e.target.value));
                                    setCurrentPage(1);
                                }}
                                className="border rounded px-2 py-1 bg-white  text-black"
                            >
                                <option value={3}>3</option>
                                <option value={6}>6</option>
                                <option value={9}>9</option>
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
                </>
            )}
        </section>
    );
}

export default ProjectsPage;
