const projects = [
    {
        title: "Real-Time Bluetooth Low Energy (BLE) Threat Detection App",
        description:
            "Developed a mobile app to detect and simulate Bluetooth Low Energy (BLE) security threats, enhancing understanding of wireless vulnerabilities and mobile security risks.",
        tags: ["Mobile Security", "Bluetooth", "Wireless", "Threat Detection"],
    },
    {
        title: "Parkinson’s Disease Classification Web App",
        description:
            "Built a Python-based machine learning model using the PPMI dataset to predict Parkinson’s disease from voice data. Designed a user-friendly web interface to make results accessible to nontechnical users.",
        tags: ["Python", "Machine Learning", "Flask", "PPMI Dataset"],
    },
    {
        title: "Network Security Labs",
        description:
            "Completed practical labs on packet sniffing, ARP poisoning, and network traffic analysis using Scapy (Python) and C, exploring both attack and defense mechanisms in network environments.",
        tags: ["Python", "Scapy", "Network Security", "C"],
    },
    {
        title: "Full-Stack Web Application (Meta Coursera Certification)",
        description:
            "Developed full-stack web apps using React, Node.js, and Express, integrating secure backend APIs and authentication as part of Meta’s Frontend & Backend Developer Professional Course.",
        tags: ["React", "Node.js", "Express", "Full-Stack"],
    },
];

export default function Projects() {
    return (
        <section className="max-w-5xl mx-auto px-4 py-16">
            <h1 className="text-4xl font-bold text-center mb-12 text-gray-900 dark:text-white">
                Projects
            </h1>

            <div className="grid gap-8 sm:grid-cols-2">
                {projects.map((project, index) => (
                    <div
                        key={index}
                        className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 bg-white dark:bg-slate-900"
                    >
                        <h2 className="text-xl font-semibold mb-2 text-primary">
                            {project.title}
                        </h2>
                        <p className="text-gray-700 dark:text-gray-300 mb-4">
                            {project.description}
                        </p>
                        <div className="flex flex-wrap gap-2">
                            {project.tags.map((tag, i) => (
                                <span
                                    key={i}
                                    className="text-xs px-2 py-1 rounded-md bg-blue-50 dark:bg-slate-800 text-blue-700 dark:text-blue-300 border border-blue-100 dark:border-slate-700"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
