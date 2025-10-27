import { useEffect, useState } from "react";

function ProjectsPage() {
    const [projects, setProjects] = useState([]);

    // Fallback images (assumes /public/images/fallback_1.jpg → fallback_10.jpg)
    const fallbackImages = Array.from(
        { length: 10 },
        (_, i) => `${import.meta.env.BASE_URL}/images/fallback_${i + 1}.jpg`
    );

    // Hash function to map project ID → fallback index
    const hashStringToIndex = (str, max) => {
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            hash = (hash << 5) - hash + str.charCodeAt(i);
            hash |= 0; // Convert to 32-bit integer
        }
        return Math.abs(hash) % max;
    };

    useEffect(() => {
        // Example static projects — each project has a unique id
        const projectData = [
            {
                id: "ble-threat-detector",
                name: "Real-Time Bluetooth Low Energy (BLE) Threat Detection App",
                description:
                    "Developed a mobile app to detect and simulate Bluetooth Low Energy (BLE) security threats, enhancing understanding of wireless vulnerabilities and mobile security risks.",
                image: "",
                tags: ["Mobile", "Security", "IoT"],
            },
            {
                id: "parkinsons-classifier",
                name: "Parkinson’s Disease Classification Web App",
                description:
                    "Built a Python-based ML model using the PPMI dataset to predict Parkinson’s disease from voice data, with a user-friendly web interface.",
                image: "", // no custom image
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
                image: "", // no custom image
                tags: ["React", "Node.js", "Express"],
            },
        ];

        // Assign deterministic fallback images using project.id
        const withImages = projectData.map((proj) => ({
            ...proj,
            image:
                proj.image ||
                fallbackImages[hashStringToIndex(proj.id, fallbackImages.length)],
        }));

        setProjects(withImages);
    }, []);

    return (
        <div className="max-w-6xl mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6">Projects</h1>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map((project) => (
                    <div
                        key={project.id}
                        className="border rounded-md shadow-sm hover:shadow-md transition bg-gray-50 dark:bg-gray-800 overflow-hidden flex flex-col"
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
                            <p className="text-sm text-gray-700 dark:text-gray-300 flex-grow">
                                {project.description}
                            </p>

                            {/* Tags */}
                            <div className="flex flex-wrap gap-2 mt-3">
                                {project.tags.map((tag) => (
                                    <span
                                        key={tag}
                                        className="text-xs bg-gray-300 dark:bg-gray-700 px-2 py-1 rounded"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ProjectsPage;
